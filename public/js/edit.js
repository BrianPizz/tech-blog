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
    }
}

document.querySelector('.btn').addEventListener('click', deleteBlogPost);