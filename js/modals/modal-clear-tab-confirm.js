"use strict";
// modal-clear-tab-confirm.js に切り出しやすい領域
const ClearTabConfirmModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen)
        return null;
    return (React.createElement("div", { className: "fixed inset-0 z-[60] flex items-center justify-center p-4" },
        React.createElement("div", { className: "absolute inset-0 bg-black/50", onClick: onClose }),
        React.createElement("div", { className: "relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm flex flex-col items-center text-center border-4 border-red-400" },
            React.createElement("div", { className: "w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-3xl mb-4" }, "\uD83E\uDDF9"),
            React.createElement("h2", { className: "text-xl font-bold mb-2" }, "\u5185\u5BB9\u3092\u30AF\u30EA\u30A2\u3057\u307E\u3059\u304B\uFF1F"),
            React.createElement("p", { className: "text-sm text-gray-500 mb-6 font-bold" }, "\u3053\u306E\u30DA\u30FC\u30B8\u306E\u5165\u529B\u5185\u5BB9\u304C\u3059\u3079\u3066\u6D88\u53BB\u3055\u308C\u307E\u3059\u3002\uFF08\u623B\u308B\u30DC\u30BF\u30F3\u3067\u5FA9\u5143\u53EF\u80FD\u3067\u3059\uFF09")
        /* modal-clear-tab-actions-section.js に切り出しやすい領域 */
        ,
            "/* modal-clear-tab-actions-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
            React.createElement("div", { className: "flex gap-3 w-full" },
                React.createElement("button", { type: "button", onClick: onClose, className: "flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-bold" }, "\u30AD\u30E3\u30F3\u30BB\u30EB"),
                React.createElement("button", { type: "button", onClick: onConfirm, className: "flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold" }, "\u30AF\u30EA\u30A2\u3059\u308B")))));
};
// --- Main App Component ---
