<template>
  <div class="hidden">
    <vs-sidebar absolute v-model="active" open>
      <vs-sidebar-item id="home"> 全部（{{ allIcons.length }}） </vs-sidebar-item>
      <vs-sidebar-item v-for="(key, index) in Object.keys(groups)" :key="index" :id="key">{{ key }} （{{ groups[key].length }}）</vs-sidebar-item>
    </vs-sidebar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class App extends Vue {
  @Prop() icons!: Array<Record<string, string>>;
  @Prop() allIcons!: Array<Record<string, string>>;
  active = "home";

  get groups() {
    const groupByDirectory = (data: Array<Record<string, string>>) => {
      const result: Record<string, Array<any>> = {};
      for (let i = 0; i < data.length; i++) {
        const path = data[i].path;
        const parts = path.split("/");
        const directory = parts[parts.length - 2];
        const icon = data[i];
        if (result[directory]) {
          result[directory].push(icon);
        } else {
          result[directory] = [icon];
        }
      }
      return result;
    };

    return groupByDirectory(this.allIcons);
  }

  @Watch('active')
  onDataChanged(value: string) {
    this.$emit('left-change', value, this.groups[value])
  }
}
</script>

<style lang="scss">
</style>
