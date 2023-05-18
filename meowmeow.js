document.getElementById('nay').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior
    window.location.href = 'index.html'; // Redirect to the original page
});

document.getElementById('yay').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior
    alert('Congrats!!'); // Show a message to the user
    window.location.href = 'congrats.html'; // Redirect to the congratulations page
});
