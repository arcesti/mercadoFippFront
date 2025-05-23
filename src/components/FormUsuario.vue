<template>
  <div class="form-wrapper">
    <div class="hello">
      <h1>Cadastro de Usuário</h1>
    </div>

    <form @submit.prevent="salvar">
      <div class="row">
        <div>
          <label for="id">ID:</label>
          <input type="text" disabled="true" v-model="usuario.id" required />
        </div>
        <div>
          <label for="level">level:</label>
          <select v-model="usuario.level" required>
            <option disabled value="0">Selecione o level</option>
            <option value="1">Administrador</option>
            <option value="2">Comum</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div>
          <label for="login">Nome de usuario:</label>
          <input type="text" v-model="usuario.login" required />
        </div>
      </div>

      <div class="row">
        <div>
          <label for="senha">Senha:</label>
          <input type="password" v-model="usuario.senha" required />
        </div>
        <div v-if="isAdm()">
          <label for="senhaAdm">Senha de Administrador:</label>
          <input type="password" v-model="senhaAdm" required />
        </div>
      </div>

      <div class="button-row">
        <input type="submit" value="Salvar" />
      </div>
    </form>

    <table id="customers">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>level</th>
          <th >Excluir</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in usuarios" :key="u.id">
          <td >{{ u.id }}</td>
          <td>{{ u.nome }}</td>

          <td>{{ definelevel(u.level) }}</td>
          <td><button @click="apagar(u)">Apagar</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  data() {
    return {
      usuario: {
        id: 0,
        nome: "",
        senha: "",
        level: 0,
      },
      usuarios: [],
      senhaAdm: "",
    };
  },
  methods: {
    salvar() {
      const id = toast.loading("Gravando um usuário", {
        position: toast.POSITION.TOP_CENTER,
      });
      if (this.usuario.level == 1 && this.senhaAdm != "1234") {
        setTimeout(() => {
          toast.update(id, {
            render: "Você informou a senha de administrador errada!",
            autoClose: true,
            type: "error",
            isLoading: false,
          });
        }, 2000);

        // toast("Hello! Wow so easy!", {
        //   type: "error",
        //   position: "top-center",
        //   transition: "zoom",
        //   dangerouslyHTMLString: true,
        // });
      } else {
        if (this.usuario.nome && this.usuario.senha && this.usuario.level) {
          const url = "http://localhost:8080/apis/usuario";
          axios
            .post(url, this.usuario)
            .then((response) => {
              this.carregarDados();
              setTimeout(() => {
                toast.update(id, {
                  render: "Usuário cadastrado com sucesso" + response.data,
                  autoClose: true,
                  type: "sucess",
                  isLoading: false,
                });
              }, 2000);
            })
            .catch((error) => {
              setTimeout(() => {
                toast.update(id, {
                  render: "Ocorreu um erro durante a inclusão de usuário",
                  autoClose: true,
                  type: "error",
                  isLoading: false,
                });
              }, 2000);
            });
          this.usuarios.push({ ...this.usuario });
          this.usuario = {
            nome: "",
            id: 0,
            senha: "",
            level: 0,
          };
          this.senhaAdm = 0;
        }
      }
    },

    isAdm() {
      return this.usuario.level == 1;
    },
    carregarDados() {
      axios
        .get("http://localhost:8080/apis/usuario")
        .then((result) => {
          this.usuarios = result.data;
          console.log(this.usuarios)
        })
        .catch((error) => {
          alert(error);
        });
    },
    definelevel(level) {
      level==1 ? "Administrador" : "Comum"
    },
    mostrar(usuario) {
     console.log(usuario);
    },
  },
  mounted() {
    this.carregarDados();
  },
};
</script>

<style scoped>
.form-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.hello h1 {
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  color: #1a5e1a;
  margin-bottom: 2rem;
}

form {
  width: 40vw;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.row {
  display: flex;
  /* flex-wrap: wrap; */
  gap: 2rem;
  justify-content: space-between;
}

.row > div {
  flex: 1 1 45%;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

input[type="text"],
input[type="password"],
select {
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  background: #fff;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="password"]:focus,
select:focus {
  border-color: #1a5e1a;
  outline: none;
}

input[type="submit"],
button {
  background: linear-gradient(145deg, #1a5e1a, #3c8c3c);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease, transform 0.2s;
  box-shadow: 0 4px 10px rgba(26, 94, 26, 0.2);
}

input[type="submit"]:hover,
button:hover {
  background: linear-gradient(145deg, #3c8c3c, #53a653);
  transform: translateY(-2px);
}

#customers {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
}

#customers th,
#customers td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

#customers th {
  background-color: #1a5e1a;
  color: white;
  font-weight: 600;
}

#customers tr:nth-child(even) {
  background-color: #f9f9f9;
}

#customers tr:hover {
  background-color: #e0f2e9;
}

.button-row {
  text-align: center;
}
</style>
