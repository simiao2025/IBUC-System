#!/bin/bash

# IBUC-System Pre-Deploy Check Script
# Este script verifica se tudo está pronto para o deploy no Netlify

echo "🔍 Verificando preparação para deploy do IBUC-System..."
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para print com cor
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 1. Verificar se we're no diretório correto
if [ ! -f "package.json" ]; then
    print_error "package.json não encontrado. Execute este script na raiz do projeto."
    exit 1
fi
print_success "Diretório do projeto encontrado"

# 2. Verificar Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_VERSION" ]; then
    print_success "Node.js version: $NODE_VERSION (OK)"
else
    print_error "Node.js version: $NODE_VERSION (Requerido: >= $REQUIRED_VERSION)"
    exit 1
fi

# 3. Verificar se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    print_warning "node_modules não encontrado. Executando npm install..."
    npm install
fi
print_success "Dependências instaladas"

# 4. Verificar variáveis de ambiente
if [ ! -f ".env.local" ]; then
    print_warning ".env.local não encontrado. Copiando .env.example..."
    cp .env.example .env.local
    print_warning "Por favor, verifique e configure as variáveis em .env.local"
fi
print_success "Arquivo .env.local existe"

# 5. Verificar se VITE_SUPABASE_URL está configurada
if grep -q "VITE_SUPABASE_URL=https://ffzqgdxznsrbuhqbtmaw.supabase.co" .env.local 2>/dev/null; then
    print_success "VITE_SUPABASE_URL configurada"
else
    print_warning "VITE_SUPABASE_URL não encontrada ou incorreta"
fi

# 6. Verificar se VITE_SUPABASE_ANON_KEY está configurada
if grep -q "VITE_SUPABASE_ANON_KEY=" .env.local 2>/dev/null; then
    print_success "VITE_SUPABASE_ANON_KEY configurada"
else
    print_warning "VITE_SUPABASE_ANON_KEY não encontrada"
fi

# 7. Verificar arquivos de configuração do Netlify
if [ -f "netlify.toml" ]; then
    print_success "netlify.toml encontrado"
else
    print_warning "netlify.toml não encontrado (obrigatório para deploy)"
fi

# 8. Verificar se o .gitignore inclui arquivos sensíveis
if grep -q ".env.local" .gitignore 2>/dev/null; then
    print_success ".env.local está no .gitignore"
else
    print_warning "Adicione .env.local ao .gitignore"
fi

if grep -q "node_modules" .gitignore 2>/dev/null; then
    print_success "node_modules está no .gitignore"
else
    print_warning "Adicione node_modules ao .gitignore"
fi

# 9. Executar type check
echo ""
echo "🔍 Executando type check..."
if npm run type-check > /dev/null 2>&1; then
    print_success "TypeScript: Sem erros"
else
    print_error "TypeScript: Encontrados erros"
    npm run type-check
    exit 1
fi

# 10. Executar lint
echo "🔍 Executando lint..."
if npm run lint > /dev/null 2>&1; then
    print_success "ESLint: Sem erros"
else
    print_warning "ESLint: Encontrados avisos (pode prosseguir)"
fi

# 11. Teste de build
echo ""
echo "🔍 Testando build..."
if npm run build > /dev/null 2>&1; then
    print_success "Build: Sucesso"
    if [ -d "dist" ]; then
        BUILD_SIZE=$(du -sh dist | cut -f1)
        print_success "Tamanho do build: $BUILD_SIZE"
    fi
else
    print_error "Build: Falhou"
    echo "Execute 'npm run build' para ver os detalhes do erro"
    exit 1
fi

echo ""
echo "🎉 Verificação completa!"
echo ""
echo "Próximos passos:"
echo "1. Configure as variáveis de ambiente no Netlify:"
echo "   - VITE_SUPABASE_URL"
echo "   - VITE_SUPABASE_ANON_KEY"
echo ""
echo "2. Configure o deploy no Netlify:"
echo "   - Build command: npm run build"
echo "   - Publish directory: dist"
echo "   - Node version: 18"
echo ""
echo "3. Execute: npm run deploy"
echo ""
print_success "Projeto pronto para deploy no Netlify! 🚀"