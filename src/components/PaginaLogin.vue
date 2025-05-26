<template>
  <div class="login-container" v-if="!isCadastro">
    <div class="login-content">
      <div class="login-header">
        <h1 class="login-titulo">Fazer Login</h1>
        <p class="login-subtitulo">Entre na sua conta para continuar</p>
      </div>

      <div class="login-form">
        <div class="campo-input-group">
          <label class="campo-label">Usuário</label>
          <input
              type="text"
              class="campo-input"
              v-model="usuario"
              placeholder="Digite seu usuário"
          >
        </div>

        <div class="campo-input-group">
          <label class="campo-label">Senha</label>
          <input
              type="password"
              class="campo-input"
              v-model="senha"
              placeholder="Digite sua senha"
          >
        </div>

        <div class="login-acoes">
          <button class="btn-login" @click="logar(usuario, senha)">
            Entrar
          </button>
          <button class="btn-login" @click="voltar">
            Sair
          </button>

          <div class="login-links">
            <a class="link-cadastro" @click="cadastrar(null)">Não tem conta? Cadastre-se</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="isCadastro">
    <form-usuario @voltar="cadastrar" ></form-usuario>
  </div>
</template>

<script>
import FormUsuario from "@/components/FormUsuario.vue";
import axios from "axios";
import { toast } from "vue3-toastify";

export default {
  name: "PaginaLogin",
  components: {
    FormUsuario,
  },
  data() {
    return {
      usuario: "",
      senha: "",
      isCadastro: false,
    };
  },
  methods: {
    cadastrar(usuario) {
      if(usuario==null)
        this.isCadastro = true;
      else {
        this.isCadastro=false;
        this.usuario=usuario.nome;
        this.senha=usuario.senha;
      }
    },
    voltar() {
      this.isCadastro = false;
      this.$emit("voltar", false);
    },
    logar(nomeUsuario, senhaUsuario) {
      const url = "http://localhost:8080/apis/usuario/logar";
      axios
          .post(url, {
            usuario: nomeUsuario,
            senha: senhaUsuario,
          })
          .then((resultado) => {
            this.$emit("logar", resultado.data);
          })
          .catch(() => {
            toast.error("Ocorreu um erro ao logar, usuário ou senha incorretos");
          });
    },
  },
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-content {
  background: #fff;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
}

.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 1.5rem;
}

.login-titulo {
  font-size: 2.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.login-subtitulo {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.campo-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.campo-label {
  font-weight: 600;
  color: #333;
  font-size: 1rem;
}

.campo-input {
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background: #f8f9fa;
}

.campo-input:focus {
  outline: none;
  border-color: #1a5e1a;
  background: #fff;
}

.campo-input::placeholder {
  color: #999;
}

.login-acoes {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
}

.btn-login {
  background: #1a5e1a;
  color: white;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  transition: background 0.3s ease;
}

.btn-login:hover {
  background: #2d7a2d;
}

.login-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
}

.link-esqueceu,
.link-cadastro {
  color: #1a5e1a;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.link-esqueceu:hover,
.link-cadastro:hover {
  color: #2d7a2d;
  text-decoration: underline;
  cursor: pointer;
}

.link-cadastro {
  color: #007bff;
}

.link-cadastro:hover {
  color: #0056b3;
}

/* Responsividade */
@media (max-width: 768px) {
  .login-container {
    padding: 1rem;
  }

  .login-content {
    padding: 2rem;
  }

  .login-titulo {
    font-size: 1.8rem;
  }

  .login-subtitulo {
    font-size: 1rem;
  }
}
</style>