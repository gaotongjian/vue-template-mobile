<template>
  <h2>home--2<button @click="$router.go(-1)">返回</button></h2>
</template>

<script>
export default {
  name: 'home--2',
  mounted () {
    console.log('home--2-mounted')
  }
}
</script>

<style>

</style>
