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
  
    // Mutation Observer einrichten
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Überprüfen, ob das gewünschte Element hinzugefügt wurde
          if (document.getElementById('menubar')) {
            addEventListeners();
            // Observer stoppen, nachdem die Event Listener hinzugefügt wurden
            observer.disconnect();
          }
        }
      });
    });
  
    // Observer Konfiguration
    const config = {
      childList: true, 
      subtree: true
    };
  
    // Beobachtung des gesamten Dokumenten-Knotens starten
    observer.observe(document.body, config);
});