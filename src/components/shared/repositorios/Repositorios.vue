<template>
 <div v-if="repositorios!=''">
      <h2>Repositórios</h2>

      <div :for="repositorio in repositorios" >
        {{repositorio.name}}
        
      </div>
   
    </div>
</template>


<script>

export default {

name: 'repositorios',

data(){
    return{
 repositorios:[]
    }
},
methods:{
    
    buscarRepo:function(get){
       console.log('testando os repo:'+get);
           this.$http.get(get)
          .then(res => res.json())
          .then(repositorios => this.repositorios = repositorios, err => console.log(err));
    },

}
     
 }
</script>
<style>

</style>