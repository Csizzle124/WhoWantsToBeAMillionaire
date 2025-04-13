document.addEventListener("DOMContentLoaded", () => {
    const eventForm = document.getElementById("eventForm");

    if (eventForm) {
        eventForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const event = document.getElementById("event").value;
            const date = document.getElementById("date").value;
            const winner = document.getElementById("winner").value;

            // Ensure winner is either "Glenn" or "Cole"
            if (winner !== "Glenn" && winner !== "Cole") {
                alert("Winner must be either Glenn or Cole.");
                return;
            }

            const newEvent = { event, date, winner };
            const events = JSON.parse(localStorage.getItem("events")) || [];
            events.push(newEvent);
            localStorage.setItem("events", JSON.stringify(events));

            populateEventSummary(); // Update the table after adding a new event
            eventForm.reset();
        });
    }

    populateEventSummary(); // Populate the table on page load

    // Function to populate the detailed event summary table
    function populateEventSummary() {
        const events = JSON.parse(localStorage.getItem("events")) || [];
        const tableBody = document.querySelector("#eventSummary tbody");

        tableBody.innerHTML = ""; // Clear existing rows
        events.forEach(event => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${event.event}</td>
                <td>${event.date}</td>
                <td>${event.winner}</td>
            `;
            tableBody.appendChild(row);
        });
    }
});