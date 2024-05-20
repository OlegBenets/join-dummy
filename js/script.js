window.onload = init();


function init() {
    // loadScript();
}

function loginCheck() {
    let onLogin = window.location.pathname.includes("login.html");
    let onSignup = window.location.pathname.includes("signup.html");
    let userIs = loadLocal();

    console.log(onLogin);
    console.log(onSignup);
    console.log(userIs);


    if (!onLogin && !onSignup) {
        if (!activUser) {
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
            <script src="/js/header.js"></script>
            <script src="/js/navbar.js"></script>
            <script src="../js/includeHTML.js"></script>
            `;
            break;
        case '/html/help.html':
            head.innerHTML += `
            <script src="/js/navbar.js"></script>
            <script src="/js/header.js"></script>
            <script src="/js/help_functions.js"></script>
            <script src="/js/includeHTML.js"></script>
            `;
            break;
        case '/html/contacts.html':
            head.innerHTML += `

            `;
            break;
        case '/html/add_task.html':
            head.innerHTML += `
            <script src="/js/help_functions.js"></script>
            <script src="/js/header.js"></script>
            <script src="/js/navbar.js"></script>
            <script src="../js/includeHTML.js"></script>
            <script src="../js/add_task.js"></script>
            <script src="../js/storage.js"></script>
            <script src="../js/contact.js"></script>
            `;
            break;
        case '/html/board.html':
            head.innerHTML += `
            <script src="/js/boardHTML.js"></script>
            <script src="/js/header.js"></script>
            <script src="/js/navbar.js"></script>
            <script src="/js/contact.js"></script>
            <script src="/js/add_task.js"></script>
            <script src="/js/storage.js"></script>
            <script src="/js/board.js"></script>
            <script src="/js/includeHTML.js"></script>
            `;
            break;
        case '/html/index.html':
            head.innerHTML += `

            `;
            break;
        case '/html/legal_notice.html':
            head.innerHTML += `
            <script src="/js/header.js"></script>
            <script src="/js/navbar.js"></script>
            <script src="/js/help_functions.js"></script>
            <script src="/js/includeHTML.js"></script>
            `;
            break;
        case '/html/privacy_policy.html':
            head.innerHTML += `
            <script src="/js/header.js"></script>
            <script src="/js/navbar.js"></script>
            <script src="/js/help_functions.js"></script>
            <script src="/js/includeHTML.js"></script>
            `;
            break;

        default:
            break;
    }

    console.log('loading ready');

}
