//JS-code for todo-app.

const inputTodo = document.querySelector("#inputTodo"); //test input
const addBtn = document.querySelector("#addBtn"); //Button
const infoTodo = document.querySelector("#infoTodo");
const todoList = document.querySelector("#todoList");
const message = document.querySelector("#message");
const todoArray = [];
let taskCount = 0;
let completedCount = 0;

function updateTaskCount() {
  infoTodo.innerText = `Task Counter: ${completedCount}/${taskCount}`;
}

addBtn.addEventListener("click", function () {
  //get value from input
  let text = inputTodo.value;

  //condition: check input to empty => message user.
  if (text.length == 0) {
    message.innerText = "Please add a task.";
    return;
  }
  message.innerText = "";
  //create new todo-object
  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  //add object in array and add 1 to counter.
  todoArray.push(newTodo);
  taskCount++;
  updateTaskCount();

  //add new html element in ul.
  const listItem = document.createElement("li"); //listitem skapar en li
  todoList.appendChild(listItem); // todolist (ul) appendar li elementet

  const itemLabel = document.createElement("span"); //itemlabel skapar ett span(form av text som <p>)
  itemLabel.innerText = text; //itemLabel (span) får texten som användaren skrivit in
  listItem.appendChild(itemLabel); //listItem (li elementet) appendar texten

  //adding the delete button with icons from Font Awesome, giving it class name and append it to the list.
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.className = "delete-btn";
  listItem.appendChild(deleteBtn);

  //Adding event listener for the delete button
  deleteBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    listItem.remove();

    //Using findindex, when deleting pressing delete button todo represents a object in the todoArray, todo.id stores the id for the object in the iteration.
    // Then we compare that id with newTodo.id. If its a match, it gets deleted.

    let taskPosition = todoArray.findIndex((todo) => todo.id === newTodo.id);

    if (taskPosition !== -1) {
      todoArray.splice(taskPosition, 1);
      taskCount--;
    }
    if (newTodo.completed) {
      completedCount--;
    }
    updateTaskCount();
  });

  //add eventListener to the new span element
  listItem.addEventListener("click", function (event) {
    if (!event.target.closest(".delete-btn")) {
      itemLabel.classList.toggle("completed");
      listItem.classList.toggle("completed-task");
    }
    newTodo.completed = !newTodo.completed;
    //if completed / not completed add or remove from counter
    if (newTodo.completed) {
      completedCount++;
    } else {
      completedCount--;
    }
    updateTaskCount();
  });
  //Clearing the input field.
  inputTodo.value = "";
});
