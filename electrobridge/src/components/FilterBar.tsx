"use client";

import { CATEGORIES, ELIGIBILITY_OPTIONS, LOCATIONS, DEADLINE_FILTERS } from "@/lib/utils";

interface FilterBarProps {
  selectedCategory: string;
  selectedEligibility: string;
  selectedLocation: string;
  selectedDeadline: string;
  onCategoryChange: (value: string) => void;
  onEligibilityChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onDeadlineChange: (value: string) => void;
}

export default function FilterBar({
  selectedCategory,
  selectedEligibility,
  selectedLocation,
  selectedDeadline,
  onCategoryChange,
  onEligibilityChange,
  onLocationChange,
  onDeadlineChange,
}: FilterBarProps) {
  const selectClass =
    "bg-gray-800 border border-gray-700 text-text-primary text-sm rounded-lg px-3 py-2 focus:ring-cyan focus:border-cyan outline-none w-full";

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div>
        <label className="block text-text-muted text-xs font-medium mb-1">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={selectClass}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-text-muted text-xs font-medium mb-1">
          Eligibility
        </label>
        <select
          value={selectedEligibility}
          onChange={(e) => onEligibilityChange(e.target.value)}
          className={selectClass}
        >
          {ELIGIBILITY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-text-muted text-xs font-medium mb-1">
          Location
        </label>
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className={selectClass}
        >
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-text-muted text-xs font-medium mb-1">
          Deadline
        </label>
        <select
          value={selectedDeadline}
          onChange={(e) => onDeadlineChange(e.target.value)}
          className={selectClass}
        >
          {DEADLINE_FILTERS.map((df) => (
            <option key={df} value={df}>
              {df}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
