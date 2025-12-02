# 🚀 Deploy Rápido - IBUC-System no Netlify

## ⚡ Deploy em 3 Passos

### 1. Preparar o Projeto

```bash
# Clone ou baixe o projeto
git clone https://github.com/simiao2025/IBUC-System.git
cd IBUC-System

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# (O arquivo já vem com as configurações corretas)
```

### 2. Teste Local

```bash
# Execute a verificação pré-deploy
./pre-deploy-check.sh

# Ou manualmente:
npm run build:check
npm run dev
```

### 3. Deploy no Netlify

**Opção A - Interface Web (Recomendado):**

1. Vá para [netlify.com](https://netlify.com)
2. Faça login ou crie conta
3. Clique em **"New site from Git"**
4. Conecte seu GitHub e selecione o repositório
5. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** `18`
6. Clique em **Deploy**

**Opção B - Drag & Drop:**

```bash
# Compile o projeto
npm run build

# Vá para netlify.com e arraste a pasta 'dist'
```

### 4. Configurar Variáveis de Ambiente

No Netlify, após o deploy:

1. Vá para **Site settings** > **Environment variables**
2. Adicione:
   ```
   VITE_SUPABASE_URL=https://ffzqgdxznsrbuhqbtmaw.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmenFnZHh6bnNyYnVocWJ0bWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2OTQxMzEsImV4cCI6MjA4MDI3MDEzMX0.9cXG7oOyVaQB4a7msH5nibeOA-zeG5DG23knTb-qMrs
   ```
3. **Re-deploy** o site

### 5. Testar o Deploy

Acesse sua URL do Netlify e teste:

- ✅ **Login:** admin@ibuc.com.br / 123456
- ✅ **Cadastro de estudantes**
- ✅ **Dashboard administrativo**
- ✅ **Gestão de pólos**

## 🎯 Scripts Úteis

```bash
# Verificação completa pré-deploy
./pre-deploy-check.sh

# Build com verificações
npm run build:check

# Deploy simulation
npm run deploy

# Teste local do build
npm run test:build
```

## 🆘 Solução Rápida de Problemas

### Build Falha
```bash
# Verifique o Node.js
node --version  # Deve ser >= 18

# Limpe e reinstale
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Supabase Não Conecta
1. Verifique as variáveis no Netlify
2. Confirme se começam com `VITE_`
3. Reinicie o site após configurar

### Rotas Não Funcionam
1. Confirme que `netlify.toml` está na raiz
2. Verifique se tem o redirect para `/*`

## 📋 Checklist Final

- [ ] Projeto clonado/baixado
- [ ] Dependências instaladas (`npm install`)
- [ ] Build funciona local (`npm run build`)
- [ ] Variáveis configuradas no Netlify
- [ ] Deploy realizado
- [ ] Site funcionando
- [ ] Login testado
- [ ] Funcionalidades básicas testadas

## 🔗 Links Úteis

- **Site:** Seu site estará em `https://random-name.netlify.app`
- **Painel Netlify:** [app.netlify.com](https://app.netlify.com)
- **GitHub Repo:** Seu repositório atualizado

---

**🎉 Parabéns! Seu IBUC-System está no ar!**

**Dados de Teste:**
- **Admin:** admin@ibuc.com.br / 123456
- **Aluno:** João Silva / CPF: 123.456.789-00

**Supabase:** https://ffzqgdxznsrbuhqbtmaw.supabase.co