import { Vue } from 'vue/types/vue'
export function desensitization(data: any) {
  let str = ''
  if (!data) return data
  if (/^([0-9]{14}|[0-9]{17})[0-9,X,x]{1}$/.test(data) || data.length === 18) {
    const len = data.length - 1
    let star = ''
    for (let i = 1; i < len; i++) {
      star += '*'
    }
    str = data.substring(0, 1) + star + data.substring(data.length - 1)
    console.log(str)
  } else if (/^1[0-9]{10}$/.test(data) || data.length === 11) {
    str = `${data.substr(0, 3)}****${data.substr(-4)}`
    console.log(str)
  } else if (/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(data)) {
    // 邮箱号码  前二 后以 @ 分割
    str = `${data.substr(0, 2)}****${data.substr(data.indexOf('@'))}`
  } else if (/^\d{16}|\d{19}$/.test(data)) {
    // 银行卡号  后四位
    str = `****${data.substr(-4)}`
  } else {
    // 姓名

    // str = data.length"**"+data.substr(data.length-1,1)

    const len = data.length - 1
    let star = ''
    for (let i = 0; i < len; i++) {
      star += '*'
    }
    str = data.substring(0, 0) + star + data.substring(data.length - 1)
  }

  return str
}
// 节流函数
export const delay = (() => {
  let timer = 0

  return (callback: () => {}, ms: number) => {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()

export function mobileClient() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

export function isWeixin() {
  return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
}

export function isDingtalk() {
  return (
    navigator.userAgent.toLowerCase().indexOf('dingtalk') !== -1 ||
    navigator.userAgent.toLowerCase().indexOf('tencent1104118379') !== -1
  )
}

export function isAlipay() {
  return /AlipayClient/.test(window.navigator.userAgent)
}

export function downloadFile(url: string, name: string) {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.target = '_blank'
  // link.setAttribute('download', name) // 360 9.1版本上“发票下载”会导致浏览器cookie变化登录失效
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export function formatTime(time: number) {
  const days = time / 1000 / 60 / 60 / 24
  const daysRound = Math.floor(days)
  const daysString =
    daysRound < 10
      ? daysRound === 0
        ? ''
        : `0${daysRound}天`
      : `${daysRound}天`
  const hours = time / 1000 / 60 / 60 - 24 * daysRound
  const hoursRound = Math.floor(hours)
  const hoursString =
    hoursRound < 10
      ? hoursRound === 0
        ? ''
        : `0${hoursRound}:`
      : `${hoursRound}:`
  const minutes = time / 1000 / 60 - 24 * 60 * daysRound - 60 * hoursRound
  const minutesRound = Math.floor(minutes)
  const minutesString =
    minutesRound < 10 ? `0${minutesRound}:` : `${minutesRound}:`
  const seconds =
    time / 1000 -
    24 * 60 * 60 * daysRound -
    60 * 60 * hoursRound -
    60 * minutesRound
  const secondsRound = Math.floor(seconds)
  const secondsString = secondsRound < 10 ? `0${secondsRound}` : secondsRound

  return daysString + hoursString + minutesString + secondsString
}

export function callSuperMethod(vm: Vue, functionName: string, args: any[]) {
  ;(vm.constructor as any).super.options.methods[functionName].apply(vm, args)
}
/**
 * 轮询工具
 * @param requestFn 异步请求方法，返回一个Promise
 * @param interval 轮询间隔
 * @param judgeFn 判断是否继续轮询方法，返回boolean, true则停止轮询
 * @param successHandler 轮询完成的回调
 * @param errorHandler 轮询失败的回调
 * @returns stop 停止轮询的方法
 */
export function pollRequest(
  requestFn: () => Promise<any>,
  interval: number,
  judgeFn: (obj: any) => boolean,
  successHandler?: Function,
  errorHandler?: Function
) {
  const intervalId: number = setInterval(() => {
    requestFn()
      .then(res => {
        const stopPoll: boolean = judgeFn(res)
        if (stopPoll) {
          stop()
          successHandler && successHandler(res)
        }
      })
      .catch(e => {
        stop()
        errorHandler && errorHandler()
      })
  }, interval)
  const stop = () => window.clearInterval(intervalId)

  return stop
}

/**
 * #### Description
 * 查询条件时间范围格式化
 *
 * Formats date range query
 * @param dateRange
 * @returns date range query
 */
export function formatDateRangeQuery(dateRange: string[]): string[] {
  if (Array.isArray(dateRange) && dateRange.length === 2) {
    let [start, end] = dateRange

    const startDate = new Date(start)
    const endDate = new Date(end)

    startDate.setDate(startDate.getDate() + 1)
    endDate.setDate(endDate.getDate() + 1)

    start = startDate.toISOString().replace(/T.+/, 'T00:00:00')
    end = endDate.toISOString().replace(/T.+/, 'T23:59:59')

    return [start, end]
  }

  return []
}
