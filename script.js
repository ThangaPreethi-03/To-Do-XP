let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let xp = parseInt(localStorage.getItem("xp")) || 0;
let streak = parseInt(localStorage.getItem("streak")) || 0;
let lastCompleteDate = localStorage.getItem("lastCompleteDate") || "";
let badge = localStorage.getItem("badge") || "None";

document.getElementById("xp").textContent = xp;
document.getElementById("streak").textContent = streak;
document.getElementById("badge").textContent = badge;

const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");

/* ===== SLIDE MENU ===== */
const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const closeMenu = document.getElementById("closeMenu");

menuBtn.onclick = () => {
    sideMenu.style.right = "0px";
};

closeMenu.onclick = () => {
    sideMenu.style.right = "-250px";
};

/* ===== TASK OPERATIONS ===== */
renderTasks();

addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text === "") return alert("Enter a task!");

    tasks.push({ text });
    saveTasks();
    renderTasks();
    taskInput.value = "";
});

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task";

        li.innerHTML = `
            <span>${task.text}</span>
            <button class="btn edit" onclick="editTask(${index})">Edit</button>
            <button class="btn delete" onclick="deleteTask(${index})">Delete</button>
            <button class="btn complete" onclick="completeTask(${index})">Done</button>
        `;

        taskList.appendChild(li);
    });
}

function editTask(i) {
    const newText = prompt("Edit your task:", tasks[i].text);
    if (newText !== null) {
        tasks[i].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

function deleteTask(i) {
    tasks.splice(i, 1);
    saveTasks();
    renderTasks();
}

/* ===== XP & STREAK ===== */
function completeTask(i) {
    xp += 10;
    document.getElementById("xp").textContent = xp;
    localStorage.setItem("xp", xp);

    updateStreak();
    updateBadge();

    tasks.splice(i, 1);
    saveTasks();
    renderTasks();
}

function updateStreak() {
    const today = new Date().toLocaleDateString();
    if (today !== lastCompleteDate) {
        streak++;
        lastCompleteDate = today;
    }

    localStorage.setItem("streak", streak);
    localStorage.setItem("lastCompleteDate", lastCompleteDate);

    document.getElementById("streak").textContent = streak;
}

/* ===== BADGE SYSTEM ===== */
function updateBadge() {
    let newBadge = badge;

    if (xp >= 2000) newBadge = "👑 Legend";
    else if (xp >= 1200) newBadge = "💎 Diamond";
    else if (xp >= 600) newBadge = "🥇 Gold";
    else if (xp >= 300) newBadge = "🥈 Silver";
    else if (xp >= 150) newBadge = "🥉 Bronze";
    else if (xp >= 50) newBadge = "🎉 Beginner";

    if (newBadge !== badge) {
        alert(`🎉 New Badge Unlocked: ${newBadge}`);
    }

    badge = newBadge;
    document.getElementById("badge").textContent = badge;
    localStorage.setItem("badge", badge);
}

/* ===== SAVE ===== */
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
