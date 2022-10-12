const signupBtn = $('#signup-btn');

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = $('#username-input-signup').val().trim();
    const password = $('#password-input-signup').val().trim();

    if(username && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to log in');
        }
    }
};

signupBtn.click(signupFormHandler);
