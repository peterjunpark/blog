const newPostForm = document.querySelector('#new-post-form');

async function publish(e) {
  e.preventDefault();

  const post = {
    title: document.querySelector('#post-title').value.trim(),
    body: document.querySelector('#post-body').value.trim(),
  };

  console.log(post);

  try {
    const response = await fetch('/api/post/', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Could not post content');
    }
  } catch (err) {
    console.error(err);
  }
}

newPostForm.addEventListener('submit', publish);
