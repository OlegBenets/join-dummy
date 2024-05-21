/**
 * Initiates the start page sequence.
 * 
 * This function triggers two actions with delays:
 * 1. After 200 milliseconds, the `slideLogo` function is called to animate the logo.
 * 2. After 1000 milliseconds, the `switchToLogin` function is called to redirect the user to the login page.
 */
function startPage() {

    setTimeout(slideLogo, 200);
    setTimeout(switchToLogin, 1000);
}


/**
 * Applies a sliding animation to the logo.
 * 
 * This function selects the element with the ID 'content' and adds the class 'shrink_n_slide' to it,
 * which triggers a sliding animation defined in the CSS.
 */
function slideLogo() {
    let logo = document.getElementById('content');
    logo.classList.add('shrink_n_slide');
}


/**
 * Redirects the user to the login page.
 * 
 * This function changes the current window location to the login page located at '../html/login.html'.
 */
function switchToLogin() {
    window.location.href = '../html/login.html';
}
