const logoutBtn = $('#logout-link')

const logoutFunction = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    });

    if(response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log out');
    }
};

logoutBtn.click(logoutFunction);
