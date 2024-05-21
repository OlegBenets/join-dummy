window.onload = init();


function init() {
    savedLogin();
    loginCheck();
}

function tester(input) {
    if (input) {
        console.log(input + " is true");
    }
    if (!input) {
        console.log(input + " is false");
    }

}

function savedLogin() {
    if (window.location.pathname.includes("login.html")) {
        let savedUser = loadLocal('saveuser');
        if (!savedUser) {
            saveLocal('activUser', false);
        }else{
           saveLocal('activUser', savedUser); 
        }
        
    }
}

function loginCheck() {
    let onLoginPage = window.location.pathname.includes("login.html");
    let onSignupPage = window.location.pathname.includes("signup.html");
    let userIs = loadLocal('activUser');
    if (!onLoginPage && !onSignupPage) {
        if (userIs == 'false'|| !userIs) {
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

