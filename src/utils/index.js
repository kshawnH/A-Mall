export function processURL(imgUrl) {
  // 如果你是以https开头的，直接采用即可
  // 否则则增加访问地址
  if (!/^https?:\/\//.test(imgUrl)) {
    return `http://backend-api-01.newbee.ltd${imgUrl}`
  }
  return imgUrl
}

export function addPrefix(money) {
  // 如果你是以https开头的，直接采用即可
  // 否则则增加访问地址
  return '¥' + money
}
