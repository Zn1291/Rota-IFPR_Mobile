# Configuração do Firebase para Autenticação IFPR

## Visão Geral
Este documento explica como configurar o Firebase Authentication para restringir o acesso apenas aos alunos do IFPR com emails institucionais.

## Configurações Necessárias

### 1. Firebase Authentication Setup

#### 1.1 Habilitar Email/Password Authentication
- No console do Firebase, vá para Authentication > Sign-in method
- Habilite "Email/Password"
- Configure as opções conforme necessário

#### 1.2 Configurar Domínios Autorizados (Opcional)
Para maior segurança, você pode configurar domínios autorizados:
- No console do Firebase, vá para Authentication > Settings > Authorized domains
- Adicione os domínios:
  - `ifpr.edu.br`
  - `aluno.ifpr.edu.br`
  - `*.ifpr.edu.br` (para campus específicos)

### 2. Estratégias de Implementação

#### 2.1 Validação no Frontend (Implementada)
- ✅ Validação de formato de email institucional
- ✅ Padrões aceitos:
  - `usuario@aluno.ifpr.edu.br`
  - `usuario@ifpr.edu.br`
  - `usuario@campus.ifpr.edu.br`

#### 2.2 Validação no Backend (Recomendada)
Para maior segurança, implemente validação no Firebase Functions:

```javascript
// Firebase Function para validação
exports.validateIFPREmail = functions.https.onCall((data, context) => {
  const email = data.email;
  const ifprPatterns = [
    /^[a-zA-Z0-9._%+-]+@aluno\.ifpr\.edu\.br$/i,
    /^[a-zA-Z0-9._%+-]+@ifpr\.edu\.br$/i,
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.ifpr\.edu\.br$/i
  ];
  
  const isValid = ifprPatterns.some(pattern => pattern.test(email));
  
  return { isValid, email };
});
```

#### 2.3 Integração com Sistema IFPR (Avançado)
Para integração completa com o sistema do IFPR:

1. **API de Verificação**: Criar endpoint para verificar se o email existe no sistema IFPR
2. **Sincronização**: Sincronizar dados de alunos automaticamente
3. **Controle de Acesso**: Implementar regras baseadas em matrícula ativa

### 3. Configurações de Segurança

#### 3.1 Firebase Security Rules
```javascript
// Exemplo de regras para Firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir acesso apenas para usuários autenticados com email IFPR
    match /mural/{document} {
      allow read, write: if request.auth != null && 
        request.auth.token.email.matches('.*@.*ifpr\\.edu\\.br');
    }
  }
}
```

#### 3.2 Configurações de Rate Limiting
- Configure limites de tentativas de login
- Implemente cooldown após múltiplas falhas
- Monitore tentativas de acesso não autorizado

### 4. Fluxo de Autenticação

1. **Validação de Email**: Verifica formato institucional
2. **Tentativa de Login**: Firebase Authentication
3. **Verificação de Permissões**: Valida acesso ao mural
4. **Redirecionamento**: Navega para área restrita

### 5. Considerações de Privacidade

- ✅ Não armazenar senhas em texto plano
- ✅ Usar tokens de autenticação seguros
- ✅ Implementar logout automático
- ✅ Logs de auditoria para acesso

### 6. Monitoramento e Analytics

- Configure Firebase Analytics para monitorar:
  - Tentativas de login
  - Taxa de sucesso/falha
  - Padrões de uso
  - Acessos não autorizados

### 7. Backup e Recuperação

- Implemente sistema de recuperação de senha
- Configure notificações de segurança
- Mantenha backup dos dados de usuários

## Próximos Passos

1. **Teste a implementação atual** com emails institucionais válidos
2. **Configure Firebase Functions** para validação adicional
3. **Implemente integração** com sistema IFPR (se necessário)
4. **Configure monitoramento** e alertas
5. **Teste cenários de segurança** e edge cases

## Suporte

Para dúvidas sobre a implementação:
- Consulte a documentação do Firebase
- Entre em contato com a equipe de TI do IFPR
- Verifique os logs de erro no console do Firebase 