<template>
  <div id="app">
    <div>
      <h2>SVG ICON LIST ViEW</h2><svg-icon name="lock" className="lock" />

      <IconList :icons="icons" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IconList from './components/icon-list.vue'
import iconList from './meta'

@Component({
  components: {
    IconList
  },
})
export default class App extends Vue {
  icons: Array<string> = []
  created() {
    this.icons = iconList
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 20px;
  background-color: #f4f4f6;
  height: calc(100vh - 40px - 20px);
}

.icon-task {
  color: skyblue;
}
</style>
