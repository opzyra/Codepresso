<template>
  <div class="container">
    <atom-spinner
          :animation-duration="1000"
          :size="60"
          :color="'#ffffff'"
     />
  </div>
</template>

<script>
import { AtomSpinner } from 'epic-spinners'
export default {
  components: {
    AtomSpinner
  }
}
</script>

<style scoped>
.fullscreenLoader {
  max-width: 100%;
  max-height: 100%;
  bottom: 0;
  left: 0;
  margin: auto;
  overflow: auto;
  position: fixed;
  right: 0;
  top: 0;
}
.fullscreenDiv {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
.container {
    min-height: 100vh;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background: #363842;
    background: -webkit-linear-gradient(-135deg, #363842, #4158d0);
    background: -o-linear-gradient(-135deg, #363842, #4158d0);
    background: -moz-linear-gradient(-135deg, #363842, #4158d0);
    background: linear-gradient(-135deg, #363842, #4158d0);
}
</style>
