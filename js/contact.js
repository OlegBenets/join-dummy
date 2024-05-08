function showAddContact(parameter) {
    let contactCard = document.getElementById("contact-card");
  if (parameter == "show") {
    contactCard.classList.add("show-contact-container");
    contactCard.classList.remove("remove-contact-container");
  } else {
    contactCard.classList.add("remove-contact-container");
    contactCard.classList.remove("show-contact-container");
  }
}

function showEditContact(parameter) {
    let editCard = document.getElementById("edit-card");
    if(parameter == 'show') {
      editCard.classList.add("show-contact-container");
      editCard.classList.remove("remove-contact-container");
    } else {
      editCard.classList.add("remove-contact-container");
      editCard.classList.remove("show-contact-container");
    }
}

function doNotClose(event) {
  event.stopPropagation();
}

function showContact() {
  let menu = document.getElementById("contact-detail-data");
  menu.classList.toggle("remove-contact-detail");
  let contact = document.getElementById("contact");
  if (contact.style.backgroundColor === "var(--customized_darkblue)") {
    contact.style.backgroundColor = "";
    contact.style.color = "";
  } else {
    contact.style.backgroundColor = "var(--customized_darkblue)";
    contact.style.color = "white";
  }
}
