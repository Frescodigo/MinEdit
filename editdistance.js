const sourceInput = document.getElementById('source-input');
const targetInput = document.getElementById('target-input');
const calculateButton = document.getElementById('calculate-button');


// calculateButton.addEventListener("click", (event) => {
//     const source = sourceInput.value;
//     console.log(source)
// })

function insertCost(insertedChar) {
    return 1;
}
function substituteCost(prevChar, insertedChar) {
    return prevChar === insertedChar ? 0 : 2;
}
function deleteCost(deletedChar) {
    return 1;
}

function calculateDistance(source, target) {
    const sourceLen = source.length;
    const targetLen = target.length;

    const distanceMatrix =
        new Array(targetLen + 1).fill(0).map(() => new Array(sourceLen + 1).fill(0));
    
    distanceMatrix.forEach(row => console.log(...row));

    return 0;
}

calculateButton.onclick = (event) => {
    const source = sourceInput.value;
    const target = targetInput.value;

    const editDistance = calculateDistance(source, target);

    console.log(source, target)
}