<<<<<<< HEAD
let dateArray = [];

async function initSummary() {
    await initInclude();
    await loadAllData();
    await getAllTasks();
    loadAmountsInSummary();
}


function loadAmountsInSummary() {
    console.log(allTasks);
    let todoAmountContainer = document.getElementById('todo-amount').innerHTML = getAmountOfTodos();
    let doneAmountContainer = document.getElementById('done-amount').innerHTML = getAmountOfDone();
    let prioAmountContainer = document.getElementById('prio-amount').innerHTML;
    let deadlineContainer = document.getElementById('deadline').innerHTML = getEarliestDate();
    let allTasksInBoardContainer = document.getElementById('amount-tasks-in-board').innerHTML;
    let progressAmountContainer = document.getElementById('amount-tasks-progress').innerHTML;
    let feedbackAmountContainer = document.getElementById('amount-tasks-feedback').innerHTML;
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
        return date;
      }
    }
  
    // Falls kein zukünftiges Datum gefunden wird
    return null;
  }

=======
function documents() {
    let todoAmount = document.getElementById('todo-amount').innerHTML;
    let doneAmount = document.getElementById('done-amount').innerHTML;
    let prioAmount = document.getElementById('prio-amount').innerHTML;
    let deadline = document.getElementById('deadline').innerHTML;
    let allTasksInBoard = document.getElementById('amount-tasks-in-board').innerHTML;
    let progressAmount = document.getElementById('amount-tasks-progress').innerHTML;
    let feedbackAmount = document.getElementById('amount-tasks-feedback').innerHTML;
    let greeting = document.getElementById('greeting-user').innerHTML;
    let logedUser = document.getElementById('loged-user').innerHTML;
}
>>>>>>> e4af47716de87e4976734b8653c2997d0624d4df
