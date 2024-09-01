const totalSeats = 80;
const seatsPerRow = 7;
const lastRowSeats = 3;
const seats = [];
const bookedSeats = new Set();

// Initialize the seats
function initializeSeats() {
    const seatContainer = document.getElementById('seats');
    seatContainer.innerHTML = ''; // Clear previous seats if any

    for (let i = 1; i <= totalSeats; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.id = `seat-${i}`;
        seat.onclick = () => toggleSeat(i);

        seats.push(seat);
        seatContainer.appendChild(seat);

        // Create a new row after every 7 seats, except the last 3 seats
        if (i % seatsPerRow === 0 && i < totalSeats - lastRowSeats) {
            const breakElement = document.createElement('div');
            breakElement.style.clear = 'both';
            seatContainer.appendChild(breakElement);
        }
    }
}

// Book seats based on input
function bookSeats() {
    const seatCountInput = document.getElementById('seatCount').value;
    const seatCount = parseInt(seatCountInput);

    if (isNaN(seatCount) || seatCount < 1 || seatCount > 7) {
        alert('Please enter a number between 1 and 7.');
        return;
    }

    const availableSeats = getAvailableSeats(seatCount);

    if (availableSeats.length < seatCount) {
        alert('Not enough seats available to book together.');
        return;
    }

    for (let seatIndex of availableSeats.slice(0, seatCount)) {
        bookedSeats.add(seatIndex);
        seats[seatIndex - 1].classList.add('booked');
        seats[seatIndex - 1].onclick = null; // Disable further clicking
    }

    alert(`Seats booked: ${availableSeats.slice(0, seatCount).join(', ')}`);
}

// Find available seats for booking
function getAvailableSeats(seatCount) {
    const availableSeats = [];

    // Check for consecutive seats in each row
    for (let row = 0; row < seats.length / seatsPerRow; row++) {
        const rowStart = row * seatsPerRow + 1;
        let consecutiveSeats = [];

        for (let i = 0; i < seatsPerRow; i++) {
            const seatIndex = rowStart + i;
            if (!bookedSeats.has(seatIndex)) {
                consecutiveSeats.push(seatIndex);
            } else {
                consecutiveSeats = []; // Reset if a seat is already booked
            }

            if (consecutiveSeats.length === seatCount) {
                return consecutiveSeats;
            }
        }
    }

    // If no consecutive seats available, book nearest available seats
    for (let i = 1; i <= totalSeats; i++) {
        if (!bookedSeats.has(i)) {
            availableSeats.push(i);
            if (availableSeats.length === seatCount) break;
        }
    }

    return availableSeats;
}

// Toggle seat booking
function toggleSeat(seatIndex) {
    if (bookedSeats.has(seatIndex)) {
        bookedSeats.delete(seatIndex);
        seats[seatIndex - 1].classList.remove('booked');
    } else {
        bookedSeats.add(seatIndex);
        seats[seatIndex - 1].classList.add('booked');
    }
}

initializeSeats();
