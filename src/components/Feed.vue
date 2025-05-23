<template>
  <form-anuncio v-if="veForm"  @salvo="voltarParaFeed" />

  <main v-else class="feed-container">
    <div>
      <h1 class="feed-title">Anúncios em Destaque</h1>
      <button @click="mostrarForm">Adicionar Anúncio</button>
    </div>

    <div class="feed">
      <div
          v-for="(anuncio, index) in anuncios"
          :key="index"
          class="card-anuncio"
      >
        <div class="card-image">
          <Carrossel :fotos="anuncio.fotos && anuncio.fotos.length > 0 ? anuncio.fotos : [semImagem]" />
        </div>
        <div class="card-content">
          <h2 class="card-title">{{ anuncio.titulo }}</h2>
          <p class="card-description">{{ anuncio.descricao }}</p>
          <div class="card-footer">
            <span class="card-price">{{ formatarPreco(anuncio.preco) }}</span>

            <router-link
                :to="{ path: `/anuncioEspecifico/${anuncio.id}` }"
            >
              <button class="card-button">Ver detalhes</button>
            </router-link>


          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import Carrossel from "@/components/Carrossel.vue";
import FormAnuncio from "@/components/FormAnuncio.vue";
import semImagem from "@/assets/semImagem.png"

export default {
  name: "FeedAnuncios",
  components: { Carrossel, FormAnuncio },
  data() {
    return {
      anuncios: [],
      veForm: false,
      semImagem
    };
  },
  methods: {
    carregarDados() {
      axios
          .get("http://localhost:8080/apis/anuncio")
          .then((res) => {
            this.anuncios = res.data;
          })
          .catch((error) => {
            toast.error("Não foi possível recuperar os anúncios: " + error);
          });
    },
    formatarPreco(valor) {
      const numero = Number(valor) || 0;
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }).format(numero);
    },
    mostrarForm() {
      this.veForm = true;
    },
    voltarParaFeed() {
      this.veForm = false;
      this.carregarDados();
    },
  },
  mounted() {
    this.carregarDados();
  },
};
</script>

<style scoped>
.feed-container {
  max-width: 1200px;
  margin: 2.5rem auto;
  padding: 0 1.5rem;
}

.feed-title {
  font-size: 2.2rem;
  color: #333;
  margin-bottom: 2.5rem;
  text-align: center;
  font-weight: 600;
}

.feed {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.card-anuncio {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
  transition: transform 0.3s;
}

.card-anuncio:hover {
  transform: translateY(-5px);
}

.card-image {
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-description {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-price {
  font-weight: bold;
  color: #1a5e1a;
}

.card-button {
  background: #1a5e1a;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.card-button:hover {
  background: #3c8c3c;
}
</style>