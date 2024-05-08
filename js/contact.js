function showAddContact(parameter) {
  if (parameter == "show") {
    document
      .getElementById("contact-card")
      .classList.add("show-contact-container");
    document
      .getElementById("contact-card")
      .classList.remove("remove-contact-container");
  } else {
    document
      .getElementById("contact-card")
      .classList.add("remove-contact-container");
    document
      .getElementById("contact-card")
      .classList.remove("show-contact-container");
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
