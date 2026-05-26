// 'use client';

// import React from 'react'
// import FoodGrid from '@/components/browse/FoodGrid';
// import AdvancedFilters from '@/components/browse/AdvancedFilters';
// import { useAdvancedSearch } from '@/hooks/useAdvancedSearch';
// import { Badge } from '@/components/ui/badge';
// import { ErrorBoundary } from '@/components/ui/error-boundary';

// export default function page() {
//     const {filters, setFilters, clearFilters, isLoading, foodListings, resultsCount} = useAdvancedSearch();
//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-defaultgreen/5 to-defaultorange/5">
      
      
//       <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
//         <div className="saveplate-container py-8">
//           <ErrorBoundary>
//             <div className="mb-8">
//               <h1 className="text-3xl font-bold text-neutral900 mb-2">
//                 Browse Available Food
//               </h1>
//               <p className="text-neutral600 mb-4">
//                 Discover fresh food donations in your community and help reduce waste
//               </p>
//               <div className="flex items-center space-x-4">
//                 <Badge variant="outline" className="px-3 py-1">
//                   {resultsCount} {resultsCount === 1 ? 'item' : 'items'} found
//                 </Badge>
//                 {(filters.searchQuery || filters.category || filters.location || 
//                   filters.allergens.length > 0 || filters.expiryRange) && (
//                   <Badge variant="secondary" className="px-3 py-1">
//                     Filters active
//                   </Badge>
//                 )}
//               </div>
//             </div>

//             <AdvancedFilters
//               filters={filters}
//               onFiltersChange={setFilters}
//               onClearFilters={clearFilters}
//             />

//             <FoodGrid 
//               foodListings={foodListings} 
//               isLoading={isLoading}
//             />
//           </ErrorBoundary>
//         </div>
//       </main>
      
      
//     </div>
//   )
// }


'use client';

import { useState } from 'react';
import { useAdvancedSearch } from '@/hooks/useAdvancedSearch';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import PaginatedFoodGrid from '@/components/browse/PaginatedFoodGrid';
import {
  Search, SlidersHorizontal, X, ChevronDown,
  Leaf, MapPin, Clock, Flame
} from 'lucide-react';

const FOOD_CATEGORIES = [
  "Fruits & Vegetables", "Dairy & Eggs", "Meat & Poultry",
  "Seafood", "Bakery", "Pantry Items", "Prepared Foods",
  "Beverages", "Snacks", "Other"
];

const COMMON_ALLERGENS = [
  "Nuts", "Dairy", "Gluten", "Eggs", "Soy", "Shellfish", "Fish", "Sesame"
];

export default function BrowsePage() {
  const { filters, setFilters, clearFilters, isLoading, foodListings, resultsCount } = useAdvancedSearch();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const updateFilter = (key: string, value: any) =>
    setFilters({ ...filters, [key]: value });

  const toggleAllergen = (a: string) => {
    const next = filters.allergens.includes(a)
      ? filters.allergens.filter(x => x !== a)
      : [...filters.allergens, a];
    updateFilter('allergens', next);
  };

  const hasActive =
    filters.searchQuery ||
    (filters.category && filters.category !== 'all') ||
    filters.location ||
    filters.allergens.length > 0 ||
    (filters.expiryRange && filters.expiryRange !== 'all') ||
    (filters.sortBy && filters.sortBy !== 'newest');

  const activeCount = [
    filters.searchQuery,
    filters.category && filters.category !== 'all' && filters.category,
    filters.location,
    filters.expiryRange && filters.expiryRange !== 'all' && filters.expiryRange,
  ].filter(Boolean).length + filters.allergens.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .br-page {
          min-height: 100vh;
          background: #f7f3ed;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Hero banner ── */
        .br-hero {
          background: #1a3a2a;
          position: relative; overflow: hidden;
          padding: 4rem 2rem 5rem;
        }
        .br-hero-glow {
          position: absolute; top: -150px; right: -150px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(118,196,59,.1) 0%, transparent 65%);
          pointer-events: none;
        }
        .br-hero-glow2 {
          position: absolute; bottom: -100px; left: -100px;
          width: 350px; height: 350px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,145,36,.07) 0%, transparent 65%);
          pointer-events: none;
        }
        .br-hero-inner {
          position: relative; z-index: 1;
          max-width: 1200px; margin: 0 auto;
        }
        .br-hero-tag {
          display: inline-flex; align-items: center; gap: .4rem;
          background: rgba(118,196,59,.12);
          border: 1px solid rgba(118,196,59,.25);
          color: #9be564; padding: .3rem .85rem;
          border-radius: 100px; font-size: .7rem; font-weight: 700;
          letter-spacing: .1em; text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        .br-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4.5vw, 3.8rem);
          font-weight: 900; color: #fff; line-height: 1.1;
          margin-bottom: 1rem;
        }
        .br-hero-title em { color: #76c43b; font-style: italic; }
        .br-hero-sub {
          color: rgba(255,255,255,.55); font-size: .95rem;
          line-height: 1.7; max-width: 520px;
          margin-bottom: 2.5rem;
        }

        /* ── Search bar ── */
        .br-search-wrap {
          position: relative; max-width: 640px;
        }
        .br-search-icon {
          position: absolute; left: 1.1rem; top: 50%;
          transform: translateY(-50%);
          color: #98a2b3; pointer-events: none;
        }
        .br-search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          background: #fff; border: none;
          border-radius: 14px;
          font-size: .95rem; color: #1a3a2a;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          box-shadow: 0 4px 24px rgba(0,0,0,.15);
          transition: box-shadow .2s;
        }
        .br-search-input:focus {
          box-shadow: 0 4px 24px rgba(0,0,0,.2), 0 0 0 3px rgba(118,196,59,.2);
        }
        .br-search-input::placeholder { color: #d0d5dd; }

        /* ── Stats pills ── */
        .br-hero-pills {
          display: flex; gap: .75rem; margin-top: 2rem; flex-wrap: wrap;
        }
        .br-pill {
          display: flex; align-items: center; gap: .45rem;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.1);
          color: rgba(255,255,255,.65);
          padding: .4rem .9rem; border-radius: 100px;
          font-size: .78rem; font-weight: 500;
        }
        .br-pill-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #76c43b; flex-shrink: 0;
        }

        /* ── Main layout ── */
        .br-body {
          max-width: 1200px; margin: 0 auto;
          padding: 2.5rem 2rem;
        }

        /* ── Toolbar ── */
        .br-toolbar {
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 1rem; margin-bottom: 1.75rem;
          flex-wrap: wrap;
        }
        .br-results-label {
          font-size: .88rem; color: #667085; font-weight: 400;
        }
        .br-results-label strong {
          color: #1a3a2a; font-weight: 700;
        }

        .br-toolbar-right { display: flex; align-items: center; gap: .75rem; }

        .br-sort-select {
          padding: .5rem 2rem .5rem .85rem;
          background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2398a2b3' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right .7rem center;
          border: 1.5px solid #e8ecef; border-radius: 10px;
          font-size: .82rem; color: #344054;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; outline: none;
          transition: border-color .2s;
          -webkit-appearance: none; appearance: none;
        }
        .br-sort-select:focus { border-color: #76c43b; }

        .br-filter-btn {
          display: inline-flex; align-items: center; gap: .5rem;
          background: #fff; border: 1.5px solid #e8ecef;
          color: #344054; font-size: .82rem; font-weight: 600;
          padding: .5rem 1rem; border-radius: 10px;
          cursor: pointer; transition: all .2s;
          font-family: 'DM Sans', sans-serif; white-space: nowrap;
        }
        .br-filter-btn:hover { border-color: #76c43b; color: #1a3a2a; }
        .br-filter-btn.active {
          background: #1a3a2a; border-color: #1a3a2a; color: #fff;
        }
        .br-filter-badge {
          background: #76c43b; color: #1a3a2a;
          font-size: .68rem; font-weight: 800;
          width: 18px; height: 18px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }

        .br-clear-btn {
          display: inline-flex; align-items: center; gap: .4rem;
          color: #667085; font-size: .8rem; font-weight: 500;
          background: none; border: none; cursor: pointer;
          padding: .4rem .6rem; border-radius: 8px;
          transition: all .2s; font-family: 'DM Sans', sans-serif;
        }
        .br-clear-btn:hover { color: #ef4444; background: rgba(239,68,68,.06); }

        /* ── Filter panel ── */
        .br-filter-panel {
          background: #fff; border: 1px solid #e8ecef;
          border-radius: 20px; padding: 2rem;
          margin-bottom: 2rem;
          animation: br-slide-down .25s cubic-bezier(.16,1,.3,1) both;
        }
        @keyframes br-slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .br-filter-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.25rem; margin-bottom: 1.5rem;
        }
        .br-filter-label {
          display: block; font-size: .78rem; font-weight: 700;
          color: #344054; margin-bottom: .45rem;
          letter-spacing: .02em;
        }
        .br-filter-input,
        .br-filter-select {
          width: 100%; padding: .65rem .9rem;
          background: #f7f3ed; border: 1.5px solid #e8ecef;
          border-radius: 10px; font-size: .85rem; color: #1a3a2a;
          font-family: 'DM Sans', sans-serif; outline: none;
          transition: border-color .2s, background .2s;
          -webkit-appearance: none; appearance: none;
        }
        .br-filter-input:focus,
        .br-filter-select:focus {
          border-color: #76c43b; background: #fff;
        }
        .br-filter-select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2398a2b3' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right .75rem center;
          padding-right: 2.2rem;
          cursor: pointer;
        }

        .br-allergen-title {
          font-size: .78rem; font-weight: 700;
          color: #344054; margin-bottom: .75rem;
          letter-spacing: .02em;
        }
        .br-allergen-chips {
          display: flex; flex-wrap: wrap; gap: .5rem;
        }
        .br-allergen-chip {
          padding: .35rem .8rem;
          border: 1.5px solid #e8ecef;
          border-radius: 100px; font-size: .78rem; font-weight: 500;
          color: #667085; background: #fff; cursor: pointer;
          transition: all .18s; font-family: 'DM Sans', sans-serif;
        }
        .br-allergen-chip:hover { border-color: #76c43b; color: #1a3a2a; }
        .br-allergen-chip.active {
          background: #1a3a2a; border-color: #1a3a2a;
          color: #fff;
        }

        /* ── Category tabs ── */
        .br-cats {
          display: flex; gap: .5rem; flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .br-cat-btn {
          padding: .4rem .9rem;
          border: 1.5px solid #e8ecef;
          border-radius: 100px; font-size: .78rem; font-weight: 500;
          color: #667085; background: #fff; cursor: pointer;
          transition: all .18s; font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }
        .br-cat-btn:hover { border-color: #76c43b; color: #1a3a2a; }
        .br-cat-btn.active {
          background: #1a3a2a; border-color: #1a3a2a; color: #fff;
        }

        /* ── Empty state ── */
        .br-empty {
          text-align: center; padding: 6rem 2rem;
        }
        .br-empty-icon {
          width: 80px; height: 80px; border-radius: 50%;
          background: #ede8e0;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.5rem;
        }
        .br-empty h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem; font-weight: 700;
          color: #1a3a2a; margin-bottom: .65rem;
        }
        .br-empty p { color: #667085; font-size: .9rem; line-height: 1.7; max-width: 360px; margin: 0 auto 1.75rem; }
        .br-empty-btn {
          display: inline-flex; align-items: center; gap: .5rem;
          background: #1a3a2a; color: #fff;
          font-weight: 600; font-size: .88rem;
          padding: .75rem 1.5rem; border-radius: 100px;
          border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background .2s;
        }
        .br-empty-btn:hover { background: #2d5a3d; }
      `}</style>

      <div className="br-page">

        {/* ── Hero ── */}
        <section className="br-hero">
          <div className="br-hero-glow" />
          <div className="br-hero-glow2" />
          <div className="br-hero-inner">
            <div className="br-hero-tag">
              <Leaf size={11} />
              {resultsCount} items available now
            </div>
            <h1 className="br-hero-title">
              Fresh food, <em>near you.</em><br />
              Right now.
            </h1>
            <p className="br-hero-sub">
              Browse surplus food from restaurants, supermarkets and households
              in your community. Reserve in seconds, pick up at your convenience.
            </p>

            {/* Search bar */}
            <div className="br-search-wrap">
              <div className="br-search-icon">
                <Search size={18} />
              </div>
              <input
                type="text"
                className="br-search-input"
                placeholder="Search by food name, description or location..."
                value={filters.searchQuery}
                onChange={e => updateFilter('searchQuery', e.target.value)}
              />
            </div>

            <div className="br-hero-pills">
              <div className="br-pill">
                <div className="br-pill-dot" />
                Free to reserve
              </div>
              <div className="br-pill">
                <MapPin size={11} />
                Multiple locations
              </div>
              <div className="br-pill">
                <Clock size={11} />
                Updated in real time
              </div>
              <div className="br-pill">
                <Flame size={11} />
                Expiring soon alerts
              </div>
            </div>
          </div>
        </section>

        {/* ── Body ── */}
        <div className="br-body">
          <ErrorBoundary>

            {/* Category quick-filter tabs */}
            <div className="br-cats">
              <button
                className={`br-cat-btn ${!filters.category || filters.category === 'all' ? 'active' : ''}`}
                onClick={() => updateFilter('category', '')}
              >
                All
              </button>
              {FOOD_CATEGORIES.map(c => (
                <button
                  key={c}
                  className={`br-cat-btn ${filters.category === c ? 'active' : ''}`}
                  onClick={() => updateFilter('category', filters.category === c ? '' : c)}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Toolbar */}
            <div className="br-toolbar">
              <p className="br-results-label">
                <strong>{resultsCount}</strong> {resultsCount === 1 ? 'item' : 'items'} found
                {hasActive && <span style={{ color: '#76c43b', fontWeight: 600 }}> · filters active</span>}
              </p>

              <div className="br-toolbar-right">
                {hasActive && (
                  <button className="br-clear-btn" onClick={clearFilters}>
                    <X size={13} /> Clear all
                  </button>
                )}
                <select
                  className="br-sort-select"
                  value={filters.sortBy}
                  onChange={e => updateFilter('sortBy', e.target.value)}
                >
                  <option value="newest">Newest first</option>
                  <option value="expiry">Expiring soon</option>
                  <option value="quantity">Largest quantity</option>
                </select>
                <button
                  className={`br-filter-btn ${filtersOpen ? 'active' : ''}`}
                  onClick={() => setFiltersOpen(v => !v)}
                >
                  <SlidersHorizontal size={14} />
                  Filters
                  {activeCount > 0 && (
                    <span className="br-filter-badge">{activeCount}</span>
                  )}
                  <ChevronDown
                    size={13}
                    style={{
                      transform: filtersOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform .2s'
                    }}
                  />
                </button>
              </div>
            </div>

            {/* Filter panel */}
            {filtersOpen && (
              <div className="br-filter-panel">
                <div className="br-filter-grid">
                  <div>
                    <label className="br-filter-label">Location</label>
                    <input
                      type="text"
                      className="br-filter-input"
                      placeholder="City or area..."
                      value={filters.location}
                      onChange={e => updateFilter('location', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="br-filter-label">Expiry window</label>
                    <select
                      className="br-filter-select"
                      value={filters.expiryRange || 'all'}
                      onChange={e => updateFilter('expiryRange', e.target.value === 'all' ? '' : e.target.value)}
                    >
                      <option value="all">Any timeframe</option>
                      <option value="today">Expires today</option>
                      <option value="tomorrow">Expires tomorrow</option>
                      <option value="week">This week</option>
                      <option value="month">This month</option>
                    </select>
                  </div>
                  <div>
                    <label className="br-filter-label">Max distance</label>
                    <select
                      className="br-filter-select"
                      value={filters.maxDistance || 'all'}
                      onChange={e => updateFilter('maxDistance', e.target.value === 'all' ? '' : e.target.value)}
                    >
                      <option value="all">Any distance</option>
                      <option value="5">Within 5 miles</option>
                      <option value="10">Within 10 miles</option>
                      <option value="25">Within 25 miles</option>
                      <option value="50">Within 50 miles</option>
                    </select>
                  </div>
                </div>

                <div>
                  <p className="br-allergen-title">Exclude allergens</p>
                  <div className="br-allergen-chips">
                    {COMMON_ALLERGENS.map(a => (
                      <button
                        key={a}
                        className={`br-allergen-chip ${filters.allergens.includes(a) ? 'active' : ''}`}
                        onClick={() => toggleAllergen(a)}
                      >
                        {filters.allergens.includes(a) && (
                          <X size={10} style={{ display: 'inline', marginRight: 3 }} />
                        )}
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Grid */}
            {!isLoading && foodListings.length === 0 ? (
              <div className="br-empty">
                <div className="br-empty-icon">
                  <Search size={32} color="#98a2b3" />
                </div>
                <h3>No listings found</h3>
                <p>
                  {hasActive
                    ? "Try adjusting your filters or clearing them to see all available food."
                    : "No food listings are available right now. Check back soon — listings are added throughout the day."
                  }
                </p>
                {hasActive && (
                  <button className="br-empty-btn" onClick={clearFilters}>
                    <X size={14} /> Clear filters
                  </button>
                )}
              </div>
            ) : (
              <PaginatedFoodGrid
                foodListings={foodListings}
                isLoading={isLoading}
                itemsPerPage={12}
              />
            )}

          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}
