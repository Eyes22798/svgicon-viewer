<template>
  <div id="app">
    <aside>
      <left :allIcons="allIcons" @left-change="handleLeftChange" />
    </aside>

    <main>
      <h2>SVG ICON LIST VIEW</h2>
      <div class="header-search">
        <nuxt-input v-model="query" placeholder="搜索" />
      </div>
      <view-list :icons="icons" />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRaw, computed } from 'vue'
const query = ref('')
const iconGroups = ref<Array<Files>>([])

const { data } = await useFetch('/api/getIcon')
const allIcons = [] as Array<Files>

;(data.value as unknown as Array<Array<Files>>).forEach((groups: Array<Files>) => {
  if (groups instanceof Array) {
    groups.forEach((icon) => {
      allIcons.push(toRaw(icon))
    })
  } else {
    allIcons.push(toRaw(groups))
  }
})
const icons = computed(() => {
  if (query.value) {
    return allIcons.filter((v) => {
      return v.name.includes(query.value)
    })
  }

  if (iconGroups.value.length > 0) {
    return iconGroups.value
  }

  return allIcons
})

const handleLeftChange = (value: string, arr: Array<string>) => {
  if (value === 'home') {
    iconGroups.value = allIcons
  } else {
    const filterIcons = [] as unknown as Array<Files | undefined>
    arr.forEach((item) => {
      filterIcons.push(allIcons.find((icon) => icon.name === item))
    })
    iconGroups.value = filterIcons as unknown as Array<Files>
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 20px;
  background-color: #fdfdfd;
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  min-width: 0;
}

aside {
  width: 260px;
  position: relative;
}

main {
  flex: 1;
  .header-search {
    width: 100%;
    margin-bottom: 24px;
    input {
      width: 100%;
    }
  }
}

h2 {
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

.list-inline {
  width: 80%;
  background: #fff;
  padding: 15px 20px;
  box-shadow: 0 10px 75px -27px rgb(0 0 0 / 20%);
  display: inline-block;
  border-radius: 0.4rem;
  font-weight: 500;
}

.list-inline-item {
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  margin: 7px;
  border: 1px solid #eee;
  background: transparent;
  text-transform: capitalize;
  border-radius: 5rem !important;
  white-space: nowrap;
  padding: 0.3rem 0.6rem 0.3rem 1rem !important;
  span {
    border-radius: 30px;
    height: 1.4rem;
    line-height: 1.5rem;
    padding: 0 7px;
    display: inline-block;
    font-size: 0.8rem;
    margin-left: 5px;
    pointer-events: none;
    background-color: #f0f0f0;
    transition: 0.1s;
    font-weight: 500;
  }
}

.list-inline-item:not(:last-child) {
  margin-right: 0.5rem;
}

.icon-task {
  color: skyblue;
}
</style>
