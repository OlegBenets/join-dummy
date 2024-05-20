window.onload = loginCheck();

function loginCheck() {
    let onLogin = window.location.pathname.includes("login.html");
    let onSignup = window.location.pathname.includes("signup.html");
    let userIs = activUser;

    console.log(onLogin);
    console.log(onSignup);
    console.log(userIs);


    if (!window.location.pathname.includes("login.html") && !window.location.pathname.includes("signup.html")) {
        if (!activUser) {
            window.location.href = '../login.html'
        }
    }
}
