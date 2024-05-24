document.addEventListener("DOMContentLoaded", function () {
  setupEventListeners();
});

/**
 * Sets up the event listeners for the document and the contacts list.
 */
function setupEventListeners() {
  document.addEventListener("click", handleDocumentClick);
  document.getElementById("contacts-list").addEventListener("click", assignContactToTask);
}

/**
 * Handles clicking on the document to hide the contacts list
 * if the click occurs outside of the contacts list.
 *
 * @param {Event} event - The event object that triggers clicking on the document.
 */
function handleDocumentClick(event) {
  let taskContainer = document.getElementById("task-container");
  if (!taskContainer.contains(event.target)) {
    hideContactsToAssign();
  }
}

/**
 * Toggles the visibility of the contacts list.
 *
 * @param {Event} event - The event object that triggers toggling the contacts list.
 */
function toggleContactsToAssign(event) {
  let contactAssignList = document.getElementById("contacts-list");
  if (contactAssignList.classList.contains("hidden")) {
    showContactsToAssign(event);
  } else {
    hideContactsToAssign();
  }
}

/**
 * Shows the contacts list.
 *
 * @param {Event} event - The event object that triggers showing the contacts list.
 */
function showContactsToAssign(event) {
  let contactAssignList = document.getElementById("contacts-list");
  let arrow = document.getElementById("drop-down-arrow");

  contactAssignList.classList.remove("hidden");
  arrow.src = "/assets/img/arrow_drop_down (1).svg";

  renderContactList(filteredContactsList);
}

/**
 * Hides the contacts list.
 *
 * @param {Event} event - The event object that triggers hiding the contacts list.
 */
function hideContactsToAssign(event) {
  let contactAssignList = document.getElementById("contacts-list");
  let arrow = document.getElementById("drop-down-arrow");

  contactAssignList.classList.add("hidden");
  arrow.src = "/assets/img/arrow_drop_down.svg";
}

/**
 * Searches contacts based on the input value.
 */
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

/**
 * Renders the list of contacts based on the filter.
 * @param {Array<object>} filteredContactsList - The filtered list of contacts.
 */
function renderContactList(filteredContactsList) {
  let contactListContainer = document.getElementById("contacts-list");
  if (contactListContainer.classList.contains("contacts-list")) {
    contactListContainer.innerHTML = "";

    for (let i = 0; i < filteredContactsList.length; i++) {
      const ASSIGN_CONTACT = filteredContactsList[i];
      let id = ASSIGN_CONTACT.id;
      let color = ASSIGN_CONTACT.color;
      let { initials, name } = extractInitialsAndName(ASSIGN_CONTACT);
      contactListContainer.innerHTML += contactListTemplate(
        initials,
        name,
        color,
        i,
        id
      );
    }
  } else {
    contactListContainer.innerHTML = "";
  }
}

/**
 * Assigns a contact to the task.
 * @param {number} i - The index of the contact.
 */
function assignContactToTask(i, event) {
  event.stopPropagation();
  let assignContactContainer = document.getElementById(`assigntContact${i}`);
  let imgCheckOff = document.getElementById(`img_check_off${i}`);
  let imgCheckOn = document.getElementById(`img_check_on${i}`);

  assignContactContainer.style.backgroundColor =
    assignContactContainer.style.backgroundColor ===
    "var(--customized_darkblue)"
      ? ""
      : "var(--customized_darkblue)";
  assignContactContainer.style.color =
    assignContactContainer.style.color === "white" ? "" : "white";

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

/**
 * Checks if a contact is already assigned to the task.
 * @param {number} index - The index of the contact.
 * @returns {boolean} True if the contact is already assigned, false otherwise.
 */
function checkMatchContact(index) {
  for (let i = 0; i < assignedContacts.length; i++) {
    const ASSIGNED_CONTACT = assignedContacts[i];

    if (ASSIGNED_CONTACT == assignedContactsList[index]) {
      return true;
    }
  }
  return false;
}

/**
 * Removes a contact from the assigned contacts array.
 * @param {string} name - The name of the contact to remove.
 */
function removeContactInArray(name) {
  let index = assignedContacts.findIndex((n) => n == name);
  assignedContacts.splice(index, 1);
}

/**
 * Adds a contact to the assigned contacts array.
 * @param {string} name - The name of the contact to add.
 */

function pushContactInArray(name) {
  assignedContacts.push(name);
}

/**
 * Renders the selected contacts.
 */
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
