
  <template>
    <div class="hello">
      <h1>{{ msg }}</h1>

      <form v-if="formOn" @submit.prevent="gravar" class="form-wrapper">
        <div class="row">
          <div>
            <label for="idCat">ID:</label>
            <input
                type="text"
                id="idCat"
                name="idCat"
                v-model="id"
                placeholder="Id da categoria"
                disabled
            />
          </div>
          <div>
            <label for="name">Nome:</label>
            <input
                type="text"
                id="name"
                name="name"
                v-model="nome"
                placeholder="Nome da categoria"
                required
            />
          </div>
        </div>

        <div class="button-row">
          <input type="submit" value="Cadastrar" />
        </div>
      </form>

      <div style="display: flex; justify-content: flex-end; margin-bottom: 1rem;">
        <button @click="mostrarForm(true)">Nova Categoria</button>
      </div>

      <table id="customers">
        <thead>
        <tr>
          <th>ID</th>
          <th @click="ordenarNome" style="cursor:pointer">NOME</th>
          <th colspan="2">AÇÕES</th>
        </tr>
        </thead>
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
.hello {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 90vh;
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

label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

input[type="text"] {
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  background: #fff;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: border-color 0.3s ease;
  width: 100%;
  box-sizing: border-box;
}

input[type="text"]:focus {
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
  width: 100%;
  box-sizing: border-box;
  margin-top: 1rem;
}

input[type="submit"]:hover,
button:hover {
  background: linear-gradient(145deg, #3c8c3c, #53a653);
  transform: translateY(-2px);
}

div[style] {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

#customers {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
  font-family: Arial, Helvetica, sans-serif;
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
  cursor: pointer;
  user-select: none;
}

#customers tr:nth-child(even) {
  background-color: #f9f9f9;
}

#customers tr:hover {
  background-color: #e0f2e9;
}

</style>
