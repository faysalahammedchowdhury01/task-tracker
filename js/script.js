// select elements
const totalTaskField = document.getElementById('total-task');
const incompleteTaskField = document.getElementById('incomplete-task');
const completedTaskField = document.getElementById('completed-task');
const addTaskForm = document.getElementById('add-task-form');
const taskField = document.getElementById('task-field');
const tasksUl = document.getElementById('tasks');

// task info
let totalTask = Number(totalTaskField.innerText);
let completedTask = Number(completedTaskField.innerText);
let incompleteTask = totalTask - completedTask;

// functions
function createTask(task) {
  // create elements
  const li = document.createElement('li');
  const input = document.createElement('input');
  const p = document.createElement('p');
  const span = document.createElement('span');

  // set type and inner text
  input.type = 'checkbox';
  input.checked = false;
  p.innerText = task;
  span.innerText = 'Incomplete';

  // set class
  li.className = 'task incomplete';
  span.className = 'task-status';

  // appendchild
  li.appendChild(input);
  li.appendChild(p);
  li.appendChild(span);

  return li;
}

function addTask(event) {
  event.preventDefault();
  // get task
  const task = taskField.value;

  // validate
  if (task.trim() == '') {
    alert('Task field is empty!!!');
    return;
  }

  // get new task element
  const newTask = createTask(task);
  // appenchild the new task element
  tasksUl.appendChild(newTask);

  // update task info
  totalTask++;
  updateTaskInfo(completedTask, totalTask);

  // clear task field
  taskField.value = '';
}

function toggleComplete(event) {
  let input;
  if (event.target.tagName == 'INPUT') {
    input = event.target;
  } else {
    return;
  }
  const task = input.parentNode;
  const isComplete = input.checked;
  const taskStatus = task.querySelector('.task-status');

  if (isComplete) {
    task.classList.add('complete');
    task.classList.remove('incomplete');
    taskStatus.innerText = 'Complete';
    completedTask++;
  } else {
    task.classList.add('incomplete');
    task.classList.remove('complete');
    taskStatus.innerText = 'Incomplete';
    completedTask--;
  }

  updateTaskInfo(completedTask, totalTask);
}

function updateTaskInfo(completedTask, totalTask) {
  incompleteTask = totalTask - completedTask;

  totalTaskField.innerText = totalTask;
  completedTaskField.innerText = completedTask;
  incompleteTaskField.innerText = incompleteTask;
}

// event listeners
addTaskForm.addEventListener('submit', addTask);

tasksUl.addEventListener('click', function (event) {
  debugger;
  toggleComplete(event);
});
