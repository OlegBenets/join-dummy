// lockScreen()
window.addEventListener('orientationchange', rotatbody)
async function lockScreen() {
    // await screen.orientation.lock('portrait');


    let one = screen.onchange;

    // console.log(screen.orientation.type);
    // console.log(screen);
    // console.log(screen.onchange);
    // alert('screen.onchange is '+one);
    let info = window.navigator;
    let info2 = window.navigator.userAgentData.mobile;
    // console.log(info);
    // console.log(info2);

    // alert('mobile is '+ info2);

    // if (screen.orientation && screen.orientation.lock) {
    //     screen.orientation.lock('portrait').catch(error => { console.error("Failed to lock orientation:", error); });
    // } else {
    //     console.warn("Screen orientation lock is not supported on this device.");
    // }
}

function rotatbody() {
    if (window.navigator.userAgentData.mobile) {
        if (screen.orientation.type.includes('portrait')) {
            document.querySelector('body').classList.remove('rotat90');
        } else {
            document.querySelector('body').classList.add('rotat90');
        }

    }
}







async function startPage() {
    await loadAllData('loginData');
}

function enabledButton(event) {

    let element = event.target;
    let button = element.closest('form').querySelectorAll('button');

    activatButton(button, element.checked);
}

function activatButton(buttons, status) {
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        if (status) {
            button.removeAttribute('disabled');
            // console.log('activ');
        } else {
            button.setAttribute('disabled', 'true');
            // console.log('inactiv');
        }
    }
}

function validationCheck(event) {
    let button = event.target.closest('form').querySelectorAll('button');
    let input = event.target.closest('form').querySelectorAll('input:not([type="checkbox"])');
    activatButton(button, false);
    let check = validityCheck(input);
    activatButton(button, !check);
    event.target.closest('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
}

function validityCheck(elements) {
    let allCheck = true;
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        allCheck = allCheck & setRedBorder(element);
    }
    return allCheck;
}

function setRedBorder(element) {
    let check = element.checkValidity();
    if (check) {
        element.parentElement.classList.remove('errorBorder');
    } else {
        element.parentElement.classList.add('errorBorder');
    }
    return check;
}


async function passwordValidation(event) {
    event.preventDefault();

    let form = event.target;
    let userData = await encryptIput(form);

    // console.log(userData);
    let user = await lookAtLoginData(userData, form);
    let rememberMe = form.querySelector('input[type="checkbox"]');
    ermenmberMe(user, rememberMe.checked);
    // console.log();
    loginAsUser(user);
}


function ermenmberMe(id, checked) {
    if (id && checked) {
        saveLocal('saveuser', id);
    } else {
        deleteLocal('saveuser');
    }
}

async function encryptIput(form) {
    let user = form.elements['email'].value;
    let password = await encrypt(form.elements['password'].value);

    let logindata = {
        "email": user,
        "password": password
    }

    return logindata;
}

async function lookAtLoginData(userData, form) {
    let logindata = await getLoginDataArray();
    for (let i = 0; i < logindata.length; i++) {
        let validation = logindata[i];
        let compare_name = (validation.email == userData.email) ? true : false;
        let compare_pw = (validation.password == userData.password) ? true : false;

        if (compare_name) {
            if (compare_pw) {
                return validation.id;
            } else {
                form.elements['password'].parentElement.classList.add('errorBorder');
                let info = form.elements['password'].parentElement.parentElement.querySelector('.errorInfo');
                info.classList.add('errorVisibility');
                info.innerHTML = 'Wrong password Ups! Try again.';
                // console.log(form.elements['password'].parentElement);
                // console.log(form.elements['password'].parentElement.parentElement.querySelector('.errorInfo'));
            }
        }
    }
    return false
}

async function signUpUser(event) {
    event.preventDefault();
    let form = event.target;
    let button = event.target.closest('form').querySelectorAll('button')
    let check = confirmPassword(form);

    if (check) {
        await saveUserData(form);
        showSuccess();
    }
    activatButton(button, !check);
}

function confirmPassword(form) {
    let password_1st = form.elements['password'];
    let password_2nd = form.elements['confirmPassword'];
    let errorinfo = password_2nd.parentElement.parentElement.querySelector('.errorInfo');

    if (password_1st.value == password_2nd.value) {
        errorinfo.parentElement.classList.remove('errorVisibility');
        return true;
    } else {
        password_2nd.parentElement.classList.add('errorBorder');
        errorinfo.classList.add('errorVisibility');
        return false
    }
}

async function saveUserData(form) {
    let name = form.elements['name'].value;
    let email = form.elements['email'].value;
    let password = await encrypt(form.elements['password'].value);

    let userData = creatUser(name, password, email);
    await addLoginData(userData);

    let contactData = creatContact(name, email, 'no Number', 'C3FF2B');
    await addContacts(contactData);
}

function showSuccess() {
    let background = document.getElementById('successBackground').classList.add('show');
    let banner = document.getElementById('successBanner').classList.add('slide');
    setTimeout(switchToLogin, 1500);
}

function switchToLogin() {
    window.location.href = '../login.html';
}

function loginAsGuest(event) {
    event.preventDefault();
    saveLocal('activUser', 'guest');
    window.location.href = '../html/summary.html';
}

function loginAsUser(id) {
    if (id) {
        saveLocal('activUser', id);
        window.location.href = '../html/summary.html';
    }
}