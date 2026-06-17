"use strict";
// modal-prompt-copied-notice.js に切り出しやすい領域
const PromptCopiedNoticeModal = ({ promptCopiedModal, setPromptCopiedModal }) => {
    if (!promptCopiedModal.isOpen)
        return null;
    return (React.createElement("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4" },
        React.createElement("div", { className: "absolute inset-0 bg-black/50", onClick: () => setPromptCopiedModal({ isOpen: false, text: '' }) }),
        React.createElement("div", { className: "relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg flex flex-col border-[6px] border-blue-400" },
            React.createElement("h2", { className: "text-2xl sm:text-3xl font-black mb-6 text-blue-800 text-center leading-snug" },
                "\u2705 AI\u5148\u751F\u306B\u805E\u304D\u305F\u3044\u3053\u3068\u304C",
                React.createElement("br", null),
                "\u30B3\u30D4\u30FC\u3055\u308C\u307E\u3057\u305F\uFF01")
        /* modal-prompt-guidance-section.js に切り出しやすい領域 */
        ,
            "/* modal-prompt-guidance-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
            React.createElement("p", { className: "text-lg sm:text-xl font-bold text-gray-700 mb-8 bg-yellow-50 p-6 rounded-2xl border-2 border-yellow-300 text-left leading-relaxed" },
                "Gemini\u3092\u958B\u3044\u305F\u5F8C\u3001\u30B3\u30D4\u30FC\u3057\u305F\u6587\u7AE0\u3092",
                React.createElement("span", { className: "text-red-500 font-black" }, "\u8CBC\u308A\u4ED8\u3051\u3066"),
                "\u3001\u30A2\u30C9\u30D0\u30A4\u30B9\u3092\u3082\u3089\u3063\u3066\u304F\u3060\u3055\u3044\u3002",
                React.createElement("br", null),
                "\u6307\u793A\u6587\u306F\u3001\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u30B3\u30D4\u30FC\u3055\u308C\u3066\u3044\u307E\u3059\u3002")
        /* modal-prompt-link-section.js に切り出しやすい領域 */
        ,
            "/* modal-prompt-link-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
            React.createElement("a", { href: "https://gemini.google.com/app", target: "_blank", rel: "noopener noreferrer", className: "block w-full py-5 mb-6 bg-blue-600 text-white rounded-2xl text-center font-black text-xl hover:bg-blue-700 transition-colors shadow-lg active:scale-95 flex flex-col items-center justify-center gap-1" },
                React.createElement("span", { className: "text-sm font-bold opacity-80" }, "\u3053\u3053\u3092\u30BF\u30C3\u30D7\u3057\u3066"),
                React.createElement("span", null, "\uD83D\uDD17 AI\u5148\u751F\uFF08Gemini\uFF09\u3092\u958B\u304F"))
        /* modal-prompt-preview-section.js に切り出しやすい領域 */
        ,
            "/* modal-prompt-preview-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
            React.createElement("div", { className: "w-full relative group" },
                React.createElement("div", { className: "text-xs font-bold text-gray-400 mb-1 ml-1" }, "\u30B3\u30D4\u30FC\u3055\u308C\u305F\u30C6\u30AD\u30B9\u30C8:"),
                React.createElement("textarea", { readOnly: true, value: promptCopiedModal.text, className: "w-full h-24 p-3 border-2 border-gray-200 rounded-xl font-mono text-xs text-gray-400 outline-none bg-gray-50 mb-6 resize-none" })),
            React.createElement("div", { className: "flex justify-center mt-2" },
                "/* modal-prompt-close-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
                React.createElement("button", { type: "button", onClick: () => setPromptCopiedModal({ isOpen: false, text: '' }), className: "px-10 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-black text-lg shadow-sm active:scale-95 transition-transform" }, "\u9589\u3058\u308B")))));
};
