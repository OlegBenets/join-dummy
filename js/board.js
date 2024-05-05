let todos = [
    {
        'id': 0,
        'title': 'Kochwelt Page & Recipe Recommender',
        'description': 'Build start page with recipe recommendation',
        'assigned_to': 'Anna',
        'date': 'test',
        'prio': 'medium',
        'category': 'Technical Task',
        'subtasks': [],
        'amountOfSubtasks': 0,
        'checkedSubtasks': 0,
        'column': 'todo'
    },
    {
        'id': 1,
        'title': 'progress title',
        'description': 'test',
        'assigned_to': 'Anna',
        'date': 'test',
        'prio': 'medium',
        'category': 'User Story',
        'subtasks': ['test', 'test2', 'test3'],
        'amountOfSubtasks': 0,
        'checkedSubtasks': 1,
        'column': 'progress'
    },
    {
        'id': 2,
        'title': 'progress title',
        'description': 'test',
        'assigned_to': 'Anna',
        'date': 'test',
        'prio': 'medium',
        'category': 'User Story',
        'subtasks': ['test', 'test2'],
        'amountOfSubtasks': 0,
        'checkedSubtasks': 1,
        'column': 'await'
    },
    {
        'id': 3,
        'title': 'progress title',
        'description': 'test',
        'assigned_to': 'Anna',
        'date': 'test',
        'prio': 'medium',
        'category': 'User Story',
        'subtasks': ['test', 'test2'],
        'amountOfSubtasks': 0,
        'checkedSubtasks': 1,
        'column': 'progress'
    },
    {
        'id': 4,
        'title': 'progress title',
        'description': 'test',
        'assigned_to': 'Anna',
        'date': 'test',
        'prio': 'medium',
        'category': 'User Story',
        'subtasks': ['test', 'test2'],
        'amountOfSubtasks': 0,
        'checkedSubtasks': 1,
        'column': 'done'
    },
    {
        'id': 5,
        'title': 'progress title',
        'description': 'test',
        'assigned_to': 'Anna',
        'date': 'test',
        'prio': 'medium',
        'category': 'User Story',
        'subtasks': ['test', 'test2'],
        'amountOfSubtasks': 0,
        'checkedSubtasks': 1,
        'column': 'done'
    },
    {
        'id': 6,
        'title': 'progress title',
        'description': 'test',
        'assigned_to': 'Anna',
        'date': 'test',
        'prio': 'medium',
        'category': 'User Story',
        'subtasks': ['test', 'test2'],
        'amountOfSubtasks': 0,
        'checkedSubtasks': 1,
        'column': 'done'
    },
    {
        'id': 7,
        'title': 'progress title',
        'description': 'test',
        'assigned_to': 'Anna',
        'date': 'test',
        'prio': 'medium',
        'category': 'User Story',
        'subtasks': ['test', 'test2'],
        'amountOfSubtasks': 0,
        'checkedSubtasks': 2,
        'column': 'todo'
    },

]

let currentDraggedItem;

function loadCards() {
    let todo = todos.filter(t => t['column'] == 'todo');

    document.getElementById('todo-column').innerHTML = '';
    for (let i = 0; i < todo.length; i++) {
        const card = todo[i];
        document.getElementById('todo-column').innerHTML += generateTodoHTML(card);
        calculateProgressBar(card);
    }


    let progress = todos.filter(t => t['column'] == 'progress');
    
    document.getElementById('progress-column').innerHTML = '';

    for (let i = 0; i < progress.length; i++) {
        const card = progress[i];
        document.getElementById('progress-column').innerHTML += generateTodoHTML(card);
        calculateProgressBar(card);
    }

    let await = todos.filter(t => t['column'] == 'await');
    
    document.getElementById('await-column').innerHTML = '';

    for (let i = 0; i < await.length; i++) {
        const card = await[i];
        document.getElementById('await-column').innerHTML += generateTodoHTML(card);
        calculateProgressBar(card);
    }

    let done = todos.filter(t => t['column'] == 'done');
    
    document.getElementById('done-column').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const card = done[i];
        document.getElementById('done-column').innerHTML += generateTodoHTML(card);
        calculateProgressBar(card);
    }
}

function generateTodoHTML(card) {
    return `
    <div draggable='true' ondragstart='startDragging(${card['id']})' class='small-card-container'>
        <div class='category-container'>
            <p>${card['category']}</p>
        </div>
        <div class='small-card-text-container'>
            <p class='small-card-title'>${card['title']}</p>
            <p class='small-card-description'>${card['description']}</p>
            ${checkSubtasks(card)}
        </div>
    </div>
    `;
}


function checkSubtasks(card) {
    let allSubtasks = card['subtasks'];
    let amount = 0;

    if (allSubtasks.length !== 0) {
        amount = allSubtasks.length;
        card['amountOfSubtasks'] = amount;
        return generateHTMLsubtasks(amount, card);
    }
    else {
        return '';
    }
}


function generateHTMLsubtasks(amount, card) {
    return `
        <div class='progress-container'>
            <div class="progress-bar">
                <div id='progress${card['id']}' class="progress"></div>
            </div>
            <div class='progress-txt-container'>
                <p>${card['checkedSubtasks']}/${amount} Subtasks</p>
            </div>
        </div> 
    `
}


function calculateProgressBar(card) {
    let progressValue = card['checkedSubtasks'];
    let maxProgressValue = card['amountOfSubtasks'];

    let progress = ((progressValue / maxProgressValue) * 100) *2;

    let progressBar = document.getElementById('progress' + card['id']);
    if (progressBar) {
        progressBar.style.width = progress + "%";
    }
}


function startDragging(id) {
    currentDraggedItem = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}


function moveTo(category) {
    todos[currentDraggedItem]['column'] = category;
    loadCards();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area');
}