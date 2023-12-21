<script setup>
const emit = defineEmits()
const props = defineProps({
  placeholder: { type: String, default: '' },
  modelValue: { type: String, default: '' }
})
</script>

<template>
  <div class="vs-input-parent vs-input-parent--state-null vs-component--dark vs-component--is-color" :placeholder="placeholder">
    <div class="vs-input-content vs-input-content--has-color">
      <input placeholder="" id="vs-input--8" class="vs-input" autocomplete="off" @input="emit('update:modelValue', $event.target.value)" :value="modelValue">
      <label v-if="!modelValue" for="vs-input--8" class="vs-input__label">{{ placeholder }}</label>
      <div class="vs-input__affects">
        <div class="vs-input__affects__1"></div>
        <div class="vs-input__affects__2"></div>
        <div class="vs-input__affects__3"></div>
        <div class="vs-input__affects__4"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
[class*=vs-] {
  box-sizing: border-box;
  outline: none;
  list-style: none;
}

input, textarea, button, select, a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.vs-input-parent {
  box-sizing: border-box;
  outline: none;
  list-style: none;

  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-item-align: center;
  align-self: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
}

.vs-input-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  position: relative;
  border-radius: 12px;
}

.vs-input {
  border: 2px solid transparent;
  background: rgba(244, 247, 248, 1);
  color: rgba(44, 62, 80, 1);
  padding: 7px 13px;
  border-radius: inherit;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
  padding-left: 10px;
  width: 100%;
  height: 33.5px;
}

.vs-input__label {
  position: absolute;
  left: 13px;
  top: 1px;
  font-size: 0.8rem;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
  cursor: text;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  opacity: 0.4;
}

.vs-input-content--has-color .vs-input:focus {
  border-bottom: 2px solid rgba(30,30,30, 1);
}

.vs-input:focus ~ .vs-input__label:not(.vs-input__label--placeholder):not(.vs-input__label--label) {
  opacity: 0;
  left: 20px;
}

.vs-input-content--has-color .vs-input:focus ~ .vs-input__label {
  color: rgba(30,30,30, 1);
}

.vs-input:focus {
  background: rgba(240, 243, 244, 1);
  padding-left: 15px;
}
</style>