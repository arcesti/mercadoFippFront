<template>
    <div class="hello">
        <h1>{{ msg }}</h1>

        <table id="customers">
            <thead>
                <tr>
                    <th @click="ordenarNome" style="cursor: pointer">NOME</th>
                    <th @click="ordenarAnuncios" style="cursor: pointer">TOTAL DE ANÚNCIOS</th>
                    <th @click="ordenarLevel" style="cursor: pointer">LEVEL</th>
                    <th>AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usuario in usuarios" :key="usuario.id">
                    <td>{{ usuario.nome }}</td>
                    <td class="center">{{ usuario.totAnu }}</td>
                    <td class="center">
                        <span>
                            {{ usuario.level }}
                        </span>
                    </td>
                    <td>
                        <button 
                            @click="excluir(usuario)" 
                            :class="['btn-excluir', { 'btn-disabled': usuario.totAnu > 0 }]"
                            :disabled="usuario.totAnu > 0"
                            :title="usuario.totAnu > 0 ? 'Não é possível excluir usuário com anúncios ativos' : 'Excluir usuário'"
                        >
                            Excluir
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';

export default {
    name: "ListaUsuarios",
    props: {
        msg: String,
    },
    data() {
        return {
            usuarios: null,
            token: null
        };
    },
    created() {
        this.token = localStorage.getItem('token');
        axios.get(`http://localhost:8080/apis/usuario`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
            .then((res) => {
                this.usuarios = res.data;
                const promises = this.usuarios.map((user) => {
                    console.log(user.id)
                    return axios.get(`http://localhost:8080/apis/anuncio/user/${user.id}`, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    })
                        .then(res => {
                            user.totAnu = res.data.length;
                            return user;
                        })
                        .catch(() => {
                            user.totAnu = 0;
                            return user;
                        });
                });

                Promise.all(promises)
                    .then(usersWithTotAnu => {
                        this.usuarios = usersWithTotAnu;
                    });
            })
            .catch((err) => {
                toast.error(`Não foi possível recuperar usuários: ${err}`);
            })
    },
    methods: {
        excluir(usuario) {
            // Validação prévia - bloqueia se o usuário tiver anúncios
            if (usuario.totAnu > 0) {
                toast.error(`Não é possível excluir o usuário ${usuario.nome}. Ele possui ${usuario.totAnu} anúncio(s) ativo(s).`);
                return;
            }

            // Confirmação de exclusão
            if (!confirm(`Tem certeza que deseja excluir o usuário ${usuario.nome}?`)) {
                return;
            }

            console.log("Excluir usuário:", usuario.nome);

            axios.delete(`http://localhost:8080/apis/usuario/${usuario.id}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then((res) => {
                toast.success(`Usuário ${usuario.nome} excluído com sucesso!`);
                // Remove o usuário da lista local
                this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
            })
            .catch((err) => {
                console.error('Erro ao excluir usuário:', err);
                toast.error(`Não foi possível deletar o usuário ${usuario.nome}. Verifique se não há anúncios vinculados.`);
            })
        },
        ordenarNome() {
            this.usuarios.sort((a, b) => a.nome.localeCompare(b.nome));
        },
        ordenarAnuncios() {
            this.usuarios.sort((a, b) => b.totAnu - a.totAnu);
        },
        ordenarLevel() {
            // Implementa ordenação por level se necessário
            this.usuarios.sort((a, b) => a.level.localeCompare(b.level));
        }
    },
};
</script>

<style scoped>
.hello {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 90vh;
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
    transition: background-color 0.3s ease;
}

#customers th:hover {
    background-color: #145214;
}

#customers tr:nth-child(even) {
    background-color: #f9f9f9;
}

#customers tr:hover {
    background-color: #e0f2e9;
}

.center {
    text-align: center;
}

.level-badge {
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.level-bronze {
    background: linear-gradient(145deg, #cd7f32, #b8722c);
    color: white;
    box-shadow: 0 2px 8px rgba(205, 127, 50, 0.3);
}

.level-prata {
    background: linear-gradient(145deg, #c0c0c0, #a8a8a8);
    color: #333;
    box-shadow: 0 2px 8px rgba(192, 192, 192, 0.3);
}

.level-ouro {
    background: linear-gradient(145deg, #ffd700, #e6c200);
    color: #333;
    box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
}

.level-diamante {
    background: linear-gradient(145deg, #b9f2ff, #87ceeb);
    color: #333;
    box-shadow: 0 2px 8px rgba(135, 206, 235, 0.3);
}

.btn-excluir {
    background: linear-gradient(145deg, #dc3545, #c82333);
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(220, 53, 69, 0.2);
    font-size: 0.9rem;
}

.btn-excluir:hover:not(:disabled) {
    background: linear-gradient(145deg, #c82333, #bd2130);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

.btn-excluir:active:not(:disabled) {
    transform: translateY(0);
}

.btn-disabled {
    background: linear-gradient(145deg, #6c757d, #5a6268) !important;
    cursor: not-allowed !important;
    opacity: 0.6;
    transform: none !important;
    box-shadow: none !important;
}

.btn-disabled:hover {
    background: linear-gradient(145deg, #6c757d, #5a6268) !important;
    transform: none !important;
    box-shadow: none !important;
}
</style>