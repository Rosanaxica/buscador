<template>
  <div id="app" >
    <header>
    <nav class="navbar navbar-dark bg-secondary ">
  <a class="navbar-brand" href="#">
    <span class="logo btn text-white">
    <font-awesome-icon :icon="['fab', 'github-alt']" /></span>
   </a>
</nav>
</header>

<meu-buscador ></meu-buscador>

</div>
</template>

<script> 
import Buscador from '../shared/buscador/Buscador.vue';


export default {

   
  components: {
    'meu-buscador': Buscador,
    
  },
  data () {
    return {
      
    }

}
}
</script>

<style>
.logo{ font-size: 30px; margin: 0;}
.logo:hover{transform: scale(2.5); }
</style>
