import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, MapPin, Award } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-500 to-orange-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="mb-8">
              <img
                src="https://ibuc.com.br/wp-content/uploads/2023/05/logo-site.png"
                alt="IBUC Logo"
                className="h-20 w-auto mx-auto mb-6"
              />
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                IBUC - Palmas - TO
              </h1>
              <p className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto">
                Instituto Bíblico Único Caminho
              </p>
            </div>
            
            <p className="text-lg md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed">
              Formamos crianças e jovens nos caminhos do Senhor através do ensino bíblico de qualidade, 
              desenvolvendo valores cristãos e preparando uma nova geração para servir a Deus.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                <Link to="/cadastro-aluno">Cadastrar Aluno</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-600">
                <Link to="/matricula">Fazer Matrícula</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Nossa Missão
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Proporcionar educação cristã de qualidade para crianças e jovens, fundamentada nos 
            valores bíblicos, promovendo o desenvolvimento integral do ser humano e formando 
            cidadãos comprometidos com os princípios do Reino de Deus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <Users className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Ensino Personalizado</h3>
            <p className="text-gray-600 text-sm">
              Atendimento individualizado respeitando o ritmo de aprendizado de cada criança
            </p>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Currículo Bíblico</h3>
            <p className="text-gray-600 text-sm">
              Material didático desenvolvido especialmente para o ensino infanto-juvenil
            </p>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Múltiplos Polos</h3>
            <p className="text-gray-600 text-sm">
              Aulas em diversas congregações facilitando o acesso de todas as famílias
            </p>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Certificação</h3>
            <p className="text-gray-600 text-sm">
              Formação reconhecida com certificado de conclusão ao final de cada nível
            </p>
          </Card>
        </div>
      </section>

      {/* Levels Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Níveis de Ensino
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos ensino bíblico estruturado por faixas etárias, 
              adequado ao desenvolvimento cognitivo e espiritual de cada idade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  I
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-2">NÍVEL I</h3>
                <p className="text-red-700 font-semibold mb-3">2 a 5 anos</p>
                <p className="text-red-600 text-sm">
                  Introdução aos valores cristãos através de histórias bíblicas e atividades lúdicas
                </p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  II
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">NÍVEL II</h3>
                <p className="text-blue-700 font-semibold mb-3">6 a 8 anos</p>
                <p className="text-blue-600 text-sm">
                  Desenvolvimento da leitura bíblica e compreensão de princípios básicos da fé
                </p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  III
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">NÍVEL III</h3>
                <p className="text-green-700 font-semibold mb-3">9 a 11 anos</p>
                <p className="text-green-600 text-sm">
                  Aprofundamento nos ensinamentos bíblicos e desenvolvimento do caráter cristão
                </p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="bg-yellow-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  IV
                </div>
                <h3 className="text-xl font-bold text-yellow-800 mb-2">NÍVEL IV</h3>
                <p className="text-yellow-700 font-semibold mb-3">12 a 16 anos</p>
                <p className="text-yellow-600 text-sm">
                  Formação de líderes jovens com foco na evangelização e serviço cristão
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Access Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Acesso Rápido
          </h2>
          <p className="text-xl text-gray-600">
            Escolha a opção adequada para acessar o sistema
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Área do Aluno</h3>
              <p className="text-gray-600 mb-6">
                Acesso para alunos e pais acompanharem o desenvolvimento escolar
              </p>
              <Button asChild variant="secondary" size="lg" className="w-full">
                <Link to="/acesso-aluno">Acessar Área do Aluno</Link>
              </Button>
            </div>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <Award className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Área Administrativa</h3>
              <p className="text-gray-600 mb-6">
                Acesso restrito para coordenadores e administradores do sistema
              </p>
              <Button asChild size="lg" className="w-full">
                <Link to="/admin">Acessar Área Admin</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;