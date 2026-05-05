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

// Load app state + drag and drop functionality


// Key for localStorage
const STORAGE_KEY = "dragDemoItems";

// Store the element currently dragged
let draggedElement = null;

// This array is the app state.
let placedItems = [];

function init() {
    // Make all source items draggable
    const sourceItems = document.querySelectorAll("#source-panel .drag-item");
    sourceItems.forEach(makeDraggable);

    loadState();
    renderPlacedItems();
    setupDropZones();
    setupClearButton();
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

// Save placedItems to localStorage
function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(placedItems));
}

// Load placedItems from localStorage
function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    
    try {
        placedItems = saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error("Failed to parse saved state:", error);
        placedItems = [];
    }
}

// Remove all saved data from localStorage and clears state
function clearState() {
    placedItems = [];
    localStorage.removeItem(STORAGE_KEY);
    renderPlacedItems();
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

        placedItems = placedItems.filter((item) => item.id !== itemId);
        saveState();
        renderPlacedItems();
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
    const removeButton = createRemoveButton(itemData.id);
    clone.appendChild(removeButton);

    return clone;
}

// Clear all drop zones and rebuild from placedItems
function renderPlacedItems() {
    const allDropContents = document.querySelectorAll(".drop-zone .drop-content");

    allDropContents.forEach((container) => {
        container.innerHTML = "";
    });

    placedItems.forEach((item) => {
        const targetContainer = document.querySelector(
            `.drop-zone[data-zone="${item.zone}"] .drop-content`
        );

        if (!targetContainer) return;

        const clone = createCloneElement(item);
        targetContainer.appendChild(clone);
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

            const zoneName = zone.dataset.zone;

            //If dragged item comes from source panel, create a brand new clone in state
            if (sourcePanel.contains(draggedElement)) {
                const newItem = {
                    id: generateID(),
                    label: draggedElement.dataset.label,
                    color: draggedElement.dataset.color,
                    zone: zoneName
                };

                placedItems.push(newItem);
            } else {
                // otherwise update the existing clone's zone in state
                const itemID = draggedElement.dataset.id;
                const existingItem = placedItems.find((item) => item.id === itemId);

                if (existingItem) {
                    existingItem.zone = zoneName;
                }
            }

            saveState();
            renderPlacedItems();
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
