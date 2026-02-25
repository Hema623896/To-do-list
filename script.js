document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTaskElement(taskText);
    saveTask(taskText);

    input.value = "";
}

function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        updateLocalStorage();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        li.remove();
        updateLocalStorage();
    });

    li.appendChild(deleteBtn);
    document.getElementById("taskList").appendChild(li);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: task, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", function () {
            li.classList.toggle("completed");
            updateLocalStorage();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            li.remove();
            updateLocalStorage();
        });

        li.appendChild(deleteBtn);
        document.getElementById("taskList").appendChild(li);
    });
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.childNodes[0].textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}