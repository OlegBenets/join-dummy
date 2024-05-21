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
    let onLoginPage = window.location.pathname.includes("login.html");
    let onSignupPage = window.location.pathname.includes("signup.html");
    let userIs = loadLocal('activUser');

    if (!onLoginPage && !onSignupPage) {
        if (!userIs) {
            window.location.href = '../html/login.html'
        }
    }
}

// window.addEventListener('orientationchange', rotatbody);

function rotatbody() {
    if (window.navigator.userAgentData.mobile) {
        if (screen.orientation.type.includes('portrait')) {
            document.querySelector('body').classList.remove('rotat90');
        } else {
            document.querySelector('body').classList.add('rotat90');
        }
    }
}

