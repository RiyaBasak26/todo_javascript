let myTodo = [];
let taskTitle = "";
let isInEditMode = false;
/*----------DOM element reference----------*/
let todoInputBox = document.getElementById("todo-input");
let addButton = document.getElementById("add-todo");
let activeTodoList = document.getElementById("todo-item");
let completedTodoList = document.getElementById("finalTodo");
let addEditedTodoBox = document.getElementById("edit-todo");
/*----------DOM element reference----------*/
let selectedIndex = -1;

const onChangeHandler = (event) => {
  if (event.key === "Enter") {
    if (selectedIndex == -1) {
      createToDo();
    } else {
      addEditTodo();
    }
  } else {
    const title = event.target.value.trim();
    taskTitle = title;
  }
};

function createToDo() {
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

function showTodo() {
  let data = "";
  console.log("jhgajhgad", myTodo[myTodo.length - 1]);
  const totalNumberOfTODOs = myTodo.length - 1;
  const todoToBeAdded = myTodo[totalNumberOfTODOs];
  data += `<div id="todo-div">`;
  data += `<input type="checkbox" onchange=checkedTodo(${totalNumberOfTODOs}) class="checked">`;
  data += `<span class="Todo-${totalNumberOfTODOs}" style="width: 75%; word-break: break-all;">${todoToBeAdded.title}</span>`;
  data += `<span class="material-symbols-outlined icon" onclick= editMode(${totalNumberOfTODOs})>
  edit_note
  </span>`;
  data += `<span class="material-symbols-outlined icon" onclick= deleteTodo(${totalNumberOfTODOs}) >
  delete
  </span>`;
  data += "</div>";
  var li = document.createElement("li");
  li.id = `item-${totalNumberOfTODOs}`;
  li.innerHTML = data;
  document.getElementById("todo-item").appendChild(li);
}

function checkedTodo(i) {
  let Todospan = document.querySelector(`.Todo-${i}`);
  Todospan.classList.add("strike");
  setTimeout(function () {
    finalTodoUpdate(i);
  }, 500);
}
function deleteTodo(item) {
  let text = "Do you want to delete this item.";
  if (confirm(text) == true) {
    let todo = document.getElementById(`item-${item}`);
    todo.remove();
  } else {
  }
  console.log(item);
}
function finalTodoUpdate(i) {
  let checkedTodoValue = myTodo[i].title;
  let finalLI = document.createElement("li");
  finalLI.id = "FinalTodoList";
  finalLI.appendChild(document.createTextNode(checkedTodoValue));
  document.getElementById("finalTodo").appendChild(finalLI);
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "delete";
  deleteButton.className = "material-symbols-outlined icon";
  deleteButton.addEventListener("click", deleteFinalTodo);
  finalLI.appendChild(deleteButton);
  let todo = document.getElementById(`item-${i}`);
  todo.remove();
}
function deleteFinalTodo() {
  let text = "Do you want to delete this item.";
  if (confirm(text) == true) {
    document.getElementById("FinalTodoList").remove();
  } else {
  }
}

function editMode(item) {
  selectedIndex = item;
  document.getElementById("todo-input").value = myTodo[item].title;
  addEditedTodoBox.style.display = "block";
  addButton.style.display = "none";
}
function addEditTodo() {
  addEditedTodoBox.style.display = "none";
  addButton.style.display = "block";
  let editedTodo = todoInputBox.value;
  console.log(myTodo[selectedIndex].title);
  myTodo[selectedIndex].title = editedTodo;
  let span = document.querySelector(`.Todo-${selectedIndex}`);
  span.innerHTML = editedTodo;
  selectedIndex = -1;
  document.getElementById("todo-input").value = "";
}

/*----------Event Listener Attachment----------*/
todoInputBox.addEventListener("keyup", onChangeHandler);
addButton.addEventListener("click", createToDo);
addEditedTodoBox.addEventListener("click", addEditTodo);
/*----------Event Listener Attachment----------*/
