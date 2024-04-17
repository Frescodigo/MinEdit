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

    const distanceMatrix = new Array(sourceLen + 1).fill(0)
        .map(() => new Array(targetLen + 1).fill(0));

    /*
    abc -> abcd

    [
        [,,,,],
        [,,,,],
        [,,,,],
        [,,,,],
    ]

    c   3   2   1   0   1
    b   2   1   0   1   2
    a   1   0   1   2   3
        0   1   2   3   4
            a   b   c   d

    */

    // initialize the first columm
    for (let i = 1; i <= sourceLen; i++) {
        distanceMatrix[i][0] = i * deleteCost(source[i] - 1);
    }
    // initialize the first row
    for (let j = 1; j <= targetLen; j++) {
        distanceMatrix[0][j] = j * insertCost(target[j] - 1)
    }

    for (let i = 1; i <= sourceLen; i++) {
        for (let j = 1; j <= targetLen; j++) {
            const sourceLetter = source[i - 1];
            const targetLetter = target[j - 1];

            const delCost = distanceMatrix[i - 1][j] + deleteCost(sourceLetter);
            const subCost = distanceMatrix[i - 1][j - 1] + substituteCost(sourceLetter, targetLetter);
            const insCost = distanceMatrix[i][j - 1] + insertCost(targetLetter);

            distanceMatrix[i][j] = Math.min(delCost, subCost, insCost);
        }
    }

    console.log(distanceMatrix);

    return 0;
}

calculateButton.onclick = (event) => {
    const source = sourceInput.value;
    const target = targetInput.value;

    const editDistance = calculateDistance(source, target);

    console.log(source, target)
}