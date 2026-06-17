"use strict";
// default-cover-graphic.js に切り出しやすい領域
const DefaultCoverGraphic = () => (React.createElement("svg", { viewBox: "0 0 400 300", className: "w-full h-full pointer-events-none" },
    React.createElement("path", { d: "M 50 250 L 260 170 L 240 210 L 330 110 L 230 60 L 250 130 Z", fill: "#dbeafe" }),
    React.createElement("rect", { x: "70", y: "210", width: "60", height: "30", fill: "#0ea5e9", stroke: "#0284c7", strokeWidth: "1.5" }),
    React.createElement("rect", { x: "130", y: "180", width: "60", height: "30", fill: "#0ea5e9", stroke: "#0284c7", strokeWidth: "1.5" }),
    React.createElement("rect", { x: "190", y: "150", width: "60", height: "30", fill: "#0ea5e9", stroke: "#0284c7", strokeWidth: "1.5" }),
    React.createElement("rect", { x: "250", y: "120", width: "60", height: "30", fill: "#0ea5e9", stroke: "#0284c7", strokeWidth: "1.5" }),
    React.createElement("g", { stroke: "#1e293b", strokeWidth: "6", strokeLinecap: "round", strokeLinejoin: "round", fill: "none" },
        React.createElement("circle", { cx: "150", cy: "130", r: "10", fill: "#1e293b", stroke: "none" }),
        React.createElement("path", { d: "M 150 140 C 145 155, 145 165, 140 175" }),
        React.createElement("path", { d: "M 140 175 L 125 190 L 135 190" }),
        React.createElement("path", { d: "M 140 175 L 165 170 L 160 195 L 170 195" }),
        React.createElement("path", { d: "M 148 148 L 130 155 L 125 145" }),
        React.createElement("path", { d: "M 148 148 L 170 145 L 175 135" })),
    React.createElement("g", { transform: "translate(300, 80)" },
        React.createElement("polygon", { points: "0,-35 12,-12 38,-12 18,8 28,33 0,18 -28,33 -18,8 -38,-12 -12,-12", fill: "#fde047", stroke: "#eab308", strokeWidth: "2", strokeLinejoin: "round" }),
        React.createElement("polygon", { points: "0,-30 10,-10 33,-10 15,6 24,28 0,15 -24,28 -15,6 -33,-10 -10,-10", fill: "none", stroke: "#ca8a04", strokeWidth: "1", strokeDasharray: "3,3" }))));
