<template>
  <div class="footer">
    <span>
      主办单位
    </span>
    <span>
      技术支持
    </span>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.footer {
  // position: fixed;
  // bottom: 0;
  position: relative;
  width: 100%;
  min-width: 600px;
  line-height: 55px;
  background-color: #30343e;
  color: #9d9d9d;
  font-size: 16px;
  span {
    margin: 0 40px;
    &:first-child {
      margin-left: 100px;
    }
  }
}
</style>
