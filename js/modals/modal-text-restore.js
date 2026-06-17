"use strict";
// modal-text-restore.js に切り出しやすい領域
const TextRestoreModal = ({ isOpen, onClose, importText, setImportText, handleTextImport }) => {
    if (!isOpen)
        return null;
    return (React.createElement("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4" },
        React.createElement("div", { className: "absolute inset-0 bg-black/50", onClick: onClose }),
        React.createElement("div", { className: "relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg flex flex-col border-[4px] border-blue-400" },
            React.createElement("h2", { className: "text-xl font-bold mb-4 text-blue-800" }, "\u6587\u5B57\u30B3\u30FC\u30C9\u3067\u5FA9\u5143"),
            React.createElement("p", { className: "text-sm text-gray-600 mb-4" }, "\u4FDD\u5B58\u3057\u3066\u304A\u3044\u305F\u6587\u5B57\u30B3\u30FC\u30C9\u3092\u4E0B\u306E\u67A0\u306B\u8CBC\u308A\u4ED8\u3051\u3066\u304F\u3060\u3055\u3044\u3002")
        /* modal-text-restore-input-section.js に切り出しやすい領域 */
        ,
            "/* modal-text-restore-input-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
            React.createElement("textarea", { value: importText, onChange: e => setImportText(e.target.value), className: "w-full h-48 p-3 border-2 border-gray-300 rounded-xl font-mono text-xs outline-none focus:border-blue-500 mb-4 resize-none", placeholder: "\u6587\u5B57\u30B3\u30FC\u30C9\u3092\u3053\u3053\u306B\u8CBC\u308A\u4ED8\u3051..." }),
            React.createElement("div", { className: "flex gap-3 justify-end" },
                "/* modal-text-restore-actions-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
                React.createElement("button", { type: "button", onClick: onClose, className: "px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-bold" }, "\u30AD\u30E3\u30F3\u30BB\u30EB"),
                React.createElement("button", { type: "button", onClick: handleTextImport, disabled: !importText.trim(), className: "px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold disabled:opacity-50" }, "\u5FA9\u5143\u3059\u308B")))));
};
