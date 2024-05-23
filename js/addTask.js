let currentPrio = "Medium";
let currentStatus;
let currentSubtasks = [];
let assignedContactsList = [];
let assignedContacts = [];
let filteredContactsList = [];

/**
 * Initializes the page by loading all data and setting event listeners.
 * @returns {Promise<void>}
 */
async function initPage() {
  await loadAllData();
  await initInclude();
  assignedContactsList = await getContactsArray();
  filteredContactsList = assignedContactsList;
  setEventlister();
}

/**
 * Adds a task with the provided details.
 * @param {string} parameter - The parameter indicating the type of task to add.
 * @returns {Promise<void>}
 */
async function addTask(parameter) {
  if (parameter == "addTask") {
    currentStatus = "todo";
  }
  let title = document.getElementById("input-title").value;
  let description = document.getElementById("input-description").value;
  let asigntTo = getAssigntContactsNames();
  let date = document.getElementById("input-date").value;
  let categoryTxt = document.getElementById("input-category").value;
  let category;
  let prio = currentPrio;
  let status = currentStatus;

  if (categoryTxt == "User Story") {
    category = true;
  } else {
    category = false;
  }

  testTask();
  let task = creatTask(asigntTo, category, date, description, prio, status, currentSubtasks, title);
  await addTasks(task);
  resetForm();

  if (parameter == "board") {
    await getAllTasks();
    loadCards();
    showAddTaskConfirmation("board");
  } else {
    showAddTaskConfirmation("");
    setTimeout(function () {
      window.location.href = "/html/board.html";
    }, 1000);
  }
}

/**
 * Adds a task to the board.
 */
function addTaskToBoard() {
  getCurrentStatus("todo");
  addTask("");
}

/**
 * Retrieves the names of assigned contacts.
 * @returns {Array<string>} An array of assigned contact names.
 */
function getAssigntContactsNames() {
  let assigntToNames = [];
  for (let i = 0; i < assignedContacts.length; i++) {
    const contact = assignedContacts[i];
    let assigntToName = contact.name;

    assigntToNames.push(assigntToName);
  }
  return assigntToNames;
}

/**
 * Displays the task confirmation message.
 * @param {string} parameter - The parameter indicating the context of the task addition.
 */
function showAddTaskConfirmation(parameter) {
  let confirmation = document.getElementById(
    "add-task-confirmation-background"
  );

  confirmation.style.display = "flex";

  if (parameter == "board") {
    setTimeout(function () {
      confirmation.style.display = "none";
      showMovableContainer("remove", "addTask");
    }, 1000);
  } else {
    setTimeout(function () {
      confirmation.style.display = "none";
    }, 1000);
  }
}

/**
 * Resets the form fields after submitting the task.
 */
function resetForm() {
  let title = (document.getElementById("input-title").value = "");
  let description = (document.getElementById("input-description").value = "");
  assignedContacts = [];
  let date = (document.getElementById("input-date").value = "");
  let categoryTxt = (document.getElementById("input-category").value = "");
  currentSubtasks = [];
  document.getElementById("subtasks-popup-section").innerHTML = "";
  renderSelectedContacts();
  selectDefaultPrio("button-medium");
}

/**
 * Adds a subtask to the task popup.
 * @param {string} parameter - The parameter indicating the type of task.
 * @param {number} index - The index of the task.
 */
function addSubtaskToPopup(parameter, index) {
  let subtitle;
  if (parameter === "addTask") {
    subtitle = document.getElementById("subtasks-input").value;
  } else {
    subtitle = document.getElementById("subtasks-input").value;
  }

  let subtask = creatSubTask(subtitle, (checked = "unchecked"));
  currentSubtasks.push(subtask);
  renderSubtasksInPopup(parameter, index);
}

/**
 * Renders the subtasks in the task popup.
 * @param {string} parameter - The parameter indicating the type of task.
 * @param {number} index - The index of the task.
 */
function renderSubtasksInPopup(parameter, index) {
  let container;
  if (parameter === "addTask") {
    container = document.getElementById("subtasks-popup-section");
    container.innerHTML = "";
  } else {
    container = document.getElementById("subtasks-popup-section");
  }

  for (let i = 0; i < currentSubtasks.length; i++) {
    const subtask = currentSubtasks[i];

    container.innerHTML += generateHTMLsubtasksPopup(subtask);
  }
}

/**
 * Edits a subtask.
 * @param {string} subtaskTitle - The title of the subtask.
 * @param {number} id - The ID of the subtask.
 */
function editSubtask(subtaskTitle, id) {
  const container = document.getElementById(`subtask-popup-edit-container${id}`);
  const subtaskHTML = generateSubtaskHTML(subtaskTitle, id);
  container.innerHTML = subtaskHTML;
}

/**
 * Saves the changes made to a subtask.
 * @param {number} id - The ID of the subtask.
 */
function saveChangedSubtask(id) {
  let indexOfCurSubTask = currentSubtasks.findIndex((i) => i.id == id);
  let newTitle = document.getElementById("subtaskInput" + id).value;

  currentSubtasks[indexOfCurSubTask]["subtitle"] = newTitle;
  renderSubtasksInPopup("addTask", "");
}

/**
 * Deletes a subtask.
 * @param {object} subtask - The subtask to be deleted.
 */
function deleteSubtask(subtask) {
  let indexOfCurSubTask = currentSubtasks.findIndex((item) => item === subtask);
  currentSubtasks.splice(indexOfCurSubTask, 1);
  renderSubtasksInPopup("addTask", "");
}

/**
 * Clears the subtask input field.
 * @param {string} parameter - The parameter indicating the type of task.
 * @param {number} index - The index of the task.
 */
function clearSubtaskInput(parameter, index) {
  if (parameter === "addTask") {
    document.getElementById("subtasks-input").value = "";
  } else {
    document.getElementById("subtasks-input" + index).value = "";
  }
}

/**
 * Checks if the subtask input field is empty.
 * @param {string} parameter - The parameter indicating the type of task.
 * @param {number} index - The index of the task.
 */
function checkInput(parameter, index) {
  let inputField;
  let emptyInputImg;
  let fullInputImgs;
  if (parameter === "addTask") {
    inputField = document.getElementById("subtasks-input");
    emptyInputImg = document.getElementById("subtasks-popup-empty-img");
    fullInputImgs = document.getElementById("subtasks-popup-full-img");
  } else {
    inputField = document.getElementById("subtasks-input" + index);
    emptyInputImg = document.getElementById("subtasks-popup-empty-img" + index);
    fullInputImgs = document.getElementById("subtasks-popup-full-img" + index);
  }

  if (inputField.value.trim() !== "") {
    emptyInputImg.classList.add("display-none");
    fullInputImgs.style.display = "flex";
  } else {
    emptyInputImg.classList.remove("display-none");
    fullInputImgs.style.display = "none";
  }
}

/**
 * Sets the priority of the task.
 * @param {string} prio - The priority of the task.
 */
function getPrio(prio) {
  const BUTTON_URGENT = document.getElementById("button-urgent");
  const BUTTON_MEDIUM = document.getElementById("button-medium");
  const BUTTON_LOW = document.getElementById("button-low");
  const IMG_URGENT = document.getElementById("img-urgent");
  const IMG_MEDIUM = document.getElementById("img-medium");
  const IMG_LOW = document.getElementById("img-low");

  BUTTON_URGENT.classList.remove("button-urgent-active");
  BUTTON_MEDIUM.classList.remove("button-medium-active");
  BUTTON_LOW.classList.remove("button-low-active");
  IMG_URGENT.src = "/assets/img/urgent.svg";
  IMG_MEDIUM.src = "/assets/img/medium.svg";
  IMG_LOW.src = "/assets/img/low.svg";

  if (prio == "Low") {
    currentPrio = "Low";
    BUTTON_LOW.classList.add("button-low-active");
    IMG_LOW.src = "/assets/img/prio_low_white.svg";
  } else if (prio == "Medium") {
    currentPrio = "Medium";
    BUTTON_MEDIUM.classList.add("button-medium-active");
    IMG_MEDIUM.src = "/assets/img/prio_medium_white.svg";
  } else if (prio == "Urgent") {
    currentPrio = "Urgent";
    BUTTON_URGENT.classList.add("button-urgent-active");
    IMG_URGENT.src = "/assets/img/prio_urgent_white.svg";
  }
}

