// Day and time variables

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

function updateTime() {
    const now = new Date();

    document.getElementById("day").textContent = days[now.getDay() - 1];

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    document.getElementById("current-time").textContent =
    `${hours}:${minutes} ${ampm}`;
} 

updateTime();
setInterval(updateTime, 1000);

// =======================================================================================================================================================================

// Load app state + drag and drop functionality

// Key for localStorage
const STORAGE_KEY = "dragAppState";

// Store the element currently dragged
let draggedElement = null;

// create appState as a single source of truth
let appState = {
    items: [],
    zones: ["zone-a", "zone-b"]
};


// Initialize the application
function init() {
    loadState();
    render();
    setupSourceItems();
    setupDropZones();
    setupClearButton();
}

// Make all source items draggable
function setupSourceItems() {
    const sourceItems = document.querySelectorAll("#source-panel .drag-item");
    sourceItems.forEach(makeDraggable);
}


// Makes an element draggable with event listeners
function makeDraggable(element) {
    element.addEventListener("dragstart", function() {
        draggedElement = element;
    });

    element.addEventListener("dragend", function() {
        draggedElement = null;
    });
}

// Create a unique ID for each new clone
function generateID() {
    return "item-" + Date.now() + "-" + Math.floor(Math.random() * 100000);
}

// Save current state to localStorage
function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

// Load appState from localStorage
function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;
    
    try {
        const parsed = JSON.parse(saved);

        appState = {
            items: Array.isArray(parsed.items) ? parsed.items : [],
            zones: Array.isArray(parsed.zones) ? parsed.zones : ["zone-a", "zone-b"]
        };
    } catch (error) {
        console.error("Failed to load saved app state:", error);
    }
}

// Reset the app state
function clearState() {
    appState = {
        items: [],
        zones: ["zone-a", "zone-b"]
    };

    localStorage.removeItem(STORAGE_KEY);
    render();
}

// Add a new item to a drop zone
function addItemToZone(label, color, zone) {
    appState.items.push({
        id: generateID(),
        label,
        color,
        zone
    });

    saveState();
    render();
}

// Move an existing item to a different zone
function moveItemToZone(itemId, newZone) {
    const item = appState.items.find((entry) => entry.id === itemId);

    if (!item) return;

    item.zone = newZone;
    saveState();
    render();
}

// Remove item from appState
function removeItem(itemId) {
    appState.items = appState.items.filter((item) => item.id !== itemId);
    saveState();
    render();
}

// Create a remove button that eliminates clone from app state, saves new state, and re-renders
function createRemoveButton(itemId) {
    const button = document.createElement("button");
    button.textContent = "x";
    button.className = "remove-btn";
    button.type = "button";

    button.addEventListener("click", function (event) {
        //prevent any weird drag/click interaction
        event.stopPropagation();
        removeItem(itemId);
    });

    return button;
}

// Create a new draggable clone
function createCloneElement(itemData) {
    const clone = document.createElement("div");

    clone.className = `drag-item ${itemData.color} dropped-clone`;
    clone.textContent = itemData.label;
    clone.draggable = true;
    clone.dataset.id = itemData.id;
    clone.dataset.label = itemData.label;
    clone.dataset.color = itemData.color;

    makeDraggable(clone);

    // Add remove button to the clone
    clone.appendChild(createRemoveButton(itemData.id));

    return clone;
}

// Clear all drop zones and rebuild from appState
function render() {
    const containers = document.querySelectorAll(".drop-zone .drop-content");

    containers.forEach((container) => {
        container.innerHTML = "";
    });

    appState.items.forEach((item) => {
        const target = document.querySelector(
            `.drop-zone[data-zone="${item.zone}"] .drop-content`
        );

        if (!target) return;

        const clone = createCloneElement(item);
        target.appendChild(clone);
    });
}

// Set up drop zones
function setupDropZones() {
    const dropZones = document.querySelectorAll(".drop-zone");
    const sourcePanel = document.getElementById("source-panel");

    dropZones.forEach((zone) => {
        zone.addEventListener("dragover", function (event) {
            // Allow dropping
            event.preventDefault();
            zone.classList.add("drag-over");
        });

        zone.addEventListener("dragleave", function() {
            zone.classList.remove("drag-over");
        });

        zone.addEventListener("drop", function (event) {
            event.preventDefault();
            zone.classList.remove("drag-over");

            if (!draggedElement) return;

            const targetZone = zone.dataset.zone;

            //If dragged item comes from source panel, create a new state item
            if (sourcePanel.contains(draggedElement)) {
                addItemToZone(
                    draggedElement.dataset.label,
                    draggedElement.dataset.color,
                    targetZone
                );
            } else {
                // if dragged from a drop zone, move the existing item in state
                moveItemToZone(draggedElement.dataset.id, targetZone);
            }
        });
    });
}

//Set up Clear Button
function setupClearButton() {
    const clearButton = document.getElementById("clear-storage-btn");

    clearButton.addEventListener("click", function () {
        clearState();
    });
}

// Start the app
init();
