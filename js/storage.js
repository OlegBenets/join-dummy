let contacts = [];
let tasks = [];
let loginData = [];

let activUser = null;

const BASE_URL = 'https://join-storage-default-rtdb.europe-west1.firebasedatabase.app/';

function saveLocal(key, value) {
    localStorage.setItem(key, value);
}

function loadLocal(key) {
    return localStorage.getItem(key);
}

function deleteLocal(key) {
    localStorage.removeItem(key);
}

function userLogout() {
    deleteLocal('activUser');
    deleteLocal('saveuser');
    window.location.href = '../html/login.html';
}





async function loadData(path = "") {
    let response = await fetch(BASE_URL + path + ".json"); // fetch default wert ist GET
    let responseAsJson = await response.json();
    if (path == 'tasks') {
        if (responseAsJson) {
            responseAsJson.forEach(task => {
                if (!task.hasOwnProperty('subTasks')) {
                    // Attribut hinzufügen, wenn es nicht vorhanden ist
                    task.subTasks = [];
                }
                if (!task.hasOwnProperty('asigntTo')) {
                    // Attribut hinzufügen, wenn es nicht vorhanden ist
                    task.asigntTo = [];
                }
            });
        }

    }
    return checkIfEmpty(responseAsJson);
}

function checkIfEmpty(data) {
    if (data) {
        return data;
    } else {
        return data = [];
    };
}

//PUT
async function putData(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + ".json", {
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
async function loadAllData(target = "all") {
    switch (target) {
        case "all":
            contacts = await loadData("contacts");
            tasks = await loadData("tasks");
            loginData = await loadData("loginData");
            break;

        case "contacts":
            contacts = await loadData("contacts");
            break;

        case "tasks":
            tasks = await loadData("tasks");
            break;

        case "loginData":
            loginData = await loadData("loginData");
            break;
    }

}

/**
 * sends all data to the server
 */
async function saveAllData(target = "all") {
    switch (target) {
        case "all":
            await putData("contacts", contacts);
            await putData("tasks", tasks);
            await putData("loginData", loginData);
            break;

        case "contacts":
            await putData("contacts", contacts);
            break;

        case "tasks":
            await putData("tasks", tasks);
            break;

        case "loginData":
            await putData("loginData", loginData);
            break;
    }
}

function idGenerator() {
    let date = new Date;
    let id = date.getTime();
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

//Contact handling functions

/**
  * Creates a new contact.
  * @param {string} name - The name of the contact.
  * @param {string} email - The contact's email address.
  * @param {number} phone - The contact's phone number.
  * @param {string} color  -
  * @returns {Object} An object representing the newly created contact.
  */
function creatContact(name, email, phone, color) {
    let contact = {
        "id": idGenerator(),
        "name": name,
        "email": email,
        "phone": phone,
        "color": color
    };
    return contact;
}

async function addContacts(contact) {
    let buffer = JSON.stringify(contact);
    contacts.push(await JSON.parse(buffer));
    await saveAllData('contacts');
}

async function deleteContacts(index) {
    if (index < contacts.length) {
        contacts.splice(index, 1);
    }
    await saveAllData('contacts');
}

async function editContacts(index, contact) {
    if (index < contacts.length) {
        let buffer = JSON.stringify(contact);
        contacts[index] = await JSON.parse(buffer);
    }
    await saveAllData('contacts');
}

async function getContacts(index) {
    if (index < contacts.length) {
        let buffer = JSON.stringify(contacts[index]);
        return await JSON.parse(buffer);
    }
}

async function getContactsArray() {
    let buffer = JSON.stringify(contacts);
    return await JSON.parse(buffer);
}

//Task handling functions

/**
 * Creates a new task
 * @param {Array} asigntTo  - the list of asignt users
 * @param {boolean} category  - the flag that indicates whether it is a technical task or a user story
 * @param {number} date - the due date of the task
 * @param {string} description - the text that describe the task
 * @param {number} prio - the priority the task have (high medium low)
 * @param {number} status - the status of the task
 * @param {Array} subTasks - the list of subtask of the task
 * @param {string} title - the title of the task
 * @returns {object} An object representing the newly created task.
 */
function creatTask(asigntTo, category, date, description, prio, status, subTasks, title) {
    let task = {
        "asigntTo": asigntTo,
        "category": category,
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

async function addTasks(task) {
    let buffer = JSON.stringify(task);
    tasks.push(await JSON.parse(buffer));
    await saveAllData('tasks');
}

async function deleteTasks(index) {
    if (index < tasks.length) {
        tasks.splice(index, 1);
    }
    await saveAllData('tasks');
}

async function editTasks(index, task) {
    if (index < tasks.length) {
        let buffer = JSON.stringify(task);
        tasks[index] = await JSON.parse(buffer);
    }
    await saveAllData('tasks');
}

async function getTasks(index) {
    if (index < tasks.length) {
        let buffer = JSON.stringify(tasks[index]);
        return await JSON.parse(buffer);
    }
}

async function getTasksArray() {
    let buffer = JSON.stringify(tasks);
    return await JSON.parse(buffer);
}

//Subtask handling functions

function creatSubTask(subtitle, checked = "unchecked") {
    let subtask = {
        "subtitle": subtitle,
        "checked": checked,
        "id": idGenerator()
    }
    return subtask;
}

async function addSubTasks(index, subtask) {
    let buffer = JSON.stringify(subtask);
    tasks[index].subTasks.push(await JSON.parse(buffer));
    await saveAllData('tasks');
}

async function deleteSubTasks(index, subindex) {
    if (index < tasks.length) {
        if (subindex < tasks[index].subTasks.length) {
            tasks[index].subTasks.splice(subindex, 1);
        }
    }
    await saveAllData('tasks');
}

async function editSubTasks(index, subindex, subtask) {
    if (index < tasks.length) {
        if (subindex < tasks[index].subTasks.length) {
            let buffer = JSON.stringify(subtask);
            tasks[index].subTasks[subindex] = await JSON.parse(buffer);
        }
    }
    await saveAllData('tasks');
}

async function getSubTasks(index, subindex) {
    if (index < tasks.length) {
        if (subindex < tasks[index].subtask.length) {
            let buffer = JSON.stringify(tasks[index].subtask[subindex]);
            return await JSON.parse(buffer);
        }
    }
}

async function getSubTasks(index) {
    if (index < tasks.length) {
        let buffer = JSON.stringify(tasks[index].subtask);
        return await JSON.parse(buffer);
    }
}

//Validation handling functions

/**
 * Creates a userData object with username and password.
 * @param {string} user - The username for userData.
 * @param {string} password - The password for userData.
 * @returns {object} A userData object with username and password.
 */
function creatUser(user, password, email) {
    let userData = {
        "name": user,
        "password": password,
        "email": email,
        "id": idGenerator()
    };
    return userData;
}

/**
 * this function makes a deep copy of the parameter and push it in the loginData array
 * @param {object} userData 
 */
async function addLoginData(userData) {
    let buffer = JSON.stringify(userData);
    loginData.push(await JSON.parse(buffer));
    await saveAllData('loginData');
}

/**
 * this function deletes an entry of the loginData array on the index position if the index is smaller than that array length
 * @param {number} index - the index number of the entry in the array that will be deleted
 */
async function deleteLoginData(index) {
    if (index < loginData.length) {
        loginData.splice(index, 1);
    }
    await saveAllData('loginData');
}

/**
  * Edits the loginData array based on the index and updated userData data. with an deep copy of the valdation
  * @param {number} index - The index of the userData to process.
  * @param {object} userData - The updated userData data.
  */
async function editLoginData(index, userData) {
    if (index < loginData.length) {
        let buffer = JSON.stringify(userData);
        loginData[index] = await JSON.parse(buffer);
    }
    await saveAllData('loginData');
}

/**
  * Gets the userData data based on the index. with a detailed copy of the requested data entry
  * @param {number} index - The index of the userData to retrieve.
  * @returns {object} - The userData data.
  */
async function getLoginData(index) {
    if (index < loginData.length) {
        let buffer = JSON.stringify(loginData[index]);
        return await JSON.parse(buffer);
    }
}

async function getLoginDataArray() {
    let buffer = JSON.stringify(loginData);
    return await JSON.parse(buffer);
}