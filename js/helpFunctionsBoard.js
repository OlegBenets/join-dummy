/**
 * This function creates the preview of the small tasks descriptions
 * 
 * @param {number} cardId This contains the unique id of the task
 * @returns short description as a String
 */
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


/**
 * This function check the subtasks of a task and generate the HTML for small task or big task view
 * 
 * @param {object} card This is the task object which includes all relevant informations for one task
 * @param {string} whichCard This contains the relevant task view as a string. small-card or big-card
 * @returns HTML of subtasks section
 */
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


/**
 * This function checks the contacts who assigned to the task and generates the assign to section HTML for 
 * small task and big task view
 * 
 * @param {object} card This is the task object which includes all relevant informations for one task
 * @param {string} whichCard This contains the relevant task view as a string. small-card or big-card
 * @returns HTML of assign to section
 */
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


/**
 * This function calculates the progress of the progress bar in small task view
 * 
 * @param {object} card This is the task object which includes all relevant informations for one task
 */
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


/**
 * This function check the category of a task and generates the respective HTML of big task view. 
 * True is User Story, False is Technical Task
 * 
 * @param {object} currentCard This is the task object which includes all relevant informations for one task
 * @returns HTML for category section
 */
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


/**
 * This function is used to toggle between big task view and big task editor
 * 
 * @param {string} parameter This contains a parameter to decide which view to show
 */
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


/**
 * This function is used to highlight the drag area on the board
 * 
 * @param {*} id This contains a parameter for detect which column is meant
 */
function highlight(id) {
    document.getElementById(id).classList.add('drag-area');
}


/**
 * This function is used to remove the highlight of the drag area on the board
 * 
 * @param {*} id This contains a parameter for detect which column is meant
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area');
}


/**
 * This function is used to get the amount of all checked subtasks of a task
 * 
 * @param {Array} allSubtasks This contains all subtasks that a task contains
 * @returns amount of all checked subtasks as a number
 */
function checkCheckedSubtasks(allSubtasks) {
    let checkedSubtasks = allSubtasks.filter(t => t['checked'] == 'checked');
    let amountOfCheckedSubtasks = checkedSubtasks.length;
    return amountOfCheckedSubtasks;
}


/**
 * This function is used to get all contacts that are assigned to a task
 * 
 * @param {number} cardId This contains the unique id of the task
 */
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