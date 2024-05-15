let maxId = 0;
let currentPrio = 'Medium';
let currentStatus;

function addTask() {
    let title = document.getElementById('input-title').value;
    let description = document.getElementById('input-description').value;
    let asigntTo = document.getElementById('input-asignTo').value;
    let date = document.getElementById('input-date').value;
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

    let task = creatTask([asigntTo], category, 1, date, description, prio, status, ['test1', 'test2'], title);

    tasks.push(task);
    loadCards();
    resetForm();
    showAddTaskConfirmation();
    console.log(tasks);
    console.log(typeof(task['id']));
    
    

    // let task = {
    //     "asigntTo": [asigntTo.value],
    //     "category":category,
    //     "checkedSubtasks": 0,
    //     "date":date.value,
    //     "description": description.value,
    //     "id": maxId,
    //     "prio": prio,
    //     "status":status,
    //     "subTasks":['test', 'test2'],
    //     "title": title.value
    // }

    // tasks.push(task);
    // loadCards();
    // resetForm();

    // console.log(tasks);
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