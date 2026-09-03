let totalClicks = 0;
let leftClicks = 0;
let middleClicks = 0;
let rightClicks = 0;

let lastClickTime = 0;

const mouseX = document.getElementById("mouseX");
const mouseY = document.getElementById("mouseY");

const clickCount = document.getElementById("clickCount");
const leftClicksDisplay = document.getElementById("leftClicks");
const middleClicksDisplay = document.getElementById("middleClicks");
const rightClicksDisplay = document.getElementById("rightClicks");

const buttonStatus = document.getElementById("buttonStatus");
const eventStatus = document.getElementById("eventStatus");

const eventLog = document.getElementById("eventLog");
const testArea = document.getElementById("testArea");
const cursorDot = document.getElementById("cursorDot");


// Mouse movement
testArea.addEventListener("mousemove", function(event) {

    const rect = testArea.getBoundingClientRect();

    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);

    mouseX.textContent = x;
    mouseY.textContent = y;

    cursorDot.style.left = x + "px";
    cursorDot.style.top = y + "px";
});


// Mouse button pressed
testArea.addEventListener("mousedown", function(event) {

    let buttonName = getButtonName(event.button);

    buttonStatus.textContent = buttonName;
    eventStatus.textContent = "MOUSEDOWN";

    addLog("MOUSEDOWN", buttonName);
});


// Mouse button released
testArea.addEventListener("mouseup", function(event) {

    let buttonName = getButtonName(event.button);

    eventStatus.textContent = "MOUSEUP";

    addLog("MOUSEUP", buttonName);
});


// Click detection
testArea.addEventListener("click", function(event) {

    totalClicks++;

    let buttonName = getButtonName(event.button);

    if (event.button === 0) {
        leftClicks++;
    }

    updateCounters();

    let now = performance.now();

    let interval = 0;

    if (lastClickTime !== 0) {
        interval = Math.round(now - lastClickTime);
    }

    lastClickTime = now;

    addLog(
        "CLICK",
        buttonName + " | Interval: " + interval + " ms"
    );
});


// Double click
testArea.addEventListener("dblclick", function(event) {

    let buttonName = getButtonName(event.button);

    addLog("DOUBLE CLICK", buttonName);
});


// Right click
testArea.addEventListener("contextmenu", function(event) {

    event.preventDefault();

    let buttonName = getButtonName(event.button);

    if (event.button === 2) {
        rightClicks++;
        updateCounters();
    }

    addLog("RIGHT CLICK", buttonName);
});


// Mouse wheel
testArea.addEventListener("wheel", function(event) {

    let direction = event.deltaY > 0 ? "DOWN" : "UP";

    addLog("SCROLL", direction);
});


// Convert button number to name
function getButtonName(button) {

    if (button === 0) {
        return "LEFT";
    }

    if (button === 1) {
        return "MIDDLE";
    }

    if (button === 2) {
        return "RIGHT";
    }

    return "OTHER";
}


// Update counters
function updateCounters() {

    clickCount.textContent = totalClicks;
    leftClicksDisplay.textContent = leftClicks;
    middleClicksDisplay.textContent = middleClicks;
    rightClicksDisplay.textContent = rightClicks;
}


// Add event to log
function addLog(eventName, details) {

    const time = new Date().toLocaleTimeString();

    const entry = document.createElement("div");

    entry.className = "log-entry";

    entry.textContent =
        "[" + time + "] " +
        eventName +
        " | " +
        details;

    eventLog.prepend(entry);
}


// Reset everything
document.getElementById("resetButton").addEventListener("click", function() {

    totalClicks = 0;
    leftClicks = 0;
    middleClicks = 0;
    rightClicks = 0;

    lastClickTime = 0;

    updateCounters();

    mouseX.textContent = "0";
    mouseY.textContent = "0";

    buttonStatus.textContent = "None";
    eventStatus.textContent = "None";

    eventLog.innerHTML = "";
});