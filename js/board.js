let todos = [
    {
        'id': 0,
        'title': 'Kochwelt Page & Recipe Recommender',
        'description': 'Build start page with recipe recommendation',
        'assigned_to': ['Anna Peters', 'Jens Rauer'],
        'date': '10/05/2023',
        'prio': 'low',
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
        'assigned_to': [],
        'date': '10/05/2023',
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
        'assigned_to': ['Birgit Brauer', 'Bernd Brot', 'Willi Gold'],
        'date': '10/05/2023',
        'prio': 'urgent',
        'category': 'Technical Task',
        'subtasks': ['test', 'test2'],
        'amountOfSubtasks': 0,
        'checkedSubtasks': 1,
        'column': 'await'
    },
    {
        'id': 3,
        'title': 'progress title',
        'description': 'test',
        'assigned_to': ['Patrick Batke', 'Sascha Siegert'],
        'date': '10/05/2023',
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
        'assigned_to': ['Harald Nalle'],
        'date': '10/05/2023',
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
        'assigned_to': ['Susie Kalle'],
        'date': '10/05/2023',
        'prio': 'medium',
        'category': 'Technical Task',
        'subtasks': ['test', 'test2'],
        'amountOfSubtasks': 0,
        'checkedSubtasks': 1,
        'column': 'done'
    },
    {
        'id': 6,
        'title': 'progress title',
        'description': 'test',
        'assigned_to': ['Jasmin Lauer'],
        'date': '10/05/2023',
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
        'assigned_to': ['Kalle Uso', 'Regina Test', 'Paul Berger'],
        'date': '10/05/2023',
        'prio': 'medium',
        'category': 'Technical Task',
        'subtasks': ['test', 'test2'],
        'amountOfSubtasks': 0,
        'checkedSubtasks': 2,
        'column': 'todo'
    },

]

let currentDraggedItem;

function loadCards() {
    loadTodoCards();
    loadProgressCards();
    loadAwaitCards();
    loadDoneCards();
}

function loadTodoCards() {
    let todo = todos.filter(t => t['column'] == 'todo');

    document.getElementById('todo-column').innerHTML = '';

    if (todo.length !== 0) {
        for (let i = 0; i < todo.length; i++) {
            const card = todo[i];
            document.getElementById('todo-column').innerHTML += generateTodoHTML(card);
            calculateProgressBar(card);
            checkPriority(card);
            loadCategoryColor(card);
        }
    }
    else {
        document.getElementById('todo-column').innerHTML += generateEmptyColumnHTML('To do');
    }
}


function loadProgressCards() {
    let progress = todos.filter(t => t['column'] == 'progress');
    
    document.getElementById('progress-column').innerHTML = '';

    if (progress.length !== 0) {
        for (let i = 0; i < progress.length; i++) {
            const card = progress[i];
            document.getElementById('progress-column').innerHTML += generateTodoHTML(card);
            calculateProgressBar(card);
            checkPriority(card);
            loadCategoryColor(card);
        }
    }
    else {
        document.getElementById('progress-column').innerHTML += generateEmptyColumnHTML('in progress');
    }
}


function loadAwaitCards() {
    let await = todos.filter(t => t['column'] == 'await');
    
    document.getElementById('await-column').innerHTML = '';

    if (await.length !== 0) {
        for (let i = 0; i < await.length; i++) {
            const card = await[i];
            document.getElementById('await-column').innerHTML += generateTodoHTML(card);
            calculateProgressBar(card);
            checkPriority(card);
            loadCategoryColor(card);
        }
    }
    else {
        document.getElementById('await-column').innerHTML += generateEmptyColumnHTML('await feedback');
    }
}


function loadDoneCards() {
    let done = todos.filter(t => t['column'] == 'done');
    
    document.getElementById('done-column').innerHTML = '';

    if (done.length !== 0) {
        for (let i = 0; i < done.length; i++) {
            const card = done[i];
            document.getElementById('done-column').innerHTML += generateTodoHTML(card);
            calculateProgressBar(card);
            checkPriority(card);
            loadCategoryColor(card);
        }
    }
    else {
        document.getElementById('done-column').innerHTML += generateEmptyColumnHTML('done');
    }
}


function generateEmptyColumnHTML(column) {
    return `
        <div class='empty-column-container'>
            <span>No tasks ${column}</span>
        </div>
    `
}


function generateTodoHTML(card) {
    return `
    <div onclick="showMovableContainer('show', 'bigCard'); renderBigCard(${card['id']});" draggable='true' ondragstart='startDragging(${card['id']})' class='small-card-container'>
        <div id='category-container${card['id']}' class='category-container'>
            <p>${card['category']}</p>
        </div>
        <div class='small-card-text-container'>
            <p class='small-card-title'>${card['title']}</p>
            <p class='small-card-description'>${card['description']}</p>
            ${checkSubtasks(card)}
            <div class='contacts-prio-container'>
                <div class='contacts-order'>
                    ${checkAssignedTo(card, 'small-card')}
                </div>
                <img id='prio${card['id']}' src=''>
            </div>
        </div>
    </div>
    `;
}


function loadCategoryColor(card) {
    let currentCategory = card['category'];

    if (currentCategory === 'User Story') {
        document.getElementById('category-container' + card['id']).style.backgroundColor = 'var(--color_7)';
    } 
    else {
        document.getElementById('category-container' + card['id']).style.backgroundColor = 'var(--color_10)';
    }
}


function checkPriority(card) {
    let currentPrio = card['prio'];
    let prioContainer = document.getElementById('prio' + card['id']);

    if (currentPrio === 'low') {
        prioContainer.src = '/assets/img/prio_small_cards_low.svg';
    }
    else if (currentPrio === 'medium') {
        prioContainer.src = '/assets/img/prio_small_cards_medium.svg';
    }
    else {
        prioContainer.src = '/assets/img/prio_small_cards_urgent.svg';
    }
}


function checkAssignedTo(card, whichCard) {
    let allContacts = card['assigned_to'];

    if (allContacts.length !== 0) {
        let initials = [];
        for (let i = 0; i < allContacts.length; i++) {
            let words = allContacts[i].split(' ');
            let initialsForName = '';
        
            for (let j = 0; j < words.length && j < 2; j++) {
                initialsForName += words[j].charAt(0);
            }
            initials.push(initialsForName);
            
        }

        if (whichCard == 'small-card') {
            return generateHTMLAssignedTo(initials);
        }
        else if(whichCard == 'big-card') {
            return generateHTMLAssignedToBigCard(initials);
        }
        
    }
    else {
        return '';
    }
}

function generateHTMLAssignedTo(initialsArray) {
    let circlesHTML = '';

    for (let i = 0; i < initialsArray.length; i++) {
        circlesHTML += `
            <div class='circle'>
                <div class='initials'>${initialsArray[i]}</div>
            </div>
        `;
    }

    return circlesHTML;
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
    let currentCard = todos.find(todo => todo.id === cardId);
    container.innerHTML = '';

    if (currentCard) {
        container.innerHTML = generateHTMLbigCard(currentCard);
    } else {
        console.error("Card not found");
    }
    loadCategoryColor(currentCard);
    checkPriority(currentCard);
}


function generateHTMLbigCard(currentCard) {
    return `
    <div class='space-between'>
        <div id='category-container${currentCard['id']}' class='big-card-category-container'>
            <p>${currentCard['category']}</p>
        </div>
        <div onclick="showMovableContainer('remove', 'bigCard')" class='close-img-container'>
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
            <img id='prio${currentCard['id']}' src=''>
        </div>
    </div>
    <div class='big-card-assigned-container'>
        <p>Assigned To:</p>
        <div>
            ${checkAssignedTo(currentCard, 'big-card')}
        </div>
    </div>
    `
}

function generateHTMLAssignedToBigCard(initialsArray) {
    let circlesHTML = '';

    for (let i = 0; i < initialsArray.length; i++) {
        circlesHTML += `
            <div class='circle-big-card'>
                <div class='initials'>${initialsArray[i]}</div>
            </div>
        `;
    }

    return circlesHTML;
}