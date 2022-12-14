const signupBtn = $('#signup-btn');

// a function that will handle signing in the user
const signupFormHandler = async (event) => {
    event.preventDefault();
    // grabbing the data that is entered
    const username = $('#username-input-signup').val().trim();
    const password = $('#password-input-signup').val().trim();
    // we need to fetch data from the api and make a post request when we click on the signup button
    if(username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
        });
        // if login is successful, bring the user to their dashboard page, otherwise alert to sign up error
        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Could not log in');
        }
    }
};

signupBtn.click(signupFormHandler);
