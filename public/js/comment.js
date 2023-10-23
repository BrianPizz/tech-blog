const addCommentHandler = async (event) => {
    event.preventDefault();
    // grab url
    const url = window.location.href;

    // extract blogpost id number from url
    const match = url.match(/\/post\/(\d+)/);

    const targetId = match[1];

    if (match) {
        const comment = document.querySelector('#comment').value.trim();

        if (comment) {
            const response = await fetch('/api/comment', {
                method: 'POST',
                body: JSON.stringify({ comment, targetId }),
                headers: { 'Content-type': 'application/json' },
            });

            console.log(comment)
            if (response.ok) {
                document.location.reload()
            } else {
                alert('Failed to add comment');
            }
        }
    }

};

const deleteComment = async(event) => {
    
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comment/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to delete blog post');
    }
};

const commentDeleteBtn = document.querySelectorAll('.btn-delete-comment');

commentDeleteBtn.forEach((button) => {
    button.addEventListener('click', deleteComment);
});

document.querySelector('#postComment').addEventListener('click', addCommentHandler);