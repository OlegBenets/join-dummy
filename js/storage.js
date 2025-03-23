let contacts = [];
let tasks = [];
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
    deleteLocal('saveuser');
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
    if (path === "login" || path === "signup") {
        return null; 
    }

    const authToken = loadLocal('authToken');
    if (!authToken) {
        return null;
    }

    const response = await fetch(BASE_URL + path, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${authToken}`
        }
    });
    console.log(response);
    
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
async function postData(path = "", data = {}, requireAuth = true) {
    const headers = {
        "Content-Type": "application/json",
    };

    if (requireAuth) {
        const token = loadLocal('authToken');
        if (token) {
            headers["Authorization"] = `Token ${token}`;
        } else {
            console.warn("No auth token found in local storage.");
        }
    }

    const response = await fetch(BASE_URL + path, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    });

    console.log(response);

    let responseData;
    try {
        responseData = await response.json();
    } catch (error) {
        console.error("Error parsing response JSON:", error);
        responseData = null;
    }

    if (response.ok && path === 'signup/' && responseData?.token) {
        saveLocal('authToken', responseData.token);
    }

    return responseData;
}


/**
 * Sends data to the server using the HTTP PUT method.
 * 
 * @param {string} [path] - The path to which the data will be sent.
 * @param {Object} [data] - The data to be sent to the server.
 * @returns {Promise<Object>} A promise that resolves to the response from the server.
 */
async function putData(path, data) {
    const response = await fetch(BASE_URL + path, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${loadLocal('authToken')}`,
        },
        body: JSON.stringify(data)
    });
    return response.json();
}


/**
 * Löscht ein Element vom Server.
 *
 * @param {string} path - Der Pfad, der das Element identifiziert (z.B. "contacts/{id}").
 * @returns {Promise<Object>} Das Antwortobjekt nach dem Löschen des Elements.
 */
async function deleteData(path) {
    const response = await fetch(BASE_URL + path, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${loadLocal('authToken')}`,
        }
    });
    if (response.status === 204) {
       return { success: true };
    }

    try {
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error parsing response JSON:', error);
        return data
    }
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
            break;
        case "contacts":
            contacts = await loadData("contacts/");
            break;
        case "tasks":
            tasks = await loadData("tasks/");
            break;
    }
}