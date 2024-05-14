
function startPage() {

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
    let form = event.target.closest('form');
    let input = form.querySelectorAll('input:not([type="checkbox"])');

    validityCheck(input)

    // console.log(form.elements);
    // console.log(input);
}

function setRedBorder(element) {
    if (element.checkValidity()) {
        element.parentElement.classList.remove('errorBorder')
    } else {
        element.parentElement.classList.add('errorBorder')
    }
}

function validityCheck(elements) {
    // let formvalidity = "";
    for (let i = 0; i < elements.length; i++) {
        // let validity = elements[i].checkValidity()
        let element = elements[i];
        setRedBorder(element);
        // formvalidity = formvalidity & validity;
    }
    // return formvalidity;
}

async function passwordValidation(event) {
    event.preventDefault();

    let form = event.target;
    let logindata = await encryptIput(form);

    console.log(logindata);
    // console.log(password);
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
    let valdationdata = gatheringValidations();
    for (let i = 0; i < valdationdata.length; i++) {
        let validation = valdationdata[i];
        if (validation.user == logindata.user && validation.password == logindata.password) {
            return true
        }
    }
    return false
}

function gatheringValidations() {
    let list = [];
    for (let i = 0; i < validations.length; i++) {
        list.push(getValidations(i));
    }
    return list;
}