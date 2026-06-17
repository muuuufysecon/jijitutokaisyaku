"use strict";
// autofit-text.js に切り出しやすい領域
const AutoFitText = ({ text, minSize = 12, maxSize = 36, className = "" }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const [fontSize, setFontSize] = useState(maxSize);
    const [isCalculated, setIsCalculated] = useState(false);
    useEffect(() => {
        if (!containerRef.current || !textRef.current)
            return;
        if (!text) {
            setIsCalculated(true);
            return;
        }
        let low = minSize;
        let high = maxSize;
        let best = minSize;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            textRef.current.style.fontSize = `${mid}px`;
            if (textRef.current.scrollHeight <= containerRef.current.clientHeight &&
                textRef.current.scrollWidth <= containerRef.current.clientWidth) {
                best = mid;
                low = mid + 1;
            }
            else {
                high = mid - 1;
            }
        }
        textRef.current.style.fontSize = `${best}px`;
        setFontSize(best);
        setIsCalculated(true);
    }, [text, maxSize, minSize]);
    return (React.createElement("div", { ref: containerRef, className: `w-full h-full overflow-hidden relative ${className}`, style: { opacity: isCalculated ? 1 : 0 } },
        React.createElement("div", { ref: textRef, style: { fontSize: `${fontSize}px`, width: '100%', height: 'max-content', whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: '1.4', position: 'absolute', top: 0, left: 0 } }, text)));
};
