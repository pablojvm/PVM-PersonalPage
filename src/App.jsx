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
  }, []);
};

const ProjectCard = ({ titulo, descripcion, foto, liveUrl, githubUrl, index }) => {
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

const App = () => {
  const canvasRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useCanvasAnimation(canvasRef);

  const proyectos = [
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

  const handleDownloadCV = async () => {
    setIsDownloading(true);
    try {
      const link = document.createElement("a");
      link.href = "/PVM-CV.pdf";
      link.download = "Pablo-Villar-CV.pdf";
      link.click();
    } catch (error) {
      console.error("Error al descargar el CV:", error);
      alert("Error al descargar el archivo. Por favor, intenta de nuevo.");
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
          FullStack Developer & UI Lover
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={scrollToAbout}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 font-medium"
            aria-label="Conocer más sobre mí"
          >
            About Me
          </button>
          
          <button 
            onClick={scrollToProjects}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 font-medium"
            aria-label="Ver proyectos"
          >
            Proyects
          </button>

          <button 
            onClick={scrollToContact}
            className="bg-gradient-to-r from-green-500 to-teal-500 px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25 font-medium"
            aria-label="Contactar"
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
                      <p className="text-lg">Tu foto aquí</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg">
                <p className="text-lg leading-relaxed text-white/90 mb-6">
                  I'm a <span className="text-purple-300 font-semibold">Full Stack Web Developer</span> with 
                  a strong foundation in modern technologies like{' '}
                  <span className="text-yellow-300 font-medium">JavaScript</span>,{' '}
                  <span className="text-blue-300 font-medium">React</span>,{' '}
                  <span className="text-green-300 font-medium">Node.js</span>, and{' '}
                  <span className="text-green-400 font-medium">MongoDB</span>.
                </p>
                
                <p className="text-lg leading-relaxed text-white/90 mb-6">
                  After several years working in the hospitality and retail industries—where 
                  I developed key soft skills like{' '}
                  <span className="text-pink-300 font-medium">communication</span>,{' '}
                  <span className="text-pink-300 font-medium">adaptability</span>, and{' '}
                  <span className="text-pink-300 font-medium">teamwork</span>—I made a career 
                  shift into tech, driven by a passion for problem-solving and creating 
                  intuitive digital experiences.
                </p>
                
                <p className="text-lg leading-relaxed text-white/90">
                  I'm currently focused on building{' '}
                  <span className="text-purple-300 font-medium">dynamic, responsive web applications</span>, 
                  and I'm always eager to keep learning and growing as a developer.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {['JavaScript', 'TypeScript', 'HTML/CSS', 'React', 'Bootstrap', 'Tailwindcss', 'Node.js', 'Express', 'RestApis', 'MongoDB', 'MySQL', 'Git'].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 rounded-full text-white/90 text-sm font-medium hover:scale-105 transition-transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="proyectos" className="px-4 sm:px-6 lg:px-10 pb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Proyects
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
              index={index}
            />
          ))}
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
                href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCHrjmsqlCzjRzZvKgdWXhXKvZwXrsLPzqwKNNKmxtsCrZdxQXqZPWcjKlLnrFBmfKFwDTLV" 
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
              href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCHrjmsqlCzjRzZvKgdWXhXKvZwXrsLPzqwKNNKmxtsCrZdxQXqZPWcjKlLnrFBmfKFwDTLV"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 font-medium text-white"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      <footer className="text-center py-8 text-white/60 border-t border-white/10">
        <p>&copy; 2025 Pablo Villar. Done with React y ❤️</p>
      </footer>
    </div>
  );
};

export default App;