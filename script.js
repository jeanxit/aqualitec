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
    this.mobileCloseBtn = document.getElementById("mobileCloseBtn")
    this.navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")
  }

  setupEventListeners() {
    // Mobile menu toggle
    this.mobileMenuBtn?.addEventListener("click", () => this.toggleMobileMenu())
    this.mobileCloseBtn?.addEventListener("click", () => this.closeMobileMenu())
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

    // Prevent body scroll
    document.body.style.overflow = "hidden"

    // Update ARIA attributes
    this.mobileMenuBtn?.setAttribute("aria-expanded", "true")
    this.mobileMenu?.setAttribute("aria-hidden", "false")

    // Focus first menu item
    setTimeout(() => {
      const firstMenuItem = this.mobileMenu?.querySelector(".mobile-nav-link")
      firstMenuItem?.focus()
    }, 300)
  }

  closeMobileMenu() {
    this.mobileMenu?.classList.remove("active")
    this.mobileMenuOverlay?.classList.remove("active")
    this.mobileMenuBtn?.classList.remove("active")

    // Restore body scroll
    document.body.style.overflow = ""

    // Update ARIA attributes
    this.mobileMenuBtn?.setAttribute("aria-expanded", "false")
    this.mobileMenu?.setAttribute("aria-hidden", "true")

    // Return focus to menu button
    this.mobileMenuBtn?.focus()
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

      // Hide header on scroll down, show on scroll up (optional)
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
      { passive: true },
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

    // Observe all sections with IDs
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
    this.setupFormHandling()
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
        { passive: true },
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
        const data = galleryData[galleryId]

        if (data) {
          this.openGalleryModal(data, modal, modalImg, modalTitle, modalDesc, modalThumbs)
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

  openGalleryModal(data, modal, modalImg, modalTitle, modalDesc, modalThumbs) {
    modalTitle.textContent = data.title
    modalDesc.textContent = data.description
    modalThumbs.innerHTML = ""

    // Set main image
    modalImg.src = data.images[0]
    modalImg.alt = data.title

    // Create thumbnails
    data.images.forEach((imgSrc, index) => {
      const thumb = document.createElement("img")
      thumb.src = imgSrc
      thumb.alt = `${data.title} - Imagem ${index + 1}`
      thumb.classList.add("galeria-thumb")

      if (index === 0) {
        thumb.classList.add("active")
      }

      thumb.addEventListener("click", () => {
        modalImg.src = imgSrc
        document.querySelectorAll(".galeria-thumb").forEach((t) => t.classList.remove("active"))
        thumb.classList.add("active")
      })

      modalThumbs.appendChild(thumb)
    })

    this.openModal(modal)
  }

  setupServiceModal() {
    const serviceItems = document.querySelectorAll(".servicos-list li")
    const modal = document.getElementById("modal-servico")

    if (!modal) return

    const serviceData = {
      box: {
        title: "Box para Banheiro em Vidro Temperado",
        description:
          "Transforme seu banheiro com nossos boxes de vidro temperado sob medida. Oferecemos segurança, durabilidade e design moderno para criar o ambiente perfeito.",
        benefits: [
          "Vidro temperado 8mm de alta resistência",
          "Ferragens em aço inoxidável premium",
          "Design personalizado para seu espaço",
          "Instalação profissional com garantia",
          "Fácil limpeza e manutenção",
          "Valorização do seu imóvel",
        ],
      },
    }

    serviceItems.forEach((item) => {
      item.addEventListener("click", () => {
        const serviceId = item.dataset.serviceId
        const data = serviceData[serviceId]

        if (data) {
          this.openServiceModal(data, modal)
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

  openServiceModal(data, modal) {
    const title = modal.querySelector("#servico-titulo")
    const desc = modal.querySelector("#servico-descricao")
    const benefits = modal.querySelector("#servico-beneficios")

    if (title) title.textContent = data.title
    if (desc) desc.textContent = data.description

    if (benefits) {
      benefits.innerHTML = ""
      data.benefits.forEach((benefit) => {
        const li = document.createElement("li")
        li.innerHTML = `<i class="bi bi-check2-circle"></i> ${benefit}`
        benefits.appendChild(li)
      })
    }

    this.openModal(modal)
  }

  openModal(modal) {
    modal.style.display = "flex"
    document.body.style.overflow = "hidden"

    // Focus management for accessibility
    const firstFocusable = modal.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    firstFocusable?.focus()
  }

  closeModal(modal) {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  }

  setupFormHandling() {
    const form = document.querySelector(".contact-form form")

    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault()

        const submitBtn = form.querySelector(".btn-submit")
        const originalText = submitBtn.textContent

        // Show loading state
        submitBtn.textContent = "Enviando..."
        submitBtn.disabled = true

        try {
          // Simulate form submission
          await new Promise((resolve) => setTimeout(resolve, 2000))

          // Show success message
          this.showNotification("Mensagem enviada com sucesso!", "success")
          form.reset()
        } catch (error) {
          this.showNotification("Erro ao enviar mensagem. Tente novamente.", "error")
        } finally {
          submitBtn.textContent = originalText
          submitBtn.disabled = false
        }
      })
    }
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
        document.body.removeChild(notification)
      }, 300)
    }, 5000)
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HeaderNavigation()
  new AqualitecWebsite()

  // Troca da imagem principal ao clicar nas thumbnails
  const mainImg = document.getElementById("box-main-img")
  const thumbs = document.querySelectorAll("#box-thumbs .box-thumb")
  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      mainImg.src = thumb.src
      thumbs.forEach((t) => t.classList.remove("active"))
      thumb.classList.add("active")
    })
  })

  // Abrir modal ao clicar na imagem principal ou overlay
  const boxCard = document.querySelector(".box-card")
  const overlay = boxCard.querySelector(".box-overlay")
  ;[mainImg, overlay].forEach((el) => {
    el.addEventListener("click", () => {
      abrirModalGaleria("box") // Usa sua função já existente
    })
  })
})

// Service Worker registration for PWA capabilities
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Mapeamento das imagens por categoria
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
    "outros/outros1.jpeg"
  ]
};

// Função para abrir o modal da galeria
function abrirModalGaleria(categoria) {
  const imagens = galeriaImagens[categoria] || [];
  if (imagens.length === 0) return;

  const modal = document.getElementById('modal-galeria');
  const imgPrincipal = document.getElementById('galeria-img-principal');
  const thumbs = document.getElementById('galeria-thumbs');
  const titulo = document.getElementById('galeria-titulo');

  // Exibe a primeira imagem
  imgPrincipal.src = imagens[0];
  imgPrincipal.alt = categoria;

  // Título
  titulo.textContent = document.querySelector(`.galeria-item[data-gallery-id="${categoria}"] .galeria-caption`)?.textContent || '';

  // Miniaturas
  thumbs.innerHTML = '';
  imagens.forEach((src, idx) => {
    const thumb = document.createElement('img');
    thumb.src = src;
    thumb.alt = categoria + ' thumb ' + (idx + 1);
    thumb.className = idx === 0 ? 'active' : '';
    thumb.addEventListener('click', () => {
      imgPrincipal.src = src;
      thumbs.querySelectorAll('img').forEach(img => img.classList.remove('active'));
      thumb.classList.add('active');
    });
    thumbs.appendChild(thumb);
  });

  modal.style.display = 'flex';
}

// Fecha o modal
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.modal-overlay').style.display = 'none';
  });
});

// Clique nas imagens da galeria
document.querySelectorAll('.galeria-item').forEach(item => {
  item.addEventListener('click', () => {
    const categoria = item.getAttribute('data-gallery-id');
    abrirModalGaleria(categoria);
  });
});
