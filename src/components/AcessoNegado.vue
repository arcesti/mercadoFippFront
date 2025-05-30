<template>
  <div class="access-denied">
    <div class="content">
      <div class="icon">🚫</div>
      <h1>Acesso Negado</h1>
      <p>Você não possui permissão para acessar esta página.</p>
      <p class="subtitle">Esta funcionalidade está disponível apenas para administradores.</p>
      
      <div class="actions">
        <button @click="goHome" class="btn-primary">
          Ir para Início
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AcessoNegado",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goHome() {
      this.$router.push('/anuncio/0');
    }
  }
};
</script>

<style scoped>
.access-denied {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
}

.content {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

h1 {
  color: #dc3545;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

p {
  color: #6c757d;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.subtitle {
  font-size: 1rem;
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  min-width: 120px;
}

.btn-primary {
  background: linear-gradient(145deg, #1a5e1a, #3c8c3c);
  color: white;
  box-shadow: 0 4px 10px rgba(26, 94, 26, 0.2);
}

.btn-primary:hover {
  background: linear-gradient(145deg, #3c8c3c, #53a653);
  transform: translateY(-2px);
}

.btn-secondary {
  background: linear-gradient(145deg, #6c757d, #5a6268);
  color: white;
  box-shadow: 0 4px 10px rgba(108, 117, 125, 0.2);
}

.btn-secondary:hover {
  background: linear-gradient(145deg, #5a6268, #495057);
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .content {
    padding: 2rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .actions {
    flex-direction: column;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}
</style>