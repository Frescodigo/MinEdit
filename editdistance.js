const sourceInput = document.getElementById('source-input');
const targetInput = document.getElementById('target-input');
const calculateButton = document.getElementById('calculate-button');
const distanceOutput = document.getElementById('distance-output');
const matrixTable = document.getElementById('distance-matrix')

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

    return [distanceMatrix, distanceMatrix[sourceLen][targetLen]];
}

function updateTable(matrix, source, target) {
    matrixTable.innerHTML = ''

    const sourceLen = source.length;
    const targetLen = target.length;

    for (let r = 0; r <= sourceLen + 1; r++) {
        const tableRow = document.createElement('tr')
        for (let c = 0; c <= targetLen + 1; c++) {
            const tableCell = document.createElement('td');

            if (c == 0 && r > 1) {
                tableCell.innerText = source[r - 2];
            }
            else if (r == 0 && c > 1) {
                tableCell.innerText = target[c - 2];
            }
            else if (r > 1 && c > 1) {
                tableCell.innerHTML = matrix[r - 1][c - 1];
            }
            tableRow.appendChild(tableCell);
        }
        matrixTable.appendChild(tableRow);
    }
}

calculateButton.onclick = (event) => {
    const source = sourceInput.value;
    const target = targetInput.value;

    const [distanceMatrix, editDistance] = calculateDistance(source, target);
    distanceOutput.value = editDistance;

    updateTable(distanceMatrix, source, target);
}