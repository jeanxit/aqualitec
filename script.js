// Modern JavaScript with ES6+ features and better mobile support
class AqualitecWebsite {
  constructor() {
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.setupIntersectionObserver()
    this.setupLazyLoading()
    this.setupSmoothScrolling()
    this.setupFormHandling()
    this.setupGalleryFilter()
    this.setupWindowResize()
    this.setupMobileOptimizations() // Adicione esta linha
  }

  setupEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.getElementById("menu-toggle")
    const mobileMenu = document.getElementById("mobile-menu")
    const mobileOverlay = document.getElementById("mobile-menu-overlay")
    const mobileMenuClose = document.getElementById("mobile-menu-close")

    if (menuToggle && mobileMenu) {
      // Open menu
      menuToggle.addEventListener("click", (e) => {
        e.preventDefault()
        this.toggleMobileMenu()
      })

      // Close menu via close button
      mobileMenuClose?.addEventListener("click", (e) => {
        e.preventDefault()
        this.closeMobileMenu()
      })

      // Close menu via overlay
      mobileOverlay?.addEventListener("click", () => {
        this.closeMobileMenu()
      })

      // Close menu when clicking nav links
      mobileMenu.querySelectorAll(".mobile-nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          this.closeMobileMenu()
        })
      })

      // Close menu on escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
          this.closeMobileMenu()
        }
      })
    }

    // Desktop menu links
    document.querySelectorAll(".desktop-menu .nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        // Update active state
        document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"))
        link.classList.add("active")
      })
    })

    // Header scroll effect
    this.setupHeaderScroll()

    // Scroll to top button
    this.setupScrollToTop()

    // Gallery modal
    this.setupGalleryModal()

    // Service modal
    this.setupServiceModal()

    // Touch gestures for mobile
    this.setupTouchGestures()

    // Prevent scroll when menu is open
    this.setupScrollLock()
  }

  toggleMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle")
    const mobileMenu = document.getElementById("mobile-menu")
    const overlay = document.getElementById("mobile-menu-overlay")

    const isActive = mobileMenu.classList.contains("active")

    if (isActive) {
      this.closeMobileMenu()
    } else {
      this.openMobileMenu()
    }
  }

  openMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle")
    const mobileMenu = document.getElementById("mobile-menu")
    const overlay = document.getElementById("mobile-menu-overlay")

    // Add active classes
    mobileMenu.classList.add("active")
    menuToggle.classList.add("active")
    overlay.classList.add("active")

    // Prevent body scroll
    document.body.style.overflow = "hidden"
    document.body.style.position = "fixed"
    document.body.style.width = "100%"

    // Update ARIA attributes
    menuToggle.setAttribute("aria-expanded", "true")
    mobileMenu.setAttribute("aria-hidden", "false")

    // Focus first menu item for accessibility
    setTimeout(() => {
      const firstMenuItem = mobileMenu.querySelector(".mobile-nav-link")
      firstMenuItem?.focus()
    }, 300)

    // Add animation class
    setTimeout(() => {
      mobileMenu.classList.add("menu-animated")
    }, 50)
  }

  closeMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle")
    const mobileMenu = document.getElementById("mobile-menu")
    const overlay = document.getElementById("mobile-menu-overlay")

    // Remove active classes
    mobileMenu.classList.remove("active")
    menuToggle.classList.remove("active")
    overlay.classList.remove("active")
    mobileMenu.classList.remove("menu-animated")

    // Restore body scroll
    document.body.style.overflow = ""
    document.body.style.position = ""
    document.body.style.width = ""

    // Update ARIA attributes
    menuToggle.setAttribute("aria-expanded", "false")
    mobileMenu.setAttribute("aria-hidden", "true")

    // Return focus to menu toggle
    menuToggle.focus()
  }

  setupScrollLock() {
    let scrollY = 0

    const lockScroll = () => {
      scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
    }

    const unlockScroll = () => {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      window.scrollTo(0, scrollY)
    }

    // Export methods for use in other functions
    this.lockScroll = lockScroll
    this.unlockScroll = unlockScroll
  }

  setupHeaderScroll() {
    const header = document.getElementById("main-header")
    let lastScrollY = window.scrollY
    let ticking = false

    const updateHeader = () => {
      const scrollY = window.scrollY

      if (scrollY > 100) {
        header?.classList.add("scrolled")
      } else {
        header?.classList.remove("scrolled")
      }

      // Hide header on scroll down, show on scroll up
      if (scrollY > lastScrollY && scrollY > 200) {
        header.style.transform = "translateY(-100%)"
      } else {
        header.style.transform = "translateY(0)"
      }

      lastScrollY = scrollY
      ticking = false
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader)
        ticking = true
      }
    })
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

      window.addEventListener("scroll", () => {
        if (!ticking) {
          requestAnimationFrame(updateScrollBtn)
          ticking = true
        }
      })

      scrollBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
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

          // Update active nav link
          const id = entry.target.id
          if (id) {
            this.updateActiveNavLink(id)
          }
        }
      })
    }, observerOptions)

    // Observe all sections
    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section)
    })
  }

  updateActiveNavLink(activeId) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${activeId}`) {
        link.classList.add("active")
      }
    })
  }

  setupLazyLoading() {
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.classList.add("loaded")
              imageObserver.unobserve(img)
            }
          }
        })
      })

      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img)
      })
    }
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href"))

        if (target) {
          const headerHeight = document.getElementById("main-header")?.offsetHeight || 0
          const targetPosition = target.offsetTop - headerHeight - 20

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
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

    const modalImg = document.getElementById("galeria-img-principal")
    const modalTitle = document.getElementById("galeria-titulo")
    const modalDesc = document.getElementById("galeria-descricao")
    const modalThumbs = document.getElementById("galeria-thumbs")

    const galleryData = {
      box: {
        title: "Box para Banheiro em Vidro Temperado",
        description:
          "Boxes modernos e seguros com vidro temperado de alta qualidade, design personalizado e instalação profissional.",
        images: [
          "https://vidrosdelivery.com.br/wp-content/uploads/2023/09/001-BOX-BT3-TEC-VIDRO-3-FOLHAS-DE-CORRER-PRETO-D.png",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
      },
      fachada: {
        title: "Fachadas em Vidro",
        description:
          "Fachadas modernas que combinam estética, funcionalidade e eficiência energética para seu projeto.",
        images: [
          "WhatsApp Image 2025-07-20 at 14.26.46 (1).png",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
      },
      // Add more gallery data as needed
    }

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
      // Add more service data as needed
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

  closeAllModals() {
    document.querySelectorAll(".modal-overlay").forEach((modal) => {
      this.closeModal(modal)
    })
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
          // Simulate form submission (replace with actual endpoint)
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

  setupTouchGestures() {
    let touchStartX = 0
    let touchEndX = 0
    let touchStartY = 0
    let touchEndY = 0
    let touchStartTime = 0

    const mobileMenu = document.getElementById("mobile-menu")
    const overlay = document.getElementById("mobile-menu-overlay")

    if (!mobileMenu) return

    // Improved touch handling for menu
    mobileMenu.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX
        touchStartY = e.changedTouches[0].screenY
        touchStartTime = Date.now()
      },
      { passive: true },
    )

    mobileMenu.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX
        touchEndY = e.changedTouches[0].screenY
        this.handleSwipeGesture()
      },
      { passive: true },
    )

    // Enhanced overlay touch handling
    if (overlay) {
      overlay.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.changedTouches[0].screenX
          touchStartTime = Date.now()
        },
        { passive: true },
      )

      overlay.addEventListener(
        "touchend",
        (e) => {
          touchEndX = e.changedTouches[0].screenX
          const touchDuration = Date.now() - touchStartTime

          // Quick tap to close
          if (touchDuration < 200 && Math.abs(touchStartX - touchEndX) < 10) {
            this.closeMobileMenu()
          }
          // Swipe to close
          else if (touchStartX - touchEndX > 50) {
            this.closeMobileMenu()
          }
        },
        { passive: true },
      )
    }

    // Add touch feedback for gallery items
    const galleryItems = document.querySelectorAll(".galeria-item")
    galleryItems.forEach((item) => {
      item.addEventListener(
        "touchstart",
        () => {
          item.style.transform = "scale(0.98)"
        },
        { passive: true },
      )

      item.addEventListener(
        "touchend",
        () => {
          setTimeout(() => {
            item.style.transform = ""
          }, 150)
        },
        { passive: true },
      )
    })

    // Enhanced button touch feedback
    const buttons = document.querySelectorAll(".btn-primary, .btn-secondary, .zap-btn, .btn-submit")
    buttons.forEach((button) => {
      button.addEventListener(
        "touchstart",
        () => {
          button.style.transform = "scale(0.97)"
        },
        { passive: true },
      )

      button.addEventListener(
        "touchend",
        () => {
          setTimeout(() => {
            button.style.transform = ""
          }, 150)
        },
        { passive: true },
      )
    })
  }

  // Mobile-specific optimizations
  setupMobileOptimizations() {
    // Prevent zoom on input focus (iOS)
    const inputs = document.querySelectorAll("input, textarea, select")
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        if (window.innerWidth < 768) {
          const viewport = document.querySelector('meta[name="viewport"]')
          if (viewport) {
            viewport.setAttribute(
              "content",
              "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
            )
          }
        }
      })

      input.addEventListener("blur", () => {
        if (window.innerWidth < 768) {
          const viewport = document.querySelector('meta[name="viewport"]')
          if (viewport) {
            viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=5.0")
          }
        }
      })
    })

    // Improve scroll performance on mobile
    let ticking = false
    const updateScrollElements = () => {
      // Update header
      const header = document.getElementById("main-header")
      const scrollY = window.scrollY

      if (scrollY > 50) {
        header?.classList.add("scrolled")
      } else {
        header?.classList.remove("scrolled")
      }

      // Update scroll to top button
      const scrollBtn = document.getElementById("scrollToTopBtn")
      if (scrollY > 300) {
        scrollBtn?.classList.add("show")
      } else {
        scrollBtn?.classList.remove("show")
      }

      ticking = false
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(updateScrollElements)
          ticking = true
        }
      },
      { passive: true },
    )

    // Handle orientation change
    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        // Close mobile menu on orientation change
        this.closeMobileMenu()

        // Recalculate viewport height
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty("--vh", `${vh}px`)
      }, 100)
    })

    // Set initial viewport height for mobile browsers
    const setVH = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    setVH()
    window.addEventListener("resize", setVH)
  }

  handleSwipeGesture() {
    const swipeThreshold = 80
    const timeThreshold = 500
    const touchDuration = Date.now() - this.touchStartTime

    // Check if it's a valid swipe (not too slow, not too vertical)
    const horizontalDistance = Math.abs(this.touchEndX - this.touchStartX)
    const verticalDistance = Math.abs(this.touchEndY - this.touchStartY)

    if (horizontalDistance > verticalDistance && horizontalDistance > swipeThreshold && touchDuration < timeThreshold) {
      // Swipe right to left - close menu
      if (this.touchStartX - this.touchEndX > swipeThreshold) {
        this.closeMobileMenu()
      }
    }
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

  // Performance optimization: Debounce function
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Performance optimization: Throttle function
  throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments

      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  // Add method to handle window resize
  setupWindowResize() {
    let resizeTimeout

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        // Close mobile menu if window becomes desktop size
        if (window.innerWidth > 768) {
          this.closeMobileMenu()
        }
      }, 250)
    })
  }
}

// Initialize the website when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new AqualitecWebsite()
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

// Performance monitoring
if ("PerformanceObserver" in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === "largest-contentful-paint") {
        console.log("LCP:", entry.startTime)
      }
    }
  })

  observer.observe({ entryTypes: ["largest-contentful-paint"] })
}
