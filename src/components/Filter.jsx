import React from 'react';
import useTheme from '../hooks/useTheme';

export default function Filter({ currentFilter, setFilter, availableFilters }) {
  const { background, accent, text } = useTheme(); 
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-6">
      {availableFilters.map((filterName) => {
        const isActive = currentFilter === filterName;

        return (
          <button
            key={filterName}
            onClick={() => setFilter(filterName)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors`}
            style={{
              backgroundColor: isActive ? accent : 'white',
              color: isActive ? 'white' : text,
              border: `2px solid ${accent}`
            }}
          >
            {filterName}
          </button>
        );
      })}
    </div>
  );
}