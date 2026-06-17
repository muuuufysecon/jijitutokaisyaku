"use strict";
// target-list-field.js に切り出しやすい領域
const TargetListField = ({ field, num, title, bgColor, items, onItemsChange, onClickItem, isExporting, actionButton, fontSizeMode, onFontSizeChange, heightClass }) => {
    const fontSizeClass = FONT_SIZES[fontSizeMode || 'medium'];
    const handleAddItem = () => onItemsChange([...items, { id: generateId(), text: '' }]);
    const handleRemoveItem = (id) => onItemsChange(items.filter(item => item.id !== id));
    return (React.createElement("div", { className: "relative pt-4 w-full mt-4 sm:mt-6 group flex-1" },
        !isExporting && (React.createElement("div", { className: "absolute -top-1 right-2 z-20 opacity-40 hover:opacity-100 focus-within:opacity-100 transition-opacity" },
            React.createElement(FontSizeToggle, { value: fontSizeMode, onChange: (v) => onFontSizeChange(field, v) }))),
        React.createElement("div", { className: `absolute top-0 left-4 sm:left-8 px-5 sm:px-8 ${bgColor} border-[3px] border-gray-800 rounded-full ${isExporting ? 'pt-0 pb-2' : 'py-1'} z-10 font-bold text-gray-900 shadow-sm flex items-center justify-start text-lg sm:text-xl tracking-widest` },
            num,
            " ",
            title),
        React.createElement("div", { className: `border-[3px] border-gray-800 rounded-3xl p-4 sm:p-6 pt-10 sm:pt-12 pb-14 bg-white shadow-sm relative z-0 flex flex-col gap-3 min-h-[10rem] ${heightClass || 'h-40 sm:h-48'}` },
            isExporting ? (React.createElement("div", { className: "flex-1 relative w-full h-full" },
                React.createElement(AutoFitList, { items: items, maxSize: 32 }))) : (React.createElement("div", { className: "flex-1 overflow-y-auto flex flex-col gap-3" },
                items.map((item) => (React.createElement("div", { key: item.id, className: "relative flex items-center group/item" },
                    !isExporting && items.length > 1 && (React.createElement("button", { type: "button", onClick: () => handleRemoveItem(item.id), className: "absolute -left-3 top-1/2 -mt-3 bg-white border-2 border-red-400 text-red-500 hover:bg-red-50 w-6 h-6 rounded-full flex items-center justify-center font-bold opacity-0 group-hover/item:opacity-100 z-20 transition-opacity shadow-sm leading-none pb-0.5" }, "\u00D7")),
                    React.createElement("div", { className: "flex-1 border-b-2 border-dashed border-gray-300 pb-1 pl-2" },
                        React.createElement("div", { className: "flex" },
                            React.createElement("span", { className: "mr-2 font-bold text-gray-400 select-none" }, "\u30FB"),
                            React.createElement("div", { onClick: () => onClickItem(item.text, (newText) => { onItemsChange(items.map(i => i.id === item.id ? { ...i, text: newText } : i)); }), className: `flex-1 cursor-pointer hover:bg-gray-50/50 bg-transparent font-medium text-gray-800 whitespace-pre-wrap min-h-[1.5rem] flex items-center ${fontSizeClass}` }, item.text || React.createElement("span", { className: "text-gray-400" }, "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u5165\u529B..."))))))),
                !isExporting && (React.createElement("button", { type: "button", onClick: handleAddItem, className: "w-full py-2 bg-blue-50 hover:bg-blue-100 border-2 border-dashed border-blue-300 text-blue-500 rounded-xl font-bold flex items-center justify-center gap-1 transition-colors mt-2" },
                    React.createElement("span", { className: "text-xl leading-none" }, "\uFF0B"),
                    " \u67A0\u3092\u8FFD\u52A0")))),
            actionButton && !isExporting && (React.createElement("div", { className: "absolute bottom-3 right-3 sm:right-6 z-20" }, actionButton)))));
};
