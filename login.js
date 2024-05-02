
function loadPage() {
    setTimeout(slideLogo, 250);
}

function slideLogo() {
    let logo = document.getElementById('logo');
    logo.classList.add('logo_slide');
    let content = document.getElementById('content');
    content.classList.remove('hidden');
}