//JS-code for todo-app!

const inputTodo = document.querySelector("#inputTodo"); //This is the input text field.
const addBtn = document.querySelector("#addBtn"); //This is the add button.
const infoTodo = document.querySelector("#infoTodo"); //This is the task-counter text.
const todoList = document.querySelector("#todoList"); //This is list (ul).
const message = document.querySelector("#message"); //This is the message to user if text is not entered.
const todoArray = []; //The array.
let taskCount = 0; //task counter.
let completedCount = 0; //completed task counter.

function updateTaskCount() {
  infoTodo.innerText = `Task Counter: ${completedCount}/${taskCount}`; //Updating the task counter.
}

addBtn.addEventListener("click", function () {
  //get value from input
  let text = inputTodo.value;

  //Checking if user entered any text, if not message to add a task.
  if (text.length == 0) {
    message.innerText = "Please add a task.";
    return;
  }
  message.innerText = "";
  //create new todo-object with date as unique id for identifying
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
  const listItem = document.createElement("li"); //listitem creates a new <li> element.
  todoList.appendChild(listItem); // todolist (ul) appends the <li> element.

  const itemLabel = document.createElement("span"); // creates a span for the itemLabel.
  itemLabel.innerText = text; //itemLabels span gets the text that the user has entered.
  listItem.appendChild(itemLabel); //listItem (li) appends the text.

  //adding the delete button with icons from Font Awesome, giving it class name and append it to the list.
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.className = "delete-btn";
  listItem.appendChild(deleteBtn);

  //Adding event listener for the delete button
  deleteBtn.addEventListener("click", function (event) {
    event.stopPropagation(); //added stopPropagation to not trigger the other eventlistener.
    listItem.remove();

    //Using findindex, when deleting pressing delete button todo represents a object in the todoArray, todo.id stores the id for the object in the iteration.
    // Then we compare that id with newTodo.id. If its a match, it gets deleted.
    let taskPosition = todoArray.findIndex((todo) => todo.id === newTodo.id);

    if (taskPosition > -1) {
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
//Added eventlistener for keypres = Enter so the user gets another option for adding to the list.
//By calling addBtn.click, this will simulate a click on the add button and start the same function.
inputTodo.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addBtn.click();
  }
});
