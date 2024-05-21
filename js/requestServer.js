function startPage() {

    setTimeout(slideLogo, 200);
    setTimeout(switchToLogin, 1000);
}

function loadeData() {

}

function slideLogo() {
    let logo = document.getElementById('content');
    logo.classList.add('shrink_n_slide');
}

function switchToLogin() {
    window.location.href = '../html/login.html';
}
