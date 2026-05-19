'use client';

import { Skeleton } from '@/components/ui/skeleton';

/**
 * PAGE SKELETONS
 *
 * One exported component per page layout. Each skeleton mirrors the real
 * page structure — same number of stat cards, same tab bar, same card grid —
 * so the layout never shifts when real content arrives.
 *
 * Usage:
 *   if (authLoading || dataLoading) return <DonorDashboardSkeleton />;
 *
 * Also used in each route's loading.tsx so Next.js shows the skeleton
 * instantly on navigation before the page JS even runs.
 */

// ─── Shared primitives ────────────────────────────────────────────────────────

function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 p-5 ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-7 w-16" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

function SkeletonStatRow({ count = 4 }: { count?: number }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-${count} gap-4 mb-8`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

function SkeletonTabBar({ tabs = 3 }: { tabs?: number }) {
  return (
    <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg w-full">
      {Array.from({ length: tabs }).map((_, i) => (
        <Skeleton key={i} className="h-9 flex-1 rounded-md" />
      ))}
    </div>
  );
}

function SkeletonListingCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-3 pt-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-9 w-20 rounded-md" />
        <Skeleton className="h-9 w-20 rounded-md" />
      </div>
    </div>
  );
}

function SkeletonReservationCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-36" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-1">
        <Skeleton className="h-9 w-24 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>
    </div>
  );
}

function SkeletonPageHeader({ hasButton = false }: { hasButton?: boolean }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="space-y-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-4 w-48" />
      </div>
      {hasButton && <Skeleton className="h-10 w-36 rounded-md" />}
    </div>
  );
}

// ─── Donor dashboard skeleton ──────────────────────────────────────────────────

export function DonorDashboardSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <SkeletonPageHeader />

          {/* Alert banner placeholder */}
          <Skeleton className="h-14 w-full rounded-xl mb-6" />

          {/* Stat cards */}
          <SkeletonStatRow count={4} />

          {/* Tab bar — 3 tabs: My Listings, Reservations, Profile */}
          <SkeletonTabBar tabs={3} />

          {/* Listing cards */}
          <div className="space-y-4">
            <SkeletonListingCard />
            <SkeletonListingCard />
            <SkeletonListingCard />
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Recipient dashboard skeleton ─────────────────────────────────────────────

export function RecipientDashboardSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header + Browse button */}
          <SkeletonPageHeader hasButton />

          {/* Stat cards */}
          <SkeletonStatRow count={4} />

          {/* Quick actions row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
          </div>

          {/* Tab bar — Dashboard, Profile */}
          <SkeletonTabBar tabs={2} />

          {/* Reservation cards */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            {/* Inner sub-tab bar — Pending, Confirmed, Completed */}
            <SkeletonTabBar tabs={3} />
            <div className="space-y-4">
              <SkeletonReservationCard />
              <SkeletonReservationCard />
              <SkeletonReservationCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Browse page skeleton ──────────────────────────────────────────────────────

export function BrowseSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SkeletonPageHeader />

          {/* Search + filter bar */}
          <div className="flex gap-3 mb-6">
            <Skeleton className="h-11 flex-1 rounded-md" />
            <Skeleton className="h-11 w-28 rounded-md" />
            <Skeleton className="h-11 w-28 rounded-md" />
          </div>

          {/* Food listing grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <Skeleton className="h-44 w-full rounded-none" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex gap-2 pt-1">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-10 w-full rounded-md mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Donate / food listing form skeleton ──────────────────────────────────────

export function DonateSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow py-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

          <SkeletonPageHeader />

          <div className="bg-white rounded-xl border border-gray-100 p-8 space-y-6">
            {/* Form fields */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-11 w-full rounded-md" />
              </div>
            ))}
            {/* Two-col row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-11 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-11 w-full rounded-md" />
              </div>
            </div>
            <Skeleton className="h-12 w-full rounded-md mt-2" />
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Profile page skeleton ─────────────────────────────────────────────────────

export function ProfileSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Avatar + name header */}
          <div className="flex items-center gap-5 mb-8">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-8 space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-11 w-full rounded-md" />
              </div>
            ))}
            <Skeleton className="h-12 w-40 rounded-md" />
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Generic fallback — used by root loading.tsx ───────────────────────────────

export function GenericPageSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkeletonPageHeader />
          <SkeletonStatRow count={3} />
          <div className="space-y-4">
            <SkeletonListingCard />
            <SkeletonListingCard />
            <SkeletonListingCard />
          </div>
        </div>
      </main>
    </div>
  );
}
