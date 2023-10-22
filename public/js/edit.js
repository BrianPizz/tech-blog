const deleteBlogPost = async (event) => {

    if (event.target.classList.contains('btn-delete')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/post/${id}`, {
            method: 'DELETE',
        });

        console.log(response)
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete blog post');
        }
    };
};

const updateBlogPost = async (event) => {

    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#content').value.trim();
    const id = document.querySelector('.btn-edit').getAttribute('data-id');

    console.log(id)

    if (title && description) {
        const response = await fetch(`/api/post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-type': 'application/json' },
        });

        console.log(response)
        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText)
        }
    };
}

document.querySelector('.btn-delete').addEventListener('click', deleteBlogPost);
document.querySelector('.btn-update').addEventListener('click', updateBlogPost);
