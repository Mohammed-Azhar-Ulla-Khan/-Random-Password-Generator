// Get DOM elements
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const passwordField = document.getElementById("password");
const strengthText = document.getElementById("strengthText");
const strengthBar = document.getElementById("strengthBar");

// Update displayed password length when slider moves
lengthInput.addEventListener("input", () => {
    lengthValue.textContent = lengthInput.value;
});

// Function to generate random password
function generatePassword() {
    // Get user-selected options
    const length = lengthInput.value;
    const includeUppercase = document.getElementById("uppercase").checked;
    const includeLowercase = document.getElementById("lowercase").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeSymbols = document.getElementById("symbols").checked;

    // Character sets
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/";

    // Build the character set based on user choices
    let charSet = "";
    if (includeUppercase) charSet += uppercaseChars;
    if (includeLowercase) charSet += lowercaseChars;
    if (includeNumbers) charSet += numberChars;
    if (includeSymbols) charSet += symbolChars;

    // If no character set is selected, show an error
    if (charSet === "") {
        passwordField.value = "Select at least one option";
        strengthText.textContent = "-";
        strengthBar.className = "";
        return;
    }

    // Generate password
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }

    // Display generated password
    passwordField.value = password;

    // Check password strength
    checkStrength(password);
}

// Function to check password strength
function checkStrength(password) {
    let strength = 0;

    // Criteria for strength levels
    if (password.length >= 8) strength++;  // Minimum length
    if (password.length >= 12) strength++; // Stronger length
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++; // Upper & lower case
    if (/[0-9]/.test(password)) strength++; // Includes numbers
    if (/[^A-Za-z0-9]/.test(password)) strength++; // Includes symbols

    // Update UI based on strength level
    if (strength <= 2) {
        strengthText.textContent = "Weak";
        strengthBar.className = "weak";
    } else if (strength <= 4) {
        strengthText.textContent = "Medium";
        strengthBar.className = "medium";
    } else {
        strengthText.textContent = "Strong";
        strengthBar.className = "strong";
    }
}

// Function to copy password to clipboard
function copyPassword() {
    passwordField.select();
    document.execCommand("copy");
    alert("Password copied to clipboard!");
}
