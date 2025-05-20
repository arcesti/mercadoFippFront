<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <div class="footer-logo">
          <img src="@/assets/logo.svg" alt="Logo" />
          <span>GreenMarket</span>
        </div>
        <p class="footer-description">
          A melhor plataforma para anúncios de compra e venda. Encontre o que precisa ou anuncie seus produtos!
        </p>
      </div>
      
      <div class="footer-section">
        <h3>Links Úteis</h3>
        <ul class="footer-links">
          <li><a href="#">Sobre Nós</a></li>
          <li><a href="#">Como Funciona</a></li>
          <li><a href="#">Termos de Uso</a></li>
          <li><a href="#">Política de Privacidade</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h3>Categorias</h3>
        <ul class="footer-links">
          <li><a href="#">Eletrônicos</a></li>
          <li><a href="#">Imóveis</a></li>
          <li><a href="#">Veículos</a></li>
          <li><a href="#">Moda e Beleza</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h3>Contato</h3>
        <ul class="footer-contact">
          <li>
            <span class="icon">✉</span>
            <span>contato@greenmarket.com</span>
          </li>
          <li>
            <span class="icon">☎</span>
            <span>(11) 9999-9999</span>
          </li>
          <li>
            <span class="icon">📍</span>
            <span>Av. Paulista, 1000 - São Paulo</span>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2025 GreenMarket. Todos os direitos reservados.</p>
      <div class="social-icons">
        <a href="#" class="social-icon">FB</a>
        <a href="#" class="social-icon">IG</a>
        <a href="#" class="social-icon">TW</a>
        <a href="#" class="social-icon">YT</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #333333, #444444, #3a3a3a);
  color: #f5f5f5;
  padding-top: 3.5rem;
  position: relative;
  box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.05);
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #1a5e1a, #3c8c3c, #53a653, #3c8c3c, #1a5e1a);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2.5rem;
  padding: 0 1.5rem 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.footer-content::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 5%;
  right: 5%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(83, 166, 83, 0.3), transparent);
}

.footer-section h3 {
  color: white;
  font-size: 1.2rem;
  margin-bottom: 1.4rem;
  position: relative;
  display: inline-block;
}

.footer-section h3::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -12px;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #1a5e1a, #53a653);
  border-radius: 3px;
}

.footer-section h3::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -12px;
  width: 10px;
  height: 3px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 3px;
  animation: slide 3s infinite ease-in-out;
}

@keyframes slide {
  0% { left: 0; }
  50% { left: 30px; }
  100% { left: 0; }
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.footer-logo img {
  height: 32px;
  width: auto;
}

.footer-logo span {
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
}

.footer-description {
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.6;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.8rem;
}

.footer-links a {
  color: #ccc;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  position: relative;
  padding-left: 18px;
  display: inline-block;
}

.footer-links a::before {
  content: '›';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #53a653;
  font-size: 1.2rem;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.footer-links a:hover {
  color: #53a653;
  padding-left: 22px;
}

.footer-links a:hover::before {
  opacity: 1;
  left: 4px;
}

.footer-contact {
  list-style: none;
  padding: 0;
}

.footer-contact li {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #ccc;
}

.icon {
  font-size: 1rem;
  color: #43a047;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-bottom p {
  font-size: 0.85rem;
  color: #aaa;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.05));
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.75rem;
  font-weight: bold;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.social-icon::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(60deg, transparent, rgba(255, 255, 255, 0.05), transparent);
  transform: rotate(35deg);
  transition: all 0.6s ease;
}

.social-icon:hover {
  background: linear-gradient(145deg, #1a5e1a, #3c8c3c);
  transform: translateY(-3px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.social-icon:hover::before {
  left: 100%;
}

/* Responsividade */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem 1rem;
  }
}

@media (max-width: 576px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>