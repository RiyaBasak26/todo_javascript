let myTodo = [];
let taskTitle = "";
/*----------DOM element reference----------*/
let todoInputBox = document.getElementById("todo-input");
let addButton = document.getElementById("add-todo");
let activeTodoList = document.getElementById("todo-item");
let completedTodoList = document.getElementById("finalTodo");
/*----------DOM element reference----------*/

const onChangeHandler = (event) => {
  if (event.key === "Enter") {
    createToDo();
  } else {
    const title = event.target.value.trim();
    taskTitle = title;
  }
};

function createToDo() {
  if (taskTitle.length) {
    myTodo.push({
      title: taskTitle,
      isInEditMode:false
    });
    showTodo();
    todoInputBox.value = "";
    taskTitle = "";
  } else {
    alert("You must write something!");
  }
}

//showTodo() => shouldReplace = false
//showTodo(false) => shouldReplace = false
//showTodo(true) => shouldReplace = true
function showTodo(shouldReplace = false) {
  let data = "";
  console.log("jhgajhgad", myTodo[myTodo.length - 1]);
  const totalNumberOfTODOs = myTodo.length - 1;
  const todoToBeAdded = myTodo[totalNumberOfTODOs];
  data += `<div id="todo-div">`;
  data += `<input type="checkbox" onchange=checkedTodo(${totalNumberOfTODOs}) class="checked">`;
  data += `<span class="Todo-${totalNumberOfTODOs}" style="width: 75%;">${todoToBeAdded.title}</span>`;
  data += `<span class="material-symbols-outlined icon" onclick= EditTodo(${todoToBeAdded})>
  edit_note
  </span>`;
  data += `<span class="material-symbols-outlined icon" onclick= DeleteTodo(${totalNumberOfTODOs}) >
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
function DeleteTodo(item) {
  let text ="Do you want to delete this item.";
  if(confirm(text)==true)
  {
  let todo = document.getElementById(`item-${item}`);
  todo.remove();
  }
  else{}
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
  let text ="Do you want to delete this item.";
  if(confirm(text)==true)
  {
  document.getElementById("FinalTodoList").remove();
}
else{}
}
function EditTodo(item) {
  document.getElementById("todo-input").value = item.title;
  myTodo.forEach((todo) => (todo.isInEditMode = false));
  item.isInEditMode = true;
  console.log("adadda",item);
  document.getElementById("add-todo").onclick = function () {
    console.log(myTodo.title);
    let editedTodo = todoInputBox.value;
    // let todo=document.getElementById(`item-${item}`);
    myTodo.title.splice(item, 1, editedTodo);
    // todo.remove();
  };
}
/*----------Event Listener Attachment----------*/
todoInputBox.addEventListener("keyup", onChangeHandler);
addButton.addEventListener("click", createToDo);
/*----------Event Listener Attachment----------*/
