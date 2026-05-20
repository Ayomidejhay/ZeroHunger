

// 'use client';

// import { createContext, useContext, useEffect, useState } from "react";
// import { User, Session } from "@supabase/supabase-js";
// import { supabase } from "@/integrations/supabase/client";
// import { unsubscribeFromNotifications } from "@/lib/notificationChannel";
// import { Profile } from "@/types/supabase";

// interface AuthContextType {
//   user: User | null;
//   session: Session | null;
//   profile: Profile | null;
//   isLoading: boolean;
//   signIn: (
//     email: string,
//     password: string
//   ) => Promise<{ error: any | null; userType: string | null }>;
//   signUp: (
//     email: string,
//     password: string,
//     userType: 'donor' | 'recipient',
//     firstName?: string,
//     lastName?: string
//   ) => Promise<{ error: any | null; data: any | null }>;
//   signOut: () => Promise<void>;
//   refreshProfile: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [session, setSession] = useState<Session | null>(null);
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   /* ---------------------------
//      AUTH STATE INITIALIZATION
//   ---------------------------- */
//   useEffect(() => {
//     // getSession() is the initial load — it sets everything and marks
//     // isLoading = false. onAuthStateChange handles subsequent changes
//     // (sign-in, sign-out, token refresh) but skips the INITIAL_SESSION
//     // event to avoid double-fetching the profile on mount.
//     // getUser() verifies the JWT with the Supabase server on every call —
//     // unlike getSession() which only reads from the local cookie and can
//     // return a stale or missing session in production hosted environments
//     // (Netlify, Vercel) where the cookie isn't always forwarded correctly.
//     supabase.auth.getUser().then(async ({ data: { user } }) => {
//       if (user) {
//         // Also get the full session so we can store the token
//         const { data: { session } } = await supabase.auth.getSession();
//         setSession(session);
//         setUser(user);
//         await fetchProfile(user.id);
//       } else {
//         setSession(null);
//         setUser(null);
//         setProfile(null);
//       }
//       setIsLoading(false);
//     });

//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         // Skip INITIAL_SESSION — already handled by getSession() above.
//         // Handling it here too causes a double fetchProfile that triggers
//         // two profile state updates, making dashboard guards run twice and
//         // producing the donor ↔ recipient flicker.
//         if (event === 'INITIAL_SESSION') return;

//         setSession(session);
//         setUser(session?.user ?? null);

//         if (session?.user) {
//           await fetchProfile(session.user.id);
//         } else {
//           setProfile(null);
//         }
//       }
//     );

//     return () => subscription.unsubscribe();
//   }, []);

//   /* ---------------------------
//      PROFILE FETCH
//   ---------------------------- */
//   const fetchProfile = async (userId: string): Promise<Profile | null> => {
//     const { data, error } = await supabase
//       .from("profiles")
//       .select("*")
//       .eq("id", userId)
//       .single();

//     if (error) {
//       console.error("Error fetching profile:", error);
//       return null;
//     }

//     setProfile(data);
//     return data;
//   };

//   const refreshProfile = async () => {
//     if (user) {
//       await fetchProfile(user.id);
//     }
//   };

//   /* ---------------------------
//      AUTH ACTIONS
//   ---------------------------- */

//   /**
//    * SIGN IN
//    * After a successful auth, immediately fetches the profile so the caller
//    * receives the user_type in the same async call — no waiting on the state
//    * listener before routing.
//    */
//   const signIn = async (
//     email: string,
//     password: string
//   ): Promise<{ error: any | null; userType: string | null }> => {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error || !data.user) {
//       return { error, userType: null };
//     }

//     // Fetch the profile immediately — don't wait for onAuthStateChange.
//     // This gives the login page the role it needs to route right away.
//     const profile = await fetchProfile(data.user.id);
//     return { error: null, userType: profile?.user_type ?? null };
//   };

//   /**
//    * SIGN UP
//    * - Creates the auth user (trigger auto-creates the profile row)
//    * - Then upserts to fill in first_name / last_name in case trigger ran first
//    */
//   const signUp = async (
//     email: string,
//     password: string,
//     userType: 'donor' | 'recipient',
//     firstName?: string,
//     lastName?: string
//   ) => {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: {
//           user_type: userType,
//           first_name: firstName || "",
//           last_name: lastName || "",
//         },
//       },
//     });

//     if (error || !data.user) {
//       return { data: null, error };
//     }

//     // Upsert instead of insert — safe whether the trigger already ran or not.
//     const { error: profileError } = await supabase
//       .from("profiles")
//       .upsert(
//         {
//           id: data.user.id,
//           user_type: userType,
//           first_name: firstName || "",
//           last_name: lastName || "",
//         },
//         { onConflict: "id" }
//       );

//     if (profileError) {
//       console.error("Profile creation error:", profileError);
//       // Don't block the signup — the trigger may have already created the profile.
//     }

//     await fetchProfile(data.user.id);

//     return { data, error: null };
//   };

//   const signOut = async () => {
//     unsubscribeFromNotifications();
//     await supabase.auth.signOut();
//     setProfile(null);
//   };

//   const value: AuthContextType = {
//     user,
//     session,
//     profile,
//     isLoading,
//     signIn,
//     signUp,
//     signOut,
//     refreshProfile,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// /* ---------------------------
//    HOOK
// ---------------------------- */
// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }


'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { unsubscribeFromNotifications } from "@/lib/notificationChannel";
import { Profile } from "@/types/supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: any | null; userType: string | null }>;
  signUp: (
    email: string,
    password: string,
    userType: 'donor' | 'recipient',
    firstName?: string,
    lastName?: string
  ) => Promise<{ error: any | null; data: any | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* ---------------------------
     AUTH STATE INITIALIZATION
  ---------------------------- */
  useEffect(() => {
    // getSession() is the initial load — it sets everything and marks
    // isLoading = false. onAuthStateChange handles subsequent changes
    // (sign-in, sign-out, token refresh) but skips the INITIAL_SESSION
    // event to avoid double-fetching the profile on mount.
    // Now that the browser client uses createBrowserClient (which stores
    // the session in cookies), getSession() works correctly in all environments.
    // The session cookie is readable by both the client and the middleware,
    // eliminating the localStorage vs cookie mismatch that caused the
    // infinite redirect loop in production.
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      }
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Skip INITIAL_SESSION — already handled by getSession() above.
        // Handling it here too causes a double fetchProfile that triggers
        // two profile state updates, making dashboard guards run twice and
        // producing the donor ↔ recipient flicker.
        if (event === 'INITIAL_SESSION') return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  /* ---------------------------
     PROFILE FETCH
  ---------------------------- */
  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }

    setProfile(data);
    return data;
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  /* ---------------------------
     AUTH ACTIONS
  ---------------------------- */

  /**
   * SIGN IN
   * After a successful auth, immediately fetches the profile so the caller
   * receives the user_type in the same async call — no waiting on the state
   * listener before routing.
   */
  const signIn = async (
    email: string,
    password: string
  ): Promise<{ error: any | null; userType: string | null }> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return { error, userType: null };
    }

    // Fetch the profile immediately — don't wait for onAuthStateChange.
    // This gives the login page the role it needs to route right away.
    const profile = await fetchProfile(data.user.id);
    return { error: null, userType: profile?.user_type ?? null };
  };

  /**
   * SIGN UP
   * - Creates the auth user (trigger auto-creates the profile row)
   * - Then upserts to fill in first_name / last_name in case trigger ran first
   */
  const signUp = async (
    email: string,
    password: string,
    userType: 'donor' | 'recipient',
    firstName?: string,
    lastName?: string
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_type: userType,
          first_name: firstName || "",
          last_name: lastName || "",
        },
      },
    });

    if (error || !data.user) {
      return { data: null, error };
    }

    // Upsert instead of insert — safe whether the trigger already ran or not.
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert(
        {
          id: data.user.id,
          user_type: userType,
          first_name: firstName || "",
          last_name: lastName || "",
        },
        { onConflict: "id" }
      );

    if (profileError) {
      console.error("Profile creation error:", profileError);
      // Don't block the signup — the trigger may have already created the profile.
    }

    await fetchProfile(data.user.id);

    return { data, error: null };
  };

  const signOut = async () => {
    unsubscribeFromNotifications();
    await supabase.auth.signOut();
    setProfile(null);
  };

  const value: AuthContextType = {
    user,
    session,
    profile,
    isLoading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/* ---------------------------
   HOOK
---------------------------- */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
