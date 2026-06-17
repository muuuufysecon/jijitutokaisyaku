"use strict";
// font-size-toggle.js に切り出しやすい領域
const FontSizeToggle = ({ value, onChange, availableSizes = ['medium', 'large', 'xlarge'] }) => {
    const labels = { medium: '中', large: '大', xlarge: '特大' };
    const nextSize = () => {
        const currentIdx = availableSizes.indexOf(value);
        if (currentIdx === -1) {
            onChange(availableSizes[0]);
        }
        else {
            onChange(availableSizes[(currentIdx + 1) % availableSizes.length]);
        }
    };
    const displayLabel = labels[value] || labels['medium'];
    return (React.createElement("button", { type: "button", onClick: (e) => { e.preventDefault(); e.stopPropagation(); nextSize(); }, className: "px-2 py-1 text-xs font-black text-gray-700 bg-white hover:bg-gray-100 border-2 border-gray-300 rounded shadow-sm shrink-0 whitespace-nowrap z-50 flex items-center gap-1 active:scale-95 transition-transform", title: "\u30AF\u30EA\u30C3\u30AF\u3067\u6587\u5B57\u30B5\u30A4\u30BA\u3092\u5909\u66F4" },
        React.createElement("span", { className: "text-gray-400" }, "\u6587\u5B57:"),
        displayLabel));
};
// ==============================
// shared-ui-components.js に切り出しやすい領域
// ==============================
