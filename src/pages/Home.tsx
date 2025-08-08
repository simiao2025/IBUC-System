import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, MapPin, Play } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-white bg-opacity-20 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-white bg-opacity-15 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-5 h-5 bg-white bg-opacity-25 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-white bg-opacity-30 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white bg-opacity-20 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-white bg-opacity-10 rounded-full animate-ping delay-700"></div>
      </div>

      {/* Animated Plus Signs */}
      <div className="absolute top-32 right-32 text-white text-4xl font-bold opacity-30 animate-pulse">+</div>
      <div className="absolute bottom-48 left-32 text-white text-6xl font-bold opacity-20 animate-bounce">+</div>
      <div className="absolute top-1/2 right-16 text-white text-5xl font-bold opacity-25 animate-pulse delay-1000">+</div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section with Logo */}
        <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 animate-fade-in">
            <img
              src="https://ibuc.com.br/wp-content/uploads/2023/05/logo-site.png"
              alt="IBUC Logo"
              className="h-16 w-auto mx-auto mb-4 animate-pulse"
            />
          </div>

          {/* Inaugural Class Headline */}
          <div className="mb-12 animate-slide-up">
            <div className="inline-flex items-center bg-yellow-400 text-purple-900 px-6 py-3 rounded-full font-bold text-lg mb-6 animate-bounce">
              <Calendar className="h-5 w-5 mr-2" />
              22 DE AGOSTO
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl animate-fade-in-up">
              Aula Inaugural
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-green-300 mb-6 animate-fade-in-up delay-200">
              Geral!
            </h2>
            
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white border-opacity-30 animate-fade-in-up delay-400">
              <p className="text-xl md:text-2xl text-white font-semibold mb-2">
                🎺 NO TEMPLO SEDE 🎺
              </p>
              <p className="text-lg text-white font-medium">
                ASSEMBLEIA DE DEUS MISSÃO PROJETO RESTAURANDO VIDAS
              </p>
              <p className="text-md text-white opacity-90">
                PR. SUIMAR CAETANO - PRESIDENTE
              </p>
            </div>
          </div>

          {/* Main Inaugural Image */}
          <div className="mb-12 animate-scale-in">
            <div className="relative max-w-md mx-auto">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F556e107f9581454d85126749671080db%2F3494e89c43fc4681b1f2fb736cf72a4e?format=webp&width=800"
                alt="Aula Inaugural - Instituto Bíblico IBUC"
                className="w-full h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500 border-4 border-white border-opacity-30"
              />
              
              {/* Glowing effect around image */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-300 to-pink-300 rounded-3xl opacity-75 blur-lg animate-pulse"></div>
              <div className="relative bg-white rounded-3xl"></div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="animate-fade-in-up delay-600">
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                🌟 Não Perca Esta Oportunidade! 🌟
              </h3>
              <p className="text-lg text-white mb-6 max-w-2xl mx-auto opacity-90">
                Garante já a sua vaga para participar desta experiência única de crescimento espiritual e conhecimento bíblico!
              </p>
            </div>
            
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-green-400 to-cyan-400 hover:from-green-500 hover:to-cyan-500 text-white font-bold text-xl px-12 py-4 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse"
            >
              <Link to="/matricula" className="flex items-center">
                <Users className="h-6 w-6 mr-3" />
                FAZER MATRÍCULA AGORA!
              </Link>
            </Button>
            
            <p className="text-white text-sm mt-4 opacity-75 animate-pulse">
              ✨ Vagas limitadas - Garante a sua hoje mesmo! ✨
            </p>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm py-8 mt-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="text-white">
                <Calendar className="h-12 w-12 mx-auto mb-3 text-yellow-300" />
                <h4 className="font-bold text-lg mb-2">Data Especial</h4>
                <p>22 de Agosto - Uma data que ficará na história do IBUC</p>
              </div>
              
              <div className="text-white">
                <MapPin className="h-12 w-12 mx-auto mb-3 text-green-300" />
                <h4 className="font-bold text-lg mb-2">Local Central</h4>
                <p>Templo Sede - Fácil acesso para toda a família</p>
              </div>
              
              <div className="text-white">
                <Users className="h-12 w-12 mx-auto mb-3 text-cyan-300" />
                <h4 className="font-bold text-lg mb-2">Para Todos</h4>
                <p>Crianças, jovens e toda a família são bem-vindos</p>
              </div>
            </div>
          </div>
        </div>

        {/* YouTube Video Section - Instructions */}
        <div className="bg-black bg-opacity-30 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6">
              <Play className="h-12 w-12 mx-auto mb-4 text-red-400" />
              <h3 className="text-xl font-bold text-white mb-4">
                💡 Como Adicionar Vídeo do YouTube
              </h3>
              <div className="text-white text-sm space-y-2 text-left max-w-2xl mx-auto">
                <p><strong>1. Obtenha o ID do vídeo:</strong> Na URL do YouTube (exemplo: youtube.com/watch?v=ABC123), copie "ABC123"</p>
                <p><strong>2. Use o iframe:</strong> Substitua "VIDEO_ID" pelo ID copiado:</p>
                <code className="block bg-black bg-opacity-30 p-3 rounded mt-2 text-xs">
                  {`<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  title="YouTube video player" 
  frameBorder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowFullScreen>
</iframe>`}
                </code>
                <p><strong>3. Para responsivo:</strong> Envolva em uma div com classes Tailwind apropriadas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-fade-in-up.delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }

        .animate-fade-in-up.delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: both;
        }

        .animate-fade-in-up.delay-600 {
          animation-delay: 0.6s;
          animation-fill-mode: both;
        }

        .animate-scale-in {
          animation: scale-in 1.2s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
};

export default Home;
