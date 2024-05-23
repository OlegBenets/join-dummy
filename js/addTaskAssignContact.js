/**
 * Assigns a contact to the task.
 * @param {number} i - The index of the contact.
 */
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
  