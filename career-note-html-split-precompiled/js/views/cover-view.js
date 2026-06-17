"use strict";
// cover-view.js に切り出しやすい領域
const CoverView = ({ data, isExporting, onUpdate, openTextInput, coverFileInputRef, handleCoverFileChange, lastUpdated, formatDate, filterGrade, setFilterGrade, openNewTabModal, visibleTargetTabs, visibleTrainingTabs, visibleDocsTabs, visibleProfileTabs, setActiveTab }) => {
    return (React.createElement("div", { className: `flex flex-col items-center bg-white rounded-xl shadow-inner min-h-[80vh] relative pt-16 sm:pt-24 pb-8 w-full ${isExporting ? 'mt-12' : ''}` },
        React.createElement("div", { className: "absolute top-4 right-4 sm:top-6 sm:right-6 z-20" }, lastUpdated && (React.createElement("span", { className: "text-xs sm:text-sm font-bold text-gray-500" },
            "\u6700\u7D42\u66F4\u65B0: ",
            formatDate(lastUpdated)))),
        React.createElement("div", { className: "w-full max-w-3xl text-center px-4 flex flex-col h-full items-center" },
            React.createElement("div", { className: "w-full mb-12 sm:mb-16" }, isExporting ?
                React.createElement("div", { className: "w-full text-center text-2xl sm:text-4xl font-bold text-gray-700" }, data.schoolName)
                :
                    React.createElement("div", { onClick: () => openTextInput('学校名', data.schoolName, v => onUpdate('schoolName', v)), className: "w-full text-center text-2xl sm:text-4xl font-bold text-gray-700 cursor-pointer hover:opacity-70 min-h-[2.5rem]" }, data.schoolName || '学校名を入力')),
            React.createElement("div", { className: "w-full h-1 bg-gray-800 mb-12 sm:mb-16" }),
            React.createElement("div", { className: "flex flex-col items-center justify-center flex-grow w-full" },
                React.createElement("div", { className: "w-full text-center text-5xl sm:text-7xl font-black text-gray-900 tracking-widest mb-10" }, isExporting ?
                    React.createElement("span", null, data.title)
                    :
                        React.createElement("div", { onClick: () => openTextInput('タイトル', data.title, v => onUpdate('title', v)), className: "w-full text-center cursor-pointer hover:opacity-70 min-h-[4rem]" }, data.title || 'タイトルを入力')),
                React.createElement("div", { className: "relative mx-auto mb-8 sm:mb-10 w-64 h-64 sm:w-96 sm:h-96 flex items-center justify-center group" },
                    !isExporting && React.createElement("div", { className: "absolute inset-0 z-10 cursor-pointer", onClick: () => coverFileInputRef.current.click() }),
                    React.createElement("input", { type: "file", ref: coverFileInputRef, onChange: handleCoverFileChange, accept: "image/*", className: "hidden" }),
                    data.coverImageUrl ? React.createElement("img", { src: data.coverImageUrl, alt: "Cover", className: "w-full h-full object-contain" }) : React.createElement(DefaultCoverGraphic, null)),
                React.createElement("div", { className: "w-full text-center text-4xl sm:text-6xl font-black text-blue-500 italic tracking-[0.2em] mt-10 mb-10" }, isExporting ?
                    React.createElement("span", null, data.subtitle)
                    :
                        React.createElement("div", { onClick: () => openTextInput('サブタイトル（名前など）', data.subtitle, v => onUpdate('subtitle', v)), className: "w-full text-center cursor-pointer hover:opacity-70 min-h-[3rem]" }, data.subtitle || 'クリックして入力')),
                React.createElement("div", { className: "flex items-center justify-center gap-4 w-full mb-8" },
                    React.createElement("span", { className: "text-2xl sm:text-3xl font-bold text-gray-700" }, "\u73FE\u5728\u306E\u5B66\u5E74\uFF1A \u9AD8"),
                    isExporting ?
                        React.createElement("div", { className: "w-16 text-center border-b-[3px] border-gray-400 pb-1 text-3xl font-black text-gray-800" }, data.currentGrade)
                        :
                            React.createElement("div", { onClick: () => openTextInput('現在の学年 (例: 1, 2, 3)', data.currentGrade, v => onUpdate('currentGrade', v)), className: "w-16 text-center border-b-[3px] border-gray-400 pb-1 text-3xl font-black text-gray-800 cursor-pointer hover:bg-gray-50/50 min-h-[2.5rem]" }, data.currentGrade || '　'),
                    React.createElement("span", { className: "text-2xl sm:text-3xl font-bold text-gray-700" }, "\u5E74"))),
            React.createElement("div", { className: "w-full h-1 bg-gray-800 mb-12 sm:mb-16 mt-auto" }),
            React.createElement("div", { className: "flex flex-col items-center gap-6 sm:gap-8 text-2xl sm:text-3xl font-bold text-gray-800 pb-10" },
                React.createElement("div", { className: "flex items-center justify-center gap-2 sm:gap-4 w-full" },
                    isExporting ?
                        React.createElement("div", { className: "w-40 text-right border-b-[3px] border-gray-400 pb-1" }, data.enterYear)
                        :
                            React.createElement("div", { onClick: () => openTextInput('入学年', data.enterYear, v => onUpdate('enterYear', v)), className: "w-40 text-right border-b-[3px] border-gray-400 pb-1 cursor-pointer hover:bg-gray-50/50 min-h-[2.5rem]" }, data.enterYear || '　　'),
                    React.createElement("span", null, "\u5E74"),
                    isExporting ?
                        React.createElement("div", { className: "w-20 text-right border-b-[3px] border-gray-400 pb-1" }, data.enterMonth)
                        :
                            React.createElement("div", { onClick: () => openTextInput('入学月', data.enterMonth, v => onUpdate('enterMonth', v)), className: "w-20 text-right border-b-[3px] border-gray-400 pb-1 cursor-pointer hover:bg-gray-50/50 min-h-[2.5rem]" }, data.enterMonth || '　'),
                    React.createElement("span", null, "\u6708\u5165\u5B66")),
                React.createElement("div", { className: "flex items-center justify-center gap-2 sm:gap-4 w-full" },
                    isExporting ?
                        React.createElement("div", { className: "w-40 text-right border-b-[3px] border-gray-400 pb-1" }, data.graduateYear)
                        :
                            React.createElement("div", { onClick: () => openTextInput('卒業年', data.graduateYear, v => onUpdate('graduateYear', v)), className: "w-40 text-right border-b-[3px] border-gray-400 pb-1 cursor-pointer hover:bg-gray-50/50 min-h-[2.5rem]" }, data.graduateYear || '　　'),
                    React.createElement("span", null, "\u5E74"),
                    isExporting ?
                        React.createElement("div", { className: "w-20 text-right border-b-[3px] border-gray-400 pb-1" }, data.graduateMonth)
                        :
                            React.createElement("div", { onClick: () => openTextInput('卒業月', data.graduateMonth, v => onUpdate('graduateMonth', v)), className: "w-20 text-right border-b-[3px] border-gray-400 pb-1 cursor-pointer hover:bg-gray-50/50 min-h-[2.5rem]" }, data.graduateMonth || '　'),
                    React.createElement("span", null, "\u6708\u5352\u696D")))),
        !isExporting && (React.createElement("div", { className: "mt-10 w-full max-w-4xl border-t-4 border-dashed border-gray-300 pt-8 px-4" },
            React.createElement("div", { className: "flex flex-col sm:flex-row justify-between items-center mb-6 gap-4" },
                React.createElement("h3", { className: "text-gray-500 font-bold text-xl" }, "\u3082\u304F\u3058"),
                React.createElement("div", { className: "flex gap-2 bg-gray-100 p-1 rounded-full border border-gray-200" }, ['all', '1', '2', '3'].map(g => (React.createElement("button", { key: g, onClick: () => setFilterGrade(g), className: `px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${filterGrade === g ? 'bg-white text-blue-600 shadow-sm border border-gray-200' : 'text-gray-500 hover:bg-gray-200'}` }, g === 'all' ? 'すべて表示' : `高${g}のみ`))))),
            React.createElement("div", { className: "flex flex-col gap-8" },
                React.createElement("div", { className: "flex flex-col gap-3" },
                    React.createElement("div", { className: "text-sm font-bold text-gray-400 border-b-2 border-gray-200 pb-1 flex justify-between items-center" },
                        "\u76EE\u6A19\u30B7\u30FC\u30C8",
                        React.createElement("button", { type: "button", onClick: () => openNewTabModal('target'), className: "text-blue-500 bg-blue-50 px-3 py-1 rounded-full text-xs font-bold hover:bg-blue-100" }, "\uFF0B \u65B0\u3057\u3044\u76EE\u6A19\u3092\u8FFD\u52A0")),
                    React.createElement("div", { className: "flex flex-wrap gap-3" }, visibleTargetTabs.length > 0 ? visibleTargetTabs.map(tab => (React.createElement("button", { key: tab.id, type: "button", onClick: () => setActiveTab(tab.id), className: "px-6 py-2 bg-white text-blue-800 border-2 border-blue-200 rounded-full shadow-sm font-black text-lg active:scale-95 transition-transform" }, tab.label))) : React.createElement("span", { className: "text-sm text-gray-400 font-bold px-2" }, "\u8868\u793A\u3067\u304D\u308B\u30BF\u30D6\u304C\u3042\u308A\u307E\u305B\u3093"))),
                React.createElement("div", { className: "flex flex-col gap-3" },
                    React.createElement("div", { className: "text-sm font-bold text-gray-400 border-b-2 border-gray-200 pb-1 flex justify-between items-center" },
                        "\u5B9F\u7FD2\u8A18\u9332",
                        React.createElement("button", { type: "button", onClick: () => openNewTabModal('training'), className: "text-blue-500 bg-blue-50 px-3 py-1 rounded-full text-xs font-bold hover:bg-blue-100" }, "\uFF0B \u65B0\u3057\u3044\u8A18\u9332\u3092\u8FFD\u52A0")),
                    React.createElement("div", { className: "flex flex-wrap gap-3" }, visibleTrainingTabs.length > 0 ? visibleTrainingTabs.map(tab => (React.createElement("button", { key: tab.id, type: "button", onClick: () => setActiveTab(tab.id), className: "px-6 py-2 bg-white text-blue-800 border-2 border-blue-200 rounded-full shadow-sm font-black text-lg active:scale-95 transition-transform" }, tab.label))) : React.createElement("span", { className: "text-sm text-gray-400 font-bold px-2" }, "\u8868\u793A\u3067\u304D\u308B\u30BF\u30D6\u304C\u3042\u308A\u307E\u305B\u3093"))),
                React.createElement("div", { className: "flex flex-col gap-3" },
                    React.createElement("div", { className: "text-sm font-bold text-gray-400 border-b-2 border-gray-200 pb-1 flex justify-between items-center" },
                        "\u53D7\u8CDE\u6B74",
                        React.createElement("button", { type: "button", onClick: () => openNewTabModal('docs'), className: "text-blue-500 bg-blue-50 px-3 py-1 rounded-full text-xs font-bold hover:bg-blue-100" }, "\uFF0B \u65B0\u3057\u3044\u53D7\u8CDE\u6B74\u3092\u8FFD\u52A0")),
                    React.createElement("div", { className: "flex flex-wrap gap-3" }, visibleDocsTabs.length > 0 ? visibleDocsTabs.map(tab => (React.createElement("button", { key: tab.id, type: "button", onClick: () => setActiveTab(tab.id), className: "px-6 py-2 bg-white text-blue-800 border-2 border-blue-200 rounded-full shadow-sm font-black text-lg active:scale-95 transition-transform" }, tab.label))) : React.createElement("span", { className: "text-sm text-gray-400 font-bold px-2" }, "\u8868\u793A\u3067\u304D\u308B\u30BF\u30D6\u304C\u3042\u308A\u307E\u305B\u3093"))),
                React.createElement("div", { className: "flex flex-col gap-3" },
                    React.createElement("div", { className: "text-sm font-bold text-gray-400 border-b-2 border-gray-200 pb-1" }, "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB"),
                    React.createElement("div", { className: "flex flex-wrap gap-3" }, visibleProfileTabs.length > 0 ? visibleProfileTabs.map(tab => (React.createElement("button", { key: tab.id, type: "button", onClick: () => setActiveTab(tab.id), className: "px-6 py-2 bg-white text-blue-800 border-2 border-blue-200 rounded-full shadow-sm font-black text-lg active:scale-95 transition-transform" }, tab.label))) : React.createElement("span", { className: "text-sm text-gray-400 font-bold px-2" }, "\u8868\u793A\u3067\u304D\u308B\u30BF\u30D6\u304C\u3042\u308A\u307E\u305B\u3093"))))))));
};
