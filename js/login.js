let visibility = false;

function loadPage() {
    setTimeout(slideLogo, 250);
}

function slideLogo() {
    let logo = document.getElementById('logo');
    logo.classList.add('logo_slide');
    let content = document.getElementById('content');
    content.classList.remove('hidden');
}

function showPassword(set) {
    let input = document.getElementById('input_password');
    let icon = document.getElementById('img_2');

    if (set==undefined) {
        set=visibility;
    }
   
    if (set) {
        input.type='password';
        icon.src='./assets/img/visibility_off.svg';
        visibility=false;
    } else {
        input.type='text';
        icon.src='./assets/img/visibility.svg';
        visibility=true;
    }
}