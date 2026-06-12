const CITIES = [
  { name: 'Kathmandu', country: 'Nepal', tz: 'Asia/Kathmandu' },
  { name: 'Mumbai', country: 'India', tz: 'Asia/Kolkata' },
  { name: 'Delhi', country: 'India', tz: 'Asia/Kolkata' },
  { name: 'New York', country: 'United States', tz: 'America/New_York' },
  { name: 'London', country: 'United Kingdom', tz: 'Europe/London' },
  { name: 'Tokyo', country: 'Japan', tz: 'Asia/Tokyo' },
  { name: 'Sydney', country: 'Australia', tz: 'Australia/Sydney' },
  { name: 'Dubai', country: 'UAE', tz: 'Asia/Dubai' },
  { name: 'Paris', country: 'France', tz: 'Europe/Paris' },
  { name: 'Singapore', country: 'Singapore', tz: 'Asia/Singapore' },
  { name: 'Rome', country: 'Italy', tz: 'Europe/Rome' },
  { name: 'Karachi', country: 'Pakistan', tz: 'Asia/Karachi' }
];

// This variable will remember which city index (0, 1, 2...) is open in fullscreen (-1 means none)
let activeFullscreenIndex = -1; 

function renderCards() {
  const grid = document.getElementById('wc-grid');
  const searchText = document.getElementById('search-box').value.toLowerCase();
  const formatSetting = document.getElementById('fmt-select').value;
  
  grid.innerHTML = '';

  CITIES.forEach((item, index) => {
    if (item.name.toLowerCase().includes(searchText) || item.country.toLowerCase().includes(searchText)) {
      
      const currentTime = new Date().toLocaleTimeString('en-US', {
        timeZone: item.tz,
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: formatSetting === '12'
      });

      const card = document.createElement('div');
      card.className = 'clock-card';
      
      // 🌟 NEW: When this card is clicked, open the fullscreen layout for this city index
      card.onclick = function() {
        openFullscreen(index);
      };

      card.innerHTML = `
        <div class="cc-city">${item.name}</div>
        <div class="cc-country">${item.country}</div>
        <div class="cc-time">${currentTime}</div>
      `;
      
      grid.appendChild(card);
    }
  });
}

// 🌟 NEW: Functions to open and close the fullscreen view
function openFullscreen(index) {
  activeFullscreenIndex = index;
  // Remove the hidden class so the popup display box shows up
  document.getElementById('fs-overlay').classList.remove('fs-hidden');
  updateFullscreenText();
}

function closeFullscreen() {
  activeFullscreenIndex = -1;
  // Add the hidden class back to hide the popup
  document.getElementById('fs-overlay').classList.add('fs-hidden');
}

// 🌟 NEW: This updates the text inside the fullscreen overlay view
function updateFullscreenText() {
  if (activeFullscreenIndex === -1) return;
  
  const cityData = CITIES[activeFullscreenIndex];
  const formatSetting = document.getElementById('fmt-select').value;

  const currentTime = new Date().toLocaleTimeString('en-US', {
    timeZone: cityData.tz,
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: formatSetting === '12'
  });

  // Calculate fullscreen full date text
  const currentDateFull = new Date().toLocaleDateString('en-US', {
    timeZone: cityData.tz,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  document.getElementById('fs-city-name').textContent = cityData.name;
  document.getElementById('fs-country-name').textContent = cityData.country;
  document.getElementById('fs-big-time').textContent = currentTime;
  document.getElementById('fs-big-date').textContent = currentDateFull;
}

function updateMasterClock() {
  const formatSetting = document.getElementById('fmt-select').value;
  document.getElementById('master-time').textContent = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: formatSetting === '12'
  });

  document.getElementById('master-date').textContent = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  renderCards();
  
  // 🌟 NEW: Also keep updating the giant fullscreen clock text if it is open!
  updateFullscreenText();
}

function filterCards() {
  renderCards();
}

window.onload = function() {
  setInterval(updateMasterClock, 1000);
};