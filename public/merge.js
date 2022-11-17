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
    document.querySelector("#mergeSort").disabled = true;
    document.querySelector("#arraySizeInput").disabled = true;
}

function enable() {
    document.querySelector("#mergeSort").disabled = false;
    document.querySelector("#arraySizeInput").disabled = false;
}

//SORTING FUNCTIONS

async function merge(item, low, mid, high) {
    let arraySpeed = document.getElementById("arraySpeedInput");
    const x = mid - low + 1;
    const y = high - mid;
    let left = [x];
    let right = [y];
    for (let i = 0; i < x; i++) {
        await delayTime(arraySpeed.value * -1);
        item[low+i].style.background = "skyblue";
        left[i] = item[low+i].style.height;
    }
    for (let i = 0; i < y; i++) {
        await delayTime(arraySpeed.value * -1);
        item[mid+1+i].style.background = "skyblue";
        right[i] = item[mid+i+1].style.height;
    }
    await delayTime(arraySpeed.value * -1);
    let i = 0;
    let j = 0;
    let n = low;
    while (i < x && j < y) {
        if (parseInt(left[i]) <= parseInt(right[j])) {
            item[n].style.background = "lime";
            item[n].style.height = left[i]
            i = i + 1;
            n = n + 1;
        }
        else {
            item[n].style.background = "lime";
            item[n].style.height = right[j];
            j = j + 1;
            n = n + 1;
        }
    }
    while (i < x) {
        item[n].style.background = "lime";
        item[n].style.height = left[i];
        i = i + 1;
        n = n + 1;
    }
    while (j < y) {
        item[n].style.background = "lime";
        item[n].style.height = right[j];
        j = j + 1;
        n = n + 1;
    }
}

async function mergeSortDriver(item, low, high) {
    if (low >= high) {
        return;
    }
    const mid = low + Math.floor((high - low) / 2);
    await mergeSortDriver(item, low, mid);
    await mergeSortDriver(item, mid + 1, high);
    await merge(item, low, mid, high);
}

async function mergeSort() {
    const item = document.querySelectorAll(".bar");
    let low = 0;
    let high = parseInt(item.length) - 1;
    disable();
    await mergeSortDriver(item, low, high);
    enable();
}
