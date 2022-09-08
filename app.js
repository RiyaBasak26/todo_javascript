let myTodo = [];
let taskTitle = "";
let isInEditMode = false;
/*----------DOM element reference----------*/
const todoInputBox = document.getElementById("todo-input");
const addButton = document.getElementById("add-todo");
const activeTodoList = document.getElementById("todo-item");
const completedTodoList = document.getElementById("CompletedTodo");
const addEditedTodoButton = document.getElementById("add-edited-todo");
/*----------DOM element reference----------*/
let selectedIndex = -1;

const onChangeHandler = (event) => {
  if (event.key === "Enter") {
    if (selectedIndex === -1) {
      createToDo();
    } else {
      replaceTodo();
    }
  } else {
    const title = event.target.value.trim();
    taskTitle = title;
  }
};
/*-------it help to push the todos into array---------*/
const createToDo = () => {
  if (taskTitle.length) {
    myTodo.push({
      title: taskTitle,
    });
    showTodo();
    todoInputBox.value = "";
    taskTitle = "";
  } else {
    alert("You must write something!");
  }
};
/*-------it help to show the todos in list format--------*/
const showTodo = () => {
  let data = "";
  const totalNumberOfTODOs = myTodo.length - 1;
  const todoToBeAdded = myTodo[totalNumberOfTODOs];
  data += `<div id="todo-div">`;
  data += `<input type="checkbox" onchange=checkedTodo(${totalNumberOfTODOs}) class="checked">`;
  data += `<span class="Todo-${totalNumberOfTODOs} spanWidth" >${todoToBeAdded.title}</span>`;
  data += `<span class="material-symbols-outlined icon" onclick= editTodo(${totalNumberOfTODOs})>
  edit_note
  </span>`;
  data += `<span class="material-symbols-outlined icon" onclick= deleteTodo(${totalNumberOfTODOs}) >
  delete
  </span>`;
  data += "</div>";
  const li = document.createElement("li");
  li.id = totalNumberOfTODOs;
  li.innerHTML = data;
  document.getElementById("todo-item").appendChild(li);
};
/*-----------it help to checked the todos and remove it from the list------------*/
const checkedTodo = (index) => {
  const todoSpan = document.querySelector(`.Todo-${index}`);
  todoSpan.classList.add("strike");
  setTimeout(function () {
    const checkedTodoValue = myTodo[index].title;
    const checkedTodoList = document.createElement("li");
    checkedTodoList.className = "completed-Todo-list";
    checkedTodoList.appendChild(document.createTextNode(checkedTodoValue));
    completedTodoList.appendChild(checkedTodoList);
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "delete";
    deleteButton.className = "material-symbols-outlined icon";
    deleteButton.addEventListener("click", deleteTheCheckedTodo);
    checkedTodoList.appendChild(deleteButton);
    const list = document.getElementById(index);
    list.remove();
  }, 500);
};
/*-----it help to delete the todos from list------ */
const deleteTodo = (index) => {
  if (confirm("Do you want to delete this item?") === true) {
    let todo = document.getElementById(index);
    todo.remove();
  } else {
    return;
  }
};
/*-----it help to delete the todo from checked todos----  */
const deleteTheCheckedTodo = (e) => {
  if (confirm("Do you want to delete this item?") === true) {
    e.currentTarget.parentNode.remove();
  } else {
    return;
  }
};
/*------on click on edit button it will go to edit mode-----*/
const editTodo = (index) => {
  selectedIndex = index;
  document.getElementById("todo-input").value = myTodo[index].title;
  addEditedTodoButton.style.display = "block";
  addButton.style.display = "none";
};
/*-------it will replace the existing todo with the edited one on click on add button-----*/
const replaceTodo = () => {
  addEditedTodoButton.style.display = "none";
  addButton.style.display = "block";
  const editedTodo = todoInputBox.value;
  myTodo[selectedIndex].title = editedTodo;
  const span = document.querySelector(`.Todo-${selectedIndex}`);
  span.innerHTML = editedTodo;
  selectedIndex = -1;
  document.getElementById("todo-input").value = "";
};

/*----------Event Listener Attachment----------*/
todoInputBox.addEventListener("keyup", onChangeHandler);
addButton.addEventListener("click", createToDo);
addEditedTodoButton.addEventListener("click", replaceTodo);
/*----------Event Listener Attachment----------*/
