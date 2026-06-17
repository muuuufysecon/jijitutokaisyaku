"use strict";
// modal-ability-select.js に切り出しやすい領域
const AbilitySelectModal = ({ isOpen, onClose, selectedCellIndex, customAbility, handleCustomAbilityChange, applyCustomAbility, ABILITY_PRESETS, selectAbility }) => {
    if (!isOpen)
        return null;
    return (React.createElement("div", { className: "fixed inset-0 z-[60] flex items-center justify-center p-4" },
        React.createElement("div", { className: "absolute inset-0 bg-black/50", onClick: onClose }),
        React.createElement("div", { className: "relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col border-[4px] border-cyan-400" },
            React.createElement("h2", { className: "text-xl font-bold mb-4 text-cyan-800" },
                selectedCellIndex < 16 ? '好きなこと・得意なこと' : '苦手なこと・手伝ってほしいこと',
                "\u3092\u9078\u629E"),
            React.createElement("div", { className: "flex flex-col gap-4 mb-6" },
                "/* modal-ability-input-groups-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
                React.createElement("div", { className: "bg-gray-50 p-4 rounded-xl border-2 border-gray-200" },
                    "/* modal-ability-custom-input-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
                    React.createElement("label", { className: "block text-sm font-bold text-gray-700 mb-2" }, "\u81EA\u5206\u3067\u5165\u529B\u3059\u308B"),
                    React.createElement("div", { className: "flex gap-2" },
                        React.createElement("input", { type: "text", value: customAbility.name, onChange: (e) => handleCustomAbilityChange('name', e.target.value), className: "flex-1 border-2 border-gray-300 rounded-lg px-3 py-2 outline-none font-bold focus:border-cyan-500", placeholder: "\u81EA\u7531\u306B\u5165\u529B...", onKeyDown: (e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing)
                                applyCustomAbility(); } }),
                        React.createElement("select", { value: customAbility.type, onChange: (e) => handleCustomAbilityChange('type', e.target.value), className: "border-2 border-gray-300 rounded-lg px-3 py-2 outline-none font-bold focus:border-cyan-500 bg-white" },
                            React.createElement("option", { value: "blue" }, "\u9752\uFF08\u6A19\u6E96\uFF09"),
                            React.createElement("option", { value: "green" }, "\u7DD1"),
                            React.createElement("option", { value: "gold" }, "\u91D1"),
                            React.createElement("option", { value: "rainbow" }, "\u8679"),
                            React.createElement("option", { value: "red" }, "\u8D64\uFF08\u82E6\u624B\u30FB\u624B\u4F1D\u3044\uFF09")),
                        React.createElement("button", { type: "button", onClick: applyCustomAbility, disabled: !customAbility.name.trim(), className: "px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-bold disabled:opacity-50" }, "\u6C7A\u5B9A"))),
                React.createElement("div", null,
                    React.createElement("label", { className: "block text-sm font-bold text-gray-700 mb-2" }, "\u30D7\u30EA\u30BB\u30C3\u30C8\u304B\u3089\u9078\u3076")
                /* modal-ability-presets-section.js に切り出しやすい領域 */
                ,
                    "/* modal-ability-presets-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
                    React.createElement("div", { className: "flex flex-wrap gap-2" }, ABILITY_PRESETS.map(preset => (React.createElement("button", { key: preset.id, type: "button", onClick: () => selectAbility({ ...preset, id: `preset_${Date.now()}` }), className: `px-3 py-1.5 rounded-full font-bold text-sm border-2 active:scale-95 transition-transform ${preset.type === 'rainbow' ? 'bg-gradient-to-r from-pink-400 via-yellow-400 to-cyan-400 border-white text-gray-900 shadow-sm' : preset.type === 'gold' ? 'bg-yellow-300 border-yellow-500 text-yellow-900 shadow-sm' : preset.type === 'red' ? 'bg-pink-100 border-pink-300 text-pink-800' : preset.type === 'green' ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-cyan-100 border-cyan-300 text-cyan-800'}` }, preset.name)))))),
            React.createElement("div", { className: "flex gap-3 justify-between border-t-2 border-gray-200 pt-4 mt-auto" },
                "/* modal-ability-actions-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
                React.createElement("button", { type: "button", onClick: () => selectAbility(null), className: "px-5 py-2.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-full font-bold" }, "\u67A0\u3092\u7A7A\u306B\u3059\u308B"),
                React.createElement("button", { type: "button", onClick: onClose, className: "px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-bold" }, "\u30AD\u30E3\u30F3\u30BB\u30EB")))));
};
