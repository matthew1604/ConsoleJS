var textarea = document.getElementById('textarea'),
    autorunCheckbox = document.getElementById('autorun'),
    debugCheckbox = document.getElementById('debug'),
    executeButton = document.getElementById('execute'),
    clearButton = document.getElementById('clear'),
    result = document.getElementById('result'),
    str = textarea.value;

function log(...obj) {
    result.innerHTML = obj.toString();
}

function clear() {
    result.innerHTML = "";
}

function autorun() {
    setTimeout(function () {
        if (textarea.value !== "") {
            str = "try{" + textarea.value + "}catch(e){if(debugCheckbox.checked) {clear(); log(e)}}";
            eval(str);
        } else clear();
    }, 100);
}

eval(str);

textarea.addEventListener("keydown", autorun);

autorunCheckbox.addEventListener("click", function() {
    if (autorunCheckbox.checked) {
        textarea.addEventListener("keydown", autorun);
        executeButton.style.display = "none";
        log = function(...obj) { result.innerHTML = obj.toString(); };
    }
    else {
        textarea.removeEventListener("keydown", autorun);
        executeButton.style.display = "";
        log = function(...obj) { result.innerHTML += obj.toString(); };
    }
});

executeButton.addEventListener("click", function () {
    str = "try{" + textarea.value + "}catch(e){clear(); log(e)}";
    clear();
    eval(str);
});

clearButton.addEventListener("click",clear);