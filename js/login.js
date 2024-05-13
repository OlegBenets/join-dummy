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

    if (set == undefined) {
        set = visibility;
    }

    if (set) {
        input.type = 'password';
        icon.src = './assets/img/visibility_off.svg';
        visibility = false;
    } else {
        input.type = 'text';
        icon.src = './assets/img/visibility.svg';
        visibility = true;
    }
}


function validityCheck() {
    let user = document.getElementById('input_email');
    let password = document.getElementById('input_password');

    setRedBorder(user);
    setRedBorder(password);

}

function setRedBorder(element) {
    if (element.checkValidity()) {
        element.parentElement.classList.remove('error_border')
    } else {
        element.parentElement.classList.add('error_border')
    }
}

function userValidation(form) {
    const email = form.elements['email'].value
    const password = form.elements['password'].value
    console.log('email ' + email);
    console.log('password '+ password);
    for (let i = 0; i < validations.length; i++) {
        const element = validations[i];
        if (email==element.user && password==element.password) {
            console.log('access granted');
        }
    }
}

function formCheck(event) {
    event.preventDefault();

    let element = event.target;

    if (element.checkValidity()) {
        console.log('form ist valid');
        userValidation(element);

    } else {
        console.log('form is invalid');
    }
}


