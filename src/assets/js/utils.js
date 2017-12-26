const toString = function (obj, str) {
  const string = Object.prototype.toString.apply(obj)
  if (!str) return string
  return string === `[object ${str}]`
}
export function isObject (o) {
  return toString(o, 'Object')
}
export function isFunction (o) {
  return toString(o, 'Function')
}
export function isRegExp (o) {
  return toString(o, 'RegExp')
}

export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
  let target
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop
  } else if (element.currentStyle) {
    target = element.currentStyle[attr]
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr]
  }
  // 在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode === 'float' ? parseFloat(target) : parseInt(target)
}

/**
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
  let windowHeight = window.screen.height
  let height
  let setTop
  let paddingBottom
  let marginBottom
  let requestFram
  let oldScrollTop

  document.body.addEventListener('scroll', () => {
    loadMore()
  }, false)
  // 运动开始时获取元素 高度 和 offseTop, pading, margin
  element.addEventListener('touchstart', () => {
    height = element.offsetHeight
    setTop = element.offsetTop
    paddingBottom = getStyle(element, 'paddingBottom')
    marginBottom = getStyle(element, 'marginBottom')
  }, { passive: true })

  // 运动过程中保持监听 scrollTop 的值判断是否到达底部
  element.addEventListener('touchmove', () => {
    loadMore()
  }, { passive: true })

  // 运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
  element.addEventListener('touchend', () => {
    oldScrollTop = document.body.scrollTop
    moveEnd()
  }, { passive: true })

  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (document.body.scrollTop !== oldScrollTop) {
        oldScrollTop = document.body.scrollTop
        loadMore()
        moveEnd()
      } else {
        cancelAnimationFrame(requestFram)
        // 为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
        height = element.offsetHeight
        loadMore()
      }
    })
  }

  const loadMore = () => {
    if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
      callback()
    }
  }
}

export function format (target, fmt) {
  // window.Date.prototype.Format = function (fmt) { // 格式化时间
  let o = {
    'M+': target.getMonth() + 1,
    'd+': target.getDate(),
    'h+': target.getHours(),
    'm+': target.getMinutes(),
    's+': target.getSeconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (target.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
export function toBoolean (target, filter) {
  if (!isObject(target)) return
  let newObj = Object.assign({}, target)
  if (!filter) {
    for (let k in newObj) {
      if (typeof newObj[k] === 'number' && (newObj[k] === 1 || newObj[k] === 0)) newObj[k] = Boolean(newObj[k])
    }
  } else {
    let keys = Object.keys(target)
    let filterKeys = []
    if (isRegExp(filter)) {
      filterKeys = keys.filter(v => filter.test(v))
    } else if (Array.isArray(filter)) {
      filterKeys = filter
    }
    for (let v of filterKeys) {
      newObj[v] = Boolean(newObj[v])
    }
  }
  return newObj
}

export function to0And1 (target) {
  let obj = Object.assign({}, target)
  for (let k in obj) {
    if (typeof obj[k] === 'boolean') obj[k] = Number(obj[k])
  }
  return obj
}
/**
 * @description 用于分割数字，默认为3位分割，一般用于格式化金额。
 * @param {Number} source
 * @param {Number} length
 */
export function numberComma (source, length = 3) {
  source = String(source).split('.')
  source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), '$1,')
  return source.join('.')
}
/**
 * 用于按照位数补0
 * @param {Number} source 目标数字
 * @param {Number} length
 */
export function numberPad (source, length = 2) {
  let pre = ''
  const negative = source < 0
  const string = String(Math.abs(source))
  if (string.length < length) {
    pre = (new Array(length - string.length + 1)).join('0')
  }
  return (negative ? '-' : '') + pre + string
}
export function numberRadom (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
