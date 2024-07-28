function next() {
    // validation

    document.getElementById('next').setAttribute('disabled', 'disabled');
    document.getElementById('passphrase1').setAttribute('disabled', 'disabled');
    let elem = document.getElementById('passphrase2');
    elem.removeAttribute('disabled');
    elem.type = 'password';
}