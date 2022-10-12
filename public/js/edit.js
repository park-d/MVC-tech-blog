const postId = $('input[name="post-id"]').val();
const editBtn = $('#edit-btn');
const deleteBtn = $('#delete-btn')

const editPostHandler = async (event) => {
    event.preventDefault();

    const title = $('input[name="post-title"]').val().trim();
    const body = $('textarea[name="post-body"]').val().trim();

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({title,body}),
        headers: {'Content-Type': 'application/json'}        
    });

    if(response.ok) {
        console.log(response);
        document.location.replace('/dashboard');

    } else {
        alert('Failed to post');
    }


    document.location.replace('/dashboard');
};

const deletePostHandler = async (event) => {
    event.preventDefault();
    await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    });

    document.location.replace('/dashboard');
};

editBtn.click(editPostHandler);
deleteBtn.click(deletePostHandler);
