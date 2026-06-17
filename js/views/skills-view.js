"use strict";
// skills-view.js に切り出しやすい領域
const SkillsView = ({ allData, isExporting, formatDate, getAbilityStyle, onUpdate, openTextInput, getFontSize, onFontSizeChange, handleCopySkillsAdvicePrompt }) => {
    const data = allData.skills || {};
    const abilitiesByGrade = { 1: [], 2: [], 3: [] };
    const seenAbilityNames = new Set();
    [1, 2, 3].forEach(grade => {
        var _a, _b;
        const grid = ((_b = (_a = allData[`high${grade}`]) === null || _a === void 0 ? void 0 : _a.abilitiesGrid) === null || _b === void 0 ? void 0 : _b.slice(0, 16)) || [];
        grid.forEach(a => {
            if (a && a.name && !seenAbilityNames.has(a.name)) {
                seenAbilityNames.add(a.name);
                abilitiesByGrade[grade].push(a);
            }
        });
    });
    const totalAbilitiesCount = seenAbilityNames.size;
    const allAbilities = [];
    [1, 2, 3].forEach(grade => {
        abilitiesByGrade[grade].forEach(a => {
            allAbilities.push({ ...a, grade });
        });
    });
    const abilitySlots = Array(25).fill(null);
    if (allAbilities.length > 25) {
        for (let i = 0; i < 24; i++) {
            abilitySlots[i] = allAbilities[i];
        }
        abilitySlots[24] = { isOverflow: true, name: `他${allAbilities.length - 24}個`, type: 'overflow' };
    }
    else {
        allAbilities.forEach((a, i) => {
            abilitySlots[i] = a;
        });
    }
    const statsByGrade = { 1: [], 2: [], 3: [] };
    [1, 2, 3].forEach(grade => {
        const gradeData = allData[`high${grade}`];
        if (gradeData && gradeData.basicStats) {
            gradeData.basicStats.forEach(stat => {
                var _a, _b, _c;
                if (stat.name && stat.name.trim() !== '') {
                    const firstRecord = (_a = stat.records) === null || _a === void 0 ? void 0 : _a.find(r => r.value > 0);
                    const lastRecord = (_b = stat.records) === null || _b === void 0 ? void 0 : _b.slice().reverse().find(r => r.value > 0);
                    statsByGrade[grade].push({
                        name: stat.name,
                        icon: ((_c = stat.name.match(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*/u)) === null || _c === void 0 ? void 0 : _c[0]) || '',
                        text: stat.name.replace(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*/u, ''),
                        firstValue: firstRecord ? firstRecord.value : '-',
                        lastValue: lastRecord ? lastRecord.value : '-'
                    });
                }
            });
        }
        while (statsByGrade[grade].length < 3) {
            statsByGrade[grade].push(null);
        }
    });
    const getMiniAbilityStyle = (type) => {
        switch (type) {
            case 'rainbow': return `bg-gradient-to-r from-pink-400 via-yellow-400 to-cyan-400 border-white text-gray-900`;
            case 'gold': return `bg-gradient-to-b from-yellow-200 to-yellow-400 border-yellow-500 text-gray-900`;
            case 'red':
            case 'red_f':
            case 'red_d': return `bg-pink-100 border-pink-400 text-gray-900`;
            case 'green':
            case 'green_f': return `bg-emerald-100 border-emerald-400 text-gray-900`;
            case 'blue':
            case 'blue_b':
            case 'blue_d': return `bg-cyan-100 border-cyan-400 text-gray-900`;
            case 'overflow': return `bg-gray-100 border-gray-400 text-gray-700`;
            default: return `bg-white border-gray-300 text-gray-900`;
        }
    };
    return (React.createElement("div", { className: `flex flex-col ${isExporting ? 'gap-4' : 'gap-4 sm:gap-6'} relative bg-white rounded-xl shadow-inner p-4 sm:p-8 font-pop min-h-[80vh]` },
        React.createElement("div", { className: `flex flex-col md:flex-row justify-between items-start sm:items-end border-b-[3px] border-gray-800 ${isExporting ? 'pb-2 mt-0' : 'pb-3 mt-4'} gap-4` },
            React.createElement("h1", { className: "text-xl sm:text-2xl md:text-3xl font-black text-purple-800 tracking-widest whitespace-nowrap" },
                "\u79C1\u306E\u5C65\u6B74\u66F8\uFF5E",
                data.tabLabel || '成長タイムライン'),
            data.updatedAt && (React.createElement("span", { className: "text-xs sm:text-sm font-bold text-gray-500 shrink-0 ml-auto" },
                "\u6700\u7D42\u66F4\u65B0: ",
                formatDate(data.updatedAt)))),
        React.createElement("div", { className: `bg-purple-50/60 rounded-xl ${isExporting ? 'p-3' : 'p-4 sm:p-6'} border-[3px] border-purple-200 shadow-sm mt-2` },
            React.createElement("h2", { className: "text-xl sm:text-2xl font-bold text-purple-900 mb-3 flex items-center gap-2 flex-wrap" },
                React.createElement("span", { className: "text-2xl sm:text-3xl" }, "\uD83C\uDF1F"),
                "\u7372\u5F97\u3057\u305F\u300C\u597D\u304D\u306A\u3053\u3068\u30FB\u5F97\u610F\u306A\u3053\u3068\u30FB\u81EA\u6162\u3057\u305F\u3044\u3053\u3068\u300D",
                React.createElement("span", { className: "ml-auto text-2xl sm:text-3xl font-black text-purple-600" },
                    totalAbilitiesCount,
                    "\u500B")),
            React.createElement("div", { className: "grid grid-cols-5 grid-rows-5 gap-2 sm:gap-3" }, abilitySlots.map((a, i) => (React.createElement("div", { key: i, className: `relative flex items-center justify-center ${isExporting ? 'h-20' : 'h-20 sm:h-24'}` }, a ? (React.createElement("div", { className: `w-full h-full relative p-1 pt-4 rounded-lg border-2 flex flex-col items-center justify-center shadow-sm ${isExporting ? '' : 'overflow-hidden'} ${getMiniAbilityStyle(a.type)}` },
                !a.isOverflow && React.createElement("span", { className: `absolute top-0 left-0 ${isExporting ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-xs'} font-black bg-purple-600 text-white px-1.5 py-0.5 rounded-br-lg shadow-sm z-10 leading-none` },
                    "\u9AD8",
                    a.grade),
                React.createElement("span", { className: `w-full text-center font-bold text-lg sm:text-xl leading-snug break-words px-1 pb-1 ${a.isOverflow ? '-mt-3 text-gray-600' : ''}` }, a.name))) : (React.createElement("div", { className: "w-full h-full border-2 border-dashed border-purple-200 rounded-lg bg-white/40 flex items-center justify-center text-purple-200 text-lg font-light" }))))))),
        React.createElement("div", { className: `bg-blue-50/60 rounded-xl ${isExporting ? 'p-4' : 'p-4 sm:p-6'} border-[3px] border-blue-200 shadow-sm mt-2` },
            React.createElement("h2", { className: "text-xl sm:text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2" },
                React.createElement("span", { className: "text-2xl sm:text-3xl" }, "\uD83D\uDCC8"),
                "\u80FD\u529B\u5024\u306E3\u5E74\u9593\u306E\u5909\u5316"),
            React.createElement("div", { className: `flex flex-col ${isExporting ? 'gap-2' : 'gap-4'}` }, [1, 2, 3].map(grade => (React.createElement("div", { key: grade, className: `flex flex-col sm:flex-row gap-2 sm:gap-3 border-b-2 border-blue-100 ${isExporting ? 'pb-2' : 'pb-4'} last:border-0 last:pb-0` },
                React.createElement("div", { className: "w-full sm:w-24 shrink-0 font-black text-blue-700 bg-blue-200 rounded-lg flex items-center justify-center py-1.5 h-fit shadow-sm" },
                    "\u9AD8",
                    grade),
                React.createElement("div", { className: "flex-grow grid grid-cols-3 gap-2" }, statsByGrade[grade].map((stat, i) => (React.createElement("div", { key: i, className: `bg-white p-1.5 sm:p-2 rounded-xl shadow-sm border-2 ${stat ? 'border-blue-200' : 'border-dashed border-blue-200 bg-white/50'} flex flex-col items-center justify-center gap-1.5 ${isExporting ? 'h-28' : 'h-32 sm:h-36'}` }, stat ? (React.createElement("div", { className: `w-full flex flex-col items-center gap-2 ${isExporting ? '-translate-y-1' : ''}` },
                    React.createElement("div", { className: `font-black text-gray-800 truncate w-full text-center bg-blue-50 rounded-md py-1.5 px-1 ${isExporting ? 'text-lg' : 'text-lg sm:text-xl'}` },
                        stat.icon,
                        " ",
                        stat.text),
                    React.createElement("div", { className: "font-black text-blue-600 flex items-baseline justify-center" },
                        React.createElement("span", { className: isExporting ? 'text-4xl leading-none' : 'text-4xl sm:text-5xl leading-none' }, stat.firstValue),
                        React.createElement("span", { className: `text-gray-400 mx-1 sm:mx-2 ${isExporting ? 'text-xl' : 'text-xl sm:text-2xl'}` }, "\u2192"),
                        React.createElement("span", { className: isExporting ? 'text-4xl leading-none' : 'text-4xl sm:text-5xl leading-none' }, stat.lastValue)))) : (React.createElement("div", { className: "w-full h-full flex items-center justify-center" }))))))))))),
        React.createElement(TargetField, { field: "aiAdvice", num: "\uD83D\uDCA1", title: "\u5922\u306E\u5B9F\u73FE\u306B\u5411\u3051\u3066\u306E\u30A2\u30C9\u30D0\u30A4\u30B9", bgColor: "bg-yellow-200", value: data.aiAdvice, onClick: () => openTextInput('夢の実現に向けてのアドバイス', data.aiAdvice, v => onUpdate('aiAdvice', v), true), isExporting: isExporting, fontSizeMode: getFontSize('aiAdvice'), onFontSizeChange: onFontSizeChange, heightClass: isExporting ? "h-48" : "h-48 sm:h-56", actionButton: React.createElement(AiActionPanel, { onGenerate: handleCopySkillsAdvicePrompt, buttonText: "AI\u5148\u751F\u306B\u805E\u3044\u3066\u307F\u3088\u3046", bgColorClass: "bg-yellow-100", hoverColorClass: "hover:bg-yellow-200", textColorClass: "text-yellow-800", borderColorClass: "border-yellow-300" }) })));
};
