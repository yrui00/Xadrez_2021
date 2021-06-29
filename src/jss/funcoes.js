
$isAndroid = navigator.userAgent.match(/Android/) != null;
$(window).load(function () {
	/* 
		$(window).resize(function () {
			resize();
		})
		resize(); */

	init();

})

function init() {
	montaTabuleiro();
}
function montaTabuleiro() {
	config.tabuleiro = [];

	$('.tabuleiro').html('<div class="bg"></bg>');
	for (var i = 0; i < Math.pow(config.sizeTabuleiro, 2); i++) {
		var quad = quadradoTabuleiro(i);
		$('.tabuleiro .bg').append(quad.html);
		config.tabuleiro.push(quad);
	}

}

const quadradoTabuleiro = (i) => {
	var x = i % config.sizeTabuleiro;
	var y = parseInt(i / config.sizeTabuleiro);
	
	var html = $('<div class="quadTabuleiro " data-num="'+i+'" \
	style="width: calc( 100% / 8 ); height: calc( 100% / 8 );"\
	\></div>');
	
	
	if ( (parseInt(i / config.sizeTabuleiro) % 2 == 0 && (i%2 == 0)) || 
	(parseInt(i / config.sizeTabuleiro) % 2 == 1 && ((i-1)%2 == 0)) 
	) {
		html.addClass('branco');
	}

	return {
		html: html,
		xQuad: x,
		yQuad: y,
		_id:i,
	};
}

function removerAcentos(str) {
	return str.normalize("NFD").replace(/[^a-zA-Zs]/g, "");
}

function hitTest(obj) {
	var xparent = $('#stage').offset().left;
	var yparent = $('#stage').offset().top;
	var t = (obj.offset().top - yparent) / $scale;
	var l = (obj.offset().left - xparent) / $scale;
	var w = obj.width();
	var h = obj.height();

	return ($xMouse > l && $xMouse < l + w && $yMouse > t && $yMouse < t + h);
}


function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleDivs(divs) {
	var arDivs = [];
	var parent = $(divs).parent();
	$(divs).each(function () {
		arDivs.push($(this).clone());
	})
	$(divs).remove();
	arDivs = shuffle(arDivs);
	for (var i in arDivs) { $(parent).append(arDivs[i]) }

}
function shuffle(o) {
	for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}


function resize() {
	var sW = $(window).width();
	var sH = $(window).height();
	var w = sW / 1024;
	var h = sH / 768;

	if (h > w) {
		$scale = w;
	} else {
		$scale = h;
	}

	if ($scale > 1) {
		$scale = 1;
	}
	$isMobile = false;
	if (typeof window.orientation !== 'undefined') {
		$isMobile = true;
		$('html').addClass('mobile');
		$scale = 1;
	}

	if (!$isMobile) {
		$('#stage').css('transform', 'scale(' + $scale + ' , ' + $scale + ')');
		$('#stage').css('transform-origin', '50% 50%');
	}

}


function replayTrilha() {
	playAudio('trilha', 'trilha', replayTrilha);
}

function playAudio(tag, nome, callback) {
	var audio = document.getElementById(tag);
	audio.src = 'audios/' + nome + '.mp3';
	$(audio).unbind('ended');
	if (callback) {
		$(audio).bind('ended', callback);
	} else {
		$(audio).bind('ended', function () { audio.src = 'audios/mute.mp3'; });
	}
	audio.play();
}



