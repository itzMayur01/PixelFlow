// Reference the <html> element of the document
const $HTML = document.documentElement;

// Detect if the user's system prefers a dark theme
let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Check if a theme preference exists in sessionStorage
if (sessionStorage.getItem('theme')) {
  // If a theme is found in sessionStorage, apply it to the HTML element
  $HTML.dataset.theme = sessionStorage.getItem('theme');
} else {
  // If no theme is stored, apply the system's theme preference
  $HTML.dataset.theme = isDark ? 'dark' : "light";
}

// Function to toggle between light and dark themes
const changeTheme = function () {
  console.log('clickd'); // Log a message when the function is triggered

  // Retrieve the current theme from sessionStorage
  isDark = sessionStorage.getItem('theme');

  // Toggle the theme and save the new value in sessionStorage
  sessionStorage.setItem('theme', isDark === 'light' ? 'dark' : 'light');

  // Update the HTML element's theme attribute to reflect the new theme
  $HTML.dataset.theme = sessionStorage.getItem('theme');
}

// Wait for the page to load before attaching event listeners
window.addEventListener('load', () => {
  // Select the button responsible for toggling the theme
  const $themeBtn = document.querySelector('[data-theme-toggler]');

  // Attach a click event listener to the button to trigger the theme change
  $themeBtn.addEventListener('click', changeTheme);
});
