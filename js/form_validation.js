// lockScreen()
window.addEventListener('orientationchange',rotatbody)
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
        }else{
            document.querySelector('body').classList.add('rotat90');
        }
        
    }
}







async function startPage() {
    await loadAllData('loginData');
}

function enabledButton(event) {

    let element = event.target;
    let button = element.closest('form').querySelector('button');

    if (element.checked) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', 'true');
    }
}

function validationCheck(event) {
    let input = event.target.closest('form').querySelectorAll('input:not([type="checkbox"])');
    validityCheck(input);
}

function validityCheck(elements) {
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        setRedBorder(element);
    }
}

function setRedBorder(element) {
    if (element.checkValidity()) {
        element.parentElement.classList.remove('errorBorder')
    } else {
        element.parentElement.classList.add('errorBorder')
    }
}


async function passwordValidation(event) {
    event.preventDefault();

    let form = event.target;
    let userdata = await encryptIput(form);

    console.log(userdata);
    let user = await lookAtLoginData(userdata, form);
    console.log(user);
    loginAsUser(user);
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

async function lookAtLoginData(userdata, form) {
    let logindata = await getLoginDataArray();
    for (let i = 0; i < logindata.length; i++) {
        let validation = logindata[i];
        let compare_name = (validation.email == userdata.email) ? true : false;
        let compare_pw = (validation.password == userdata.password) ? true : false;

        if (compare_name) {
            if (compare_pw) {
                return validation.id;
            } else {
                form.elements['password'].parentElement.classList.add('errorBorder');
                let info = form.elements['password'].parentElement.parentElement.querySelector('.errorInfo');
                info.classList.add('errorVisibility');
                info.innerHTML = 'Wrong password Ups! Try again.';
                console.log(form.elements['password'].parentElement);
                console.log(form.elements['password'].parentElement.parentElement.querySelector('.errorInfo'));
            }
        }
    }
    return false
}

async function signUpUser(event) {
    event.preventDefault();

    let form = event.target;
    if (confirmPassword(form)) {
        await saveUserData(form);
        showSuccess();
    }


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

    let userdata = creatUser(name, password, email);
    await addLoginData(userdata);
}

function showSuccess() {
    let background = document.getElementById('successBackground').classList.add('show');
    let banner = document.getElementById('successBanner').classList.add('slide');
    setTimeout(switchToLogin, 1500);
}

function switchToLogin() {
    window.location.href = './login_v2.html'
}

function loginAsGuest(event) {
    event.preventDefault();
    activUser = 'guest';
    window.location.href = './summary/summary.html';
}

function loginAsUser(id) {
    if (id) {
        activUser = id;
        window.location.href = './summary/summary.html';
    }
}