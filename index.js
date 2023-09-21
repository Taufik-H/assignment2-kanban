let draggedItem = null;

const todoInput = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const drop = document.querySelectorAll(".todo-card");

// CREATE TODO ITEM
function createTodoItem(content) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");
  todoItem.draggable = true;

  const todoText = document.createElement("p");
  todoText.contentEditable = true;
  todoText.textContent = content;

  const todoAction = document.createElement("div");
  todoAction.classList.add("todo-action");

  const editIcon = document.createElement("img");
  editIcon.src = "./assets/edit-outline.svg";
  editIcon.alt = "iconedit";

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./assets/delete.svg";
  deleteIcon.alt = "iconhapus";

  deleteIcon.addEventListener("click", function () {
    todoItem.remove();
  });

  editIcon.addEventListener("click", function () {
    const contentEditable = todoText.getAttribute("contenteditable");

    if (contentEditable === "true") {
      todoText.setAttribute("contenteditable", "false");
      editIcon.src = "./assets/edit-outline.svg";
    } else {
      todoText.setAttribute("contenteditable", "true");
      editIcon.src = "./assets/check-bold.svg";
      todoText.focus();
    }
  });

  todoText.setAttribute("contenteditable", "false");
  editIcon.src = "./assets/edit-outline.svg";

  todoAction.appendChild(editIcon);
  todoAction.appendChild(deleteIcon);
  todoItem.appendChild(todoText);
  todoItem.appendChild(todoAction);
  attachDrag(todoItem);
  return todoItem;
}

function attachDrag(item) {
  item.addEventListener("dragstart", () => {
    item.classList.add("item-dragging");
    draggedItem = item;
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("item-dragging");
    draggedItem = null;
  });
}

// drop
drop.forEach((item) => {
  item.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(item, e.clientY);
    const currentDrag = draggedItem;

    if (!afterElement) {
      item.appendChild(currentDrag);
    } else {
      item.insertBefore(currentDrag, afterElement);
    }
  });
});
// drag bawah element/atas
const getDragAfterElement = (container, y) => {
  const draggableElements = [
    ...container.querySelectorAll(".todo-item:not(.item-dragging)"),
  ];
  let closestElement = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  draggableElements.forEach((element) => {
    const box = element.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closestOffset) {
      closestElement = element;
      closestOffset = offset;
    }
  });

  return closestElement;
};

addButton.addEventListener("click", function () {
  const value = todoInput.value.trim();

  if (value.length) {
    const newItem = createTodoItem(value);
    const todoCard = document.querySelector(".todo-card:first-child");
    todoCard.appendChild(newItem);
    todoInput.value = "";
  }
});
