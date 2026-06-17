"use strict";
// modal-country-select.js に切り出しやすい領域
const CountrySelectModal = ({ isOpen, onClose, FLAGS, onSelectCountry }) => {
    if (!isOpen)
        return null;
    return (React.createElement("div", { className: "fixed inset-0 z-[60] flex items-center justify-center p-4" },
        React.createElement("div", { className: "absolute inset-0 bg-black/50", onClick: onClose }),
        React.createElement("div", { className: "relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-3xl max-h-[90vh] flex flex-col border-[4px] border-blue-400" },
            React.createElement("h2", { className: "text-xl font-bold mb-4 text-blue-800" }, "\u51FA\u8EAB\u56FD\uFF08\u56FD\u65D7\uFF09\u3092\u9078\u629E"),
            React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-y-auto p-2" },
                "/* modal-country-grid-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
                Object.keys(FLAGS).map(key => (React.createElement("button", { key: key, onClick: () => onSelectCountry(key), className: "flex flex-col items-center gap-2 p-3 bg-gray-50 border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 rounded-xl transition-colors" },
                    React.createElement("div", { className: "w-20 h-14 border border-gray-300 bg-white rounded shadow-sm overflow-hidden flex items-center justify-center" },
                        React.createElement("svg", { viewBox: "0 0 900 600", className: "w-full h-full object-cover" }, FLAGS[key].svg)),
                    React.createElement("span", { className: "font-bold text-sm text-gray-700" }, FLAGS[key].name))))),
            React.createElement("div", { className: "flex justify-end mt-4 pt-4 border-t-2 border-gray-200" },
                "/* modal-country-actions-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
                React.createElement("button", { type: "button", onClick: onClose, className: "px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-bold" }, "\u30AD\u30E3\u30F3\u30BB\u30EB")))));
};
