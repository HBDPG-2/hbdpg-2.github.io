document.addEventListener('DOMContentLoaded', function() {
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
    const nextButton = document.getElementById('nextButton');
    const confirmButton = document.getElementById('confirmButton');
    const generateButton = document.getElementById('generateButton');
    const copyButton = document.getElementById('copyButton');
    const clearButton = document.getElementById('clearButton');
    const generateNote = document.getElementById('generateNote');
    const clearNote = document.getElementById('clearNote');
    const result = document.getElementById('result');
    

    form1.removeAttribute('action');
    form2.removeAttribute('action');

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
        // console.log(passphrase1Input.value.length < 8);
        if (passphrase1Input.value.length >= 8) {
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
        } else {
            window.alert('Use at least 8 characters!');
            passphrase1Input.focus();
        }
    });

    form2.addEventListener('submit', function(event) {
        event.preventDefault();

        if (passphrase1Input.value != passphrase2Input.value && passphrase2Input.value.length >= 8) {
            passphrase2Input.type = 'password';
            passphrase2Input.setAttribute('disabled', 'disabled');
            showPassphrase2Checkbox.checked = false;
            showPassphrase2Checkbox.setAttribute('disabled', 'disabled');
            showPassphrase2CheckboxLabel.style.color = '#202020';
            showPassphrase2CheckboxLabel.style.pointerEvents = 'none';
            confirmButton.setAttribute('disabled', 'disabled');

            generateButton.removeAttribute('disabled');
            generateButton.focus();
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
        // passphrase1Input.setSelectionRange(0, passphrase1Input.value.length);
    });

    showPassphrase2Checkbox.addEventListener('click', function() {
        if (passphrase2Input.type === 'password') {
            passphrase2Input.type = 'text';
        } else {
            passphrase2Input.type = 'password';
        }

        passphrase2Input.focus();
        // passphrase2Input.setSelectionRange(0, passphrase2Input.value.length);
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
        generateButton.setAttribute('disabled', 'disabled');
        generateButton.innerHTML = '<img id="loading" src="images/loading.webp" alt="Generating...">';
        // generateButton.style.border = '2px solid #81b5f9';
        // generateButton.style.boxShadow = '0px 0px 40px rgba(179, 71, 230, 0.7)';
        clearButton.setAttribute('disabled', 'disabled');
        generateNote.style.visibility = 'visible';

        setTimeout(hashnow, 500);
    });

    copyButton.addEventListener('click', function() {
        navigator.clipboard.writeText(result.value);
        this.innerHTML = 'Copied';
        clearButton.focus();
    });

    clearButton.addEventListener('click', function() {
        navigator.clipboard.writeText('');

        document.location.reload();
    });
});