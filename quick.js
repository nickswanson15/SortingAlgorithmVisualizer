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
    document.querySelector("#quickSort").disabled = true;
    document.querySelector("#arraySizeInput").disabled = true;
}

function enable() {
    document.querySelector("#quickSort").disabled = false;
    document.querySelector("#arraySizeInput").disabled = false;
}

//SORTING FUNCTIONS

async function partition(item, l, r) {
    let i = l - 1;
    item[r].style.background = "skyblue";
    let arraySpeed = document.getElementById("arraySpeedInput");
    for (let j = l; j <= r - 1; j++) {
        item[j].style.background = "skyblue";
        await delayTime(arraySpeed.value * -1);
        if (parseInt(item[j].style.height) < parseInt(item[r].style.height)) {
            i = i + 1;
            let temp = item[i].style.height;
            item[i].style.height = item[j].style.height;
            item[j].style.height = temp;
            item[i].style.background = "hotpink";
            if (i != j) {
                item[j].style.background = "hotpink";
            }
        }
        else {
            item[j].style.background = "hotpink";
        }
    }
    i = i + 1; 
    let temp = item[i].style.height;
    item[i].style.height = item[r].style.height;
    item[r].style.height = temp;
    item[i].style.background = "lime";
    await delayTime(arraySpeed.value * -1);
    for (let n = 0; n < item.length; n++) {
        if (item[n].style.background != "lime") {
            item[n].style.background = "hotpink";
        }
    }
    return i;
}

async function quickSortDriver(item, l, r) {
    if (l < r) {
        let pivot = await partition(item, l, r);
        await quickSortDriver(item, l, pivot - 1);
        await quickSortDriver(item, pivot + 1, r);
    }
    else {
        if (l >= 0 && r >= 0 && l < item.length && r < item.length) {
            item[l].style.background = "lime";
            item[r].style.background = "lime";
        }
    }
}

async function quickSort() {
    const item = document.querySelectorAll(".bar");
    let l = 0;
    let r = item.length - 1;
    disable();
    await quickSortDriver(item, l, r);
    enable();
}