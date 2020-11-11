var dayjs = require("dayjs")
var duration = require('dayjs/plugin/duration')
var utc = require('dayjs/plugin/utc')

dayjs.extend(duration)
dayjs.extend(utc)

const oneMinuteAgo = dayjs().subtract(1, 'minute')
const dur = dayjs.duration(dayjs().diff(oneMinuteAgo))

dayjs.utc(dur.asMilliseconds()).format('HH:mm:ss') // "00:01:00"