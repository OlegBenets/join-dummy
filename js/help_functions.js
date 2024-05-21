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

async function getAllTasks() {
    loadedTasks = await getTasksArray();
    allTasks = loadedTasks;
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