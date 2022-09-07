let myTodo = [];
let taskTitle = "";
let isInEditMode = false;
/*----------DOM element reference----------*/
let todoInputBox = document.getElementById("todo-input");
let addButton = document.getElementById("add-todo");
let activeTodoList = document.getElementById("todo-item");
let completedTodoList = document.getElementById("CompletedTodo");
let addEditedTodoButton = document.getElementById("add-edited-todo");
/*----------DOM element reference----------*/
let selectedIndex = -1;

const onChangeHandler = (event) => {
  if (event.key === "Enter") {
    if (selectedIndex == -1) {
      createToDo();
    } else {
      replaceTodo();
    }
  } else {
    const title = event.target.value.trim();
    taskTitle = title;
  }
};
/*-------it help to push the todo into array---------*/
const createToDo=()=> {
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
}
/*-------it help to show the todo in list format--------*/
const showTodo=()=> {
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
}
/*-----------it help to checked the todo and remove it from the list------------*/
const checkedTodo=(index)=> {
  let Todospan = document.querySelector(`.Todo-${index}`);
  Todospan.classList.add("strike");
  setTimeout(function () {
  let checkedTodoValue = myTodo[index].title;
  let checkedTodoList = document.createElement("li");
  checkedTodoList.id = "completed-Todo-list";
  checkedTodoList.appendChild(document.createTextNode(checkedTodoValue));
  completedTodoList.appendChild(checkedTodoList);
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "delete";
  deleteButton.className = "material-symbols-outlined icon";
  deleteButton.addEventListener("click", deleteTheCheckedTodo);
  checkedTodoList.appendChild(deleteButton);
  let list = document.getElementById(index);
  list.remove();
  }, 500);
}
/*-----it help to delete the todo from list------ */
const deleteTodo=(index) =>{
  if (confirm("Do you want to delete this item.") == true) {
    let todo = document.getElementById(index);
    todo.remove();
  } else {
  }
}
/*-----it help to delete the todo from checked todos----  */
const deleteTheCheckedTodo=()=> {
  if (confirm("Do you want to delete this item.") == true) {
    document.getElementById("completed-Todo-list").remove();
  } else {
  }
}
/*------on click on edit button it will go to edit mode-----*/
const editTodo=(index)=> {
  selectedIndex = index;
  document.getElementById("todo-input").value = myTodo[index].title;
  addEditedTodoButton.style.display = "block";
  addButton.style.display = "none";
}
/*-------it will replace the existing todo with the edited one on click on add button-----*/
const replaceTodo=()=> {
  addEditedTodoButton.style.display = "none";
  addButton.style.display = "block";
  let editedTodo = todoInputBox.value;
  myTodo[selectedIndex].title = editedTodo;
  let span = document.querySelector(`.Todo-${selectedIndex}`);
  span.innerHTML = editedTodo;
  selectedIndex = -1;
  document.getElementById("todo-input").value = "";
}

/*----------Event Listener Attachment----------*/
todoInputBox.addEventListener("keyup", onChangeHandler);
addButton.addEventListener("click", createToDo);
addEditedTodoButton.addEventListener("click", replaceTodo);
/*----------Event Listener Attachment----------*/
