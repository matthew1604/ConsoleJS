let interval,
    textarea = document.getElementById('textarea'),
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
    interval = setInterval(function () {
        if (textarea.value !== "") exec();
        else clear();
    }, 150);
}

exec();
autorun();

autorunCheckbox.addEventListener("click", function() {
    if (autorunCheckbox.checked) {
        log = function(...obj) { result.innerHTML = obj.toString(); };
        autorun();
    }
    else {
        log = function(...obj) { result.innerHTML += obj.toString(); };
        clearInterval(interval);
    }
});

debugCheckbox.addEventListener("click", function () {
    clear();
    exec();
});

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

clearButton.addEventListener("click",function () {
    document.getElementById("modal").style.display = "";
});

document.getElementById('yes').addEventListener("click", function () {
    textarea.value = "";
    clear();
    document.getElementById("modal").style.display = "none";
});

document.getElementById('no').addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
});