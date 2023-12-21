<script lang="jsx">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Sidebar',
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  props: {
    modelValue: { type: String, default: '' },
    reduce: { default: false },
    hoverExpand: { default: false },
    open: { default: false },
    notLineActive: { default: false },
    square: { default: false },
    textWhite: { default: false },
    notShadow: { default: false },
    relative: { default: false },
    absolute: { default: false },
    right: { default: false },
    background: { default: 'background' },
  },

  data() {
    return {
      staticWidth: 260,
      forceExpand: false,
      reduceInternal: false,
    }
  },

  watch: {
    open: {
      handler() {
        if (this.open) {
          window.addEventListener('click', this.clickCloseSidebar)
        } else {
          window.removeEventListener('click', this.clickCloseSidebar)
        }
      },
    },
    reduce: {
      handler() {
        this.reduceInternal = this.reduce
        this.$el.style.width = this.reduce ? '50px' : `${this.staticWidth}px`
      },
    },
    reduceInternal: {
      handler() {
        this.$el.style.width = this.reduceInternal ? '50px' : `${this.staticWidth}px`
      },
    },
    background: {
      handler() {
        this.$el.style.backgroundColor = this.background
      },
    },
  },

  mounted() {
    this.staticWidth = this.$el.offsetWidth
    this.reduceInternal = this.reduce

    if (this.background !== 'background') {
      this.$el.style.backgroundColor = this.background
    }

    if (this.textWhite) {
      this.$el.style.color = '#fff'
    }
  },

  methods: {
    getValue() {
      return this.modelValue
    },
    clickCloseSidebar(evt) {
      if (!(evt.target).closest('.vs-sidebar-content')) {
        this.$emit('update:modelValue', false)
      }
    },
    handleClickItem(id) {
      this.$emit('update:modelValue', id)
    },
  },

  render() {
    const logo = this.$slots.logo ? this.$slots.logo() : null
    const header = this.$slots.header ? this.$slots.header() : null
    const footer = this.$slots.footer ? this.$slots.footer() : null
    const sidebar = this.$slots.default ? this.$slots.default() : null
    return (
      <div
        style={this.$attrs.style}
        class={[
          'vs-sidebar',
          'vs-sidebar-content',
          {
            reduce: this.reduceInternal,
            open: this.open,
            notLineActive: this.notLineActive,
            square: this.square,
            notShadow: this.notShadow,
            textWhite: this.textWhite,
            relative: this.relative,
            absolute: this.absolute,
            right: this.right,
          },
        ]}
        on={this.$attrs.on}
      >
        {logo}
        {header}
        {sidebar}
        {footer}
      </div>
    )
  },
})
</script>


<style lang="sass" scoped>
.vs-sidebar-content
  position: fixed
  left: 0px
  top: 0px
  width: calc(100% - 50px)
  max-width: 260px
  height: 100vh
  border-radius: 0px 30px 30px 0px
  color: rgb(44, 62, 80)
  box-shadow: 0px 0px 25px 0px rgba(0,0,0, 0.05)
  display: flex
  align-items: flex-start
  flex-direction: column
  z-index: 21000
  background: #fff
  transition: all .25s ease
  &.right
    left: auto
    right: 0px
    transform: translate(110%)
    &.open
      transform: translate(0)
    &.reduce
      .vs-sidebar__item
        &:hover
          .vs-sidebar__item__text-tooltip
            opacity: 1
            left: auto !important
            right: 60px !important
  &.absolute
    position: absolute !important
    z-index: 9001
    height: 100%
  &.relative
    position: relative !important
    z-index: 9001
    height: 100%
  &.textWhite
    .vs-sidebar__group__content
      &:after
        background: rgba(255,255,255,.4)
    .vs-sidebar__item
      &:after
        background: #fff !important
      &.active
        color: #fff !important
  &.notShadow
    box-shadow: none !important
  &.square
    border-radius: 0px
  &.notLineActive
    .vs-sidebar
      .vs-sidebar__item
        &:after
          display: none
  &.open
    overflow: hidden
    transform: translate(0%)
  &.reduce
    .vs-sidebar
      &__footer
        padding: 10px 0px
      &__header
        .vs-avatar-content
          width: 44px !important
          height: 44px !important
      &__logo
        img
          width: 80%
    .vs-sidebar__item
      padding-left: 16px !important
      min-height: 47px
      &:not(.hasIcon)
        .vs-sidebar__item__text
          font-size: .5rem
      &.hasIcon
        .vs-sidebar__item__text
          transform: translate(-10px)
          margin-left: -50px
      &__arrow
        position: absolute
        left: 36px
        top: 10px
        animation: delayOpacity .6s ease
        width: 5px
        height: 5px
      &:hover
        .vs-sidebar__item__text-tooltip
          opacity: 1
          left: 60px
    .vs-sidebar__item.hasIcon
      padding: 0px !important
      &:after
        left: -6px
  .vs-sidebar__logo
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    padding: 25px 0px
    min-height: 80px
    img
      max-width: 120px
      max-height: 35px
  .vs-sidebar
    overflow-x: hidden
    width: 100%
    flex-grow: 1
    display: flex
    align-items: flex-start
    justify-content: flex-start
    flex-direction: column
    &::-webkit-scrollbar
      width: 0px
    &__header
      display: flex
      align-items: center
      justify-content: center
      width: 100%
      padding: 10px
    &__footer
      display: flex
      align-items: center
      justify-self: flex-start
      width: 100%
      padding: 10px

    // align-self: flex-start
    // justify-self: flex-start

// .vs-sidebar
</style>