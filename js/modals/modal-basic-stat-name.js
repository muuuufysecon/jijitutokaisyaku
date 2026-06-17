"use strict";
// modal-basic-stat-name.js に切り出しやすい領域
const BasicStatNameModal = ({ isOpen, onClose, customBasicStatName, setCustomBasicStatName, applyBasicStatName, BASIC_STAT_PRESETS }) => {
    if (!isOpen)
        return null;
    return (React.createElement("div", { className: "fixed inset-0 z-[60] flex items-center justify-center p-4" },
        React.createElement("div", { className: "absolute inset-0 bg-black/50", onClick: onClose }),
        React.createElement("div", { className: "relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg flex flex-col border-[4px] border-yellow-400" },
            React.createElement("h2", { className: "text-xl font-bold mb-4 text-yellow-800" }, "\u80FD\u529B\u306E\u540D\u524D\u3092\u5909\u66F4"),
            React.createElement("div", { className: "flex flex-col gap-4 mb-6" },
                "/* modal-basic-stat-input-groups-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
                React.createElement("div", { className: "bg-gray-50 p-4 rounded-xl border-2 border-gray-200" },
                    "/* modal-basic-stat-custom-input-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
                    React.createElement("label", { className: "block text-sm font-bold text-gray-700 mb-2" }, "\u81EA\u5206\u3067\u5165\u529B\u3059\u308B\uFF08\u7D75\u6587\u5B57\u3082\u4F7F\u3048\u307E\u3059\uFF09"),
                    React.createElement("div", { className: "flex gap-2" },
                        React.createElement("input", { type: "text", value: customBasicStatName, onChange: (e) => setCustomBasicStatName(e.target.value), className: "flex-1 border-2 border-gray-300 rounded-lg px-3 py-2 outline-none font-bold focus:border-yellow-500 text-lg", placeholder: "\u4F8B: \uD83C\uDFC3 \u4F53\u529B", autoFocus: true, onKeyDown: (e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing)
                                applyBasicStatName(customBasicStatName); } }),
                        React.createElement("button", { type: "button", onClick: () => applyBasicStatName(customBasicStatName), disabled: !customBasicStatName.trim(), className: "px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-bold disabled:opacity-50" }, "\u6C7A\u5B9A"))),
                React.createElement("div", null,
                    React.createElement("label", { className: "block text-sm font-bold text-gray-700 mb-2" }, "\u30D7\u30EA\u30BB\u30C3\u30C8\u304B\u3089\u9078\u3076")
                /* modal-basic-stat-presets-section.js に切り出しやすい領域 */
                ,
                    "/* modal-basic-stat-presets-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
                    React.createElement("div", { className: "flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1" }, BASIC_STAT_PRESETS.map((preset, i) => (React.createElement("button", { key: i, type: "button", onClick: () => applyBasicStatName(preset), className: "px-3 py-1.5 bg-white border-2 border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 rounded-full font-bold text-sm text-gray-700 transition-colors" }, preset)))))),
            React.createElement("div", { className: "flex gap-3 justify-end border-t-2 border-gray-200 pt-4 mt-auto" },
                "/* modal-basic-stat-actions-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
                React.createElement("button", { type: "button", onClick: onClose, className: "px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-bold" }, "\u30AD\u30E3\u30F3\u30BB\u30EB")))));
};
