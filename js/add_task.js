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

    let task = creatTask([asigntTo], category, 1, date, description, prio, status, ['test1', 'test2'], title);
    await addTasks(task);
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