let todos = [
    {
        'id': 0,
        'title': 'Kochwelt Page & Recipe Recommender',
        'description': 'Build start page with recipe recommendation',
        'assigned_to': 'Anna',
        'date': 'test',
        'prio': 'medium',
        'category': 'Technical Task',
        'subtasks': 'test',
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
        'subtasks': 'test',
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
        'subtasks': 'test',
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
        'subtasks': 'test',
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
        'subtasks': 'test',
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
        'subtasks': 'test',
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
        'subtasks': 'test',
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
        'subtasks': 'test',
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
    }


    let progress = todos.filter(t => t['column'] == 'progress');
    
    document.getElementById('progress-column').innerHTML = '';

    for (let i = 0; i < progress.length; i++) {
        const card = progress[i];
        document.getElementById('progress-column').innerHTML += generateTodoHTML(card);
    }

    let await = todos.filter(t => t['column'] == 'await');
    
    document.getElementById('await-column').innerHTML = '';

    for (let i = 0; i < await.length; i++) {
        const card = await[i];
        document.getElementById('await-column').innerHTML += generateTodoHTML(card);
    }

    let done = todos.filter(t => t['column'] == 'done');
    
    document.getElementById('done-column').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const card = done[i];
        document.getElementById('done-column').innerHTML += generateTodoHTML(card);
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
        </div>
    </div>
    `;
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