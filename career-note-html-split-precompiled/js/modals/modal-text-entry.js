"use strict";
// modal-text-entry.js に切り出しやすい領域
const TextEntryModal = ({ textInputModal, setTextInputModal }) => {
    if (!textInputModal.isOpen)
        return null;
    return (React.createElement("div", { className: "fixed inset-0 z-[60] flex items-center justify-center p-4" },
        React.createElement("div", { className: "absolute inset-0 bg-black/50", onClick: () => setTextInputModal({ ...textInputModal, isOpen: false }) }),
        React.createElement("div", { className: "relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg flex flex-col border-[4px] border-blue-400" },
            React.createElement("h2", { className: "text-xl font-bold mb-4 text-blue-800" }, textInputModal.title)
        /* modal-text-entry-input-section.js に切り出しやすい領域 */
        ,
            "/* modal-text-entry-input-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
            textInputModal.multiline ? (React.createElement("textarea", { value: textInputModal.value, onChange: (e) => setTextInputModal({ ...textInputModal, value: e.target.value }), className: "w-full h-48 border-2 border-gray-300 rounded-lg p-3 outline-none text-lg resize-none focus:border-blue-500 font-medium text-gray-800 leading-relaxed", autoFocus: true })) : (React.createElement("input", { type: "text", value: textInputModal.value, onChange: (e) => setTextInputModal({ ...textInputModal, value: e.target.value }), className: "w-full border-2 border-gray-300 rounded-lg p-3 outline-none text-lg focus:border-blue-500 font-bold text-gray-800", autoFocus: true, onKeyDown: (e) => {
                    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                        e.preventDefault();
                        textInputModal.onSave(textInputModal.value);
                        setTextInputModal({ ...textInputModal, isOpen: false });
                    }
                } })),
            React.createElement("div", { className: "mt-6 flex justify-between w-full" },
                "/* modal-text-entry-actions-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
                React.createElement("button", { type: "button", onClick: () => setTextInputModal({ ...textInputModal, value: '' }), className: "px-5 py-2.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-full font-bold" }, "\u30AF\u30EA\u30A2"),
                React.createElement("div", { className: "flex gap-3" },
                    "/* modal-text-entry-confirm-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
                    React.createElement("button", { type: "button", onClick: () => setTextInputModal({ ...textInputModal, isOpen: false }), className: "px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-bold" }, "\u30AD\u30E3\u30F3\u30BB\u30EB"),
                    React.createElement("button", { type: "button", onClick: () => { textInputModal.onSave(textInputModal.value); setTextInputModal({ ...textInputModal, isOpen: false }); }, className: "px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold" }, "\u6C7A\u5B9A"))))));
};
