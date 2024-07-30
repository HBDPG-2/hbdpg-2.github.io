document.addEventListener('DOMContentLoaded', function () {
    const form1 = document.getElementById('passphrase1Form');
    const form2 = document.getElementById('passphrase2Form');
    const passphrase1Input = document.getElementById('passphrase1Input');
    const passphrase2Input = document.getElementById('passphrase2Input');
    const nextButton = document.getElementById('nextButton');
    const confirmButton = document.getElementById('confirmButton');

    form1.removeAttribute('action');
    form2.removeAttribute('action');

    form1.addEventListener('submit', function (event) {
        event.preventDefault();

        passphrase1Input.setAttribute('disabled', 'disabled');
        nextButton.setAttribute('disabled', 'disabled');
        
        passphrase2Input.removeAttribute('disabled');
        confirmButton.removeAttribute('disabled');

        passphrase2Input.type = 'password';
        passphrase2Input.focus();
    });

    form2.addEventListener('submit', function (event) {
        event.preventDefault();

        if (passphrase1Input.value != passphrase2Input.value) {
            passphrase2Input.setAttribute('disabled', 'disabled');
            confirmButton.setAttribute('disabled', 'disabled');
        } else {
            alert('Passphrases must be different!');
            passphrase2Input.focus();
        }
    });
});

function next() {
    let passphrase1Input = document.getElementById('passphrase1Input');
    let passphrase2Input = document.getElementById('passphrase2Input');

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