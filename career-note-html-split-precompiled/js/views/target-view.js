"use strict";
// target-view.js に切り出しやすい領域
const TargetView = ({ data, isExporting, onUpdate, openTextInput, getFontSize, onFontSizeChange, setDeleteTabModal, activeTab, formatDate, handleCopyAdvicePrompt, handleCopyActionPlanPrompt }) => {
    return (React.createElement("div", { className: "flex flex-col gap-6 relative bg-white rounded-xl shadow-inner p-4 sm:p-8 font-pop" },
        React.createElement("div", { className: "flex flex-col gap-4 mt-4" },
            React.createElement("div", { className: "flex flex-col md:flex-row items-start sm:items-end justify-between gap-4" },
                React.createElement("div", { className: "flex items-center gap-4 w-full md:w-auto" },
                    !isExporting && (React.createElement("div", { className: "flex flex-col gap-1 shrink-0" },
                        React.createElement("div", { className: "flex items-center justify-between" },
                            React.createElement("span", { className: "text-xs font-bold text-gray-500" }, "\u30BF\u30D6\u540D"),
                            React.createElement("button", { type: "button", onClick: () => setDeleteTabModal({ isOpen: true, targetId: activeTab }), className: "text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-1 py-0.5 rounded transition-colors flex items-center gap-0.5", title: "\u3053\u306E\u30BF\u30D6\u3092\u524A\u9664" },
                                React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-3.5 w-3.5", viewBox: "0 0 20 20", fill: "currentColor" },
                                    React.createElement("path", { fillRule: "evenodd", d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z", clipRule: "evenodd" })),
                                "\u30BF\u30D6\u3092\u524A\u9664")),
                        React.createElement("div", { onClick: () => openTextInput('タブ名', data.tabLabel, v => onUpdate('tabLabel', v)), className: "text-sm font-bold border-2 border-gray-300 rounded px-2 py-1 w-32 bg-gray-50 text-gray-700 cursor-pointer hover:bg-gray-100 min-h-[2rem] flex items-center" }, data.tabLabel))),
                    React.createElement("div", { className: "flex-1 min-w-0 text-center md:text-left" },
                        React.createElement("div", { className: `text-xl sm:text-2xl md:text-3xl font-black text-gray-900 tracking-wide overflow-hidden text-ellipsis ${isExporting ? 'pt-0 pb-2' : ''}` }, data.title))),
                data.updatedAt && (React.createElement("span", { className: "text-xs sm:text-sm font-bold text-gray-500 shrink-0 ml-auto" },
                    "\u6700\u7D42\u66F4\u65B0: ",
                    formatDate(data.updatedAt)))),
            React.createElement("div", { className: "flex justify-end border-b-[3px] border-gray-800 pb-3" },
                React.createElement("div", { className: "flex items-center gap-4 text-base sm:text-xl font-bold w-full md:w-auto justify-end" }, isExporting ?
                    React.createElement("div", { className: "border-b-[3px] border-gray-800 w-48 sm:w-64 pb-1 text-center tracking-widest text-gray-900 text-xl sm:text-2xl" }, data.name)
                    :
                        React.createElement("div", { onClick: () => openTextInput('名前', data.name, v => onUpdate('name', v)), className: "border-b-[3px] border-gray-800 w-48 sm:w-64 font-bold bg-transparent text-center tracking-widest text-gray-900 text-xl sm:text-2xl cursor-pointer hover:bg-gray-50/50 min-h-[2.5rem]" }, data.name || React.createElement("span", { className: "text-gray-400 font-normal" }, "\u540D\u524D"))))),
        React.createElement("div", { className: "flex flex-col gap-4 mt-2 pb-8" },
            React.createElement(TargetField, { field: "q1", num: "\u2460", title: "\u5C06\u6765\u3069\u3093\u306A\u751F\u6D3B\u3092\u3057\u305F\u3044\u3067\u3059\u304B\uFF1F", bgColor: "bg-white", value: data.q1, onClick: () => openTextInput('将来どんな生活をしたいですか？', data.q1, v => onUpdate('q1', v), true), isExporting: isExporting, fontSizeMode: getFontSize('q1'), onFontSizeChange: onFontSizeChange, heightClass: "h-32 sm:h-40" }),
            React.createElement(TargetField, { field: "q2", num: "\u2461", title: "\u5148\u751F\u304B\u3089\u306E\u30A2\u30C9\u30D0\u30A4\u30B9", bgColor: "bg-red-200", value: data.q2, onClick: () => openTextInput('先生からのアドバイス', data.q2, v => onUpdate('q2', v), true), isExporting: isExporting, fontSizeMode: getFontSize('q2'), onFontSizeChange: onFontSizeChange, heightClass: "h-40 sm:h-48", actionButton: React.createElement(AiActionPanel, { onGenerate: handleCopyAdvicePrompt, buttonText: "AI\u5148\u751F\u306B\u805E\u3044\u3066\u307F\u3088\u3046", bgColorClass: "bg-red-100", hoverColorClass: "hover:bg-red-200", textColorClass: "text-red-800", borderColorClass: "border-red-300" }) }),
            React.createElement(TargetListField, { field: "q3", num: "\u2462", title: isExporting ? React.createElement(React.Fragment, null,
                    data.term || '一学期',
                    "\u306E\u76EE\u6A19") : React.createElement("span", { className: "flex items-center gap-1" },
                    React.createElement("span", { onClick: (e) => { e.stopPropagation(); openTextInput('学期', data.term, v => onUpdate('term', v)); }, className: "bg-transparent border-b-2 border-gray-500 cursor-pointer hover:bg-gray-50/50 min-w-[3rem] text-center text-gray-900 font-bold px-1" }, data.term || '一学期'),
                    React.createElement("span", null, "\u306E\u76EE\u6A19")), bgColor: "bg-white", items: Array.isArray(data.q3) ? data.q3 : [{ id: generateId(), text: data.q3 || '' }], onItemsChange: (v) => onUpdate('q3', v), onClickItem: (text, onSave) => openTextInput('目標', text, onSave, true), isExporting: isExporting, fontSizeMode: getFontSize('q3'), onFontSizeChange: onFontSizeChange, heightClass: "h-48 sm:h-56" }),
            React.createElement(TargetField, { field: "q4", num: "\u2463", title: "\u76EE\u6A19\u9054\u6210\u306B\u5411\u3051\u3066\u304C\u3093\u3070\u308B\u3053\u3068", bgColor: "bg-yellow-400", value: data.q4, onClick: () => openTextInput('目標達成に向けてがんばること', data.q4, v => onUpdate('q4', v), true), isExporting: isExporting, fontSizeMode: getFontSize('q4'), onFontSizeChange: onFontSizeChange, heightClass: "h-32 sm:h-48", actionButton: React.createElement(AiActionPanel, { onGenerate: handleCopyActionPlanPrompt, buttonText: "AI\u5148\u751F\u306B\u805E\u3044\u3066\u307F\u3088\u3046", bgColorClass: "bg-blue-100", hoverColorClass: "hover:bg-blue-200", textColorClass: "text-blue-800", borderColorClass: "border-blue-300" }) }),
            React.createElement(TargetField, { field: "q5", num: "\u2464", title: isExporting ? React.createElement(React.Fragment, null,
                    data.term || '一学期',
                    "\u306E\u632F\u308A\u8FD4\u308A\u3068\u3001\u3053\u308C\u304B\u3089\u304C\u3093\u3070\u308A\u305F\u3044\u3053\u3068") : React.createElement("span", { className: "flex items-center gap-1" },
                    React.createElement("span", { onClick: (e) => { e.stopPropagation(); openTextInput('学期', data.term, v => onUpdate('term', v)); }, className: "bg-transparent border-b-2 border-gray-500 cursor-pointer hover:bg-gray-50/50 min-w-[3rem] text-center text-gray-900 font-bold px-1" }, data.term || '一学期'),
                    React.createElement("span", null, "\u306E\u632F\u308A\u8FD4\u308A\u3068\u3001\u3053\u308C\u304B\u3089\u304C\u3093\u3070\u308A\u305F\u3044\u3053\u3068")), bgColor: "bg-orange-300", value: data.q5, onClick: () => openTextInput('振り返りとこれからがんばりたいこと', data.q5, v => onUpdate('q5', v), true), isExporting: isExporting, fontSizeMode: getFontSize('q5'), onFontSizeChange: onFontSizeChange }))));
};
