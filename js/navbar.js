function selectMenu() {
    const SUMMARY_MENU = document.getElementById('summary-menu');
    const ADDTASK_MENU = document.getElementById('addTask-menu');
    const BOARD_MENU = document.getElementById('board-menu');
    const CONTACTS_MENU = document.getElementById('contacts-menu');

    SUMMARY_MENU.classList.remove('selected-menu');
    ADDTASK_MENU.classList.remove('selected-menu');
    BOARD_MENU.classList.remove('selected-menu');
    CONTACTS_MENU.classList.remove('selected-menu');

    const PATH = window.location.pathname;

    if (PATH.includes("summary.html")) {
        SUMMARY_MENU.classList.add('selected-menu');
    } else if (PATH.includes("addTask.html")) {
        ADDTASK_MENU.classList.add('selected-menu');
        selectDefaultPrio('button-medium');
    } else if (PATH.includes("board.html")) {
        BOARD_MENU.classList.add('selected-menu');
    } else if (PATH.includes("contacts.html")) {
        CONTACTS_MENU.classList.add('selected-menu');
    }
}
