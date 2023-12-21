<template>
  <div>
    <sidebar :absolute="true" v-model="active" :open="true">
      <sidebar-item id="home"> 全部（{{ allIcons.length }}） </sidebar-item>
      <sidebar-item v-for="(key, index) in Object.keys(groups)" :key="index" :id="key">{{ key }} （{{ groups[key].length }}）</sidebar-item>
    </sidebar>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  allIcons: { type: Array as PropType<Array<Files>>, default: [] }
})
const emit = defineEmits(['left-change'])

const groups = computed(() => {
  const groupByDirectory = (data: Array<Record<string, string>>) => {
    const result: Record<string, Array<any>> = {};
    for (let i = 0; i < data.length; i++) {
      const path = data[i].fullPath;
      const parts = path.split("/");
      const directory = parts[parts.length - 2];
      const icon = data[i].name;
      if (result[directory]) {
        result[directory].push(icon);
      } else {
        result[directory] = [icon];
      }
    }
    return result;
  };

  return groupByDirectory(props.allIcons);
})

const active = ref('home')
watch(() => active.value, () => {
  emit('left-change', active.value, groups.value[active.value])
})

</script>

<style scoped>

</style>
