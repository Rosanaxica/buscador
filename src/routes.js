import Home from './components/home/Home.vue';
import Buscador from './components/shared/buscador/Buscador.vue'
import Repositorios from './components/shared/repositorios/Repositorios.vue'


export const routes=[
    { path: '', component: Home },
    { path: '/busca', component: Buscador },
    { path: '/repositorio', component: Repositorios }
];