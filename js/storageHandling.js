//Contact handling functions


/**
 * Creates a new contact object.
 *
 * @param {string} name - The name of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {string} color - The color associated with the contact.
 * @returns {Object} The newly created contact object.
 */
function creatContact(name, email, phone, color) {
    let contact = {
        "name": name,
        "email": email,
        "phone": phone,
        "color": color
    };
    return contact;
}


/**
 * Adds a new contact to the contacts array and saves it to the data storage.
 *
 * @param {Object} contact - The contact object to be added.
 * @returns {Promise<void>} A promise that resolves once the contact has been added and saved.
 */
async function addContacts(contact) {
    let response = await postData('contacts/', contact);
    if (response && response.id) { 
        contacts.push(response); 
    }
}


/**
 * Deletes a contact from the contacts array at the specified index and saves the updated array to the data storage.
 *
 * @param {number} index - The index of the contact to be deleted.
 * @returns {Promise<void>} A promise that resolves once the contact has been deleted and the data has been saved.
 */
async function deleteContacts(index) {
    if (index < contacts.length) {
        let contactId = contacts[index].id;  
        let response = await deleteData(`contacts/${contactId}/`);  
        if (response.success) { 
            contacts.splice(index, 1);  
        }
    }
}


/**
 * Edits a contact in the contacts array at the specified index and saves the updated contact to the data storage.
 *
 * @param {number} index - The index of the contact to be edited.
 * @param {Object} contact - The updated contact object.
 * @returns {Promise<void>} A promise that resolves once the contact has been edited and the data has been saved.
 */
async function editContacts(index, contact) {
    if (index < contacts.length) {
        let contactId = contacts[index].id; 
        let response = await putData(`contacts/${contactId}/`, contact); 
        if (response && response.id) { 
            contacts[index] = response;  
        }
    }
}


/**
 * Retrieves a contact from the contacts array at the specified index.
 *
 * @param {number} index - The index of the contact to be retrieved.
 * @returns {Promise<Object|undefined>} A promise that resolves to the contact object if found, otherwise undefined.
 */
async function getContacts(index) {
    if (index < contacts.length) {
        let buffer = JSON.stringify(contacts[index]);
        return await JSON.parse(buffer);
    }
}


/**
 * Retrieves the entire contacts array.
 *
 * @returns {Promise<Array>} A promise that resolves to the array of contacts.
 */
async function getContactsArray() {
    let buffer = JSON.stringify(contacts);
    return await JSON.parse(buffer);
}


//Task handling functions


/**
 * Creates a new task object.
 *
 * @param {string} asigntTo - The person assigned to the task.
 * @param {string} category - The category of the task.
 * @param {string} date - The due date of the task.
 * @param {string} description - The description of the task.
 * @param {string} prio - The priority of the task.
 * @param {string} status - The status of the task.
 * @param {Array<Object>} subTasks - An array of subtasks associated with the task.
 * @param {string} title - The title of the task.
 * @returns {Object} The newly created task object.
 */
function creatTask(asigntTo, category, date, description, prio, status, subTasks, title) {
    let task = {
        "assigned_to": asigntTo,
        "category": category,
        "date": date,
        "description": description,
        "prio": prio,
        "status": status,
        "sub_tasks": subTasks,
        "title": title
    };
    return task;
}


/**
 * Adds a new task to the tasks array and saves it to the data storage.
 *
 * @param {Object} task - The task object to be added.
 * @returns {Promise<void>} A promise that resolves once the task has been added and saved.
 */
async function addTasks(task) {
    let response = await postData('tasks/', task);
    if (response && response.id) { 
        tasks.push(response); 
    }
}


/**
 * Deletes a task from the tasks array at the specified index and saves the updated array to the data storage.
 *
 * @param {number} index - The index of the task to be deleted.
 * @returns {Promise<void>} A promise that resolves once the task has been deleted and the data has been saved.
 */
async function deleteTasks(index) {
    if (index < tasks.length) {
        let taskId = tasks[index].id;  
        let response = await deleteData(`tasks/${taskId}/`);  
        if (response.success) { 
            tasks.splice(index, 1);  
        }
    }
}


/**
 * Edits a task in the tasks array at the specified index and saves the updated task to the data storage.
 *
 * @param {number} index - The index of the task to be edited.
 * @param {Object} task - The updated task object.
 * @returns {Promise<void>} A promise that resolves once the task has been edited and the data has been saved.
 */
async function editTasks(index, task) {
    if (index < tasks.length) {
        let taskId = tasks[index].id;  
        let response = await putData(`tasks/${taskId}/`, task); 
        if (response && response.id) { 
            tasks[index] = response;  
        }
    }
}


/**
 * Retrieves a task from the tasks array at the specified index.
 *
 * @param {number} index - The index of the task to be retrieved.
 * @returns {Promise<Object|undefined>} A promise that resolves to the task object if found, otherwise undefined.
 */
async function getTasks(index) {
    if (index < tasks.length) {
        let buffer = JSON.stringify(tasks[index]);
        return await JSON.parse(buffer);
    }
}

/**
 * Retrieves the entire tasks array.
 *
 * @returns {Promise<Array>} A promise that resolves to the array of tasks.
 */
async function getTasksArray() {
    let buffer = JSON.stringify(tasks);
    return await JSON.parse(buffer);
}


//Subtask handling functions


/**
 * Creates a new subtask object with the given subtitle and optional checked status.
 *
 * @param {string} subtitle - The subtitle of the subtask.
 * @param {string} [checked="unchecked"] - The checked status of the subtask (default is "unchecked").
 * @returns {Object} The created subtask object.
 */
function creatSubTask(subtitle, checked = "unchecked") {
    let subtask = {
        "title": subtitle,
        "checked": checked,
    }
    return subtask;
}


/**
 * Adds a new subtask to the tasks array at the specified index and saves it to the data storage.
 *
 * @param {number} index - The index of the parent task.
 * @param {Object} subtask - The subtask object to be added.
 * @returns {Promise<void>} A promise that resolves once the subtask has been added and saved.
 */
async function addSubTasks(index, subtask) {
    let task = tasks[index];
    task.sub_tasks.push(subtask);

    let response = await postData(`tasks/${task.id}/sub_tasks/`, subtask); 
    if (response && response.id) { 
        tasks[index] = task; 
    }
}


/**
 * Deletes a subtask from the tasks array at the specified index and subindex, and saves the updated array to the data storage.
 *
 * @param {number} index - The index of the parent task.
 * @param {number} subindex - The index of the subtask to be deleted.
 * @returns {Promise<void>} A promise that resolves once the subtask has been deleted and the data has been saved.
 */
async function deleteSubTasks(index, subindex) {
    if (index < tasks.length) {
        let task = tasks[index];
        let subtaskId = task.sub_tasks[subindex].id;

        task.sub_tasks.splice(subindex, 1);

        let response = await deleteData(`tasks/${task.id}/sub_tasks/${subtaskId}/`);
        if (response && response.id) { 
            tasks[index] = response; 
        }
    }
}


/**
 * Edits a subtask in the tasks array at the specified index and subindex, and saves the updated subtask to the data storage.
 *
 * @param {number} index - The index of the parent task.
 * @param {number} subindex - The index of the subtask to be edited.
 * @param {Object} subtask - The updated subtask object.
 * @returns {Promise<void>} A promise that resolves once the subtask has been edited and the data has been saved.
 */
async function editSubTasks(index, subindex, subtask) {
    if (index < tasks.length) {
        let task = tasks[index];
        if (task.sub_tasks && task.sub_tasks[subindex]) {
            let subtaskId = task.sub_tasks[subindex].id;

            let response = await putData(`tasks/${task.id}/sub_tasks/${subtaskId}/`, subtask);
            
            if (response && response.id) {
                task.sub_tasks[subindex] = response;
                tasks[index] = task;
            }
        }
    }
}


/**
 * Retrieves a specific subtask from the tasks array at the specified index and subindex.
 *
 * @param {number} index - The index of the parent task.
 * @param {number} subindex - The index of the subtask to be retrieved.
 * @returns {Promise<Object|undefined>} A promise that resolves to the subtask object if found, otherwise undefined.
 */
async function getSubTasks(index, subindex) {
    if (index < tasks.length) {
        let task = tasks[index];
        let subtaskId = task.sub_tasks[subindex].id;

        let response = await getData(`tasks/${task.id}/sub_tasks/${subtaskId}/`);
        return response;  
    }
}

/**
 * Retrieves all subtasks of a specific task from the tasks array at the specified index.
 *
 * @param {number} index - The index of the parent task.
 * @returns {Promise<Array>} A promise that resolves to an array of subtask objects.
 */
async function getAllSubTasks(index) {
    if (index < tasks.length) {
        let task = tasks[index];

        let response = await getData(`tasks/${task.id}/sub_tasks/`);
        return response || [];
    }
}


/**
 * Creates a new user object with the given username, password, and email.
 *
 * @param {string} user - The username of the new user.
 * @param {string} password - The password of the new user.
 * @param {string} email - The email address of the new user.
 * @returns {Object} The created user object.
 */
function creatUser(user, password, email) {
    let userData = {
        "username": user,
        "password": password,
        "repeated_passwort": password,
        "email": email,
    };
    return userData;
}


// /**
//  * Deletes login data for a user at the specified index from the login data array.
//  *
//  * @param {number} index - The index of the login data to delete.
//  * @returns {Promise<void>} A Promise that resolves when the login data is successfully deleted.
//  */
// async function deleteLoginData(index) {
//     if (index < loginData.length) {
//         let userId = loginData[index].id;
//         let response = await deleteData(`login/${userId}`);
//         if (response.success) { 
//             loginData.splice(index, 1);  
//         }
//     }
// }


// /**
//  * Edits login data for a user at the specified index in the login data array.
//  *
//  * @param {number} index - The index of the login data to edit.
//  * @param {Object} userData - The updated user data to replace the existing data.
//  * @returns {Promise<void>} A Promise that resolves when the login data is successfully edited.
//  */
// async function editLoginData(index, userData) {
//     if (index < loginData.length) {
//         let userId = loginData[index].id;
//         let response = await putData(`login/${userId}`, userData); 
//         if (response && response.id) { 
//             loginData[index] = response;  
//         }
//     }
// }


// /**
//  * Retrieves the login data for a user at the specified index in the login data array.
//  *
//  * @param {number} index - The index of the login data to retrieve.
//  * @returns {Promise<Object|undefined>} A Promise that resolves with the user data if found, otherwise undefined.
//  */
// async function getLoginData(index) {
//     if (index < loginData.length) {
//         let buffer = JSON.stringify(loginData[index]);
//         return await JSON.parse(buffer);
//     }
// }