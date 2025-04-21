import React from 'react';

export default function Filter({ currentFilter, setFilter, availableFilters }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-6">
      {availableFilters.map((filterName) => (
        <button
          key={filterName}
          onClick={() => setFilter(filterName)}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors
            ${currentFilter === filterName
              ? 'bg-[#552834] text-white'
              : 'bg-white text-[#552834] border border-[#552834] hover:bg-[#F7F4F4]'}
          `}
        >
          {filterName}
        </button>
      ))}
    </div>
  );
}