<template>
  <div class="nav">
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    title: String,
  },
}
</script>

<style lang="less" scoped>
.nav {
  padding-left: 100px;
  min-width: 600px;
  height: 122px;
  line-height: 122px;
  background: #3564cd;
  font-size: 32px;
  font-weight: 600;
  color: #ffffff;
}
</style>
