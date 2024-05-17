let currentPrio = 'Medium';
let currentStatus;
let currentSubtasks = [];

async function addTask() {
    let title = document.getElementById('input-title').value;
    let description = document.getElementById('input-description').value;
    let asigntTo = document.getElementById('input-assignTo').value;
    let date = document.getElementById('input-date').value;
    let categoryTxt = document.getElementById('input-category').value;
    let category;
    let prio = currentPrio;
    let status = currentStatus;

    if (categoryTxt == 'User Story') {
        category = true;
    }
    else {
        category = false;
    }

    // testTask();
    let task = creatTask([asigntTo], category, date, description, prio, status, currentSubtasks, title);
    await addTasks(task);
    await getAllTasks();
    loadCards();
    resetForm();
    showAddTaskConfirmation();
}

function showAddTaskConfirmation() {
    let confirmation = document.getElementById('add-task-confirmation-background');

    confirmation.style.display = 'flex';

    setTimeout(function() {
        confirmation.style.display = 'none';
        showMovableContainer('remove', 'addTask');
    }, 1000);
}


function resetForm() {
    let title = document.getElementById('input-title').value = '';
    let description = document.getElementById('input-description').value = '';
    let asigntTo = document.getElementById('input-assignTo').value = '';
    let date = document.getElementById('input-date').value = '';
    let categoryTxt = document.getElementById('input-category').value = '';
    currentSubtasks = [];
    document.getElementById('subtasks-popup-section').innerHTML = '';
}

function getPrio(prio) {
    if (prio == 'Low') {
        currentPrio = 'Low';
    }
    else if (prio == 'Medium') {
        currentPrio = 'Medium';
    }
    else if (prio == 'Urgent') {
        currentPrio = 'Urgent';
    }
}

function addSubtaskToPopup(parameter, index) {
    let subtitle;
    if (parameter === 'addTask') {
        subtitle = document.getElementById('subtasks-input').value;
    } 
    else {
        subtitle = document.getElementById('subtasks-input'+index).value;
    }

    let subtask = creatSubTask(subtitle, checked = "unchecked");

    currentSubtasks.push(subtask);
    renderSubtasksInPopup(parameter, index);
}

function renderSubtasksInPopup(parameter, index) {
    let container;
    if (parameter === 'addTask') {
        container = document.getElementById('subtasks-popup-section');
        container.innerHTML = '';
    }
    else {
        container = document.getElementById('subtasks-popup-section'+index);
    }
    

    for (let i = 0; i < currentSubtasks.length; i++) {
        const subtask = currentSubtasks[i];
        
        container.innerHTML += generateHTMLsubtasksPopup(subtask);
    }
}

function generateHTMLsubtasksPopup(subtask) {
    return `
    <ul class='subtask-popup-ul-container'>
        <li class='subtasks-popup-li'>${subtask['subtitle']}</li>
    </ul>
    `
}

function clearSubtaskInput(parameter, index) {
    if (parameter === 'addTask') {
        document.getElementById('subtasks-input').value = '';
    }
    else {
        document.getElementById('subtasks-input'+index).value = '';
    }
    
    
}

function checkInput(parameter, index) {
    let inputField;
    let emptyInputImg;
    let fullInputImgs;
    if (parameter === 'addTask') {
        inputField = document.getElementById('subtasks-input');
        emptyInputImg = document.getElementById('subtasks-popup-empty-img');
        fullInputImgs = document.getElementById('subtasks-popup-full-img');
    }
    else {
        inputField = document.getElementById('subtasks-input'+index);
        emptyInputImg = document.getElementById('subtasks-popup-empty-img'+index);
        fullInputImgs = document.getElementById('subtasks-popup-full-img'+index);
    }

    if (inputField.value.trim() !== '') {
        emptyInputImg.classList.add('display-none');
        fullInputImgs.style.display = 'flex';
    } else {
        emptyInputImg.classList.remove('display-none');
        fullInputImgs.style.display = 'none';
    }
}

function setFocusedBorder(element) {
    element.classList.add('focused');
}

function setErrorBorder(elements) {
        elements.classList.add('error');
}

function removeErrorBorder(elements) {
        elements.classList.remove('error');
}

//Set focused or error border for inputs

function testTask() {
    const titleInput = document.getElementById('input-title');
    const dateInput = document.getElementById('input-date');
    let titleError = document.getElementById('title-error');
    let dateError = document.getElementById('date-error');

    let isTitleValid = titleInput.value.trim() !== '';
    let isDateValid = dateInput.value.trim() !== '';

    // Validierung für den Titel
    if (!isTitleValid) {
        setErrorBorder(titleInput.parentElement);
        titleError.querySelector('.error-text').style.display = 'block';
    } else {
        removeErrorBorder(titleInput.parentElement);
        titleError.querySelector('.error-text').style.display = 'none';
    }

    // Validierung für das Datum
    if (!isDateValid) {
        setErrorBorder(dateInput.parentElement);
        dateError.querySelector('.error-text').style.display = 'block';
    } else {
        removeErrorBorder(dateInput.parentElement);
        dateError.querySelector('.error-text').style.display = 'none';
    }

    // Überprüfen, ob beide Felder gültig sind
    if (isTitleValid && isDateValid) {
        console.log("Aufgabe erfolgreich erstellt!");
    } else {
        console.log("Bitte füllen Sie die erforderlichen Felder aus.");
    }
}

function clickInputContainer() {
    const inputs = document.querySelectorAll('.add-task-input-container');

    inputs.forEach(inputContainer => {
        inputContainer.onclick = function() {
            handleInputContainerClick(inputContainer);
        };

        inputContainer.onblur = function() {
            handleInputContainerBlur(inputContainer);
        };
    });
}

function handleInputContainerClick(clickedInputContainer) {
    const inputs = document.querySelectorAll('.add-task-input-container');
    
    inputs.forEach(container => {
        container.classList.remove('focused');
    });
    
    clickedInputContainer.classList.add('focused');
}

function handleInputContainerBlur(blurInputContainer) {
    blurInputContainer.classList.remove('focused');
}

document.addEventListener("DOMContentLoaded", clickInputContainer);


