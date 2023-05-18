document.getElementById('workplease').addEventListener('click', function(event) {
    console.log('Button clicked'); // This will log 'Button clicked' to the console when the button is clicked
    event.preventDefault(); // Prevent the default behavior
    window.location.href = 'video.html'; // Redirect to the video page
}); 
