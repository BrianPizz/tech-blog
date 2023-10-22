const createBlogPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#content').value.trim();

    if (title && description) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-type': 'application/json' },
        });

        console.log(response)
        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText)
        }
    }
};

document.querySelector('#post').addEventListener('click', createBlogPost);
