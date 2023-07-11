var keyboard = document.querySelector(".calculator-keyboard");
var storage = document.querySelector(".calculator-storage");
var show = document.querySelector(".calculator-show");
var arr = [];
var calStr = "";
keyboard.addEventListener("click", pressKeyboard);
init();

function init() {
    calStr = "";
    arr = [];
    storage.innerHTML = "0";
    show.innerHTML = "0";
}

function storeStr(str) {
   if (calStr == "0") {
        calStr = "";
        calStr += str;
    } else {
       calStr += str;
    }

    updateShow();
    updateStorage();
}

function storeZero(str) {
    if (calStr == ""  || calStr == "0" ) {
        calStr = "0";
    } else {
        calStr += str;
    }
    updateShow();
    updateStorage();
}

function sentStr() {
    if (calStr != "") {
        arr.push(calStr);
        calStr = "";
    }
    updateShow();
    updateStorage();
}

function updateOperator(str) {
    var num = Number(arr[arr.length - 1]);
    if (isNaN(num)) {
        arr.pop();
    }
    if (str == "x") {
        arr.push("*");
    } else if (str == "÷") {
        arr.push("/");
    } else {
        arr.push(str);
    }
    updateShow();
    updateStorage();
}

function addPoint() {
    if (calStr == "") {
        calStr = "0.";
    } else if (!(calStr.includes("."))) {
        calStr += ".";
    }
    updateShow();
    updateStorage();
}
function calSum() {
    var num = Number(arr[arr.length - 1]);
    if (isNaN(num) && calStr == "" && arr[arr.length - 1]!=')') {
        arr.pop();
    } else {
        sentStr();
    }
    var arrAnswer = eval(arr.join(""));
    var strAnswer = parseFloat(arrAnswer).toPrecision(12);
    var answer = parseFloat(strAnswer);
    answer = answer.toFixed(2);
    if(strAnswer==="NaN")
        answer="Error";
    updateShow(answer);
    updateStorage();
}
function delStr() {
    if (calStr == "") {
        arr.pop();
    } else {
        calStr = calStr.substring(0, calStr.length - 1);
    }
    updateShow();
    updateStorage();
}
function addComma(data) {
    if (data.includes(".")) {
        return data.replace(/\d(?=(?:\d{3})+\b\.)/g, '$&,');
    } else {
        return data.replace(/\d(?=(?:\d{3})+\b)/g, '$&,');
    }
}

function updateShow(answer) {
    var showText = "";
    if (typeof (answer) == "undefined") {
        showText = addComma(calStr);
    } else {
        showText = addComma(answer.toString());
    }
    show.innerHTML = showText;
}

function updateStorage() {
    var commaArr = arr.slice();
    var storageText = "";
    for (let i = 0; i < commaArr.length; i++) {
        commaArr[i] = addComma(commaArr[i]);
    }
    if (typeof (arr[0]) == "undefined") {
        storageText = addComma(calStr);
    } else {
        storageText = commaArr.join("");
    }
    storage.innerHTML = storageText;
}
function bracket(str){
    var num = Number(arr[arr.length - 1]);
    if (isNaN(num)&& str=='(') {
        arr.push(str);
        updateShow();
        updateStorage();
    }
    else if(str==')' && arr[arr.length - 1]!='('){
        arr.push(str);
        updateShow();
        updateStorage();
    }
}

function pressKeyboard(e) {
    var str = e.target.textContent;
    if (str.length <= 2) {
        switch (str) {
            case "+":
            case "-":
            case "x":
            case "÷":
                sentStr();
                updateOperator(str);
                break;
            case "=":
                calSum();
                break;
            case "0":
                storeZero(str);
                break;
            case "CE":
                init();
                break;
            case "⌫":
                delStr();
                break;
            case ".":
                addPoint();
                break;
            case "(":
            case ")":
                sentStr();
                bracket(str);
                break;
            default:
                storeStr(str);
                break;
        }
    }
}

window.addEventListener('keydown', presskeydown);
function presskeydown(event) {
    var str = event.keyCode;
        switch (str) {
            case 107:
                sentStr();
                updateOperator("+");
                break;
            case 109:
                sentStr();
                updateOperator("-");
                break;
            case 106:
                sentStr();
                updateOperator("*");
                break;
            case 111:
                sentStr();
                updateOperator("/");
                break;
            case 13:
                calSum();
                break;
            case 96:
                storeZero("0");
                break;
            case 8:
                delStr();
                break;
            case 110:
                addPoint(".");
                break;
            case 57:
                sentStr();
                bracket("(");
                break;
            case 48:
                sentStr();
                bracket(")");
                break;
            default:
                storeStr(event.key);
                break;
    }
}