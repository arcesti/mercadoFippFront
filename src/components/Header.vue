<template>
  <header class="header">
    <div class="navbar">
      <div class="navbar-left">
        <div class="logo">
          <img src="@/assets/logo.svg" alt="Logo" />
          <span>GreenMarket</span>
        </div>
        
        <nav class="menu">
          <div class="dropdown">
            <button class="dropdown-btn">Cadastros</button>
            <div class="dropdown-content">
              <a href="/categoria/CATEGORIA">Categoria</a>
              <a href="/usuario/USUARIO">Usuário</a>
            </div>
          </div>
          <a href="/anuncio" class="menu-item">Anúncios</a>
        </nav>
      </div>

      <div class="navbar-right">
        <div class="user-profile">
          <!-- <div class="user-avatar">
            <img src="@/assets/avatar.jpg" alt="Perfil" />
          </div> -->
          <div class="user-info">
            <span class="user-name">Ana Silva</span>
            <span class="user-status">Online</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      // Dados mockados poderiam vir de uma store ou props
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  background: linear-gradient(135deg, #1a5e1a, #3c8c3c, #53a653);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 80px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.navbar::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 10px;
  right: 10px;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
  z-index: -1;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
}

.logo img {
  height: 36px;
  width: auto;
}

.menu {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.menu-item {
  color: white;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
}

.menu-item::before {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 50%;
  background-color: white;
  transition: all 0.3s ease;
  transform: translateX(-50%);
  opacity: 0;
}

.menu-item:hover::before {
  width: 100%;
  opacity: 1;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-btn {
  background: none;
  border: none;
  color: white;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
}

.dropdown-btn::after {
  content: '▼';
  font-size: 0.7rem;
  margin-left: 0.5rem;
}

.dropdown-content {
  display: none;
  position: absolute;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);
  min-width: 180px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  z-index: 1;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.dropdown-content a {
  color: #495057;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  transition: all 0.3s ease;
  position: relative;
}

.dropdown-content a:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.dropdown-content a:hover {
  background-color: #e9f5e9;
  color: #1a5e1a;
  padding-left: 20px;
}

.dropdown-content a:hover::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: #3c8c3c;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.user-profile::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(60deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: rotate(30deg);
  transition: all 0.8s ease;
  opacity: 0;
}

.user-profile:hover::after {
  opacity: 1;
  transform: rotate(30deg) translate(50%, 50%);
}

.user-profile:hover {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid white;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
}

.user-status {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.75rem;
}

/* Responsividade */
@media (max-width: 768px) {
  .navbar {
    padding: 0 1rem;
  }
  
  .navbar-left {
    gap: 1rem;
  }
  
  .logo span {
    display: none;
  }
  
  .user-info {
    display: none;
  }
  
  .user-profile {
    padding: 0.5rem;
  }
}

@media (max-width: 576px) {
  .menu {
    display: none;
  }
}
</style>