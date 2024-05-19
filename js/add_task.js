let currentPrio = "Medium";
let currentStatus;
let currentSubtasks = [];

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
  document.getElementById('subtasks-popup-section').innerHTML = '';
}

function addSubtaskToPopup(parameter, index) {
    let subtitle;
    if (parameter === 'addTask') {
        subtitle = document.getElementById('subtasks-input').value;
    } 
    else {
        subtitle = document.getElementById('subtasks-input'+index).value;
    }

    let subtask = creatSubTask(subtitle, checked = "unchecked");

    currentSubtasks.push(subtask);
    renderSubtasksInPopup(parameter, index);
}

function renderSubtasksInPopup(parameter, index) {
    let container;
    if (parameter === 'addTask') {
        container = document.getElementById('subtasks-popup-section');
        container.innerHTML = '';
    }
    else {
        container = document.getElementById('subtasks-popup-section'+index);
    }


    for (let i = 0; i < currentSubtasks.length; i++) {
        const subtask = currentSubtasks[i];

        container.innerHTML += generateHTMLsubtasksPopup(subtask);
    }
}

function generateHTMLsubtasksPopup(subtask) {
    return `
    <ul class='subtask-popup-ul-container'>
        <li class='subtasks-popup-li'>${subtask['subtitle']}</li>
    </ul>
    `
}

function clearSubtaskInput(parameter, index) {
    if (parameter === 'addTask') {
        document.getElementById('subtasks-input').value = '';
    }
    else {
        document.getElementById('subtasks-input'+index).value = '';
    }


}

function checkInput(parameter, index) {
    let inputField;
    let emptyInputImg;
    let fullInputImgs;
    if (parameter === 'addTask') {
        inputField = document.getElementById('subtasks-input');
        emptyInputImg = document.getElementById('subtasks-popup-empty-img');
        fullInputImgs = document.getElementById('subtasks-popup-full-img');
    }
    else {
        inputField = document.getElementById('subtasks-input'+index);
        emptyInputImg = document.getElementById('subtasks-popup-empty-img'+index);
        fullInputImgs = document.getElementById('subtasks-popup-full-img'+index);
    }

    if (inputField.value.trim() !== '') {
        emptyInputImg.classList.add('display-none');
        fullInputImgs.style.display = 'flex';
    } else {
        emptyInputImg.classList.remove('display-none');
        fullInputImgs.style.display = 'none';
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
  let inputLeft = document.getElementById("title-container").parentElement.querySelectorAll('.add-task-input-container');
  let inputRight = document.getElementById("date-container").parentElement.querySelectorAll('.add-task-input-container');
  let inputs = [inputLeft, inputRight];
  for (let j = 0; j < inputs.length; j++) {
    const nodeList = inputs[j];
    for (let i = 0; i < nodeList.length; i++) {
        const element = nodeList[i].children[0];
        element.addEventListener("focus", (event) => {setBorder(event)});
        element.addEventListener("blur", (event) => {unsetBorder(event)});
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
  let contactAssignList = document.getElementById('contacts-list');

  // contactList.add.classList('.contacts-list');
  contactAssignList.classList.toggle('contacts-list');
  renderContactList();
}

function renderContactList() {
  let contactList = document.getElementById('contacts-list');
  if (contactList.classList.contains('contacts-list')) {
    contactList.innerHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    const assignContacts = contacts[i];
    let { initials, name } = extractInitialsAndName(assignContacts);
    contactList.innerHTML += contactListTemplate(initials, name, assignContacts, i); 
  }
  console.log("contact list", contacts);
} else {
  contactList.innerHTML = "";
}
}

function contactListTemplate(initials, name, assignContacts, i) {
  return /*html*/`
    <div onclick="assignContactToTask(${i})" id="assigntContact${i}" class="assigned-contact-container">
      <div class="assigned-contact-initials" style="background-color: #${assignContacts.color};">
        <h4>${initials}</h4>
      </div>
      <span class="assigned-contact-name">${name}</span>
    </div>

    <!-- <div class="checkbox login">
                <input name="remember" type="checkbox" id="rememberMe">
                <label for="rememberMe">

                    <img class="checkOff" id="img_check_off" src="./assets/img/checkbox_unselected.svg" alt="">
                    <img class="checkOn" id="img_check_on" src="./assets/img/checkbox_selected.svg" alt="">

                    <div>Remember Me</div>
                </label>
            </div> -->
    `;
}

function assignContactToTask(i) {
  let assignContact = document.getElementById(`assigntContact${i}`);

  assignContact.style.backgroundColor = assignContact.style.backgroundColor === "var(--customized_darkblue)" ? "" : "var(--customized_darkblue)";
  assignContact.style.color = assignContact.style.color === "white" ? "" : "white";
}


// .checkOff {
//   display: block;
//   width: 24px;
//   height: 24px;
// }

// .checkOn {
//   display: none;
// }

// .checkOff:hover {
//   border-radius: 6px;
//   background-color: var(--customized_paleblue);
// }

// .checkOn:hover {
//   border-radius: 6px;
//   background-color: var(--customized_paleblue);
// }

// .checkbox input {
//   display: none;
// }

// .checkbox input:checked+label .checkOff {
//   display: none;
// }

// .checkbox input:checked+label .checkOn {
//   display: block;
//   width: 24px;
//   height: 24px;

// }