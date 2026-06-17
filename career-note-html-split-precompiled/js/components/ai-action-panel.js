"use strict";
// ai-action-panel.js に切り出しやすい領域
const AiActionPanel = ({ onGenerate, buttonText, bgColorClass = "bg-blue-100", hoverColorClass = "hover:bg-blue-200", textColorClass = "text-blue-800", borderColorClass = "border-blue-300" }) => (React.createElement("div", { className: "flex flex-wrap items-center gap-2 bg-white/90 p-1.5 rounded-2xl shadow-sm border border-gray-200 backdrop-blur-sm" },
    React.createElement("button", { type: "button", onClick: onGenerate, className: `${bgColorClass} ${hoverColorClass} ${textColorClass} text-xs sm:text-sm font-bold py-1.5 px-3 sm:px-4 rounded-full border-2 ${borderColorClass} shadow-sm flex items-center gap-1 transition-transform active:scale-95` },
        "\u2728 ",
        buttonText)));
// --- View Components ---
