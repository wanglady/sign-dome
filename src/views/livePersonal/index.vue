<template>
  <div class="live-personal">
    <Nav title="个人" />
    <div class="content-form">
      <el-form ref="form" :model="liveForm" :rules="liveRules" class="es-form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属分局" prop="branch">
              <el-input v-model="liveForm.branch" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="受理单位" prop="acceptance">
              <el-input v-model="liveForm.acceptance" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model.trim="liveForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="certNo">
              <el-input v-model.trim="liveForm.certNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="mobile">
              <el-input v-model.trim="liveForm.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户类型" prop="customerType">
              <el-select
                v-model="liveForm.customerType"
                placeholder="请选择用户类型"
              >
                <el-option label="自然人" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <div>
                <span>承诺书：</span>
                <span v-if="!fildId" class="file-sign" @click="goSignFile()"
                  >前往签署</span
                >
                <span v-else class="file-sign" @click="getSignFile()"
                  >查看文件</span
                >
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="!fildId">
          <el-col :span="24">
            <el-button
              type="primary"
              size="mini"
              :disabled="modifyDisabled"
              @click="goSignFile"
            >
              请完成签署后提交
            </el-button>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-col :span="24">
            <el-button type="primary" size="mini" @click="onSubmitFinish">
              完成提交
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/nav/index'
import { Base64 } from 'js-base64'
import mockInfo from '@/assets/userInfo'
mockInfo.docs[0].docFilekey = window.config.docFileKey
mockInfo.signFiles[0].docFilekey = window.config.docFileKey

export default {
  name: 'LivePersonal',
  components: {
    Nav,
  },
  data() {
    return {
      info: null,
      fildId: null,
      liveForm: {
        branch: '测试市分局',
        acceptance: '测试市分局测试路派出所',
        name: '',
        certNo: '',
        mobile: '',
        customerType: '1',
      },
      liveRules: {
        branch: [
          { required: true, message: '请输入所属分局', trigger: 'blur' },
        ],
        acceptance: [
          { required: true, message: '请输入受理单位', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            validator(rule, value, cb) {
              const reg = /(([a-zA-Z+\\.?\\·?a-zA-Z+]{1,200}$)|([\u4e00-\u9fa5+\\·?\u4e00-\u9fa5+]{1,200}$))/ // 仅支持中英文与阿拉伯数字 支持“·”分割 最大长度不超过200位
              if (!reg.test(value)) {
                return cb(new Error('请输入正确的姓名'))
              }
              cb()
            },
            trigger: 'blur',
          },
        ],
        certNo: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          {
            pattern: /^(([0-9]{14})|([0-9]{17}))([0-9]|X|x)$/,
            message: '身份证格式不正确',
            trigger: 'blur',
          },
        ],
        mobile: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          {
            len: 11,
            message: '手机号格式不正确',
            trigger: 'blur',
          },
          {
            validator(rule, value, cb) {
              if (!Number.isInteger(Number(value))) {
                cb(new Error('请输入数字'))
              } else {
                if (!value.startsWith('1')) {
                  cb(new Error('手机号格式不正确'))
                }
              }
              cb()
            },
            trigger: 'blur',
          },
        ],
        customerType: [
          { required: true, message: '请选择用户类型', trigger: 'change' },
        ],
      },
    }
  },
  watch: {
    '$route.query'(val) {
      this.fildId = val.fildId
      this.showUserInfo()
    },
  },
  computed: {
    modifyDisabled() {
      if (
        this.liveForm.name &&
        this.liveForm.certNo &&
        this.liveForm.mobile &&
        this.fildId
      ) {
        return false
      }
      return true
    },
  },
  mounted() {
    if (this.$route.query.fildId) {
      this.fildId = this.$route.query.fildId
      this.showUserInfo()
    }
  },
  methods: {
    showUserInfo() {
      const useInfo = JSON.parse(
        Base64.decode(sessionStorage.getItem(this.fildId))
      )
      this.liveForm = {
        ...useInfo,
        branch: '测试市分局',
        acceptance: '测试市分局测试路派出所',
        customerType: '1',
      }
    },
    goSignFile() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const liveForm = {
            name: this.liveForm.name,
            certNo: this.liveForm.certNo,
            mobile: this.liveForm.mobile,
          }
          this.info = Base64.encode(JSON.stringify(liveForm))
          sessionStorage.clear()
          sessionStorage.setItem('useInfo', this.info)

          this.$axios({
            url: '/test',
            method: 'POST',
            data: this.liveForm,
          }).then(res => {
            sessionStorage.setItem('signUrl', res.data)
          })
        }
      })
    },
    getSignFile() {
      const signUrl = sessionStorage.getItem('signUrl')
      const useInfo = sessionStorage.getItem('useInfo')
      window.location.href = `${signUrl}&info=${useInfo}`
    },
    onSubmitFinish() {
      window.location.href = 'https://ggfwdemo.esign.cn/PersonalService.html'
    },
  },
}
</script>

<style lang="less" scoped>
.live-personal {
  width: 100%;
  .content-form {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 70px 0 140px 0;
    .es-form {
      width: 600px;
      min-width: 600px;
      .el-form-item,
      .el-select {
        width: 218px;
      }
      .file-sign {
        font-size: 12px;
        font-weight: 500;
        color: #3564cd;
        cursor: pointer;
      }
      .el-row {
        .el-col-12,
        .el-col-24 {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
