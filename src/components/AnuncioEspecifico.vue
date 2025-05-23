<template>
  <div class="anuncio-container" v-if="anuncio">
    <!-- Botão Voltar -->
    <button @click="voltarParaFeed" class="btn-voltar">
      <i class="icon-arrow-left">←</i> Voltar aos Anúncios
    </button>

    <!-- Conteúdo principal -->
    <div class="anuncio-content">
      <!-- Imagens -->
      <div class="anuncio-images">
        <div class="main-image">
          <img
              :src="imagemPrincipal.imagem64"
              :alt="anuncio.titulo"
              @error="handleImageError"
          >
        </div>
        <div class="thumbnail-container" v-if="anuncio.fotos && anuncio.fotos.length > 1">
          <div
              v-for="(foto, index) in anuncio.fotos"
              :key="index"
              class="thumbnail"
              :class="{ active: imagemAtual === index }"
              @click="selecionarImagem(index)"
          >
            <img :src="foto.imagem64" :alt="'Foto ' + (index + 1)" @error="handleThumbnailError">
          </div>
        </div>
      </div>

      <!-- Informações do anúncio -->
      <div class="anuncio-info">
        <div class="anuncio-header">
          <h1 class="anuncio-titulo">{{ anuncio.titulo }}</h1>
          <div class="anuncio-preco">{{ formatarPreco(anuncio.preco) }}</div>
        </div>

        <div class="anuncio-descricao">
          <h3>Descrição</h3>
          <p>{{ anuncio.descricao }}</p>
        </div>

        <div class="anuncio-detalhes" v-if="temDetalhes">
          <h3>Especificações</h3>
          <div class="detalhes-grid">
            <div class="detalhe-item" v-if="anuncio.categoria">
              <span class="detalhe-label">Categoria:</span>
              <span class="detalhe-valor">{{ anuncio.categoria.nome }}</span>
            </div>
          </div>
        </div>

        <!-- Seção de Perguntas -->
        <div class="anuncio-perguntas">
          <h3>Perguntas</h3>
          <div v-if="anuncio.perguntas && anuncio.perguntas.length">
            <div v-for="(pergunta, index) in anuncio.perguntas" :key="index" class="campo-salvo">
              <div>
                <strong>Pergunta:</strong> {{ pergunta.texto }}<br>
                <span v-if="pergunta.resposta"><strong>Resposta:</strong> {{ pergunta.resposta }}</span>
                <span v-else class="text-muted"><em>Sem resposta ainda</em></span>
              </div>
            </div>
          </div>
          <div v-else>
            <p>Nenhuma pergunta feita ainda.</p>
          </div>

          <!-- Formulário para nova pergunta -->
          <div class="campo-input-group" style="margin-top: 1rem;">
            <input
                type="text"
                class="campo-input"
                v-model="novaPergunta"
                placeholder="Digite sua pergunta sobre o produto"
            >
            <button @click="adicionarPergunta" class="btn-adicionar-campo">
              Enviar Pergunta
            </button>
          </div>
        </div>


      </div>
    </div>
  </div>

  <div v-else>
    <p>Carregando anúncio...</p>
  </div>
</template>


<script>
import axios from "axios";
import semImagem from "@/assets/semImagem.png";

export default {
  name: "AnuncioEspecifico",
  props: ['id'],
  data() {
    return {
      anuncio: null,
      imagemAtual: 0,

    };
  },
  computed: {
    imagemPrincipal() {
      return (this.anuncio?.fotos?.length > 0)
          ? this.anuncio.fotos[this.imagemAtual]
          : semImagem;
    },
  },
  created() {
    this.carregarAnuncio();
  },
  methods: {
    carregarAnuncio() {
      axios.get(`http://localhost:8080/apis/anuncio/${this.id}`)
          .then(response => {
            this.anuncio = response.data;
            console.log(this.anuncio)
          })
          .catch(error => {
            console.error('Erro ao buscar anúncio:', error);
            this.$router.push('/');
          });
    },
    voltarParaFeed() {
      this.$router.push('/anuncio');
    },
    selecionarImagem(index) {
      this.imagemAtual = index;
    },
    handleImageError(event) {
      event.target.src = semImagem;
    },
    handleThumbnailError(event) {
      event.target.src = semImagem;
    },
    formatarPreco(valor) {
      const numero = Number(valor) || 0;
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }).format(numero);
    },
  }
}
</script>


<style scoped>
.anuncio-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.btn-voltar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #fff;
  border: 2px solid #ddd;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.btn-voltar:hover {
  background: #f8f9fa;
  border-color: #1a5e1a;
  color: #1a5e1a;
}

.anuncio-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  background: #fff;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.anuncio-images {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.main-image {
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-container {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
}

.thumbnail {
  min-width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid transparent;
  transition: all 0.3s ease;
}

.thumbnail.active {
  border-color: #1a5e1a;
  transform: scale(1.05);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.anuncio-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.anuncio-header {
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 1.5rem;
}

.anuncio-titulo {
  font-size: 2.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.anuncio-preco {
  font-size: 2rem;
  font-weight: 800;
  color: #1a5e1a;
  background: linear-gradient(135deg, #e8f5e8, #f0f8f0);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  display: inline-block;
}

.anuncio-descricao h3,
.anuncio-detalhes h3,
.anuncio-localizacao h3,
.vendedor-info h3,
.campo-adicional h3,
.campos-salvos h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #1a5e1a;
  display: inline-block;
}

.anuncio-descricao p {
  line-height: 1.7;
  color: #555;
  font-size: 1.1rem;
}

.detalhes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.detalhe-item {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #1a5e1a;
}

.detalhe-label {
  font-weight: 600;
  color: #666;
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.detalhe-valor {
  font-weight: 500;
  color: #333;
  font-size: 1rem;
}

.localizacao-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: #555;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.vendedor-detalhes {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.vendedor-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.vendedor-item:last-child {
  margin-bottom: 0;
}

.vendedor-label {
  font-weight: 600;
  color: #666;
}

.vendedor-valor {
  font-weight: 500;
  color: #333;
}

.campo-input-group {
  display: flex;
  gap: 1rem;
}

.campo-input {
  flex: 1;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.campo-input:focus {
  outline: none;
  border-color: #1a5e1a;
}

.btn-adicionar-campo {
  background: #1a5e1a;
  color: white;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

.btn-adicionar-campo:hover {
  background: #2d7a2d;
}

.campo-salvo {
  background: #e8f5e8;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid #1a5e1a;
}

.btn-remover {
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

.btn-remover:hover {
  background: #ff3838;
}

.acoes-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #f0f0f0;
}

.btn-campo-adicional {
  background: #6c757d;
  color: white;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

.btn-campo-adicional:hover {
  background: #5a6268;
}

.btn-contatar {
  background: #007bff;
  color: white;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s ease;
}

.btn-contatar:hover {
  background: #0056b3;
}

.btn-favoritar {
  background: #ff6b6b;
  color: white;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s ease;
}

.btn-favoritar:hover {
  background: #ff5252;
}

/* Responsividade */
@media (max-width: 768px) {
  .anuncio-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1.5rem;
  }

  .anuncio-titulo {
    font-size: 1.8rem;
  }

  .anuncio-preco {
    font-size: 1.5rem;
  }

  .detalhes-grid {
    grid-template-columns: 1fr;
  }

  .acoes-container {
    flex-direction: column;
  }

  .campo-input-group {
    flex-direction: column;
  }
}
</style>