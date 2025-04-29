const form = document.querySelector('form');
const tasksManager = document.getElementById('tasksmanager');

let nextId = 0;
form.addEventListener('submit', e => {
    e.preventDefault();

    const task = {
        id: nextId,
        name: form.elements.name.value,
        priority: form.elements.priority.value,
        isImportant: form.elements.importance.checked,
        isCompleted: false,
        date: new Date()
    }
    nextId++;

    form.elements.name.value = ''; // clear input
    addTask(task);
    
    console.log(JSON.stringify(tasks));
});

let tasks = [];

function addTask(task) {
    tasks.push(task);

    const taskElement = document.createElement('div');

    // task info
    taskElement.id = task.id;
    const taskName = document.createElement('p');
    taskName.textContent = task.name;
    const priority = document.createElement('p');
    priority.textContent = task.priority;
    const date = document.createElement('p');
    date.textContent = task.date; // TODO: formate date
    const doneContainer = document.createElement('div');

    // done checkbox
    doneContainer.classList.add('doneContainer');
    const label = document.createElement('label');
    label.textContent = 'done';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    // checkbox.classList.add('done-checkbox');
    checkbox.addEventListener('change', function() {
        const taskElement = this.parentNode.parentNode;
        if (this.checked) {
            taskElement.classList.add('completed');
        } else {
            taskElement.classList.remove('completed');
        }
        tasks.find(task => task.id == taskElement.id).isCompleted = this.checked;
        console.log(JSON.stringify(tasks));
    });
    doneContainer.append(checkbox, label);

    // delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener('mouseup', function() {
        const taskElement = this.parentNode;
        tasks = tasks.splice(tasks.find(task => task.id == taskElement.id), 1);
        taskElement.remove();
        console.log(JSON.stringify(tasks));
    });

    taskElement.append(taskName, priority, date, doneContainer, deleteButton);
    if (task.isImportant) taskElement.classList.add('important');
    tasksManager.append(taskElement);
}