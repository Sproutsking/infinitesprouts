document.addEventListener('DOMContentLoaded', () => {
  const landingPage = document.querySelector('.landing-page');
  const teamPage = document.querySelector('.team-page');
  const farmersPage = document.querySelector('.farmers-page');
  const homeLinks = document.querySelectorAll('#home-link, #home-link-team, #home-link-farmers, #back-to-home-team, #back-to-home-farmers');
  const teamLinks = document.querySelectorAll('#team-link, #team-link-team, #team-link-farmers');
  const farmersLinks = document.querySelectorAll('#farmers-link, #farmers-link-team, #farmers-link-farmers');
  const navLinks = document.querySelectorAll('.nav-link');
  const getStartedBtn = document.getElementById('getStartedBtn');
  const popup = document.getElementById('popup');
  const closePopup = document.getElementById('closePopup');

  // Function to reset active states
  const resetActiveStates = () => {
    landingPage.classList.remove('active');
    teamPage.classList.remove('active');
    farmersPage.classList.remove('active');
    navLinks.forEach(link => link.classList.remove('active'));
  };

  // Show Landing Page
  homeLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      resetActiveStates();
      landingPage.classList.add('active');
      document.getElementById('home-link').classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Show Team Page
  teamLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      resetActiveStates();
      teamPage.classList.add('active');
      document.getElementById('team-link-team').classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Show Farmers Page
  farmersLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      resetActiveStates();
      farmersPage.classList.add('active');
      document.getElementById('farmers-link-farmers').classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Popup Handling
  getStartedBtn.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.add('active');
  });

  closePopup.addEventListener('click', () => {
    popup.classList.remove('active');
  });

  // Smooth scrolling for in-page links on landing page
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.classList.contains('nav-link') && landingPage.classList.contains('active') && !this.classList.contains('goto')) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
