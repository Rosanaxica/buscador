<template>
  <div class="card p-4">
    <div class="row">
      <div class="col-lg-12">
        <h1 class="h4">Buscador de Usuários e Repositorios GIT</h1>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-lg-9 col-md-9">
        <input
          type="search"
          class="form-control"
          id="busca"
          placeholder="Digite o usuario que deseja buscar"
          aria-label="digite o usuario git que deseja buscar"
          v-model="busca"
          v-on:keyup.enter="buscar(busca)"
        >
      </div>

      <div class="col-lg-3 col-md-3">
        <button class="btn bg-purple" v-on:click="buscar(busca)">Pesquisar Usuarios</button>
      </div>
    </div>
    <div v-if="usuarios!=''">
    
      <div class="row mt-4" v-for="usuario in usuarios">
 
        <div class="col-lg-4 col-md-4">
          <img class="img-thumbnail shadow" v-bind:src="usuario.avatar_url" width="200">
        </div>
        <div class="col-lg-8 col-md-8">
          <p class="display-4">{{usuario.name}}</p>
          <p>{{usuario.bio}}</p>
          <b><font-awesome-icon icon="user" /></b>
          {{usuario.login}}
          <br>
          <b><font-awesome-icon icon="at" /></b>
           <a v-bind:href="'mailto:'+usuario.email">{{usuario.email}}</a>
        
          <br>
          <b><font-awesome-icon icon="envelope" /></b>
          <a v-bind:href="usuario.blog">{{usuario.blog}}</a>
          <br>
          <b>Criado em:</b>
          <span>{{usuario.created_at | moment("D/MM/YYYY") }}</span>

          <br>
          <b>Ultima modificação :</b>
          {{usuario.updated_at| moment("D/MM/YYYY") }}
          <br>
        </div>
         <div class="row mt-4">
        <div class="col-lg-12 col-md-12">
          <a href="#" class="btn btn-outline-purple" v-on:click="buscarRepo(busca)">
            Repositorios
            <span class="badge badge-purple">{{usuario.public_repos}}</span>
          </a>
        </div>
      </div>
      </div>
     
    </div>
    <div class="row mt-4">
      <div class="col-lg-12 col-md-12">
        <div class="alert alert-danger" role="alert">Usuário não encontrado</div>
      </div>
    </div>

    <hr>
    <div v-if="repositorios!=''">
      <h2>Repositórios</h2>
     
       
      <div class="row">

        <div class="col-lg-4" v-for="indice in repositorios">

          <a v-bind:href="indice.html_url" target="_blank">
          <div class="card card-repo p-3 m-3">
          <h3 class="h5">{{indice.name}}</h3>
          <small>{{indice.description}}</small>
          </div>
          </a>
  
        </div>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "buscador",
  data() {
    return {
      busca: "",
      repos_url: "",
      usuarios: [],
      repositorios: []
    };
  },
  methods: {
    buscar: function(busca) {
      this.$http
       // .get("https://api.github.com/users/" + busca)
        .get("https://api.github.com/search/users?q="+busca)
        .then(res => res.json())
        .then(
          usuarios => (this.usuarios = usuarios),
          err => console.log(err),
          (this.usuarios[0] = "Não encontrado")
        );
    },
    buscarRepo: function(busca) {
      this.$http
        .get("https://api.github.com/users/" + busca + "/repos")
        .then(res => res.json())
        .then(
          repositorios => (this.repositorios = repositorios),
          err => console.log(err)
        );
    }
  }
};
</script>
<style>
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
input[type=search]:focus{
    box-shadow: 0 0 0 0.2rem rgba(152, 23, 216, 0.274);
    border-color: blueviolet;
    background-color:rgb(233, 195, 252)!important;
}
input[type=search]{
    background-color:rgb(233, 195, 252)!important;
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
.card-repo{height: 250px;}
</style>