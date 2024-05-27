let allTasks = [];


/**
 * This function is used to load all Tasks from backend
 */
async function getAllTasks() {
  loadedTasks = await getTasksArray();
  allTasks = loadedTasks;
}


/**
 * This function is used to navigate the browser to the previous page.
 */
function goBack() {
    history.back();
}


/**
 * This function is used to simulate a click event on a button with the given ID.
 * @param {string} buttonId - The ID of the button to be clicked.
 */
function simulateClickButton(buttonId) {
    const button = document.getElementById(buttonId);
    button.click();
}


/**
 * This function is used to set the current status to the given state.
 * @param {string} state - The state to set as the current status.
 */
function getCurrentStatus(state) {
    currentStatus = state;
}


document.addEventListener('DOMContentLoaded', (event) => {
    /**
     * This function is used to add event listeners to the relevant form and input elements.
     */
    function addEventListeners() {
      const addTaskForm = document.getElementById('add-task-form');
      const subtasksInput = document.getElementById('subtasks-input');
      
      if (addTaskForm) {
        addTaskForm.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        });
      }
      
      if (subtasksInput) {
        subtasksInput.addEventListener('keydown', function(e) {
          let inputValue = subtasksInput.value;
          if (e.key === 'Enter' && inputValue != '') {
            addSubtaskToPopup('addTask', '');
            clearSubtaskInput('addTask', '');
            checkInput('addTask', '');
          }
        });
      }
    }
  
    // Set up a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          if (document.getElementById('add-task-form')) {
            addEventListeners();
            observer.disconnect();
          }
        }
      });
    });
  
    // Configuration for the observer
    const config = {
      childList: true, 
      subtree: true
    };
  
    // Start observing the entire document
    observer.observe(document.body, config);
});


/**
 * This function is used to fetch all tasks and sets them to the global variable 'allTasks'.
 */
async function getAllTasks() {
    loadedTasks = await getTasksArray();
    allTasks = loadedTasks;
}


/**
 * This function is used to show or hide a movable container based on the given parameters.
 * @param {string} parameter - 'show' to display the container, 'remove' to hide it.
 * @param {string} container - The container to be shown or hidden ('addTask' or 'bigCard').
 */
function showMovableContainer(parameter, container) {
    if (parameter == 'show' && container == 'addTask') {
        document.getElementById('add-task-container').classList.add('show-moveable');
        document.getElementById('add-task-container').classList.remove('remove-moveable');
    }
    else if (parameter == 'remove' && container == 'addTask') {
        document.getElementById('add-task-container').classList.add('remove-moveable');
        document.getElementById('add-task-container').classList.remove('show-moveable');
    }
    else if (parameter == 'show' && container == 'bigCard') {
        document.getElementById('big-card-background').classList.add('show-moveable');
        document.getElementById('big-card-background').classList.remove('remove-moveable');
    }
    else if (parameter == 'remove' && container == 'bigCard') {
        document.getElementById('big-card-background').classList.remove('show-moveable');
        document.getElementById('big-card-background').classList.add('remove-moveable');
    }
}


/**
 * This function is used to reset the assigned contacts to an empty array.
 */
function resetAssignTo() {
    assignedContacts = [];
}


/**
 * This function is used to select the default priority by simulating a click on the button with the given ID.
 * @param {string} buttonId - The ID of the button to select the default priority.
 */
function selectDefaultPrio(buttonId) {
  simulateClickButton(buttonId);
}
