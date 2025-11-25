// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const togglePasswordBtns = document.querySelectorAll('[id^="togglePassword"]');

    // Password visibility toggle
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    });

    // Login form handling
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const spinner = submitBtn.querySelector('.spinner-border');
            submitBtn.disabled = true;
            spinner.classList.remove('d-none');

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password, remember })
                });

                const data = await response.json();

                if (response.ok) {
                    // Store token and redirect
                    localStorage.setItem('token', data.token);
                    window.location.href = '/pages/account.html';
                } else {
                    throw new Error(data.message || 'Login failed');
                }
            } catch (error) {
                showAlert('error', error.message);
            } finally {
                submitBtn.disabled = false;
                spinner.classList.add('d-none');
            }
        });
    }

    // Register form handling
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            // Password confirmation validation
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                document.getElementById('confirmPassword').setCustomValidity('Passwords do not match');
                this.classList.add('was-validated');
                return;
            }

            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                password: password
            };

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const spinner = submitBtn.querySelector('.spinner-border');
            submitBtn.disabled = true;
            spinner.classList.remove('d-none');

            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    showAlert('success', 'Registration successful! Redirecting to login...');
                    setTimeout(() => {
                        window.location.href = '/pages/login.html';
                    }, 2000);
                } else {
                    throw new Error(data.message || 'Registration failed');
                }
            } catch (error) {
                showAlert('error', error.message);
            } finally {
                submitBtn.disabled = false;
                spinner.classList.add('d-none');
            }
        });

        // Real-time password confirmation validation
        document.getElementById('confirmPassword').addEventListener('input', function() {
            const password = document.getElementById('password').value;
            if (this.value === password) {
                this.setCustomValidity('');
            } else {
                this.setCustomValidity('Passwords do not match');
            }
        });
    }
});

// Alert component
function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : 'success'} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    alertDiv.style.zIndex = '1050';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.appendChild(alertDiv);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Password strength indicator
if (document.getElementById('password')) {
    document.getElementById('password').addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        updatePasswordStrengthIndicator(strength);
    });
}

function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    return strength;
}

function updatePasswordStrengthIndicator(strength) {
    const strengthText = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const strengthColor = ['danger', 'warning', 'info', 'primary', 'success'];
    
    // Update strength indicator if it exists
    const indicator = document.getElementById('passwordStrength');
    if (indicator) {
        indicator.textContent = strengthText[strength - 1];
        indicator.className = `text-${strengthColor[strength - 1]}`;
    }
}