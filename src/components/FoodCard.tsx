// "use client";

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { Badge } from "@/components/ui/badge";
// import { useAuth } from "@/context/AuthContext";
// import { supabase } from "@/integrations/supabase/client";
// import { MapPin, Clock, AlertTriangle } from "lucide-react";
// import { toast } from "sonner";

// interface FoodCardProps {
//   id: string;
//   title: string;
//   image: string;
//   quantity: string;
//   location: string;
//   distance: string;
//   expiresIn: string;
//   category: string;
//   allergens?: string[] | null;
//   onReservationSuccess?: () => void;
// }

// const FoodCard = ({
//   id,
//   title,
//   image,
//   quantity,
//   location,
//   distance,
//   expiresIn,
//   category,
//   allergens,
//   onReservationSuccess,
// }: FoodCardProps) => {
//   const [isRequesting, setIsRequesting] = useState(false);
//   const { user, profile } = useAuth();
//   const router = useRouter();

//   const handleCardClick = () => {
//     router.push(`/browse/${id}`);
//   };

//     const handleRequestFood = async (e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevent card click when button is clicked
    
//     console.log('FoodCard handleRequestFood called with id:', id, 'type:', typeof id);
//     console.log('User:', user);
    
//     if (!user) {
//       toast.error("Authentication required", {
//   description: "Please sign in to request food.",
// });;
//       router.push("/auth/login");
//       return;
//     }

//     // Only recipients can request food
//     if (profile?.user_type !== 'recipient') {
//       toast.error("Action not allowed", {
//   description: "Only recipients can request food. Donors should use the donate page to list food.",
// });
//       return;
//     }

//     setIsRequesting(true);
    
//     try {
//       console.log('Checking for existing reservation with food_listing_id:', id, 'recipient_id:', user.id);
      
//       // Check if user already has a pending reservation for this food item
//       const { data: existingReservation, error: checkError } = await supabase
//         .from('reservations')
//         .select('id')
//         .eq('food_listing_id', id)
//         .eq('recipient_id', user.id)
//         .eq('status', 'pending')
//         .maybeSingle();

//       if (checkError) {
//         console.error('Error checking existing reservation:', checkError);
//         throw checkError;
//       }

//       if (existingReservation) {
//         toast.error("Already requested", {
//   description: "You already have a pending request for this food item.",
// });
//         return;
//       }

//       console.log('Creating new reservation with food_listing_id:', id, 'recipient_id:', user.id);

//       // Create a new reservation
//       const { error } = await supabase
//         .from('reservations')
//         .insert({
//           food_listing_id: id,
//           recipient_id: user.id,
//           status: 'pending'
//         });

//       if (error) {
//         console.error('Error creating reservation:', error);
//         throw error;
//       }

//       toast.success("Request sent!", {
//   description: "Your food request has been sent successfully. The donor will be notified.",
// });

//       // Call the callback to refresh the parent component if needed
//       onReservationSuccess?.();
      
//     } catch (error: any) {
//       console.error('Error requesting food:', error);
//       toast.error("Request failed", {
//   description: error.message || "Failed to send food request. Please try again.",
// });
//     } finally {
//       setIsRequesting(false);
//     }
//   };
//   return (
//     <div 
//       className="bg-white rounded-lg overflow-hidden border border-neutral200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
//       onClick={handleCardClick}
//     >
//       <div className="aspect-video w-full overflow-hidden">
//         <img
//           src={image}
//           alt={title}
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div className="p-4">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="font-semibold text-lg text-neutral900 line-clamp-1">
//             {title}
//           </h3>
//           <Badge className="bg-defaultorange text-white">
//             {category}
//           </Badge>
//         </div>
        
//         <p className="text-neutral600 mb-3">
//           Qty: {quantity}
//         </p>
        
//         {allergens && allergens.length > 0 && (
//           <div className="flex items-center mb-3">
//             <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />
//             <span className="text-sm text-red-600">
//               Contains: {allergens.join(', ')}
//             </span>
//           </div>
//         )}
        
//         <div className="flex items-center text-neutral500 mb-1">
//           <MapPin className="h-4 w-4 mr-1" />
//           <span className="text-sm">{location} • {distance} away</span>
//         </div>
        
//         <div className="flex items-center text-neutral500 mb-3">
//           <Clock className="h-4 w-4 mr-1" />
//           <span className="text-sm">Available for: {expiresIn}</span>
//         </div>
        
//         <Button 
//           className="w-full bg-defaultgreen hover:bg-darkgreen text-white"
//           onClick={handleRequestFood}
//           disabled={isRequesting || !user || profile?.user_type !== 'recipient'}
//         >
//           {!user 
//             ? "Sign in to Request" 
//             : profile?.user_type !== 'recipient' 
//             ? "Recipients Only" 
//             : isRequesting 
//             ? "Requesting..." 
//             : "Request Food"
//           }
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default FoodCard;


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Clock, AlertTriangle, Loader2, ArrowRight, Package } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FoodCardProps {
  id: string;
  title: string;
  image: string;
  quantity: string;
  location: string;
  distance: string;
  expiresIn: string;
  category: string;
  allergens?: string[] | null;
  onReservationSuccess?: () => void;
}

// Expiry urgency — colour the badge based on how soon it expires
function expiryStyle(expiresIn: string): { bg: string; color: string; label: string } {
  const lower = expiresIn.toLowerCase();
  if (lower === 'expired')  return { bg: '#fef2f2', color: '#ef4444', label: expiresIn };
  if (lower === 'today')    return { bg: '#fff7ed', color: '#f97316', label: 'Expires today' };
  if (lower === 'tomorrow') return { bg: '#fffbeb', color: '#eab308', label: 'Expires tomorrow' };
  return { bg: '#f0fdf4', color: '#16a34a', label: `${expiresIn} left` };
}

// Category pill colour
const catColors: Record<string, { bg: string; color: string }> = {
  'Fruits & Vegetables': { bg: '#f0fdf4', color: '#16a34a' },
  'Dairy & Eggs':        { bg: '#eff6ff', color: '#3b82f6' },
  'Meat & Poultry':      { bg: '#fef2f2', color: '#ef4444' },
  'Bakery':              { bg: '#fff7ed', color: '#f97316' },
  'Prepared Foods':      { bg: '#fdf4ff', color: '#a855f7' },
  'Beverages':           { bg: '#ecfeff', color: '#06b6d4' },
};
const defaultCat = { bg: '#f7f3ed', color: '#667085' };

export default function FoodCard({
  id, title, image, quantity, location,
  distance, expiresIn, category, allergens, onReservationSuccess,
}: FoodCardProps) {
  const [isRequesting, setIsRequesting] = useState(false);
  const { user, profile } = useAuth();
  const router = useRouter();

  const expiry = expiryStyle(expiresIn);
  const cat    = catColors[category] || defaultCat;
  const isRecipient = profile?.user_type === 'recipient';

  const handleRequest = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) { router.push('/auth/login'); return; }
    if (!isRecipient) {
      toast.error("Recipients only", { description: "Only recipients can request food." });
      return;
    }
    setIsRequesting(true);
    try {
      const { data: existing } = await supabase
        .from('reservations').select('id, status')
        .eq('food_listing_id', id).eq('recipient_id', user.id)
        .in('status', ['pending', 'confirmed']).maybeSingle();

      if (existing) {
        toast.error("Already requested", {
          description: `You already have a ${existing.status} request for this item.`
        });
        return;
      }
      const { error } = await supabase.from('reservations').insert({
        food_listing_id: id, recipient_id: user.id, status: 'pending'
      });
      if (error) throw error;
      toast.success("Request sent!", {
        description: "The donor will be notified and will confirm shortly."
      });
      onReservationSuccess?.();
    } catch (err: any) {
      toast.error("Request failed", { description: err.message });
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <>
      <style>{`
        .fc-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid #e8ecef;
          overflow: hidden;
          cursor: pointer;
          transition: all .3s ease;
          display: flex; flex-direction: column;
        }
        .fc-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(26,58,42,.1);
          border-color: rgba(118,196,59,.2);
        }
        .fc-img-wrap {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden; flex-shrink: 0;
        }
        .fc-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 5s ease;
        }
        .fc-card:hover .fc-img { transform: scale(1.05); }

        .fc-cat-badge {
          position: absolute; top: .75rem; left: .75rem;
          padding: .25rem .65rem; border-radius: 100px;
          font-size: .68rem; font-weight: 700;
          letter-spacing: .04em;
        }
        .fc-expiry-badge {
          position: absolute; top: .75rem; right: .75rem;
          display: flex; align-items: center; gap: .3rem;
          padding: .25rem .65rem; border-radius: 100px;
          font-size: .68rem; font-weight: 700;
          backdrop-filter: blur(6px);
        }

        .fc-body { padding: 1.25rem; flex: 1; display: flex; flex-direction: column; }

        .fc-title {
          font-size: 1rem; font-weight: 700;
          color: #1a3a2a; line-height: 1.3;
          margin-bottom: .4rem;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }

        .fc-qty {
          display: inline-flex; align-items: center; gap: .3rem;
          font-size: .75rem; color: #667085; font-weight: 500;
          margin-bottom: .9rem;
        }

        .fc-meta { display: flex; flex-direction: column; gap: .35rem; margin-bottom: 1rem; }
        .fc-meta-row {
          display: flex; align-items: center; gap: .4rem;
          font-size: .78rem; color: #98a2b3;
        }
        .fc-meta-row svg { flex-shrink: 0; color: #98a2b3; }

        .fc-allergens {
          display: flex; align-items: flex-start; gap: .4rem;
          background: #fef2f2; border-radius: 8px;
          padding: .4rem .6rem; margin-bottom: .9rem;
          font-size: .72rem; color: #ef4444; font-weight: 500;
          line-height: 1.4;
        }
        .fc-allergens svg { flex-shrink: 0; margin-top: 1px; }

        .fc-btn {
          width: 100%; padding: .7rem;
          border-radius: 12px; border: none;
          font-size: .85rem; font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; transition: all .22s;
          display: flex; align-items: center; justify-content: center; gap: .4rem;
          margin-top: auto;
        }
        .fc-btn-primary {
          background: #1a3a2a; color: #fff;
        }
        .fc-btn-primary:hover:not(:disabled) {
          background: #2d5a3d; transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(26,58,42,.2);
        }
        .fc-btn-primary:disabled { opacity: .55; cursor: not-allowed; }
        .fc-btn-secondary {
          background: #f7f3ed; color: #344054;
          border: 1.5px solid #e8ecef;
        }
        .fc-btn-secondary:hover {
          background: #ede8e0; border-color: #d0d5dd;
        }
        .fc-btn-muted {
          background: #f7f3ed; color: #98a2b3;
          cursor: default;
        }
      `}</style>

      <div className="fc-card" onClick={() => router.push(`/browse/${id}`)}>

        {/* Image */}
        <div className="fc-img-wrap">
          <img
            src={image || "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600"}
            alt={title}
            className="fc-img"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600";
            }}
          />
          <span className="fc-cat-badge" style={{ background: cat.bg, color: cat.color }}>
            {category}
          </span>
          <span className="fc-expiry-badge" style={{ background: expiry.bg, color: expiry.color }}>
            <Clock size={10} />
            {expiry.label}
          </span>
        </div>

        {/* Body */}
        <div className="fc-body">
          <h3 className="fc-title">{title}</h3>

          <div className="fc-qty">
            <Package size={12} />
            {quantity}
          </div>

          <div className="fc-meta">
            <div className="fc-meta-row">
              <MapPin size={12} />
              {location}{distance && distance !== 'Nearby' ? ` · ${distance}` : ''}
            </div>
          </div>

          {allergens && allergens.length > 0 && (
            <div className="fc-allergens">
              <AlertTriangle size={12} />
              Contains: {allergens.join(', ')}
            </div>
          )}

          {/* CTA button */}
          {!user ? (
            <button
              className="fc-btn fc-btn-secondary"
              onClick={(e) => { e.stopPropagation(); router.push('/auth/login'); }}
            >
              Sign in to reserve <ArrowRight size={13} />
            </button>
          ) : isRecipient ? (
            <button
              className="fc-btn fc-btn-primary"
              onClick={handleRequest}
              disabled={isRequesting}
            >
              {isRequesting
                ? <><Loader2 size={13} className="animate-spin" /> Requesting...</>
                : <>Reserve now <ArrowRight size={13} /></>
              }
            </button>
          ) : (
            <div className="fc-btn fc-btn-muted">
              Recipients only
            </div>
          )}
        </div>
      </div>
    </>
  );
}
