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

function test() {
    let userframe = document.getElementById('input_email_frame');
    let user = document.getElementById('input_email');
    let uservalid = user.checkValidity();
    let passwordframe = document.getElementById('input_password_frame');
    let password = document.getElementById('input_password');
    let passwordvalid = password.checkValidity();
    let passwordempty = password.value;

    if (passwordvalid) {
        passwordframe.classList.remove('error_border')
    } else {
        passwordframe.classList.add('error_border')
    }

    if (uservalid) {
        userframe.classList.remove('error_border')
    } else {
        userframe.classList.add('error_border')
    }


    console.log('User ' + uservalid);
    console.log('password ' + passwordvalid);
    console.log('inhalt ' + passwordempty);
}

function formCheck(event) {
    event.preventDefault();

    let element = event.target;
    // console.log(element);

    if (element.checkValidity()) {
        console.log('form ist valid');
    } else {
        console.log('form is invalid');
    }
}

function test() {
    console.log(validations);
    // deleteValidations(0);

    for (let i = 0; i < 10; i++) {
        let ding = creatValidaion(`user_${i}`, `${i}_admin`);
        addValidaions(ding);
    }
    console.log(validations);

    let thing = creatValidaion('user1', 'admin')
    addValidaions(thing);
    console.log(validations);
    thing = creatValidaion('user2', 'admin');
    editValidations(3, thing);
    console.log(validations);
    deleteValidations(0);
    console.log(validations);
}
let wert="";
async function test2() {
    await putData("test", validations);
    wert = await loadData("test")
}