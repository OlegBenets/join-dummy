window.onload = init();


function init() {
    savedLogin();
    loginCheck();
}

function savedLogin() {
    if (window.location.pathname.includes("login.html")) {
        let savedUser = loadLocal('saveuser');
        saveLocal('activUser', savedUser);
    }
}

function loginCheck() {
    let onLogin = window.location.pathname.includes("login.html");
    let onSignup = window.location.pathname.includes("signup.html");
    let userIs = loadLocal('activUser');

    console.log(onLogin);
    console.log(onSignup);
    console.log(userIs);


    if (!onLogin && !onSignup) {
        if (!userIs) {
            window.location.href = '../login.html'
        }
    }
}

function loadScript() {

    let head = document.querySelector('head');

    console.log(window.location.pathname);
    switch (window.location.pathname) {
        case '/html/login.html':

            head.innerHTML += `
            <script src="../js/storage.js"></script>
            <script src="../js/password_shower.js"></script>
            <script src="../js/form_validation.js"></script>
            `;
            break;

        case '/html/signup.html':
            head.innerHTML += `
            <script src="../js/storage.js"></script>
            <script src="../js/password_shower.js"></script>
            <script src="../js/form_validation.js"></script>
            `;
            break;

        case '/html/summary.html':
            head.innerHTML += `
    
                `;
            break;
        case '/html/help.html':
            head.innerHTML += `

            `;
            break;
        case '/html/contacts.html':
            head.innerHTML += `

            `;
            break;
        case '/html/add_task.html':
            head.innerHTML += `

            `;
            break;
        case '/html/board.html':
            head.innerHTML += `

            `;
            break;
        case '/html/index.html':
            head.innerHTML += `

            `;
            break;
        case '/html/legal_notice.html':
            head.innerHTML += `

            `;
            break;
        case '/html/privacy_policy.html':
            head.innerHTML += `

            `;
            break;

        default:
            break;
    }

    console.log('loading ready');

}
