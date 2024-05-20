let currentDraggedItem;
let allTasks = [];
let filterdtasks = [];
let loadedTasks = [];
let currentContactColor = 'black';
let allContactsExist = [];


async function init() {
    await loadAllData();
    await getAllTasks();
    await initPage();
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


function generateEmptyColumnHTML(column) {
    return `
        <div class='empty-column-container'>
            <span>No tasks ${column}</span>
        </div>
    `
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


function generateTodoHTML(card) {
    return `
    <div onclick="showMovableContainer('show', 'bigCard'); renderBigCard(${card['id']});" draggable='true' ondragstart='startDragging(${card['id']})' class='small-card-container'>
        ${checkCategory(card)}
        <div class='small-card-text-container'>
            <p class='small-card-title'>${card['title']}</p>
            <p class='small-card-description'>${card['description']}</p>
            ${checkSubtasks(card, 'small-card')}
            <div class='contacts-prio-container'>
                <div class='contacts-order'>
                    ${checkAssignedTo(card, 'small-card')}
                </div>
                ${setPrio(card)}
            </div>
        </div>
    </div>
    `;
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

function generateHTMLAssignedTo(initialsArray, colors) {
    let circlesHTML = '';

    for (let i = 0; i < initialsArray.length; i++) {
        circlesHTML += `
            <div class='circle' style='background-color: #${colors[i]};'>
                <div class='initials'>${initialsArray[i]}</div>
            </div>
        `;
    }

    return circlesHTML;
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


function generateHTMLsubtasks(amountOfSubtasks, card, amountOfCheckedSubtasks) {
    return `
        <div class='progress-container'>
            <div class='popup-progressbar'>${amountOfCheckedSubtasks} von ${amountOfSubtasks} Subtasks erledigt!</div>
            <div class="progress-bar">
                <div id='progress${card['id']}' class="progress"></div>
            </div>
            <div class='progress-txt-container'>
                <p id='subtasks-amount${card['id']}'>${amountOfCheckedSubtasks}/${amountOfSubtasks} Subtasks</p>
            </div>
        </div> 
    `
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


function generateHTMLbigCard(currentCard) {
    return `
    <div class='space-between'>
            ${checkCategoryBigCard(currentCard)}
        <div onclick="showMovableContainer('remove', 'bigCard'), changeBigCardContainer()" class='close-img-container'>
            <img src='/assets/img/close.svg'>
        </div>
    </div>
    <p class='big-card-title'>${currentCard['title']}</p>
    <p class='big-card-description'>${currentCard['description']}</p>
    <div class='big-card-date-container'>
        <p class='big-card-data-txt'>Due date:</p>
        <p class='big-card-data'>${currentCard['date']}</p>
    </div>
    <div class='big-card-prio-container'>
        <p class='big-card-data-txt'>Priority:</p>
        <div class='big-card-prio'>
            <p class='big-card-data'>${currentCard['prio']}</p>
            ${setPrio(currentCard)}
        </div>
    </div>
    <div class='big-card-assigned-container'>
        <p class='big-card-data-txt'>Assigned To:</p>
        <div>
            <div class='big-card-assigned-names'>
                ${checkAssignedTo(currentCard, 'big-card')}
            </div>
        </div>
    </div>
    <div class='big-card-subtasks-container'>
        <p class='big-card-data-txt'>Subtasks</p>
        <div>
            <div class='big-card-subtasks'>
                ${checkSubtasks(currentCard, 'big-card')}
            </div>
        </div>
    </div>
    <div class='flex-end'>
        <div class='delete-edit-container'>
            <div onclick='deleteTask(${currentCard['id']})' class='delete-container'>
                <div class='delete-img'>
                    <div class='delete-icon'></div>
                </div>
                <p class='delete-txt'>Delete</p>
            </div>
            <div class='seperator-delete'></div>
            <div onclick="showEditTask(${currentCard['id']}); changeBigCardContainer('edit'); renderEditBigCardSubtasks(${currentCard['id']})" class='edit-container'>
                <div class='edit-img'>
                    <div class='edit-icon'></div>
                </div>
                <p class='edit-txt'>Edit</p>
            </div>
        </div>
    </div>
    `
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
}

function generateHTMLEditTask(indexOfCurTask) {
    return `
    <div class='input-edit-cross'>
        <div onclick="showMovableContainer('remove', 'bigCard'); changeBigCardContainer(); resetForm()" class='close-img-container'>
            <img src='/assets/img/close.svg'>
        </div>
    </div>
    <div class='edit-content'>
        <div class='input-title-section'>
            <p>Title</p>
            <div class='input-title-field-section'>
                <input id='input-title${indexOfCurTask}' type='text' class='input-title-field' value='${tasks[indexOfCurTask]['title']}'>
                
            </div>
        </div>
        <div class='input-description-section'>
            <p class='input-txt'>Description</p>
            <div>
                <textarea id='input-description${indexOfCurTask}' class='input-title-field edit-textarea'>${tasks[indexOfCurTask]['description']}</textarea>
            </div>
        </div>
        <div class='input-date-section'>
            <p class='input-txt'>Due Date</p>
            <div>
                <input id='input-date${indexOfCurTask}' type='date' class='input-title-field' value='${tasks[indexOfCurTask]['date']}'>
            </div>
        </div>
        <div class='input-prio-section'>
            <p class='input-txt'>Priority</p>
            <div>
            <div class="prio-container">
            <button class="button-prio" id="button-urgent" type="button" onclick="getPrio('Urgent')">
              Urgent<img id="img-urgent" src="/assets/img/urgent.svg" />
            </button>
            <button class="button-prio" id="button-medium" type="button" onclick="getPrio('Medium')">
              Medium<img id="img-medium" src="/assets/img/medium.svg" />
            </button>
            <button class="button-prio" id="button-low" type="button" onclick="getPrio('Low')">
              Low<img id="img-low" src="/assets/img/low.svg" />
            </button>
          </div>
            </div>
        </div>
        <span class="task-description-span">Assigned to</span>
          <div onclick="showContactsToAssign()" class="add-task-input-container mb">
            <input onkeydown="searchContact()" placeholder="Select contacts to assign" class="contacts-assign" id="input-assignTo">
            <img src="/assets/img/arrow_drop_down.svg">
          </div>
          <div class="drop-down-contacts">
            <div id="selected-contacts"></div>
            <div class="contacts-list" id="contacts-list"></div>
          </div>
        <span class="task-deadline-span">Subtasks</span>
          <div class="add-task-input-container margin-bottom-0">
            <input oninput="checkInput('', ${indexOfCurTask})" class="subtask-input" type="text" placeholder="Add new subtask"
              id="subtasks-input${indexOfCurTask}" />
            <img id="subtasks-popup-empty-img${indexOfCurTask}" src="/assets/img/add.svg" />
            <div id="subtasks-popup-full-img${indexOfCurTask}" class="subtasks-popup-full-container">
              <div onclick="clearSubtaskInput('', ${indexOfCurTask}), checkInput('', ${indexOfCurTask})" class="subtask-popup-img-container">
                <img src="/assets/img/cancel.svg" alt="cross-img">
              </div>
              <div class="subtasks-popup-seperator"></div>
              <div onclick="addSubtaskInEditor(${indexOfCurTask}), clearSubtaskInput('', ${indexOfCurTask}), checkInput('', ${indexOfCurTask})" class="subtask-popup-img-container">
                <img src="/assets/img/check-subtask.svg" alt="check-img">
              </div>
            </div>
          </div>
          <div class="subtasks-popup-section" id="subtasks-popup-section${indexOfCurTask}">
            
          </div>
    </div>
    <div onclick='editTask(${indexOfCurTask}), changeBigCardContainer()' class='edit-task-btn-container'>
        <button class='button_full ctask'>
                <div>
                    OK
                </div>
        </button>
    </div>
    `
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

function generateHTMLsubtasksEdit(subtask, cardId) {
    return `
    <div class='subtask-popup-edit-container' id='subtask-popup-edit-container${subtask["id"]}'>
        <ul class='subtask-popup-ul-container'>
            <li>
                ${subtask["subtitle"]}  
            </li>
            <div class='subtasks-edit-delete-container'>
                <div class='subtasks-edit-container' onclick="editSubtaskBigCard('${subtask["subtitle"]}', '${subtask["id"]}', ${cardId})">
                    <img src='/assets/img/edit_normal.svg'>
                </div>
                <div class='subtasks-seperator'></div>
                <div onclick="deleteEditSubtask('${subtask["id"]}', ${cardId})" class='subtasks-delete-container'>
                    <img src='/assets/img/delete.svg'>
                </div>
            </div>
        </ul>
    </div>
    `
}

function editSubtaskBigCard(subtaskTitle, id, cardId) {
    // Finde den Container
    const container = document.getElementById(`subtask-popup-edit-container${id}`);
  
    // Generiere den HTML-Code für den Subtask
    const subtaskHTML = generateSubtaskEditBigCardHTML(subtaskTitle, id, cardId);
  
    // Füge den generierten HTML-Code dem Container hinzu
    container.innerHTML = subtaskHTML;
}
  
  function generateSubtaskEditBigCardHTML(subtaskTitle, id, cardId) {
    console.log(subtaskTitle);
    return `
      <div class="subtask-popup-edit-container" id="subtask-popup-edit-container${id}">
          <div class='display-flex'>
              <input id='subtaskInput${id}' type="text" value="${subtaskTitle}" class="subtask-edit-input">
              <div class='subtasks-edit-delete-container'>
                  <div onclick="deleteEditSubtask('${subtaskTitle}', ${cardId})" class='subtasks-delete-container margin-right-0'>
                      <img src='/assets/img/delete.svg'>
                  </div>
                  <div class='subtasks-seperator'></div>
                  <div onclick='saveChangedSubtaskInEditor(${id}, ${cardId})' class="subtasks-edit-container">
                      <img src="/assets/img/check-subtask.svg">
                  </div>
              </div>
          </div>
          <div class="subtask-edit-underline"></div>
      </div>`;
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
    console.log(subtitle);

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


function generateHTMLAssignedToBigCard(initialsArray, card, colors) {
    let circlesHTML = '';

    for (let i = 0; i < initialsArray.length; i++) {
        circlesHTML += `
        <div class='big-card-one-assign'>
            <div class='circle-big-card' style='background-color: #${colors[i]};'>
                <div class='initials'>${initialsArray[i]}</div>
            </div>
            <div class='assigned-to-txt'>${card['asigntTo'][i]}</div>
        </div>
        `;
    }
    return circlesHTML;
}

function generateHTMLsubtasksBig(amountOfSubtasks, card) {
    let subtasksHTML = '';

    for (let i = 0; i < amountOfSubtasks; i++) {
        const subtask = card['subTasks'][i];
        let checked = subtask['checked'];

        subtasksHTML += `
        <div class='big-card-one-subtask'>
            <input type='checkbox' id="myCheckbox${i}" onclick="saveCheckedSubtask(${card['id']}, ${i}, '${subtask['subtitle']}')" ${checked}>
            <label for="myCheckbox${i}" class="checkbox-label">
                <img src="/assets/img/checkbox_unselected.svg" class="checkbox-img unchecked">
                <img src="/assets/img/checkbox_selected.svg" class="checkbox-img checked">
            </label>
            <div class='subtasks-txt'>${subtask['subtitle']}</div>
        </div>
    `
    }

    return subtasksHTML;
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

        if (curTask['title'].includes(filter) || curTask['description'].includes(filter)) {
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

function simulateClickButton(buttonId) {
    const button = document.getElementById(buttonId);
    button.click();
}

function selectDefaultPrio(buttonId) {
    simulateClickButton(buttonId);
}