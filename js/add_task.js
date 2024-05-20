let currentPrio = "Medium";
let currentStatus;
let currentSubtasks = [];
let assignedContactsList = [];
let assignedContacts = [];
let filteredContactsList = [];

async function initPage() {
  await initInclude();
  await loadAllData();
  assignedContactsList = await getContactsArray();
  filteredContactsList = assignedContactsList;
  setEventlister();
}

async function addTask(parameter) {
  if (parameter == 'addTask') {
    currentStatus = 'todo';
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
  let task = creatTask(
    asigntTo,
    category,
    date,
    description,
    prio,
    status,
    currentSubtasks,
    title
  );
  console.log(task);
  await addTasks(task);
  resetForm();
  
  if (parameter == 'board') {
    await getAllTasks();
    loadCards();
    showAddTaskConfirmation('board');
    
  } else {
    showAddTaskConfirmation('');
  }
}

function addTaskToBoard() {
  getCurrentStatus('todo');
  addTask('');
}

function getAssigntContactsNames() {
  let assigntToNames = [];
  for (let i = 0; i < assignedContacts.length; i++) {
    const contact = assignedContacts[i];
    let assigntToName = contact.name;

    assigntToNames.push(assigntToName);
  }
  return assigntToNames;
}

function showAddTaskConfirmation(parameter) {
  let confirmation = document.getElementById(
    "add-task-confirmation-background"
  );

  confirmation.style.display = "flex";


  if (parameter == 'board') {
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

function addTaskToBoard() {

}

function resetForm() {
  let title = (document.getElementById("input-title").value = "");
  let description = (document.getElementById("input-description").value = "");
  assignedContacts = [];
  let date = (document.getElementById("input-date").value = "");
  let categoryTxt = (document.getElementById("input-category").value = "");
  currentSubtasks = [];
  document.getElementById("subtasks-popup-section").innerHTML = "";
  renderSelectedContacts();
  selectDefaultPrio('button-medium');
}

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

function generateHTMLsubtasksPopup(subtask) {
  return `
    <div class='subtask-popup-edit-container' id='subtask-popup-edit-container${subtask["id"]}'>
        <ul class='subtask-popup-ul-container'>
            <li>
                ${subtask["subtitle"]}  
            </li>
            <div class='subtasks-edit-delete-container'>
                <div class='subtasks-edit-container' onclick="editSubtask('${subtask["subtitle"]}', '${subtask["id"]}')">
                    <img src='/assets/img/edit_normal.svg'>
                </div>
                <div class='subtasks-seperator'></div>
                <div onclick="deleteSubtask('${subtask["subtitle"]}')" class='subtasks-delete-container'>
                    <img src='/assets/img/delete.svg'>
                </div>
            </div>
        </ul>
    </div>
    `;
}

function editSubtask(subtaskTitle, id) {
  // Finde den Container
  const container = document.getElementById(
    `subtask-popup-edit-container${id}`
  );

  // Generiere den HTML-Code für den Subtask
  const subtaskHTML = generateSubtaskHTML(subtaskTitle, id);

  // Füge den generierten HTML-Code dem Container hinzu
  container.innerHTML = subtaskHTML;
}

function generateSubtaskHTML(subtaskTitle, id) {
  console.log(subtaskTitle);
  return `
    <div class="subtask-popup-edit-container" id="subtask-popup-edit-container${id}">
        <div class='display-flex'>
            <input id='subtaskInput${id}' type="text" value="${subtaskTitle}" class="subtask-edit-input">
            <div class='subtasks-edit-delete-container'>
                <div onclick="deleteSubtask('${subtaskTitle}')" class='subtasks-delete-container margin-right-0'>
                    <img src='/assets/img/delete.svg'>
                </div>
                <div class='subtasks-seperator'></div>
                <div onclick='saveChangedSubtask(${id})' class="subtasks-edit-container">
                    <img src="/assets/img/check-subtask.svg">
                </div>
            </div>
        </div>
        <div class="subtask-edit-underline"></div>
    </div>`;
}

function saveChangedSubtask(id) {
  let indexOfCurSubTask = currentSubtasks.findIndex((i) => i.id == id);
  let newTitle = document.getElementById("subtaskInput" + id).value;

  currentSubtasks[indexOfCurSubTask]["subtitle"] = newTitle;

  renderSubtasksInPopup("addTask", "");
}

function deleteSubtask(subtask) {
  let indexOfCurSubTask = currentSubtasks.findIndex((item) => item === subtask);
  currentSubtasks.splice(indexOfCurSubTask, 1);
  renderSubtasksInPopup("addTask", "");
}

function clearSubtaskInput(parameter, index) {
  if (parameter === "addTask") {
    document.getElementById("subtasks-input").value = "";
  } else {
    document.getElementById("subtasks-input" + index).value = "";
  }
}

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


// function generateClearButton() {
//   let container = document.getElementById('add-task-btns');

//   container.innerHTML = `
//   <button onclick="resetForm()" class="cancel-button">
//   <span id="cancel-button">Clear</span>
//     <div class="cancel-svg-container">
//       <svg width="13" height="14" viewBox="0 0 13 14" xmlns="http://www.w3.org/2000/svg" class="cancel-svg">
//         <path
//           d="M6.24953 7.00008L11.4925 12.2431M1.00653 12.2431L6.24953 7.00008L1.00653 12.2431ZM11.4925 1.75708L6.24853 7.00008L11.4925 1.75708ZM6.24853 7.00008L1.00653 1.75708L6.24853 7.00008Z"
//           stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" strocke="" />
//       </svg>
//     </div>
//   </button>
//   <button onclick="testTask()" class="create-button">
//     Create Task<img src="/assets/img/check.svg" />
//   </button>`;
// }

// function generateCancelButton() {
//   let container = document.getElementById('add-task-btns');

//   container.innerHTML = `
//   <button onclick="showMovableContainer('remove', 'addTask'), resetForm()" class="cancel-button">
//   <span id="cancel-button">Cancel</span>
//     <div class="cancel-svg-container">
//       <svg width="13" height="14" viewBox="0 0 13 14" xmlns="http://www.w3.org/2000/svg" class="cancel-svg">
//         <path
//           d="M6.24953 7.00008L11.4925 12.2431M1.00653 12.2431L6.24953 7.00008L1.00653 12.2431ZM11.4925 1.75708L6.24853 7.00008L11.4925 1.75708ZM6.24853 7.00008L1.00653 1.75708L6.24853 7.00008Z"
//           stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" strocke="" />
//       </svg>
//     </div>
//   </button>
//   <button onclick="testTask()" class="create-button">
//     Create Task<img src="/assets/img/check.svg" />
//   </button>`;
// }

function setFocusedBorder(element) {
  element.classList.add("focused");
}

function setErrorBorder(elements) {
  elements.classList.add("error");
}

function removeErrorBorder(elements) {
  elements.classList.remove("error");
}

//Set focused or error border for inputs

function testTask() {
  const titleInput = document.getElementById("input-title");
  const dateInput = document.getElementById("input-date");

  let isTitleValid = titleInput.value.trim() !== "";
  let isDateValid = dateInput.value.trim() !== "";
  checkInputValidation(isTitleValid, isDateValid, titleInput, dateInput);
}

function checkInputValidation(isTitleValid, isDateValid, titleInput, dateInput) {
  let titleError = document.getElementById("title-error");
  let dateError = document.getElementById("date-error");
  // Validierung für den Titel
  if (!isTitleValid) {
    setErrorBorder(titleInput.parentElement);
    titleError.querySelector(".error-text").style.display = "block";
  } else {
    removeErrorBorder(titleInput.parentElement);
    titleError.querySelector(".error-text").style.display = "none";
  }
  // Validierung für das Datum
  if (!isDateValid) {
    setErrorBorder(dateInput.parentElement);
    dateError.querySelector(".error-text").style.display = "block";
  } else {
    removeErrorBorder(dateInput.parentElement);
    dateError.querySelector(".error-text").style.display = "none";
  }
}

function setEventlister() {
  let inputLeft = document.getElementById("title-container").parentElement.querySelectorAll(".add-task-input-container");
  let inputRight = document.getElementById("date-container").parentElement.querySelectorAll(".add-task-input-container");
  let inputs = [inputLeft, inputRight];
  for (let j = 0; j < inputs.length; j++) {
    const nodeList = inputs[j];
    for (let i = 0; i < nodeList.length; i++) {
      const element = nodeList[i].children[0];
      element.addEventListener("focus", (event) => {
        setBorder(event);
      });
      element.addEventListener("blur", (event) => {
        unsetBorder(event);
      });
    }
  }
}

function setBorder(event) {
  let target = event.target;
  target.parentElement.classList.add("focused");
}

function unsetBorder(event) {
  let target = event.target;
  target.parentElement.classList.remove("focused");
}

function showContactsToAssign() {
  let contactAssignList = document.getElementById("contacts-list");
  let arrow = document.getElementById("drop-down-arrow");

  contactAssignList.classList.toggle("contacts-list");

  if (contactAssignList.classList.contains("contacts-list")) {
    arrow.src = "/assets/img/arrow_drop_down (1).svg";
  } else {
    arrow.src = "/assets/img/arrow_drop_down.svg";
  }
  renderContactList(filteredContactsList);
}

function searchContact() {
  let search = document.getElementById("input-assignTo").value;
  if (search.length >= 3) {
    filteredContactsList = assignedContactsList.filter((contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    filteredContactsList = assignedContactsList;
  }
  renderContactList(filteredContactsList);
}

function renderContactList(filteredContactsList) {
  let contactListContainer = document.getElementById("contacts-list");
  if (contactListContainer.classList.contains("contacts-list")) {
    contactListContainer.innerHTML = "";

    for (let i = 0; i < filteredContactsList.length; i++) {
      const ASSIGN_CONTACT = filteredContactsList[i];
      let id = ASSIGN_CONTACT.id;
      let color = ASSIGN_CONTACT.color;
      let { initials, name } = extractInitialsAndName(ASSIGN_CONTACT);
      contactListContainer.innerHTML += contactListTemplate(initials, name, color, i, id);
    }
  } else {
    contactListContainer.innerHTML = "";
  }
}

function contactListTemplate(initials, name, color, i) {
  let checked = checkMatchContact(i);

  if (checked) {
    return /*html*/ `
    <div onclick="assignContactToTask(${i})" id="assigntContact${i}" style="background-color:var(--customized_darkblue)" class="assigned-contact-container">
    <div class="assigned-contact-child-container">
      <div class="assigned-contact-initials" style="background-color: #${color};">
        <h4>${initials}</h4>
      </div>
      <span style="color: white;" class="assigned-contact-name">${name}</span>
      </div>
   <div class="checkbox login">
        <div id="assignt-to${i}">
            <img class="uncheck-contact" style ="display:none;" id="img_check_off${i}" src="../assets/img/checkbox_unselected.svg" alt="">
            <img class="check-contact" style ="display:block;" id="img_check_on${i}" src="../assets/img/checked_white.svg" alt="">
        </div> 
    </div>
    `;
  } else {
    return /*html*/ `
    <div onclick="assignContactToTask(${i})" id="assigntContact${i}" class="assigned-contact-container">
    <div class="assigned-contact-child-container">
      <div class="assigned-contact-initials" style="background-color: #${color};">
        <h4>${initials}</h4>
      </div>
      <span class="assigned-contact-name">${name}</span>
      </div>
   <div class="checkbox login">
        <div id="assignt-to${i}">
            <img class="uncheck-contact" style ="display:block;" id="img_check_off${i}" src="../assets/img/checkbox_unselected.svg" alt="">
            <img class="check-contact" style ="display:none;" id="img_check_on${i}" src="../assets/img/checked_white.svg" alt="">
        </div> 
    </div>
    `;
  }
}

function assignContactToTask(i) {
  let assignContactContainer = document.getElementById(`assigntContact${i}`);
  let imgCheckOff = document.getElementById(`img_check_off${i}`);
  let imgCheckOn = document.getElementById(`img_check_on${i}`);

  assignContactContainer.style.backgroundColor = assignContactContainer.style.backgroundColor === "var(--customized_darkblue)" ? "" : "var(--customized_darkblue)";
  assignContactContainer.style.color = assignContactContainer.style.color === "white" ? "" : "white";

  if (imgCheckOff.style.display === "none") {
    imgCheckOff.style.display = "block";
    imgCheckOn.style.display = "none";
    removeContactInArray(assignedContactsList[i]);
  } else {
    imgCheckOff.style.display = "none";
    imgCheckOn.style.display = "block";
    pushContactInArray(assignedContactsList[i]);
  }
  renderSelectedContacts();
  renderContactList(assignedContactsList);
}

function checkMatchContact(index) {
  for (let i = 0; i < assignedContacts.length; i++) {
    const ASSIGNED_CONTACT = assignedContacts[i];

    if (ASSIGNED_CONTACT == assignedContactsList[index]) {
      return true;
    }
  }
  return false;
}

function removeContactInArray(name) {
  let index = assignedContacts.findIndex((n) => n == name);
  assignedContacts.splice(index, 1);
}

function pushContactInArray(name) {
  assignedContacts.push(name);
}

function renderSelectedContacts() {
  let selectedContactsContainer = document.getElementById("selected-contacts");
  selectedContactsContainer.innerHTML = "";

  for (let i = 0; i < assignedContacts.length; i++) {
    const contact = assignedContacts[i];
    let { initials } = extractInitialsAndName(contact);
    let color = contact.color;
    selectedContactsContainer.innerHTML += renderInitialsIcon(initials, color);
  }
}

function renderInitialsIcon(initials, color) {
  return /*html*/ `
    <div class="assigned-contact-initials" style="background-color: #${color};">
      <h4>${initials}</h4>
    </div>
  `;
}

// function renderCancel() {
//   let clear = document.getElementById("cancel-button");
//   clear.innerHTML = "Clear";
// }
