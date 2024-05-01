
function loadPage() {
    setTimeout(slideLogo, 175);
}

function slideLogo() {
        let logo = document.getElementById('logo');
    logo.classList.add('logo_slide');
}