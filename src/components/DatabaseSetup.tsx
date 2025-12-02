import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface DatabaseSetupProps {
  onComplete: () => void;
}

const DatabaseSetup: React.FC<DatabaseSetupProps> = ({ onComplete }) => {
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [setupStatus, setSetupStatus] = useState<string>('');
  const [error, setError] = useState<string>('');

  const setupDatabase = async () => {
    setIsSettingUp(true);
    setError('');
    setSetupStatus('Inicializando configuração do banco de dados...');

    try {
      // SQL para criar as tabelas (simplificado para execução via client)
      const createTablesSQL = `
        -- Habilitar UUID se não estiver habilitado
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        -- Tabela students
        CREATE TABLE IF NOT EXISTS students (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          name VARCHAR(255) NOT NULL,
          birth_date DATE NOT NULL,
          cpf VARCHAR(14) UNIQUE NOT NULL,
          gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          email VARCHAR(255),
          cep VARCHAR(10) NOT NULL,
          street VARCHAR(255) NOT NULL,
          number VARCHAR(20) NOT NULL,
          complement VARCHAR(100),
          neighborhood VARCHAR(100) NOT NULL,
          city VARCHAR(100) NOT NULL,
          state VARCHAR(2) NOT NULL,
          father_name VARCHAR(255) NOT NULL,
          mother_name VARCHAR(255) NOT NULL,
          parents_phone VARCHAR(20) NOT NULL,
          parents_email VARCHAR(255),
          father_cpf VARCHAR(14) NOT NULL,
          mother_cpf VARCHAR(14) NOT NULL,
          is_active BOOLEAN DEFAULT true
        );

        -- Tabela polos
        CREATE TABLE IF NOT EXISTS polos (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          name VARCHAR(255) NOT NULL,
          street VARCHAR(255) NOT NULL,
          number VARCHAR(20) NOT NULL,
          neighborhood VARCHAR(100) NOT NULL,
          city VARCHAR(100) NOT NULL,
          state VARCHAR(2) NOT NULL,
          cep VARCHAR(10) NOT NULL,
          pastor VARCHAR(255) NOT NULL,
          coordinator_name VARCHAR(255) NOT NULL,
          coordinator_cpf VARCHAR(14) NOT NULL,
          director_name VARCHAR(255),
          director_cpf VARCHAR(14),
          secretary_name VARCHAR(255),
          secretary_cpf VARCHAR(14),
          treasurer_name VARCHAR(255),
          treasurer_cpf VARCHAR(14),
          teachers TEXT[] DEFAULT '{}',
          assistants TEXT[] DEFAULT '{}',
          cafeteria_workers TEXT[] DEFAULT '{}',
          available_levels TEXT[] DEFAULT '{}',
          is_active BOOLEAN DEFAULT true
        );

        -- Tabela admin_users
        CREATE TABLE IF NOT EXISTS admin_users (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          cpf VARCHAR(14) UNIQUE NOT NULL,
          phone VARCHAR(20) NOT NULL,
          role VARCHAR(20) CHECK (role IN (
            'coordenador_geral', 'diretor_geral', 
            'coordenador_polo', 'diretor_polo', 
            'professor', 'auxiliar', 
            'secretario', 'tesoureiro'
          )) NOT NULL,
          access_level VARCHAR(20) CHECK (access_level IN ('geral', 'polo_especifico')) NOT NULL,
          polo_id UUID,
          is_active BOOLEAN DEFAULT true,
          password_hash VARCHAR(255) NOT NULL
        );

        -- Tabela staff_members
        CREATE TABLE IF NOT EXISTS staff_members (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          name VARCHAR(255) NOT NULL,
          cpf VARCHAR(14) UNIQUE NOT NULL,
          phone VARCHAR(20) NOT NULL,
          email VARCHAR(255),
          role VARCHAR(20) CHECK (role IN (
            'coordenador_geral', 'diretor_geral', 
            'coordenador_polo', 'diretor_polo', 
            'professor', 'auxiliar', 
            'secretario', 'tesoureiro'
          )) NOT NULL,
          polo_id UUID NOT NULL REFERENCES polos(id),
          is_active BOOLEAN DEFAULT true,
          qualifications TEXT[] DEFAULT '{}',
          hire_date DATE NOT NULL DEFAULT CURRENT_DATE
        );

        -- Tabela enrollments
        CREATE TABLE IF NOT EXISTS enrollments (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          student_id UUID NOT NULL REFERENCES students(id),
          student_name VARCHAR(255) NOT NULL,
          level VARCHAR(10) CHECK (level IN ('NIVEL_I', 'NIVEL_II', 'NIVEL_III', 'NIVEL_IV')) NOT NULL,
          polo_id UUID NOT NULL REFERENCES polos(id),
          polo_name VARCHAR(255) NOT NULL,
          enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
          observations TEXT,
          status VARCHAR(15) CHECK (status IN ('active', 'completed', 'cancelled', 'transferred')) DEFAULT 'active',
          completion_date DATE,
          certificate_issued BOOLEAN DEFAULT false,
          certificate_date DATE
        );

        -- Tabela certificates
        CREATE TABLE IF NOT EXISTS certificates (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          student_id UUID NOT NULL REFERENCES students(id),
          enrollment_id UUID NOT NULL REFERENCES enrollments(id),
          polo_id UUID NOT NULL REFERENCES polos(id),
          certificate_number VARCHAR(50) UNIQUE NOT NULL,
          issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
          level VARCHAR(10) CHECK (level IN ('NIVEL_I', 'NIVEL_II', 'NIVEL_III', 'NIVEL_IV')) NOT NULL,
          grade DECIMAL(3,1) CHECK (grade >= 0 AND grade <= 10),
          hours_completed INTEGER DEFAULT 0,
          is_valid BOOLEAN DEFAULT true
        );

        -- Tabela system_settings
        CREATE TABLE IF NOT EXISTS system_settings (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          key VARCHAR(100) UNIQUE NOT NULL,
          value TEXT NOT NULL,
          description TEXT,
          category VARCHAR(50) NOT NULL
        );
      `;

      setSetupStatus('Executando criação das tabelas...');
      
      // Executar SQL
      const { error: sqlError } = await supabase.rpc('exec_sql', { sql: createTablesSQL });
      
      if (sqlError) {
        console.error('SQL Error:', sqlError);
        throw new Error(`Erro ao criar tabelas: ${sqlError.message}`);
      }

      setSetupStatus('Inserindo dados iniciais...');

      // Inserir configurações padrão
      const defaultSettings = [
        { key: 'institution_name', value: 'Instituto Bíblico Único Caminho - IBUC', description: 'Nome oficial da instituição', category: 'institution' },
        { key: 'institution_cnpj', value: '35.864.425/0001-23', description: 'CNPJ da instituição', category: 'institution' },
        { key: 'president_pastor', value: 'PR. Suimar Caetano', description: 'Pastor presidente da instituição', category: 'institution' },
        { key: 'headquarters_city', value: 'Palmas', description: 'Cidade da sede principal', category: 'institution' },
        { key: 'headquarters_state', value: 'TO', description: 'Estado da sede principal', category: 'institution' },
        { key: 'website', value: 'ibuc.com.br', description: 'Site oficial da instituição', category: 'institution' },
        { key: 'contact_phone', value: '(62) 3123-6668', description: 'Telefone de contato', category: 'contact' },
        { key: 'contact_email', value: 'contatoibuc@gmail.com', description: 'Email de contato', category: 'contact' },
        { key: 'facebook_url', value: 'https://web.facebook.com/IBUC.com.br', description: 'URL do Facebook', category: 'social' },
        { key: 'instagram_url', value: 'https://www.instagram.com/ibuc_oficial/', description: 'URL do Instagram', category: 'social' },
        { key: 'youtube_url', value: 'https://www.youtube.com/@IBUConline', description: 'URL do YouTube', category: 'social' },
        { key: 'whatsapp_number', value: '556231236668', description: 'Número do WhatsApp', category: 'contact' }
      ];

      for (const setting of defaultSettings) {
        const { error: settingError } = await supabase
          .from('system_settings')
          .upsert(setting);
          
        if (settingError) {
          console.error('Error inserting setting:', settingError);
        }
      }

      // Inserir dados de teste
      setSetupStatus('Inserindo dados de teste...');

      // Pólos de teste
      const testPolos = [
        {
          name: 'Igreja Central - Palmas',
          street: 'Rua das Flores',
          number: '100',
          neighborhood: 'Centro',
          city: 'Palmas',
          state: 'TO',
          cep: '77000-000',
          pastor: 'Pastor João Silva',
          coordinator_name: 'Maria Santos',
          coordinator_cpf: '123.456.789-00',
          director_name: 'Ana Costa',
          director_cpf: '111.222.333-44',
          teachers: ['Pedro Lima', 'Carlos Oliveira'],
          assistants: ['Lucia Ferreira'],
          secretary_name: 'Rosa Silva',
          secretary_cpf: '555.666.777-88',
          treasurer_name: 'João Santos',
          treasurer_cpf: '999.888.777-66',
          cafeteria_workers: ['Marta Lima'],
          available_levels: ['NIVEL_I', 'NIVEL_II', 'NIVEL_III', 'NIVEL_IV'],
          is_active: true
        },
        {
          name: 'Igreja Norte - Palmas',
          street: 'Avenida Norte',
          number: '250',
          neighborhood: 'Plano Diretor Norte',
          city: 'Palmas',
          state: 'TO',
          cep: '77001-000',
          pastor: 'Pastor Carlos Mendes',
          coordinator_name: 'José Rodrigues',
          coordinator_cpf: '987.654.321-00',
          teachers: ['Sandra Silva', 'Roberto Santos'],
          assistants: ['Fernanda Lima'],
          available_levels: ['NIVEL_I', 'NIVEL_II', 'NIVEL_III'],
          is_active: true
        }
      ];

      for (const polo of testPolos) {
        const { error: poloError } = await supabase
          .from('polos')
          .insert(polo);
          
        if (poloError) {
          console.error('Error inserting polo:', poloError);
        }
      }

      // Usuário admin de teste
      const { error: adminError } = await supabase
        .from('admin_users')
        .insert({
          name: 'Administrador Sistema',
          email: 'admin@ibuc.com.br',
          cpf: '000.000.000-00',
          phone: '(62) 99999-9999',
          role: 'diretor_geral',
          access_level: 'geral',
          is_active: true,
          password_hash: 'admin123' // Em produção, usar hash real
        });

      if (adminError) {
        console.error('Error inserting admin user:', adminError);
      }

      // Estudantes de teste
      const testStudents = [
        {
          name: 'Ana Silva Santos',
          birth_date: '2010-05-15',
          cpf: '123.456.789-00',
          gender: 'female',
          phone: '(63) 99999-1111',
          email: 'ana.santos@email.com',
          cep: '77000-000',
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Centro',
          city: 'Palmas',
          state: 'TO',
          father_name: 'João Santos',
          mother_name: 'Maria Santos',
          parents_phone: '(63) 98888-2222',
          parents_email: 'pais.santos@email.com',
          father_cpf: '111.222.333-44',
          mother_cpf: '555.666.777-88',
          is_active: true
        },
        {
          name: 'Pedro Lima Costa',
          birth_date: '2012-08-22',
          cpf: '987.654.321-00',
          gender: 'male',
          phone: '(63) 99999-3333',
          email: 'pedro.costa@email.com',
          cep: '77001-000',
          street: 'Avenida Norte',
          number: '456',
          neighborhood: 'Plano Diretor Norte',
          city: 'Palmas',
          state: 'TO',
          father_name: 'Carlos Costa',
          mother_name: 'Lucia Costa',
          parents_phone: '(63) 98888-4444',
          parents_email: 'pais.costa@email.com',
          father_cpf: '222.333.444-55',
          mother_cpf: '666.777.888-99',
          is_active: true
        }
      ];

      for (const student of testStudents) {
        const { error: studentError } = await supabase
          .from('students')
          .insert(student);
          
        if (studentError) {
          console.error('Error inserting student:', studentError);
        }
      }

      setSetupStatus('Configuração concluída com sucesso!');
      
      // Aguardar 2 segundos antes de prosseguir
      setTimeout(() => {
        onComplete();
      }, 2000);

    } catch (err) {
      console.error('Setup error:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido durante a configuração');
    } finally {
      setIsSettingUp(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Configuração do Banco de Dados
          </h1>
          <p className="text-gray-600 mb-8">
            Este assistente irá configurar o banco de dados Supabase para o IBUC System, 
            criando todas as tabelas necessárias e inserindo dados de exemplo.
          </p>

          {setupStatus && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800">{setupStatus}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {!isSettingUp && (
              <>
                <p className="text-sm text-gray-500 mb-6">
                  Esta operação pode levar alguns minutos e será executada apenas uma vez.
                </p>
                <Button
                  onClick={setupDatabase}
                  className="w-full"
                  size="lg"
                >
                  Iniciar Configuração
                </Button>
              </>
            )}

            {isSettingUp && (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-gray-600">Configurando...</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DatabaseSetup;