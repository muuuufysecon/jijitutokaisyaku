"use strict";
// modal-ai-auth.js に切り出しやすい領域
const AiPasswordModal = ({ aiAuthModal, setAiAuthModal, handleAiAuthSubmit }) => {
    if (!aiAuthModal.isOpen)
        return null;
    return (React.createElement("div", { className: "fixed inset-0 z-[110] flex items-center justify-center p-4" },
        React.createElement("div", { className: "absolute inset-0 bg-black/50", onClick: () => setAiAuthModal({ isOpen: false, pendingAction: null, password: '', error: '' }) }),
        React.createElement("div", { className: "relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm flex flex-col border-[4px] border-blue-400" },
            React.createElement("h2", { className: "text-xl font-bold mb-4 text-blue-800" }, "\u30D1\u30B9\u30EF\u30FC\u30C9\u5165\u529B"),
            React.createElement("p", { className: "text-sm text-gray-600 mb-4" }, "AI\u5148\u751F\u306B\u805E\u304F\u305F\u3081\u306E\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002")
        /* modal-ai-auth-form-section.js に切り出しやすい領域 */
        ,
            "/* modal-ai-auth-form-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
            React.createElement("input", { type: "password", value: aiAuthModal.password, onChange: (e) => setAiAuthModal(prev => ({ ...prev, password: e.target.value, error: '' })), className: `w-full border-2 rounded-lg p-3 outline-none text-lg font-bold text-gray-800 ${aiAuthModal.error ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'}`, placeholder: "\u30D1\u30B9\u30EF\u30FC\u30C9", autoFocus: true, onKeyDown: (e) => {
                    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                        e.preventDefault();
                        handleAiAuthSubmit();
                    }
                } }),
            aiAuthModal.error && React.createElement("p", { className: "text-red-500 text-sm font-bold mt-2" }, aiAuthModal.error),
            React.createElement("div", { className: "mt-6 flex justify-end gap-3" },
                "/* modal-ai-auth-actions-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
                React.createElement("button", { type: "button", onClick: () => setAiAuthModal({ isOpen: false, pendingAction: null, password: '', error: '' }), className: "px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-bold" }, "\u30AD\u30E3\u30F3\u30BB\u30EB"),
                React.createElement("button", { type: "button", onClick: handleAiAuthSubmit, disabled: !aiAuthModal.password, className: "px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold disabled:opacity-50" }, "\u78BA\u8A8D")))));
};
