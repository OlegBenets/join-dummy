let contacts = [
    {
        'name': 'Anton Müller',
        'email': 'anton@gmail.com'
      },
      {
        'name': 'Anja Schulz',
        'email': 'schulz@hotmail.com'
      },
      {
        'name': 'Benedikt Ziegler',
        'email': 'benedikt@gmail.com'
      },
      {
        'name': 'David Eisenberg',
        'email': 'davidberg@gmail.com'
      },
      {
        'name': 'Eva Fischer',
        'email': 'fischer@hotmail.com'
      },
      {
        'name': 'Lisa Schmidt',
        'email': 'schmidt@gmail.com'
      },
      {
        'name': 'Maximilian Richter',
        'email': 'maxi@gmail.com'
      },
      {
        'name': 'Sarah Wagner',
        'email': 'wagner@hotmail.com'
      },
      {
        'name': 'Julia Mayer',
        'email': 'julia.mayer@gmail.com'
      },
      {
        'name': 'Michael Berger',
        'email': 'michaelb@gmail.com'
      },
      {
        'name': 'Laura Wolf',
        'email': 'laura.wolf@hotmail.com'
      },
      {
        'name': 'Alexander Klein',
        'email': 'alex.klein@gmail.com'
      },
      {
        'name': 'Sophie Hofmann',
        'email': 'sophie.hofmann@hotmail.com'
      },
      {
        'name': 'Simon Becker',
        'email': 'simon.becker@gmail.com'
      },
      {
        'name': 'Carolin Wagner',
        'email': 'carolin.wagner@hotmail.com'
      },
      {
        'name': 'Johannes Schneider',
        'email': 'johannes.schneider@gmail.com'
      },
      {
        'name': 'Laura Weber',
        'email': 'laura.weber@hotmail.com'
      }
];

function init() {
    loadContacts();
}

function loadContacts() {
    let allContacts = document.getElementById('all-contacts');
    allContacts.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        
        allContacts.innerHTML += renderContacts(contact, i);
    }
}

function renderContacts(contact, i) {
    let names = contact.name.split(" ");
    
    let name = [];
    for (let j = 0; j < names.length; j++) {
        const element = names[j].charAt(0);
        name.push(element);
    } 
    let fullName = name.join("");
return /*html*/ `
         <div class="sort-contacts"><h4>${contact.name.charAt(0).toUpperCase()}</h4></div>
         <div class="border-container">
         <div class="border-grey"></div>
        </div>
        <div onclick="showContact(${i})" class="contact" id="contact${i}">
            <div class="image-container">
                <span>${fullName}</span> 
            </div>
            <div class="contact-data">
                <h4>${contact.name}</h4>
                <a href="#">${contact.email}</a>
            </div>
        </div>
`;
}

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
  if (parameter == "show") {
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

function showContact(i) {
  let menu = document.getElementById("contact-detail-data");
  menu.classList.toggle("remove-contact-detail");

  let contact = document.getElementById(`contact${i}`);
  if (contact.style.backgroundColor === "var(--customized_darkblue)") {
    contact.style.backgroundColor = "";
    contact.style.color = "";
  } else {
    contact.style.backgroundColor = "var(--customized_darkblue)";
    contact.style.color = "white";
  }
}
