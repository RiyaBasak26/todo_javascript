let myTodo = [];
let taskTitle = "";
let isInEditMode = false;
/*----------DOM element reference----------*/
let todoInputBox = document.getElementById("todo-input");
let addButton = document.getElementById("add-todo");
let activeTodoList = document.getElementById("todo-item");
let completedTodoList = document.getElementById("finalTodo");
let addEditedTodoButton = document.getElementById("add-edited-todo");
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

const showTodo=()=> {
  let data = "";
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

const checkedTodo=(i)=> {
  let Todospan = document.querySelector(`.Todo-${i}`);
  Todospan.classList.add("strike");
  setTimeout(function () {
    finalTodo(i);
  }, 500);
}
const deleteTodo=(item) =>{
  let text = "Do you want to delete this item.";
  if (confirm(text) == true) {
    let todo = document.getElementById(`item-${item}`);
    todo.remove();
  } else {
  }
}
const  finalTodo=(i)=>{
  let checkedTodoValue = myTodo[i].title;
  let finalLI = document.createElement("li");
  finalLI.id = "FinalTodoList";
  finalLI.appendChild(document.createTextNode(checkedTodoValue));
  completedTodoList.appendChild(finalLI);
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "delete";
  deleteButton.className = "material-symbols-outlined icon";
  deleteButton.addEventListener("click", deleteFinalTodo);
  finalLI.appendChild(deleteButton);
  let todo = document.getElementById(`item-${i}`);
  todo.remove();
}
const deleteFinalTodo=()=> {
  let text = "Do you want to delete this item.";
  if (confirm(text) == true) {
    document.getElementById("FinalTodoList").remove();
  } else {
  }
}

const editMode=(item)=> {
  selectedIndex = item;
  document.getElementById("todo-input").value = myTodo[item].title;
  addEditedTodoButton.style.display = "block";
  addButton.style.display = "none";
}
const addEditTodo=()=> {
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
addEditedTodoButton.addEventListener("click", addEditTodo);
/*----------Event Listener Attachment----------*/
