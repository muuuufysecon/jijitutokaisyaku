"use strict";
// autofit-list.js に切り出しやすい領域
const AutoFitList = ({ items, minSize = 12, maxSize = 36, className = "" }) => {
    const containerRef = useRef(null);
    const listRef = useRef(null);
    const [fontSize, setFontSize] = useState(maxSize);
    const [isCalculated, setIsCalculated] = useState(false);
    useEffect(() => {
        if (!containerRef.current || !listRef.current || !items || items.length === 0) {
            setIsCalculated(true);
            return;
        }
        let low = minSize;
        let high = maxSize;
        let best = minSize;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            listRef.current.style.fontSize = `${mid}px`;
            if (listRef.current.scrollHeight <= containerRef.current.clientHeight) {
                best = mid;
                low = mid + 1;
            }
            else {
                high = mid - 1;
            }
        }
        listRef.current.style.fontSize = `${best}px`;
        setFontSize(best);
        setIsCalculated(true);
    }, [items, maxSize, minSize]);
    return (React.createElement("div", { ref: containerRef, className: `w-full h-full overflow-hidden relative ${className}`, style: { opacity: isCalculated ? 1 : 0 } },
        React.createElement("div", { ref: listRef, style: { fontSize: `${fontSize}px`, width: '100%', height: 'max-content', display: 'flex', flexDirection: 'column', gap: '0.4em', position: 'absolute', top: 0, left: 0 } }, items.map(item => (React.createElement("div", { key: item.id, className: "flex" },
            React.createElement("span", { className: "mr-2 font-bold text-gray-500 select-none" }, "\u30FB"),
            React.createElement("div", { className: "flex-1 font-medium text-gray-800 whitespace-pre-wrap break-words leading-snug" }, item.text)))))));
};
