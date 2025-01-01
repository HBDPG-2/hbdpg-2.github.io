/*  Copyright (C) 2024-2025 Piotr Kniaz

    This file is part of HBDPG-2.
    Repository: https://github.com/HBDPG-2/hbdpg-2.github.io

    Licensed under the MIT License. See LICENSE file in the project root for details.
*/

// Apply custom scrollbar
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
if (!isSafari) {
    document.body.classList.add('custom-scrollbar');
}
// End apply custom scrollbar

document.addEventListener('DOMContentLoaded', function() {
    // Console warning
    console.log('%cWARNING!', 'font-size: 28px; color: #ffff00; background-color: #ff0000;');
    console.log('%cDO NOT enter or paste any code here that you do not understand!\nUsing this console may allow attackers to steal your information.', 'font-size: 18px;');

    const core = new Worker('scripts/core.js');

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
    passwordLengthChoice.forEach(elem => {
        if (elem.id === 'standard') {
            elem.checked = true;
        } else {
            elem.checked = false;
        }
    });
    clearClipboardCheckbox.checked = true;
    // End Firefox reload fix

    form1.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (passphrase1Input.value.length >= 8) {
            core.postMessage({ message: 'passphrase1', data: passphrase1Input.value });
            passphrase1Input.value = "*".repeat(passphrase1Input.value.length);

            passphrase1Input.type = 'password';
            passphrase1Input.setAttribute('disabled', 'disabled');
            passphrase1Input.style.pointerEvents = 'none';
            showPassphrase1Checkbox.checked = false;
            showPassphrase1Checkbox.setAttribute('disabled', 'disabled');
            showPassphrase1CheckboxLabel.style.color = '#404040';
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
            showAlertBox('Use at least 8 characters', '');
        }
    });

    form2.addEventListener('submit', function(event) {
        event.preventDefault();

        if (passphrase2Input.value.length >= 8) {
            core.postMessage({ message: 'passphrase2', data: passphrase2Input.value });
            passphrase2Input.value = "*".repeat(passphrase2Input.value.length);

            passphrase2Input.type = 'password';
            passphrase2Input.setAttribute('disabled', 'disabled');
            passphrase2Input.style.pointerEvents = 'none';
            showPassphrase2Checkbox.checked = false;
            showPassphrase2Checkbox.setAttribute('disabled', 'disabled');
            showPassphrase2CheckboxLabel.style.color = '#404040';
            showPassphrase2CheckboxLabel.style.pointerEvents = 'none';
            confirmButton.setAttribute('disabled', 'disabled');
            
            generateButton.removeAttribute('disabled');
            generateButton.focus();

            result.scrollIntoView({
                block: "center",
                behavior: "smooth"
            });
        } else {
            showAlertBox('Use at least 8 characters', '');
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
        for (const option of passwordLengthChoice) {
            if (option.checked) {
                core.postMessage({ message: 'passwordLength', data: option.value});
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
                elem.style.color = '#404040';
            } else {
                elem.style.color = '#8a8a8a';
            }
        });

        core.postMessage({ message: 'generate', data: '' });

        setTimeout(() => {
            generateNote.style.opacity = '1';

            setTimeout(() => {
                generateNote.style.animation = 'pulsateAnimation 2000ms ease-in infinite alternate';
            }, 1000);
        }, 3000);
    });

    core.onmessage = function(event) {
        if (event.data.status === 'Successful') {
            result.style.width = `${event.data.result.password.length}ch`;
            result.value = event.data.result.password;
            timeCount.innerHTML = `${event.data.result.elapsedTime.toFixed(3)} s`;
            entropyCount.innerHTML = `${event.data.result.entropy.toFixed(2)} bits`;

            result.removeAttribute('disabled');
            result.setAttribute('readonly', true);
            resultContainer.style.border = '2px solid #81b5f9';
            resultContainer.style.boxShadow = '0px 0px 25px rgba(179, 71, 230, 0.8)';
            generateButton.innerHTML = '<b>Generated</b>';
            generateNote.style.visibility = 'hidden';
            showPasswordCheckbox.removeAttribute('disabled');
            showPasswordCheckboxLabel.style.color = 'white';
            showPasswordCheckboxLabel.style.pointerEvents = 'auto';

            copyButton.removeAttribute('disabled');
            copyButton.focus();
        } else if (event.data.status === 'Error') {
            showAlertBox('Error', event.data.error);

            generateButton.innerHTML = '<b>Error!</b>';
            generateButton.style.color = '#990000';
            generateNote.style.visibility = 'hidden';
            clearButton.removeAttribute('disabled');
            clearButton.focus();
        }

        core.terminate();
    }

    core.onerror = function(error) {
        showAlertBox('Error', error.message);

        generateButton.innerHTML = '<b>Error!</b>';
        generateButton.style.color = '#990000';
        generateNote.style.visibility = 'hidden';
        clearButton.removeAttribute('disabled');
        clearButton.focus();

        core.terminate();
    }

    copyButton.addEventListener('click', function() {
        navigator.clipboard.writeText(result.value);
        this.innerHTML = 'Copied';
        clearButton.focus();
    });

    clearButton.addEventListener('click', function() {
        clearButton.blur();
        reloadPage(clearClipboardCheckbox.checked);
    });

    clearClipboardCheckboxLabel.addEventListener('mousedown', (event) => {
        clearClipboardCheckbox.focus();

        if (clearClipboardCheckbox.checked) {
            event.preventDefault();
            confirmDontClearClipboardDialogBox.showModal();
        }
    });

    dontClearClipboardCancelButton.addEventListener('click', function() {
        confirmDontClearClipboardDialogBox.close();
        clearClipboardCheckbox.blur();
    });

    dontClearClipboardConfirmButton.addEventListener('click', function() {
        clearClipboardCheckbox.checked = false;
        confirmDontClearClipboardDialogBox.close();
        clearClipboardCheckbox.blur();
    });

    closeAlertButton.addEventListener('click', function() {
        alertBox.close();
    });

    alertBox.addEventListener('close', function() {
        passphrase1Input.focus();
        passphrase2Input.focus();
    });
});


// Functions

function reloadPage(clearClipboard) {
    if (clearClipboard) {
        navigator.clipboard.writeText('');
    }

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
}

function showAlertBox(alertTitle, alertDetails) {
    const alertBox = document.getElementById('alertBox');

    document.getElementById('alertTitle').innerHTML = alertTitle;
    document.getElementById('alertDetails').innerHTML = alertDetails;

    alertBox.showModal();
}

function showUpdateNotification(worker) {
    updateNotification.style.animation = 'updateNotificationAnimation 300ms ease';
    updateNotification.show();

    updateButton.addEventListener('click', () => {
        updateButton.setAttribute('disabled', 'disabled');
        updateServiceWorker(worker);
    });
}