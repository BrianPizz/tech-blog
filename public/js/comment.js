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

document.querySelector('#postComment').addEventListener('click', addCommentHandler);