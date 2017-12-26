<template>
  <div>
    <transition name="router-fade" mode="out-in">
			<keep-alive :include="include">
			    <router-view></router-view>
			</keep-alive>
    </transition>
    <tab></tab>
  </div>

</template>

<script>
// import {mapMutations} from 'vuex'
import Tab from '@/components/Tab'
export default {
  name: 'mian',
  components: {Tab},
  data () {
    return {
      include: []
    }
  },
  watch: {
    '$route' (v) {
      if (v.meta.keepAlive && this.include.indexOf(v.name) === -1) this.include.push(v.name)
    }
  },
  computed: {
    tab () {
      return this.$store.getters.tab
    }
  },
  methods: {
  }
}
</script>

<style>
.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
    opacity: 0;
}
</style>
