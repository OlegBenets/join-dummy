let contacts = [
    {
        "id": "",
        "name": "",
        "email": "",
        "password": "",
        "phone": "",
        "profileColor": ""
    }

]

let tasks = [
    {
        "asigntTo": [],
        "category": true,
        "checkedSubtasks": 0,
        "date": "",
        "description": "",
        "id": 0,
        "prio": "",
        "status": "",
        "subTasks": "",
        "title": ""
    }
];

let validations = [];

let activUser = "guest";

const BASE_URL = 'https://join-storage-default-rtdb.europe-west1.firebasedatabase.app/';

async function loadData(path="") {
    let response = await fetch(BASE_URL + path + ".json"); // fetch default wert ist GET
    return responseAsJson = await response.json();
}
//PUT
async function putData(path="", data={}) {
    let response = await fetch(BASE_URL + path + ".json",{
        method: "PUT",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return responseAsJson = response.json();
}

/**
 * load all data from the server and saves in the specific variable
 */
async function loadAllData() {
    contacts = await loadData("contacts");
    tasks = await loadData("tasks");
    validations = await loadData("validations");
}

/**
 * sends all data to the server
 */
async function saveAllData() {
    await putData("contacts", contacts);
    await putData("tasks", tasks);
    await putData("validations", validations);
}

function idGenerator() {
    let date = new Date;
    let id = date.getTime();
    console.log(typeof(id));
    return id;
}

async function encrypt(data) {
    const encoder = new TextEncoder();

    const dataBuffer = encoder.encode(data);

    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashedData = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashedData;
}

/**
  * Creates a new contact.
  * @param {string} name - The name of the contact.
  * @param {string} email - The contact's email address.
  * @param {number} phone - The contact's phone number.
  * @returns {Object} An object representing the newly created contact.
  */
function creatContact(name, email, phone) {
    let contact = {
        "id": idGenerator(),
        "name": name,
        "email": email,
        "phone": phone
    };
    return contact;
}

/**
 * Creates a new task
 * @param {Array} asigntTo  - the list of asignt users
 * @param {boolean} category  - the flag that indicates whether it is a technical task or a user story
 * @param {Array} checkedSubtasks 
 * @param {number} date - the due date of the task
 * @param {string} description - the text that describe the task
 * @param {number} prio - the priority the task have (high medium low)
 * @param {number} status - the status of the task
 * @param {Array} subTasks - the list of subtask of the task
 * @param {string} title - the title of the task
 * @returns {object} An object representing the newly created task.
 */
function creatTask(asigntTo, category, checkedSubtasks, date, description, prio, status, subTasks, title) {
    let task = {
        "asigntTo": asigntTo, 
        "category": category,
        "checkedSubtasks": checkedSubtasks,
        "date": date,
        "description": description,
        "id": idGenerator(),
        "prio": prio,
        "status": status,
        "subTasks": subTasks,
        "title": title
    };
    return task;
}

/**
 * Creates a validation object with username and password.
 * @param {string} user - The username for validation.
 * @param {string} password - The password for validation.
 * @returns {object} A validation object with username and password.
 */
function creatValidaion(user, password) {
    let validation = {
        "user": user,
        "password": password
    };
    return validation;
}

/**
 * this function makes a deep copy of the parameter and push it in the validations array
 * @param {object} validation 
 */
function addValidations(validation) {
    let buffer = JSON.stringify(validation);
    validations.push(JSON.parse(buffer));
}

/**
 * this function deletes an entry of the validations array on the index position if the index is smaller than that array length
 * @param {number} index - the index number of the entry in the array that will be deleted
 */
function deleteValidations(index) {
    if (index < validations.length) {
        validations.splice(index, 1);
    }

}

/**
  * Edits the validations array based on the index and updated validation data. with an deep copy of the valdation
  * @param {number} index - The index of the validation to process.
  * @param {object} validation - The updated validation data.
  */
function editValidations(index, validation) {
    let buffer = JSON.stringify(validation);
    validations[index] = JSON.parse(buffer);
}

/**
  * Gets the validation data based on the index. with a detailed copy of the requested data entry
  * @param {number} index - The index of the validation to retrieve.
  * @returns {object} - The validation data.
  */
function getValidations(index) {
    let buffer = JSON.stringify(validations[index]);
    return JSON.parse(buffer);
}