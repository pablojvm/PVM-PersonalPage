import { useEffect, useRef, useState } from "react";

const useCanvasAnimation = (canvasRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 8 + 3,
        dx: (Math.random() - 0.5) * 0.8,
        dy: (Math.random() - 0.5) * 0.8,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(147, 197, 253, 0.4)";
        ctx.fill();
        
        ctx.strokeStyle = "rgba(147, 197, 253, 0.6)";
        ctx.lineWidth = 1;
        ctx.stroke();

        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x > canvas.width + particle.r) particle.x = -particle.r;
        if (particle.x < -particle.r) particle.x = canvas.width + particle.r;
        if (particle.y > canvas.height + particle.r) particle.y = -particle.r;
        if (particle.y < -particle.r) particle.y = canvas.height + particle.r;
      });

      animationId = requestAnimationFrame(animate);
    }

    setTimeout(() => {
      animate();
    }, 100);

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef]);
};

const ProjectCard = ({ titulo, descripcion, foto, liveUrl, githubUrl }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 transform">
      <div className="relative h-48 overflow-hidden">
        {!hasError ? (
          <img
            src={foto}
            alt={titulo}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
            <span className="text-white/60 text-lg">📷</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-300 transition-colors">
          {titulo}
        </h2>
        <p className="text-white/80 text-sm leading-relaxed mb-4">
          {descripcion}
        </p>
        
        <div className="flex gap-3 mt-4">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-lg hover:scale-105 transition-all duration-200 text-green-300 hover:text-green-200 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
          
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-600/20 to-gray-800/20 border border-gray-400/30 rounded-lg hover:scale-105 transition-all duration-200 text-gray-300 hover:text-gray-200 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const tecnologias = [
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
  { name: "Express", slug: "express", color: "FFFFFF" },
  { name: "MongoDB", slug: "mongodb", color: "47A248" },
  { name: "HTML5", slug: "html5", color: "E34F26" },
  { name: "CSS", slug: "css", color: "1572B6" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "Bootstrap", slug: "bootstrap", color: "7952B3" },
  { name: "Git", slug: "git", color: "F05032" },
  { name: "Postman", slug: "postman", color: "FF6C37" },
  { name: "n8n", slug: "n8n", color: "EA4B71" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  {
    name: "Azure",
    iconUrl: "https://api.iconify.design/logos:microsoft-azure.svg",
  },
  { name: "GitHub Actions", slug: "githubactions", color: "2088FF" },
  { name: "WordPress", slug: "wordpress", color: "21759B" },
  { name: "Stripe", slug: "stripe", color: "635BFF" },
  { name: "Brevo", slug: "brevo", color: "0B996E" },
  {
    name: "OpenAI",
    color: "FFFFFF",
    path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zM3.6087 18.3036a4.4708 4.4708 0 0 1-.5346-3.0137l.1419.0852 4.7783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1313-1.6466zM2.3408 7.8956a4.485 4.485 0 0 1 2.3654-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654 2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.5093-2.6067-1.4998Z",
  },
  {
    name: "Anthropic",
    color: "D97757",
    path: "M13.827 3.52h3.603L24 20.481h-3.603l-6.57-16.96zm-7.258 0h3.767l6.57 16.96H13.34l-1.343-3.461H5.165l-1.344 3.46H0L6.569 3.52zm4.261 10.014L8.448 7.605l-2.382 5.93h4.764z",
  },
];

const TechCarousel = () => {
  const lista = [...tecnologias, ...tecnologias];

  return (
    <section id="tech" className="py-20 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
        Tech Stack
      </h2>
      <p className="text-center text-white/70 max-w-2xl mx-auto mb-12 px-4">
        Tools and technologies I use to build full-stack apps and automations.
      </p>
      <div className="relative">
        <div className="flex gap-16 w-max animate-marquee">
          {lista.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex flex-col items-center gap-3 min-w-[80px] group"
              title={tech.name}
            >
              {tech.path ? (
                <svg
                  viewBox="0 0 24 24"
                  fill={`#${tech.color}`}
                  className="w-14 h-14 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                  aria-label={`${tech.name} logo`}
                  role="img"
                >
                  <path d={tech.path} />
                </svg>
              ) : (
                <img
                  src={tech.iconUrl || `https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
                  alt={`${tech.name} logo`}
                  className="w-14 h-14 object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                  loading="lazy"
                />
              )}
              <span className="text-xs text-white/70 group-hover:text-white transition-colors whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-800 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-indigo-900 to-transparent z-10" />
      </div>
    </section>
  );
};

const automationMetrics = [
  { valor: "20+", label: "Workflows deployed" },
  { valor: "500+ h", label: "Saved per quarter" },
  { valor: "15+", label: "APIs integrated" },
  { valor: "24/7", label: "Running pipelines" },
];

const automationCapabilities = [
  {
    titulo: "Workflow Automation",
    items: [
      "n8n workflows (self-hosted on Docker)",
      "REST API integrations",
      "Webhooks & event-driven flows",
      "Web scraping & bots",
    ],
    gradient: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-400/30",
  },
  {
    titulo: "Business Use Cases",
    items: [
      "CRM sync & lead management",
      "Email marketing automation",
      "Automated reporting & dashboards",
      "AI-powered classification & triage",
    ],
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-400/30",
  },
  {
    titulo: "Tech Stack",
    items: [
      "n8n, Docker, Linux",
      "REST APIs & Webhooks",
      "OpenAI API & LLM tooling",
      "MongoDB / Postgres",
    ],
    gradient: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-400/30",
  },
  {
    titulo: "Business Impact",
    items: [
      "Eliminated manual repetitive tasks",
      "Reduced response times drastically",
      "Real-time reporting for decisions",
      "Scalable, monitored pipelines",
    ],
    gradient: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-400/30",
  },
];

const AutomationSection = () => (
  <section id="automation" className="px-4 sm:px-6 lg:px-10 py-20">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/40 rounded-full text-purple-200 text-sm font-medium mb-4">
          What I'm doing now
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Automation Developer
        </h2>
        <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
          I design and build automated workflows that eliminate manual work — connecting CRMs,
          payment systems, AI models and internal tools to keep businesses running 24/7.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {automationMetrics.map((m) => (
          <div
            key={m.label}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center hover:scale-105 transition-all duration-300"
          >
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              {m.valor}
            </div>
            <div className="text-xs md:text-sm text-white/70 mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {automationCapabilities.map((cap) => (
          <div
            key={cap.titulo}
            className={`bg-gradient-to-br ${cap.gradient} backdrop-blur-md border ${cap.borderColor} rounded-xl p-6 hover:scale-[1.02] transition-all duration-300`}
          >
            <h3 className="text-xl font-semibold text-white mb-4">{cap.titulo}</h3>
            <ul className="space-y-2">
              {cap.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-white/85 text-sm">
                  <span className="text-purple-300 mt-0.5">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const caseStudies = [
  {
    sector: "Healthcare",
    titulo: "Patient Appointment Automation",
    problema:
      "The clinic was managing 100+ daily appointments by phone and email, with a high no-show rate and frequent scheduling errors.",
    solucion:
      "n8n workflow syncing calendar, WhatsApp Business, email and CRM. Automatic confirmation 24h in advance, self-service rescheduling and AI-powered triage.",
    tech: ["n8n", "WhatsApp API", "OpenAI", "REST APIs", "MongoDB"],
    impacto: ["−70% admin time", "+40% appointment attendance", "24/7 automated response"],
    gradient: "from-blue-500 to-cyan-500",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-3-3v6m9-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    sector: "E-commerce",
    titulo: "Inventory & Order Sync Pipeline",
    problema:
      "Stock mismatches between WordPress/WooCommerce, the supplier's ERP and the physical store caused overselling and weekly manual reports.",
    solucion:
      "Automated pipeline that syncs stock in real time between WooCommerce and the ERP, generates daily reports and alerts on anomalies via Slack.",
    tech: ["n8n", "WordPress", "REST APIs", "Docker", "Azure"],
    impacto: ["0 overselling incidents", "−85% reporting time", "Sync in < 30 seconds"],
    gradient: "from-purple-500 to-pink-500",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
      </svg>
    ),
  },
  {
    sector: "Marketing Agency",
    titulo: "AI-Powered Lead Qualification",
    problema:
      "The sales team manually qualified hundreds of leads from web, ads and events, with response times of 24–48 hours.",
    solucion:
      "Workflow that captures leads, enriches them with public data, scores them with AI and triggers personalized email sequences in Brevo.",
    tech: ["n8n", "OpenAI", "Brevo", "Webhooks", "MongoDB"],
    impacto: ["Initial response in < 2 min", "+3× qualified leads/day", "+25% conversion rate"],
    gradient: "from-green-500 to-emerald-500",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const CaseStudyCard = ({ sector, titulo, problema, solucion, tech, impacto, gradient, icon }) => (
  <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:scale-[1.02] hover:border-white/30 transition-all duration-300 flex flex-col">
    <div className="flex items-start gap-4 mb-5">
      <div
        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-xs text-purple-300 uppercase tracking-wider font-semibold">{sector}</span>
        <h3 className="text-lg font-semibold text-white mt-1 leading-tight">{titulo}</h3>
      </div>
    </div>

    <div className="space-y-4 mb-5 flex-grow">
      <div>
        <h4 className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-1">Challenge</h4>
        <p className="text-sm text-white/80 leading-relaxed">{problema}</p>
      </div>
      <div>
        <h4 className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-1">Solution</h4>
        <p className="text-sm text-white/80 leading-relaxed">{solucion}</p>
      </div>
    </div>

    <div className="flex flex-wrap gap-2 mb-4">
      {tech.map((t) => (
        <span key={t} className="px-2.5 py-1 bg-white/5 border border-white/15 rounded-md text-xs text-white/80">
          {t}
        </span>
      ))}
    </div>

    <div className="border-t border-white/10 pt-4 space-y-1.5">
      {impacto.map((i) => (
        <div key={i} className="flex items-center gap-2 text-sm text-green-300">
          <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>{i}</span>
        </div>
      ))}
    </div>

    <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
      <svg className="w-3.5 h-3.5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      <span className="text-xs text-white/40 italic">Confidential client · details anonymized</span>
    </div>
  </div>
);

const App = () => {
  const canvasRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useCanvasAnimation(canvasRef);

  const proyectos = [
    {
      titulo: "Galileo Psicólogos",
      descripcion: "Galileo Psicólogos is a full-stack web application designed to provide an accessible and seamless digital experience for patients, focused on mental health services..",
      foto: "/captura5.png",
      liveUrl: "https://galileopsicologos.netlify.app/",
      githubUrl: "https://github.com/pablojvm/GalileoPsicologos-Client"
    },
    {
      titulo: "AirB2B",
      descripcion: "AirB2B is a full-stack application inspired by Airbnb, focused on corporate accommodation.",
      foto: "/captura4.png",
      liveUrl: "https://airb2b.netlify.app/",
      githubUrl: "https://github.com/pablojvm/AirB2B-Client"
    },
    {
      titulo: "MiMusico",
      descripcion: "An application to search for and post second-hand instrument ads and music groups.",
      foto: "/captura1.png",
      liveUrl: "https://mimusico.netlify.app",
      githubUrl: "https://github.com/pablojvm/MiMusico-client"
    },
    {
      titulo: "GoGurl!",
      descripcion: "A wiki app with information about the world of Drag Race España.",
      foto: "/captura2.png",
      liveUrl: "https://go-gurl.netlify.app/",
      githubUrl: "https://github.com/pablojvm/Go-Gurl-Client"
    },
    {
      titulo: "Drag for the Crown",
      descripcion: "A drag-themed mini-game with DOM manipulation.",
      foto: "/captura3.png",
      liveUrl: "https://pablojvm.github.io/drag-for-the-crown/",
      githubUrl: "https://github.com/pablojvm/drag-for-the-crown"
    },
  ];

  const handleDownloadCV = () => {
    setIsDownloading(true);
    try {
      const link = document.createElement("a");
      link.href = "/PVM-CV.pdf";
      link.download = "Pablo-Villar-CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the CV:", error);
      alert("Error downloading the file. Please try again.");
    } finally {
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#proyectos');
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToAutomation = () => {
    const automationSection = document.querySelector('#automation');
    if (automationSection) {
      automationSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-r from-slate-800 to-indigo-900 text-white" style={{ zIndex: 2 }}>
      
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />

      <header className="text-center py-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Hi, I'm Pablo
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
          FullStack & Automation Developer
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={scrollToAbout}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 font-medium"
            aria-label="Learn more about me"
          >
            About Me
          </button>

          <button
            onClick={scrollToAutomation}
            className="bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-500/25 font-medium"
            aria-label="View automation experience"
          >
            Automation
          </button>

          <button
            onClick={scrollToProjects}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 font-medium"
            aria-label="View projects"
          >
            Projects
          </button>

          <button
            onClick={scrollToContact}
            className="bg-gradient-to-r from-green-500 to-teal-500 px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25 font-medium"
            aria-label="Contact"
          >
            Contact
          </button>
          
          <button
            onClick={handleDownloadCV}
            disabled={isDownloading}
            className="bg-white text-black px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-white/25 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Download CV"
          >
            {isDownloading ? 'Downloading...' : 'Download CV'}
          </button>
        </div>
      </header>

      <section id="about" className="px-4 sm:px-6 lg:px-10 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            About Me
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="flex justify-center lg:justify-start">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative">
                  <img
                    src="/pablo.jpeg"
                    alt="Pablo Villar - Full Stack Developer"
                    className="w-80 h-80 object-cover rounded-2xl shadow-2xl border-4 border-white/20"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl shadow-2xl border-4 border-white/20 items-center justify-center">
                    <div className="text-center text-white/80">
                      <div className="text-6xl mb-4">👨🏼‍💻</div>
                      <p className="text-lg">Your photo here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg">
                <p className="text-lg leading-relaxed text-white/90 mb-6">
                  I'm a <span className="text-purple-300 font-semibold">Full Stack & Automation Developer</span> with
                  a strong foundation in{' '}
                  <span className="text-yellow-300 font-medium">JavaScript</span>,{' '}
                  <span className="text-blue-300 font-medium">React</span>,{' '}
                  <span className="text-green-300 font-medium">Node.js</span> and{' '}
                  <span className="text-green-400 font-medium">MongoDB</span>, now focused
                  on building workflows with <span className="text-pink-300 font-medium">n8n</span>,{' '}
                  <span className="text-cyan-300 font-medium">Docker</span> and{' '}
                  <span className="text-purple-300 font-medium">AI integrations</span>.
                </p>

                <p className="text-lg leading-relaxed text-white/90 mb-6">
                  After several years working in the hospitality and retail industries—where
                  I developed key soft skills like{' '}
                  <span className="text-pink-300 font-medium">communication</span>,{' '}
                  <span className="text-pink-300 font-medium">adaptability</span> and{' '}
                  <span className="text-pink-300 font-medium">teamwork</span>—I made a career
                  shift into tech, driven by a passion for problem-solving and turning
                  manual processes into{' '}
                  <span className="text-purple-300 font-medium">scalable digital solutions</span>.
                </p>

                <p className="text-lg leading-relaxed text-white/90">
                  Today I split my time between shipping{' '}
                  <span className="text-purple-300 font-medium">full-stack web apps</span>{' '}
                  and designing automations that connect{' '}
                  <span className="text-blue-300 font-medium">APIs</span>,{' '}
                  <span className="text-blue-300 font-medium">CRMs</span> and{' '}
                  <span className="text-blue-300 font-medium">LLMs</span> to save teams hundreds
                  of hours — always eager to keep learning and growing.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {['Full Stack', 'Automation', 'AI Integrations', 'API Design', 'Self-hosting'].map((focus) => (
                  <span
                    key={focus}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 rounded-full text-white/90 text-sm font-medium hover:scale-105 transition-transform"
                  >
                    {focus}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TechCarousel />

      <AutomationSection />

      <section id="proyectos" className="px-4 sm:px-6 lg:px-10 pb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Featured Projects
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {proyectos.map((proyecto, index) => (
            <ProjectCard
              key={index}
              titulo={proyecto.titulo}
              descripcion={proyecto.descripcion}
              foto={proyecto.foto}
              liveUrl={proyecto.liveUrl}
              githubUrl={proyecto.githubUrl}
            />
          ))}
        </div>
      </section>

      <section id="case-studies" className="px-4 sm:px-6 lg:px-10 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Professional Case Studies
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              A selection of automation projects delivered under NDA. Client names and screenshots
              are omitted; the technical and business outcomes are real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <CaseStudyCard key={i} {...cs} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 sm:px-6 lg:px-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Let's Connect
          </h2>
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about tech. 
            Feel free to reach out!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:scale-105 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
              <a
                href="mailto:pablo.villar.moron@gmail.com"
                className="text-blue-300 hover:text-blue-200 transition-colors"
              >
                pablo.villar.moron@gmail.com
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:scale-105 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">LinkedIn</h3>
              <a 
                href="https://www.linkedin.com/in/pablo-villar-webdeveloper/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 transition-colors"
              >
                /in/pablo-villar-webdeveloper
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:scale-105 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">GitHub</h3>
              <a 
                href="https://github.com/pablojvm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 transition-colors"
              >
                /pablojvm
              </a>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to work together?</h3>
            <p className="text-white/80 mb-6">
              Let's discuss your next project and see how I can help bring your ideas to life.
            </p>
            <a
              href="mailto:pablo.villar.moron@gmail.com"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 font-medium text-white"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      <footer className="text-center py-8 text-white/60 border-t border-white/10">
        <p>&copy; {new Date().getFullYear()} Pablo Villar. Made with React &amp; ❤️</p>
      </footer>
    </div>
  );
};

export default App;