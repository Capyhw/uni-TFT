import {
	_http
} from "@/utils/request.js"
const options = {
	chessList: [],
	jobList: [],
	raceList: [],
	hexList: {},
	equipList: [],
}
_http('/img/tft/js/chess.js', 'GET').then(res => {
	options.chessList = res.data
})
_http('/img/tft/js/race.js', 'GET').then(res => {
	options.raceList = res.data
})
_http('/img/tft/js/job.js', 'GET').then(res => {
	options.jobList = res.data
})
_http('/img/tft/js/hex.js', 'GET').then(res => {
	options.hexList = res
})
_http('/img/tft/js/equip.js', 'GET').then(res => {
	options.equipList = res.data
})

export {
	options
}
