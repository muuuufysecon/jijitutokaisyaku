"use strict";
// modal-text-backup.js に切り出しやすい領域
const TextBackupModal = ({ isOpen, onClose, importText, copyToClipboard, setSyncStatus, setIsTextBackupModalOpen }) => {
    if (!isOpen)
        return null;
    return (React.createElement("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4" },
        React.createElement("div", { className: "absolute inset-0 bg-black/50", onClick: onClose }),
        React.createElement("div", { className: "relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg flex flex-col border-[4px] border-indigo-400" },
            React.createElement("h2", { className: "text-xl font-bold mb-4 text-indigo-800" }, "\u6587\u5B57\u30B3\u30FC\u30C9\u3067\u4FDD\u5B58\uFF08\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\uFF09"),
            React.createElement("p", { className: "text-sm text-gray-600 mb-4" }, "\u4E0B\u306E\u6587\u5B57\u30B3\u30FC\u30C9\u3092\u30B3\u30D4\u30FC\u3057\u3066\u3001\u30E1\u30E2\u5E33\u306A\u3069\u306B\u8CBC\u308A\u4ED8\u3051\u3066\u4FDD\u5B58\u3057\u3066\u304F\u3060\u3055\u3044\u3002")
        /* modal-text-backup-preview-section.js に切り出しやすい領域 */
        ,
            "/* modal-text-backup-preview-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
            React.createElement("textarea", { readOnly: true, value: importText, className: "w-full h-48 p-3 border-2 border-gray-300 rounded-xl font-mono text-xs text-gray-600 outline-none bg-gray-50 mb-4 resize-none", onClick: e => e.target.select() }),
            React.createElement("div", { className: "flex gap-3 justify-end" },
                "/* modal-text-backup-actions-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
                React.createElement("button", { type: "button", onClick: onClose, className: "px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-bold" }, "\u9589\u3058\u308B"),
                React.createElement("button", { type: "button", onClick: () => { copyToClipboard(importText); setSyncStatus('✅ コピー完了'); setTimeout(() => setSyncStatus('☁️ 最新'), 3000); setIsTextBackupModalOpen(false); }, className: "px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-bold" }, "\u30B3\u30FC\u30C9\u3092\u30B3\u30D4\u30FC")))));
};
// modal-guidance.js に切り出しやすい領域
