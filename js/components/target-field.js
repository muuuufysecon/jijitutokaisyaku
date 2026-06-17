"use strict";
// target-field.js に切り出しやすい領域
const TargetField = ({ field, num, title, bgColor, value, onClick, isExporting, actionButton, fontSizeMode, onFontSizeChange, heightClass }) => {
    const fontSizeClass = FONT_SIZES[fontSizeMode || 'medium'];
    return (React.createElement("div", { className: "relative pt-4 w-full mt-4 sm:mt-6 group flex-1" },
        !isExporting && (React.createElement("div", { className: "absolute -top-1 right-2 z-20 opacity-40 hover:opacity-100 focus-within:opacity-100 transition-opacity" },
            React.createElement(FontSizeToggle, { value: fontSizeMode, onChange: (v) => onFontSizeChange(field, v) }))),
        React.createElement("div", { className: `absolute top-0 left-4 sm:left-8 px-5 sm:px-8 ${bgColor} border-[3px] border-gray-800 rounded-full ${isExporting ? 'pt-0 pb-2' : 'py-1'} z-10 font-bold text-gray-900 shadow-sm flex items-center justify-start text-lg sm:text-xl tracking-widest` },
            num,
            " ",
            title),
        React.createElement("div", { className: `border-[3px] border-gray-800 rounded-3xl p-4 sm:p-6 pt-10 sm:pt-12 bg-white shadow-sm relative z-0 flex flex-col ${heightClass || 'h-48 sm:h-56'}` },
            isExporting ? (React.createElement(AutoFitText, { text: value, maxSize: 32, className: "text-gray-800 font-medium" })) : (React.createElement("div", { onClick: onClick, className: `w-full h-full overflow-y-auto cursor-pointer hover:bg-gray-50/50 bg-transparent font-medium leading-relaxed text-gray-800 whitespace-pre-wrap ${fontSizeClass}` }, value || React.createElement("span", { className: "text-gray-400" }, "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u5165\u529B..."))),
            actionButton && !isExporting && (React.createElement("div", { className: "absolute bottom-3 right-3 sm:right-6 z-20" }, actionButton)))));
};
