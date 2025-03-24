document.addEventListener('DOMContentLoaded', function() {
  // Page load animations
  initPageLoad();
  
  // Scroll animations
  initScrollReveal();
  
  // Navigation handlers
  initNavigation();
  
  // Form validation
  initContactForm();
  
  // Project filtering
  initProjectFilters();
  
  // Scroll progress indicator
  initScrollProgress();
  
  // Scroll to top button
  initScrollToTop();
});

// Initialize page load animations
function initPageLoad() {
  // Add fade in class to elements
  document.querySelectorAll('.hero h1, .hero .subtitle, .cta-wrapper').forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('fadeIn');
    }, 300 * index);
  });
  
  // Animate about page elements when scrolled into view
  const aboutImage = document.querySelector('.about-image');
  const aboutContent = document.querySelector('.about-content');
  
  if (aboutImage && aboutContent) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === aboutImage) {
            entry.target.classList.add('fadeInLeft');
          } else if (entry.target === aboutContent) {
            entry.target.classList.add('fadeInRight');
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(aboutImage);
    observer.observe(aboutContent);
  }
  
  // Header scroll effect
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Initialize scroll reveal animations
function initScrollReveal() {
  // Initialize ScrollReveal
  const sr = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 1000,
    delay: 200,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    reset: false
  });
  
  // Apply reveal animations to different sections
  sr.reveal('.page-title, .section-subtitle', { 
    origin: 'top',
    distance: '20px'
  });
  
  sr.reveal('.project-card, .skill-list li', { 
    interval: 100 
  });
  
  sr.reveal('.contact-card, .contact-form', { 
    interval: 200 
  });
}

// Initialize navigation functionality
function initNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close the mobile menu if open
      if (nav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
        
        // Update active nav item
        document.querySelectorAll('nav ul li').forEach(item => {
          item.classList.remove('active');
        });
        this.closest('li').classList.add('active');
      }
    });
  });
  
  // Update active nav item on scroll
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li');
    
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
        });
        
        const currentNavItem = document.querySelector(`nav ul li a[href="#${section.id}"]`);
        if (currentNavItem) {
          currentNavItem.closest('li').classList.add('active');
        }
      }
    });
  });
}

// Initialize contact form validation
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple form validation
      let isValid = true;
      const formElements = this.elements;
      
      for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].type !== 'submit' && formElements[i].required && !formElements[i].value.trim()) {
          isValid = false;
          formElements[i].classList.add('error');
        } else if (formElements[i].type !== 'submit') {
          formElements[i].classList.remove('error');
        }
      }
      
      if (isValid) {
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call with timeout
        setTimeout(() => {
          this.reset();
          submitBtn.textContent = 'Message Sent!';
          
          // Reset button after 3 seconds
          setTimeout(() => {
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
          }, 3000);
        }, 2000);
      }
    });
  }
}

// Initialize project filtering
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
}

// Initialize scroll progress indicator
function initScrollProgress() {
  // Create progress indicator
  const progressIndicator = document.createElement('div');
  progressIndicator.className = 'progress-indicator';
  document.body.appendChild(progressIndicator);
  
  window.addEventListener('scroll', function() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    
    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
    progressIndicator.style.height = `${scrollPercentage}vh`;
  });
}

// Initialize scroll to top button
function initScrollToTop() {
  // Create scroll to top button
  const scrollTopBtn = document.createElement('div');
  scrollTopBtn.className = 'scroll-top';
  document.body.appendChild(scrollTopBtn);
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Add hover effect to project cards for 3D tilt
document.addEventListener('mousemove', function(e) {
  const cards = document.querySelectorAll('.project-card');
  
  cards.forEach(card => {
    const cardRect = card.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate distance from mouse to card center
    const distX = mouseX - cardCenterX;
    const distY = mouseY - cardCenterY;
    
    // Only apply effect if mouse is close to the card
    if (Math.abs(distX) < cardRect.width * 1.5 && Math.abs(distY) < cardRect.height * 1.5) {
      // Calculate rotation based on mouse position
      const rotateY = distX * 0.03;
      const rotateX = -distY * 0.03;
      
      // Apply the transform
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    } else {
      // Reset transform if mouse is far from card
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }
  });
});