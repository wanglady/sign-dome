<template>
  <div class="insured-personal">
    <div class="insured-con">
      <div>请使用二维码</div>
      <img @click="showfile" :src="downloadUrl" alt="二维码" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'InsuredPersonal',
  components: {},
  data() {
    return {
      downloadUrl: require('@/assets/img/mockCode.png'),
    }
  },
  methods: {
    showfile() {
      this.$router.push({
        path: 'insuredPersonal/downloadProve',
      })
    },
  },
}
</script>

<style lang="less" scoped>
.insured-personal {
  width: 100%;
  min-height: calc(100vh - 237px);
  .insured-con {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div {
      font-size: 16px;
      color: #333333;
      margin: 30px;
    }
    img {
      width: 222px;
      height: 222px;
    }
  }
}
</style>
