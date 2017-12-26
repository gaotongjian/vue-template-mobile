<template>
    <mt-tabbar v-model="tab">
      <mt-tab-item id="home" >
        首页
      </mt-tab-item>
      <mt-tab-item id="stat">
        统计
      </mt-tab-item>
      <mt-tab-item id="account">
        账户
      </mt-tab-item>
    </mt-tabbar>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'tab',
  computed: {
    tab: {
      get () {
        return this.$store.getters.tab
      },
      set (val) {
        if (this.tabPath[val]) {
          this.$router.replace(this.tabPath[val])
        } else {
          this.$router.replace({name: val})
        }
        this.changeTab(val)
      }
    },
    tabPath () {
      return this.$store.getters.tabPath
    }
  },
  watch: {
    '$route' (to) {
      this.changeTabPath({ [this.tab]: to.path })
    }
  },
  methods: {
    ...mapMutations(['changeTab', 'changeTabPath'])
  }
}
</script>

<style>

</style>
