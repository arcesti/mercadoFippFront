<template>
  <main class="feed-container">
    <h1 class="feed-title">Anúncios em Destaque</h1>
    
    <div class="feed">
      <div v-for="(anuncio, index) in anuncios" :key="index" class="card-anuncio">
        <div class="card-image">
          <img :src="anuncio.imagem" :alt="anuncio.titulo" />
        </div>
        <div class="card-content">
          <h2 class="card-title">{{ anuncio.titulo }}</h2>
          <p class="card-description">{{ anuncio.descricao }}</p>
          <div class="card-footer">
            <span class="card-price">{{ anuncio.preco }}</span>
            <button class="card-button">Ver detalhes</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'FeedAnuncios',
  data() {
    return {
      anuncios: [
        {
          titulo: 'Notebook Dell Inspiron',
          descricao: 'Notebook Dell Inspiron com processador i5, 8GB RAM, SSD 256GB, tela 15.6" Full HD. Perfeito para trabalho e estudos.',
          preco: 'R$ 3.999,00',
          imagem: '@/assets/notebook.jpg'
        },
        {
          titulo: 'iPhone 14 Pro Max',
          descricao: 'iPhone 14 Pro Max com 256GB de armazenamento, tela Super Retina XDR de 6.7", câmera tripla de 48MP. Cor grafite.',
          preco: 'R$ 6.799,00',
          imagem: '@/assets/iphone.jpg'
        },
        {
          titulo: 'Bicicleta Mountain Bike',
          descricao: 'Bicicleta Mountain Bike aro 29, quadro em alumínio, 21 marchas, freio a disco. Ideal para trilhas e uso urbano.',
          preco: 'R$ 1.599,00',
          imagem: '@/assets/bike.jpg'
        },
        {
          titulo: 'Smart TV Samsung 50"',
          descricao: 'Smart TV Samsung 50" 4K, Crystal UHD, Bluetooth, Wi-Fi, HDR, 3 HDMI, 2 USB. Sistema Tizen. Som imersivo.',
          preco: 'R$ 2.899,00',
          imagem: '@/assets/tv.jpg'
        },
        {
          titulo: 'Sofá Retrátil 3 Lugares',
          descricao: 'Sofá retrátil e reclinável de 3 lugares, em tecido suede, estrutura em madeira de reflorestamento. Cor cinza.',
          preco: 'R$ 1.899,00',
          imagem: '@/assets/sofa.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>
.feed-container {
  max-width: 1200px;
  margin: 2.5rem auto;
  padding: 0 1.5rem;
  position: relative;
}

.feed-container::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 0;
  right: 0;
  height: 10px;
  background: linear-gradient(90deg, transparent 0%, rgba(60, 140, 60, 0.2) 50%, transparent 100%);
  border-radius: 50%;
  filter: blur(5px);
}

.feed-title {
  font-size: 2.2rem;
  color: #333;
  margin-bottom: 2.5rem;
  text-align: center;
  position: relative;
  font-weight: 600;
}

.feed-title::before {
  content: '';
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #1a5e1a, #53a653);
}

.feed-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #53a653, #1a5e1a);
  border-radius: 3px;
}

.feed {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.card-anuncio {
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;
}

.card-anuncio::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #1a5e1a, #53a653);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease;
}

.card-anuncio:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
}

.card-anuncio:hover::before {
  transform: scaleX(1);
}

.card-image {
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.card-anuncio:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.card-description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 4.5em;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding-top: 1.2rem;
  position: relative;
}

.card-footer::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 0;
  right: 0;
  height: 15px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.03), transparent);
}

.card-price {
  font-weight: 700;
  color: #1a5e1a;
  font-size: 1.2rem;
  position: relative;
  padding-left: 10px;
}

.card-price::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 70%;
  background: linear-gradient(to bottom, #1a5e1a, #53a653);
  border-radius: 2px;
}

.card-button {
  background: linear-gradient(145deg, #1a5e1a, #3c8c3c);
  color: white;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(26, 94, 26, 0.2);
}

.card-button::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: -100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: all 0.4s ease;
}

.card-button:hover {
  background: linear-gradient(145deg, #3c8c3c, #53a653);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(26, 94, 26, 0.3);
}

.card-button:hover::after {
  left: 100%;
}

/* Responsividade */
@media (max-width: 768px) {
  .feed {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
  }
  
  .card-image {
    height: 180px;
  }
}

@media (max-width: 576px) {
  .feed {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .feed-container {
    margin: 1.5rem auto;
  }
  
  .feed-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
}
</style>