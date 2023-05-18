document.getElementById('aiGenerated').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior
    window.location.href = '.io'; // Redirect to the next page
});

document.getElementById('human').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior
    alert('congrats!!'); // Show a message to the user to try again
});
