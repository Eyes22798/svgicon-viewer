<template>
  <div class="page-section">
    <div class="icon-list">
      <div class="icon-item" v-for="v in icons" :key="v.name">
        <div class="icon">
          <svg-icon :name="v.name"></svg-icon>
        </div>
        <p class="icon-name">
          {{ v.name }}
          <br />
        </p>

        <vs-button class="btn" :data-clipboard-text="v.name" shadow>
          Copy
        </vs-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ClipboardJS from "clipboard";

@Component
export default class HelloWorld extends Vue {
  @Prop() icons!: Array<Record<string, string>>;
  $vs: any = null

  mounted() {
    const clipboard = new ClipboardJS(".btn");

    clipboard.on("success",  (e) => {
      this.$vs.notification({
        title: '复制成功',
        text: `当前复制的icon名称为 ${e.text}`,
        position: 'top-right'
      })
      e.clearSelection();
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.icon-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-auto-rows: 120px;
  overflow: hidden;
  margin-top: 10px;
  border-width: 1px 0 0 1px;
  gap: 8px;
  padding: 16px;
}

* {
  outline: none;
}

.icon-item {
  display: flex;
  background: #fff;
  color: #525252;
  align-items: center;
  flex-wrap: wrap;
  border-width: 0 1px 1px 0;
  flex-direction: column;
  border-radius: 4px;
  padding-top: 16px;
  &:hover {
    box-shadow: 0 4px 16px rgb(0 0 0 / 10%);
  }
}

.icon-item .icon {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  max-width: 300px;
}

.icon-item .svg-icon {
  width: 32px;
  height: 32px;
}

.icon-item p {
  margin: 0;
  margin-top: 10px;
  color: #262626;
  font-size: 14px;
  text-align: center;
}

.icon-name {
  line-height: 1.5;
}

.icon-name span {
  color: #8c8c8c;
}
</style>
