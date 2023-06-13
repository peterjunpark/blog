const newCommentBtn = document.querySelector('#new-comment-btn');
const newCommentForm = document.querySelector('#new-comment-form');

async function publish(e) {
  e.preventDefault();

  const comment = {
    body: document.querySelector('#comment-body').value.trim(),
    postId: document.querySelector('#post').getAttribute('data-post-id'),
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

newCommentBtn.addEventListener('click', () => {
  newCommentForm.classList.remove('d-none');
  newCommentBtn.classList.add('d-none');
});

newCommentForm.addEventListener('submit', publish);
