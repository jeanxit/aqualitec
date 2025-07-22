document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle")
  const menu = document.querySelector(".menu")

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active")
      // Optionally change icon
      if (menu.classList.contains("active")) {
        menuToggle.innerHTML = '<i class="bi bi-x-lg"></i>'
      } else {
        menuToggle.innerHTML = '<i class="bi bi-list"></i>'
      }
    })

    // Close menu when a link is clicked (for smooth scrolling)
    document.querySelectorAll(".menu .nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("active")
        menuToggle.innerHTML = '<i class="bi bi-list"></i>' // Reset icon
      })
    })
  }

  // Header Scroll Effect
  const header = document.getElementById("main-header")
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }

  // Scroll to Top Button
  const scrollToTopBtn = document.getElementById("scrollToTopBtn")
  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add("show")
      } else {
        scrollToTopBtn.classList.remove("show")
      }
    })

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Gallery Modal Logic
  const galeriaItems = document.querySelectorAll(".galeria-item")
  const modalGaleria = document.getElementById("modal-galeria")
  const galeriaImgPrincipal = document.getElementById("galeria-img-principal")
  const galeriaTitulo = document.getElementById("galeria-titulo")
  const galeriaDescricao = document.getElementById("galeria-descricao")
  const galeriaThumbs = document.getElementById("galeria-thumbs")
  const modalCloseButtons = document.querySelectorAll(".modal-close")

  const galleryData = {
    box: {
      title: "Box para Banheiro",
      description: "Box de vidro temperado, ideal para banheiros modernos e seguros.",
      images: [
        "https://vidrosdelivery.com.br/wp-content/uploads/2023/09/001-BOX-BT3-TEC-VIDRO-3-FOLHAS-DE-CORRER-PRETO-D.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ2ABSVSmgb1EE7VqaIQi47RU7cPPwGdO7tw&s",
        "data:image/jpeg;base64,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",
      ],
    },
    fachada: {
      title: "Fachada de Vidro",
      description: "Fachadas modernas e elegantes que valorizam a arquitetura do seu imóvel.",
      images: [
        "WhatsApp Image 2025-07-20 at 14.26.46 (1).png",
        "/placeholder.svg?height=150&width=250",
        "/placeholder.svg?height=150&width=250",
      ],
    },
    espelho: {
      title: "Espelho Decorativo",
      description: "Espelhos sob medida para decorar e ampliar ambientes com sofisticação.",
      images: [
        "WhatsApp Image 2025-07-20 at 14.26.46 (2).png",
        "/placeholder.svg?height=150&width=250",
        "/placeholder.svg?height=150&width=250",
      ],
    },
    varanda: {
      title: "Fechamento de Varanda",
      description: "Fechamento de sacadas e varandas com vidro, proporcionando conforto e segurança.",
      images: [
        "WhatsApp Image 2025-07-20 at 14.26.47.png",
        "/placeholder.svg?height=150&width=250",
        "/placeholder.svg?height=150&width=250",
      ],
    },
    "guarda-corpo": {
      title: "Guarda-Corpo em Vidro",
      description: "Guarda-corpos elegantes e seguros para escadas, varandas e mezaninos.",
      images: [
        "WhatsApp Image 2025-07-20 at 14.26.47 (1).png",
        "/placeholder.svg?height=150&width=250",
        "/placeholder.svg?height=150&width=250",
      ],
    },
    porta: {
      title: "Porta de Vidro Temperado",
      description: "Portas de vidro temperado para ambientes internos e externos, com design e durabilidade.",
      images: [
        "WhatsApp Image 2025-07-20 at 14.26.47 (2).png",
        "/placeholder.svg?height=150&width=250",
        "/placeholder.svg?height=150&width=250",
      ],
    },
    vitrine: {
      title: "Vitrines Comerciais",
      description: "Vitrines personalizadas para destacar seus produtos e atrair clientes.",
      images: [
        "WhatsApp Image 2025-07-20 at 14.26.47 (3).png",
        "/placeholder.svg?height=150&width=250",
        "/placeholder.svg?height=150&width=250",
      ],
    },
    outro: {
      title: "Outros Projetos em Vidro",
      description: "Diversos outros projetos em vidro, adaptados às suas necessidades.",
      images: [
        "WhatsApp Image 2025-07-20 at 14.26.47 (4).png",
        "/placeholder.svg?height=150&width=250",
        "/placeholder.svg?height=150&width=250",
      ],
    },
  }

  galeriaItems.forEach((item) => {
    item.addEventListener("click", () => {
      const serviceId = item.dataset.galleryId
      const data = galleryData[serviceId]

      if (data) {
        galeriaTitulo.textContent = data.title
        galeriaDescricao.textContent = data.description
        galeriaThumbs.innerHTML = "" // Clear previous thumbnails

        data.images.forEach((imgSrc, index) => {
          const thumb = document.createElement("img")
          thumb.src = imgSrc
          thumb.alt = `${data.title} - Imagem ${index + 1}`
          thumb.classList.add("galeria-thumb")
          if (index === 0) {
            thumb.classList.add("active")
            galeriaImgPrincipal.src = imgSrc
            galeriaImgPrincipal.alt = `${data.title} - Imagem principal`
          }
          thumb.addEventListener("click", () => {
            galeriaImgPrincipal.src = imgSrc
            document.querySelectorAll(".galeria-thumb").forEach((t) => t.classList.remove("active"))
            thumb.classList.add("active")
          })
          galeriaThumbs.appendChild(thumb)
        })

        modalGaleria.style.display = "flex"
      }
    })
  })

  // Service Details Modal Logic
  const servicosListItems = document.querySelectorAll(".servicos-list li")
  const modalServico = document.getElementById("modal-servico")
  const servicoTitulo = document.getElementById("servico-titulo")
  const servicoDescricao = document.getElementById("servico-descricao")
  const servicoBeneficios = document.getElementById("servico-beneficios")
  const modalContactBtn = document.querySelector("#modal-servico .modal-contact-btn")

  const serviceDetailsData = {
    box: {
      title: "Box para Banheiro em Vidro Temperado",
      description:
        "Oferecemos boxes de banheiro sob medida, com vidro temperado de alta qualidade, garantindo segurança, durabilidade e um toque de modernidade ao seu banheiro. Diversas opções de ferragens e acabamentos.",
      benefits: [
        "Segurança e resistência do vidro temperado",
        "Design moderno e personalizável",
        "Fácil limpeza e manutenção",
        "Valorização do ambiente",
      ],
    },
    sacada: {
      title: "Fechamento de Sacadas e Varandas",
      description:
        "Transforme sua sacada ou varanda em um ambiente versátil e protegido com nossos sistemas de fechamento em vidro. Ideal para aproveitar o espaço em todas as estações, com proteção contra vento, chuva e ruído.",
      benefits: [
        "Proteção contra intempéries e ruídos",
        "Ampliação do espaço útil",
        "Ventilação e iluminação natural",
        "Valorização estética do imóvel",
      ],
    },
    fachada: {
      title: "Fachadas em Vidro",
      description:
        "Desenvolvemos e instalamos fachadas de vidro que combinam estética, funcionalidade e eficiência energética. Soluções ideais para edifícios comerciais e residenciais que buscam modernidade e visibilidade.",
      benefits: [
        "Estética moderna e sofisticada",
        "Otimização da luz natural",
        "Isolamento térmico e acústico",
        "Durabilidade e baixa manutenção",
      ],
    },
    espelho: {
      title: "Espelhos Decorativos Sob Medida",
      description:
        "Crie ambientes mais amplos e luminosos com nossos espelhos decorativos sob medida. Perfeitos para salas, quartos, banheiros e halls, com opções de lapidação, bisotê e molduras.",
      benefits: [
        "Ampliação visual do espaço",
        "Aumento da luminosidade",
        "Design personalizado",
        "Acabamento impecável",
      ],
    },
    "guarda-corpo": {
      title: "Guarda-Corpo em Vidro",
      description:
        "Garanta segurança e elegância para escadas, varandas, mezaninos e piscinas com guarda-corpos de vidro. Nossas soluções oferecem transparência e resistência, sem comprometer a vista.",
      benefits: [
        "Segurança e conformidade com normas",
        "Design clean e moderno",
        "Visibilidade desobstruída",
        "Resistência e durabilidade",
      ],
    },
    portas: {
      title: "Portas e Janelas de Vidro Temperado",
      description:
        "Fabricamos e instalamos portas e janelas de vidro temperado para diversos ambientes. Soluções que oferecem segurança, beleza e praticidade, com sistemas de abertura variados.",
      benefits: [
        "Alta resistência a impactos",
        "Design versátil e elegante",
        "Otimização da iluminação natural",
        "Fácil manuseio e limpeza",
      ],
    },
    vitrine: {
      title: "Vitrines Comerciais",
      description:
        "Destaque seus produtos e atraia mais clientes com vitrines comerciais de vidro personalizadas. Projetamos e instalamos vitrines que valorizam sua marca e otimizam a exposição dos itens.",
      benefits: [
        "Máxima exposição de produtos",
        "Design atraente e profissional",
        "Segurança reforçada",
        "Personalização completa",
      ],
    },
    laminado: {
      title: "Vidros Laminados e Temperados",
      description:
        "Trabalhamos com uma ampla gama de vidros laminados e temperados, ideais para diversas aplicações que exigem segurança e performance. Consulte-nos para projetos especiais.",
      benefits: [
        "Maior segurança contra estilhaçamento (laminado)",
        "Alta resistência mecânica (temperado)",
        "Controle solar e acústico (opcional)",
        "Versatilidade para diferentes projetos",
      ],
    },
  }

  servicosListItems.forEach((item) => {
    item.addEventListener("click", () => {
      const serviceId = item.dataset.serviceId
      const data = serviceDetailsData[serviceId]

      if (data) {
        servicoTitulo.textContent = data.title
        servicoDescricao.textContent = data.description
        servicoBeneficios.innerHTML = "" // Clear previous benefits

        data.benefits.forEach((benefit) => {
          const li = document.createElement("li")
          li.innerHTML = `<i class="bi bi-check2-circle"></i> ${benefit}`
          servicoBeneficios.appendChild(li)
        })

        // Update the contact button link to include service context
        modalContactBtn.href = `#contato?service=${encodeURIComponent(data.title)}`

        modalServico.style.display = "flex"
      }
    })
  })

  // Close Modals
  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modalGaleria.style.display = "none"
      modalServico.style.display = "none"
    })
  })

  // Close modal if clicking outside the modal-box
  window.addEventListener("click", (event) => {
    if (event.target === modalGaleria) {
      modalGaleria.style.display = "none"
    }
    if (event.target === modalServico) {
      modalServico.style.display = "none"
    }
  })
})
