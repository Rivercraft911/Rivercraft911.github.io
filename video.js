document.getElementById('aiGenerated').addEventListener('click', function(event) {
    event.preventDefault(); 
    window.location.href = 'aiOrNot.html'; 
});

document.getElementById('human').addEventListener('click', function(event) {
    event.preventDefault();
    alert('Please try again.'); 
});
