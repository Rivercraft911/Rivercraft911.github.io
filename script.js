document.getElementById('submitBtn').addEventListener('click', function() {
    alert("They are cloning in the woods");
    this.disabled = true;
    this.style.backgroundColor = '#cccccc';
    this.style.cursor = 'not-allowed';
});
