function passphrasesSecurity(element) {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (element.type !== 'password') {
                clearPassphrases();

                passphrase1Input.value = '';
                passphrase2Input.value = '';
                result.value = '';

                passphrase1Input.setAttribute('disabled', 'disabled');
                showPassphrase1Checkbox.setAttribute('disabled', 'disabled');
                showPassphrase1Checkbox.checked = false;
                showPassphrase1CheckboxLabel.style.color = '#202020';
                showPassphrase1CheckboxLabel.style.pointerEvents = 'none';
                nextButton.setAttribute('disabled', 'disabled');

                passphrase2Input.setAttribute('disabled', 'disabled');
                showPassphrase2Checkbox.setAttribute('disabled', 'disabled');
                showPassphrase2Checkbox.checked = false;
                showPassphrase2CheckboxLabel.style.color = '#202020';
                showPassphrase2CheckboxLabel.style.pointerEvents = 'none';
                confirmButton.setAttribute('disabled', 'disabled');

                result.setAttribute('disabled', 'disabled');
                result.style.boxShadow = '0px';
                showPasswordCheckbox.setAttribute('disabled', 'disabled');
                showPasswordCheckbox.checked = false;
                showPasswordCheckboxLabel.style.color = '#202020';
                showPasswordCheckboxLabel.style.pointerEvents = 'none';

                generateButton.setAttribute('disabled', 'disabled');
                copyButton.setAttribute('disabled', 'disabled');

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

                setTimeout(() => {
                    alert('PASSPHRASE COMPROMISE ATTEMPT DETECTED!\nAll fields cleared, HBDPG-2 is stopped.\n\nClick the Clear button to reload HBDPG-2.');
                }, 10);
            }
        });
    });

    observer.observe(element, { attributes: true, attributeFilter: ['type'] });
}
