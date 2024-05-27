    /**
     * This function is used to add event listeners and modifies the DOM based on the current page.
     */
document.addEventListener('DOMContentLoaded', (event) => {
    // Funktion zum Hinzufügen der Event Listener
    function addEventListeners() {
        if (window.location.pathname.includes("legalNoticeLogin.html")) {
            document.getElementById('header-icons').style.display = 'none';
            document.getElementById('menubar').style.display = 'none';
            document.getElementById('navbar-privacy-container').style.height = '561px';
            document.getElementById('privacy-policy-link').href = '/html/privacyPolicyLogin.html';
            document.getElementById('legal-notice-link').href = '/html/legalNoticeLogin.html';
          } 
          else if (window.location.pathname.includes("privacyPolicyLogin.html")) {
            document.getElementById('header-icons').style.display = 'none';
            document.getElementById('menubar').style.display = 'none';
            document.getElementById('navbar-privacy-container').style.height = '561px';
            document.getElementById('privacy-policy-link').href = '/html/privacyPolicyLogin.html';
            document.getElementById('legal-notice-link').href = '/html/legalNoticeLogin.html';
          }
    }
  
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          if (document.getElementById('menubar')) {
            addEventListeners();
            observer.disconnect();
          }
        }
      });
    });
  
    const config = {
      childList: true, 
      subtree: true
    };
  
    observer.observe(document.body, config);
});