"use strict";
// modal-slider-input.js に切り出しやすい領域
const SliderInputModal = ({ sliderModal, setSliderModal, getMuscleRank, handleValueChange }) => {
    if (!sliderModal.isOpen)
        return null;
    return (React.createElement("div", { className: "fixed inset-0 z-[60] flex items-center justify-center p-4" },
        React.createElement("div", { className: "absolute inset-0 bg-black/50", onClick: () => setSliderModal({ ...sliderModal, isOpen: false }) }),
        React.createElement("div", { className: "relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md flex flex-col border-[4px] border-blue-400" },
            React.createElement("h2", { className: "text-2xl font-black mb-2 text-blue-800 text-center" }, sliderModal.statName),
            React.createElement("div", { className: "text-center text-gray-500 font-bold mb-6" },
                sliderModal.month,
                "\u306E\u8A18\u9332")
        /* modal-slider-display-section.js に切り出しやすい領域 */
        ,
            "/* modal-slider-display-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
            React.createElement("div", { className: "flex flex-col items-center justify-center mb-8" },
                React.createElement("div", { className: `mb-4 flex items-center justify-center scale-[2] h-16 w-16 ${getMuscleRank(sliderModal.value).boxClass.includes('bg-white') ? 'bg-white border-4 border-gray-200 rounded-full shadow-inner' : ''}` }, getMuscleRank(sliderModal.value).icon || React.createElement("span", { className: "text-gray-300" }, "\u30FB")),
                React.createElement("div", { className: `text-5xl font-black ${getMuscleRank(sliderModal.value).textClass}` }, sliderModal.value)),
            React.createElement("div", { className: "px-4" },
                "/* modal-slider-range-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
                React.createElement("input", { type: "range", min: "0", max: "100", value: sliderModal.value, onChange: (e) => {
                        const val = parseInt(e.target.value, 10);
                        setSliderModal(prev => ({ ...prev, value: val }));
                        handleValueChange(sliderModal.statIndex, sliderModal.recordIndex, val);
                    }, className: "custom-slider w-full h-6", style: { background: `linear-gradient(to right, #0ea5e9 ${sliderModal.value}%, #f1f5f9 ${sliderModal.value}%)` } })),
            React.createElement("div", { className: "mt-10 flex justify-center" },
                "/* modal-slider-actions-section.js \u306B\u5207\u308A\u51FA\u3057\u3084\u3059\u3044\u9818\u57DF */",
                React.createElement("button", { onClick: () => setSliderModal({ ...sliderModal, isOpen: false }), className: "px-10 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold text-lg shadow-md active:scale-95 transition-transform" }, "\u5B8C\u4E86")))));
};
