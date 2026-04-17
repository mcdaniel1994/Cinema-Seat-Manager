import { initializeSeating, displaySeating, reserveSeat, countSeats, findAdjacentSeats } from "./cinema.js";

const GREEN = "\x1b[32m";
const RESET = "\x1b[0m";
const SEP = GREEN + "=========================================================" + RESET;

export function runTestScenarios(): void {

// ========================= EXTRA SCENARIO TESTING =========================
// Empty Room
console.log("\n" + GREEN + "==================== SCENARIO 1: Empty Room ====================" + RESET);
const emptySeating = initializeSeating();
displaySeating(emptySeating);
const emptyCounts = countSeats(emptySeating);
console.log(`Occupied: ${emptyCounts.occupied} | Available: ${emptyCounts.available}`);
const emptyAdjacent = findAdjacentSeats(emptySeating);
if (emptyAdjacent) {
    console.log(`✅ Adjacent seats found at Row ${emptyAdjacent.row}, Cols ${emptyAdjacent.col} & ${emptyAdjacent.col + 1}`);
}
console.log(SEP);

// SCENARIO 2: Partially Filled
console.log("\n" + GREEN + "==================== SCENARIO 2: Partially Filled ====================" + RESET);
const partialSeating = initializeSeating();
console.log(reserveSeat(partialSeating, 1, 3));
console.log(reserveSeat(partialSeating, 2, 7));
console.log(reserveSeat(partialSeating, 4, 1));
displaySeating(partialSeating);
const partialCounts = countSeats(partialSeating);
console.log(`Occupied: ${partialCounts.occupied} | Available: ${partialCounts.available}`);
console.log(SEP);

// SCENARIO 3: Scattered Singles - No Adjacent Pairs
console.log("\n" + GREEN + "==================== SCENARIO 3: Scattered Singles ====================" + RESET);
const scatteredSeating = initializeSeating();
for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 10; col += 2) {
        reserveSeat(scatteredSeating, row, col);
    }
}
displaySeating(scatteredSeating);
const scatteredAdjacent = findAdjacentSeats(scatteredSeating);
if (scatteredAdjacent) {
    console.log(`✅ Adjacent seats found at Row ${scatteredAdjacent.row}, Cols ${scatteredAdjacent.col} & ${scatteredAdjacent.col + 1}`);
} else {
    console.log(`❌ No adjacent seats available.`);
}
console.log(SEP);

// SCENARIO 4: Full Room
console.log("\n" + GREEN + "==================== SCENARIO 4: Full Room ====================" + RESET);
const fullSeating = initializeSeating();
for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 10; col++) {
        reserveSeat(fullSeating, row, col);
    }
}
displaySeating(fullSeating);
const fullCounts = countSeats(fullSeating);
console.log(`Occupied: ${fullCounts.occupied} | Available: ${fullCounts.available}`);
const fullAdjacent = findAdjacentSeats(fullSeating);
if (fullAdjacent) {
    console.log(`✅ Adjacent seats found at Row ${fullAdjacent.row}, Cols ${fullAdjacent.col} & ${fullAdjacent.col + 1}`);
} else {
    console.log(`❌ No adjacent seats available.`);
}
console.log(SEP);

}