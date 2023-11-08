<template>
  <div id="app">
    <aside>
      <Left :icons="icons" :allIcons="allIcons" @left-change="handleLeftChange" />
    </aside>

    <main>
      <h2>SVG ICON LIST ViEW</h2>
      <div class="header-search">
        <vs-input dark v-model="query" placeholder="搜索" />
      </div>
      <IconList :icons="icons" />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IconList from "./components/icon-list.vue";
import Left from "./components/left.vue";

@Component({
  components: {
    IconList,
    Left,
  },
})
export default class App extends Vue {
  query = ''
  group: Array<any> = []
  iconList: Array<Record<string, string>> = window.__svg_icons__.map((item: string) => {
    const fileName = item.split('/').pop() ?? '' // 获取文件名包括后缀
    const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.'); // 去掉后缀
    return {
      name: fileNameWithoutExtension,
      path: item,
    }
  }) || []
  allIcons: Array<Record<string, string>> = [...this.iconList]
  get icons() {
    console.log()
    if (this.query) {
      return this.allIcons.filter((v) => {
        let name = v.name
        return name.includes(this.query)
      })
    }

    if (this.group.length > 0) {
      return this.group
    }
    return this.iconList
  }
  iconMeta: Array<Record<string, string>> = [];
  active = "home";
  created() {
    if (process.env.NODE_ENV === 'development') {
      console.log(this.iconList)
    }
    this.iconMeta = this.iconList;
  }

  handleLeftChange(value: string, arr: Array<any>) {
    if (value === 'home') {
      this.group = [...this.iconList]
    } else {
      this.group = arr
    }
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
