document.getElementById('leftGenerated').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior
    window.location.href = 'meowmeow.html'; // Redirect to the next page if left is the correct answer
});

document.getElementById('rightGenerated').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior
    alert('Please try again.'); // Show a message to the user to try again if right is not the correct answer
});
