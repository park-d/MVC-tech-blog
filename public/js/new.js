const newPostBtn = $('#new-form-btn');

const newPostHandler = async (event) => {
    event.preventDefault();

    const title = $('input[name="post-title"]').val().trim();
    const body = $('textarea[name="post-body"]').val().trim();

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({title, body,}),
        headers: {'Content-Type': 'application/json'},
    });

    if(response.ok) {
        console.log(response)
        document.location.replace('/dashboard');
 
    } else {
        alert('Failed to post');
    }
};

newPostBtn.click(newPostHandler)
