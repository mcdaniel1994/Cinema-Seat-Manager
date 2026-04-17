import * as readline from "readline";
import { initializeSeating, displaySeating, countSeats, findAdjacentSeats, reserveSeat } from "./cinema.js";
import { runTestScenarios } from "./test_cinema.js";

const GREEN = "\x1b[32m";
const BLUE  = "\x1b[34m";
const RESET = "\x1b[0m";
const SEP      = GREEN + "=========================================================" + RESET;
const BLUE_SEP = BLUE  + "=========================================================" + RESET;

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Initialize the seating chart
let seating = initializeSeating();

// Display the main dashboard menu
function showDashboard(): void {
    console.log("\n" + BLUE + "================= CINEMA SEAT MANAGER =================" + RESET);
    console.log("  Welcome to the Cinema Seat Reservation System");
    console.log(BLUE_SEP);
    console.log("  1. View Current Seating Chart");
    console.log("  2. Reserve a Seat");
    console.log("  3. Count Available / Occupied Seats");
    console.log("  4. Find Adjacent Seats");
    console.log("  5. Reset All Reservations");
    console.log("  6. Run Test Scenarios");
    console.log("  7. Exit");
    console.log(BLUE_SEP + "\n");
}

function main(): void {
    showDashboard();
    rl.question("  Select an option (1-7): ", (answer: string) => {
        if (answer === "1") {
            displaySeating(seating);
            main();
        } else if (answer === "2") {
            const askReserve = () => {
                rl.question("  Enter row (1-8): ", (rowInput: string) => {
                    rl.question("  Enter column (1-10): ", (colInput: string) => {
                        const row = parseInt(rowInput);
                        const col = parseInt(colInput);
                        const result = reserveSeat(seating, row, col);
                        console.log("\n" + SEP);
                        console.log(`  ${result}`);
                        console.log(SEP);
                        rl.question("  Would you like to reserve another seat? (y/n): ", (again: string) => {
                            if (again.toLowerCase() === "y") {
                                askReserve();
                            } else {
                                displaySeating(seating);
                                main();
                            }
                        });
                    });
                });
            };
            askReserve();
        } else if (answer === "3") {
            const counts = countSeats(seating);
            console.log("\n" + SEP);
            console.log(`  Occupied: ${counts.occupied} | Available: ${counts.available}`);
            console.log(SEP);
            main();
        } else if (answer === "4") {
            const adjacent = findAdjacentSeats(seating);
            console.log("\n" + SEP);
            if (adjacent) {
                console.log(`  ✅ Adjacent seats found at Row ${adjacent.row}, Cols ${adjacent.col} & ${adjacent.col + 1}`);
            } else {
                console.log(`  ❌ No adjacent seats available.`);
            }
            console.log(SEP);
            main();
        } else if (answer === "5") {
            seating = initializeSeating();
            console.log("\n" + SEP);
            console.log("  ✅ All reservations cleared! Starting fresh.");
            console.log(SEP);
            displaySeating(seating);
            main();
        } else if (answer === "6") {
            runTestScenarios();
            main();
        } else if (answer === "7") {
            console.log("\n" + SEP);
            console.log("  Goodbye! Hope you found my CLI user friendly!");
            console.log(SEP + "\n");
            rl.close();
        } else {
            console.log("\n⚠️  Please enter a number between 1 and 7.");
            main();
        }
    });
}

main();