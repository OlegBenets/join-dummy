let dateArray = [];
let logedUser = [];
let logedUserDataArray = [];

async function initSummary() {
    greetingMobile();
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
    let currentDate = new Date();
    dateArray.sort((a, b) => new Date(a) - new Date(b));
    for (let date of dateArray) {
        if (new Date(date) > currentDate) {
            return formatDate(date);
        }
    }

    if (dateArray.length > 0) {
        return formatDate(dateArray[0]);
    }

    return null;
}

function formatDate(dateStr) {
    let date = new Date(dateStr);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
  
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


function greetingMobile() {
    let previousPage = getFromSessionStorage('page');
    let container = document.getElementById('greeting-container');
    
    if (previousPage === 'login' && window.innerWidth < 1024) {
        if (container) {
            // Show the container
            container.classList.add('show');
            container.style.display = 'flex';

            // Keep it visible for 2 seconds, then start fading out
            setTimeout(() => {
                container.style.opacity = '0';
                
                // After the opacity transition, set display to none
                setTimeout(() => {
                    container.style.display = 'none';
                    container.classList.remove('show');
                }, 2000); // Match this timeout with the CSS transition duration
            }, 2000);
        }
    }
}

// Retrieve a variable from the session storage
function getFromSessionStorage(key) {
    let value = sessionStorage.getItem(key);
    return value ? value : null;
}

// document.addEventListener('DOMContentLoaded', () => {
//     greetingMobile();
// });