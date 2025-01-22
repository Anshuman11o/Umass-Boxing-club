// newsletter.js

document.getElementById('newsletterForm').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById('subscriberName').value;
  const email = document.getElementById('subscriberEmail').value;

  try {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });

    const data = await response.json();
    
    const messageElement = document.getElementById('newsletterMessage');
    messageElement.style.display = 'block';
    
    if (data.success) {
      messageElement.textContent = 'Thank you for subscribing to our newsletter!';
      messageElement.style.color = 'green';
    } else {
      messageElement.textContent = 'There was an error subscribing. Please try again later.';
      messageElement.style.color = 'red';
    }
  } catch (error) {
    console.error('Error:', error);
  }
});