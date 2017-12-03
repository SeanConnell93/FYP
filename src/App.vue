<template>
  <div id="app"></div>
</template>

<script>

import * as main from './assets/js/main.js';
import {Player} from './assets/js/playerclass.js';


export default {
  name: 'app',

  data () {
    return {
      
    }
  },


  mounted(){

    let player;

    main.start( function() {

      player = new Player('./src/assets/models/draugr2.json', main);

    });

    var GameLoop = function(){

      // run updates in here
      player.update();

      main.renderer.render(main.scene, main.camera); 
      requestAnimationFrame(GameLoop);

    }

    GameLoop();

    


  }



}
</script>

<style lang="scss">


body {
  overflow: hidden;
}

canvas {
  min-height: 100%;
  min-width: 100%;
}


</style>
