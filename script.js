function form1(element) {
    if(event.key === 'Enter') {
        next();
    }
}

function next() {
    let passphrase1input = document.getElementById('passphrase1');
    let passphrase2input = document.getElementById('passphrase2');

    if (passphrase1input.value.length >= 8) {
        document.getElementById('next').setAttribute('disabled', 'disabled');
        passphrase1input.setAttribute('disabled', 'disabled');
    
        passphrase2input.removeAttribute('disabled');
        passphrase2input.type = 'password';
        passphrase2input.focus();
    } else {
        alert('Use at least 8 characters');
    }
}