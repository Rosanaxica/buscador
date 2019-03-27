
<template>

 
 
  <div>
         
    <div class="jumbotron text-center">
      <div class="container mx-auto">
        <div class="jumbotron-heading">
          <h1 class="text-light font-weight-bold">Git Searcher</h1>
        </div>
        <p
          class="text-white"
        >GitHub é um sistema de gerenciamento de projetos e versões de códigos assim como uma plataforma de rede social criado para desenvolvedores. Mas para que o GitHub é utilizado? Entre outras coisas, ele permite que você trabalhe em projetos colaborativos com desenvolvedores de todo o mundo, planeje seus projetos e acompanhe o trabalho.</p>
        <div class="row">
          <div class="col-lg-12">
            <div class="input-group mb-3">
              <input
                type="text"
                v-model="busca"
                v-on:keyup.enter="clicaEnter()"
                class="form-control"
                placeholder="Digite o usuario que deseja buscar"
                aria-label="digite o usuario git que deseja buscar"
                ref="input"
                
                       >
              <div class="input-group-append">
                <button
                  class="btn btn-secondary"
                  type="button"
                  id="buscar"
                  ref="buscar"
                  v-on:click="buscar(busca)"
                  aria-label="buscar"
                  v-scroll-to="'#linkelement'"
                >
                  <font-awesome-icon icon="search"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <main class="container-fluid"  >
   
      <a class="" href="#" v-on:click="setFocusTop()">Scroll to top</a>
      <div v-if="usuario!='' && erro==false">

        <div class="card col-lg-12 my-3 pb-3"   >
          <div class="row mt-4">
            <div class="col-lg-4 col-md-4">
              <img class="img-thumbnail shadow" v-bind:src="usuario.avatar_url" width="200">
            </div>
            <div class="col-lg-8 col-md-8">
              <p class="display-4">{{usuario.name}}</p>
              <p>{{usuario.bio}}</p>
              <b>
                <font-awesome-icon icon="user"/>
              </b>
              {{usuario.login}}
              <br>
              <b>
                <font-awesome-icon icon="at"/>
              </b>
              <a  v-bind:href="'mailto:'+usuario.email">{{usuario.email}}</a>

              <br>
              <b>
                <font-awesome-icon icon="envelope"/>
              </b>
              <a v-bind:href="usuario.blog">{{usuario.blog}}</a>
              <br>
              <b>Criado em:</b>
              <span>{{usuario.created_at | moment("D/MM/YYYY") }}</span>

              <br>
              <b>Ultima modificação :</b>
              {{usuario.updated_at| moment("D/MM/YYYY") }}
              <br>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-12 col-md-12">
            <button
              href="#"
              class="btn btn-outline-purple col-lg-12 box"
              v-on:click="buscarRepo(busca,page),getPaginacao(usuario.public_repos)"
               id="linkelement"
            >
              Repositorios
              <span class="badge badge-purple">{{usuario.public_repos}}</span>
            </button>
          </div>
        </div>
         <a href="#" ref="main" aria-hidden="true"></a>
                
      </div>
      <div class="row mt-4 mx-2" v-if="erro">
        <div class="col-lg-12 col-md-12 pt-3 card">
          <div class="alert alert-danger" role="alert">
            <font-awesome-icon icon="exclamation"/>Usuário não encontrado
          </div>
        </div>
      </div>
      <hr>
      <div v-show="repositorios!='' && erro==false" class="card p-3">
        <h2>Repositórios</h2>

        <div class="row">
          <div class="col-lg-4" v-for="indice in repositorios">
            <a v-bind:href="indice.html_url" target="_blank">
              <div class="card card-repo p-3 m-3 shadow">
                <h3 class="h5">{{indice.name}}</h3>
                <small>{{indice.description}}</small>
              </div>
            </a>
          </div>
        </div>
        <div class="row">
          <nav aria-label="paginacao">
            <ul class="pagination">
              <li class="page-item disabled">
                <a class="page-link" href="#" tabindex="-1">Anterior</a>
              </li>
              <li class="page-item">
                <a class="page-link"></a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="row mt-4" v-show="errorepo">
          <div class="col-lg-12 col-md-12">
            <div class="alert alert-danger" role="alert">Não há repositorios</div>
          </div>
        </div>
      </div>
 
    </main>
  </div>

</template>

<script>

export default {
  name: "buscador",
   
  data() {
    return {
      busca: "",
      repos_url: "",
      usuario: [],
      repositorios: [],
      erro: false,
      errorepo: false,
      paginaAtual: "",
      paginas: [],
      page: "",

    };
  },
  methods: {
    buscar: function(busca) {
      console.log(busca);
      
      this.$http
        .get("https://api.github.com/users/" + busca)
        //.get("https://api.github.com/search/users?q="+busca)
        .then(res => res.json())
        .then(usuario => {
          this.usuario = usuario
          this.erro = false
           
          })
        .catch(err => {
          console.log(err)
          this.erro = true
        });
    },
    buscarRepo: function(busca, page) {
      this.$http
        .get("https://api.github.com/users/" + busca + "/repos?page=1")
        .then(res => res.json())
        .then(repositorios => {
          this.repositorios = repositorios
          this.erro = false
        })
        .catch(err => {
          console.log(err)
          this.errorepo = true
          this.repositorios = ""
        });
    },
    getPaginacao: function(qtdRepos) {
      this.page = (qtdRepos / 30).toFixed(0)
      this.paginas = Array.from({ length: this.page }, (v, k) => k)
      console.log(this.paginas);
    },
       setFocus(){
         this.$nextTick(() => {
           this.$refs.main.focus();
       console.log("setando o focus nessa bagaça");  
       });
       
     
  },
    setFocusTop(){
         this.$nextTick(() => {
           this.$refs.input.focus();
       console.log("setando o focus nessa bagaça pra cima");  
       });
      
     
  },
  clicaEnter(){
    this.$refs.buscar.click();
  }
  },
  
    
  
};
</script>
<style>
body {
  font-family: "Quicksand", sans-serif;
}
.bg-purple {
  background-color: blueviolet;
  color: white;
}
.btn-purple {
  background-color: blueviolet;
  color: white;
}
.bg-purple:hover {
  color: white;
}
.bg-purple:focus {
  box-shadow: 0 0 0 0.2rem rgba(152, 23, 216, 0.274);
}
input[type="search"]:focus {
  box-shadow: 0 0 0 0.2rem rgba(152, 23, 216, 0.274);
  border-color: blueviolet;
}
.btn-outline-purple {
  color: blueviolet;
  border-color: blueviolet;
}
.btn-outline-purple:hover {
  color: white;
  background-color: blueviolet;
}
.badge-purple {
  color: white;
  background-color: blueviolet;
}
.card-repo {
  height: 250px;
}
a:link {
  text-decoration: none;
  color: blueviolet;
}
.jumbotron {
  background-image: url("/src/assets/fundo_busca.png");
  background-repeat: no-repeat;
  min-height: 600px;
  background-size: 100% 100%;
}
.jumbotron .container {
  max-width: 40rem;
  box-sizing: border-box;
  background-color: rgba(148, 59, 207, 0.671);
}


@import url("https://fonts.googleapis.com/css?family=Quicksand");
</style>