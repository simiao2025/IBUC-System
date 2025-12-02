-- =====================================================
-- ESTRUTURA DO BANCO DE DADOS - IBUC SYSTEM
-- Instituto Bíblico Único Caminho
-- =====================================================

-- Habilitar UUID se não estiver habilitado
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABELA: students (Alunos)
-- =====================================================
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Dados pessoais
    name VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')) NOT NULL,
    
    -- Contato
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    
    -- Endereço
    cep VARCHAR(10) NOT NULL,
    street VARCHAR(255) NOT NULL,
    number VARCHAR(20) NOT NULL,
    complement VARCHAR(100),
    neighborhood VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    
    -- Dados dos pais/responsáveis
    father_name VARCHAR(255) NOT NULL,
    mother_name VARCHAR(255) NOT NULL,
    parents_phone VARCHAR(20) NOT NULL,
    parents_email VARCHAR(255),
    father_cpf VARCHAR(14) NOT NULL,
    mother_cpf VARCHAR(14) NOT NULL,
    
    -- Controle
    is_active BOOLEAN DEFAULT true,
    
    -- Índices
    CONSTRAINT students_cpf_format CHECK (cpf ~ '^\d{3}\.\d{3}\.\d{3}-\d{2}$'),
    CONSTRAINT students_father_cpf_format CHECK (father_cpf ~ '^\d{3}\.\d{3}\.\d{3}-\d{2}$'),
    CONSTRAINT students_mother_cpf_format CHECK (mother_cpf ~ '^\d{3}\.\d{3}\.\d{3}-\d{2}$'),
    CONSTRAINT students_cep_format CHECK (cep ~ '^\d{5}-\d{3}$'),
    CONSTRAINT students_state_format CHECK (LENGTH(state) = 2)
);

-- Índices para Students
CREATE INDEX idx_students_cpf ON students(cpf);
CREATE INDEX idx_students_name ON students(name);
CREATE INDEX idx_students_active ON students(is_active);
CREATE INDEX idx_students_city_state ON students(city, state);

-- =====================================================
-- TABELA: polos (Pólos/Unidades)
-- =====================================================
CREATE TABLE polos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Dados básicos
    name VARCHAR(255) NOT NULL,
    
    -- Endereço
    street VARCHAR(255) NOT NULL,
    number VARCHAR(20) NOT NULL,
    neighborhood VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    cep VARCHAR(10) NOT NULL,
    
    -- Liderança
    pastor VARCHAR(255) NOT NULL,
    coordinator_name VARCHAR(255) NOT NULL,
    coordinator_cpf VARCHAR(14) NOT NULL,
    director_name VARCHAR(255),
    director_cpf VARCHAR(14),
    secretary_name VARCHAR(255),
    secretary_cpf VARCHAR(14),
    treasurer_name VARCHAR(255),
    treasurer_cpf VARCHAR(14),
    
    -- Equipe
    teachers TEXT[] DEFAULT '{}', -- Array de nomes
    assistants TEXT[] DEFAULT '{}',
    cafeteria_workers TEXT[] DEFAULT '{}',
    
    -- Configurações
    available_levels TEXT[] DEFAULT '{}', -- Array com NIVEL_I, NIVEL_II, etc.
    is_active BOOLEAN DEFAULT true,
    
    -- Validações
    CONSTRAINT polos_cep_format CHECK (cep ~ '^\d{5}-\d{3}$'),
    CONSTRAINT polos_state_format CHECK (LENGTH(state) = 2),
    CONSTRAINT polos_coordinator_cpf_format CHECK (coordinator_cpf ~ '^\d{3}\.\d{3}\.\d{3}-\d{2}$'),
    CONSTRAINT polos_director_cpf_format CHECK (director_cpf IS NULL OR director_cpf ~ '^\d{3}\.\d{3}\.\d{3}-\d{2}$'),
    CONSTRAINT polos_secretary_cpf_format CHECK (secretary_cpf IS NULL OR secretary_cpf ~ '^\d{3}\.\d{3}\.\d{3}-\d{2}$'),
    CONSTRAINT polos_treasurer_cpf_format CHECK (treasurer_cpf IS NULL OR treasurer_cpf ~ '^\d{3}\.\d{3}\.\d{3}-\d{2}$')
);

-- Índices para Polos
CREATE INDEX idx_polos_name ON polos(name);
CREATE INDEX idx_polos_city_state ON polos(city, state);
CREATE INDEX idx_polos_active ON polos(is_active);
CREATE INDEX idx_polos_coordinator_cpf ON polos(coordinator_cpf);

-- =====================================================
-- TABELA: admin_users (Usuários Administrativos)
-- =====================================================
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Dados pessoais
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    
    -- Função e acesso
    role VARCHAR(20) CHECK (role IN (
        'coordenador_geral', 'diretor_geral', 
        'coordenador_polo', 'diretor_polo', 
        'professor', 'auxiliar', 
        'secretario', 'tesoureiro'
    )) NOT NULL,
    access_level VARCHAR(20) CHECK (access_level IN ('geral', 'polo_especifico')) NOT NULL,
    polo_id UUID REFERENCES polos(id),
    
    -- Controle
    is_active BOOLEAN DEFAULT true,
    password_hash VARCHAR(255) NOT NULL,
    
    -- Validações
    CONSTRAINT admin_users_cpf_format CHECK (cpf ~ '^\d{3}\.\d{3}\.\d{3}-\d{2}$'),
    CONSTRAINT admin_users_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    
    -- Se é polo_especifico, deve ter polo_id
    CONSTRAINT admin_users_polo_required CHECK (
        (access_level = 'polo_especifico' AND polo_id IS NOT NULL) OR
        access_level = 'geral'
    )
);

-- Índices para Admin Users
CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_cpf ON admin_users(cpf);
CREATE INDEX idx_admin_users_role ON admin_users(role);
CREATE INDEX idx_admin_users_polo_id ON admin_users(polo_id);
CREATE INDEX idx_admin_users_active ON admin_users(is_active);

-- =====================================================
-- TABELA: staff_members (Funcionários dos Pólos)
-- =====================================================
CREATE TABLE staff_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Dados pessoais
    name VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    
    -- Função
    role VARCHAR(20) CHECK (role IN (
        'coordenador_geral', 'diretor_geral', 
        'coordenador_polo', 'diretor_polo', 
        'professor', 'auxiliar', 
        'secretario', 'tesoureiro'
    )) NOT NULL,
    polo_id UUID NOT NULL REFERENCES polos(id),
    
    -- Controle
    is_active BOOLEAN DEFAULT true,
    qualifications TEXT[] DEFAULT '{}',
    hire_date DATE NOT NULL DEFAULT CURRENT_DATE,
    
    -- Validações
    CONSTRAINT staff_members_cpf_format CHECK (cpf ~ '^\d{3}\.\d{3}\.\d{3}-\d{2}$')
);

-- Índices para Staff Members
CREATE INDEX idx_staff_members_cpf ON staff_members(cpf);
CREATE INDEX idx_staff_members_polo_id ON staff_members(polo_id);
CREATE INDEX idx_staff_members_role ON staff_members(role);
CREATE INDEX idx_staff_members_active ON staff_members(is_active);

-- =====================================================
-- TABELA: enrollments (Matrículas)
-- =====================================================
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Relacionamentos
    student_id UUID NOT NULL REFERENCES students(id),
    polo_id UUID NOT NULL REFERENCES polos(id),
    
    -- Dados da matrícula
    student_name VARCHAR(255) NOT NULL,
    polo_name VARCHAR(255) NOT NULL,
    level VARCHAR(10) CHECK (level IN ('NIVEL_I', 'NIVEL_II', 'NIVEL_III', 'NIVEL_IV')) NOT NULL,
    enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    observations TEXT,
    
    -- Status e controle
    status VARCHAR(15) CHECK (status IN ('active', 'completed', 'cancelled', 'transferred')) DEFAULT 'active',
    completion_date DATE,
    certificate_issued BOOLEAN DEFAULT false,
    certificate_date DATE,
    
    -- Índices únicos para evitar matrículas duplicadas
    CONSTRAINT enrollments_unique_student_level_polo CHECK (
        enrollments.status = 'active' OR 
        enrollments.id IN (
            SELECT DISTINCT ON (student_id, level, polo_id) id 
            FROM enrollments 
            WHERE status = 'completed' 
            ORDER BY student_id, level, polo_id, created_at DESC
        )
    )
);

-- Índices para Enrollments
CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_enrollments_polo_id ON enrollments(polo_id);
CREATE INDEX idx_enrollments_level ON enrollments(level);
CREATE INDEX idx_enrollments_status ON enrollments(status);
CREATE INDEX idx_enrollments_date ON enrollments(enrollment_date);

-- =====================================================
-- TABELA: certificates (Certificados)
-- =====================================================
CREATE TABLE certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Relacionamentos
    student_id UUID NOT NULL REFERENCES students(id),
    enrollment_id UUID NOT NULL REFERENCES enrollments(id),
    polo_id UUID NOT NULL REFERENCES polos(id),
    
    -- Dados do certificado
    certificate_number VARCHAR(50) UNIQUE NOT NULL,
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    level VARCHAR(10) CHECK (level IN ('NIVEL_I', 'NIVEL_II', 'NIVEL_III', 'NIVEL_IV')) NOT NULL,
    grade DECIMAL(3,1) CHECK (grade >= 0 AND grade <= 10),
    hours_completed INTEGER DEFAULT 0,
    is_valid BOOLEAN DEFAULT true
);

-- Índices para Certificates
CREATE INDEX idx_certificates_student_id ON certificates(student_id);
CREATE INDEX idx_certificates_enrollment_id ON certificates(enrollment_id);
CREATE INDEX idx_certificates_number ON certificates(certificate_number);
CREATE INDEX idx_certificates_level ON certificates(level);
CREATE INDEX idx_certificates_valid ON certificates(is_valid);

-- =====================================================
-- TABELA: system_settings (Configurações do Sistema)
-- =====================================================
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL
);

-- Índices para System Settings
CREATE INDEX idx_system_settings_key ON system_settings(key);
CREATE INDEX idx_system_settings_category ON system_settings(category);

-- =====================================================
-- TRIGGERS PARA ATUALIZAÇÃO AUTOMÁTICA
-- =====================================================

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para todas as tabelas
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_polos_updated_at BEFORE UPDATE ON polos 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_staff_members_updated_at BEFORE UPDATE ON staff_members 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON enrollments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certificates_updated_at BEFORE UPDATE ON certificates 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- DADOS INICIAIS (Seeds)
-- =====================================================

-- Inserir configurações padrão do sistema
INSERT INTO system_settings (key, value, description, category) VALUES
    ('institution_name', 'Instituto Bíblico Único Caminho - IBUC', 'Nome oficial da instituição', 'institution'),
    ('institution_cnpj', '35.864.425/0001-23', 'CNPJ da instituição', 'institution'),
    ('president_pastor', 'PR. Suimar Caetano', 'Pastor presidente da instituição', 'institution'),
    ('headquarters_city', 'Palmas', 'Cidade da sede principal', 'institution'),
    ('headquarters_state', 'TO', 'Estado da sede principal', 'institution'),
    ('website', 'ibuc.com.br', 'Site oficial da instituição', 'institution'),
    ('contact_phone', '(62) 3123-6668', 'Telefone de contato', 'contact'),
    ('contact_email', 'contatoibuc@gmail.com', 'Email de contato', 'contact'),
    ('facebook_url', 'https://web.facebook.com/IBUC.com.br', 'URL do Facebook', 'social'),
    ('instagram_url', 'https://www.instagram.com/ibuc_oficial/', 'URL do Instagram', 'social'),
    ('youtube_url', 'https://www.youtube.com/@IBUConline', 'URL do YouTube', 'social'),
    ('whatsapp_number', '556231236668', 'Número do WhatsApp', 'contact');

-- =====================================================
-- POLÍTICAS RLS (Row Level Security) - Opcional
-- =====================================================
-- Descomente as linhas abaixo se quiser habilitar RLS
-- ALTER TABLE students ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE polos ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE staff_members ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- FUNÇÕES DE VALIDAÇÃO
-- =====================================================

-- Função para validar CPF
CREATE OR REPLACE FUNCTION validate_cpf(cpf_input VARCHAR)
RETURNS BOOLEAN AS $$
DECLARE
    digits TEXT;
    sum_val INTEGER := 0;
    remainder INTEGER;
    i INTEGER;
    digit1 INTEGER;
    digit2 INTEGER;
BEGIN
    -- Remove non-digits
    digits := regexp_replace(cpf_input, '[^0-9]', '', 'g');
    
    -- Check if CPF has 11 digits
    IF LENGTH(digits) != 11 THEN
        RETURN FALSE;
    END IF;
    
    -- Check if all digits are the same (invalid CPF)
    IF digits = REPEAT(SUBSTRING(digits, 1, 1), 11) THEN
        RETURN FALSE;
    END IF;
    
    -- Calculate first check digit
    FOR i IN 1..9 LOOP
        sum_val := sum_val + (CAST(SUBSTRING(digits, i, 1) AS INTEGER) * (11 - i));
    END LOOP;
    
    remainder := sum_val % 11;
    digit1 := CASE WHEN remainder < 2 THEN 0 ELSE 11 - remainder END;
    
    -- Calculate second check digit
    sum_val := 0;
    FOR i IN 1..10 LOOP
        sum_val := sum_val + (CAST(SUBSTRING(digits, i, 1) AS INTEGER) * (12 - i));
    END LOOP;
    
    remainder := sum_val % 11;
    digit2 := CASE WHEN remainder < 2 THEN 0 ELSE 11 - remainder END;
    
    -- Validate check digits
    RETURN CAST(SUBSTRING(digits, 10, 1) AS INTEGER) = digit1 AND
           CAST(SUBSTRING(digits, 11, 1) AS INTEGER) = digit2;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- VIEWS ÚTEIS
-- =====================================================

-- View para estatísticas dos alunos por polo
CREATE OR REPLACE VIEW students_stats_by_polo AS
SELECT 
    p.id as polo_id,
    p.name as polo_name,
    COUNT(DISTINCT s.id) as total_students,
    COUNT(DISTINCT CASE WHEN e.status = 'active' THEN s.id END) as active_students,
    COUNT(DISTINCT CASE WHEN c.id IS NOT NULL THEN s.id END) as students_with_certificates
FROM polos p
LEFT JOIN enrollments e ON p.id = e.polo_id
LEFT JOIN students s ON e.student_id = s.id
LEFT JOIN certificates c ON s.id = c.student_id
WHERE p.is_active = true AND s.is_active = true
GROUP BY p.id, p.name
ORDER BY p.name;

-- View para matrículas ativas com detalhes completos
CREATE OR REPLACE VIEW active_enrollments_details AS
SELECT 
    e.id as enrollment_id,
    s.name as student_name,
    s.phone as student_phone,
    s.email as student_email,
    p.name as polo_name,
    p.city as polo_city,
    p.state as polo_state,
    e.level,
    e.enrollment_date,
    e.observations,
    e.status,
    CASE 
        WHEN c.id IS NOT NULL THEN 'Com Certificado'
        WHEN e.status = 'completed' THEN 'Completo'
        ELSE 'Em Andamento'
    END as status_display
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN polos p ON e.polo_id = p.id
LEFT JOIN certificates c ON e.id = c.enrollment_id
WHERE e.status IN ('active', 'completed')
ORDER BY e.enrollment_date DESC;