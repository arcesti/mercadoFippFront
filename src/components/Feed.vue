<template>
  <!-- Adicionar anuncio -->
  <form-anuncio v-if="veForm" @salvo="voltarParaFeed" />

  <!-- Ver anuncios sem estar logado -->
  <main v-if="!usuario && !veForm" class="feed-container">
    <div class="header-section">
      <div class="title-section">
        <h1 class="feed-title" v-if="!meusAnuncios">
          <span class="title-icon">🏆</span>
          Anúncios em Destaque
        </h1>
      </div>
    </div>
    <div class="results-info" v-if="anunciosFiltrados.length > 0">
      <span class="results-count">{{ anunciosFiltrados.length }} anúncios encontrados</span>
    </div>
    <!-- Feed Grid -->
    <div class="feed" v-if="anunciosFiltrados.length > 0">
      <div v-for="(anuncio, index) in anunciosFiltrados" :key="index" class="card-anuncio">
        <div class="card-image">
          <Carrossel :fotos="anuncio.fotos && anuncio.fotos.length > 0 ? anuncio.fotos : [semImagem]" />
          <div class="card-badge">Destaque</div>
        </div>
        <div class="card-content">
          <h2 class="card-title">{{ anuncio.titulo }}</h2>
          <p class="card-description">{{ anuncio.descricao }}</p>
          <div class="card-footer">
            <span class="card-price">{{ formatarPreco(anuncio.preco) }}</span>
            <router-link :to="`/anuncioEspecifico/${anuncio.id}`" style="text-decoration: none;">
              <button class="details-btn">
                Ver detalhes
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7,7 17,7 17,17"></polyline>
                </svg>
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Ver feed logado -->
  <main v-if="usuario && !veForm" class="feed-container">
    <!-- Header Section -->
    <div class="header-section">
      <div class="title-section">
        <h1 class="feed-title" v-if="!meusAnuncios">
          <span class="title-icon">🏆</span>
          Anúncios em Destaque
        </h1>
        <h1 class="feed-title" v-if="meusAnuncios">
          <span class="title-icon">📋</span>
          Meus Anúncios
        </h1>
      </div>

      <!-- Search Bar with Add Button -->
      <div class="search-section">
        <div class="search-container">
          <div class="search-input-wrapper">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input type="text" placeholder="Buscar anúncios..." class="search-input" v-model="searchQuery"
              @input="filtrarAnuncios" />
            <button class="search-clear" v-if="searchQuery" @click="limparBusca">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <button @click="mostrarForm" class="add-button">
            <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Adicionar Anúncio
          </button>
        </div>
      </div>
    </div>

    <!-- Results Info -->
    <div class="results-info" v-if="anunciosFiltrados.length > 0">
      <span class="results-count">{{ anunciosFiltrados.length }} anúncios encontrados</span>
    </div>

    <!-- Feed Grid -->
    <div class="feed" v-if="anunciosFiltrados.length > 0">
      <div v-for="(anuncio, index) in anunciosFiltrados" :key="index" class="card-anuncio">
        <div class="card-image">
          <Carrossel :fotos="anuncio.fotos && anuncio.fotos.length > 0 ? anuncio.fotos : [semImagem]" />
        </div>
        <div class="card-content">
          <h2 class="card-title">{{ anuncio.titulo }}</h2>
          <p class="card-description">{{ anuncio.descricao }}</p>
          <div class="card-footer">
            <span class="card-price">{{ formatarPreco(anuncio.preco) }}</span>
            <router-link :to="`/anuncioEspecifico/${anuncio.id}`" style="text-decoration: none;">
              <button class="details-btn">
                Ver detalhes
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7,7 17,7 17,17"></polyline>
                </svg>
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div class="empty-state" v-else>
      <div class="empty-icon">📭</div>
      <h3 class="empty-title">Nenhum anúncio encontrado</h3>
      <p class="empty-description">
        {{ meusAnuncios ? 'Você ainda não possui anúncios cadastrados.' : 'Não encontramos anúncios no momento.' }}
      </p>
      <button @click="mostrarForm" class="empty-action-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        {{ meusAnuncios ? 'Criar meu primeiro anúncio' : 'Adicionar anúncio' }}
      </button>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import Carrossel from "@/components/Carrossel.vue";
import FormAnuncio from "@/components/FormAnuncio.vue";
import semImagem from "@/assets/semImagem.png";

export default {
  name: "FeedAnuncios",
  components: {
    Carrossel,
    FormAnuncio,
  },
  props: {
    id: Number
  },
  data() {
    return {
      anuncios: [],
      anunciosFiltrados: [],
      veForm: false,
      semImagem,
      token: null,
      meusAnuncios: false,
      searchQuery: '',
      usuario: null
    };
  },
  methods: {
    carregarDados() {
      this.token = localStorage.getItem('token');
      if (!this.token) {
        let url = "http://localhost:8080/apis/anuncio/destaque";
        axios.get(url)
          .then((res) => {
            this.anuncios = res.data;
            this.anunciosFiltrados = this.anuncios.sort((a, b) => a.titulo.localeCompare(b.titulo));
            this.anunciosFiltrados = this.anunciosFiltrados.splice(0,5);
          })
          .catch((err) => {
            toast.error("Não foi possível recuperar os anúncios: " + err);
          })
        return;
      }
      let url
      if (this.id != 0) {
        this.meusAnuncios = true;
        url = "http://localhost:8080/apis/anuncio/user/" + this.id
      }
      else
        url = "http://localhost:8080/apis/anuncio"

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.anuncios = res.data;
          this.anunciosFiltrados = this.anuncios.sort((a, b) => a.titulo.localeCompare(b.titulo));
          this.anunciosFiltrados = this.anunciosFiltrados;
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
    filtrarAnuncios() {
      if (!this.searchQuery.trim()) {
        this.anunciosFiltrados = this.anuncios.sort((a, b) => a.titulo.localeCompare(b.titulo));
      } else {
        this.anunciosFiltrados = this.anuncios.sort((a, b) => a.titulo.localeCompare(b.titulo));
        const termo = this.searchQuery.toLowerCase().trim();
        this.anunciosFiltrados = this.anuncios.filter(anuncio => {
          const titulo = anuncio.titulo ? anuncio.titulo.toLowerCase() : '';
          const descricao = anuncio.descricao ? anuncio.descricao.toLowerCase() : '';
          return titulo.includes(termo) || descricao.includes(termo);
        });
      }
    },
    limparBusca() {
      this.searchQuery = '';
      this.anunciosFiltrados = this.anuncios;
    },
  },
  created() {
    this.token = localStorage.getItem("token");
    this.carregarDados();
    const user = localStorage.getItem('usuario');
    if (user)
      this.usuario = user;
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.feed-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
}

/* Header Section */
.header-section {
  background: white;
  border-radius: 20px;
  padding: 2rem 2rem 1.5rem 2rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.title-section {
  text-align: center;
  margin-bottom: 1.5rem;
}

.feed-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.title-icon {
  font-size: 2rem;
}

/* Search Section */
.search-section {
  margin-bottom: 0;
}

.search-container {
  display: flex;
  gap: 0.75rem;
  max-width: 500px;
  margin: 0 auto;
}

.search-input-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.9rem;
  background: #f8fafc;
  transition: all 0.3s ease;
  outline: none;
}

.search-input:focus {
  border-color: #1a5e1a;
  background: white;
  box-shadow: 0 0 0 3px rgba(26, 94, 26, 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  width: 18px;
  height: 18px;
  color: #64748b;
  z-index: 1;
}

.search-clear {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.search-clear:hover {
  background: #f1f5f9;
}

.search-clear svg {
  width: 14px;
  height: 14px;
  color: #64748b;
}

/* Add Button (moved to search section) */

.add-button {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  font-size: 0.9rem;
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.button-icon {
  width: 18px;
  height: 18px;
}

/* Results Info */
.results-info {
  margin-bottom: 2rem;
  padding: 1rem 0;
}

.results-count {
  font-weight: 600;
  color: #475569;
  font-size: 1rem;
}

/* Feed Grid */
.feed {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.card-anuncio {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.card-anuncio:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.card-image {
  height: 220px;
  overflow: hidden;
  position: relative;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card-anuncio:hover .card-image img {
  transform: scale(1.05);
}

.card-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

.card-description {
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.card-price {
  font-weight: 700;
  color: #1a5e1a;
  font-size: 1.4rem;
}

.details-btn {
  background: linear-gradient(135deg, #1a5e1a 0%, #22c55e 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(26, 94, 26, 0.2);
}

.details-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(26, 94, 26, 0.3);
}

.details-btn svg {
  width: 16px;
  height: 16px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

.empty-description {
  color: #64748b;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.empty-action-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.empty-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.empty-action-btn svg {
  width: 20px;
  height: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .feed-container {
    padding: 1rem;
  }

  .header-section {
    padding: 1.5rem 1.25rem;
  }

  .feed-title {
    font-size: 1.75rem;
  }

  .search-container {
    flex-direction: column;
    max-width: 100%;
  }

  .feed {
    grid-template-columns: 1fr;
  }

  .results-info {
    align-items: flex-start;
  }

  .card-footer {
    gap: 1rem;
  }
}
</style>