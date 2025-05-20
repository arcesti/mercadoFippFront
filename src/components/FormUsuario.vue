<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div v-if="formOn">
      <form @submit.prevent="gravar()">
        <div class="row">
          <div>
            <label for="idUser">ID:</label>
            <input
              type="text"
              id="idUser"
              name="idUser"
              v-model="id"
              placeholder="Id do usuário"
            />
          </div>
          <div>
            <label for="name">Nome:</label>
            <input
              type="text"
              id="name"
              v-model="nome"
              name="name"
              placeholder="Nome do usuário"
            />
          </div>
        </div>

        <div class="row">
          <div>
            <label for="senhaUser">Senha:</label>
            <input
              type="password"
              id="senhaUser"
              name="senhaUser"
              v-model="senha"
              placeholder="Senha do usuário"
            />
          </div>
          <div>
            <label for="levelUser">Tipo:</label>
            <select v-model="level" name="levelUser" id="levelUser">
              <option value="1">Administrador</option>
              <option value="2">Normal</option>
            </select>
          </div>
        </div>

        <input type="submit" value="Cadastrar" />
      </form>
    </div>

    <div style="display: flex; justify-content: end">
      <button @click="mostrarForm(true)">Novo Usuário</button>
    </div>

    <div>
      <table id="customers">
        <thead>
          <tr>
            <th>ID</th>
            <th>NOME</th>
            <th>TIPO</th>
            <th colspan="2">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in usuarios" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.nome }}</td>
            <td>{{ retornaTipo(user.level) }}</td>
            <td><button @click="alterar(user)">Alterar</button></td>
            <td><button @click="apagar(user)">Apagar</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "FormUsuario",
  props: {
    msg: String,
  },
  data() {
    return {
      id: 0,
      nome: "",
      senha: "",
      level: "2", // valor padrão
      formOn: false,
      usuarios: [],
    };
  },
  methods: {
    mostrarForm(flag) {
      this.formOn = flag;
      if (flag) {
        this.resetForm();
      }
    },
    gravar() {
      const url = "http://localhost:8080/apis/usuario";
      const data = {
        id: this.id,
        nome: this.nome,
        senha: this.senha,
        level: this.level,
      };
      axios
        .post(url, data)
        .then((response) => {
          this.carregarDados();
          console.log("Sucesso:", response.data);
        })
        .catch((error) => {
          alert("Erro: " + error);
        });
      this.formOn = false;
    },
    apagar(usuario) {
      if (confirm("Deseja realmente excluir o usuário: " + usuario.nome)) {
        axios
          .delete("http://localhost:8080/apis/usuario/" + usuario.id)
          .then(() => {
            this.carregarDados();
          })
          .catch((error) => {
            alert("Erro: " + error);
          });
      }
    },
    alterar(usuario) {
      this.formOn = true;
      this.id = usuario.id;
      this.nome = usuario.nome;
      this.senha = ""; // segurança
      this.level = usuario.level;
    },
    carregarDados() {
      axios
        .get("http://localhost:8080/apis/usuario")
        .then((result) => {
          this.usuarios = result.data;
        })
        .catch((error) => {
          alert("Erro: " + error);
        });
    },
    retornaTipo(level) {
      if (level === "1" || level === 1) return "Administrador";
      if (level === "2" || level === 2) return "Normal";
      return "Desconhecido";
    },
    resetForm() {
      this.id = 0;
      this.nome = "";
      this.senha = "";
      this.level = "2";
    },
  },
  mounted() {
    this.carregarDados();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="text"],
select {
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="submit"] {
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

form{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.row{
    width: 60vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.row > div{
    width: 50vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}
</style>
