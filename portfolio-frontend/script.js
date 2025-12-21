// Configuration
const API_BASE_URL = 'https://portfolio-website-veqf.onrender.com/api';

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Portfolio initializing...');
    
    // Initialize hamburger menu
    initializeHamburger();
    
    // Fetch and populate portfolio data
    await loadPortfolioData();
    
    // Setup form handlers
    setupFormHandlers();
    
    // Delay animations until after content is populated
    setTimeout(() => {
        // Initialize GSAP animations
        initializeAnimations();
        
        // Setup scroll-based animations
        setupScrollAnimations();
    }, 300);
    
    console.log('✓ Portfolio loaded successfully!');
});

// ==================== HAMBURGER MENU ====================
function initializeHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ==================== FETCH PORTFOLIO DATA ====================
// Load default data from frontend only
// Backend is only used for storing contact messages
async function loadPortfolioData() {
    // Load frontend default data (no backend fetch)
    loadDefaultData();
    console.log('✓ Portfolio data loaded from frontend');
}

function loadDefaultData() {
    const defaultData = {
        hero: {
            title: "Hi I'm Ranadeep Layak",
            subtitle: 'Full Stack Developer',
            description: 'Building amazing digital experiences with modern technologies'
        },
        about: {
            description: 'I am a passionate full-stack developer with expertise in creating robust web applications. With a strong foundation in both frontend and backend technologies, I deliver solutions that are not only functional but also beautiful and user-friendly.',
            details: 'My journey in web development started with a curiosity about how things work on the internet. Over the years, I have honed my skills in modern frameworks and best practices.',
            image: 'https://media.licdn.com/dms/image/v2/D5603AQHoDzRti1l7fQ/profile-displayphoto-scale_200_200/B56Zs2NE0PIkAY-/0/1766140958496?e=2147483647&v=beta&t=wzbXwtVeygKlLohXBNPx0yhpBs173xKydahYJSY-4ZM'
        },
        education: [
            {
                degree: 'AISSCE',
                institution: 'D.A.V Public School',
                field: 'Science',
                year: '2023-2025',
                details: 'Focused on science stream with major subjects Physics, Chemistry, Mathematics, and Computer Science'
            },
            {
                degree: 'Bachelor of Computer Applications',
                institution: 'Asansol Engineering College',
                field: 'Computer Applications',
                year: '2025-2029',
                details: 'Focused on computer applications and software engineering'
            }
        ],
        skills: [
            { name: 'JavaScript', category: 'Language', icon: '⚡' },
            { name: 'React', category: 'Frontend', icon: '⚛️' },
            { name: 'Node.js', category: 'Backend', icon: '🟢' },
            { name: 'MongoDB', category: 'Database', icon: '🍃' },
            { name: 'Express', category: 'Backend', icon: '🚀' },
            { name: 'CSS3', category: 'Frontend', icon: '🎨' },
            { name: 'HTML5', category: 'Frontend', icon: '📄' },
            { name: 'Git', category: 'Tools', icon: '🔧' },
            { name: 'REST APIs', category: 'Backend', icon: '🔌' },
            { name: 'GSAP', category: 'Animation', icon: '✨' }
        ],
        projects: [
            {
                title: 'Simple Portfolio Website',
                description: 'A simple portfolio website made with basic javascript, html and css',
                technologies: ['JavaScript', 'HTML', 'CSS'],
                link: 'https://github.com/Ranadeep-Layak/Code-Zero',
                github: 'https://github.com/Ranadeep-Layak/Code-Zero',
                icon: '💻'
            },
            {
                title: 'Simple UI using ReactJS',
                description: 'A simple user interface built with ReactJS',
                technologies: ['JavaScript', 'React'],
                link: 'https://github.com/Ranadeep-Layak/codeease-session',
                github: 'https://github.com/Ranadeep-Layak/codeease-session',
                icon: '🎨'
            },
            {
                title: 'This Portfolio Website',
                description: 'A full-stack portfolio website showcasing projects and skills',
                technologies: ['JavaScript', 'MongoDB', 'Express', 'Node.js'],
                link: 'https://github.com/Ranadeep-Layak/portfolio-website',
                github: 'https://github.com/Ranadeep-Layak/portfolio-website',
                icon: '🖥️'
            }
        ],
        contact: {
            email: 'ranadeeplayak7777@gmail.com',
            phone: '+91 73188 14033',
            location: 'West Bengal, India'
        },
        social: [
            { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ranadeep-layak-8013ab388', icon: 'in' },
            { name: 'GitHub', url: 'https://github.com/Ranadeep-Layak', icon: 'git' }
        ]
    };
    
    populatePortfolio(defaultData);
}

function populatePortfolio(data) {
    // Verify DOM is ready with a check
    if (!document.getElementById('heroTitle')) {
        console.warn('⚠ DOM elements not ready, retrying...');
        setTimeout(() => populatePortfolio(data), 200);
        return;
    }
    
    // Hero Section
    if (data.hero) {
        const heroTitle = document.getElementById('heroTitle');
        const heroSubtitle = document.getElementById('heroSubtitle');
        const heroDescription = document.getElementById('heroDescription');
        
        if (heroTitle) heroTitle.textContent = data.hero.title;
        if (heroSubtitle) heroSubtitle.textContent = data.hero.subtitle;
        if (heroDescription) heroDescription.textContent = data.hero.description;
    }
    
    // About Section
    if (data.about) {
        const aboutDesc = document.getElementById('aboutDescription');
        const aboutDetails = document.getElementById('aboutDetails');
        const aboutImage = document.getElementById('aboutImage');
        
        if (aboutDesc) aboutDesc.textContent = data.about.description;
        if (aboutDetails) aboutDetails.textContent = data.about.details;
        if (aboutImage && data.about.image) {
            aboutImage.src = data.about.image;
        }
    }
    
    // Education Section
    if (data.education && Array.isArray(data.education)) {
        const timeline = document.getElementById('educationTimeline');
        if (!timeline) return; // Exit if element not found
        timeline.innerHTML = '';
        data.education.forEach(edu => {
            const eduElement = document.createElement('div');
            eduElement.className = 'education-item';
            eduElement.innerHTML = `
                <h3>${edu.degree}</h3>
                <p class="institution">${edu.institution} - ${edu.field}</p>
                <p class="year">📅 ${edu.year}</p>
                <p>${edu.details}</p>
            `;
            timeline.appendChild(eduElement);
        });
    }
    
    // Skills Section
    if (data.skills && Array.isArray(data.skills)) {
        const skillsGrid = document.getElementById('skillsGrid');
        if (!skillsGrid) return;
        skillsGrid.innerHTML = '';
        data.skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-card';
            skillElement.innerHTML = `
                <div class="skill-icon">${skill.icon || '⭐'}</div>
                <h3>${skill.name}</h3>
                <p class="category">${skill.category}</p>
            `;
            skillsGrid.appendChild(skillElement);
        });
    }
    
    // Projects Section
    if (data.projects && Array.isArray(data.projects)) {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) return;
        projectsGrid.innerHTML = '';
        data.projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project-card';
            projectElement.innerHTML = `
                <div class="project-image">${project.icon || '📦'}</div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub</a>
                    </div>
                </div>
            `;
            projectsGrid.appendChild(projectElement);
        });
    }
    
    // Contact Section
    if (data.contact) {
        const emailEl = document.getElementById('contactEmail');
        const phoneEl = document.getElementById('contactPhone');
        const locationEl = document.getElementById('contactLocation');
        
        if (emailEl) emailEl.textContent = data.contact.email;
        if (phoneEl) phoneEl.textContent = data.contact.phone;
        if (locationEl) locationEl.textContent = data.contact.location;
    }
    
    // Social Links
    if (data.social && Array.isArray(data.social)) {
        const socialLinks = document.getElementById('socialLinks');
        if (!socialLinks) return;
        socialLinks.innerHTML = '';
        data.social.forEach(link => {
            const socialElement = document.createElement('a');
            socialElement.href = link.url;
            socialElement.className = 'social-link';
            socialElement.title = link.name;
            socialElement.target = '_blank';
            socialElement.textContent = link.icon || '🔗';
            socialLinks.appendChild(socialElement);
        });
    }
}

// ==================== FORM HANDLERS ====================
function setupFormHandlers() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

async function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formStatus = document.getElementById('formStatus');
    const submitButton = document.querySelector('.submit-button');
    
    const formData = {
        name: document.getElementById('formName').value,
        email: document.getElementById('formEmail').value,
        subject: document.getElementById('formSubject').value,
        message: document.getElementById('formMessage').value
    };
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showFormStatus('Please fill in all fields', 'error');
        return;
    }
    
    // Disable submit button
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            showFormStatus('✓ Message sent successfully! Thank you for reaching out.', 'success');
            document.getElementById('contactForm').reset();
        } else {
            const error = await response.json();
            showFormStatus('✗ Failed to send message. Please try again.', 'error');
        }
    } catch (error) {
        console.warn('⚠ Could not send to backend:', error.message);
        // Show success message even if backend unavailable for demo purposes
        showFormStatus('✓ Message form filled (Backend not available)', 'success');
        document.getElementById('contactForm').reset();
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
}

function showFormStatus(message, type) {
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    
    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formStatus.className = 'form-status';
        }, 5000);
    }
}

// ==================== GSAP ANIMATIONS ====================
function initializeAnimations() {
    // Hero section title animation
    gsap.from('.hero-title', {
        duration: 0.8,
        y: 20,
        delay: 0.1
    });
    
    gsap.from('.hero-subtitle', {
        duration: 0.8,
        y: 20,
        delay: 0.2
    });
    
    gsap.from('.hero-description', {
        duration: 0.8,
        y: 20,
        delay: 0.3
    });
    
    gsap.from('.cta-button', {
        duration: 0.8,
        y: 20,
        delay: 0.4
    });
    
    // Floating animation
    gsap.to('.floating-box', {
        duration: 6,
        y: -30,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    gsap.to('.floating-circle', {
        duration: 8,
        y: -40,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

// ==================== SCROLL ANIMATIONS ====================
function setupScrollAnimations() {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate section titles on scroll
    document.querySelectorAll('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                once: true
            },
            duration: 0.6,
            y: 20
        });
    });
    
    // Animate cards on scroll
    document.querySelectorAll('.skill-card, .project-card, .education-item').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                once: true
            },
            duration: 0.5,
            y: 30,
            stagger: 0.08
        });
    });
    
    // Animate about section on scroll
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
            once: true
        },
        duration: 0.6,
        x: -40
    });
    
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
            once: true
        },
        duration: 0.6,
        x: 40
    });
    
    // Animate contact form on scroll
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 85%',
            once: true
        },
        duration: 0.6,
        x: 30
    });
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});
    