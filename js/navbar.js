// function selectMenu(menu) {
//     const SUMMARY_MENU = document.getElementById('summary-menu');
//     const ADDTASK_MENU = document.getElementById('addTask-menu');
//     const BOARD_MENU = document.getElementById('board-menu');
//     const CONTACTS_MENU = document.getElementById('contacts-menu');

//     SUMMARY_MENU.classList.remove('selected-menu');
//     ADDTASK_MENU.classList.remove('selected-menu');
//     BOARD_MENU.classList.remove('selected-menu');
//     CONTACTS_MENU.classList.remove('selected-menu');

//     switch (menu) {
//         case 'summary':
//             SUMMARY_MENU.classList.add('selected-menu');
//             window.location.href = '/summary/summary.html';

//             break;
//         case 'addTask':
//             ADDTASK_MENU.classList.add('selected-menu');
//             break;
//         case 'board':
//             BOARD_MENU.classList.add('selected-menu');
//             break;
//         case 'contacts':
//             CONTACTS_MENU.classList.add('selected-menu');
//             break;
    
//         default:
//             break;
//     }
// }

function selectMenu(menu) {
    // Entferne die 'selected-menu' Klasse von allen Menüpunkten
    document.querySelectorAll('.menubar li').forEach(li => {
      li.classList.remove('selected-menu');
    });

    // Füge die 'selected-menu' Klasse zum ausgewählten Menüpunkt hinzu
    document.getElementById(`${menu}-menu`).classList.add('selected-menu');

    // Leite den Benutzer zur entsprechenden Seite weiter
    switch (menu) {
      case 'summary':
        window.location.href = '/summary/summary.html';
        break;
      case 'addTask':
        window.location.href = '/add_task/add_task.html';
        break;
      case 'board':
        window.location.href = '/board/board.html';
        break;
      case 'contacts':
        window.location.href = '/contacts/contacts.html';
        break;
      default:
        console.error('Unknown menu:', menu);
        break;
    }
  }