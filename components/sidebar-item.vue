<script lang="jsx">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    to: { type: String, default: "" },
    href: { type: String, default: "" },
    target: { type: String, default: "_blank" },
    value: { type: String, default: "" },
    id: { type: String, default: "" },
    arrow: { type: Boolean, default: false },
  },
  setup(props) {
    const isActive = ref(false)

    const handleClick = () => {
      if (props.to) {
        this.$router.push(props.to);
      } else if (props.href) {
        window.open(props.href, props.target);
      }
    };

    return { isActive, handleClick };
  },
  render() {
    const icon = (
      <div class="vs-sidebar__item__icon">
        {this.$slots.icon && this.$slots.icon()}
      </div>
    );

    const textTooltip = (
      <div class="vs-sidebar__item__text-tooltip">
        {this.$slots.default()}
      </div>
    );

    const text = (
      <div class="vs-sidebar__item__text">{this.$slots.default()}</div>
    );

    const arrow = this.$slots.arrow;

    return (
      <button
        class={{
          active: this.$parent?.getValue && this.id === this.$parent?.getValue(),
          hasIcon: !!this.$slots.icon,
          'vs-sidebar__item': true
        }}
        onClick={() => {
          if (this.id) {
            this.$parent.handleClickItem(this.id);
          }
          this.handleClick();
        }}
      >
        {this.$slots.icon && icon}
        {text}
        {textTooltip}
        {this.$slots.arrow || this.arrow && arrow}
      </button>
    );
  },
});
</script>

<style lang="sass" scoped>
.vs-sidebar__item
  width: 100%
  padding: 14px 16px
  padding-top: 15px
  text-align: left
  background: transparent
  font-size: 1rem
  font-weight: bold
  opacity: .7
  transition: all .25s ease
  display: flex
  align-items: center
  justify-content: flex-start
  position: relative
  color: rgb(44, 62, 80)
  border: 0px
  &.hasIcon
    padding: 0px
    &.active
      padding-left: 8px
    &:hover
      padding-left: 8px
      opacity: 1
  &:after
    content: ''
    position: absolute
    left: -4px
    top: 0px
    width: 10px
    height: 100%
    background: rgba(25, 91, 255, 1)
    border-radius: 0px 20px 20px 0px
    transform: translate(-6px)
    transition: all .25s ease
    z-index: 60
  &.active:not(.hasIcon)
    padding-left: 25px
  &.active
    opacity: 1
    color: rgba(25, 91, 255, 1)
    &:after
      transform: translate(0px)
  &__icon
    min-width: 50px
    height: 47px
    display: flex
    align-items: center
    justify-content: center
    font-size: 1.2rem
    z-index: 50
    background: rgb(255, 255, 255)
  &:hover:not(.hasIcon)
    opacity: 1
    padding-left: 25px
  &__text
    white-space: nowrap
    text-overflow: ellipsis
    overflow: hidden
    z-index: 10
    transition: all .25s ease
    font-size: .9rem
  &__arrow
    width: 7px
    height: 7px
    position: relative
    justify-self: flex-end
    margin-left: auto
    margin-right: 15px
    transition: all .25s ease
    transform: rotate(-135deg) !important
    z-index: 80
    .vs-icon-arrow
      &:before
        width: 2px
      &:after
        height: 2px
  &__text-tooltip
    position: fixed
    left: 50px
    opacity: 0
    pointer-events: none
    transition: all .25s ease
    font-size: .85rem
    white-space: nowrap
</style>