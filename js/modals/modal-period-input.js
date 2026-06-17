"use strict";
// modal-period-input.js に切り出しやすい領域
const PeriodInputModal = ({ periodModal, setPeriodModal, cancelCalDay, confirmCalDay, changeCalMonth, getDaysArray, handleCalDayClick, handleYMDChange, handleYMDKeyDown, startMRef, startDRef, endYRef, endMRef, endDRef, daysRef, handleTargetChange, savePeriodModal }) => {
    if (!periodModal.isOpen)
        return null;
    return (React.createElement("div", { className: "fixed inset-0 z-[60] flex items-center justify-center p-4" },
        React.createElement("div", { className: "absolute inset-0 bg-black/50", onClick: () => setPeriodModal(p => ({ ...p, isOpen: false })) }),
        React.createElement("div", { className: "relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col border-[4px] border-blue-400" },
            React.createElement("h2", { className: "text-xl font-bold mb-4 text-blue-800" }, "\u5B9F\u7FD2\u671F\u9593\u3092\u5165\u529B"),
            React.createElement("div", { className: "mb-4" },
                React.createElement("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-3 mb-4 min-h-[3.5rem]" }, periodModal.tempDay ? (React.createElement("div", { className: "flex flex-col sm:flex-row items-center gap-3 bg-yellow-50 border-2 border-yellow-300 px-4 py-2 rounded-full shadow-sm w-full sm:w-auto justify-center animate-pulse" },
                    React.createElement("span", { className: "font-bold text-yellow-800 text-base sm:text-lg whitespace-nowrap" },
                        periodModal.calM,
                        "\u6708",
                        periodModal.tempDay,
                        "\u65E5\u3092",
                        periodModal.activeInput === 'start' ? '開始日' : '終了日',
                        "\u306B\u3057\u307E\u3059\u304B\uFF1F"),
                    React.createElement("div", { className: "flex gap-2 shrink-0" },
                        React.createElement("button", { type: "button", onClick: cancelCalDay, className: "px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-bold text-sm" }, "\u3084\u3081\u308B"),
                        React.createElement("button", { type: "button", onClick: confirmCalDay, className: "px-4 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-bold text-sm shadow-md" }, "\u6C7A\u5B9A\u3059\u308B")))) : (periodModal.startY && periodModal.startM && periodModal.startD && periodModal.endY && periodModal.endM && periodModal.endD) ? (React.createElement("span", { className: "text-green-700 bg-green-100 border-2 border-green-300 px-6 py-2 rounded-full shadow-sm font-bold text-base sm:text-lg transition-all" }, "\u671F\u9593\u304C\u8A2D\u5B9A\u3055\u308C\u307E\u3057\u305F\uFF01\u53F3\u4E0B\u306E\u300C\u306F\u3093\u3048\u3044\u3059\u308B\u300D\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\uD83D\uDC47")) : periodModal.activeInput === 'start' ? (React.createElement("span", { className: "text-blue-600 bg-blue-100 border-2 border-blue-200 px-6 py-1.5 rounded-full shadow-sm font-bold text-lg block sm:inline-block" }, "\u59CB\u307E\u308A\u306F\uFF1F\uFF08\u958B\u59CB\u65E5\u3092\u9078\u629E\uFF09")) : (React.createElement("span", { className: "text-orange-600 bg-orange-100 border-2 border-orange-200 px-6 py-1.5 rounded-full shadow-sm font-bold text-lg block sm:inline-block" }, "\u7D42\u308F\u308A\u306F\uFF1F\uFF08\u7D42\u4E86\u65E5\u3092\u9078\u629E\uFF09"))),
                React.createElement("div", { className: "flex items-center justify-between mb-4" },
                    React.createElement("button", { onClick: () => changeCalMonth(-1), className: "p-2 bg-gray-100 hover:bg-gray-200 rounded-full font-bold text-gray-600 transition-colors w-10 h-10 flex items-center justify-center" }, "\uFF1C"),
                    React.createElement("span", { className: "font-bold text-lg text-gray-800" },
                        periodModal.calY,
                        "\u5E74 ",
                        periodModal.calM,
                        "\u6708"),
                    React.createElement("button", { onClick: () => changeCalMonth(1), className: "p-2 bg-gray-100 hover:bg-gray-200 rounded-full font-bold text-gray-600 transition-colors w-10 h-10 flex items-center justify-center" }, "\uFF1E")),
                React.createElement("div", { className: "grid grid-cols-7 gap-1 sm:gap-2 mb-2" },
                    ['日', '月', '火', '水', '木', '金', '土'].map((wd, i) => (React.createElement("div", { key: wd, className: `text-center font-bold text-xs sm:text-sm ${i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-gray-500'}` }, wd))),
                    getDaysArray(periodModal.calY, periodModal.calM).map((d, i) => {
                        const isSelectedStart = d && periodModal.startY == periodModal.calY && periodModal.startM == periodModal.calM && periodModal.startD == d;
                        const isSelectedEnd = d && periodModal.endY == periodModal.calY && periodModal.endM == periodModal.calM && periodModal.endD == d;
                        const isSelectedBoth = isSelectedStart && isSelectedEnd;
                        let bgClass = 'bg-gray-100 hover:bg-gray-200 text-gray-800';
                        if (d && periodModal.tempDay === d) {
                            bgClass = 'bg-yellow-400 text-white shadow-md border-2 border-yellow-600 scale-[1.15] z-10 shadow-lg';
                        }
                        else if (isSelectedBoth) {
                            bgClass = 'bg-purple-500 text-white shadow-md border-2 border-purple-700';
                        }
                        else if (isSelectedStart) {
                            bgClass = 'bg-blue-500 text-white shadow-md border-2 border-blue-700';
                        }
                        else if (isSelectedEnd) {
                            bgClass = 'bg-orange-500 text-white shadow-md border-2 border-orange-700';
                        }
                        else if (d) {
                            const currentT = new Date(periodModal.calY, periodModal.calM - 1, d).getTime();
                            const startT = (periodModal.startY && periodModal.startM && periodModal.startD) ? new Date(periodModal.startY, periodModal.startM - 1, periodModal.startD).getTime() : null;
                            const endT = (periodModal.endY && periodModal.endM && periodModal.endD) ? new Date(periodModal.endY, periodModal.endM - 1, periodModal.endD).getTime() : null;
                            if (startT && endT) {
                                const minT = Math.min(startT, endT);
                                const maxT = Math.max(startT, endT);
                                if (currentT > minT && currentT < maxT)
                                    bgClass = 'bg-blue-100 text-blue-800';
                            }
                        }
                        return (React.createElement("div", { key: i, className: "aspect-square flex items-center justify-center" }, d && (React.createElement("button", { onClick: () => handleCalDayClick(d), className: `w-full h-full rounded-lg font-black text-sm sm:text-lg transition-colors focus:outline-none relative ${bgClass}` }, d))));
                    }))),
            React.createElement("div", { className: "flex flex-col gap-2 bg-gray-50 p-4 rounded-xl border-2 border-gray-200 mt-2" },
                React.createElement("div", { className: "flex items-center flex-wrap gap-2" },
                    React.createElement("span", { className: "font-bold text-gray-700 w-12 shrink-0" }, "\u958B\u59CB:"),
                    React.createElement("input", { type: "tel", value: periodModal.startY, onChange: e => handleYMDChange(e, 'startY', startMRef, 4), onKeyDown: e => handleYMDKeyDown(e, startMRef), onFocus: () => setPeriodModal(p => ({ ...p, activeInput: 'start' })), className: `w-16 border-2 rounded p-1.5 text-center font-bold outline-none ${periodModal.activeInput === 'start' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`, placeholder: "\u5E74" }),
                    React.createElement("span", { className: "font-bold text-gray-500" }, "\u5E74"),
                    React.createElement("input", { type: "tel", ref: startMRef, value: periodModal.startM, onChange: e => handleYMDChange(e, 'startM', startDRef, 2), onKeyDown: e => handleYMDKeyDown(e, startDRef), onFocus: () => setPeriodModal(p => ({ ...p, activeInput: 'start' })), className: `w-12 border-2 rounded p-1.5 text-center font-bold outline-none ${periodModal.activeInput === 'start' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`, placeholder: "\u6708" }),
                    React.createElement("span", { className: "font-bold text-gray-500" }, "\u6708"),
                    React.createElement("input", { type: "tel", ref: startDRef, value: periodModal.startD, onChange: e => handleYMDChange(e, 'startD', endYRef, 2), onKeyDown: e => handleYMDKeyDown(e, endYRef), onFocus: () => setPeriodModal(p => ({ ...p, activeInput: 'start' })), className: `w-12 border-2 rounded p-1.5 text-center font-bold outline-none ${periodModal.activeInput === 'start' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`, placeholder: "\u65E5" }),
                    React.createElement("span", { className: "font-bold text-gray-500" }, "\u65E5")),
                React.createElement("div", { className: "flex items-center flex-wrap gap-2 mt-2" },
                    React.createElement("span", { className: "font-bold text-gray-700 w-12 shrink-0" }, "\u7D42\u4E86:"),
                    React.createElement("input", { type: "tel", ref: endYRef, value: periodModal.endY, onChange: e => handleYMDChange(e, 'endY', endMRef, 4), onKeyDown: e => handleYMDKeyDown(e, endMRef), onFocus: () => setPeriodModal(p => ({ ...p, activeInput: 'end' })), className: `w-16 border-2 rounded p-1.5 text-center font-bold outline-none ${periodModal.activeInput === 'end' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`, placeholder: "\u5E74" }),
                    React.createElement("span", { className: "font-bold text-gray-500" }, "\u5E74"),
                    React.createElement("input", { type: "tel", ref: endMRef, value: periodModal.endM, onChange: e => handleYMDChange(e, 'endM', endDRef, 2), onKeyDown: e => handleYMDKeyDown(e, endMRef), onFocus: () => setPeriodModal(p => ({ ...p, activeInput: 'end' })), className: `w-12 border-2 rounded p-1.5 text-center font-bold outline-none ${periodModal.activeInput === 'end' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`, placeholder: "\u6708" }),
                    React.createElement("span", { className: "font-bold text-gray-500" }, "\u6708"),
                    React.createElement("input", { type: "tel", ref: endDRef, value: periodModal.endD, onChange: e => handleYMDChange(e, 'endD', daysRef, 2), onKeyDown: e => handleYMDKeyDown(e, endDRef), onFocus: () => setPeriodModal(p => ({ ...p, activeInput: 'end' })), className: `w-12 border-2 rounded p-1.5 text-center font-bold outline-none ${periodModal.activeInput === 'end' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`, placeholder: "\u65E5" }),
                    React.createElement("span", { className: "font-bold text-gray-500" }, "\u65E5")),
                React.createElement("div", { className: "flex flex-col gap-2 mt-4 pt-4 border-t-2 border-gray-200" },
                    React.createElement("div", { className: "flex items-center gap-2" },
                        React.createElement("span", { className: "font-bold text-gray-700" }, "\u3046\u3061"),
                        React.createElement("input", { type: "tel", ref: daysRef, value: periodModal.days, onChange: e => {
                                let val = e.target.value.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
                                setPeriodModal(p => ({ ...p, days: val.replace(/[^0-9]/g, '') }));
                            }, onKeyDown: e => handleYMDKeyDown(e, null), className: "w-16 border-2 border-gray-300 outline-none focus:border-blue-500 rounded p-1.5 text-center font-bold", placeholder: "\u3007" }),
                        React.createElement("span", { className: "font-bold text-gray-700" }, "\u65E5\u9593")),
                    periodModal.startY && periodModal.endY && (React.createElement("span", { className: "text-xs font-bold text-blue-600" }, "\u203B\u671F\u9593\u304B\u3089\u65E5\u6570\u3092\u81EA\u52D5\u8A08\u7B97\u3057\u307E\u3057\u305F\u3002\u4F11\u65E5\u7B49\u304C\u3042\u308B\u5834\u5408\u306F\u5FC5\u8981\u306B\u5FDC\u3058\u3066\u5909\u66F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002")))),
            React.createElement("div", { className: "mt-6 flex justify-end gap-3 border-t-2 border-gray-200 pt-4" },
                React.createElement("button", { type: "button", onClick: () => {
                        handleTargetChange('startDate', '');
                        handleTargetChange('endDate', '');
                        handleTargetChange('daysCount', '');
                        handleTargetChange('period', '');
                        setPeriodModal(p => ({ ...p, isOpen: false }));
                    }, className: "mr-auto px-4 py-2 bg-red-100 text-red-600 rounded-full font-bold" }, "\u30AF\u30EA\u30A2"),
                React.createElement("button", { type: "button", onClick: () => setPeriodModal(p => ({ ...p, isOpen: false })), className: "px-4 py-2 bg-gray-200 text-gray-800 rounded-full font-bold" }, "\u30AD\u30E3\u30F3\u30BB\u30EB"),
                React.createElement("button", { type: "button", onClick: savePeriodModal, className: `px-6 py-2 text-white rounded-full font-bold shadow-md transition-all ${periodModal.startY && periodModal.endY ? 'bg-green-500 hover:bg-green-600 ring-4 ring-green-300' : 'bg-blue-500 hover:bg-blue-600'}` }, "\u306F\u3093\u3048\u3044\u3059\u308B")))));
};
