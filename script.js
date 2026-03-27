// ========== LOCOMOTIVE SCROLL - UNTUK SMOOTH SCROLL SEPERTI LOCOMOTIVE ==========
document.addEventListener("DOMContentLoaded", function () {

    // Inisialisasi Locomotive Scroll
    const scrollEl = document.querySelector('[data-scroll-container]');
    const locoScroll = new LocomotiveScroll({
        el: scrollEl,
        smooth: true,
        multiplier: 0.8, // Kecepatan scroll (semakin kecil semakin lambat)
        class: 'is-reveal',
        smartphone: {
            smooth: true,
            multiplier: 0.6 // Lebih lambat di mobile
        },
        tablet: {
            smooth: true,
            multiplier: 0.7
        },
        lerp: 0.1, // Smoothness (semakin kecil semakin halus)
        getDirection: true
    });

    // Update scroll progress bar
    const scrollProgress = document.getElementById('scroll-progress');
    locoScroll.on('scroll', (obj) => {
        // Update progress bar
        const progress = (obj.scroll.y / (scrollEl.scrollHeight - window.innerHeight)) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = progress + '%';
        }

        // Navbar hide/show
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (obj.direction === 'down' && obj.scroll.y > 100) {
                navbar.classList.add('hide-nav');
                navbar.classList.remove('show-nav');
            } else {
                navbar.classList.remove('hide-nav');
                navbar.classList.add('show-nav');
            }
        }

        // Back to top button visibility
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            if (obj.scroll.y > 300) {
                backToTop.classList.remove('opacity-0', 'translate-y-10');
                backToTop.classList.add('opacity-100', 'translate-y-0');
            } else {
                backToTop.classList.remove('opacity-100', 'translate-y-0');
                backToTop.classList.add('opacity-0', 'translate-y-10');
            }
        }

        // Active nav link detection
        const sections = document.querySelectorAll('[data-scroll-section]');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';
        const scrollPos = obj.scroll.y + 150;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                current = sectionId;
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.replace('#', '') === current) {
                link.classList.add('active');
            }
            if (current === 'home' && (!href || href === '#home')) {
                if (obj.scroll.y < 100) link.classList.add('active');
            }
        });
    });

    // Handle navigation clicks dengan Locomotive Scroll
    const navLinks = document.querySelectorAll('[data-scroll-to], .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    locoScroll.scrollTo(targetElement, {
                        offset: -80,
                        duration: 1000,
                        easing: [0.25, 0.1, 0.25, 1]
                    });
                }
            }
        });
    });

    // Handle View My Work button
    const viewWorkBtn = document.querySelector('.view-work-btn');
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                locoScroll.scrollTo(projectsSection, {
                    offset: -80,
                    duration: 1000,
                    easing: [0.25, 0.1, 0.25, 1]
                });
            }
        });
    }

    // Handle Back to Top button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function () {
            locoScroll.scrollTo(0, {
                duration: 800,
                easing: [0.25, 0.1, 0.25, 1]
            });
        });
    }

    // Update Locomotive Scroll on window resize
    window.addEventListener('resize', () => {
        locoScroll.update();
    });

    // ========== TYPING EFFECT ==========
    const typingText = document.getElementById("typing-text");
    if (typingText) {
        const texts = ["Moh Nur Huda"];
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;

        function type() {
            const currentText = texts[0];

            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isEnd = true;
                setTimeout(() => { isDeleting = true; }, 1500);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
            }

            const speed = isDeleting ? 100 : 100;
            setTimeout(type, isEnd ? 200 : speed);
        }

        setTimeout(type, 1000);
    }

    // ========== MOBILE MENU ==========
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileContactBtn = document.getElementById('mobile-contact-btn');

    function openMobileMenu() {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
        if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);
        if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

        mobileMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        if (mobileContactBtn) {
            mobileContactBtn.addEventListener('click', function () {
                closeMobileMenu();
                showContactModal();
            });
        }
    }

    // ========== CONTACT MODAL ==========
    const contactBtn = document.getElementById("contact-btn");
    const downloadCv = document.getElementById("download-cv");

    function showContactModal() {
        const modal = document.createElement("div");
        modal.className = "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4";
        modal.innerHTML = `
          <div class="bg-white rounded-2xl p-8 max-w-md w-full animate-slide-up">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-2xl font-bold text-slate-900">Let's Connect!</h3>
              <button class="text-slate-400 hover:text-slate-700" id="close-modal">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
            <p class="text-slate-600 mb-6">Feel free to reach out for collaboration or just to say hi!</p>
            <div class="space-y-4">
              <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <span class="material-symbols-outlined text-primary">mail</span>
                <span class="font-medium">hudamohammadnur1987@gmail.com</span>
              </div>
              <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <span class="material-symbols-outlined text-primary">call</span>
                <span class="font-medium">+62 823 3138 7731</span>
              </div>
            </div>
            <button class="w-full mt-6 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">Send Message</button>
          </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector("#close-modal").addEventListener("click", function () { modal.remove(); });
        modal.addEventListener("click", function (e) { if (e.target === modal) modal.remove(); });
    }

    contactBtn?.addEventListener("click", showContactModal);

    // Download CV function
    function downloadCV() {
        const cvUrl = "assets/CV_HUDA_FIX.pdf";
        const link = document.createElement('a');
        link.href = cvUrl;
        link.download = "CV_Moh_Nur_Huda.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        const toast = document.createElement("div");
        toast.className = "fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-3 rounded-full shadow-lg animate-slide-up z-50 backdrop-blur-sm border border-white/20";
        toast.textContent = "📄 Downloading CV...";
        document.body.appendChild(toast);
        setTimeout(() => { toast.classList.add("opacity-0", "translate-y-10"); setTimeout(() => toast.remove(), 300); }, 2000);
    }

    downloadCv?.addEventListener("click", downloadCV);

    // ========== 3D CARD EFFECT ==========
    function init3DCards() {
        const cards = document.querySelectorAll('.card-3d-container');

        cards.forEach(card => {
            const card3d = card.querySelector('.card-3d');
            const layers = card.querySelectorAll('.card-3d-layer');
            const content = card.querySelector('.card-3d-content');

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateY = ((x - centerX) / centerX) * 8;
                const rotateX = ((centerY - y) / centerY) * -8;
                const moveX = (x - centerX) / 25;
                const moveY = (y - centerY) / 25;

                card3d.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;

                layers.forEach((layer, index) => {
                    const depth = (index + 1) * 8;
                    layer.style.transform = `translateX(${moveX * depth * 0.3}px) translateY(${moveY * depth * 0.3}px) translateZ(${depth}px)`;
                });

                if (content) {
                    const contentLift = Math.min(60, 40 + (Math.abs(rotateX) + Math.abs(rotateY)) * 2);
                    content.style.transform = `translateZ(${contentLift}px) rotateX(${rotateX * 0.2}deg) rotateY(${rotateY * 0.2}deg)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                card3d.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
                layers.forEach(layer => { layer.style.transform = 'translateZ(0)'; });
                if (content) { content.style.transform = 'translateZ(40px) rotateX(0) rotateY(0)'; }
            });
        });
    }

    setTimeout(() => { init3DCards(); }, 100);

    // Show navbar initially
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.classList.add('show-nav');
    }
});

// ========== EMAILJS CONFIGURATION ==========
// GANTI DENGAN DATA ASLI ANDA DARI EMAILJS
// 1. Public Key (dari Account → API Keys)
const PUBLIC_KEY = "GNYEMyukSF9pSB1Pg";

// 2. Service ID (dari Email Services)
const SERVICE_ID = "service_ymyhrkg";

// 3. Template ID (dari Email Templates)
const TEMPLATE_ID = "template_i0bzekb";

// Inisialisasi EmailJS
emailjs.init(PUBLIC_KEY);

// Tangani submit form
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Ambil nilai dari form
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Tampilkan loading
            const submitBtn = document.getElementById('send-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span> Sending...';
            submitBtn.disabled = true;

            // Parameter yang dikirim ke template
            const templateParams = {
                name: name,
                email: email,
                message: message,
                title: name, // untuk field {{title}} di subject
                to_email: "hudamohammadnur1987@gmail.com"
            };

            // Kirim email
            emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showToast('✅ Message sent successfully! I will reply soon.');
                    contactForm.reset();
                })
                .catch(function (error) {
                    console.log('FAILED...', error);
                    showToast('❌ Failed to send message. Please try again.');
                })
                .finally(function () {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
});

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-3 rounded-full shadow-lg animate-slide-up z-50 backdrop-blur-sm border border-white/20";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("opacity-0", "translate-y-10");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
