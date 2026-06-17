"use strict";
// modal-delete-tab-confirm.js に切り出しやすい領域
const DeleteTabConfirmModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen)
        return null;
    return (React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4" },
        React.createElement("div", { className: "absolute inset-0 bg-black/50", onClick: onClose }),
        React.createElement("div", { className: "relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm flex flex-col items-center text-center border-4 border-red-400" },
            React.createElement("div", { className: "w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-3xl mb-4" }, "\u26A0\uFE0F"),
            React.createElement("h2", { className: "text-xl font-bold mb-2" }, "\u672C\u5F53\u306B\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F"),
            React.createElement("p", { className: "text-sm text-gray-500 mb-6 font-bold" }, "\u3053\u306E\u64CD\u4F5C\u306F\u53D6\u308A\u6D88\u305B\u307E\u305B\u3093\u3002")
        /* modal-delete-tab-actions-section.js に切り出しやすい領域 */
        ,
            "/* modal-delete-tab-actions-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
            React.createElement("div", { className: "flex gap-3 w-full" },
                React.createElement("button", { type: "button", onClick: onClose, className: "flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-bold" }, "\u3044\u3044\u3048"),
                React.createElement("button", { type: "button", onClick: onConfirm, className: "flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold" }, "\u306F\u3044")))));
};
