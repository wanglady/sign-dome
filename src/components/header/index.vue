<template>
  <div class="header">
    <span>
      <img src="@/assets/logo.png" width="auto" height="40px" />
    </span>
    <span>
      <span class="header-title">测 试 市 </span>
      <span class="header-describe">Ceshi City</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  img {
    vertical-align: left;
    margin: 0 10px 0 100px;
    cursor: pointer;
  }
  span {
    .header-title {
      font-size: 16px;
      font-family: STSongti-SC-Black, STSongti-SC;
      font-weight: 900;
      color: #111111;
    }
    .header-describe {
      font-size: 7px;
      font-family: ArialMT;
      color: #111111;
    }
    &:last-child {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
