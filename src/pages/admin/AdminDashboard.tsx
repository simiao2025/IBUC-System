import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAccessControl } from '../../components/AccessControl';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {
  Users,
  MapPin,
  BookOpen,
  UserCheck,
  Calendar,
  Award,
  BarChart3,
  Settings
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { students, enrollments, polos, logout } = useApp();

  const stats = [
    {
      title: 'Total de Alunos',
      value: students.length,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Matrículas Ativas',
      value: enrollments.length,
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Polos Ativos',
      value: polos.length,
      icon: MapPin,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Certificados Emitidos',
      value: '12', // Mock data
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  const quickActions = [
    {
      title: 'Usuários Administrativos',
      description: 'Coordenadores, diretores e acesso geral',
      href: '/admin/users',
      icon: Settings,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Equipes dos Polos',
      description: 'Professores, auxiliares, secretários e tesoureiros',
      href: '/admin/staff',
      icon: Users,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Gerenciar Polos',
      description: 'Cadastrar e editar polos/congregações',
      href: '/admin/polos',
      icon: MapPin,
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: 'Gerenciar Alunos',
      description: 'Visualizar, editar e gerenciar dados dos alunos',
      href: '/admin/students',
      icon: UserCheck,
      color: 'bg-indigo-600 hover:bg-indigo-700'
    },
    {
      title: 'Matrículas',
      description: 'Acompanhar e gerenciar matrículas',
      href: '/admin/enrollments',
      icon: BookOpen,
      color: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      title: 'Relatórios',
      description: 'Gerar relatórios e estatísticas',
      href: '/admin/reports',
      icon: BarChart3,
      color: 'bg-red-600 hover:bg-red-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <img
                src="https://ibuc.com.br/wp-content/uploads/2023/05/logo-site.png"
                alt="IBUC Logo"
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
                <p className="text-sm text-gray-600">IBUC - Palmas, TO</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={logout}
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.bgColor} mr-4`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className={`inline-flex p-3 rounded-full text-white mb-4 ${action.color}`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                  <Button asChild size="sm" className="w-full">
                    <Link to={action.href}>Acessar</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Enrollments */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              <UserCheck className="inline h-5 w-5 mr-2 text-green-600" />
              Matrículas Recentes
            </h3>
            {enrollments.length > 0 ? (
              <div className="space-y-3">
                {enrollments.slice(-5).map((enrollment) => (
                  <div key={enrollment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{enrollment.studentName}</p>
                      <p className="text-sm text-gray-600">{enrollment.level}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {new Date(enrollment.enrollmentDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Nenhuma matrícula registrada ainda</p>
            )}
          </Card>

          {/* Upcoming Events */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              <Calendar className="inline h-5 w-5 mr-2 text-blue-600" />
              Próximos Eventos
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Início das Aulas - Nível I</p>
                  <p className="text-sm text-gray-600">Igreja Central</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-600 font-medium">15 Fev</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Reunião de Coordenadores</p>
                  <p className="text-sm text-gray-600">Planejamento semestral</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-yellow-600 font-medium">20 Fev</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Formatura Nível IV</p>
                  <p className="text-sm text-gray-600">Cerimônia de certificação</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 font-medium">25 Jun</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
