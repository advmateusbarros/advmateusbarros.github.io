document.addEventListener("DOMContentLoaded", () => {

      type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Souza Barros Araújo Advogados Associados",
      "url": "https://souzabarrosaraujo.adv.br",
      "logo": "https://souzabarrosaraujo.adv.br/src/images/logo/colorida_semfundo_legenda.png",
      "sameAs": [
        "https://www.linkedin.com/company/sbaadvogados",
        "https://www.instagram.com/advocacia.sba"
      ]
    }


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



// ========== SIMULADOR JURÍDICO INTELIGENTE ==========

const perguntas = [
    {
      id: "inicio",
      texto: "Em qual área o Escritório SBA pode ajudar você?",
      opcoes: [
        { texto: "Direito Médico", proximo: "medico" },
        { texto: "Direito Criminal", proximo: "criminal" },
        { texto: "Direito Tributário/Empresarial", proximo: "tributario" },
        { texto: "Direito Trabalhista", proximo: "trabalhista" },    
        { texto: "Previdenciário", proximo: "Previdenciário" },     
        { texto: "Outra", proximo: "outro" }
      ]
    },
    {
      id: "medico",
      texto: "Seu caso envolve erro médico ou consultoria preventiva?",
      opcoes: [
        { texto: "Erro Médico", resultado: "erro_medico" },
        { texto: "Consultoria Preventiva", resultado: "consultoria_medico" }
      ]
    },
    {
        id: "previdenciario",
        texto: "Seu caso previdenciário envolve qual situação?",
        opcoes: [
          { texto: "Aposentadoria", resultado: "aposentadoria" },
          { texto: "Auxílio Doença", resultado: "auxilio_doenca" }
        ]
      },
    {
        id: "criminal",
        texto: "Você ou alguém próximo está sendo investigado, foi preso ou citado em algum processo criminal?",
        opcoes: [
          { texto: "Fui preso ou estou sendo investigado", resultado: "defesa_criminal" },
          { texto: "Alguém da família está passando por isso", resultado: "familia_criminal" },
          { texto: "Quero saber mais sobre meus direitos", resultado: "informacao_criminal" }
        ]
      },
    {
      id: "tributario",
      texto: "Você é Pessoa Jurídica ou Física?",
      opcoes: [
        { texto: "Pessoa Jurídica", resultado: "pj_tributario" },
        { texto: "Pessoa Física", resultado: "pf_tributario" }
      ]
    },
    {
      id: "trabalhista",
      texto: "Seu caso envolve empresa ou empregado?",
      opcoes: [
        { texto: "Empregador", resultado: "empresa_trabalhista" },
        { texto: "Empregado", resultado: "empregado_trabalhista" }
      ]
    },
    {
      id: "outro",
      texto: "Deseja atendimento personalizado sobre outra área?",
      opcoes: [
        { texto: "Sim, entrar em contato", resultado: "contato" },
        { texto: "Quero explorar outras áreas", resultado: "areas" }
      ]
    }
  ];
  
  const resultados = {
    erro_medico: {
      texto: "Você pode estar enfrentando um caso de erro médico. Temos conteúdo sobre isso.",
      link: "/publicacoes/direitomedico/responsabilidade.html"
    },
    consultoria_medico: {
      texto: "Para consultoria médica preventiva, entre em contato conosco.",
      link: "#contato"
    },
    pj_tributario: {
      texto: "Temos soluções estratégicas para empresas com desafios tributários.",
      link: "#areas"
    },
    pf_tributario: {
      texto: "Acesse nossos conteúdos sobre restituição, IR e planejamento fiscal pessoal.",
      link: "/publicacoes"
    },
    empresa_trabalhista: {
      texto: "Nossa equipe orienta empregadores em ações preventivas e contenciosas.",
      link: "#areas"
    },
    empregado_trabalhista: {
      texto: "Seus direitos podem estar sendo violados. Saiba mais aqui.",
      link: "/publicacoes"
    },
    contato: {
      texto: "Fale com nosso time e receba atendimento personalizado.",
      link: "#contato"
    },
    areas: {
      texto: "Veja todas as áreas de atuação do escritório.",
      link: "#areas"
    },
    aposentadoria: {
        texto: "Acesse nossas orientações sobre aposentadoria e revisões de benefício.",
        link: "/publicacoes/previdenciario/aposentadoria.html"
      },
      auxilio_doenca: {
        texto: "Veja os direitos relacionados ao auxílio doença e como garantir o benefício.",
        link: "/publicacoes/previdenciario/auxilio-doenca.html"
      },

      // ========== RESPOSTAS DIREITO PENAL==========
      defesa_criminal: {
        texto: "Nossa equipe atua em plantão 24h para defesa de acusados em casos de prisão em flagrante, inquérito policial e processos criminais. Atuação estratégica desde o primeiro contato. Converse agora mesmo com um Advogado Senior para orientações",
         link: "https://wa.me/559184435055"
      },
      familia_criminal: {
        texto: "Orientamos familiares de pessoas presas ou investigadas, com discrição, urgência e rigor jurídico.",
         link: "https://wa.me/559184435055"
      },
      informacao_criminal: {
        texto: "Acesse conteúdos sobre direitos do acusado, defesa técnica e garantias constitucionais.",
         link: "https://wa.me/559184435055"
      }
  };
  
  const historico = [];
  
  function mostrarPergunta(id) {
    const pergunta = perguntas.find(p => p.id === id);
    if (!pergunta) return;
  
    historico.push(id);
  
    const perguntaEl = document.getElementById("pergunta");
    const opcoesEl = document.getElementById("opcoes");
  
    perguntaEl.innerText = pergunta.texto;
    opcoesEl.innerHTML = "";
  
    document.getElementById("resultado").classList.add("hidden");
    document.getElementById("simulador-container").classList.remove("hidden");
  
    pergunta.opcoes.forEach(opcao => {
      const btn = document.createElement("button");
      btn.className = `
        px-6 py-3 rounded-full border border-[#c49b57] text-[#c49b57] bg-white font-semibold
        hover:bg-[#c49b57] hover:text-white 
        focus:outline-none focus:ring-2 focus:ring-[#c49b57] focus:ring-offset-2
        transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md
      `;
      btn.innerText = opcao.texto;
      btn.onclick = () => {
        if (opcao.proximo) {
          mostrarPergunta(opcao.proximo);
        } else if (opcao.resultado) {
          mostrarResultado(opcao.resultado);
        }
      };
      opcoesEl.appendChild(btn);
    });
  
    // Botão Voltar (entre perguntas)
    if (historico.length > 1) {
      const btnVoltar = document.createElement("button");
      btnVoltar.className = `
        mt-4 px-6 py-3 rounded-full border border-gray-300 text-gray-600 bg-white font-medium
        hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
        transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-sm
      `;
      btnVoltar.innerText = "← Voltar";
      btnVoltar.onclick = () => {
        historico.pop();
        const anterior = historico.pop();
        if (anterior) mostrarPergunta(anterior);
      };
      opcoesEl.appendChild(btnVoltar);
    }
  }
  
  function mostrarResultado(id) {
    const resultado = resultados[id];
    if (!resultado) return;
  
    document.getElementById("simulador-container").classList.add("hidden");
    document.getElementById("resultado").classList.remove("hidden");
    document.getElementById("resultado-texto").innerText = resultado.texto;
    document.getElementById("resultado-link").href = resultado.link;
  
    // Ativa botão voltar no resultado final
    document.getElementById("btn-voltar-final").onclick = () => {
      const anterior = historico.pop(); // resultado
      const voltarPara = historico.pop(); // última pergunta
      if (voltarPara) mostrarPergunta(voltarPara);
    };
  }
  
  mostrarPergunta("inicio");
});