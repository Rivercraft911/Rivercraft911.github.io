document.getElementById('submitBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior
    alert("They are cloning in the woods");
    var button = document.getElementById('submitBtn');
    button.disabled = true;
    button.style.backgroundColor = '#cccccc';
    button.style.cursor = 'not-allowed';
});
