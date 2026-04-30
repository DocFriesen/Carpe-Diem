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