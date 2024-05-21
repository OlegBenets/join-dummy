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
