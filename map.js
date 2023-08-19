// map.js
const map = document.getElementById('map');
const legendIcons = document.querySelectorAll('.legend button');
const iconPositions = [
    [{ x: 0.2, y: 0.377 }, { x: 0.08, y: 0.1 }], // Koordinaten für "iron.png" (relativ zur Karte)
    [{ x: 0.3, y: 0.4 }] // Koordinaten für "clay.png" (relativ zur Karte)
    // Weitere Koordinaten für andere Bilder können hier hinzugefügt werden
];

let visibleIcons = [];

function updateIconPositions() {
    const mapWidth = map.clientWidth;
    const mapHeight = map.clientHeight;
    const mapImage = map.querySelector('img');

    if (mapImage.complete) { // Überprüfung, ob das Bild geladen ist
        const imageWidth = mapImage.naturalWidth;
        const imageHeight = mapImage.naturalHeight;

        legendIcons.forEach((legendIcon, index) => {
            legendIcon.addEventListener('click', () => {
                toggleIcon(index);
            });

            const iconList = getIconElementList(index);
            iconList.forEach((icon, positionIndex) => {
                const position = iconPositions[index][positionIndex];
                const iconX = (position.x * imageWidth) - (icon.clientWidth / 2);
                const iconY = (position.y * imageHeight) - (icon.clientHeight / 2);
                icon.style.left = `${iconX}px`;
                icon.style.top = `${iconY}px`;
            });
        });
    }
}

function toggleIcon(index) {
    if (visibleIcons.includes(index)) {
        hideIcon(index);
    } else {
        showIcon(index);
    }
}

function showIcon(index) {
    const iconList = getIconElementList(index);
    iconList.forEach((icon) => {
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

window.addEventListener('load', () => {
    updateIconPositions();
});

window.addEventListener('resize', () => {
    updateIconPositions();
});
