//LOAD
window.onload = render()

async function render() {
    let arraySize = document.getElementById("arraySizeInput");
    if (arraySizeInput.length != parseInt(arraySize.value)) {
        createArray(parseInt(arraySize.value));
    }
}

function createArray(inputValue) {
    let temp = [];
    const array = [];
    const numbers = [];
    let container = document.getElementById("container");
    for (i = 5; i <= 500; i++) {
        if (i % 5 == 0) {
            numbers.push(i);
        }
    }
    for (let i = 0; i < inputValue; i++) {
        temp.push(numbers[i]);
    }
    shuffle(temp)
    for (let i = 0; i < inputValue; i++) {
        number = temp[i];
        array.push('<div class="bar" id="' + i + '" style="height: ' + number + 'px"></div>');
    }
    container.innerHTML = array.join('');
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function delayTime(time) { 
    return new Promise(resolve => setTimeout(resolve, time));
}

function reset(){
    const item = document.querySelectorAll(".bar");
    if (item[0].style.background == "lime") {
        render();
    }
}

function disable() {
    document.querySelector("#insertionSort").disabled = true;
    document.querySelector("#arraySizeInput").disabled = true;
}

function enable() {
    document.querySelector("#insertionSort").disabled = false;
    document.querySelector("#arraySizeInput").disabled = false;
}

//SORTING FUNCTION

async function insertionSort() {
    disable();
    const item = document.querySelectorAll(".bar");
    let arraySpeed = document.getElementById("arraySpeedInput");
    item[0].style.background = "lime";
    for (let i = 1; i < item.length; i++) {
        let j = i - 1;
        let value = item[i].style.height;
        item[i].style.background = "skyblue";
        await delayTime(arraySpeed.value * -1);
        while (j >= 0 && (parseInt(item[j].style.height) > parseInt(value))) {
            item[i].style.background = "hotpink";
            item[j].style.background = "skyblue";
            item[j+1].style.height = item[j].style.height;
            j--;
            await delayTime(arraySpeed.value * -1);
            for (let n = i; n >= 0; n--) {
                item[n].style.background = "lime";
            }
        }
        item[j+1].style.height = value;
        item[i].style.background = "lime";
    }
    enable();
}