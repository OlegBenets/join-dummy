


function startPage() {
    lookAtCheckbox()
}

function lookAtCheckbox() {
    let checkbox = document.getElementById('privacy_policy');
    checkbox.addEventListener('click', (event) => { enabledButton(event) });
}

function enabledButton(event) {

    let element = event.target;
    let button = document.getElementById('sign_up');

    if (element.checked) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', 'true');
    }
}

function call() {
    console.log('hallo Welt');
}

function callForm(event){
    event.preventDefault();

    call();
}
