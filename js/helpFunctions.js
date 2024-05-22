let allTasks = [];

/**
 * This function is used to load all Tasks from backend
 */
async function getAllTasks() {
  loadedTasks = await getTasksArray();
  allTasks = loadedTasks;
}

function goBack() {
    history.back();
}

function simulateClickButton(buttonId) {
    const button = document.getElementById(buttonId);
    button.click();
}

function selectDefaultPrio(buttonId) {
    simulateClickButton(buttonId);
}



function getCurrentStatus(state) {
    currentStatus = state;
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Funktion zum Hinzufügen der Event Listener
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
  
    // Mutation Observer einrichten
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Überprüfen, ob das gewünschte Element hinzugefügt wurde
          if (document.getElementById('add-task-form')) {
            addEventListeners();
            // Observer stoppen, nachdem die Event Listener hinzugefügt wurden
            observer.disconnect();
          }
        }
      });
    });
  
    // Observer Konfiguration
    const config = {
      childList: true, 
      subtree: true
    };
  
    // Beobachtung des gesamten Dokumenten-Knotens starten
    observer.observe(document.body, config);
});



async function getAllTasks() {
    loadedTasks = await getTasksArray();
    allTasks = loadedTasks;
}

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

function resetAssignTo() {
    assignedContacts = [];
}


