let dateArray = [];
let logedUser = [];
let logedUserDataArray = [];

async function initSummary() {
    await initInclude();
    await loadAllData();
    await getAllTasks();
    logedUserDataArray = await getLoginDataArray();
    logedUser = loadLocal('activUser');
    loadAmountsInSummary();
    setDayTime();
    logedUserData();
    getProfileInitials();
}

function loadAmountsInSummary() {
    document.getElementById('todo-amount').innerHTML = getAmountOfTodos();
    document.getElementById('done-amount').innerHTML = getAmountOfDone();
    document.getElementById('prio-amount').innerHTML = getUrgentDates();
    document.getElementById('deadline').innerHTML = getEarliestDate();
    document.getElementById('amount-tasks-in-board').innerHTML = getAmountOfAllTasks();
    document.getElementById('amount-tasks-progress').innerHTML = getProgressTasks();
    document.getElementById('amount-tasks-feedback').innerHTML = getFeedbackTasks();
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

    return allUrgent.length;
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

    // Falls kein zukünftiges Datum gefunden wird, das früheste Datum zurückgeben
    if (dateArray.length > 0) {
        return formatDate(dateArray[0]);
    }

    // Falls kein Datum im Array vorhanden ist
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
    let greetingElement = document.getElementById('greeting-user');
    let currentDate = new Date();
    let hours = currentDate.getHours();
    let greeting;
  
    if (hours >= 5 && hours < 12) {
      greeting = "Godd morning,";
    } else if (hours >= 12 && hours < 18) {
      greeting = "Good afternoon,";
    } else if (hours >= 18 && hours < 22) {
      greeting = "Good evening,";
    } else {
      greeting = "Good night,";
    }
    greetingElement.textContent = greeting;
}

function logedUserData() {
    let greetingUserElement = document.getElementById('loged-user');
    let userIndex = logedUserDataArray.findIndex(u => u.id == logedUser);
    let user = logedUserDataArray[userIndex];

    if (userIndex >= 0) {
        let { name } = extractInitialsAndName(user);
        greetingUserElement.textContent = name;
    } else {
        greetingUserElement.textContent = "Guest";
    }
}

function getProfileInitials() {
    let container = document.getElementById('profile-initials');
    let userIndex = logedUserDataArray.findIndex(u => u.id == logedUser);
    let user = logedUserDataArray[userIndex];

    if (userIndex >= 0) {
        let { name } = extractInitialsAndName(user);
        let words = name.split(" ");
        let initials = words.map(word => word[0]).join("");
        container.innerHTML = initials;
    } else {
        container.innerHTML = 'G';
    }
}