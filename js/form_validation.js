
async function startPage() {
    await loadAllData('validations');
    console.log(validations);
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
    // let form = event.target.closest('form');
    // let input = form.querySelectorAll('input:not([type="checkbox"])');

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
    let logindata = await encryptIput(form);

    console.log(logindata);
}

async function encryptIput(form) {
    let user = await encrypt(form.elements['email'].value);
    let password = await encrypt(form.elements['password'].value);

    let logindata = {
        "user": user,
        "password": password
    }

    return logindata;
}

function lookAtLoginData(logindata) {
    let valdationdata = getValidationsArray();
    for (let i = 0; i < valdationdata.length; i++) {
        let validation = valdationdata[i];
        if (validation.user == logindata.user && validation.password == logindata.password) {
            return true
        }
    }
    return false
}

function signUpUser(event) {
    event.preventDefault();

    let form = event.target;
    confirmPassword(form);

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

{input.firstChild.addEventListener('focus',(event)=> {
    funktion(event)
}) } 