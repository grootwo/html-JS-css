const colors = [
    "#42EF59",
    "#139424",
    "#FFA3A4",
    "#FFFDA3",
    "#A3C0FF",
    "#8E8CE3",
    "#FF6B0F",
    "#FFCE3D",
    "#3DFFCE",
    "#007AA3",
    "#CE8507",
]

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}