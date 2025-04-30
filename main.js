const form = document.querySelector('form');
const tasksManager = document.getElementById('tasksmanager');

let nextId = 0; // increments every time a new task is created

form.addEventListener('submit', e => {
    e.preventDefault();

    const date = new Date();
    const task = {
        id: nextId,
        name: form.elements.name.value,
        priority: form.elements.priority.value,
        isImportant: form.elements.importance.checked,
        isCompleted: false,
        date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear().toString().slice(-2)}` // format date as: mm/dd/yy
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
    priority.classList.add(task.priority);
    const date = document.createElement('p');
    date.textContent = task.date;
    
    // done checkbox
    const doneContainer = document.createElement('div');
    doneContainer.classList.add('done-container');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', handleCheckboxOnchange);

    const label = document.createElement('label');
    label.textContent = 'done';
    // toggle checkbox when "done" is clicked
    label.addEventListener('mouseup', function() {
        const checkbox = this.parentElement.firstChild;
        checkbox.checked = !checkbox.checked;
        handleCheckboxOnchange.apply(checkbox); // this = checkbox
    });
    doneContainer.append(checkbox, label);

    // delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener('mouseup', function() {
        const taskElement = this.parentNode;
        tasks.splice(tasks.find(task => task.id == taskElement.id), 1);
        taskElement.remove();
        console.log(JSON.stringify(tasks));
    });

    taskElement.append(taskName, priority, date, doneContainer, deleteButton);
    if (task.isImportant) taskElement.classList.add('important'); // or hard coded instead of in style.css: taskElement.style.backgroundColor = '#fe020288';
    tasksManager.append(taskElement);
}

// handles toggling of tasks when either checkbox or the "done" label is clicked
function handleCheckboxOnchange() {
    const taskElement = this.parentNode.parentNode;
    if (this.checked) {
        taskElement.classList.add('completed');
    } else {
        taskElement.classList.remove('completed');
    }
    tasks.find(task => task.id == taskElement.id).isCompleted = this.checked;
    console.log(JSON.stringify(tasks));
}