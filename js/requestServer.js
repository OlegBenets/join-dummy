
function startPage() {


    // window.location.href = './login.html';
}

function loadeData(params) {

}

function encrypt(data) {
    const crypto = require('crypto');
    const hashedData = crypto.createHash('sha256').update(data).digest('hex');
    return hashedData;
}