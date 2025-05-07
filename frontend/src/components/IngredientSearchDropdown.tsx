import React, { useState } from "react";
import IngredientSearchBar from "./IngredientSearchBar"; 

interface IngredientSearchDropdownProps {
  onSearch: (ingredients: string[]) => void;
}
const IngredientSearchDropdown: React.FC<IngredientSearchDropdownProps> = ({ 
  onSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
            onClick={() => toggleDropdown()}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg
              font-medium transition-all duration-200
              shadow-sm hover:shadow-md hover:cursor-pointer
              ${
                isOpen
                  ? "bg-gray-100 text-gray-700 hover:bg-black hover:text-white"
                  : "bg-orange-400 text-white hover:bg-black"
              }
            `}
          >
            {isOpen ? "Hide Search Bar" : "Show Search Bar"}
          </button>

      {/* Collapsible Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2
            min-w-[40rem] max-w-2xl
            bg-white rounded border border-gray-200
            shadow-lg p-4 z-10">
          <IngredientSearchBar onSearch = {onSearch}/>
        </div>
      )}
    </div>
  );
};

export default IngredientSearchDropdown;
