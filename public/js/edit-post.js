const newCommentBtn = document.querySelector('#new-comment-btn');
const newCommentForm = document.querySelector('#new-comment-form');
const editBtnGroup = document.querySelector('#edit-btn-group');
const deletePostBtn = document.querySelector('#delete-post-btn');
const editPostBtn = document.querySelector('#edit-post-btn');
const currentPost = document
  .querySelector('#post')
  .getAttribute('data-post-id');

async function publishComment(e) {
  e.preventDefault();

  const comment = {
    body: document.querySelector('#comment-body').value.trim(),
    postId: currentPost,
  };

  try {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      window.location.reload();
    }
  } catch (err) {
    console.error(err);
  }
}

async function deletePost() {
  alert('delete');
  const response = await fetch(`/api/post/${currentPost}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  }
}

async function editPost() {
  alert('edit');
  editBtnGroup.classList.add('d-none');
}

newCommentBtn.addEventListener('click', () => {
  newCommentForm.classList.remove('d-none');
  newCommentBtn.classList.add('d-none');
});
newCommentForm.addEventListener('submit', publishComment);
deletePostBtn.addEventListener('click', deletePost);
editPostBtn.addEventListener('click', editPost);
