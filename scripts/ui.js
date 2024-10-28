document.addEventListener('DOMContentLoaded', function() {
    form1.removeAttribute('action');
    form2.removeAttribute('action');

    let passphrase1;
    let passphrase2;

    // Firefox reload fix
    showPassphrase1Checkbox.checked = false;
    passphrase2Input.setAttribute('disabled', 'disabled');
    showPassphrase2Checkbox.checked = false;
    showPassphrase2Checkbox.setAttribute('disabled', 'disabled');
    confirmButton.setAttribute('disabled', 'disabled');
    result.setAttribute('disabled', 'disabled');
    showPasswordCheckbox.checked = false;
    showPasswordCheckbox.setAttribute('disabled', 'disabled');
    generateButton.setAttribute('disabled', 'disabled');
    copyButton.setAttribute('disabled', 'disabled');
    // End Firefox reload fix

    form1.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (passphrase1Input.value.length >= 8) {
            passphrase1 = passphrase1Input.value;
            passphrase1Input.value = "*".repeat(passphrase1.length);

            passphrase1Input.type = 'password';
            passphrase1Input.setAttribute('disabled', 'disabled');
            showPassphrase1Checkbox.checked = false;
            showPassphrase1Checkbox.setAttribute('disabled', 'disabled');
            showPassphrase1CheckboxLabel.style.color = '#202020';
            showPassphrase1CheckboxLabel.style.pointerEvents = 'none';
            nextButton.setAttribute('disabled', 'disabled');
            
            passphrase2Input.removeAttribute('disabled');
            showPassphrase2Checkbox.removeAttribute('disabled');
            showPassphrase2CheckboxLabel.style.color = 'white';
            showPassphrase2CheckboxLabel.style.pointerEvents = 'auto';
            confirmButton.removeAttribute('disabled');
    
            passphrase2Input.type = 'password';
            passphrase2Input.focus();

            passphrasesSecurity(passphrase1Input);
        } else {
            window.alert('Use at least 8 characters!');
            passphrase1Input.focus();
        }
    });

    form2.addEventListener('submit', function(event) {
        event.preventDefault();

        if (passphrase1 != passphrase2Input.value && passphrase2Input.value.length >= 8) {
            passphrase2 = passphrase2Input.value;
            passphrase2Input.value = "*".repeat(passphrase2.length);

            generateButton.scrollIntoView({
                block: "center",
                behavior: "smooth"
            });

            passphrase2Input.type = 'password';
            passphrase2Input.setAttribute('disabled', 'disabled');
            showPassphrase2Checkbox.checked = false;
            showPassphrase2Checkbox.setAttribute('disabled', 'disabled');
            showPassphrase2CheckboxLabel.style.color = '#202020';
            showPassphrase2CheckboxLabel.style.pointerEvents = 'none';
            confirmButton.setAttribute('disabled', 'disabled');

            generateButton.removeAttribute('disabled');
            generateButton.focus();

            passphrasesSecurity(passphrase2Input);
        } else {
            if (passphrase2Input.value.length < 8) {
                window.alert('Use at least 8 characters!');
            } else {
                window.alert('Passphrases must be different!');
            }
            passphrase2Input.focus();
        }
    });

    showPassphrase1Checkbox.addEventListener('click', function() {
        if (passphrase1Input.type === 'password') {
            passphrase1Input.type = 'text';
        } else {
            passphrase1Input.type = 'password';
        }

        passphrase1Input.focus();
    });

    showPassphrase2Checkbox.addEventListener('click', function() {
        if (passphrase2Input.type === 'password') {
            passphrase2Input.type = 'text';
        } else {
            passphrase2Input.type = 'password';
        }

        passphrase2Input.focus();
    });

    showPasswordCheckbox.addEventListener('click', function() {
        if (result.type === 'password') {
            result.type = 'text';
        } else {
            result.type = 'password';
        }
        showPasswordCheckbox.blur();
    });

    generateButton.addEventListener('click', function() {
        let passwordLength;

        for (const option of passwordLengthChoice) {
            if (option.checked) {
                passwordLength = option.value;
                break;
            }
        }

        generateButton.setAttribute('disabled', 'disabled');
        generateButton.innerHTML = '<img id="loading" src="images/loading.webp" alt="Generating...">';
        passwordLengthChoice.forEach(elem => elem.setAttribute('disabled', 'disabled'));
        passwordLengthRadioLabels.forEach(elem => {
            elem.style.pointerEvents = 'none';
            let radioButton = document.getElementById(elem.getAttribute('for'));
            if (!radioButton.checked) {
                elem.style.color = '#202020';
            } else {
                elem.style.color = '#6a6a6a';
            }
        });
        clearButton.setAttribute('disabled', 'disabled');
        generateNote.style.visibility = 'visible';

        setTimeout(() => {
            generate(passphrase1, passphrase2, passwordLength)
            .then(password => {
                result.value = password.password;
                timeCount.innerHTML = `${password.elapsedTime.toFixed(3)} s`;
                entropyCount.innerHTML = `${password.entropy.toFixed(2)} bits`;

                passphrase1 = '';
                passphrase2 = '';

                result.removeAttribute('disabled');
                result.style.boxShadow = '0px 0px 25px rgba(179, 71, 230, 0.8)';
                generateButton.innerHTML = '<b>Generated</b>';
                generateNote.style.visibility = 'hidden';
                showPasswordCheckbox.removeAttribute('disabled');
                showPasswordCheckboxLabel.style.color = 'white';
                showPasswordCheckboxLabel.style.pointerEvents = 'auto';

                copyButton.removeAttribute('disabled');
                clearButton.removeAttribute('disabled');
                copyButton.focus();
            }).catch(error => {
                window.alert(error);

                generateButton.innerHTML = '<b>Error!</b>';
                generateButton.style.color = '#990000';
                generateNote.style.visibility = 'hidden';
                clearButton.removeAttribute('disabled');
                clearButton.focus();
            });
        }, 100);
    });

    copyButton.addEventListener('click', function() {
        navigator.clipboard.writeText(result.value);
        this.innerHTML = 'Copied';
        clearButton.focus();
    });

    clearButton.addEventListener('click', function() {
        navigator.clipboard.writeText('');

        clearButton.blur();

        // if scrolling will be not finished
        setTimeout(() => {
            document.location.reload(true);
        }, 2000);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        const checkIfScrollingFinished = () => {
            if (window.scrollY === 0) {
                document.location.reload(true);
            } else {
                setTimeout(() => {
                    requestAnimationFrame(checkIfScrollingFinished);
                }, 50);
            }
        };

        requestAnimationFrame(checkIfScrollingFinished);
    });

    window.clearPassphrases = function() {
        passphrase1 = '';
        passphrase2 = '';
    };
});

const form1 = document.getElementById('passphrase1Form');
const form2 = document.getElementById('passphrase2Form');
const passphrase1Input = document.getElementById('passphrase1Input');
const passphrase2Input = document.getElementById('passphrase2Input');
const showPassphrase1Checkbox = document.getElementById('showPassphrase1Checkbox');
const showPassphrase2Checkbox = document.getElementById('showPassphrase2Checkbox');
const showPasswordCheckbox = document.getElementById('showPasswordCheckbox');
const showPassphrase1CheckboxLabel = document.getElementById('showPassphrase1CheckboxLabel');
const showPassphrase2CheckboxLabel = document.getElementById('showPassphrase2CheckboxLabel');
const showPasswordCheckboxLabel = document.getElementById('showPasswordCheckboxLabel');
const passwordLengthRadioLabels = document.querySelectorAll('.passwordLengthRadioLabels');
const passwordLengthChoice = document.getElementsByName('length');
const nextButton = document.getElementById('nextButton');
const confirmButton = document.getElementById('confirmButton');
const generateButton = document.getElementById('generateButton');
const copyButton = document.getElementById('copyButton');
const clearButton = document.getElementById('clearButton');
const generateNote = document.getElementById('generateNote');
const clearNote = document.getElementById('clearNote');
const result = document.getElementById('result');
const timeCount = document.getElementById('timeCount');
const entropyCount = document.getElementById('entropyCount');