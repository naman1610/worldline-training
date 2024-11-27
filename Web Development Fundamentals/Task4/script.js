const form = document.getElementById('registrationForm');
        const submitBtn = document.getElementById('submitBtn');
        const submitTooltip = document.getElementById('submitTooltip');
        const passwordField = document.getElementById('password');
        const passwordTooltip = document.getElementById('passwordTooltip');

        const patterns = {
            fullName: /^[A-Za-z\s]{3,}$/,
            email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            phone: /^\d{10}$/
        };

        // Real-time email validation
        document.getElementById('email').addEventListener('keyup', function() {
            const validation = document.getElementById('emailValidation');
            if (this.value === '') {
                validation.textContent = '';
            } else if (patterns.email.test(this.value)) {
                validation.textContent = 'Valid email';
                validation.className = 'validation-message valid';
            } else {
                validation.textContent = 'Invalid email';
                validation.className = 'validation-message invalid';
            }
        });

        // Password strength indicator
        document.getElementById('password').addEventListener('keyup', function() {
            const strength = document.getElementById('passwordStrength');
            const value = this.value;
            let strengthLevel = 'Weak';
            let color = 'red';

            if (value.length >= 8) {
                if (patterns.password.test(value)) {
                    strengthLevel = 'Strong';
                    color = 'green';
                } else if (value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)) {
                    strengthLevel = 'Moderate';
                    color = 'orange';
                }
            }

            strength.textContent = `Password Strength: ${strengthLevel}`;
            strength.style.color = color;
        });

        // Password tooltip
        passwordField.addEventListener('mouseover', () => {
            passwordTooltip.style.display = 'block';
        });

        passwordField.addEventListener('mouseout', () => {
            passwordTooltip.style.display = 'none';
        });

        // Submit button tooltip
        submitBtn.addEventListener('mouseover', () => {
            if (!isFormValid()) {
                submitTooltip.style.display = 'block';
            }
        });

        submitBtn.addEventListener('mouseout', () => {
            submitTooltip.style.display = 'none';
        });

        function isFormValid() {
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const phone = document.getElementById('phone').value;

            return patterns.fullName.test(fullName) &&
                   patterns.email.test(email) &&
                   patterns.password.test(password) &&
                   patterns.phone.test(phone);
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Clear previous error messages
            document.querySelectorAll('.error-message').forEach(elem => elem.textContent = '');
            document.querySelectorAll('.validation-message').forEach(elem => elem.textContent = '');
            document.getElementById('passwordStrength').textContent = '';

            let hasErrors = false;

            // Validate full name
            if (!patterns.fullName.test(form.fullName.value)) {
                document.getElementById('fullNameError').textContent = 
                    'Name must contain only letters and spaces (minimum 3 characters)';
                hasErrors = true;
            }

            // Validate email
            if (!patterns.email.test(form.email.value)) {
                document.getElementById('emailError').textContent = 
                    'Please enter a valid email address';
                hasErrors = true;
            }

            // Validate password
            if (!patterns.password.test(form.password.value)) {
                document.getElementById('passwordError').textContent = 
                    'Password must meet all requirements';
                hasErrors = true;
            }

            // Validate phone
            if (!patterns.phone.test(form.phone.value)) {
                document.getElementById('phoneError').textContent = 
                    'Phone number must be exactly 10 digits';
                hasErrors = true;
            }

            if (!hasErrors) {
                alert('Form submitted successfully!');
                form.reset();
            }
        });