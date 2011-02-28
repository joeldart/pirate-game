function reflect(context){
	context.transform(-1, 0, 0, 1, 0, 0);
}
function invert(context){
	context.transform(1, 0, 0, -1, 0, 0);
}

window.draw = (function(){
function gold(context){
	context.fillStyle = "rgb(185, 126, 2)";
}
function goldShine(context){
	context.fillStyle = "rgb(252, 202, 99)";
}
function epCoatColor(context){
	context.fillStyle = "rgb(51,51,51)";
}
function metal(context){
	context.fillStyle = "rgb(153,153,153)";
}
function pirateSkin(context){
//this sets the skin tone of our pirate
context.fillStyle = "rgb(242, 186, 130)";
}
function darkRed(context){
	context.fillStyle = "rgb(148, 40, 29)";
}
function deepPurple(context){
	context.fillStyle = "rgb(43, 22, 124)";
}
function ppCoatColor(context){
	context.fillStyle = "rgb(186, 15, 48)";//pp's coat's color... a dark maroon, I think
}
function shipBrown(context){
//this changes the color to the brown that is the color of the ship
	context.fillStyle = "rgb(127, 63, 0)";
}
function darkBrown(context){
	context.fillStyle = "rgb(63, 31, 0)";
}
function pearlColor(context){
	context.fillStyle = "rgb(253, 253, 230)";
}
function jewelColor(context){
	context.fillStyle = "rgb(17, 11, 147)";
}
function sword(context){
	metal(context);
	//hilt
	context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(2, ARMWIDTH/2);
		context.lineTo(ARMWIDTH-2, ARMWIDTH/2);
		context.lineTo(ARMWIDTH, 0);
	context.fill();
	//blade
	context.beginPath();
		context.moveTo(4,ARMWIDTH/2);
		context.lineTo(4, SWORDLENGTH);
		context.lineTo(SWORDWIDTH, 2*SWORDLENGTH/3);
		context.lineTo( 10, ARMWIDTH/2);
	context.fill();
	context.strokeStyle = "rgb(0,0,0)";
	context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(2, ARMWIDTH/2);
		context.lineTo(ARMWIDTH-2, ARMWIDTH/2);
		context.lineTo(ARMWIDTH, 0);
	context.stroke();
	//blade
	context.beginPath();
		context.moveTo(4,ARMWIDTH/2);
		context.lineTo(4, SWORDLENGTH);
		context.lineTo(SWORDWIDTH, 2*SWORDLENGTH/3);
		context.lineTo( 10, ARMWIDTH/2);
	context.stroke();
}
function skullFace(context, x){
	var halfWidth = HEADWIDTH/2;
	var thirdWidth = HEADWIDTH/3;
	context.fillStyle = "rgb(255,255,255)";
	context.beginPath();//basic head shape
		context.moveTo( 0, halfWidth);
		context.lineTo( -halfWidth, halfWidth - thirdWidth);
		context.lineTo( -halfWidth, halfWidth - 2*thirdWidth);
		context.lineTo( 0, -halfWidth);
		context.lineTo( halfWidth, halfWidth - 2*thirdWidth);
		context.lineTo( halfWidth, halfWidth - thirdWidth);
	context.fill();
	context.fillStyle = "rgb(0,0,0)";
	var radius = 5.0;//5.0*x;
	context.beginPath();//eye socket
		context.arc(halfWidth/2, halfWidth - thirdWidth, radius, 0, Math.PI*2, true);
	context.fill();
	context.beginPath();//eye socket
		context.arc(-halfWidth/2, halfWidth - thirdWidth, radius, 0, Math.PI*2, true);
	context.fill();
	context.beginPath();//nose hole
		context.arc(0, 0, radius, 0, Math.PI*2, true);
	context.fill();

	context.strokeStyle = "rgb(0,0,0)";
	context.beginPath();
		context.moveTo(-halfWidth/2, -halfWidth/2);
		context.lineTo(halfWidth/2, -halfWidth/2);
	context.stroke();
	context.beginPath();
		context.moveTo( -halfWidth/2, halfWidth - 2*thirdWidth);
		context.lineTo( halfWidth/2,  halfWidth - 2*thirdWidth);
	context.stroke();
	context.beginPath();
		context.moveTo(-halfWidth /2, -halfWidth + thirdWidth);
		context.lineTo(halfWidth/2, -halfWidth + thirdWidth);
	context.stroke();

	context.beginPath();
		context.moveTo(-halfWidth/2, -halfWidth/2);
		context.lineTo(-halfWidth/2, halfWidth - 2*thirdWidth);
	context.stroke();
	context.beginPath();
		context.moveTo(halfWidth/2, -halfWidth/2);
		context.lineTo(halfWidth/2, halfWidth - 2*thirdWidth);
	context.stroke();
	context.beginPath();
		context.moveTo(-halfWidth/4, -halfWidth/2);
		context.lineTo(-halfWidth/4, halfWidth - 2*thirdWidth);
	context.stroke();
	context.beginPath();
		context.moveTo(halfWidth/4, -halfWidth/2);
		context.lineTo(halfWidth/4, halfWidth - 2*thirdWidth);
	context.stroke();
	context.beginPath();
		context.moveTo(0, -halfWidth/2);
		context.lineTo(0, halfWidth - 2*thirdWidth);
	context.stroke();

}
function skullAndCrossSwords(context, x){
	context.translate(0, -50);
	context.save();
	context.translate(-20, 0);
	context.rotate(-0.785398163 );
	sword(context);
	context.restore();
	context.save();
	reflect(context);
	context.translate(-20, 0);
	context.rotate(-0.785398163 );
	sword(context);
	context.restore();
	context.save();
	context.translate(0, 50);
	skullFace(context,x);
	context.restore();
}
function boot(context){
    darkBrown(context);
	context.beginPath();//draws the botton part of the boot
		context.moveTo(-LEGWIDTH/2, -LEGLENGTH + LEGLENGTH/4);
		context.lineTo(-LEGWIDTH/2,-LEGLENGTH);
		context.lineTo( LEGWIDTH/2, -LEGLENGTH);
		context.lineTo(LEGWIDTH/2, -LEGLENGTH + LEGLENGTH/4);
	context.fill();
	context.beginPath();//draws the toe of the boot
		context.moveTo(0, -LEGLENGTH+10);
		context.lineTo(0, -LEGLENGTH);
		context.lineTo(LEGWIDTH, -LEGLENGTH);
		context.lineTo(LEGWIDTH, -LEGLENGTH+7);
		context.lineTo(LEGWIDTH-5, -LEGLENGTH+10);
		context.lineTo(LEGWIDTH, -LEGLENGTH+10);
	context.fill();
	context.strokeStyle = "rgb(0,0,0)";
	context.beginPath();//draws the top of the boot
		context.moveTo(-LEGWIDTH/2 - 5, -LEGLENGTH + LEGLENGTH/4);
		context.lineTo(-LEGWIDTH/2 - 5, -LEGLENGTH + LEGLENGTH/4 - 10);
		context.lineTo( LEGWIDTH/2+5, -LEGLENGTH + LEGLENGTH/4 - 10);
		context.lineTo( LEGWIDTH/2+5, -LEGLENGTH + LEGLENGTH/4);
	context.fill();
}
function leg(context){
//all pirates wear the same pants, so we draw all legs the same way
//this routine draws a leg for a pirate in the middle of the screen
	darkBrown(context);
	context.beginPath();//draws the quad
		context.moveTo(-LEGWIDTH/2, 0);
		context.lineTo(-LEGWIDTH, -LEGLENGTH/4);
		context.lineTo(-LEGWIDTH/4, -LEGLENGTH/2);
		context.lineTo(LEGWIDTH, -LEGLENGTH/3);
		context.lineTo(LEGWIDTH/2, 0);
	context.fill();
	context.beginPath();//draws the calf muscle
		context.moveTo(-LEGWIDTH/4, -LEGLENGTH/2);
		context.lineTo(-LEGWIDTH/2, -LEGLENGTH + LEGLENGTH/4);
		context.lineTo(LEGWIDTH/2, -LEGLENGTH + LEGLENGTH/4);
		context.lineTo(LEGWIDTH, -LEGLENGTH/3);
	context.fill();
	boot(context);
}
function jewel(context){
	jewelColor(context);
	context.save();
	context.rotate(45.0*Math.PI/180);
	//context.fillRect(-8, 8, 8, -8);
	context.fillRect(-8, -8, 16, 16);
	context.restore();
	context.fillStyle = "rgb(255,255,255)";
	var pointSize;
	if(shimmer%20 <16)
		pointSize = 2.0;
	else
		pointSize= 3.5;
	context.fillRect(2, 2, pointSize, pointSize);
}
function coin(context){
//this draws a coin that is found in the treasure chest
	if(shimmer%20 <16)
		gold(context);
	else
		goldShine(context);
	var pointSize = 10;
		drawPoint(context, 0, 0, pointSize);

	context.fillStyle = "rgb(0,0,0)";
	pointSize = 1;
	drawPoint(context, 0, 3, pointSize);
	for(var i=-2; i<=2; i++){
		drawPoint(context, i, 2, pointSize);
	}
	drawPoint(context,-3, 1, pointSize);
	drawPoint(context,0,1, pointSize);
	drawPoint(context,3,1, pointSize);
	for(var i=-2; i<=1; i++){
		drawPoint(context,i, 0, pointSize);
	}
	drawPoint(context,0, -1, pointSize);
	drawPoint(context,2, -1, pointSize);
	drawPoint(context,-3, -2, pointSize);
	drawPoint(context,0, -2, pointSize);
	drawPoint(context,3, -2, pointSize);
	for(var i= -2; i<=2; i++){
		drawPoint(context,i, -3, pointSize);
	}
	drawPoint(context,0, -4, pointSize);
}		
function aPearl(context){
	pearlColor(context);
	var pointSize = 5;
	drawPoint(context, 0,0, pointSize);
	shipBrown(context);//color of the chest
	pointSize = 1.0;
	drawPoint(context, -3, 3, pointSize);
	drawPoint(context,-2, 3, pointSize);
	drawPoint(context,2, 3, pointSize);
	drawPoint(context,-3, -1, pointSize);
	drawPoint(context,-2, -1, pointSize);
	drawPoint(context,2, -1, pointSize);	
}
function pearls(context){
//this makes pearls to hang down from the chest
	context.save();
	for(var i=0; i<7; i++){
		aPearl(context);
		context.translate(0, -5);
	}
	for(var i=0; i<3; i++){
		aPearl(context);
		context.translate(5, -5);
	}
	aPearl(context);
	context.translate(5, 0);
	for(var i=0; i<3; i++){
		aPearl(context);
		context.translate(5, 5);
	}
	for(var i=0; i<7; i++){
		aPearl(context);
		context.translate(0, 5);
	}
	context.restore();
}
function drawPoint(context, x, y, size){
	if(size == 1)
	{
		context.fillRect(x,y,size,size);
	}
	else{
		context.beginPath();
			context.arc(x,y,size, 0, Math.PI*2, true);
		context.fill();
	}
}
function ppHead(context){
	pirateSkin(context);
	var halfWidth = HEADWIDTH/2;
	var thirdWidth = HEADWIDTH/3;
	context.beginPath();//basic head shape
		context.moveTo(0, PHEIGHT);
		context.lineTo(0 - halfWidth, PHEIGHT - thirdWidth);
		context.lineTo(0 - halfWidth, PHEIGHT - 2*thirdWidth);
		context.lineTo(0, (PHEIGHT + PSHOULDER)/2);
		context.lineTo(0 + halfWidth, PHEIGHT - 2*thirdWidth);
		context.lineTo(0 + halfWidth, PHEIGHT - thirdWidth);
	context.fill();
	context.beginPath();//nose
		context.moveTo(halfWidth, PHEIGHT - thirdWidth -thirdWidth/5);
		context.lineTo(halfWidth, PHEIGHT - thirdWidth -2*thirdWidth/3);
		context.lineTo(halfWidth + 7, PHEIGHT - thirdWidth -2*thirdWidth/3);
		context.lineTo(halfWidth + 7, PHEIGHT - thirdWidth -3*thirdWidth/5);
	context.fill();
	darkRed(context);
	context.beginPath();//hair
		context.moveTo(0, PHEIGHT);
		context.lineTo(0 - halfWidth, PHEIGHT - thirdWidth);
		context.lineTo(-5*halfWidth/4, PSHOULDER+5);
        	context.lineTo(-halfWidth, PSHOULDER - 5);
		context.lineTo(0, (PHEIGHT + PSHOULDER)/2);
	context.fill();
	context.beginPath();//beard
		context.moveTo(0, (PHEIGHT + PSHOULDER)/2);
		context.lineTo(-18, PSHOULDER +8);
		context.lineTo(halfWidth, PSHOULDER +5);
		context.lineTo(0 + halfWidth, PHEIGHT - 2*thirdWidth);
	context.fill();
	drawPoint(context,halfWidth-3, PHEIGHT - thirdWidth+3, 4);
	drawPoint(context, halfWidth-5, PHEIGHT - thirdWidth+3, 4);
	drawPoint(context, halfWidth-9, PHEIGHT - thirdWidth+3, 4);
	deepPurple(context);
	context.beginPath();//hat top part
		context.moveTo(-halfWidth/2, PHEIGHT+ARMWIDTH-5);
		context.lineTo(-halfWidth, PHEIGHT -10);
		context.lineTo(10, PHEIGHT-8);
		context.lineTo(halfWidth/2, PHEIGHT+ARMWIDTH-8);
	context.fill();
	context.strokeStyle = "rbg(0,0,0)";
	context.beginPath();//hat top part
		context.moveTo(-halfWidth/2, PHEIGHT+ARMWIDTH-5);
		context.lineTo(-halfWidth, PHEIGHT -10);
		context.lineTo(10, PHEIGHT-8);
		context.lineTo(halfWidth/2, PHEIGHT+ARMWIDTH-8);
	context.stroke();
	context.strokeStyle = "rgb(255,255,255)";//feathers should be white
	context.beginPath();
		context.moveTo(-halfWidth/2, PHEIGHT -10);
		context.lineTo(-halfWidth - ARMWIDTH, PHEIGHT +ARMWIDTH -5);
		context.lineTo(-halfWidth -2.5*ARMWIDTH, PHEIGHT +ARMWIDTH/2);
	context.stroke();
	context.fillStyle = "rgb(255,255,255)";
	//use points to make the feather seem more jagged
	drawPoint(context, -halfWidth -2.5*ARMWIDTH+2, PHEIGHT +ARMWIDTH/2, 3);
	drawPoint(context, -halfWidth -2.5*ARMWIDTH+5, PHEIGHT +ARMWIDTH/2, 5);
	drawPoint(context, -halfWidth -2.5*ARMWIDTH+11, PHEIGHT +ARMWIDTH/2+1, 7);
	drawPoint(context, -halfWidth -2.5*ARMWIDTH+19, PHEIGHT +ARMWIDTH/2+3,10);
	drawPoint(context, -halfWidth - ARMWIDTH-2, PHEIGHT +ARMWIDTH -6,10);
	drawPoint(context, -halfWidth - ARMWIDTH+5, PHEIGHT +ARMWIDTH -7,10);	
	drawPoint(context, -halfWidth - ARMWIDTH+7, PHEIGHT +ARMWIDTH -9,10);
	//finished with the feather
	deepPurple(context);
	context.beginPath();//hat rim
		context.moveTo(-BODYWIDTH/2, PHEIGHT);
		context.lineTo(-halfWidth, (PHEIGHT + PSHOULDER)/2);
		context.lineTo(halfWidth+7, PHEIGHT-4);
	context.fill();
	context.strokeStyle = "rgb(0,0,0)";
	context.beginPath();//hat
		context.moveTo(-BODYWIDTH/2, PHEIGHT);
		context.lineTo(-halfWidth, (PHEIGHT + PSHOULDER)/2);
		context.lineTo(halfWidth+7, PHEIGHT-4);
	context.stroke();
	context.fillStyle = "rgb(255,255,255)";
	//eye white
	drawPoint(context, halfWidth-3, PHEIGHT - thirdWidth,5);
	context.fillStyle = "rgb(0,76,0)";//dark green eyes
	drawPoint(context, halfWidth-2, PHEIGHT - thirdWidth, 3);
	context.fillStyle = "rgb(0,0,0)";
	//pupil
	drawPoint(context, halfWidth-2, PHEIGHT - thirdWidth, 2);
}
function ppCoat(context){
//draws the PP's coat
	ppCoatColor(context);	
	var halfWidth = BODYWIDTH/2;
	context.beginPath();
		context.moveTo(-.5*halfWidth, PSHOULDER);
		context.lineTo(-halfWidth, 4*PSHOULDER/5);
		context.lineTo(-halfWidth + 5, 2*PSHOULDER/5);
		context.lineTo(-halfWidth, PSHOULDER- BODYLENGTH);
//now the front
		context.lineTo(halfWidth-5, PSHOULDER- BODYLENGTH);
		context.lineTo(halfWidth-5, 4*PSHOULDER/5);
		context.lineTo(.5*halfWidth, PSHOULDER);
	context.fill();
}
function arm(context){
	context.beginPath();
		context.moveTo(-ARMWIDTH, 0);
		context.lineTo(-3*ARMWIDTH/2, -ARMLENGTH/5);
		context.lineTo(-3*ARMWIDTH/2+4, -ARMLENGTH/5-4);
		context.lineTo(-3*ARMWIDTH/2, -ARMLENGTH/5-8);
		context.lineTo( -3*ARMWIDTH/2, -2*ARMLENGTH/5);
		context.lineTo(-ARMWIDTH, -ARMLENGTH+ARMWIDTH);
		context.lineTo(0, -ARMLENGTH);
		context.lineTo(-ARMWIDTH/2, -2*ARMLENGTH/5+4);
		context.lineTo(0+4, -ARMLENGTH/5);
		context.lineTo(0, 0);
	context.fill();
	context.strokeStyle = "rgb(0,0,0)";
	context.beginPath();
		context.moveTo(-ARMWIDTH, 0);
		context.lineTo(-3*ARMWIDTH/2, -ARMLENGTH/5);
		context.lineTo(-3*ARMWIDTH/2+4, -ARMLENGTH/5-4);
		context.lineTo(-3*ARMWIDTH/2, -ARMLENGTH/5-8);
		context.lineTo( -3*ARMWIDTH/2, -2*ARMLENGTH/5);
		context.lineTo(-ARMWIDTH, -ARMLENGTH+ARMWIDTH);
		context.lineTo(0, -ARMLENGTH);
		context.lineTo(-ARMWIDTH/2, -2*ARMLENGTH/5+4);
		context.lineTo(0+4, -ARMLENGTH/5);
		context.lineTo(0, 0);
	context.stroke();
	context.save();
	context.translate(0, -ARMLENGTH+ARMWIDTH);
	context.rotate(-1.57079633);
	sword(context);
	context.restore();
	pirateSkin(context);
//	context.fillRect(-ARMWIDTH, -ARMLENGTH + ARMWIDTH, ARMWIDTH, ARMWIDTH);
	context.fillRect(-ARMWIDTH, -ARMLENGTH, ARMWIDTH, ARMWIDTH);
		
}
function ppArm(context){
	ppCoatColor(context);
	arm(context);
}
function epArm(context){
	epCoatColor(context);
	arm(context);
}
function epHead(context){
	pirateSkin(context);
	var halfWidth = HEADWIDTH/2;
	var thirdWidth = HEADWIDTH/3;
	context.beginPath();//basic head shape
		context.moveTo(0, PHEIGHT);
		context.lineTo(0 - halfWidth, PHEIGHT - thirdWidth);
		context.lineTo(0 - halfWidth, PHEIGHT - 2*thirdWidth);
		context.lineTo(0, PSHOULDER);
		context.lineTo(0 + halfWidth, PHEIGHT - 2*thirdWidth);
		context.lineTo(0 + halfWidth, PHEIGHT - thirdWidth);
	context.fill();
	context.beginPath();//nose
		context.moveTo(halfWidth, PHEIGHT - thirdWidth -thirdWidth/5);
		context.lineTo(halfWidth, PHEIGHT - thirdWidth -2*thirdWidth/3);
		context.lineTo(halfWidth + 7, PHEIGHT - thirdWidth -2*thirdWidth/3);
		context.lineTo(halfWidth + 7, PHEIGHT - thirdWidth -3*thirdWidth/5);
	context.fill();
	context.fillStyle = "rgb(255, 0,0)";
	context.beginPath();//bandana/mask
		context.moveTo(0, PHEIGHT);
		context.lineTo(-halfWidth/2, PHEIGHT );
		context.lineTo(-halfWidth, PHEIGHT - thirdWidth);
		context.lineTo( halfWidth, PHEIGHT - thirdWidth);
		context.lineTo(halfWidth/2, PHEIGHT);
	context.fill();
	context.beginPath();//ties for bandana/mask
		context.moveTo(-halfWidth+7, PHEIGHT - thirdWidth +7);
		context.lineTo(-halfWidth-4, PHEIGHT - thirdWidth +9);
		context.lineTo(-halfWidth, PHEIGHT - thirdWidth);
	context.fill();
	context.beginPath();//ties for bandana/mask
		context.moveTo(-halfWidth, PHEIGHT - thirdWidth+5);
		context.lineTo(-halfWidth-10, PHEIGHT - thirdWidth);
		context.lineTo(-halfWidth, PHEIGHT - thirdWidth );
	context.fill();
	context.strokeStyle = "rgb(0,0,0)";
	context.beginPath();
		context.moveTo(0, PHEIGHT);
		context.lineTo(-halfWidth/2, PHEIGHT );
		context.lineTo(-halfWidth, PHEIGHT - thirdWidth);
		context.lineTo( halfWidth, PHEIGHT - thirdWidth);
		context.lineTo(halfWidth/2, PHEIGHT);
	context.stroke();
	darkRed(context);
	var pointSize = 4.0;
	//eyebrows
		drawPoint(context, halfWidth-3, PHEIGHT - thirdWidth+3, pointSize);
		drawPoint(context, halfWidth-5, PHEIGHT - thirdWidth+3, pointSize);
		drawPoint(context, halfWidth-9, PHEIGHT - thirdWidth+3, pointSize);
	context.fillStyle = "rgb(255,255,255)";
	pointSize = 5.0;
	//eye white
		drawPoint(context, halfWidth-3, PHEIGHT - thirdWidth, pointSize);
	context.fillStyle = "rgb(76,38,0)";//dark brown eyes
	pointSize = 3.0;
	//eye white
		drawPoint(context, halfWidth-2, PHEIGHT - thirdWidth, pointSize);
	context.fillStyle = "rgb(0,0,0)";
	pointSize = 2.0;
	//pupil
		drawPoint(context, halfWidth-2, PHEIGHT - thirdWidth, pointSize);
}
function epCoat(context){
//draws the PP's coat
	epCoatColor(context);	
	var halfWidth = BODYWIDTH/2;
	context.beginPath();
		context.moveTo(-.5*halfWidth, PSHOULDER);
		context.lineTo(-halfWidth, 4*PSHOULDER/5);
		context.lineTo(-halfWidth + 5, 2*PSHOULDER/5);
		context.lineTo(-halfWidth, PSHOULDER- BODYLENGTH);
//now the front
		context.lineTo(halfWidth-5, PSHOULDER- BODYLENGTH);
		context.lineTo(halfWidth-5, 4*PSHOULDER/5);
		context.lineTo(.5*halfWidth, PSHOULDER);
	context.fill();
}
function drawEP(context, cellNum, place){
//precondition: current[cellNum] has an ep in place
//postcondition: draws EP at 0 to buffer
//notes: some shapes will be partially covered, so these are drawn first with
//the topmost shapes drawn last
//draw the neck
	context.save();
	pirateSkin(context);
	context.translate(0, DECKHEIGHT);
	context.rotate(current[cellNum].theCell.eps[place].bodyAngle() );//will only change on hit
	context.fillRect(-10, PSHOULDER - 10, 20, 20); 
	context.restore();
//draw the legs
	context.save();
	context.translate(0, DECKHEIGHT + LEGLENGTH);
	context.rotate(current[cellNum].theCell.eps[place].rLeg());
	context.rotate(current[cellNum].theCell.eps[place].bodyAngle() );//will only change on hit
	leg(context);
	context.restore();
	context.save();
	context.translate(0, DECKHEIGHT + LEGLENGTH, 0);
	context.rotate(current[cellNum].theCell.eps[place].lLeg());
	context.rotate(current[cellNum].theCell.eps[place].bodyAngle() );//will only change on hit
	leg(context);
	context.restore();
//draw the body
	context.save();
	context.translate(0, DECKHEIGHT);
	context.rotate(current[cellNum].theCell.eps[place].bodyAngle() );//will only change on hit
	epCoat(context);
	context.restore();
//draw the head
	context.save();
	context.translate(0, DECKHEIGHT);
	context.rotate(current[cellNum].theCell.eps[place].bodyAngle() );//will only change on hit
	epHead(context);
	context.restore();
//draw the arm
	context.save();
	context.translate(-HEADWIDTH/4, DECKHEIGHT + PSHOULDER);
	context.rotate(current[cellNum].theCell.eps[place].armLevel());
	context.rotate(current[cellNum].theCell.eps[place].bodyAngle() );//will only change on hit
	epArm(context);
	context.restore();
}
function drawChest(context){
//this function got a little clumsy with the stack, so I eventually 
//gave up and hacked it a bit.  The wires are hanging out, but it works
//Update for HTML5- I further hacked this up because I couldn't quite figure out 
//why my math wasn't working correctly
	context.save();	

	shipBrown(context);
	context.fillRect(-CHESTWIDTH/2, DECKHEIGHT, CHESTWIDTH, CHESTHEIGHT);
	context.fillRect(-CHESTWIDTH/2, DECKHEIGHT+2*CHESTHEIGHT/3 + 33, CHESTWIDTH, 2*CHESTHEIGHT/3);
	metal(context);
	context.fillRect(-CHESTWIDTH/4-ARMWIDTH, DECKHEIGHT, ARMWIDTH, CHESTHEIGHT);
	context.fillRect(CHESTWIDTH/4, DECKHEIGHT, ARMWIDTH, CHESTHEIGHT);
	context.strokeStyle = "rgb(0,0,0)";
	context.strokeRect(-CHESTWIDTH/2, DECKHEIGHT, CHESTWIDTH, CHESTHEIGHT);
	context.strokeRect(-CHESTWIDTH/2, DECKHEIGHT+2*CHESTHEIGHT/3 + 33, CHESTWIDTH, 2*CHESTHEIGHT/3);

	context.translate( 0, DECKHEIGHT + 106);
	context.translate(-CHESTWIDTH/8 +19, 0);
	pearls(context);
	context.restore();
	context.save();
	context.translate( 0, DECKHEIGHT + 106);
	context.translate(-CHESTWIDTH/2 + 10, 0);
	//context.translate(CHESTWIDTH/3 + 19, 15);//adjusts copy of the location of the rim of the chest
	pearls(context);
	context.restore();
	context.save();
	context.translate( 0, DECKHEIGHT + 106);
	context.translate(-CHESTWIDTH/2 + 10, 0);
	context.translate(3*CHESTWIDTH/4, 5);//adjusts the copy of the location of the rim of the chest
	pearls(context);
	context.restore();

	context.save();
	context.translate( 0, DECKHEIGHT + 106);
	context.translate(-CHESTWIDTH/2 + 10, 0);
	for(var i= 0 ; i<CHESTHEIGHT/12/2; i++){		
		context.save();//pushes the vertical offset
		context.translate(i*12, 0);//staggers the left side
		for(var j=0; j<CHESTWIDTH/12-2*i; j++){
			coin(context);
			context.translate(12, 0);//prepares to make next coin by changing horizontal offset
		}
		context.restore();//pops the horizontal offset
		context.translate(0, 12);//adds to the vertical offset
	}

	context.restore();//pops the vertical offset, returning to the copy of the rim of the chest
	context.save();
	context.translate( 0, DECKHEIGHT + 106);
	context.translate(-CHESTWIDTH/2 + 10, 0);
	
	context.translate(CHESTWIDTH/2, CHESTHEIGHT/2);//changes the copy of the rim of the chest
	jewel(context);

	context.restore();
	context.save();
	context.translate( 0, DECKHEIGHT + 106);
	context.translate(-CHESTWIDTH/2 + 10, 0);

	context.translate(CHESTWIDTH/3, 5);//changes the copy of the left side of the rim of the chest
	jewel(context);
	context.restore();

}
function deck(context){
//this routine draws just a regular deck
	context.save();
	shipBrown(context);
	context.fillRect(-SCREENENDX, -SCREENENDY, SCREENENDX*2, 100);
	context.translate(-SCREENENDX, -SCREENENDY +50);
	for(var i=0; i<5; i++){
		metal(context);
		context.beginPath();
			context.moveTo(0, 25);
			context.lineTo(-25/2, 25/2);
			context.lineTo(-25, 0);
			context.lineTo(-25/2, -25/2);
			context.lineTo(0, -25);
			context.lineTo(25/2, -25/2);
			context.lineTo(25, 0);
			context.lineTo(25/2, 25/2);
		context.fill();
		epCoatColor(context);
		context.beginPath();
			context.moveTo(0, 15);
			context.lineTo(-15/2, 15/2);
			context.lineTo(-15, 0);
			context.lineTo(-15/2, -15/2);
			context.lineTo(0, -15);
			context.lineTo(15/2, -15/2);
			context.lineTo(15, 0);
			context.lineTo(15/2, 15/2);
		context.fill();		
		context.translate(SCREENENDX/2, 0);
	}
	context.restore();
}
function leftEdge(context){
//this routine draws the left edge of the ship
	shipBrown(context);
	context.fillRect(-24, -SCREENENDY, 550, 100);
	context.beginPath();
		context.moveTo(-124, DECKHEIGHT);
		context.lineTo(-24, -SCREENENDY);
		context.lineTo(-24, DECKHEIGHT);
	context.fill();
}
function rightEdge(context){
//this routine draws the right edge of the ship
	shipBrown(context);
	context.fillRect(-SCREENENDX, -SCREENENDY, 550, 100);
	context.beginPath();
		context.moveTo(124, DECKHEIGHT);
		context.lineTo(24, -SCREENENDY);
		context.lineTo(24, DECKHEIGHT);
	context.fill();
	context.save();
	context.translate(-SCREENENDX, -SCREENENDY +50);

	metal(context);
	context.beginPath();
		context.moveTo(0, 25);
		context.lineTo(-25/2, 25/2);
		context.lineTo(-25, 0);
		context.lineTo(-25/2, -25/2);
		context.lineTo(0, -25);
		context.lineTo(25/2, -25/2);
		context.lineTo(25, 0);
		context.lineTo(25/2, 25/2);
	context.fill();
	epCoatColor(context);
	context.beginPath();
		context.moveTo(0, 15);
		context.lineTo(-15/2, 15/2);
		context.lineTo(-15, 0);
		context.lineTo(-15/2, -15/2);
		context.lineTo(0, -15);
		context.lineTo(15/2, -15/2);
		context.lineTo(15, 0);
		context.lineTo(15/2, 15/2);
	context.fill();		
	context.restore();
	context.save();
	context.translate(124, DECKHEIGHT-20, 0);
	context.rotate( -0.785398163);
	skeleton(context);
	context.restore();

}
function mast(context){
//this routine draws a mast in the middle of the screen
	shipBrown(context);
	context.fillRect(-24, -SCREENENDY, 48, 700);
	context.fillStyle = "rgb(0, 0, 0)";
	context.beginPath();
		context.moveTo(-24, DECKHEIGHT);
		context.lineTo(24, DECKHEIGHT);
	context.stroke();
	darkBrown(context);
	context.beginPath();
    		context.moveTo(-4, -SCREENENDY + 640);
		context.lineTo(-4, -SCREENENDY + 600);
	context.stroke();
	context.beginPath();
		context.moveTo(6, -SCREENENDY + 300);
		context.lineTo(6, -SCREENENDY + 280);
	context.stroke();
	context.beginPath();
		context.moveTo(1, -SCREENENDY + 190);
		context.lineTo(1, -SCREENENDY + 225);
	context.stroke();
	context.beginPath();
		context.moveTo(16, -SCREENENDY + 480);
		context.lineTo(16, -SCREENENDY + 440);
	context.stroke();
	context.beginPath();
		context.moveTo(11, -SCREENENDY + 570);
		context.lineTo(11, -SCREENENDY + 540);
	context.stroke();
	context.beginPath();
		context.moveTo(-17, -SCREENENDY + 190);
		context.lineTo(-17, -SCREENENDY + 175);
	context.stroke();
	context.beginPath();
		context.moveTo(3, -SCREENENDY + 520);
		context.lineTo(3, -SCREENENDY + 487);
	context.stroke();
	context.beginPath();
		context.moveTo(-14, -SCREENENDY + 390);
		context.lineTo(-14, -SCREENENDY + 350);
	context.stroke();
}
/*drawPP area*/
function drawPPFace(context) {
	pirateSkin(context);
	context.fillRect(-10, PSHOULDER - 10, 20, 20); 
}
function drawPPLeg(context){
	leg(context);	
}
function drawPPCoat(context){
	ppCoat(context);
}
function drawPPHead(context){
	if(!drawPPHead.cached)
	{
		var tempCan = document.createElement("CANVAS"),
			tempContext = tempCan.getContext('2d');
		tempCan.width = HEADWIDTH*3;
		tempCan.height = PHEIGHT+PSHOULDER;
		tempContext.translate(HEADWIDTH*3/2, 0);
		ppHead(tempContext);
		drawPPHead.cached = document.createElement("IMG");
		drawPPHead.cached.src = tempCan.toDataURL();
	}
	context.drawImage(drawPPHead.cached, 0,0);
}
function drawPPArm(context){
	ppArm(context);
}
/*end drawPP area*/
function drawPP(context){
//precondition: current has a pp
//postcondition: pp is drawn to the buffer
//other notes: draws PP in the 0 of the screen
//some shapes will be partially covered, so these are drawn first with
//the topmost shapes drawn last
//draw the neck
  if(PERFDEBUG)var startDrawTime = Date.now();
	context.save();
	context.translate(0, DECKHEIGHT);
	context.rotate(current[1].theCell.pp.bodyAngle());
	drawPPFace(context);
	context.restore();
  if(PERFDEBUG)console.log("drawPPFace: " + (Date.now() - startDrawTime));
  if(PERFDEBUG)startDrawTime = Date.now();

//draw the legs
	context.save();
	context.translate(0, DECKHEIGHT + LEGLENGTH);
	context.rotate( current[1].theCell.pp.rLeg());
	context.rotate(current[1].theCell.pp.bodyAngle() );//will only change on hit
	drawPPLeg(context);
	context.restore();
  if(PERFDEBUG)console.log("drawLeg: " + (Date.now() - startDrawTime));
  if(PERFDEBUG)startDrawTime = Date.now();
	context.save();
	context.translate(0, DECKHEIGHT + LEGLENGTH);
	context.rotate( current[1].theCell.pp.lLeg());
	context.rotate(current[1].theCell.pp.bodyAngle() );//will only change on hit
	drawPPLeg(context);
	context.restore();
  if(PERFDEBUG)console.log("drawOtherLeg: " + (Date.now() - startDrawTime));
  if(PERFDEBUG)startDrawTime = Date.now();
	//draw the body
	context.save();
	context.translate(0, DECKHEIGHT);
	context.rotate(current[1].theCell.pp.bodyAngle() );//will only change on hit
	drawPPCoat(context);
	context.restore();
  if(PERFDEBUG)console.log("drawcoat: " + (Date.now() - startDrawTime));
  if(PERFDEBUG)startDrawTime = Date.now();
//draw the head
	context.save();
	context.translate(0, DECKHEIGHT);
	context.rotate(current[1].theCell.pp.bodyAngle() );//will only change on hit
		context.save();
		context.translate(-3/2*HEADWIDTH,0);
		drawPPHead(context);
		context.restore();
	context.restore();
  if(PERFDEBUG)console.log("drawHead: " + (Date.now() - startDrawTime));
  if(PERFDEBUG)startDrawTime = Date.now();
//draw the arm
	context.save();
	context.translate(-HEADWIDTH/4, DECKHEIGHT + PSHOULDER);
	context.rotate(current[1].theCell.pp.armLevel() );
	context.rotate(current[1].theCell.pp.bodyAngle()  );//will only change on hit
	drawPPArm(context);
	context.restore();
  if(PERFDEBUG)console.log("drawArm: " + (Date.now() - startDrawTime));
}
function skull(context){
//draws skull for skeleton
	var halfWidth = HEADWIDTH/2;
	var thirdWidth = HEADWIDTH/3;
	context.fillStyle="rgb(255,255,255)";
	context.beginPath();//basic head shape
		context.moveTo( 0, halfWidth);
		context.lineTo( -halfWidth, halfWidth - thirdWidth);
		context.lineTo( -halfWidth, halfWidth - 2*thirdWidth);
		context.lineTo( 0, -halfWidth);
		context.lineTo( halfWidth, halfWidth - 2*thirdWidth);
		context.lineTo( halfWidth, halfWidth - thirdWidth);
	context.fill();
	context.fillStyle = "rgb(0,0,0)";
	var pointSize = 3.0;
	//eye socket
	
	drawPoint(context,halfWidth-3, halfWidth - thirdWidth, pointSize);
	drawPoint(context,halfWidth, 0, pointSize); 

	context.beginPath();
		context.moveTo(halfWidth -5, -halfWidth/2);
		context.lineTo(halfWidth/2, -halfWidth/2);
	context.stroke();
	context.beginPath();
		context.moveTo( halfWidth, halfWidth - 2*thirdWidth);
		context.lineTo( halfWidth/2,  halfWidth - 2*thirdWidth);
	context.stroke();
	context.beginPath();
		context.moveTo(halfWidth -5, -halfWidth/2);
		context.lineTo(halfWidth,  halfWidth - 2*thirdWidth);
	context.stroke();
	context.beginPath();
		context.moveTo(halfWidth/2, -halfWidth/2);
		context.lineTo(halfWidth/2,  halfWidth - 2*thirdWidth);
	context.stroke();
	context.beginPath();
		context.moveTo(halfWidth -2, -halfWidth + thirdWidth);
		context.lineTo(halfWidth/2, -halfWidth + thirdWidth);
	context.stroke();
	context.beginPath();
		context.moveTo( 3*halfWidth/5, halfWidth - 2*thirdWidth);
		context.lineTo( 3*halfWidth/5,  -halfWidth/2);
	context.stroke();
	context.beginPath();
		context.moveTo( 4*halfWidth/5, halfWidth - 2*thirdWidth);
		context.lineTo( 4*halfWidth/5,  -halfWidth/2);
	context.stroke();
	context.beginPath();
		context.moveTo( 3*halfWidth/4, halfWidth - 2*thirdWidth);
		context.lineTo( 3*halfWidth/4,  -halfWidth/2);
	context.stroke();
}
function spine(context){
//draws the spine
	context.save();
	context.fillStyle="rgb(255,255,255)";
	context.translate(0, (10+2)*5);
	for(var i=0; i<11; i++){
		context.fillRect(-5, -5, 10, 10);
		context.translate(0, -12);
	}
	context.restore();
}
function ribs(context){
	context.fillStyle="rgb(255,255,255)";
	context.save();
	context.translate(-20, 25);
	for(var i= 0; i<4; i++){
		context.fillRect(-5, -5, 2*BODYWIDTH/3 + 6, 10);
		context.beginPath();
			context.moveTo(2*BODYWIDTH/3,5);
			context.lineTo(2*BODYWIDTH/3, -5);
			context.lineTo(2*BODYWIDTH/3+15, 10);
		context.fill();
		context.translate(0, -15);
	}
	context.restore();
}
function boneArm(context){
	context.save();
	context.translate(0, 30);
	context.rotate(2.0943951);
	context.fillStyle = "rgb(255,255,255)";
	context.fillRect(-5, -2*ARMLENGTH/5, 10, 2*ARMLENGTH/5);
	context.fillRect(-5, -2*ARMLENGTH/5 - 12, 10, 10);
	context.fillRect(-5, -ARMLENGTH, 10, 3*ARMLENGTH/5-14);
	context.save();
	context.translate(3, -ARMLENGTH+15);
	context.rotate(-1.57079633);
	sword(context);
	context.restore();
	context.restore();
}
function skeleton(context){
//draws the skeleton that hangs off the front of the ship
	context.save();
	context.translate(0, (10+2)*6);
	skull(context);
	context.restore();
	spine(context);
	ribs(context);
	boneArm(context);
}
function clearBackground(context){
	context.fillStyle = "rgb(0,0,255)";
	//draw rectangle

	//draw background
	//context.fillRect(0,0,1048,700);
//context.fillRect(-524, -350, 1048, 700);
	context.fillRect(-524,-350,1048,700);
//	context.fillRect(-524*3,-350,1048*3,1000*3);
	//as you've probably figured out, this is not an exact number and any help on how to figure out what my true number should be would be greatly appreciated.  
}

return {
	clearBackground: clearBackground,
	skeleton: skeleton,
	drawPP: drawPP,
	mast: mast,
	rightEdge: rightEdge,
	leftEdge: leftEdge,
	deck: deck,
	drawChest: drawChest,
	drawEP: drawEP,
	skullAndCrossSwords: skullAndCrossSwords
};

}());