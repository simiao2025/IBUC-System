# 🔧 Troubleshooting - IBUC-System no Netlify

## Problemas Comuns e Soluções

### 🚨 Build Falha no Netlify

#### Problema: "npm ERR! peer dep missing"
**Sintoma:**
```
npm ERR! peer dep missing: @vitejs/plugin-react@^4.0.0
```

**Solução:**
1. No painel do Netlify, vá para **Site settings** > **Build & deploy**
2. Configure **Node version:** `18`
3. **Build command:** `npm install && npm run build`

#### Problema: "Cannot resolve dependency"
**Sintoma:**
```
Cannot resolve dependency: @supabase/supabase-js
```

**Solução:**
1. Verifique se a dependência está no `package.json`
2. Execute localmente: `npm install @supabase/supabase-js`
3. Commit as mudanças no GitHub
4. Re-deploy

#### Problema: TypeScript Errors
**Sintoma:**
```
Type error: Property 'students' does not exist
```

**Solução:**
```bash
# Execute localmente para ver erros
npm run type-check

# Corrija os erros no código
npm run build  # Deve funcionar sem erros
```

### 🚨 Supabase Não Conecta

#### Problema: "Invalid API Key"
**Sintoma:**
```
Error: Invalid API key
```

**Solução:**
1. No Netlify: **Site settings** > **Environment variables**
2. Verifique se `VITE_SUPABASE_ANON_KEY` está correto
3. Reinicie o site após configurar

#### Problema: "Failed to fetch"
**Sintoma:**
```
Failed to fetch from Supabase
```

**Solução:**
1. Verifique se a URL está correta: `https://ffzqgdxznsrbuhqbtmaw.supabase.co`
2. Confirme se as variáveis começam com `VITE_`
3. Teste a conexão localmente primeiro

#### Problema: Variables not working
**Sintoma:**
```javascript
// Em production, as variáveis estão undefined
console.log(import.meta.env.VITE_SUPABASE_URL) // undefined
```

**Solução:**
1. **IMPORTANTE:** As variáveis devem começar com `VITE_`
2. **Build time:** As variáveis são lidas durante o build, não runtime
3. Re-deploy após configurar as variáveis

### 🚨 Site Não Carrega

#### Problema: "Page Not Found" em todas as rotas
**Sintoma:**
- Home funciona
- `/admin` → 404
- `/students` → 404

**Solução:**
1. Verifique se `netlify.toml` está na raiz do projeto
2. Confirme o conteúdo:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
3. Re-deploy

#### Problema: "Cannot GET /"
**Sintoma:**
- Site não carrega
- Erro no console

**Solução:**
1. **Build settings incorretos no Netlify:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist` (não `build`)

### 🚨 Performance Issues

#### Problema: Site muito lento
**Sintoma:**
- Carregamento > 5 segundos
- Lighthouse score baixo

**Solução:**
1. **Habilite compressão** (já configurado no `netlify.toml`)
2. **Configure cache** (já configurado)
3. **Use CDN** (Netlify fornece automaticamente)

#### Problema: JavaScript bundle muito grande
**Sintoma:**
- Bundle size > 1MB
- Slow loading

**Solução:**
```bash
# Analise o bundle
npm run build
npx vite-bundle-analyzer dist

# Otimize se necessário
# O projeto já está otimizado com Tree Shaking
```

### 🚨 Funcionalidades Não Funcionam

#### Problema: Login não funciona
**Sintoma:**
- Não consegue fazer login
- Admin não acessa

**Solução:**
1. **Verifique se existe usuário no Supabase:**
```sql
-- Execute no SQL Editor do Supabase
SELECT * FROM admin_users WHERE email = 'admin@ibuc.com.br';
```

2. **Se não existe, execute o setup:**
   - Acesse `/setup-database` no site
   - Ou execute manualmente no Supabase

#### Problema: Cadastro não funciona
**Sintoma:**
- Não consegue cadastrar alunos
- Erro no banco

**Solução:**
1. **Verifique RLS policies** no Supabase:
```sql
-- Desabilite RLS temporariamente para teste
ALTER TABLE students DISABLE ROW LEVEL SECURITY;

-- Re-habilite após teste
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
```

### 🚨 Deploy Issues

#### Problema: Deploy fica "Building..."
**Sintoma:**
- Deploy nunca termina
- Fica em "Building" indefinitely

**Solução:**
1. **Cancel o deploy**
2. **Verifique logs** em Netlify dashboard
3. **Build timeout:** Adicione no `netlify.toml`:
```toml
[build]
  command = "npm install && npm run build"
  publish = "dist"
  functions = "netlify/functions"

# Timeout de 15 minutos
[build.processing]
  skip_processing = false
```

#### Problema: "Deploy cancelled"
**Sintoma:**
- Deploy cancelado automaticamente

**Solução:**
1. **Build muito lento:** Otimize o build
2. **Dependências demais:** Verifique `package.json`
3. **Memory issues:** Use Node 18+

### 🚨 SSL/HTTPS Issues

#### Problema: Site não carrega em HTTPS
**Sintoma:**
- Certificado SSL inválido
- Mixed content warnings

**Solução:**
1. **Netlify fornece SSL automático**
2. **Força HTTPS** no `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"
```

## 🛠️ Ferramentas de Debug

### 1. Verificar Build Local
```bash
# Teste completo local
npm run build:check

# Servir localmente
npm run preview

# Verificar dist
ls -la dist/
```

### 2. Verificar Variáveis
```javascript
// No browser console
console.log('SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('SUPABASE_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20) + '...');
```

### 3. Netlify CLI
```bash
# Instalar CLI
npm install -g netlify-cli

# Fazer login
netlify login

# Deploy local
netlify dev

# Deploy production
netlify deploy --prod
```

### 4. Logs do Netlify
1. **Dashboard** > **Deploys** > **Deploy log**
2. **Functions** > **View logs** (se usar functions)

## 📞 Suporte

### Logs Importantes
Para suporte, sempre inclua:

1. **Build logs** do Netlify
2. **Browser console** errors
3. **Network tab** requests
4. **Environment variables** (sem as chaves secretas)

### Comandos de Diagnóstico
```bash
# Verificar projeto
npm run type-check
npm run lint
npm run build

# Verificar dependências
npm list
npm outdated

# Verificar Node
node --version
npm --version
```

### URLs para Teste
- **Site atual:** `https://[seu-site].netlify.app`
- **Supabase Dashboard:** https://supabase.com/dashboard/project/ffzqgdxznsrbuhqbtmaw
- **Netlify Dashboard:** https://app.netlify.com

---

**💡 Dica:** Sempre teste localmente antes do deploy!

**🔄 Re-deploy:** Sempre re-deploy após mudanças na configuração