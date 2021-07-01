<template>
  <div class="home">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/header/index'
import Footer from '@/components/footer/index'

export default {
  name: 'Home',
  components: {
    Header,
    Footer: Footer,
  },
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
