let contacts = [];
let tasks = [];
let loginData = [];
let lastPage = loadSession('page');

const BASE_URL = 'http://127.0.0.1:8000/api/';

window.addEventListener('beforeunload', function () { saveLastPath() });


/**
 * Saves the current page path (excluding the "/html/" prefix and ".html" suffix) to the session storage.
 * The path is saved with the key 'page'.
 */
function saveLastPath() {
    let path = window.location.pathname;
    let page = path.replace(/^\/html\/|\.html$/g, "");
    saveSession('page', page);
}


/**
 * Saves a key-value pair to the session storage.
 *
 * @param {string} key - The key under which the value is stored.
 * @param {string} value - The value to be stored.
 */
function saveSession(key, value) {
    sessionStorage.setItem(key, value);
}


/**
 * Loads a value from the session storage based on the given key.
 *
 * @param {string} key - The key of the value to be retrieved.
 * @returns {string|null} The value associated with the key, or null if the key does not exist.
 */
function loadSession(key) {
    return sessionStorage.getItem(key);
}


/**
 * Deletes a key-value pair from the session storage based on the given key.
 *
 * @param {string} key - The key of the value to be deleted.
 */
function deleteSession(key) {
    sessionStorage.removeItem(key);
}


/**
 * Saves a key-value pair to the local storage.
 *
 * @param {string} key - The key under which the value is stored.
 * @param {string} value - The value to be stored.
 */
function saveLocal(key, value) {
    localStorage.setItem(key, value);
}


/**
 * Loads a value from the local storage based on the given key.
 *
 * @param {string} key - The key of the value to be retrieved.
 * @returns {string|null} The value associated with the key, or null if the key does not exist.
 */
function loadLocal(key) {
    return localStorage.getItem(key);
}


/**
 * Deletes a key-value pair from the local storage based on the given key.
 *
 * @param {string} key - The key of the value to be deleted.
 */
function deleteLocal(key) {
    localStorage.removeItem(key);
}


/**
 * Logs out the current user by deleting relevant data from local storage 
 * and redirecting to the login page.
 */
function userLogout() {
    deleteLocal('authToken');
    window.location.href = '/html/login.html'; 
}

/**
 * Loads data from the server based on the specified path.
 * 
 * @param {string} [path=""] - The path from which to load the data. Defaults to an empty string.
 * @returns {Promise<Array|Object|null>} A promise that resolves to the loaded data as an array or object,
 *                                          or null if no data is available.
 */
async function loadData(path = "") {
    const token = loadLocal('authToken'); 
    const response = await fetch(BASE_URL + path, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Token ${token}` : ""
        }
    });
    const responseAsJson = await response.json();
    if (path === 'tasks' && responseAsJson) {
        responseAsJson.forEach(task => {
            task.subTasks = task.subTasks || [];
            task.asigntTo = task.asigntTo || [];
        });
    }
    return checkIfEmpty(responseAsJson);
}


/**
 * Checks if the provided data is empty (null, undefined, or empty).
 * If the data is empty, returns an empty array.
 * Otherwise, returns the data itself.
 *
 * @param {*} data - The data to check.
 * @returns {*} The original data if it's not empty; an empty array otherwise.
 */
function checkIfEmpty(data) {
    if (data) {
        return data;
    } else {
        return data = [];
    };
}

/**
 * Sends data to the server using the HTTP POST method.
 * 
 * @param {string} [path=""] - The path to which the data will be sent.
 * @param {Object} [data={}] - The data to be sent to the server.
 * @returns {Promise<Object>} A promise that resolves to the response from the server.
 */
async function postData(path = "", data = {}) {
    let response = await fetch(BASE_URL + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    let responseData = await response.json();

    if (response.ok && path === 'signup/' && responseData.token) {
        saveLocal('authToken', responseData.token);
    }

    return responseData;
}


/**
 * Sends data to the server using the HTTP PUT method.
 * 
 * @param {string} [path=""] - The path to which the data will be sent.
 * @param {Object} [data={}] - The data to be sent to the server.
 * @returns {Promise<Object>} A promise that resolves to the response from the server.
 */
async function putData(path = "", data = {}) {
    let response = await fetch(BASE_URL + path, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}


/**
 * Loads data from the server for specified targets and updates corresponding variables.
 *
 * @param {string} [target="all"] - The target data to load ("all", "contacts", "tasks", "loginData").
 * @returns {Promise<void>} A promise that resolves once the data is loaded and variables are updated.
 */
async function loadAllData(target = "all") {

    switch (target) {
        case "all":
            contacts = await loadData("contacts/");
            tasks = await loadData("tasks/");
            loginData = await loadData("login/");
            break;
        case "contacts":
            contacts = await loadData("contacts/");
            break;
        case "tasks":
            tasks = await loadData("tasks/");
            break;
        case "login":
            loginData = await loadData("login/");
            break;
    }
}


/**
 * Saves data to the server for specified targets.
 *
 * @param {string} [target="all"] - The target data to save ("all", "contacts", "tasks", "loginData").
 * @returns {Promise<void>} A promise that resolves once the data is saved.
 */
async function saveAllData(target = "all") {
    switch (target) {
        case "all":
            await saveData("contacts/", contacts);
            await saveData("tasks/", tasks);
            await saveData("login/", loginData);
            break;
        case "contacts":
            await saveData("contacts/", contacts);
            break;
        case "tasks":
            await saveData("tasks/", tasks);
            break;
        case "login":
            await saveData("login/", loginData);
            break;
    }
}


/**
 * Saves data to the server using POST or PUT based on the presence of an ID.
 * This function is generalized to handle any target (e.g., contacts, tasks, login).
 *
 * @param {string} target - The target data type ("contacts", "tasks", "login").
 * @param {Array} data - The data array to be saved.
 * @returns {Promise<void>} A promise that resolves once the data is saved.
 */
async function saveData(target, data) {
    const token = loadLocal('authToken'); 
    
    for (let item of data) {
        const method = item.id ? "PUT" : "POST";
        
        const response = await fetch(BASE_URL + target + (item.id ? `${item.id}/` : ""), {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(item)
        });
        
        await response.json();
    }
}


/**
 * Generates a unique identifier based on the current timestamp.
 *
 * @returns {number} A unique identifier as the number of milliseconds elapsed since January 1, 1970.
 */
function idGenerator() {
    let date = new Date;
    let id = date.getTime();
    return id;
}


/**
 * Encrypts the given data using the SHA-256 hashing algorithm.
 *
 * @param {string} data - The data to be encrypted.
 * @returns {Promise<string>} A promise that resolves to the encrypted data as a hexadecimal string.
 */
async function encrypt(data) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedData = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashedData;
}