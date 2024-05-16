let currentPrio = 'Medium';
let currentStatus;

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

    testTask();
    let task = creatTask([asigntTo], category, 1, date, description, prio, status, ['test1', 'test2'], title);
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