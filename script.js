// Header Navigation System
class HeaderNavigation {
    constructor() {
        this.init()
    }

    init() {
        this.setupElements()
        this.setupEventListeners()
        this.setupScrollEffect()
        this.setupSmoothScrolling()
        this.setupActiveNavigation()
    }

    setupElements() {
        this.header = document.querySelector(".header")
        this.mobileMenuBtn = document.getElementById("mobileMenuBtn")
        this.mobileMenu = document.getElementById("mobileMenu")
        this.mobileMenuOverlay = document.getElementById("mobileMenuOverlay")
        this.navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")
    }

    setupEventListeners() {
        // Mobile menu toggle
        this.mobileMenuBtn?.addEventListener("click", () => this.toggleMobileMenu())
        this.mobileMenuOverlay?.addEventListener("click", () => this.closeMobileMenu())

        // Close menu on nav link click
        this.navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu()
                }
            })
        })

        // Close menu on escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.mobileMenu?.classList.contains("active")) {
                this.closeMobileMenu()
            }
        })

        // Handle window resize
        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu()
            }
        })
    }

    toggleMobileMenu() {
        const isActive = this.mobileMenu?.classList.contains("active")
        if (isActive) {
            this.closeMobileMenu()
        } else {
            this.openMobileMenu()
        }
    }

    openMobileMenu() {
        this.mobileMenu?.classList.add("active")
        this.mobileMenuOverlay?.classList.add("active")
        this.mobileMenuBtn?.classList.add("active")
        document.body.style.overflow = "hidden"
    }

    closeMobileMenu() {
        this.mobileMenu?.classList.remove("active")
        this.mobileMenuOverlay?.classList.remove("active")
        this.mobileMenuBtn?.classList.remove("active")
        document.body.style.overflow = ""
    }

    setupScrollEffect() {
        let lastScrollY = window.scrollY
        let ticking = false

        const updateHeader = () => {
            const scrollY = window.scrollY
            if (scrollY > 100) {
                this.header?.classList.add("scrolled")
            } else {
                this.header?.classList.remove("scrolled")
            }

            if (scrollY > lastScrollY && scrollY > 200) {
                this.header.style.transform = "translateY(-100%)"
            } else {
                this.header.style.transform = "translateY(0)"
            }

            lastScrollY = scrollY
            ticking = false
        }

        window.addEventListener(
            "scroll",
            () => {
                if (!ticking) {
                    requestAnimationFrame(updateHeader)
                    ticking = true
                }
            },
            { passive: true }
        )
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", (e) => {
                e.preventDefault()
                const target = document.querySelector(anchor.getAttribute("href"))
                if (target) {
                    const headerHeight = this.header?.offsetHeight || 0
                    const targetPosition = target.offsetTop - headerHeight - 20
                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth",
                    })
                }
            })
        })
    }

    setupActiveNavigation() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "-100px 0px -50px 0px",
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id
                    this.updateActiveNavLink(id)
                }
            })
        }, observerOptions)

        document.querySelectorAll("section[id]").forEach((section) => {
            observer.observe(section)
        })
    }

    updateActiveNavLink(activeId) {
        this.navLinks.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === `#${activeId}`) {
                link.classList.add("active")
            }
        })
    }
}

// Website functionality
class AqualitecWebsite {
    constructor() {
        this.init()
    }

    init() {
        this.setupScrollToTop()
        this.setupGalleryFilter()
        this.setupGalleryModal()
        this.setupServiceModal()
        this.setupFormHandling() // CORRIGIDO: Não intercepta mais o FormSubmit
        this.setupIntersectionObserver()
    }

    setupScrollToTop() {
        const scrollBtn = document.getElementById("scrollToTopBtn")
        if (scrollBtn) {
            let ticking = false
            const updateScrollBtn = () => {
                if (window.scrollY > 500) {
                    scrollBtn.classList.add("show")
                } else {
                    scrollBtn.classList.remove("show")
                }
                ticking = false
            }

            window.addEventListener(
                "scroll",
                () => {
                    if (!ticking) {
                        requestAnimationFrame(updateScrollBtn)
                        ticking = true
                    }
                },
                { passive: true }
            )

            scrollBtn.addEventListener("click", () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
            })
        }
    }

    setupGalleryFilter() {
        const filterBtns = document.querySelectorAll(".filter-btn")
        const galleryItems = document.querySelectorAll(".galeria-item")

        filterBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                const filter = btn.dataset.filter

                // Update active button
                filterBtns.forEach((b) => b.classList.remove("active"))
                btn.classList.add("active")

                // Filter items with animation
                galleryItems.forEach((item) => {
                    const category = item.dataset.category
                    const shouldShow = filter === "all" || category === filter

                    if (shouldShow) {
                        item.style.display = "block"
                        setTimeout(() => {
                            item.style.opacity = "1"
                            item.style.transform = "scale(1)"
                        }, 10)
                    } else {
                        item.style.opacity = "0"
                        item.style.transform = "scale(0.8)"
                        setTimeout(() => {
                            item.style.display = "none"
                        }, 300)
                    }
                })
            })
        })
    }

    setupGalleryModal() {
        const galleryItems = document.querySelectorAll(".galeria-item")
        const modal = document.getElementById("modal-galeria")
        if (!modal) return

        galleryItems.forEach((item) => {
            item.addEventListener("click", () => {
                const galleryId = item.dataset.galleryId
                if (typeof abrirModalGaleria === 'function') {
                    abrirModalGaleria(galleryId)
                }
            })
        })

        // Close modal events
        modal.querySelector(".modal-close")?.addEventListener("click", () => {
            this.closeModal(modal)
        })

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                this.closeModal(modal)
            }
        })
    }

    setupServiceModal() {
        const serviceItems = document.querySelectorAll(".servicos-list li")
        const modal = document.getElementById("modal-servico")
        if (!modal) return

        serviceItems.forEach((item) => {
            item.addEventListener("click", () => {
                const serviceId = item.dataset.serviceId
                // Implementar dados dos serviços se necessário
            })
        })

        // Close modal events
        modal.querySelector(".modal-close")?.addEventListener("click", () => {
            this.closeModal(modal)
        })

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                this.closeModal(modal)
            }
        })
    }

    // CORRIGIDO: Função que não interfere com o FormSubmit
    setupFormHandling() {
        const form = document.getElementById("contact-form")
        if (!form) return

        const submitBtn = form.querySelector(".btn-submit")
        const originalText = submitBtn.textContent

        // Apenas adiciona feedback visual, mas deixa o formulário enviar naturalmente
        form.addEventListener("submit", (e) => {
            // NÃO previne o comportamento padrão (e.preventDefault())
            // Apenas mostra feedback visual
            submitBtn.textContent = "Enviando..."
            submitBtn.disabled = true

            // Restaura o botão após um tempo (caso não redirecione)
            setTimeout(() => {
                submitBtn.textContent = originalText
                submitBtn.disabled = false
            }, 5000)
        })
    }

    closeModal(modal) {
        modal.style.display = "none"
        document.body.style.overflow = "auto"
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-in")
                }
            })
        }, observerOptions)

        // Observe all sections
        document.querySelectorAll("section[id]").forEach((section) => {
            observer.observe(section)
        })
    }

    showNotification(message, type = "info") {
        const notification = document.createElement("div")
        notification.className = `notification notification-${type}`
        notification.textContent = message
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `

        document.body.appendChild(notification)

        // Animate in
        setTimeout(() => {
            notification.style.transform = "translateX(0)"
        }, 100)

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = "translateX(100%)"
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification)
                }
            }, 300)
        }, 5000)
    }
}

// Gallery functionality
const galeriaImagens = {
    box: [
        "box/box1.jpeg",
        "box/box2.jpeg",
        "box/box3.jpeg"
    ],
    espelho: [
        "espelhos/espelho1.jpeg"
    ],
    fachada: [
        "fachada/fachada1.jpeg",
        "fachada/fachada2.jpeg",
        "fachada/fachada3.jpeg"
    ],
    cobertura: [
        "cobertura/cobertura1.jpeg",
        "cobertura/cobertura2.jpeg",
        "cobertura/cobertura3.jpeg"
    ],
    guarda_corpo: [
        "guarda_corpo/guarda_corpo3.jpeg",
        "guarda_corpo/guarda_corpo4.jpeg",
        "guarda_corpo/guarda_corpo2.jpeg"
    ],
    residencial: [
        "residencial/res1.jpeg",
        "residencial/res2.jpeg",
        "residencial/res3.jpeg"
    ],
    brise: [
        "brise/brise1.jpeg",
        "brise/brise2.jpeg",
        "brise/brise3.jpeg"
    ],
    fechamento_varanda: [
        "fechamento_varanda/fechamento1.jpeg",
        "fechamento_varanda/fechamento2.jpeg"
    ],
    muro: [
        "muro/muro1.jpeg"
    ],
    outro: [
        "outros/outros1.jpeg",
        "outros/outros2.jpeg",
        "outros/outros3.jpeg",
        "outros/outros4.jpeg",
        "outros/outros5.jpeg"
    ]
}

function abrirModalGaleria(categoria) {
    const imagens = galeriaImagens[categoria] || []
    if (imagens.length === 0) return

    const modal = document.getElementById('modal-galeria')
    const imgPrincipal = document.getElementById('galeria-img-principal')
    const thumbs = document.getElementById('galeria-thumbs')
    const titulo = document.getElementById('galeria-titulo')

    // Exibe a primeira imagem
    imgPrincipal.src = imagens[0]
    imgPrincipal.alt = categoria

    // Título
    titulo.textContent = document.querySelector(`.galeria-item[data-gallery-id="${categoria}"] .galeria-caption`)?.textContent || ''

    // Miniaturas
    thumbs.innerHTML = ''
    imagens.forEach((src, idx) => {
        const thumb = document.createElement('img')
        thumb.src = src
        thumb.alt = categoria + ' thumb ' + (idx + 1)
        thumb.className = idx === 0 ? 'active' : ''
        thumb.addEventListener('click', () => {
            imgPrincipal.src = src
            thumbs.querySelectorAll('img').forEach(img => img.classList.remove('active'))
            thumb.classList.add('active')
        })
        thumbs.appendChild(thumb)
    })

    modal.style.display = 'flex'
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new HeaderNavigation()
    new AqualitecWebsite()

    // Close modals
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal-overlay').style.display = 'none'
        })
    })

    // Gallery items click
    document.querySelectorAll('.galeria-item').forEach(item => {
        item.addEventListener('click', () => {
            const categoria = item.getAttribute('data-gallery-id')
            abrirModalGaleria(categoria)
        })
    })
})
