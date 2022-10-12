// grabbing DOM variables with jQuery
const loginBtn = $('#login-btn');

// a function that will handle logging in the user
const loginFormHandler = async (event) => {
    event.preventDefault();
    // grabbing the data that is entered
    const username = $('#username-input-login').val().trim();
    const password = $('#password-input-login').val().trim();
    // we need to fetch data from the api and make a post requestwhen we click on the login button
    if(username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
        });

        // if login is successful, bring the user to their dashboard page, otherwise alert to login error
        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Could not log in');
        }
    }
};

loginBtn.click(loginFormHandler);
