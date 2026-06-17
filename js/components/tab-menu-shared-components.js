"use strict";
// tab-menu-shared-components.js に切り出しやすい領域
const AddSheetActionButton = ({ label, onClick, variant = 'grid' }) => {
    const className = variant === 'menu'
        ? "px-4 py-3 text-left font-bold text-gray-700 hover:bg-green-50 border-b border-gray-100 transition-colors"
        : "px-2 py-2 bg-white border-2 border-green-400 text-green-700 rounded-lg shadow-sm font-bold text-xs hover:bg-green-50 active:scale-95 transition-transform";
    return (React.createElement("button", { type: "button", onClick: onClick, className: className }, label));
};
