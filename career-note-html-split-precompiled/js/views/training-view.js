"use strict";
// training-view.js に切り出しやすい領域
const TrainingView = ({ data, isExporting, onUpdate, openTextInput, getFontSize, onFontSizeChange, setDeleteTabModal, activeTab, formatDate, openPeriodModal, formatPeriodDisplay, handleGoalTextChange, handleGoalEvalChange, handleAddGoal, handleRemoveGoal }) => {
    return (React.createElement("div", { className: "flex flex-col gap-6 relative bg-white rounded-xl shadow-inner p-4 sm:p-8 font-pop" },
        React.createElement("div", { className: "flex flex-col md:flex-row items-start sm:items-end justify-between border-b-[3px] border-gray-800 pb-3 mt-4 gap-4" },
            React.createElement("div", { className: "flex items-center gap-4 w-full md:w-auto" },
                !isExporting && (React.createElement("div", { className: "flex flex-col gap-1 shrink-0" },
                    React.createElement("div", { className: "flex items-center justify-between" },
                        React.createElement("span", { className: "text-xs font-bold text-gray-500" }, "\u30BF\u30D6\u540D"),
                        React.createElement("button", { type: "button", onClick: () => setDeleteTabModal({ isOpen: true, targetId: activeTab }), className: "text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-1 py-0.5 rounded transition-colors flex items-center gap-0.5", title: "\u3053\u306E\u30BF\u30D6\u3092\u524A\u9664" },
                            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-3.5 w-3.5", viewBox: "0 0 20 20", fill: "currentColor" },
                                React.createElement("path", { fillRule: "evenodd", d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z", clipRule: "evenodd" })),
                            "\u30BF\u30D6\u3092\u524A\u9664")),
                    React.createElement("div", { onClick: () => openTextInput('タブ名', data.tabLabel, v => onUpdate('tabLabel', v)), className: "text-sm font-bold border-2 border-gray-300 rounded px-2 py-1 w-32 bg-gray-50 text-gray-700 cursor-pointer hover:bg-gray-100 min-h-[2rem] flex items-center" }, data.tabLabel))),
                React.createElement("div", { className: "flex-1 min-w-0 text-center md:text-left" },
                    React.createElement("div", { className: `text-xl sm:text-2xl md:text-3xl font-black text-gray-900 tracking-wide overflow-hidden text-ellipsis ${isExporting ? 'pt-0 pb-2' : ''}` }, data.tabLabel))),
            data.updatedAt && (React.createElement("span", { className: "text-xs sm:text-sm font-bold text-gray-500 shrink-0 ml-auto" },
                "\u6700\u7D42\u66F4\u65B0: ",
                formatDate(data.updatedAt)))),
        React.createElement("div", { className: "flex flex-col gap-4 mt-2 pb-8" },
            React.createElement("div", { className: "flex flex-col gap-4 mb-2" },
                React.createElement("div", { className: "w-full flex items-center border-b-[3px] border-gray-800 pb-1 relative group" },
                    React.createElement("span", { className: "font-bold text-gray-900 mr-2 whitespace-nowrap" }, "\u5B9F\u7FD2\u5148:"),
                    isExporting ?
                        React.createElement("div", { className: `w-full font-bold text-gray-900 ${FONT_SIZES['xlarge']}` }, data.companyName)
                        :
                            React.createElement("div", { onClick: () => openTextInput('実習先', data.companyName, v => onUpdate('companyName', v)), className: `w-full font-bold text-gray-900 cursor-pointer hover:bg-gray-50/50 min-h-[1.5rem] ${FONT_SIZES['xlarge']}` }, data.companyName || React.createElement("span", { className: "text-gray-400 font-normal" }, "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u5165\u529B"))),
                React.createElement("div", { className: "w-full flex items-center border-b-[3px] border-gray-800 pb-1 relative group" },
                    React.createElement("span", { className: "font-bold text-gray-900 mr-2 whitespace-nowrap" }, "\u5B9F\u7FD2\u65E5:"),
                    isExporting ?
                        React.createElement("div", { className: `w-full font-bold text-gray-900 ${FONT_SIZES['xlarge']}` }, formatPeriodDisplay(data.startDate, data.endDate, data.daysCount, data.period))
                        :
                            React.createElement("div", { onClick: openPeriodModal, className: `w-full font-bold text-gray-900 cursor-pointer hover:bg-gray-50/50 min-h-[1.5rem] ${FONT_SIZES['xlarge']}` }, formatPeriodDisplay(data.startDate, data.endDate, data.daysCount, data.period) || React.createElement("span", { className: "text-gray-400 font-normal" }, "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u65E5\u4ED8\u3068\u65E5\u6570\u3092\u5165\u529B")))),
            React.createElement(TargetField, { field: "activities", num: "\u2460", title: "\u5B9F\u7FD2\u4E2D\u306E\u6D3B\u52D5", bgColor: "bg-white", value: data.activities, onClick: () => openTextInput('実習中の活動', data.activities, v => onUpdate('activities', v), true), isExporting: isExporting, fontSizeMode: getFontSize('activities'), onFontSizeChange: onFontSizeChange, heightClass: "h-40 sm:h-48" }),
            React.createElement("div", { className: "relative pt-4 w-full mt-4 sm:mt-6 group" },
                !isExporting && (React.createElement("div", { className: "absolute -top-1 right-2 z-20 opacity-40 hover:opacity-100 focus-within:opacity-100 transition-opacity" },
                    React.createElement(FontSizeToggle, { value: getFontSize('goal'), onChange: (v) => onFontSizeChange('goal', v) }))),
                React.createElement("div", { className: `absolute top-0 left-4 sm:left-8 px-5 sm:px-8 bg-blue-200 border-[3px] border-gray-800 rounded-full ${isExporting ? 'pt-0 pb-2' : 'py-1'} z-10 font-bold text-gray-900 shadow-sm flex items-center justify-start text-lg sm:text-xl tracking-widest` }, "\u2461 \u76EE\u6A19\u3068\u8A55\u4FA1"),
                React.createElement("div", { className: `border-[3px] border-gray-800 rounded-3xl p-4 sm:p-6 pt-10 sm:pt-12 bg-white shadow-sm relative z-0 flex flex-col gap-4 min-h-[10rem] h-auto` },
                    (data.goals || []).map((goal, index) => {
                        const evalColor = getGoalEvaluationColor(goal.evaluation || 0);
                        return (React.createElement("div", { key: goal.id, className: "flex flex-col sm:flex-row items-stretch border-b-2 border-dashed border-gray-300 pb-4 last:border-b-0 last:pb-0 relative group/goal" },
                            !isExporting && (data.goals || []).length > 1 && (React.createElement("button", { type: "button", onClick: () => handleRemoveGoal(index), className: "absolute -top-2 -right-2 bg-white border-2 border-red-400 text-red-500 hover:bg-red-50 w-6 h-6 rounded-full flex items-center justify-center font-bold opacity-0 group-hover/goal:opacity-100 z-20 transition-opacity shadow-sm leading-none pb-0.5" }, "\u00D7")),
                            React.createElement("div", { className: "flex-1 pr-0 sm:pr-4 border-r-0 sm:border-r-2 border-gray-300 mb-4 sm:mb-0 flex flex-col" }, isExporting ? (React.createElement("div", { className: "flex-1 relative w-full h-full min-h-[4rem]" },
                                React.createElement(AutoFitText, { text: goal.text, maxSize: 28, className: "text-gray-800 font-medium" }))) : (React.createElement("div", { onClick: () => openTextInput('目標', goal.text, v => handleGoalTextChange(index, v), true), className: `w-full h-full min-h-[4rem] cursor-pointer hover:bg-gray-50/50 bg-transparent font-medium text-gray-800 whitespace-pre-wrap ${FONT_SIZES[getFontSize('goal')]}` }, goal.text || React.createElement("span", { className: "text-gray-400" }, "\u76EE\u6A19\u3092\u5165\u529B...")))),
                            React.createElement("div", { className: "w-full sm:w-1/3 pl-0 sm:pl-4 flex flex-col justify-center items-center" },
                                React.createElement("div", { className: `text-6xl font-black ${evalColor.text} mb-2 h-14 flex items-center justify-center relative -left-6 ${isExporting ? '-translate-y-4' : ''}` }, getGoalEvaluationMark(goal.evaluation || 0)),
                                React.createElement("div", { className: "flex items-center w-full gap-2" },
                                    !isExporting ? (React.createElement("input", { type: "range", min: "0", max: "100", step: "1", value: goal.evaluation || 0, onChange: (e) => handleGoalEvalChange(index, parseInt(e.target.value)), className: "custom-slider flex-grow", style: { background: `linear-gradient(to right, ${evalColor.bar} ${goal.evaluation || 0}%, #e2e8f0 ${goal.evaluation || 0}%)` } })) : (React.createElement("div", { className: "relative w-full h-3 rounded-full bg-slate-200", style: { background: `linear-gradient(to right, ${evalColor.bar} ${goal.evaluation || 0}%, #e2e8f0 ${goal.evaluation || 0}%)` } },
                                        React.createElement("div", { className: `absolute top-1/2 -mt-2.5 w-5 h-5 rounded-full ${evalColor.thumb} shadow-md border-2 border-white`, style: { left: `calc(${goal.evaluation || 0}% - 10px)` } }))),
                                    React.createElement("span", { className: `font-bold ${evalColor.text} w-12 text-right shrink-0` },
                                        goal.evaluation || 0,
                                        "%")))));
                    }),
                    !isExporting && (React.createElement("button", { type: "button", onClick: handleAddGoal, className: "w-full py-2 bg-blue-50 hover:bg-blue-100 border-2 border-dashed border-blue-300 text-blue-500 rounded-xl font-bold flex items-center justify-center gap-1 transition-colors mt-2" },
                        React.createElement("span", { className: "text-xl leading-none" }, "\uFF0B"),
                        " \u76EE\u6A19\u3092\u8FFD\u52A0")))),
            React.createElement(TargetField, { field: "comment", num: "\u2462", title: "\u5B9F\u7FD2\u5148\u306E\u65B9\u304B\u3089", bgColor: "bg-yellow-300", value: data.comment, onClick: () => openTextInput('実習先の方から', data.comment, v => onUpdate('comment', v), true), isExporting: isExporting, fontSizeMode: getFontSize('comment'), onFontSizeChange: onFontSizeChange, heightClass: "h-32 sm:h-40" }),
            React.createElement(TargetField, { field: "reflection", num: "\u2463", title: "\u5B9F\u7FD2\u306E\u632F\u308A\u8FD4\u308A\u3068\u4ECA\u5F8C\u304C\u3093\u3070\u308A\u305F\u3044\u3053\u3068", bgColor: "bg-orange-300", value: data.reflection, onClick: () => openTextInput('実習の振り返りと今後がんばりたいこと', data.reflection, v => onUpdate('reflection', v), true), isExporting: isExporting, fontSizeMode: getFontSize('reflection'), onFontSizeChange: onFontSizeChange, heightClass: "h-32 sm:h-48" }))));
};
