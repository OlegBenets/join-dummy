let previousContactIndex = null;
let realPreviousContactIndex = "";
let contactList = [];
let contactListUnsorted = [];

async function init() {
  await loadAllData();
  contactList = await getContactsArray();
  loadContacts();
}

async function loadContacts() {
  contactList = await getContactsArray();
  contactListUnsorted = await getContactsArray();
  sortContacts();

  let allContacts = document.getElementById("all-contacts");
  allContacts.innerHTML = "";

  let previousInitial = "";

  for (let i = 0; i < contactList.length; i++) {
    const contact = contactList[i];
    const initial = contact.name.charAt(0).toUpperCase();

    if (initial !== previousInitial) {
      allContacts.innerHTML += renderInitial(initial);
      previousInitial = initial;
    }

    allContacts.innerHTML += renderContacts(contact, i);
  }
}

function sortContacts() {
  contactList.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}

function renderInitial(initial) {
  return /*html*/ `
<div class="sort-contacts"><h4>${initial}</h4></div>
<div class="border-container">
<div class="border-grey"></div>
</div>`;
}

function extractInitialsAndName(contact) {
  let names = contact.name.split(" ");
  let initials = "";
  let name = "";

  if (names.length > 1) {
    initials = names.map((word) => word.charAt(0).toUpperCase()).join("");
    name = names
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    initials = contact.name.charAt(0).toUpperCase();
    name = contact.name.charAt(0).toUpperCase() + contact.name.slice(1);
  }

  return { initials, name };
}

function renderContacts(contact, i) {
  let { initials, name } = extractInitialsAndName(contact);

  let randomColor = contact.color;
  return /*html*/ `
        <div onclick="showContact(${i})" class="contact" id="contact${i}">
            <div class="image-container" style="background-color: #${randomColor};">
                <span>${initials}</span> 
            </div>
            <div class="contact-data">
                <h4>${name}</h4>
                <a href="#">${contact.email}</a>
            </div>
        </div>
`;
}

function renderFloatingContact(contact) {
  let { initials, name } = extractInitialsAndName(contact);

  document.getElementById("card-tel").innerHTML = contact.phone;
  document.getElementById("card-email").innerHTML = contact.email;
  document.getElementById("card-name").innerHTML = name;
  document.getElementById("card-initial").innerHTML = initials;
  let iconColor = document.getElementById("card-icon-color");
  iconColor.style.backgroundColor = "#" + contact.color;

  renderEditContact(contact);
}

function renderEditContact(contact) {
  let { initials } = extractInitialsAndName(contact);

  document.getElementById("edit-initial").innerHTML = initials;
  document.getElementById("edit-contact-name").value = contact.name;
  document.getElementById("edit-contact-email").value = contact.email;
  document.getElementById("edit-contact-tel").value = contact.phone;
  document.getElementById("profile-color").style.backgroundColor = "#" + contact.color;
}

function showEditContact(parameter) {
  let contactIndex = previousContactIndex;
  let contact = contactList[contactIndex];
  let editCard = document.getElementById("edit-card");
  if (parameter == "show") {
    editCard.classList.remove("remove-contact-container");
  } else if (parameter == "hide") {
    editCard.classList.add("remove-contact-container");
  }
  renderEditContact(contact);
}

async function editContact() {
  let contactIndex = previousContactIndex;
  let realIndex = contactListUnsorted.findIndex(contact => contact.id === contactList[previousContactIndex].id);
  let changeContact = await getContacts(realIndex);

  changeContact.name = document.getElementById("edit-contact-name").value;
  changeContact.email = document.getElementById("edit-contact-email").value;
  changeContact.phone = document.getElementById("edit-contact-tel").value;

  await editContacts(realIndex, changeContact);
  showEditContact("hide");
  showContact(contactIndex);
  await loadContacts();
  renderFloatingContact(contactList[contactIndex]);
}

async function AddContact() {
  let name = document.getElementById("contact-name").value;
  let email = document.getElementById("contact-email").value;
  let tel = document.getElementById("contact-tel").value;

  let color = generateProfileColor();

  let newContact = creatContact(name, email, tel, color)
  await addContacts(newContact);
  AddContactToContacts(newContact);
}

async function AddContactToContacts(newContact) {
  document.getElementById("contact-name").value = "";
  document.getElementById("contact-email").value = "";
  document.getElementById("contact-tel").value = "";

  await loadContacts();
  showAddContact();
  contactCreatedMessage();
  let newIndex = contactList.findIndex(contact => contact.id === newContact.id);
  scrollToAddedContact(newIndex);
  showContact(newIndex);
}

function contactCreatedMessage() {
  let createdContact = document.getElementById("created-contact");
  createdContact.classList.remove("remove-contact-message");
  setTimeout(contactCreatedHideMessage, 2000);
}

function contactCreatedHideMessage() {
  let createdContact = document.getElementById("created-contact");
  createdContact.classList.add("remove-contact-message");
}

function scrollToAddedContact(newIndex) {
  let newContactElement = document.getElementById(`contact${newIndex}`);
  newContactElement.scrollIntoView({ behavior: "smooth", block: "center" });
}

function showAddContact(parameter) {
  let contactCard = document.getElementById("contact-card");
  if (parameter == "show") {
    contactCard.classList.remove("remove-contact-container");
  } else {
    contactCard.classList.add("remove-contact-container");
  }
}

function doNotClose(event) {
  event.stopPropagation();
}

function showContact(i) {
  let menu = document.getElementById("contact-detail-data");
  let contact = document.getElementById(`contact${i}`);

  if (previousContactIndex === i) {
    contact.style.backgroundColor =
      contact.style.backgroundColor === "var(--customized_darkblue)"
        ? ""
        : "var(--customized_darkblue)";
    contact.style.color = contact.style.color === "white" ? "" : "white";
    menu.classList.toggle("remove-contact-detail");
  } else {
    contact.style.backgroundColor = "var(--customized_darkblue)";
    contact.style.color = "white";
    if (previousContactIndex !== null) {
      let previousContact = document.getElementById(
        `contact${previousContactIndex}`
      );
      if (previousContact) {
        previousContact.style.backgroundColor = "";
        previousContact.style.color = "";
      }
    }
    menu.classList.remove("remove-contact-detail");

    previousContactIndex = i;

    renderFloatingContact(contactList[i]);
  }
}

async function deleteCurrentContact() {
  let realIndex = contactListUnsorted.findIndex(contact => contact.id === contactList[previousContactIndex].id);
  let contactName = contactListUnsorted[realIndex].name;
 await deleteContact(previousContactIndex, realIndex);
 deleteContactsFromTasks(contactName);
}

async function deleteContactsFromTasks(contactName) {
  await getAllTasks();
  let updatedTasks = sortMatchingNames(contactName);
  
  for (let i = 0; i < updatedTasks.length; i++) {
    const newTask = updatedTasks[i];

    let indexOfCurTask = allTasks.findIndex(t => t.id == newTask.id);
    console.log(indexOfCurTask);

    let newUpdatedTask = creatTask(newTask['asigntTo'], newTask['category'], newTask['date'], newTask['description'], newTask['prio'], newTask['status'], newTask['subTasks'], newTask['title']);
    console.log(newUpdatedTask);
    await editTasks(indexOfCurTask, newUpdatedTask);
  }
}

function sortMatchingNames(contactName) {
  let filtered = [];
  for (let i = 0; i < allTasks.length; i++) {
    const task = allTasks[i];
    for (let j = 0; j < task.asigntTo.length; j++) {
      const element = task.asigntTo[j];
      if (element == contactName) {
        allTasks[i].asigntTo.splice(j, 1);
        filtered.push(allTasks[i]);
      }
    }
  }
  return filtered;
}

async function deleteContact(i, realIndex) {
  previousContactIndex = null;
  let menu = document.getElementById("contact-detail-data");
  let contact = document.getElementById(`contact${i}`);
  let editCard = document.getElementById("edit-card");

  contact.style.backgroundColor = "";
  contact.style.color = "";
  menu.classList.add("remove-contact-detail");
  editCard.classList.add("remove-contact-container");

  await deleteContacts(realIndex);
  await loadContacts();
}

function generateProfileColor() {
  let color = [
    "ff7a00",
    "9327ff",
    "6e52ff",
    "fc71ff",
    "ffbb2b",
    "1fd7c1",
    "462f8a",
    "ff4646",
    "00bee8",
  ];
  let randomColor = color[Math.floor(Math.random() * color.length)];
  return randomColor;
}
