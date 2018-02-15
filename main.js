var imagearray = [];

function updateSpriteSheet() {
for (var i = 0; i < document.getElementById('file_input').files.length; i++) {
var thistype = document.getElementById('file_input').files[i].type;
if (thistype == "image/png" || thistype == "image/jpeg" || thistype == "image/svg+xml") {
imagearray.push(document.getElementById('file_input').files[i]);
} else {

}
}
gid('file_input').value = null;	

if (imagearray.length > 0) {
gid("img_count").innerHTML = imagearray.length+" images selected"
gid("gen").classList.remove("gray");
gid("clear").classList.remove("gray");
}
}


function gid(id) {
return document.getElementById(id);
}

function clearStuff() {
gid("img_count").innerHTML = "0 images selected"
gid('file_input').value = null;	
imagearray = [];
gid("gen").classList.add("gray");
gid("clear").classList.add("gray");
}

function generate() {
	
if (imagearray.length > 0) {
	
gid("stuff").innerHTML = "<img id='img_test' width='55px' height='55px' onload='goCanvas(gid(\"img_test\").naturalWidth,gid(\"img_test\").naturalHeight)'></img>";

setTimeout(function() {
var reader = new FileReader();
reader.onloadend = function() {
gid("img_test").src = reader.result;
}
reader.readAsDataURL(imagearray[0]);
},1)

}
	
}

function goCanvas(width,height) {
console.log(width + " " + height)
var sq = Math.ceil(Math.sqrt(imagearray.length))

var c=document.getElementById("canvas");
var ctx=c.getContext("2d");
document.getElementById("canvas").height = sq*height;
document.getElementById("canvas").width = sq*width;

var on = -1;

addNextImage()

function addNextImage() {
on += 1;
if (on == imagearray.length) {
var img = c.toDataURL("image/png");

var link = document.createElement('a');
link.href = document.getElementById("canvas").toDataURL();
link.download = 'sprite_sheet.png';
document.body.appendChild(link);
link.click();
clearStuff()
console.log("all done")
} else {
var imageObj1 = new Image();
console.log("make image")
var reader = new FileReader();
reader.onloadend = function() {
console.log("reader loaded")
imageObj1.src = reader.result;
imageObj1.onload = function() {
console.log("image loaded")
ctx.drawImage(imageObj1, (width*on)-((width*sq)*Math.floor(on/sq)), height*Math.floor(on/sq), width, height);
addNextImage()
}
}
console.log("start file reader")
reader.readAsDataURL(imagearray[on]);	
}
}
}