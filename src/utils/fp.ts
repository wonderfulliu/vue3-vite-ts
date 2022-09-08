// 浏览器唯一识别标识
import fpPromise from '@fingerprintjs/fingerprintjs'

const uidPromise = fpPromise.load().then((fp) => fp.get())

export default (await uidPromise).visitorId
