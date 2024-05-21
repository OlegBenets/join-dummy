let currentDraggedItem;
let allTasks = [];
let filterdtasks = [];
let loadedTasks = [];
let currentContactColor = 'black';
let allContactsExist = [];


async function init() {
    await initPage();
    await loadAllData();
    await getAllTasks();
    
    loadCards();
}

function loadCards() {
    loadTodoCards();
    loadProgressCards();
    loadAwaitCards();
    loadDoneCards();
}

function loadTodoCards() {
    let todo = allTasks.filter(t => t['status'] == 'todo');

    document.getElementById('todo-column').innerHTML = '';

    if (todo.length !== 0) {
        for (let i = 0; i < todo.length; i++) {
            const card = todo[i];
            document.getElementById('todo-column').innerHTML += generateTodoHTML(card);
            calculateProgressBar(card);
        }
    }
    else {
        document.getElementById('todo-column').innerHTML += generateEmptyColumnHTML('To do');
    };
}


function loadProgressCards() {
    let progress = allTasks.filter(t => t['status'] == 'progress');

    document.getElementById('progress-column').innerHTML = '';

    if (progress.length !== 0) {
        for (let i = 0; i < progress.length; i++) {
            const card = progress[i];
            document.getElementById('progress-column').innerHTML += generateTodoHTML(card);
            calculateProgressBar(card);
        }
    }
    else {
        document.getElementById('progress-column').innerHTML += generateEmptyColumnHTML('in progress');
    }
}


function loadAwaitCards() {
    let feedback = allTasks.filter(t => t['status'] == 'await');

    document.getElementById('await-column').innerHTML = '';

    if (feedback.length !== 0) {
        for (let i = 0; i < feedback.length; i++) {
            const card = feedback[i];
            document.getElementById('await-column').innerHTML += generateTodoHTML(card);
            calculateProgressBar(card);
        }
    }
    else {
        document.getElementById('await-column').innerHTML += generateEmptyColumnHTML('await feedback');
    }
}


function loadDoneCards() {
    let done = allTasks.filter(t => t['status'] == 'done');

    document.getElementById('done-column').innerHTML = '';

    if (done.length !== 0) {
        for (let i = 0; i < done.length; i++) {
            const card = done[i];
            document.getElementById('done-column').innerHTML += generateTodoHTML(card);
            calculateProgressBar(card);
        }
    }
    else {
        document.getElementById('done-column').innerHTML += generateEmptyColumnHTML('done');
    }
}

async function getAllTasks() {
    loadedTasks = await getTasksArray();
    allTasks = loadedTasks;
}

function simulateClickButton(buttonId) {
    const button = document.getElementById(buttonId);
    button.click();
}

function selectDefaultPrio(buttonId) {
    simulateClickButton(buttonId);
}

function checkCategory(card) {
    let categoryHTML = '';
    if (card.category) {
        categoryHTML = `
        <div id='category-container${card['id']}' class='category-container story-container'>
            <p>User Story</p>
        </div>
        `
    }
    else {
        categoryHTML = `
        <div id='category-container${card['id']}' class='category-container technical-container'>
            <p>Technical Task</p>
        </div>
        `
    }
    return categoryHTML;
}

function setPrio(card) {
    switch (card.prio) {
        case 'Low':
            return `<img src='/assets/img/prio_small_cards_low.svg'>`
            break;
        case 'Medium':
            return `<img src='/assets/img/prio_small_cards_medium.svg'>`
            break;
        case 'Urgent':
            return `<img src='/assets/img/prio_small_cards_urgent.svg'>`
            break;
    }
}

function checkAssignedTo(card, whichCard) {
    let allContacts = card['asigntTo'];
    if (allContacts.length !== 0) {
        let initials = [];
        let colors = [];
        
        for (let i = 0; i < allContacts.length; i++) {
            let words = allContacts[i].split(' ');
            let initialsForName = '';
            let name = allContacts[i];
            let indexOfContact = assignedContactsList.findIndex(n => n.name == name);
            let curColor = assignedContactsList[indexOfContact]['color'];

            for (let j = 0; j < words.length && j < 2; j++) {
                initialsForName += words[j].charAt(0);
            }
            initials.push(initialsForName);
            colors.push(curColor);
        }

        if (whichCard == 'small-card') {
            return generateHTMLAssignedTo(initials, colors);
        }
        else if (whichCard == 'big-card') {
            return generateHTMLAssignedToBigCard(initials, card, colors);
        } 
        
    }
    else {
        return '';
    }
}

function checkCheckedSubtasks(allSubtasks) {
    let checkedSubtasks = allSubtasks.filter(t => t['checked'] == 'checked');
    let amountOfCheckedSubtasks = checkedSubtasks.length;
    return amountOfCheckedSubtasks;
}

function checkSubtasks(card, whichCard) {
    let allSubtasks = card['subTasks'];
    let amountOfCheckedSubtasks = checkCheckedSubtasks(allSubtasks);
    let amountOfSubtasks = 0;

    if (allSubtasks.length !== 0) {
        amountOfSubtasks = allSubtasks.length;

        if (whichCard == 'small-card') {
            return generateHTMLsubtasks(amountOfSubtasks, card, amountOfCheckedSubtasks);
        }
        else if (whichCard == 'big-card') {
            return generateHTMLsubtasksBig(amountOfSubtasks, card);
        }
    }
    else {
        return '';
    }
}

function calculateProgressBar(card) {
    let allSubtasks = card['subTasks'];
    let progressValue = checkCheckedSubtasks(allSubtasks);

    if (allSubtasks.length !== 0) {

        let maxProgressValue = allSubtasks.length;

        let progress = ((progressValue / maxProgressValue) * 100) * 2;

        let progressBar = document.getElementById('progress' + card['id']);
        if (progressBar) {
            progressBar.style.width = progress + "%";
        }
    }
}

function startDragging(id) {
    currentDraggedItem = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

async function moveTo(category) {
    indexOfTask = allTasks.findIndex(task => task.id === currentDraggedItem);
    let task = allTasks[indexOfTask];
    task.status = category;
    await editTasks(indexOfTask, task)
    await getAllTasks();
    loadCards();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area');
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

function renderBigCard(cardId) {
    let container = document.getElementById('big-card-container');
    let currentCard = allTasks.find(todo => todo.id === cardId);
    container.innerHTML = '';

    if (currentCard) {
        container.innerHTML = generateHTMLbigCard(currentCard);
    } else {
        console.error("Card not found");
    }
    checkCategory(currentCard);
    getAssigntContactsFromTask(cardId);
}

function checkCategoryBigCard(currentCard) {
    let categoryHTML = '';
    if (currentCard.category) {
        categoryHTML = `
        <div id='category-container${currentCard['id']}' class='big-card-category-container story-container'>
            <p>User Story</p>
        </div>
        `
    }
    else {
        categoryHTML = `
        <div id='category-container${currentCard['id']}' class='big-card-category-container technical-container'>
            <p>Technical Task</p>
        </div>
        `
    }
    return categoryHTML;
}

function showEditTask(id) {
    let container = document.getElementById('big-card-container');
    let indexOfCurTask = allTasks.findIndex(t => t.id === id);
    currentPrio = allTasks[indexOfCurTask]['prio'];

    container.innerHTML = generateHTMLEditTask(indexOfCurTask);
    if (currentPrio == 'Low') {
        selectDefaultPrio('button-low');
    } else if (currentPrio == 'Medium') {
        selectDefaultPrio('button-medium');
    } else {
        selectDefaultPrio('button-urgent');
    }
    renderSelectedContacts();
    showContactsToAssign();
}

function getAssigntContactsFromTask(cardId) {
    let indexOfCurTask = allTasks.findIndex(t => t.id == cardId);
    let card = allTasks[indexOfCurTask];
    let contacts = card['asigntTo'];

    for (let i = 0; i < contacts.length; i++) {
        const contactName = contacts[i];
        
        let indexOfContact = assignedContactsList.findIndex(c => c.name == contactName);
        let contact = assignedContactsList[indexOfContact];

        assignedContacts.push(contact);
    }
}

function resetAssignTo() {
    assignedContacts = [];
}

async function editTask(indexOfCurTask) {
    let cardId = allTasks[indexOfCurTask]['id'];
    let title = document.getElementById("input-title" + indexOfCurTask).value;
    let description = document.getElementById("input-description" + indexOfCurTask).value;
    let asigntTo = getAssigntContactsNames();
    let date = document.getElementById("input-date" + indexOfCurTask).value;
    let category = allTasks[indexOfCurTask]['category'];
    let oldSubtasks = allTasks[indexOfCurTask]['subTasks'];
    let status = allTasks[indexOfCurTask]['status'];
    let prio = currentPrio;

    for (let i = 0; i < oldSubtasks.length; i++) {
        const subtask = oldSubtasks[i];
        currentSubtasks.push(subtask);
    }

    let task = creatTask(asigntTo, category, date, description, prio, status, currentSubtasks, title);
    task['id'] = cardId;
    await editTasks(indexOfCurTask, task);
    await getAllTasks();
    loadCards();
    resetForm();
    renderBigCard(cardId);
}

function renderEditBigCardSubtasks(cardId) {
    let indexOfCurTask = allTasks.findIndex(t => t.id === cardId);
    let subtasks = allTasks[indexOfCurTask];
    let container = document.getElementById('subtasks-popup-section' + indexOfCurTask);
    container.innerHTML = '';

    for (let i = 0; i < subtasks['subTasks'].length; i++) {
        const subtask = subtasks['subTasks'][i];

        container.innerHTML += generateHTMLsubtasksEdit(subtask, cardId);
    }
}

function editSubtaskBigCard(subtaskTitle, id, cardId) {
    // Finde den Container
    const container = document.getElementById(`subtask-popup-edit-container${id}`);
  
    // Generiere den HTML-Code für den Subtask
    const subtaskHTML = generateSubtaskEditBigCardHTML(subtaskTitle, id, cardId);
  
    // Füge den generierten HTML-Code dem Container hinzu
    container.innerHTML = subtaskHTML;
}

async function saveChangedSubtaskInEditor(id, cardId) {
    let indexOfCurTask = allTasks.findIndex(t => t.id == cardId);
    let indexOfCurSubTask = allTasks[indexOfCurTask]['subTasks'].findIndex(s => s.id == id);
    let newTitle = document.getElementById('subtaskInput'+id).value;
    let subtask = creatSubTask(newTitle, checked = "unchecked");

    await editSubTasks(indexOfCurTask, indexOfCurSubTask, subtask);
    await getAllTasks();
    renderEditBigCardSubtasks(cardId);
}

async function addSubtaskInEditor(indexOfCurTask) {
    let cardId = allTasks[indexOfCurTask]['id'];
    let subtitle = document.getElementById('subtasks-input'+indexOfCurTask).value;
    let subtask = creatSubTask(subtitle, checked = "unchecked");

    await addSubTasks(indexOfCurTask, subtask);
    await getAllTasks();
    renderEditBigCardSubtasks(cardId);
}

async function deleteEditSubtask(SubtaskId, cardId) {
    let indexOfCurTask = allTasks.findIndex(t => t.id == cardId);
    let indexOfCurSubTask = allTasks[indexOfCurTask]['subTasks'].findIndex(s => s.id == SubtaskId);

    await deleteSubTasks(indexOfCurTask, indexOfCurSubTask);
    await getAllTasks();
    renderEditBigCardSubtasks(cardId);
}

function changeBigCardContainer(parameter) {
    if (parameter === 'edit') {
        document.getElementById('big-card-container').classList.add('big-card-edit');
        document.getElementById('big-card-container').classList.remove('big-card-container');
    }
    else {
        document.getElementById('big-card-container').classList.remove('big-card-edit');
        document.getElementById('big-card-container').classList.add('big-card-container');
    }
}

async function deleteTask(id) {
    let indexOfTask = allTasks.findIndex(t => t.id === id);
    await deleteTasks(indexOfTask);
    allTasks = await getTasksArray();
    loadCards();
    showMovableContainer('remove', 'bigCard');
}

async function saveCheckedSubtask(cardId, subtaskIndex, subtaskName) {
    let indexOfTask = allTasks.findIndex(task => task.id === cardId);
    let SubtaskStatus = allTasks[indexOfTask]['subTasks'][subtaskIndex]['checked'];
    let newSubtaskStatus = '';

    if (SubtaskStatus === 'unchecked') {
        newSubtaskStatus = 'checked';
    }
    else {
        newSubtaskStatus = 'unchecked';
    }

    let changedSubtask = creatSubTask(subtaskName, newSubtaskStatus);
    await editSubTasks(indexOfTask, subtaskIndex, changedSubtask);
    await getAllTasks();
    loadCards();
}

function getCurrentStatus(state) {
    currentStatus = state;
}

async function taskSearch() {
    let inputfield = document.getElementById('search-input').value;
    let input = inputfield.trim().toLowerCase();
    filteredTasks = [];
    allTasks = loadedTasks;

    if (input.length >= 0) {
        checkTasks(input, filteredTasks);
    }
    else if (input.length == 0) {
        loadCards();
    }
}

function checkTasks(filter, filteredTasks) {
    for (let i = 0; i < allTasks.length; i++) {
        const curTask = allTasks[i];
        const title = curTask['title'].toLowerCase();
        const description = curTask['description'].toLowerCase();

        if (title.includes(filter) || description.includes(filter)) {
            filteredTasks.push(curTask)
        }
    }
    allTasks = filteredTasks;
    loadCards();

    if (allTasks.length === 0) {
        noTasksPopup.style.display = 'block';
    } else {
        noTasksPopup.style.display = 'none';
    }
}

function createShortDescription(cardId) {
    let indexOfCurTask = allTasks.findIndex(t => t.id == cardId);
    let description = allTasks[indexOfCurTask]['description'];
    let maxLength = 50;

    if (description.length <= maxLength) {
        return description + '...';
    } else {
        let shortTxt = description.substr(0, maxLength);
        let lastSpaceIndex = shortTxt.lastIndexOf(' ');

        if (lastSpaceIndex > 0) {
            shortTxt = shortTxt.substr(0, lastSpaceIndex);
        }

        return shortTxt + '...';
    }
}

