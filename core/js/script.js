document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Notification Carousel
    let currentNotification = 0;
    const notifications = document.querySelectorAll('.notification-card');
    
    function showNotification(index) {
        notifications.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
    }

    setInterval(() => {
        currentNotification = (currentNotification + 1) % notifications.length;
        showNotification(currentNotification);
    }, 5000);

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    document.querySelectorAll('.notification-card, .dashboard-card, .about-content').forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "all 0.6s ease-out";
        observer.observe(element);
    });
});

// Fetch alerts from the Next.js API
async function fetchAlerts() {
    try {
      const response = await fetch('http://your-nextjs-api/api/alerts');
      const data = await response.json();
      
      if (data.success) {
        // Filter only active alerts
        const activeAlerts = data.data.filter(alert => alert.active);
        
        // Sort by date, newest first
        activeAlerts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Only take the first 3 (or however many you want to display)
        const recentAlerts = activeAlerts.slice(0, 3);
        
        // Update the DOM with these alerts
        updateAlertsInDOM(recentAlerts);
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  }
  
  // Update the alerts in the DOM
  function updateAlertsInDOM(alerts) {
    const container = document.querySelector('.notification-container');
    if (!container) return;
    
    // Clear existing alerts
    container.innerHTML = '';
    
    // Add each alert to the container
    alerts.forEach((alert, index) => {
      const alertCard = document.createElement('div');
      alertCard.className = `notification-card ${index === 0 ? 'active' : ''}`;
      
      // Add "New" badge if specified
      if (alert.isNew) {
        const badge = document.createElement('span');
        badge.className = 'alert-badge';
        badge.textContent = 'New!';
        alertCard.appendChild(badge);
      } 
      
      // Add title and content
      const title = document.createElement('h3');
      title.textContent = alert.title;
      alertCard.appendChild(title);
      
      const content = document.createElement('p');
      content.textContent = alert.content;
      alertCard.appendChild(content);
      
      // Add date
      const date = document.createElement('div');
      date.className = 'notification-date';
      date.textContent = new Date(alert.date).toLocaleDateString('en-US', { 
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      alertCard.appendChild(date);
      
      container.appendChild(alertCard);
    });
  }
  
  // Fetch alerts when the page loads
  document.addEventListener('DOMContentLoaded', fetchAlerts);