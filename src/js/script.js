document.addEventListener("DOMContentLoaded", () => {

    // ========== AOS - Animate on Scroll ==========
    AOS.init({
        duration: 1000,
        once: false
    });

    // ========== CONTADORES ==========
    function animateCounter(id, target, duration, prefix = "") {
        const counter = document.getElementById(id);
        let start = 0;
        const increment = target / (duration / 16);

        function update() {
            start += increment;
            if (start < target) {
                counter.textContent = prefix + Math.floor(start);
                requestAnimationFrame(update);
            } else {
                counter.textContent = prefix + target;
            }
        }

        if (counter) update();
    }

    function observeAndAnimate(id, target, duration, prefix = "") {
        const element = document.getElementById(id);
        if (!element) return;

        let isCounting = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isCounting) {
                    isCounting = true;
                    animateCounter(id, target, duration, prefix);

                    setTimeout(() => {
                        isCounting = false;
                    }, duration + 200);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(element);
    }

    observeAndAnimate("counter-municipios", 29, 2000);
    observeAndAnimate("counter-estados", 8, 2000);
    observeAndAnimate("counter-clientes", 950, 2000, "+");

    // ========== SCROLL AUTOMÁTICO POR HASH ==========
    const hash = window.location.hash;
    if (hash) {
        const target = document.querySelector(hash);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    }

    // ========== BARRA DE PROGRESSO NO SCROLL ==========
    window.addEventListener('scroll', () => {
        const progress = document.getElementById('scrollProgress');
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progressHeight = (window.scrollY / totalHeight) * 100;
        if (progress) progress.style.width = progressHeight + "%";
    });

    // ========== SCROLL SPY ==========
    window.addEventListener("scroll", () => {
        const sections = document.querySelectorAll("section[id]");
        const navLinks = document.querySelectorAll(".nav-link");
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) current = section.getAttribute("id");
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    // ========== DEPOIMENTOS EM CARROSSEL ==========
    const testimonials = document.querySelectorAll("#testimonial-carousel .testimonial");
    let current = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.opacity = (i === index) ? 1 : 0;
        });
    }

    if (testimonials.length > 0) {
        showTestimonial(current);

        setInterval(() => {
            current = (current + 1) % testimonials.length;
            showTestimonial(current);
        }, 5000);
    }

});
