
function startPage() {

    setTimeout(slideLogo,200);
    setTimeout(switchToLogin, 1000);
}

function loadeData(params) {

}

function slideLogo(params) {
    let logo = document.getElementById('content');
    logo.classList.add('shrink_n_slide');
}

function switchToLogin() {
    window.location.href = './login.html';
}


async function encrypt(data) {
    const encoder = new TextEncoder();

    const dataBuffer = encoder.encode(data);

    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashedData = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashedData;
}
