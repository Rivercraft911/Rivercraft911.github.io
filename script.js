document.addEventListener('DOMContentLoaded', function() {
    if (getCookie('buttonClicked')) {
        disableButton();
    }

    if (getCookie('cookiesAccepted')) {
        hideCookieBanner();
    }
});

document.getElementById('submitBtn').addEventListener('click', function(event) {
    event.preventDefault(); 
    checkCaptcha();
    setCookie('buttonClicked', true, 1);
    disableButton();
});

document.getElementById('acceptCookies').addEventListener('click', function() {
    setCookie('cookiesAccepted', true, 1);
    hideCookieBanner();
});

function checkCaptcha() {
    const userInput = document.getElementById('captchaInput').value;
    if (userInput.toLowerCase() === 'b') {
        // redirect to  chess
        window.location.href = 'chess.html';
    } else {
        alert("Incorrect! Try again.");
    }
}

function disableButton() {
    var button = document.getElementById('submitBtn');
    button.disabled = true;
    button.style.backgroundColor = '#cccccc';
    button.style.cursor = 'not-allowed';
}

function hideCookieBanner() {
    var banner = document.getElementById('cookieBanner');
    banner.style.display = 'none';
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
