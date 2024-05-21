let dateArray = [];

async function initSummary() {
    await initInclude();
    await loadAllData();
    await getAllTasks();
    loadAmountsInSummary();
    setDayTime();
}

function loadAmountsInSummary() {
    console.log(allTasks);
    let todoAmountContainer = document.getElementById('todo-amount').innerHTML = getAmountOfTodos();
    let doneAmountContainer = document.getElementById('done-amount').innerHTML = getAmountOfDone();
    let prioAmountContainer = document.getElementById('prio-amount').innerHTML;
    let deadlineContainer = document.getElementById('deadline').innerHTML = getEarliestDate();
    let allTasksInBoardContainer = document.getElementById('amount-tasks-in-board').innerHTML = getAmountOfAllTasks();
    let progressAmountContainer = document.getElementById('amount-tasks-progress').innerHTML = getProgressTasks();
    let feedbackAmountContainer = document.getElementById('amount-tasks-feedback').innerHTML = getFeedbackTasks();
}

function getAmountOfTodos() {
    let todo = allTasks.filter(t => t['status'] == 'todo');
    return todo.length;
}

function getAmountOfDone() {
    let done = allTasks.filter(t => t['status'] == 'done');
    return done.length;
}

function getUrgentDates() {
    let allUrgent = allTasks.filter(t => t['prio'] == 'Urgent');
    dateArray = [];

    for (let i = 0; i < allUrgent.length; i++) {
        const urgent = allUrgent[i];
        
        let urgentDate = urgent['date'];
        dateArray.push(urgentDate);
    }
    
}

function getEarliestDate() {
    getUrgentDates();
    // Aktuelles Datum
    let currentDate = new Date();
  
    // Array sortieren
    dateArray.sort((a, b) => new Date(a) - new Date(b));
  
    // Das nächste zukünftige Datum finden
    for (let date of dateArray) {
      if (new Date(date) > currentDate) {
        return formatDate(date);
      }
    }
  
    // Falls kein zukünftiges Datum gefunden wird
    return null;
}

function formatDate(dateStr) {
    // Date-Objekt aus dem Datum-String erstellen
    let date = new Date(dateStr);
  
    // Optionen für die toLocaleDateString Methode
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
  
    // Datum in das gewünschte Format umwandeln
    return date.toLocaleDateString('en-US', options);
}

function getAmountOfAllTasks() {
    return allTasks.length;
}

function getProgressTasks() {
    let progress = allTasks.filter(t => t['status'] == 'progress');
    return progress.length;
}

function getFeedbackTasks() {
    let feedback = allTasks.filter(t => t['status'] == 'await');
    return feedback.length;
}

function setDayTime() {
    let greeting = document.getElementById('greeting-user');
    greeting.textContent = greeting;
    let currentDate = new Date();
    let hours = currentDate.getHours();
  
    if (hours >= 5 && hours < 12) {
      greeting = "Godd morning";
    } else if (hours >= 12 && hours < 18) {
      greeting = "Good afternoon";
    } else if (hours >= 18 && hours < 22) {
      greeting = "Good evening";
    } else {
      greeting = "Good night";
    }
  }

