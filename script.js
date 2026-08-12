document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Navbar Scroll Effect ---
    const header = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const mobileToggle = document.querySelector(".mobile-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    mobileToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        if (mobileMenu.classList.contains("active")) {
            mobileToggle.textContent = "CLOSE";
            mobileToggle.style.color = "#FAFAF7"; // Force white text when menu open
        } else {
            mobileToggle.textContent = "MENU";
            mobileToggle.style.color = window.scrollY > 50 ? "#172033" : "#FAFAF7";
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            mobileToggle.textContent = "MENU";
            mobileToggle.style.color = window.scrollY > 50 ? "#172033" : "#FAFAF7";
        });
    });

    // --- 3. Intersection Observer for Reveals ---
    const revealElements = document.querySelectorAll(".reveal");
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // --- 4. Navigation Progress Indicator ---
    const sections = document.querySelectorAll("section[data-section]");
    const sectionNameDisplay = document.getElementById("current-section-name");
    const progressFill = document.querySelector(".progress-fill");

    window.addEventListener("scroll", () => {
        let current = "";
        
        // Calculate document progress
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (window.scrollY / docHeight) * 100;
        if(progressFill) progressFill.style.width = `${scrollPercent}%`;

        // Determine current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - window.innerHeight / 2)) {
                current = section.getAttribute("data-section");
            }
        });

        if (sectionNameDisplay && current) {
            sectionNameDisplay.textContent = current;
        }
    });

    // --- 5. Custom Horizontal Scroll Logic for Fleet Section (Desktop Only) ---
    const fleetSection = document.querySelector(".fleet-section");
    const fleetTrack = document.querySelector(".fleet-track");

    window.addEventListener("scroll", () => {
        // Only apply custom translation if on desktop layout
        if (window.innerWidth > 768 && fleetSection && fleetTrack) {
            const sectionTop = fleetSection.offsetTop;
            const sectionHeight = fleetSection.offsetHeight;
            const scrollY = window.scrollY;
            
            // Calculate how far we've scrolled inside the fleet section container
            if (scrollY >= sectionTop && scrollY <= (sectionTop + sectionHeight - window.innerHeight)) {
                const scrollProgress = scrollY - sectionTop;
                const maxScroll = sectionHeight - window.innerHeight;
                const percentage = scrollProgress / maxScroll;
                
                // Track width minus viewport width determines max translate value
                const trackScrollWidth = fleetTrack.scrollWidth - window.innerWidth;
                
                fleetTrack.style.transform = `translate3d(-${percentage * trackScrollWidth}px, 0, 0)`;
            } else if (scrollY < sectionTop) {
                fleetTrack.style.transform = `translate3d(0, 0, 0)`;
            } else if (scrollY > (sectionTop + sectionHeight - window.innerHeight)) {
                const trackScrollWidth = fleetTrack.scrollWidth - window.innerWidth;
                fleetTrack.style.transform = `translate3d(-${trackScrollWidth}px, 0, 0)`;
            }
        } else if (fleetTrack) {
            // Reset for mobile native scroll
            fleetTrack.style.transform = `none`;
        }
    });

    // --- 6. Simple Parallax on Images ---
    const parallaxImgs = document.querySelectorAll('.parallax-img');
    window.addEventListener('scroll', () => {
        if(window.innerWidth <= 768) return;
        parallaxImgs.forEach(img => {
            const speed = 0.05;
            const yPos = -(window.scrollY * speed);
            img.style.transform = `translateY(${yPos}px)`;
        });
    });
});
