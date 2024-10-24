document.getElementById('nay').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'index.html'; 
});

document.getElementById('yay').addEventListener('click', function(event) {
    event.preventDefault();
    alert('Congrats!!');
    window.location.href = 'congrats.html';
});
