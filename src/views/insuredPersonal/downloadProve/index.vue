<template>
  <div class="download-prove">
    {{ showTitle }}
  </div>
</template>

<script>
import mockInfo from '@/assets/userInfo'
mockInfo.file.fileKey = window.config.fileKey
mockInfo.pos.posX = window.config.posX
mockInfo.pos.posY = window.config.posY
mockInfo.signer.accountId = window.config.accountId
mockInfo.signer.sealId = window.config.sealId
mockInfo.signer.departmentId = window.config.departmentId

export default {
  name: 'DownloadProve',
  components: {},
  data() {
    return {
      showTitle: '123',
    }
  },
  computed: {},
  mounted() {
    this.createCode()
  },
  beforeDestroy() {},
  methods: {
    createCode() {
      this.showTitle = 'new123'
    },
  },
}
</script>

<style lang="less" scoped>
.download-prove {
  width: 100%;
}
</style>
