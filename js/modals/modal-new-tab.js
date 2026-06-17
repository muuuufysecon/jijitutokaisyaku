"use strict";
// modal-new-tab.js に切り出しやすい領域
const NewTabModal = ({ newTabModal, setNewTabModal, handleCreateNewTab }) => {
    if (!newTabModal.isOpen)
        return null;
    return (React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4" },
        React.createElement("div", { className: "absolute inset-0 bg-black/50", onClick: () => setNewTabModal({ isOpen: false, type: '', input1: '', input2: '' }) }),
        React.createElement("div", { className: "relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md flex flex-col border-[4px] border-blue-400" },
            React.createElement("h2", { className: "text-xl font-bold mb-4 text-blue-800" }, newTabModal.type === 'target' ? 'いつの目標を立てますか？' : 'いつの実習記録ですか？')
        /* modal-new-tab-form-section.js に切り出しやすい領域 */
        ,
            "/* modal-new-tab-form-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
            React.createElement("div", { className: "flex flex-col gap-4 mb-6" },
                React.createElement("div", null,
                    React.createElement("label", { className: "block text-sm font-bold text-gray-700 mb-1" }, "\u5B66\u5E74 (\u4F8B: \u9AD81, 1\u5E74)"),
                    React.createElement("input", { type: "text", value: newTabModal.input1, onChange: (e) => setNewTabModal(prev => ({ ...prev, input1: e.target.value })), className: "w-full border-2 border-gray-300 rounded-lg px-4 py-2 outline-none font-bold focus:border-blue-500", autoFocus: true })),
                React.createElement("div", null,
                    React.createElement("label", { className: "block text-sm font-bold text-gray-700 mb-1" }, newTabModal.type === 'target' ? '学期 (例: 一学期, 前期)' : '何月 (例: 10月)'),
                    React.createElement("input", { type: "text", value: newTabModal.input2, onChange: (e) => setNewTabModal(prev => ({ ...prev, input2: e.target.value })), className: "w-full border-2 border-gray-300 rounded-lg px-4 py-2 outline-none font-bold focus:border-blue-500", onKeyDown: (e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing)
                            handleCreateNewTab(); } }))),
            React.createElement("div", { className: "flex gap-3 justify-end" },
                "/* modal-new-tab-actions-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
                React.createElement("button", { type: "button", onClick: () => setNewTabModal({ isOpen: false, type: '', input1: '', input2: '' }), className: "px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-bold" }, "\u30AD\u30E3\u30F3\u30BB\u30EB"),
                React.createElement("button", { type: "button", onClick: () => handleCreateNewTab(), disabled: !newTabModal.input1.trim() || !newTabModal.input2.trim(), className: "px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold disabled:opacity-50" }, "\u4F5C\u6210\u3059\u308B")))));
};
// modal-backup-restore.js に切り出しやすい領域
