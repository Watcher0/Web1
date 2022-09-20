let yinput = $('#yinput')
let rselect = $('#rselect')
let xselect = $('#xselect')
let ywarn = $('#inputWarn')
let rwarn = $('#rCheckWarn')
let xwarn = $('#xCheckWarn')

function getY() {
	let val = yinput.val()
	if (!val && val !== 0){return;}
	val = String(val)
	if (val.length > 5) { return; }
	val = val.replace(',', '.')
	try {
		val = Number(val)
	}
	catch (_) {
		return;
	}

	if (val < -3 | val > 5) { return; }


	return val
}

function getcheckbox(elem) {
	let all = elem.find('input')
	let r;
	for (v of all) {
		if (v.checked) {
			if (r) { return; }
			r = v.value
		}
	}
	return r;
}

function setErrorStatus(elem, val) {
	elem = $(elem)
	if (!val && val !== 0) {
		elem.addClass('error')
	}
	else {
		elem.removeClass('error')
	}
}


let win;

document.getElementById("Spike").onclick = function() {
    var audio = document.getElementById("Theme");
    if (audio.paused) audio.play();
    else audio.pause();
 };

document.getElementById("LocalClear").onclick =function(){
	localStorage.clear();
}

$('.js-form').on('submit', function (event) {
	event.preventDefault();


	let y = getY()
	setErrorStatus(yinput, y)
	if (!yinput.hasClass('error')) {
		ywarn.addClass('invisible')}
	else{
		ywarn.removeClass('invisible')
	}


	let r = getcheckbox(rselect)
	setErrorStatus(rselect, r)
	if (!rselect.hasClass('error')) {
		rwarn.addClass('invisible')}
	else{
		rwarn.removeClass('invisible')
	}

	let x = getcheckbox(xselect)
	setErrorStatus(xselect, x)
	if (!xselect.hasClass('error')) {
		xwarn.addClass('invisible')}
	else{
		xwarn.removeClass('invisible')
	}

	if((!y && y !== 0) | !r | (!x && x !== 0)){return;}

	$.ajax({
		url: 'main.php',
		method: 'GET',
		data: {
			'y': y,
			'r': r,
			'x': x
		},
		beforeSend: function () {
			$('.button').attr('disabled', 'disabled');
		},
		complete: function (req) {
			$('.button').attr('disabled', false);
			let res = req.responseText
			try{
				res = JSON.parse(res)
			}
			catch(_){
				alert('PHP ERROR: ' + res)
				return;
			}

			if (res['status'] != 'ok') { alert(res['reason']); return; }

			let data = res['data']
			data['date'] = +new Date()
			data['execTime'] = res['execTime']

			let r = localStorage['r']

			try{
				r = JSON.parse(r)
			}
			catch(_){
				r = []
			}
			r.push(data)

			localStorage['r'] = JSON.stringify(r)
			if(win){win.close()}
			win = window.open('/window', '_blank', 'location=yes,height=800,width=400,scrollbars=yes,status=yes')

		}
	});


	return false

})