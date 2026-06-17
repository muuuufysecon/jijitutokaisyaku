"use strict";
// modal-bulk-pdf-export.js に切り出しやすい領域
const BulkPdfExportModal = ({ isOpen, onClose, bulkExportSelection, allTabs, handlePdfDragStart, handlePdfDragOver, handlePdfDrop, handlePdfDragEnd, setBulkExportSelection, handleBulkPDFExport, isExporting }) => {
    if (!isOpen)
        return null;
    return (React.createElement("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4" },
        React.createElement("div", { className: "absolute inset-0 bg-black/50", onClick: onClose }),
        React.createElement("div", { className: "relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl flex flex-col border-[4px] border-indigo-400 max-h-[90vh]" },
            React.createElement("h2", { className: "text-xl font-bold mb-4 text-indigo-800" }, "\u4E00\u62ECPDF\u51FA\u529B"),
            React.createElement("p", { className: "text-sm text-gray-600 mb-4" }, "\u51FA\u529B\u3057\u305F\u3044\u30DA\u30FC\u30B8\u3092\u4E26\u3079\u66FF\u3048\u305F\u308A\u3001\u4E0D\u8981\u306A\u30DA\u30FC\u30B8\u306E\u30C1\u30A7\u30C3\u30AF\u3092\u5916\u3057\u305F\u308A\u3067\u304D\u307E\u3059\u3002"),
            React.createElement("div", { className: "flex-1 overflow-y-auto mb-4 border-2 border-gray-200 rounded-xl p-2 bg-gray-50" },
                bulkExportSelection.map((tabId, index) => {
                    var _a;
                    const tabLabel = ((_a = allTabs.find(t => t.id === tabId)) === null || _a === void 0 ? void 0 : _a.label) || tabId;
                    return (React.createElement("div", { key: tabId, className: "flex items-center justify-between p-3 bg-white border border-gray-200 mb-2 rounded-lg shadow-sm", draggable: true, onDragStart: (e) => handlePdfDragStart(e, tabId), onDragOver: (e) => handlePdfDragOver(e, tabId), onDrop: (e) => handlePdfDrop(e, tabId), onDragEnd: handlePdfDragEnd },
                        React.createElement("div", { className: "flex items-center gap-3" },
                            React.createElement("span", { className: "text-gray-400 cursor-grab text-xl font-bold" }, "\u2261"),
                            React.createElement("span", { className: "font-bold text-gray-700" },
                                index + 1,
                                ". ",
                                tabLabel)),
                        React.createElement("button", { onClick: (e) => {
                                e.stopPropagation();
                                setBulkExportSelection(prev => prev.filter(id => id !== tabId));
                            }, className: "text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded font-black text-xl" }, "\u2715")));
                }),
                bulkExportSelection.length === 0 && (React.createElement("div", { className: "p-4 text-center text-gray-500 font-bold" }, "\u51FA\u529B\u3059\u308B\u30DA\u30FC\u30B8\u304C\u3042\u308A\u307E\u305B\u3093"))),
            React.createElement("div", { className: "flex gap-3 justify-end mt-2 pt-4 border-t-2 border-gray-200" },
                React.createElement("button", { type: "button", onClick: onClose, className: "px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-bold" }, "\u30AD\u30E3\u30F3\u30BB\u30EB"),
                React.createElement("button", { type: "button", onClick: handleBulkPDFExport, disabled: bulkExportSelection.length === 0 || isExporting, className: "px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold disabled:opacity-50 flex items-center gap-2" }, "PDF\u3092\u4F5C\u6210\u3059\u308B")))));
};
