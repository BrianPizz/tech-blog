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

const deleteBlogPost = async (event) => {
    if (event.target.classList.contains('btn-delete')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/post/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete blog post');
        }
    }
}

document.querySelector('#post').addEventListener('click', createBlogPost);

document.querySelector('.post-list').addEventListener('click', deleteBlogPost);