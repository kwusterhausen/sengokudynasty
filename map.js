const map = document.getElementById('map');
const legendIcons = document.querySelectorAll('.legend button');
const iconPositions = [
    [{ x: 880, y: 377 }, { x: 300, y: 100 }], // Koordinaten für "iron.png"
    [{ x: 343, y: 330 }, { x: 355, y: 310 }], // Koordinaten für "clay.png"
    [{ x: 470, y: 383 }, { x: 470, y: 390 }, { x: 480, y: 383 }, { x: 480, y: 390 }, { x: 615, y: 305 }, { x: 615, y: 315 }, { x: 625, y: 305 }, { x: 625, y: 315 }], // Koordinaten für "grass.png"
    // Weitere Koordinaten für andere Bilder können hier hinzugefügt werden
];

let visibleIcons = [];

legendIcons.forEach((legendIcon, index) => {
    legendIcon.addEventListener('click', () => {
        toggleIcon(index);
    });
});

function toggleIcon(index) {
    if (visibleIcons.includes(index)) {
        hideIcon(index);
    } else {
        showIcon(index);
    }
}

function showIcon(index) {
    const iconList = getIconElementList(index);
    iconList.forEach((icon, positionIndex) => {
        const position = iconPositions[index][positionIndex];
        icon.style.left = `${position.x}px`;
        icon.style.top = `${position.y}px`;
        icon.style.display = 'block';
    });
    visibleIcons.push(index);
}

function hideIcon(index) {
    const iconList = getIconElementList(index);
    iconList.forEach((icon) => {
        icon.style.display = 'none';
    });
    const iconIndex = visibleIcons.indexOf(index);
    if (iconIndex !== -1) {
        visibleIcons.splice(iconIndex, 1);
    }
}

function getIconElementList(index) {
    return iconPositions[index].map((position, positionIndex) => {
        return document.getElementById(`icon${index + 1}_${positionIndex}`);
    });
}
