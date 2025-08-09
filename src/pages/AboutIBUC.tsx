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

      {/* Sobre o Instituto */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Sobre o Instituto
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            O IBUC - Instituto Bíblico Único Caminho é uma instituição de ensino dedicada à 
            formação bíblica e teológica de crianças e jovens, fundamentada nos valores cristãos 
            e comprometida com a excelência educacional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-8">
            <Target className="h-16 w-16 text-red-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Missão</h3>
            <p className="text-gray-600">
              Proporcionar educação cristã de qualidade para crianças e jovens, 
              fundamentada nos valores bíblicos e formando cidadãos comprometidos 
              com os princípios do Reino de Deus.
            </p>
          </Card>

          <Card className="text-center p-8">
            <Eye className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Visão</h3>
            <p className="text-gray-600">
              Ser referência em ensino bíblico infanto-juvenil, formando uma 
              geração de jovens cristãos preparados para servir a Deus e 
              transformar a sociedade.
            </p>
          </Card>

          <Card className="text-center p-8">
            <Heart className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Valores</h3>
            <p className="text-gray-600">
              Fé, amor, integridade, excelência, compromisso social e 
              desenvolvimento integral do ser humano baseado nos ensinamentos 
              bíblicos cristãos.
            </p>
          </Card>
        </div>
      </section>

      {/* Estrutura do Curso */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Estrutura do Curso
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nosso curso é cuidadosamente estruturado para oferecer uma formação 
              completa e progressiva em teologia infanto-juvenil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                4
              </div>
              <h3 className="text-2xl font-bold text-red-800 mb-4">Níveis</h3>
              <p className="text-red-700">
                Quatro níveis de ensino organizados por faixas etárias, 
                desde 2 até 16 anos de idade.
              </p>
            </Card>

            <Card className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                10
              </div>
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Módulos</h3>
              <p className="text-blue-700">
                Dez módulos cuidadosamente desenvolvidos com conteúdo 
                bíblico e atividades práticas.
              </p>
            </Card>

            <Card className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <BookOpen className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-green-800 mb-4">Material</h3>
              <p className="text-green-700">
                Manual de orientação completo e material didático 
                especializado para cada faixa etária.
              </p>
            </Card>
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
