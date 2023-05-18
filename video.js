document.getElementById('aiGenerated').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior
    window.location.href = 'aiOrNot.html'; // Redirect to the next page
});

document.getElementById('human').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior
    alert('Please try again.'); // Show a message to the user to try again
});
