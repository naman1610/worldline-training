const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');
const matchMessage = document.getElementById('match-message');

const requirements = {
    length: str => str.length >= 8,
    uppercase: str => /[A-Z]/.test(str),
    lowercase: str => /[a-z]/.test(str),
    number: str => /[0-9]/.test(str),
    special: str => /[^A-Za-z0-9]/.test(str)
};

function checkPasswordStrength(password) {
    if (password.length === 0) return { strength: '', score: 0 };
    if (password.length < 6) return { strength: 'weak', score: 33 };
    
    let score = 0;
    Object.values(requirements).forEach(test => {
        if (test(password)) score++;
    });

    if (score <= 2) return { strength: 'weak', score: 33 };
    if (score <= 4) return { strength: 'moderate', score: 66 };
    return { strength: 'strong', score: 100 };
}

function updateRequirements(password) {
    Object.keys(requirements).forEach(req => {
        const element = document.getElementById(req);
        if (requirements[req](password)) {
            element.classList.add('met');
        } else {
            element.classList.remove('met');
        }
    });
}

password.addEventListener('input', function() {
    const result = checkPasswordStrength(this.value);
    strengthBar.className = result.strength;
    strengthBar.style.width = `${result.score}%`;
    strengthText.textContent = result.strength ? 
        `Password Strength: ${result.strength.charAt(0).toUpperCase() + result.strength.slice(1)}` : '';
    updateRequirements(this.value);
    
    // Check password match
    if (confirmPassword.value) {
        checkPasswordMatch();
    }
});

function checkPasswordMatch() {
    if (password.value !== confirmPassword.value) {
        matchMessage.textContent = 'Passwords do not match';
    } else {
        matchMessage.textContent = '';
    }
}

confirmPassword.addEventListener('input', checkPasswordMatch);

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (password.value !== confirmPassword.value) {
        alert('Passwords do not match!');
        return;
    }
    // Add your form submission logic here
    alert('Form submitted successfully!');
});