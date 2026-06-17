"use strict";
// utils.js に切り出しやすい領域
// ==============================
const ClipboardService = {
    copyToClipboard: (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            return true;
        }
        catch (err) {
            console.error('コピー失敗', err);
            return false;
        }
        finally {
            document.body.removeChild(textArea);
        }
    },
};
const AppUtils = {
    generateId: () => Math.random().toString(36).substr(2, 9),
    getMuscleRank: (value) => {
        const val = parseInt(value, 10) || 0;
        if (val === 0)
            return { icon: '', boxClass: 'bg-white border-2 border-gray-200 shadow-sm w-8 h-8 rounded-full', textClass: 'text-gray-300' };
        if (val <= 20)
            return { icon: React.createElement("span", { className: "text-[28px] drop-shadow-md leading-none" }, "\uD83D\uDE2D"), boxClass: 'w-8 h-8 flex items-center justify-center', textClass: 'text-blue-600' };
        if (val <= 40)
            return { icon: React.createElement("span", { className: "text-[28px] drop-shadow-md leading-none" }, "\uD83D\uDE1F"), boxClass: 'w-8 h-8 flex items-center justify-center', textClass: 'text-orange-600' };
        if (val <= 60)
            return { icon: React.createElement("span", { className: "text-[28px] drop-shadow-md leading-none" }, "\uD83D\uDE10"), boxClass: 'w-8 h-8 flex items-center justify-center', textClass: 'text-green-600' };
        if (val <= 80)
            return { icon: React.createElement("span", { className: "text-[28px] drop-shadow-md leading-none" }, "\uD83E\uDD29"), boxClass: 'w-8 h-8 flex items-center justify-center', textClass: 'text-sky-600' };
        return { icon: React.createElement("span", { className: "text-[32px] drop-shadow-md leading-none" }, "\uD83D\uDE06"), boxClass: 'w-8 h-8 flex items-center justify-center', textClass: 'text-yellow-600' };
    },
    getGoalEvaluationMark: (value) => {
        const val = parseInt(value, 10) || 0;
        if (val >= 90)
            return '◎';
        if (val >= 51)
            return '○';
        if (val >= 1)
            return '△';
        return '';
    },
    getGoalEvaluationColor: (value) => {
        const val = parseInt(value, 10) || 0;
        if (val >= 90)
            return { bar: '#ec4899', thumb: 'bg-pink-500', text: 'text-pink-600' };
        if (val >= 51)
            return { bar: '#3b82f6', thumb: 'bg-blue-500', text: 'text-blue-600' };
        if (val >= 1)
            return { bar: '#f59e0b', thumb: 'bg-orange-500', text: 'text-orange-600' };
        return { bar: '#cbd5e1', thumb: 'bg-slate-400', text: 'text-slate-400' };
    },
};
const { copyToClipboard } = ClipboardService;
const { generateId, getMuscleRank, getGoalEvaluationMark, getGoalEvaluationColor, } = AppUtils;
// ==============================
