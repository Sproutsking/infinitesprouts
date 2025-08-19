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




// Smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';

        // Header scroll effect
        const header = document.getElementById('header');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });

        // Popup functionality
        const popup = document.getElementById('popup');
        const getStartedBtns = [
            document.getElementById('getStartedBtn'),
            document.getElementById('getStartedBtn2')
        ];
        const closePopupBtn = document.getElementById('closePopup');

        // Show popup
        getStartedBtns.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    popup.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            }
        });

        // Close popup
        function closePopup() {
            popup.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        if (closePopupBtn) {
            closePopupBtn.addEventListener('click', closePopup);
        }

        // Close popup on overlay click
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopup();
            }
        });

        // Close popup on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popup.classList.contains('active')) {
                closePopup();
            }
        });

        // Navigation active state
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        function updateActiveNav() {
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', updateActiveNav);

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        // Observe animated elements
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });

        // Performance optimization: Debounce scroll events
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        const debouncedScrollHandler = debounce(() => {
            updateActiveNav();
        }, 10);

        window.addEventListener('scroll', debouncedScrollHandler);




// Initialize main page on load
showMainPage('#main_section');
