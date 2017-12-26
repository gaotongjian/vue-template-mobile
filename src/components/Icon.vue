<template>
  <svg class="icon" aria-hidden="true">
      <use :xlink:href="'#icon-'+ type"></use>
  </svg>
</template>
<script>
// import '../assets/icon/iconfont'

export default {
  name: 'icon',
  props: ['type']
}
</script>

