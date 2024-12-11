/*  (c) 2024 Piotr Kniaz

    This file is part of HBDPG-2.
    Repository: https://github.com/HBDPG-2/hbdpg-2.github.io

    Licensed under the MIT License. See LICENSE file in the project root for details.
*/

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
const clearClipboardCheckbox = document.getElementById('clearClipboardCheckbox');
const clearClipboardCheckboxLabel = document.getElementById('clearClipboardCheckboxLabel');
const result = document.getElementById('result');
const timeCount = document.getElementById('timeCount');
const entropyCount = document.getElementById('entropyCount');
// Dialogs
const closeAlertButton = document.getElementById('closeAlertButton');
const confirmDontClearClipboardDialogBox = document.getElementById('confirmDontClearClipboardDialogBox');
const dontClearClipboardCancelButton = document.getElementById('dontClearClipboardCancelButton');
const dontClearClipboardConfirmButton = document.getElementById('dontClearClipboardConfirmButton');
const updateAlert = document.getElementById('updateAlert');
const updateButton = document.getElementById('updateButton');

// Preload images
(new Image()).src = 'images/loading.webp';