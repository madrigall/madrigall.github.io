window.onload = function() {
	setTimeout(hidePreloader, 1200)
	setTimeout(deletePreload, 2000)
}

function toggleMenu()
{
	var menu = document.getElementsByClassName("hamburger")
	menu[0].classList.toggle("is-active")

	if(document.getElementsByClassName("header__navigation")[0].classList.contains("header__navigation--mobile_visible"))
	{
		document.getElementsByClassName("header__navigation")[0].classList.remove("header__navigation--mobile_visible")
	}
	else
		document.getElementsByClassName("header__navigation")[0].classList.add("header__navigation--mobile_visible");
}

document.getElementsByClassName("hamburger")[0].onclick = function(){
	toggleMenu();
};

document.getElementsByClassName("header__navigation")[0].onclick = function() {
	toggleMenu();
};

window.onscroll = function() {
	var scrolled = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
	var menu = document.getElementsByClassName("header__navigation");
	var computedStyle = window.getComputedStyle(document.getElementById("hamburger"), null);

	if(computedStyle.display == "block")
		return;


	if(scrolled > 70)
	{
		menu[0].classList.remove("header__navigation--nofixed");
		menu[0].classList.add("header__navigation--border", "header__navigation--fixed");
	}
	else
	{
		menu[0].classList.remove("header__navigation--border", "header__navigation--fixed");
		menu[0].classList.add( "header__navigation--nofixed");
	}
	var clientTop = document.documentElement.clientTop || document.body.clientTop || 0;

	[].forEach.call(document.getElementsByClassName('navigation__item'), function(v,i,a) {
		var data = v.getElementsByTagName("a");
		data = data[0].getAttribute("href");
		
		var pos = document.getElementById(data.slice(1)).getBoundingClientRect();
		var top  = pos.top +  scrolled - clientTop

		if ((top <= scrolled) && ((top + pos.height) > scrolled)) 
		{
			v.classList.remove("navigation__item--active");
			v.classList.add("navigation__item--active");
		}
		else
		{
			v.classList.remove("navigation__item--active");
		}
	});
	
}

function hidePreloader(){
	var loader = document.getElementsByClassName("preloader");
	loader[0].style.opacity = "0";
	var html = document.getElementsByTagName("html");
	html[0].style.overflow = "visible";
	console.log("loaded")
}
function deletePreload(){
	var loader = document.getElementsByClassName("preloader");
	loader[0].remove();
	console.log("deleted")
}
var linkNav = document.querySelectorAll('[href^="#"]'),
	V = 0.4; 

for (var i = 0; i < linkNav.length; i++) 
{
	linkNav[i].addEventListener('click', function(e) {
		e.preventDefault();

		var w = window.pageYOffset,
			hash = this.href.replace(/[^#]*(.*)/, '$1');

		t = document.querySelector(hash).getBoundingClientRect().top,
			start = null;

		requestAnimationFrame(step);

		function step(time) 
		{
			if (start === null) 
				start = time;

			var progress = time - start,
				r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));

			window.scrollTo(0,r);

			if (r != w + t) 
				requestAnimationFrame(step)
			else 
				location.hash = hash
		}

	}, false);
}
(function() {
	// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
	if (!String.prototype.trim) {
		(function() {
			// Make sure we trim BOM and NBSP
			var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
			String.prototype.trim = function() {
				return this.replace(rtrim, '');
			};
		})();
	}
	[].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
		// in case the input is already filled..
		if( inputEl.value.trim() !== '' ) {
			classie.add( inputEl.parentNode, 'input--filled' );
		}
		// events:
		inputEl.addEventListener( 'focus', onInputFocus );
		inputEl.addEventListener( 'blur', onInputBlur );
	} );
	function onInputFocus( ev ) {
		classie.add( ev.target.parentNode, 'input--filled' );
	}
	function onInputBlur( ev ) {
		if( ev.target.value.trim() === '' ) {
			classie.remove( ev.target.parentNode, 'input--filled' );
		}
	}
})();