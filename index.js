const express = require('express')
const app = express()
const port = process.env.PORT || 80

app.get('/', (req, res) => res.send(`
	
<!doctype>
<html>
<head>
<style>

html {
font-size: 62.5%;
height 100%;
}
body {
	height: 100%;
	color: #444;
	font-size: 7rem;
	line-height: 2;
	padding: 25%;
	text-align: justify;
	scroll-behavior: smooth;
}
body::before, body::after {
	content: "";
	z-index: 10;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 40%;
	background-image: linear-gradient( white, transparent);
}
body::after {
	top: auto;
	bottom: 0;
	background-image: linear-gradient( transparent, white );

}
main {
	pointer-events:none;
	padding-bottom: 50%;
	overflow-wrap: break-word;
}

p {
	padding-bottom: 50%;
}

.dragging { background-color: red;}
#drop_zone {
	
border: 5px solid blue;
  width:  200px;
  height: 100px;
}

</style>
</head>
<body class="droptarget">

<main id="main">



</main>
<progress id="progress-bar" max=100 value=0></progress>
</body>
</html>
<script>

	// space bar or single click or touch = toggle pause
	// text-justification - swipe left swipe right swipe center
	// font size and leading
	// page padding - pinch in/out
	// page fading - pinch up and down
	// speed - touch & hold until control appears then drag up or down
	// jump ahead two finger swipe up
	// jump back two finger swipe down


	// bookmarks for fast scrolling between sections
	//
	// overview bar - or is that the scroll bar?
	// and elapsed time and predicted finish time
	// font selector
	// reading time dashboard presentation time/scrolling time/elapsed time.  time sofar and time to finish
	//
	//
	// comfort profile settings - sets sensible default of above
	//
	//
	// color schemes
	//
	// black/white
	// white/black
	// blue/yellow
	// black/yellow
	// white/blue

let PAUSED = true;

;( function SCROLLER (){

	const main = document.body; //document.getElementById("main");
	
	function repeatOften() {
	        main.scrollTop+=1;
	        requestAnimationFrame(repeatOften);
	}

	document.addEventListener('userloadedfile', function (e) {
		main.scrollTop=0;
		main.innerHTML=localStorage.getItem(e.detail);
		requestAnimationFrame(repeatOften);
	}, false);

})();




;(function GESTUREINTERFACE(){
	let gesture = null;

	function Gesture(e){
		const { timeStamp:ta, clientX:xa, clientY:ya } = mouse_detail;
		const { timeStamp:tb, clientX:xb, clientY:yb } = e;
	}
	Gesture.prototype.manifest = function( startGesture, mouseUp = false){
		let swipe = new Event('swipe');
		let slide= new Event('slide');
		let longpress = new Event('longpress');


		this.distanceX = Math.abs( xb - xa);
		this.distanceY = Math.abs(yb - ya);
		this.directionX = Math.sign( xb-xa );
		this.directionY = Math.sign( yb-ya);
		this.time  = tb-ta;
		this.speedX = distanceX/time;
		this.speedY = distanceY/time;

		const maxDist = Math.max( this.distanceX, this.distanceY );
		const maxSpeed = Math.max( this.speedX, this.speedY );

		if ( time < 800 && maxDist > 120 &&  maxDist < 300 && maxSpeed < 200) { // swipe
		
		}

		if ( time > 800 && time < 1500 && maxDist > 300){ // slide
		
		}

		if ( time > 1500 && time < 2000 ){ // long press
		
		}
		document.dispatchEvent(event);
	}

	document.addEventListener("mousedown", function(e){
//		mouse_detail = new Gesture(e);
	})
	document.addEventListener("mouseup", function(e){
//		gesture.manifest(  new Gesture(e), true );
	});
	document.addEventListener("mousemove", function(e){
//		gesture.manifest(  new Gesture(e) );
	});

});


;( function FILEDRAG(){


		document.addEventListener('dragover', function (e) {
			e.preventDefault();
		});

		document.addEventListener("dragenter", function (e) {
			document.body.classList.add("dragging");
		}, false);

		document.addEventListener("dragleave", function (e) {
			document.body.classList.remove("dragging");
		}, false);

		document.addEventListener("drop", async function (e) {
			const {target} = e;
			// prevent default action (open as link for some elements)
			e.preventDefault();


			try {
				document.body.classList.remove("dragging");
				const file = e.dataTransfer.files[0];
				const filename = file.name;

                		var reader = new FileReader();
                		reader.onload = handleFileRead;

                		function handleFileRead(e) {

					 var span = document.createElement('span');
  					span.innerHTML = e.target.result;
  					const text = span.textContent || span.innerText;


					window.localStorage.setItem( filename, text );
			
					const event = new CustomEvent('userloadedfile', { detail: filename  } );
					document.dispatchEvent(event);
				}

				reader.readAsText(file); // fires onload when done.
					
			} catch (err) {
				console.error(err)
			} finally {
			
			}
		}, false);



})();




</script>
	
	
	
	
	`))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
