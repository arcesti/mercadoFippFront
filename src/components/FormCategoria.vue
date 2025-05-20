<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div  v-if="formOn">
      <form @submit.prevent="gravar()">
        <label for="idCat">ID:</label>
        <input
          type="text"
          id="idCat"
          name="idCat"
          v-model="id"
          placeholder="Id da categoria"
        />
        <label for="name">Nome:</label>
        <input
          type="text"
          id="name"
          v-model="nome"
          name="name"
          placeholder="Nome da categoria"
        />
        <input type="submit" value="Cadastrar" />
      </form>
    </div>
    <div style="display: flex; justify-content: end">
      <button @click="mostrarForm(true)">Nova Categoria</button>
    </div>
    <div>
      <table id="customers">
        <tr>
          <th>ID</th>
          <th @click="ordenarNome()">NOME</th>
          <th colspan="2">AÇÕES</th>
        </tr>
        <tbody>
          <tr v-for="cat in categorias" :key="cat.id">
            <td>{{ cat.id }}</td>
            <td>{{ cat.nome }}</td>
            <td><button @click="alterar(cat)">Alterar</button></td>
            <td><button @click="apagar(cat)">Apagar</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FormCategoria",
  props: {
    msg: String,
  },
  data() {
    return {
      id: 0,
      nome: "",
      formOn: false,
      categorias: [],
    };
  },
  methods: {
    mostrarForm(flag) {
      this.formOn = flag;
    },
    gravar() {
      const url = "http://localhost:8080/apis/categoria";
      const data = { id: this.id, nome: this.nome };
      axios
        .post(url, data)
        .then((response) => {
          this.carregarDados();
          console.log("Sucesso:", response.data);
        })
        .catch((error) => {
          alert("erro: ", error);
        });
      this.formOn = false;
    },
    apagar(categoria) {
      if(confirm("Deseja realmente excluir a categoria: "+categoria.nome))
      {axios
        .delete("http://localhost:8080/apis/categoria/"+categoria.id)
        .then((result) => {
          
        })
        .catch((error) => {
          alert(error);
        });}
      
    },
    alterar(categoria) {
      this.formOn=true;
      this.id=categoria.id;
      this.nome=categoria.nome;
      // axios
      //   .get("http://localhost:8080/apis/categoria/"+id)
      //   .then((result) => {
      //     const categoria = result.data;
      //     this.id = categoria.id
      //     this.nome=categoria.nome
      //   })
      //   .catch((error) => {
      //     alert(error);
      //   });
    },
    carregarDados() {
      axios
        .get("http://localhost:8080/apis/categoria")
        .then((result) => {
          this.categorias = result.data;
        })
        .catch((error) => {
          alert(error);
        });
    },
    ordenarNome(){
      this.categorias.sort((a,b)=>a.nome.localeCompare(b.nome));
    }
  },
  mounted() {
    this.carregarDados();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  min-height: 90vh;
}

input[type="text"],
select {
  width: 100%;
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
