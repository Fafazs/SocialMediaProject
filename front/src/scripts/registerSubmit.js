const registroForm = document.getElementById('registerForm');

function validateForm(formData) {
    const { name, email, password, passwordConfirmation, role } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let errors = [];

    // Validating if the fields are filled
    if (!name || name.trim() === "") {
        errors.push('You need to fill out the Name field.');
    }

    if (!email || email.trim() === "") {
        errors.push('You need to fill out the Email field.');
    }

    if (!password || password.trim() === "") {
        errors.push('You must fill out the Password field.');
    }

    if (!passwordConfirmation || passwordConfirmation.trim() === "") {
        errors.push('You must fill out the Password Confirmation field.');
    }

    if (!role || role.trim() === "") {
        errors.push('Please select a role to better align with the purposes of this social network.');
    }

    // Email format validation
    if (!emailRegex.test(email)) {
        errors.push('Invalid email format.');
    }

    // Password validations
    if (password) {
        if (!/[A-Z]/.test(password)) {
            errors.push('Invalid password format: Add at least one uppercase letter.');
        }

        if (!/\d/.test(password)) {
            errors.push('Invalid password format: Add at least one number.');
        }

        if (!/[@#$%^&+=!]/.test(password)) {
            errors.push('Invalid password format: Add at least one special character.');
        }

        if (password.length < 8) {
            errors.push('The password must be at least 8 characters long.');
        }

        if (password.length > 30) {
            errors.push('The password is too long.');
        }

        if (passwordConfirmation && passwordConfirmation !== password) {
            errors.push('Passwords do not match.');
        }
    }

    return errors;
}

function showErrors(errors) {
    const errorContainer = document.getElementById("error-box");
    errorContainer.innerHTML = "";
    if (errors.length > 0) {
        errors.forEach((erro) => {
            const errorItem = document.createElement("li");
            errorItem.textContent = erro;
            errorContainer.appendChild(errorItem);
        });
    } else {
        alert("Form submitted successfully!");
    }
}

registroForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = {
        name: registroForm.elements['name'].value,
        email: registroForm.elements['email'].value,
        age: registroForm.elements['age'].value,
        password: registroForm.elements['password'].value,
        passwordConfirmation: registroForm.elements['passwordConfirmation'].value,
        role: registroForm.elements['role'].value,
    }

    const error = await validateForm(formData);
    if (error.length > 0) {
        showErrors(error);
    } else {
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Form submitted successfully!");
                registroForm.reset();
            }
            if (!response.ok) {
                const errorData = await response.json();
                showErrors([errorData.message || "Error submitting the form."]);
            }
        } catch (err) {
            showErrors(["Error submitting the form. Please try again later."]);
        }
    }
});



