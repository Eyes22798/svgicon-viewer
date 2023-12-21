<template>
  <div class="page-section">
    <div class="icon-list">
      <div class="icon-item" v-for="v in list" :key="v.name">
        <div class="icon" v-html="v.content" />
        <p class="icon-name">
          {{ v.name }}
          <br />
        </p>

        <button class="btn" @click="handleCopy(v.name, v)">{{ v.copyTxt || 'Copy' }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { copyText } from 'vue3-clipboard'
import { watch } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  icons: { type: Array as PropType<Array<Files>>, default: [] }
})

let list = ref(props.icons)
watch(
  () => props.icons,
  async () => {
    const data = await optimizeSvg(props.icons)

    list.value = data
  },
  {
    immediate: true,
    deep: true
  }
)

const handleCopy = (name: string, v: Record<string, string>) => {
  copyText(name, undefined, () => {
    v['copyTxt'] = 'Copied'
    setTimeout(() => {
      v['copyTxt'] = 'Copy'
    }, 1000)
  })
}
</script>

<style lang="scss">
.icon-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-auto-rows: 120px;
  overflow: hidden;
  margin-top: 10px;
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
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  border-radius: 4px;
  padding-top: 8px;
  &:hover {
    box-shadow: 0 4px 16px rgb(0 0 0 / 10%);
  }
}

.icon-item .icon {
  display: flex;

  > * {
    line-height: 1;
  }

  svg {
    display: inline-block;
    width: 32px;
    height: 32px;
    fill: currentColor;
  }

  &::before {
    display: none; // dont display old icon.
  }

  &[tabindex] {
    cursor: pointer;
  }
}
.icon-item p {
  margin: 0;
  margin-top: 4px;
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

svg {
  display: inline-block;
  width: 32px;
  height: 32px;
  fill: currentColor;
}

button.btn {
  margin-top: 4px;
  border: none;
  border-radius: 12px;
  text-align: center;
  color: #525252;
  height: 24px;
  overflow: hidden;
  position: relative;
  font-size: 12px;
  width: 50px;
  background: #fff;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
  transition: all 0.1s ease-in-out;
}

button.btn:hover {
  transform: translate(0, -1px);
  box-shadow: 0px 8px 25px 0px rgba(0, 0, 0, 0.2);
}

</style>
