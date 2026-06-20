/**
 * Bail Bond Agency Website
 * Main UI Controller - Manages header scrolling, mobile navigations, tabs, accordions, and interactive elements.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 1. Sticky Header
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initially
  }

  // 2. Mobile Nav Toggle
  const mobileToggle = document.querySelector('.mobile-toggle-btn');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isActive);
      
      // Update hamburger menu icon
      if (isActive) {
        mobileToggle.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        `;
      } else {
        mobileToggle.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu">
            <line x1="4" y1="12" x2="20" y2="12"/>
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="4" y1="18" x2="20" y2="18"/>
          </svg>
        `;
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', false);
        mobileToggle.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu">
            <line x1="4" y1="12" x2="20" y2="12"/>
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="4" y1="18" x2="20" y2="18"/>
          </svg>
        `;
      }
    });

    // Reposition RTL, Theme, and Signup buttons dynamically for mobile/tab
    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
      const rtlBtn = navActions.querySelector('.rtl-toggle-btn');
      const themeBtn = navActions.querySelector('.theme-toggle-btn');
      const signupBtn = navActions.querySelector('a[href="signup.html"]');
      
      // Create a container inside nav-menu for these actions if it doesn't exist
      let mobileActions = navMenu.querySelector('.mobile-menu-actions');
      if (!mobileActions) {
        mobileActions = document.createElement('li');
        mobileActions.className = 'mobile-menu-actions';
        mobileActions.innerHTML = '<div class="mobile-actions-wrapper"></div>';
        navMenu.appendChild(mobileActions);
      }
      const wrapper = mobileActions.querySelector('.mobile-actions-wrapper');
      
      const handleReposition = () => {
        if (window.innerWidth <= 1024) {
          // Move from navActions to mobile menu wrapper
          if (rtlBtn && rtlBtn.parentNode !== wrapper) wrapper.appendChild(rtlBtn);
          if (themeBtn && themeBtn.parentNode !== wrapper) wrapper.appendChild(themeBtn);
          if (signupBtn && signupBtn.parentNode !== wrapper) wrapper.appendChild(signupBtn);
        } else {
          // Move back to navActions before the mobile toggle button
          if (rtlBtn && rtlBtn.parentNode !== navActions) navActions.insertBefore(rtlBtn, mobileToggle);
          if (themeBtn && themeBtn.parentNode !== navActions) navActions.insertBefore(themeBtn, mobileToggle);
          if (signupBtn && signupBtn.parentNode !== navActions) navActions.insertBefore(signupBtn, mobileToggle);
        }
      };
      
      window.addEventListener('resize', handleReposition);
      handleReposition(); // run initially
    }
  }

  // 3. Mobile Navigation Dropdown handler
  const navDropdowns = document.querySelectorAll('.nav-item');
  navDropdowns.forEach(item => {
    const trigger = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.nav-dropdown');
    
    if (trigger && dropdown) {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          const isActive = item.classList.toggle('active');
          
          if (isActive) {
            dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
          } else {
            dropdown.style.maxHeight = '0px';
          }
        }
      });
    }
  });

  // 4. Interactive Tabs Component
  const tabContainers = document.querySelectorAll('.tabs-container');
  tabContainers.forEach(container => {
    const tabButtons = container.querySelectorAll('.tab-btn');
    const tabContents = container.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');
        
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const targetContent = container.querySelector(`#${targetId}`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  });

  // 5. Accordion (Collapsible FAQs)
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('active');

      // Close all adjacent accordions in the same group
      const parent = item.parentElement;
      const siblingItems = parent.querySelectorAll('.accordion-item');
      siblingItems.forEach(sib => {
        if (sib !== item) {
          sib.classList.remove('active');
          const sibBody = sib.querySelector('.accordion-body');
          if (sibBody) sibBody.style.maxHeight = '0';
        }
      });

      // Toggle current accordion
      if (isOpen) {
        item.classList.remove('active');
        body.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // 6. Interactive Form submission (simulated with status indicators)
  const contactForms = document.querySelectorAll('form.interactive-form');
  contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Simulate loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="lucide lucide-loader-2 animate-spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite; margin-right: 8px;">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
        Processing...
      `;

      setTimeout(() => {
        // Show success alert
        const alertBox = document.createElement('div');
        alertBox.className = 'callout-box';
        alertBox.style.borderColor = '#22C55E';
        alertBox.style.backgroundColor = 'rgba(34, 197, 94, 0.05)';
        alertBox.style.marginTop = '1.5rem';
        alertBox.innerHTML = `
          <h5 style="color: #15803D; font-family: var(--font-headings); font-weight: 700; margin-bottom: 0.5rem;">Submission Successful</h5>
          <p style="color: #166534; font-size: 0.95rem; margin-bottom: 0;">Thank you. Your message has been received securely. An on-duty agent will call or email you within 15 minutes.</p>
        `;
        
        form.appendChild(alertBox);
        form.reset();
        
        // Reset submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Automatically remove alert after 8 seconds
        setTimeout(() => {
          alertBox.style.opacity = '0';
          alertBox.style.transition = 'opacity 0.5s ease';
          setTimeout(() => alertBox.remove(), 500);
        }, 8000);

      }, 1500);
    });
  });

  // 7. Password Visibility Toggle
  const passwordToggles = document.querySelectorAll('.password-toggle-btn');
  passwordToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const wrapper = btn.closest('.password-toggle-wrapper');
      if (wrapper) {
        const input = wrapper.querySelector('input');
        const icon = btn.querySelector('i');
        if (input && icon) {
          const isPassword = input.type === 'password';
          input.type = isPassword ? 'text' : 'password';
          icon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
        }
      }
    });
  });
});

// Inline CSS for the loading animation spinner in JS
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .animate-spin {
    display: inline-block;
  }
`;
document.head.appendChild(style);
