<template>
  <div class="insured">
    <Nav title="个人" />
    <router-view v-on="$listeners"></router-view>
  </div>
</template>

<script>
import Nav from '@/components/nav/index'

export default {
  name: 'DownloadProve',
  components: {
    Nav,
  },
}
</script>

<style scoped></style>
