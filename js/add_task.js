let maxId = 0;
let currentPrio = 'Medium';
let currentStatus;

function addTask() {
    let title = document.getElementById('input-title');
    let description = document.getElementById('input-description');
    let asigntTo = document.getElementById('input-asignTo');
    let date = document.getElementById('input-date');
    let categoryTxt = document.getElementById('input-category').value;
    let category;
    let prio = currentPrio;
    let status = currentStatus;
    maxId++
    
    if (categoryTxt == 'User Story') {
        category = true;
    }
    else {
        category = false;
    }

    let task = {
        "asigntTo": [asigntTo.value],
        "category":category,
        "checkedSubtasks": 0,
        "date":date.value,
        "description": description.value,
        "id": maxId,
        "prio": prio,
        "status":status,
        "subTasks":['test', 'test2'],
        "title": title.value
    }

    tasks.push(task);
    loadCards();
    resetForm();

    console.log(tasks);
}


function resetForm() {
    let title = document.getElementById('input-title').value = '';
    let description = document.getElementById('input-description').value = '';
    let asigntTo = document.getElementById('input-asignTo').value = '';
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