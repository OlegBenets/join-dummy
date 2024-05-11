function init() {
  load();
  loadContacts();
  console.log(contacts);
}

function loadContacts() {
  sortContacts();

  let allContacts = document.getElementById("all-contacts");
  allContacts.innerHTML = "";

  let previousInitial = "";

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const initial = contact.name.charAt(0).toUpperCase();

    if (initial !== previousInitial) {
      allContacts.innerHTML += renderInitial(initial);
      previousInitial = initial;
    }

    allContacts.innerHTML += renderContacts(contact, i);
  }
}

function sortContacts() {
  contacts.sort((a, b) => {
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

  let randomColor = contact.profileColor;
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

  let phoneNum = (document.getElementById("card-tel").innerHTML =
    contact.phone);
  let detailEmail = (document.getElementById("card-email").innerHTML =
    contact.email);
  let detailName = (document.getElementById("card-name").innerHTML = name);
  let detailInitial = (document.getElementById("card-initial").innerHTML =
    initials);
  let iconColor = document.getElementById('card-icon-color');
  iconColor.style.backgroundColor = '#'+contact.profileColor;
}

//Add Contact Js

function AddContact() {
  let name = document.getElementById("contact-name").value;
  let email = document.getElementById("contact-email").value;
  let tel = document.getElementById("contact-tel").value;

  let color = generateProfileColor();

  let newContact = {
    id: "",
    name: name,
    email: email,
    password: "",
    phone: tel,
    profileColor: color,
  };

  AddContactToContacts(newContact);
}

function AddContactToContacts(newContact) {
  contacts.push(newContact);
  save();

  document.getElementById("contact-name").value = "";
  document.getElementById("contact-email").value = "";
  document.getElementById("contact-tel").value = "";

  showAddContact();
  loadContacts();

  contactCreatedMessage();

  let newIndex = contacts.findIndex(contact => contact === newContact);

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
  newContactElement.scrollIntoView({behavior: "smooth", block: "center"});
}

function save() {
  let contactAsText = JSON.stringify(contacts);
  localStorage.setItem("contact", contactAsText);
}

function load() {
  let contactAsText = localStorage.getItem("contact");
  contacts = contactAsText ? JSON.parse(contactAsText) : [];
}

// Add Contact Js

function showAddContact(parameter) {
  let contactCard = document.getElementById("contact-card");
  if (parameter == "show") {
    contactCard.classList.remove("remove-contact-container");
  } else {
    contactCard.classList.add("remove-contact-container");
  }
}

function showEditContact(parameter) {
  let editCard = document.getElementById("edit-card");
  if (parameter == "show") {
    editCard.classList.remove("remove-contact-container");
  } else {
    editCard.classList.add("remove-contact-container");
  }
}

function doNotClose(event) {
  event.stopPropagation();
}

let previousContactIndex = null;

function showContact(i) {
  let menu = document.getElementById("contact-detail-data");
  let contact = document.getElementById(`contact${i}`);

  // Wenn auf denselben Kontakt geklickt wird
  if (previousContactIndex === i) {
    contact.style.backgroundColor =
      contact.style.backgroundColor === "var(--customized_darkblue)"
        ? ""
        : "var(--customized_darkblue)";
    contact.style.color = contact.style.color === "white" ? "" : "white";
    menu.classList.toggle("remove-contact-detail");
  } else {
    // Setze die Hintergrundfarbe und Textfarbe des aktuellen Kontakts
    contact.style.backgroundColor = "var(--customized_darkblue)";
    contact.style.color = "white";

    // Setze die Hintergrundfarbe und Textfarbe des vorherigen Kontakts zurück
    if (previousContactIndex !== null) {
      let previousContact = document.getElementById(
        `contact${previousContactIndex}`
      );
      if (previousContact) {
        previousContact.style.backgroundColor = "";
        previousContact.style.color = "";
      }
    }

    // Zeige das Kontakt-Detail-Menü an
    menu.classList.remove("remove-contact-detail");

    // Aktualisiere den Index des vorherigen Kontakts
    previousContactIndex = i;

    renderFloatingContact(contacts[i]);
  }
}

function deleteCurrentContact() {
  deleteContact(previousContactIndex);
}

function deleteContact(i) {
  let menu = document.getElementById('contact-detail-data');
  let contact = document.getElementById(`contact${i}`);

  contact.style.backgroundColor = "";
  contact.style.color = "";
  menu.classList.add('remove-contact-detail');

  contacts.splice(i, 1);
  save();
  loadContacts();
}

function generateProfileColor() {
 let color = ['ff7a00','9327ff','6e52ff','fc71ff','ffbb2b','1fd7c1','462f8a','ff4646','00bee8'];
 let randomColor = color[Math.floor(Math.random()*color.length)];
 return randomColor;
}

