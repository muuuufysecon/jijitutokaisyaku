"use strict";
// modal-pwa-install-prompt.js に切り出しやすい領域
const PwaInstallPrompt = ({ showPwaPrompt, setShowPwaPrompt }) => {
    if (!showPwaPrompt)
        return null;
    return (React.createElement("div", { className: "fixed bottom-0 left-0 right-0 z-[100] p-4 flex justify-center pointer-events-none" },
        React.createElement("div", { className: "bg-white rounded-2xl shadow-2xl p-5 w-full max-w-sm pointer-events-auto border-2 border-blue-400 flex flex-col items-center text-center animate-bounce" },
            React.createElement("button", { onClick: () => setShowPwaPrompt(false), className: "absolute top-2 right-2 text-gray-400 hover:text-gray-600" },
                "/* modal-pwa-close-button-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
                React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }))),
            React.createElement("div", { className: "text-4xl mb-2" }, "\uD83D\uDCF1"),
            React.createElement("h3", { className: "font-black text-lg text-blue-800 mb-2" }, "\u30DB\u30FC\u30E0\u753B\u9762\u306B\u8FFD\u52A0\u3057\u3066\u4F7F\u304A\u3046\uFF01")
        /* modal-pwa-guidance-section.js に切り出しやすい領域 */
        ,
            "/* modal-pwa-guidance-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
            React.createElement("p", { className: "text-sm font-bold text-gray-600 mb-3 leading-relaxed" },
                "\u753B\u9762\u4E0B\u306E ",
                React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 inline-block mx-1 text-blue-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" })),
                " \u5171\u6709\u30DC\u30BF\u30F3\u304B\u3089",
                React.createElement("br", null),
                React.createElement("br", null),
                "\u300C\u30DB\u30FC\u30E0\u753B\u9762\u306B\u8FFD\u52A0\u300D\u3092\u9078\u3076\u3068",
                React.createElement("br", null),
                React.createElement("br", null),
                "\u5168\u753B\u9762\u306E\u30A2\u30D7\u30EA\u3068\u3057\u3066\u4F7F\u3048\u307E\u3059\u3002"),
            React.createElement("button", { onClick: () => setShowPwaPrompt(false), className: "w-full py-2 bg-blue-50 text-blue-600 rounded-lg font-bold border border-blue-200" }, "/* modal-pwa-confirm-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */ OK\u3001\u308F\u304B\u3063\u305F"))));
};
// modal-profile-helpers.js に切り出しやすい領域
