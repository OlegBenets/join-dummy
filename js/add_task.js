let currentPrio = "Medium";
let currentStatus;
let currentSubtasks = [];
let assignedContacts = [];

async function initPage() {
  await initInclude();
  await loadAllData();
  setEventlister();
}

async function addTask() {
  let title = document.getElementById("input-title").value;
  let description = document.getElementById("input-description").value;
  let asigntTo = document.getElementById("input-assignTo").value;
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
    [asigntTo],
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
  await getAllTasks();
  loadCards();
  resetForm();
  showAddTaskConfirmation();
}

function showAddTaskConfirmation() {
  let confirmation = document.getElementById(
    "add-task-confirmation-background"
  );

  confirmation.style.display = "flex";

  setTimeout(function () {
    confirmation.style.display = "none";
    showMovableContainer("remove", "addTask");
  }, 1000);
}

function resetForm() {
  let title = (document.getElementById("input-title").value = "");
  let description = (document.getElementById("input-description").value = "");
  let asigntTo = (document.getElementById("input-assignTo").value = "");
  let date = (document.getElementById("input-date").value = "");
  let categoryTxt = (document.getElementById("input-category").value = "");
  currentSubtasks = [];
  document.getElementById("subtasks-popup-section").innerHTML = "";
}

function addSubtaskToPopup(parameter, index) {
  let subtitle;
  if (parameter === "addTask") {
    subtitle = document.getElementById("subtasks-input").value;
  } else {
    subtitle = document.getElementById("subtasks-input" + index).value;
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
    container = document.getElementById("subtasks-popup-section" + index);
  }

  for (let i = 0; i < currentSubtasks.length; i++) {
    const subtask = currentSubtasks[i];

    container.innerHTML += generateHTMLsubtasksPopup(subtask);
  }
}

function generateHTMLsubtasksPopup(subtask) {
  return `
    <div class='subtask-popup-edit-container'>
        <ul class='subtask-popup-ul-container'>
            <li>
                ${subtask["subtitle"]}  
            </li>
            <div class='subtasks-edit-delete-container'>
                <div class='subtasks-edit-container' onclick="editSubtask('${subtask["subtitle"]}')">
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

function editSubtask(subtaskTitle) {
  // Finde den Container
  const container = document.querySelector(".subtask-popup-edit-container");

  // Generiere den HTML-Code für den Subtask
  const subtaskHTML = generateSubtaskHTML(subtaskTitle);

  // Füge den generierten HTML-Code dem Container hinzu
  container.innerHTML = subtaskHTML;
}

function generateSubtaskHTML(subtaskTitle) {
  console.log(subtaskTitle);
  return `
    <div class="subtask-popup-edit-container">
        <div class='display-flex'>
            <input type="text" value="${subtaskTitle}" class="subtask-edit-input">
            <div onclick="deleteSubtask('${subtaskTitle}')" class='subtasks-delete-container'>
                <img src='/assets/img/delete.svg'>
            </div>
            <div class='subtasks-seperator'></div>
            <div class="edit-image">
                <img src="/assets/img/edit_normal.svg">
            </div>
        </div>
        <div class="subtask-edit-underlineA"></div>
    </div>`;
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
  if (prio == "Low") {
    currentPrio = "Low";
  } else if (prio == "Medium") {
    currentPrio = "Medium";
  } else if (prio == "Urgent") {
    currentPrio = "Urgent";
  }
}

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

function checkInputValidation(
  isTitleValid,
  isDateValid,
  titleInput,
  dateInput
) {
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
  let inputLeft = document
    .getElementById("title-container")
    .parentElement.querySelectorAll(".add-task-input-container");
  let inputRight = document
    .getElementById("date-container")
    .parentElement.querySelectorAll(".add-task-input-container");
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

function searchContact() {
  //   let search = document.getElementById('input-assignTo').value;
  //   if (search.length >= 3) {
  //   let filteredContact = contacts.filter(contact => contact.name.toLowerCase().includes(search));
  //   renderContact(filteredContact);
  //   } else if (search.length === 0) {
  //     renderContact(contacts);
  //   }
  // }
}

function showContactsToAssign() {
  let contactAssignList = document.getElementById("contacts-list");

  // contactList.add.classList('.contacts-list');
  contactAssignList.classList.toggle("contacts-list");
  renderContactList();
}

function renderContactList() {
  let contactList = document.getElementById("contacts-list");
  if (contactList.classList.contains("contacts-list")) {
    contactList.innerHTML = "";

    for (let i = 0; i < contacts.length; i++) {
      const ASSIGN_CONTACT = contacts[i];
      let { initials, name } = extractInitialsAndName(ASSIGN_CONTACT);
      contactList.innerHTML += contactListTemplate(
        initials,
        name,
        ASSIGN_CONTACT,
        i
      );
    }
    console.log("contact list", contacts);
  } else {
    contactList.innerHTML = "";
  }
}

function contactListTemplate(initials, name, ASSIGN_CONTACT, i) {
  return /*html*/ `
    <div onclick="assignContactToTask(${i},'${name}')" id="assigntContact${i}" class="assigned-contact-container">
    <div class="assigned-contact-child-container">
      <div class="assigned-contact-initials" style="background-color: #${ASSIGN_CONTACT.color};">
        <h4>${initials}</h4>
      </div>
      <span class="assigned-contact-name">${name}</span>
      </div>
   <div class="checkbox login">
        <div id="assignt-to${i}">
            <img class="uncheck-contact" id="img_check_off${i}" src="../assets/img/checkbox_unselected.svg" alt="">
            <img class="check-contact" id="img_check_on${i}" src="../assets/img/checked_white.svg" alt="">
        </div> 
    </div>

    `;
}

function assignContactToTask(i, name) {
  let assignContact = document.getElementById(`assigntContact${i}`);
  let imgCheckOff = document.getElementById(`img_check_off${i}`);
  let imgCheckOn = document.getElementById(`img_check_on${i}`);

  assignContact.style.backgroundColor = assignContact.style.backgroundColor === "var(--customized_darkblue)" ? "" : "var(--customized_darkblue)";
  assignContact.style.color = assignContact.style.color === "white" ? "" : "white";

  if (imgCheckOff.style.display === "none") {
    imgCheckOff.style.display = "block";
    imgCheckOn.style.display = "none";
    pushContactInArray(name);
  } else {
    imgCheckOff.style.display = "none";
    imgCheckOn.style.display = "block";
    removeContactInArray(name);
  }

  renderSelectedContacts();
}

function pushContactInArray(name) {
  console.log('unchecked');
  let index = assignedContacts.findIndex(n => n == name);
  assignedContacts.splice(index, 1);
  console.log(assignedContacts);
}

function removeContactInArray(name) {
  console.log('Checked');
  assignedContacts.push(name);
  console.log(assignedContacts);
}

function renderSelectedContacts() {
  let selectedContactsContainer = document.getElementById("selected-contacts");
  selectedContactsContainer.innerHTML = "";

  for (let contact of assignedContacts) {
    let { initials, color } = extractInitialsAndColor(contact);
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