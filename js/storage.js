let contacts = [
    {
        "id": "",
        "name": "",
        "email": "",
        "password": "",
        "phone": ""
    }
];
let tasks = [
    {
        "asigntTo": [],
        "category": true,
        "date": "",
        "description": "",
        "id": "",
        "prio": "",
        "status": "",
        "subTasks": "",
        "title": ""
    }
];

let validations = [];

async function loadAllData() {
    contacts = await loadData("contacts");
    tasks = await loadData("tasks");
    validations = await loadData("validations");
}

async function saveAllData() {
    await putData("contacts",contacts);
    await putData("tasks",tasks);
    await putData("validations",validations);
}


function creatContact(id, name, email, phone) {
    let contact = {
        "id": id,
        "name": name,
        "email": email,
        "phone": phone
    };
    return contact;
}

function creatTask(asigntTo, category, date, description, id, prio, status, subTasks, title) {
    let task = {
        "asigntTo": asigntTo, // is an array
        "category": category,
        "date": date,
        "description": description,
        "id": id,
        "prio": prio,
        "status": status,
        "subTasks": subTasks,
        "title": title
    };
    return task;
}

function creatValidaion(user, password) {
    let validation = {
        "user": user,
        "password": password
    };
    return validation;
}

function addValidaions(validation) {
    validations.push(validation);
}

function deleteValidations(index) {
    validations.splice(index, 1);
}

function editValidations(index, validation) {
    validations[index] = validation;
}

function getValidations(index) {
    let buffer = JSON.stringify(Validations[index]);
    return JSON.parse(buffer);
}