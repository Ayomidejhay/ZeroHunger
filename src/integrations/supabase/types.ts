export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      donation_history: {
        Row: {
          donated_at: string
          donor_id: string
          food_listing_id: string
          id: string
          pickup_completed_at: string | null
          recipient_id: string | null
          status: string
        }
        Insert: {
          donated_at?: string
          donor_id: string
          food_listing_id: string
          id?: string
          pickup_completed_at?: string | null
          recipient_id?: string | null
          status?: string
        }
        Update: {
          donated_at?: string
          donor_id?: string
          food_listing_id?: string
          id?: string
          pickup_completed_at?: string | null
          recipient_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "donation_history_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donation_history_food_listing_id_fkey"
            columns: ["food_listing_id"]
            isOneToOne: false
            referencedRelation: "food_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donation_history_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      food_listings: {
        Row: {
          allergens: string[] | null
          category: string
          created_at: string
          description: string | null
          donor_id: string
          expiration: string
          id: string
          image_url: string | null
          latitude: number | null
          location: string
          longitude: number | null
          pickup_instructions: string | null
          pickup_time_end: string | null
          pickup_time_start: string | null
          quantity: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          allergens?: string[] | null
          category: string
          created_at?: string
          description?: string | null
          donor_id: string
          expiration: string
          id?: string
          image_url?: string | null
          latitude?: number | null
          location: string
          longitude?: number | null
          pickup_instructions?: string | null
          pickup_time_end?: string | null
          pickup_time_start?: string | null
          quantity: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          allergens?: string[] | null
          category?: string
          created_at?: string
          description?: string | null
          donor_id?: string
          expiration?: string
          id?: string
          image_url?: string | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          pickup_instructions?: string | null
          pickup_time_end?: string | null
          pickup_time_start?: string | null
          quantity?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_listings_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          food_listing_id: string | null
          id: string
          message: string
          read: boolean
          reservation_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          food_listing_id?: string | null
          id?: string
          message: string
          read?: boolean
          reservation_id?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          food_listing_id?: string | null
          id?: string
          message?: string
          read?: boolean
          reservation_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_food_listing_id_fkey"
            columns: ["food_listing_id"]
            isOneToOne: false
            referencedRelation: "food_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          allergies: string[] | null
          avatar_url: string | null
          city: string | null
          created_at: string
          dietary_restrictions: string[] | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          state: string | null
          updated_at: string
          user_type: string
          zip: string | null
        }
        Insert: {
          address?: string | null
          allergies?: string[] | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          dietary_restrictions?: string[] | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string
          user_type: string
          zip?: string | null
        }
        Update: {
          address?: string | null
          allergies?: string[] | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          dietary_restrictions?: string[] | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string
          user_type?: string
          zip?: string | null
        }
        Relationships: []
      }
      reservations: {
        Row: {
          created_at: string
          food_listing_id: string
          id: string
          notes: string | null
          pickup_time: string | null
          recipient_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          food_listing_id: string
          id?: string
          notes?: string | null
          pickup_time?: string | null
          recipient_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          food_listing_id?: string
          id?: string
          notes?: string | null
          pickup_time?: string | null
          recipient_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservations_food_listing_id_fkey"
            columns: ["food_listing_id"]
            isOneToOne: false
            referencedRelation: "food_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
