<template>
  <div class="carousel" v-if="fotos && fotos.length > 0 && fotos[indiceAtual]">
    <button class="nav prev" @click="voltar" v-if="fotos.length > 1">&#10094;</button>

    <div class="carousel-image">
      <img :src="fotos[indiceAtual].imagem64" alt="Imagem do anúncio" />
    </div>

    <button class="nav next" @click="avancar" v-if="fotos.length > 1">&#10095;</button>

    <div class="carousel-dots" v-if="fotos.length > 1">
      <span
          v-for="(foto, index) in fotos"
          :key="index"
          :class="{ ativo: index === indiceAtual }"
          @click="indiceAtual = index"
      ></span>
    </div>
  </div>

  <div v-else class="carousel-image">
    <img :src="fotosFallback" alt="Imagem padrão" />
  </div>
</template>


<script>
export default {
  name: 'Carrossel',
  props: {
    fotos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      indiceAtual: 0,
      fotosFallback: require('@/assets/semImagem.png') // garante imagem mesmo se quebrar
    }
  },
  methods: {
    avancar() {
      if (this.fotos.length > 0) {
        this.indiceAtual = (this.indiceAtual + 1) % this.fotos.length;
      }
    },
    voltar() {
      if (this.fotos.length > 0) {
        this.indiceAtual = (this.indiceAtual - 1 + this.fotos.length) % this.fotos.length;
      }
    }
  }
}

</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.carousel-image {
  width: 100%;
  height: 100%;
}

.carousel-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.4);
  color: #fff;
  border: none;
  font-size: 1.5rem;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  z-index: 10;
  border-radius: 4px;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.carousel-dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
}

.carousel-dots span {
  width: 10px;
  height: 10px;
  background: #ccc;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s;
}

.carousel-dots span.ativo {
  background: #1a5e1a;
}
</style>
