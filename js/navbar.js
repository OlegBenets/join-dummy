function selectMenu(menu) {
    const SUMMARY_MENU = document.getElementById('summary-menu');
    const ADDTASK_MENU = document.getElementById('addTask-menu');
    const BOARD_MENU = document.getElementById('board-menu');
    const CONTACTS_MENU = document.getElementById('contacts-menu');

    SUMMARY_MENU.classList.remove('selected-menu');
    ADDTASK_MENU.classList.remove('selected-menu');
    BOARD_MENU.classList.remove('selected-menu');
    CONTACTS_MENU.classList.remove('selected-menu');

    switch (menu) {
        case 'summary':
            SUMMARY_MENU.classList.add('selected-menu');
            break;
        case 'addTask':
            ADDTASK_MENU.classList.add('selected-menu');
            break;
        case 'board':
            BOARD_MENU.classList.add('selected-menu');
            break;
        case 'contacts':
            CONTACTS_MENU.classList.add('selected-menu');
            break;
    
        default:
            break;
    }
}