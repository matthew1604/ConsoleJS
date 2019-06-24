let textarea = document.getElementById('textarea'),
    autorunCheckbox = document.getElementById('autorun'),
    debugCheckbox = document.getElementById('debug'),
    undoButton = document.getElementById('undo'),
    redoButton = document.getElementById('redo'),
    executeButton = document.getElementById('execute'),
    clearButton = document.getElementById('clear'),
    result = document.getElementById('result');

function exec() {
    let str = "try{" + textarea.value + "}catch(e){clear(); if(debugCheckbox.checked) log(e);}";
    eval(str);
}

function log(...obj) {
    result.innerHTML = obj.toString();
}

function clear() {
    result.innerHTML = "";
}

function autorun() {
    setTimeout(function () {
        if (textarea.value !== "") {
            exec();
        } else clear();
    }, 100);
}

exec();

textarea.addEventListener("keydown", autorun);

autorunCheckbox.addEventListener("click", function() {
    if (autorunCheckbox.checked) {
        log = function(...obj) { result.innerHTML = obj.toString(); };
        textarea.addEventListener("keydown", autorun);
        exec();
    }
    else {
        log = function(...obj) { result.innerHTML += obj.toString(); };
        textarea.removeEventListener("keydown", autorun);
    }
});

debugCheckbox.addEventListener("click", exec);

undoButton.addEventListener("click", function () {
    document.execCommand('undo',false,"");
});

redoButton.addEventListener("click", function () {
    document.execCommand('redo',false,"");
});

executeButton.addEventListener("click", function () {
    clear();
    exec();
});

clearButton.addEventListener("click",clear);