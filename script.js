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

// Drag and drop functionality


// Store the element currently dragged
let draggedElement = null;

// Makes an element draggable with event listeners
function makeDraggable(element) {
    element.addEventListener("dragstart", function() {
        draggedElement = element;
    });

    element.addEventListener("dragend", function() {
        draggedElement = null;
    });
}

// Create a remove button for cloned items
function createRemoveButton(clone) {
    const button = document.createElement("button");
    button.textContent = "x";
    button.className = "remove-btn";
    button.type = "button";

    button.addEventListener("click", function (event) {
        //prevent any weird drag/click interaction
        event.stopPropagation();
        clone.remove();
    });

    return button;
}

// Create a new draggable clone
function createCloneFromItem(item) {
    const clone = document.createElement("div");

    clone.className = item.className + " dropped-clone";
    clone.textContent = item.dataset.label;
    clone.draggable = true;
    clone.dataset.label = item.dataset.label;
    clone.dataset.color = item.dataset.color;

    makeDraggable(clone);

    // Add remove button to the clone
    const removeButton = createRemoveButton(clone);
    clone.appendChild(removeButton);

    return clone;
}

// Make all source items draggable
const sourceItems = document.querySelectorAll(".drag-item");
sourceItems.forEach(makeDraggable);

// Set up drop zones
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

        const dropContent = zone.querySelector(".drop-content");

        // If dragging from the source panel, create a clone
        if (sourcePanel.contains(draggedElement)) {
            const clone = createCloneFromItem(draggedElement);
            dropContent.appendChild(clone);
        } else {
            // If dragging previously dropped clone, move it
            dropContent.appendChild(draggedElement);
        }
    });
});