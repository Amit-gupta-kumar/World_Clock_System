function updateClocks() {
    const now = new Date();

    // 1. Fetch and display Local Time
    document.getElementById('local-time').textContent = now.toLocaleTimeString();

    // 2. Fetch and display London Time
    const londonOptions = { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    document.getElementById('london-time').textContent = now.toLocaleTimeString('en-US', londonOptions);

    // 3. Fetch and display New York Time
    const nyOptions = { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    document.getElementById('ny-time').textContent = now.toLocaleTimeString('en-US', nyOptions);
}

// Run the clock function immediately on page load
updateClocks();

// Refresh the clocks every 1000 milliseconds (1 second)
setInterval(updateClocks, 1000);
