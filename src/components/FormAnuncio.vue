<template>
  <main class="feed-container">
    <div class="form-wrapper">
      <div class="hello">
        <h1>Cadastro de Anúncio</h1>
      </div>

      <form @submit.prevent="salvar">
        <div class="row">
          <div>
            <label for="id">ID:</label>
            <input type="text" disabled v-model="anuncio.id" />
          </div>
          <div>
            <label for="titulo">Título:</label>
            <input type="text" v-model="anuncio.titulo" required />
          </div>
        </div>

        <div class="row">
          <div>
            <label for="data">Data:</label>
            <input type="date" v-model="anuncio.data" required />
          </div>
          <div>
            <label for="preco">Preço:</label>
            <input type="number" v-model="anuncio.preco" required />
          </div>
        </div>

        <div class="row">
          <div>
            <label for="descricao">Descrição:</label>
            <textarea v-model="anuncio.descricao" required></textarea>
          </div>
        </div>

        <div class="row">
          <div>
            <label for="categoria">Categoria:</label>
            <select v-model="anuncio.categoria.id" required>
              <option disabled value="">Selecione a categoria</option>
              <option v-for="c in categorias" :key="c.id" :value="c.id">
                {{ c.nome }}
              </option>
            </select>
          </div>
          <div>
            <label for="imagens">Imagens:</label>
            <input type="file" id="fotos" accept="image/*" multiple @change="adicionarArquivos" />
          </div>
        </div>

        <div class="button-row">
          <input type="submit" value="Salvar" />
          <button type="button" @click="limparFormulario">Cancelar</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "FormularioAnuncio",
  data() {
    return {
      anuncio: {
        id: 0,
        titulo: "",
        data: this.getDataHoje(),
        descricao: "",
        preco: 0,
        categoria: { id: "" },
        usuario: { id: 1 },
      },
      fotos: [],
      categorias: [],
    };
  },
  methods: {
    getDataHoje() {
      const hoje = new Date();
      const ano = hoje.getFullYear();
      const mes = String(hoje.getMonth() + 1).padStart(2, "0");
      const dia = String(hoje.getDate()).padStart(2, "0");
      return `${ano}-${mes}-${dia}`;
    },
    salvar() {
      const idToast = toast.loading("Salvando anúncio...", {
        position: toast.POSITION.TOP_CENTER,
      });

      const url = "http://localhost:8080/apis/anuncio";
      const formData = new FormData();
      formData.append("anuncio", new Blob([JSON.stringify(this.anuncio)], { type: "application/json" }));

      this.fotos.forEach((foto) => {
        formData.append("fotos", foto);
      });

      axios
          .post(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then(() => {
            toast.update(idToast, {
              render: "Anúncio salvo com sucesso!",
              type: "success",
              autoClose: true,
              isLoading: false,
            });
            this.limparFormulario();
          })
          .catch(() => {
            toast.update(idToast, {
              render: "Erro ao salvar o anúncio!",
              type: "error",
              autoClose: true,
              isLoading: false,
            });
          });
    },
    carregarDados() {
      axios.get("http://localhost:8080/apis/categoria").then((resultado) => {
        this.categorias = resultado.data;
      });
    },
    limparFormulario() {
      this.anuncio = {
        id: 0,
        titulo: "",
        data: this.getDataHoje(),
        descricao: "",
        preco: 0,
        categoria: { id: "" },
        usuario: { id: 1 },
      };
      this.fotos = [];
    },
    adicionarArquivos(event) {
      this.fotos = Array.from(event.target.files).slice(0, 3);
    },
  },
  mounted() {
    this.carregarDados();
  },
};
</script>

<style scoped>
.feed-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
}
.form-wrapper {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.hello h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #1a5e1a;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.row {
  display: flex;
  gap: 1rem;
}
.row > div {
  flex: 1;
  display: flex;
  flex-direction: column;
}
label {
  font-weight: 600;
  margin-bottom: 0.5rem;
}
input,
select,
textarea {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
input[type="submit"],
button {
  background-color: #1a5e1a;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
input[type="submit"]:hover,
button:hover {
  background-color: #3c8c3c;
}
.button-row {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
</style>
