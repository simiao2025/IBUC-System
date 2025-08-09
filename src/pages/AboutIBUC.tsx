import React from 'react';
import Card from '../components/ui/Card';
import {
  MapPin,
  Phone,
  Mail,
  Users,
  BookOpen,
  Award,
  Building,
  Heart,
  Target,
  Eye,
  Calendar,
  Church,
  Download,
  Star
} from 'lucide-react';

const AboutIBUC: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-500 to-orange-500 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <img
              src="https://ibuc.com.br/wp-content/uploads/2023/05/logo-site.png"
              alt="IBUC Logo"
              className="h-24 w-auto mx-auto mb-8"
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Material - IBUC
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 max-w-4xl mx-auto">
              Curso de Teologia Infanto-juvenil
            </p>
          </div>
        </div>
      </section>

      {/* Material do Curso */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Material do Curso
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Nosso material didático foi cuidadosamente desenvolvido para proporcionar
            uma formação bíblica sólida e apropriada para cada faixa etária.
          </p>
        </div>

        {/* Imagens do Material */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="text-center">
            <img
              src="https://ibuc.com.br/wp-content/uploads/2025/03/o-curso-de-Website-2-1024x702.png"
              alt="O Curso de Teologia Infanto-juvenil"
              className="w-full rounded-lg shadow-lg"
            />
            <h3 className="text-xl font-bold text-gray-900 mt-4">O Curso</h3>
          </div>

          <div className="text-center">
            <img
              src="https://ibuc.com.br/wp-content/uploads/2025/03/4-Niveis-1024x702.png"
              alt="4 Níveis de Ensino"
              className="w-full rounded-lg shadow-lg"
            />
            <h3 className="text-xl font-bold text-gray-900 mt-4">4 Níveis</h3>
          </div>

          <div className="text-center">
            <img
              src="https://ibuc.com.br/wp-content/uploads/2025/03/10-modulos-1024x702.png"
              alt="10 Módulos"
              className="w-full rounded-lg shadow-lg"
            />
            <h3 className="text-xl font-bold text-gray-900 mt-4">10 Módulos</h3>
          </div>

          <div className="text-center">
            <img
              src="https://ibuc.com.br/wp-content/uploads/2025/03/Manual-de-orientacao-1024x702.png"
              alt="Manual de Orientação"
              className="w-full rounded-lg shadow-lg"
            />
            <h3 className="text-xl font-bold text-gray-900 mt-4">Manual de Orientação</h3>
          </div>
        </div>
      </section>

      {/* Módulos do Curso */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Módulos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              O curso é composto por 10 módulos estruturados sequencialmente
              para um aprendizado progressivo e efetivo.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { number: '01', title: 'Módulo 01' },
              { number: '02', title: 'Módulo 02' },
              { number: '03', title: 'Módulo 03' },
              { number: '04', title: 'Módulo 04' },
              { number: '05', title: 'Módulo 05' },
              { number: '06', title: 'Módulo 06' },
              { number: '07', title: 'Módulo 07' },
              { number: '08', title: 'Módulo 08' },
              { number: '09', title: 'Módulo 09' },
              { number: '10', title: 'Módulo 10' }
            ].map((module) => (
              <Card key={module.number} className="text-center p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {module.number}
                </div>
                <h3 className="text-lg font-bold text-blue-800">{module.title}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Informações Institucionais */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Informações Institucionais
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="h-6 w-6 text-red-600 mr-3" />
                Dados Institucionais
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-700">Razão Social:</p>
                  <p className="text-gray-600">Instituto Bíblico Único Caminho</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">CNPJ:</p>
                  <p className="text-gray-600">35.864.425/0001-23</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Modalidade:</p>
                  <p className="text-gray-600">Curso de Teologia Infanto-juvenil</p>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Church className="h-6 w-6 text-blue-600 mr-3" />
                Sede Principal
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-700">Igreja:</p>
                  <p className="text-gray-600">Assembleia de Deus Missão Projeto Restaurando Vidas</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Pastor Presidente:</p>
                  <p className="text-gray-600">PR. Suimar Caetano</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Local das Aulas Inaugurais:</p>
                  <p className="text-gray-600">Templo Sede</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Entre em Contato
            </h2>
            <p className="text-xl text-gray-600">
              Estamos sempre disponíveis para esclarecer suas dúvidas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Informações de Contato
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-red-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-700">Endereço:</p>
                    <p className="text-gray-600">
                      Av. T9, nº647, Setor Bueno<br />
                      Primeiro andar (acima da Copyprint)<br />
                      Palmas - TO
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-700">WhatsApp:</p>
                    <p className="text-gray-600">(62) 3123-6668</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-700">E-mail:</p>
                    <p className="text-gray-600">contatoibuc@gmail.com</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Redes Sociais
              </h3>
              <div className="space-y-4">
                <a 
                  href="https://web.facebook.com/IBUC.com.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <div className="bg-blue-600 text-white p-2 rounded-full">
                    <span className="text-sm font-bold">f</span>
                  </div>
                  <span>Facebook - IBUC - Instituto Bíblico Único Caminho</span>
                </a>

                <a 
                  href="https://www.instagram.com/ibuc_oficial/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-600 hover:text-pink-600 transition-colors"
                >
                  <div className="bg-pink-600 text-white p-2 rounded-full">
                    <span className="text-sm font-bold">@</span>
                  </div>
                  <span>Instagram - @ibuc_oficial</span>
                </a>

                <a 
                  href="https://www.youtube.com/@IBUConline" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <div className="bg-red-600 text-white p-2 rounded-full">
                    <span className="text-sm font-bold">▶</span>
                  </div>
                  <span>YouTube - IBUConline</span>
                </a>

                <a 
                  href="https://wa.me/556231236668" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-600 hover:text-green-600 transition-colors"
                >
                  <div className="bg-green-600 text-white p-2 rounded-full">
                    <span className="text-sm font-bold">W</span>
                  </div>
                  <span>WhatsApp - (62) 3123-6668</span>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-red-600 via-red-500 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Faça Parte da Família IBUC
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Venha conhecer de perto nosso trabalho e descubra como podemos contribuir 
            para a formação bíblica e espiritual do seu filho ou filha.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/matricula"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Users className="h-6 w-6 mr-3" />
              Fazer Matrícula
            </a>
            <a 
              href="/contato"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-red-600 transition-colors"
            >
              <Phone className="h-6 w-6 mr-3" />
              Entre em Contato
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutIBUC;
