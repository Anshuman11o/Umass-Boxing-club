// contact.js

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from refreshing the page
  
    const name = document.querySelector('input[placeholder="Name"]').value;
    const email = document.querySelector('input[placeholder="Email"]').value;
    const phone = document.querySelector('input[placeholder="Phone Number"]').value;
    const message = document.querySelector('input[placeholder="Message"]').value;
  
    // Simple validation
    if (!name || !email || !message) {
      alert('Name, Email, and Message are required!');
      return;
    }
  
    // Send form data to the backend
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone || 'N/A', // Optional field
        message: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Your message has been sent successfully!');
          document.querySelector('form').reset(); // Clear the form
        } else {
          alert('There was a problem sending your message. Please try again.');
        }
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
  });