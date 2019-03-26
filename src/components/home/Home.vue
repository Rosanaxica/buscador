<template>
  <div id="app" class="container">

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

</style>
