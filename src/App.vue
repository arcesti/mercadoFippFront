<template>
  <div class="app">
    <div v-if="logar">
      <pagina-login @voltar="alterarLogar" @logar="realizarLogin"></pagina-login>
    </div>
    <div v-if="!logar">
      <Header @logar="alterarLogar" />
      <router-view></router-view>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Feed from './components/Feed.vue'
import Footer from './components/Footer.vue'
import FormCategoria from './components/FormCategoria.vue'
import FormUsuario from './components/FormUsuario.vue'
import PaginaLogin from "@/components/PaginaLogin.vue";

export default {
  name: 'App',
  components: {
    Header,
    Feed,
    Footer,
    FormCategoria,
    FormUsuario,
    PaginaLogin
  },
  data(){
    return{
      logar:false,
      usuario:{
        id: 0,
        nome: "",
        senha: "",
        level: 0,
      }
    }
  },
  methods:{
    alterarLogar(zerar){
      console.log("alterando")
      this.logar=!this.logar;
      /*if(zerar!=null && zerar!= undefined && zerar)
        this.zerarUsuario()*/
    },
    realizarLogin(dados){
      localStorage.setItem('usuario', JSON.stringify(dados.usuario));
      localStorage.setItem('token', dados.token);
      this.usuario=dados.usuario;
      this.logar=false;
    },
    zerarUsuario(){
      this.usuario={
        id: 0,
        nome: "",
        senha: "",
        level: 0,
      }
      localStorage.removeItem('usuario');
      localStorage.removeItem('token');
    }
  },
  // mounted() {
  //   const usuarioSalvo = localStorage.getItem('usuario');
  //   if (usuarioSalvo) {
  //     this.usuario =JSON.parse( usuarioSalvo);
  //
  //   }
  // }
}
</script>

<style>
/* Estilos globais */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', 'Segoe UI', sans-serif;
}

body {
  background: linear-gradient(145deg, #f9f9f9, #f0f0f0);
  color: #333;
  line-height: 1.6;
  background-attachment: fixed;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.app::after {
  content: '';
  position: absolute;
  top: 15%;
  right: 0;
  width: 100%;
  height: 300px;
  background: linear-gradient(90deg, transparent, rgba(83, 166, 83, 0.03), transparent);
  transform: skewY(-3deg);
  pointer-events: none;
  z-index: -1;
}

/* Estilos de scroll personalizado */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #1a5e1a, #3c8c3c, #53a653);
  border-radius: 4px;
  border: 2px solid #f1f1f1;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #1a5e1a, #3c8c3c);
}
</style>