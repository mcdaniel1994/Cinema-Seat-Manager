# Cinema Seat Manager

A TypeScript command-line application that simulates a cinema seat reservation system. Built as part of the 4Geeks Academy AI Engineering Bootcamp.

---

## Project Structure

```
project/
  cinema.ts        ← Core logic — all functions live here
  main.ts          ← Interactive menu entry point
  test_cinema.ts   ← Isolated test scenarios
  tsconfig.json    ← TypeScript compiler configuration
  dist/            ← Compiled JavaScript output (auto-generated)
```

---

## How to Run

**Install dependencies:**
```bash
npm install
npm i --save-dev @types/node
```

**Compile and run the interactive menu:**
```bash
npx tsc
node dist/main.js
```

**Run test scenarios only:**
```bash
node dist/test_cinema.js
```

---

## Menu Options

When you run `main.js` you will see an interactive menu with the following options:

| Option | Description |
|--------|-------------|
| 1 | View the current seating chart |
| 2 | Reserve a seat by entering row and column |
| 3 | Count occupied vs available seats |
| 4 | Find the first pair of adjacent available seats |
| 5 | Reset all reservations and start fresh |
| 6 | Run all 4 test scenarios |
| 7 | Exit the program |

The seating chart displays **X** for occupied seats and **L** for available seats, with row numbers down the left side and column numbers across the top.

---

## Core Functions (`cinema.ts`)

All functions are exported from `cinema.ts` and imported where needed.

**`initializeSeating()`**
Creates and returns an 8×10 two-dimensional array filled with zeros. Each `0` represents an available seat.

**`displaySeating(seating)`**
Prints the seating matrix to the console with row and column labels. Occupied seats show as `X`, available seats show as `L`.

**`reserveSeat(seating, row, col)`**
Takes a row and column number (1-based), validates the position, checks availability, and either reserves the seat or returns an error message. Returns a string confirming the result.

**`countSeats(seating)`**
Loops through the entire matrix and returns an object with two properties — `occupied` and `available` — showing the current totals.

**`findAdjacentSeats(seating)`**
Searches each row left to right for two consecutive available seats. Returns the position of the first pair found, or `null` if none exist.

---

## How Testing Works (`test_cinema.ts`)

The test file imports all functions from `cinema.ts` and runs four scenarios, each using a fresh seating matrix:

**Scenario 1 — Empty Room**
Initializes a brand new matrix with no reservations. Verifies that all 80 seats show as available and that an adjacent pair is found immediately.

**Scenario 2 — Partially Filled**
Reserves three specific seats at known positions. Verifies that the count reflects 3 occupied and 77 available, and that the `X` marks appear in the correct locations on the chart.

**Scenario 3 — Scattered Singles**
Reserves every other seat in every row using a loop, creating a checkerboard pattern. Verifies that no two adjacent seats are available, so `findAdjacentSeats()` returns null.

**Scenario 4 — Full Room**
Reserves all 80 seats using nested loops. Verifies that the count shows 80 occupied and 0 available, and that `findAdjacentSeats()` returns null.

Each scenario prints the seating chart so the output can be visually verified.

---

## Data Structure

The seating chart is represented as a **two-dimensional array** (`number[][]`):

- `0` = available seat
- `1` = occupied seat

```
[
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  ← Row 1
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  ← Row 2
  ...                                ← Rows 3–8
]
```

Row and column inputs from the user are 1-based (1–8 rows, 1–10 columns). All array access internally converts to 0-based indexing.

---

## Technologies Used

- TypeScript
- Node.js
- readline (built-in Node module for user input)
- ANSI escape codes for terminal color output
