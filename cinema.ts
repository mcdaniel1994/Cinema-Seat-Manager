// Cinema Seat Manager

// Initialize Seating Matrix
export function initializeSeating(): number[][] {
    const seatingLayout: number[][] = [];    // Creates an empty array
    
    // This will put each row into a single array
    for (let row = 0; row < 8; row++) {
        const singleRow: number[] = [];
        
        for (let col = 0; col < 10; col++) {    // This will create the collums by adding 10 0s to each row
            singleRow.push(0);                  // 0 = seat is available
        }

        seatingLayout.push(singleRow);
}
    return seatingLayout
}


const GREEN = "\x1b[32m";
const RESET = "\x1b[0m";

// Display Seating Matrix
export function displaySeating(seating: number[][]): void {
    console.log("\n" + GREEN + "================= CINEMA SEATING CHART =================" + RESET);

    // Header for Seating - Print column numbers accross the top
    let header = "  ";
    for (let col = 1; col <= 10; col++) {
        header += String(col).padStart(5, " ");
    }
    console.log(header);

    // Print each row with its row number
    for (let row = 0; row < 8; row++) {
        let rowDisplay = String(row + 1).padStart(2, " ") + "  ";

        for (let col = 0; col < 10; col ++) {
            const seat = seating[row][col] === 1 ? " X " : " L ";
            rowDisplay += "[" + seat + "]";
        }
        console.log(rowDisplay);
    }
    console.log(GREEN + "=========================================================" + RESET)
}

// Reserve a Seat
export function reserveSeat(seating: number[][], row: number, col: number): string {
    // 
    const rowIndex = row -1;
    const colIndex = col - 1;

    // Checks to see if seat position is within range
    if (rowIndex < 0 || rowIndex >= 8 || colIndex < 0 || colIndex >= 10){
        return `❌ Invalid seat. Row must be 1-8 and column must be 1-10.`;
    }

    // Checks to weather seat is occupied or not.
    if (seating[rowIndex][colIndex] === 1) {
        return `⚠️ Seat Row ${row}, Col ${col} is already occupied.`;
    }

    // Reserves the seat and writes 1 to the matrix
    seating[rowIndex][colIndex] = 1;
    return `✅ Seat Row ${row}, Col ${col} has been reserved.`;
}

// Count Seats
export function countSeats(seating: number[][]): { occupied: number; available: number } {
    let occupied = 0;
    let available = 0;

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 10; col++) {
            if (seating[row][col] === 1) {
                occupied++;
            } else {
                available++;
            }
        }
    }

    return { occupied, available };
}


// Find Adjacemt Seats
export function findAdjacentSeats(seating: number[][]): { row: number; col: number } | null {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 9; col++) {

            if (seating[row][col] === 0 && seating[row][col + 1] === 0) {

                return { row: row + 1, col: col + 1 };
            }
        }
    }
    return null; // do adjacent pairs
}


