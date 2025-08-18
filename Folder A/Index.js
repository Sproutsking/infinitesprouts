// Select all navigation links and page containers
const navLinks = document.querySelectorAll('.nav-link');
const landingPage = document.querySelector('.landing-page');
const teamPage = document.querySelector('.team-page');
const teamSection = document.querySelector('#team_section');
const mainCheck = document.getElementById('main-check');
const teamCheck = document.getElementById('main-check-team');

// Function to show main page and specific section
function showMainPage(sectionId) {
  // Hide team page and show landing page
  teamPage.style.display = 'none';
  teamSection.classList.remove('visible');
  landingPage.style.display = 'block';

  // Hide all main page sections and show the target section
  document.querySelectorAll('.main, .about_us, .ecosystem_section').forEach(section => {
    section.classList.remove('visible');
  });
  const targetSection = document.querySelector(sectionId);
  if (targetSection) {
    targetSection.classList.add('visible');
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }

  // Update active link
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === sectionId) {
      link.classList.add('active');
    }
  });

  // Close mobile menu
  mainCheck.checked = false;
  teamCheck.checked = false;
}

// Function to show team page
function showTeamPage() {
  // Hide landing page and show team page
  landingPage.style.display = 'none';
  teamPage.style.display = 'block';
  teamSection.classList.add('visible');

  // Update active link
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#team_section') {
      link.classList.add('active');
    }
  });

  // Close mobile menu
  mainCheck.checked = false;
  teamCheck.checked = false;
}

// Handle navigation link clicks
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('href');

    if (sectionId === '#team_section') {
      showTeamPage();
    } else {
      showMainPage(sectionId);
    }
  });
});

// Detect active section on scroll (for main page only)
let lastKnownScrollPosition = 0;
let ticking = false;

function onScroll() {
  if (landingPage.style.display !== 'none') {
    const scrollPosition = window.scrollY;

    navLinks.forEach(link => {
      const sectionId = link.getAttribute('href');
      if (sectionId !== '#team_section') {
        const section = document.querySelector(sectionId);
        if (section) {
          const sectionTop = section.offsetTop - 150;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      }
    });
  }
}

window.addEventListener('scroll', () => {
  lastKnownScrollPosition = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// Handle subscription button clicks (for popup)
const subscribeButtons = document.querySelectorAll('#subscribe-button, #subscribe-button-team');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('close_popup');

subscribeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const emailInput = button.previousElementSibling.querySelector('input');
    if (emailInput.value) {
      popup.style.display = 'flex';
    }
  });
});

closePopup.addEventListener('click', () => {
  popup.style.display = 'none';
});




// Get elements
        const getStartedBtn = document.getElementById('getStartedBtn');
        const closeBtn = document.getElementById('closeBtn');
        const popupOverlay = document.getElementById('popupOverlay');

        // Show popup when Get Started button is clicked
        getStartedBtn.addEventListener('click', function() {
            popupOverlay.classList.add('active');
        });

        // Close popup functionality
        closeBtn.addEventListener('click', function() {
            popupOverlay.style.animation = 'fadeInOverlay 0.3s ease-out reverse';
            setTimeout(() => {
                popupOverlay.classList.remove('active');
                popupOverlay.style.animation = '';
            }, 300);
        });

        // Close on overlay click (optional)
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === popupOverlay) {
                closeBtn.click();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
                closeBtn.click();
            }
        });




// Initialize main page on load
showMainPage('#main_section');
