const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clearTasksBtn = document.getElementById('clear-tasks');

// Load tasks from LocalStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task to the list
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const task = taskInput.value;

    if (task === '') {
        alert('Please add a task');
        return;
    }

    // Create task list item
    addTaskToDOM(task);

    // Save to LocalStorage
    saveTaskToLocalStorage(task);

    // Clear the input
    taskInput.value = '';
});

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(task));

    const deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(deleteBtn);

    taskList.appendChild(li);


    taskList.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') {
            const li = e.target.parentElement;
            removeTaskFromLocalStorage(li);
            li.remove();
        }
    });
    clearTasksBtn.addEventListener('click', function () {
        taskList.innerHTML = '';
        localStorage.removeItem('tasks');
    });
    function saveTaskToLocalStorage(task) {
        let tasks = getTasksFromLocalStorage();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function getTasksFromLocalStorage() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }

    function loadTasks() {
        const tasks = getTasksFromLocalStorage();
        tasks.forEach(task => addTaskToDOM(task));
    }

    function removeTaskFromLocalStorage(taskItem) {
        let tasks = getTasksFromLocalStorage();
        tasks = tasks.filter(task => task !== taskItem.firstChild.textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}        
