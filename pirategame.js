(function(){
var deathj = 0;
var sFactor = 1.0;
var tFactor = 1.0;
var shimmer = 0;
var ppRight;
var ppLeft;
var ppSword;
var treasureCell;//this is the cell where the treasure chest is found.  The cell number is in respect to the world
var toSwing;//eps get more tired than the pp so they can swing only a quarter as fast as they can move
var startScreen = false;
var world = new Array();//9 cell array;

var deathTmr;
var inDeathFunc = false;
function deathFunc(){
	if(inDeathFunc)
		return;
	inDeathFunc = true;
	sFactor = 1.0;
	deathj = 0;
	clearInterval(drawTmr);
	clearInterval(backgroundTmr);
	clearInterval(AITmr);
	currEvent = currEvent && currEvent.stop();
	deathTmr = setInterval(drawDeathFunc, 10);
}

function drawDeathFunc()
{
	if( deathj>100)
	{
		clearInterval(deathTmr);
		return;
	}
	// Get the canvas element.
	var elem = document.getElementById('myCanvas');
	if (!elem || !elem.getContext) {
		return;
	  }

	// Get the canvas 2d context.
	var context = elem.getContext('2d');
	if (!context) {
 		return;
	}
	sFactor *= 1.05;
	context.save();
	context.scale(sFactor, sFactor);
	skullAndCrossSwords(context, sFactor);
	context.restore();

	deathj++;
}

var winTmr;
var inWinFunc = false;
var winJ = 0;
function winFunc(){
	if(inWinFunc)
		return;
	inWinFunc = true;
	sFactor = 1.0;
	tFactor = 0;
	winj = 0;
	clearInterval(drawTmr);
	clearInterval(backgroundTmr);
	clearInterval(AITmr);
	winTmr = setInterval(drawWinFunc, 10);
}

function drawWinFunc()
{
//precondition: current[0] is the treasureCell which is of type 'r'
//postcondition: a special win animation has been displayed
	if(winJ >=75)
		return;


	// Get the canvas element.
	var elem = document.getElementById('myCanvas');
	if (!elem || !elem.getContext) {
		return;
	  }

	// Get the canvas 2d context.
	var context = elem.getContext('2d');
	if (!context) {
 		return;
	}
	clearBackground(context);
	drawPP(context);
	context.save();	
	context.save();
	context.translate(-current[1].theCell.ppPos() - 1048, 0);
	deck(context);
	context.restore();
	context.translate(-current[1].theCell.ppPos(), 0);//translates 0 1048 to the left, 1 nowhere, and 2 1048 to the right, and all translated by ppPos
	rightEdge(context);
	if(winJ<=50){
		tFactor += 5;
	}
	else{
		sFactor *= 1.3;
	}
	context.save();
	context.translate(0, tFactor);
	context.scale(sFactor, sFactor);
	context.save();
	drawChest(context);
	context.restore();
	context.restore();
	context.restore();
	winJ++;
}

PERFDEBUG = true;

function drawEvent(){
  if(PERFDEBUG)var initDrawTime = Date.now();
  var elem = document.getElementById('myCanvas');
  if (!elem || !elem.getContext) {
    return;
  }

  // Get the canvas 2d context.
  var context = elem.getContext('2d');
  if (!context) {
    return;
  }
  if(PERFDEBUG)console.log("getcontext: " + (Date.now() - initDrawTime));
  if(PERFDEBUG)var startDrawTime = Date.now();

if(startScreen)
{
	context.fillStyle = "rgb(0,0,0)";
	context.fillRect(0,0,1048,700);
	context.save();
	context.scale(2.0, 2.0);
	skullAndCrossSwords(context, 2.0);
	context.restore();

/*		Opera has no draw text yet, so this won't be done
glColor3f(1,1,1);
		glRasterPos2f(-SCREENENDX +50, SCREENENDY-50);
		char *theString = "Pirates: Press Any Key To Play";
		for(int i= 0; i<30; i++)
			glutBitmapCharacter(GLUT_BITMAP_TIMES_ROMAN_24, theString[i]);
		glFlush();
		glutSwapBuffers();
		return;
*/
}

  clearBackground(context);
  if(PERFDEBUG)console.log("clearBackground: " + (Date.now() - startDrawTime));
  if(PERFDEBUG)startDrawTime = Date.now();

	for(var i=0; i<3; i++){
  if(PERFDEBUG)console.log("since last loop: " + (Date.now() - startDrawTime));
  if(PERFDEBUG)startDrawTime = Date.now();

		context.save();
		context.translate(-current[1].theCell.ppPos() + 1048*( i-1 ), 0);//translates 0 1048 to the left, 1 nowhere, and 2 1048 to the right, and all translated by ppPos
		var t1 = current[i];
		var t2 = t1.theCell;
		var t3 = t2.theType()
		switch(current[i].theCell.theType()){
			case 'l':
				leftEdge(context);
				break;
			case 'd':
				deck(context);
				break;
			case 'r':
				rightEdge(context);
				break;
			default:;
		};
		if( current[i].theCell.hasMast() ){
			mast(context);
		}		
		if( current[i].theCell.hasChest() ){
			context.save();
			drawChest(context);
			context.restore();
		}
		context.restore();
if(PERFDEBUG)console.log("ship: " + (Date.now() - startDrawTime));
if(PERFDEBUG)startDrawTime = Date.now();

		
		if(i == 1 && current[1].theCell.pp != null && !current[1].theCell.pp.isDead()){
			context.save();
			if(!current[1].theCell.pp.faceR())
				reflect(context);
			drawPP(context);
			context.restore();
		}
  if(PERFDEBUG)console.log("drawPP: " + (Date.now() - startDrawTime));
  if(PERFDEBUG)startDrawTime = Date.now();

		var toBury = [];
		for(var j=0; j<current[i].theCell.numEP(); j++){
			if(current[i].theCell.eps[j].isDead()){
				toBury.push(j);//remove pirate from cell
				continue;//skip this pirate and go on to the next 
			}
			context.save();
			context.translate(-current[1].theCell.ppPos() + 1048*(i-1), 0);//translates 0 1048 to the left, 1 nowhere, and 2 1048 to the right, and all translated by ppPos
			context.translate(current[i].theCell.epPos(j), 0);
			if(!current[i].theCell.eps[j].faceR() )
				reflect(context);//has pirate face correct direction
			drawEP(context,i,j);
			context.restore();
		}
		for(var x=0; x<toBury.length; x++)//x is much like crossbones, fitting for a pirate's burial
			current[i].theCell.eps.splice(toBury[x],1);
			
  if(PERFDEBUG)console.log("drawEPs: " + (Date.now() - startDrawTime));
  if(PERFDEBUG)startDrawTime = Date.now();

	}
//not needed for canvas
//	glFlush();
//	glutSwapBuffers();
  if(PERFDEBUG)console.log("drawTime: " + (Date.now() - initDrawTime));
}

function proximity(cellNum, epNum){
//precondition: pp is at cell 1
//postcondition: the distance away from pp is returned
//notes: for each cell, the distance is distance to edge + distance to pp
//	alert("ppPos "<<current[1].theCell.ppPos()<<" epPos "<<current[cellNum].theCell.epPos(epNum));
	var distEdge;
	switch(cellNum){
		case 0:
			distEdge = (2*SCREENENDX - (current[cellNum].theCell.epPos(epNum) + SCREENENDX ) );
//			alert("0: "<<-(distEdge + (current[1].theCell.ppPos() + SCREENENDX) ));
			return -(distEdge + (current[1].theCell.ppPos() + SCREENENDX) );//negative number to signify negative direction
			break;
		case 1:
			distEdge = ( current[cellNum].theCell.epPos(epNum) + SCREENENDX) - ( current[1].theCell.ppPos() + SCREENENDX );
			if(distEdge> 2*SCREENENDX)
				alert("WOAH, messed up!!! " + distEdge);
//			cout<<"1: "<< ( ( current[cellNum].theCell.epPos(epNum) + SCREENENDX) - ( current[1].theCell.ppPos() + SCREENENDX ) )<<endl;
			return ( ( current[cellNum].theCell.epPos(epNum) + SCREENENDX) - ( current[1].theCell.ppPos() + SCREENENDX ) );//sign determines direction
			break;
		case 2:
			distEdge = (current[cellNum].theCell.epPos(epNum) + SCREENENDX);
//			cout<<"2: "<< (distEdge + (2*SCREENENDX - (current[1].theCell.ppPos() + SCREENENDX) ) )<<endl;

			return (distEdge + (2*SCREENENDX - (current[1].theCell.ppPos() + SCREENENDX) ) );
			break;
		default:;
	};
	return 0;
}

function checkPPHit(cellNum, epNum){
//precondition: pp is in current[1]
//postcondition: if pp is hit, pp will be set to hit
	var hitDist = proximity(cellNum, epNum);
	if(current[cellNum].theCell.eps[epNum].faceR()){//if facing right
		if( hitDist < 0 && hitDist >= -BODYWIDTH - 2*SWORDLENGTH/3){
			if(	current[1].theCell.pp.isSwing() ){
				current[1].theCell.pp.block();
				current[cellNum].theCell.eps[epNum].block();
			}
			else{
				current[1].theCell.pp.beHit();
			}
			return;//we only hit one pirate at a time
		}
	}
	else{//facing left
		if( hitDist>0 && hitDist <= BODYWIDTH + 2*SWORDLENGTH/3){
			if(	current[1].theCell.pp.isSwing() ){
				current[1].theCell.pp.block();
				current[cellNum].theCell.eps[epNum].block();
			}
			else{
				current[1].theCell.pp.beHit();
			}
			return;//we only hit one pirate at a time
		}
	}
}

function checkEPHit(){
//precondition: pp is in current[1]
//postcondition: if an ep is hit, that ep will be set to hit
	if(current[1].theCell.pp.faceR()){
		for(var i = 0; i<current[1].theCell.numEP(); i++){
			var distAway = proximity(1, i);
			if( distAway>0 && distAway <= BODYWIDTH + 2*SWORDLENGTH/3){
				current[1].theCell.eps[i].beHit();
				return;//we only hit one pirate at a time
			}
		}
		for(var i= 0; i<current[2].theCell.numEP(); i++){//checks any pirates who may have strayed from their cell
			var distAway = proximity(2, i);
			if( distAway>0 && distAway <= BODYWIDTH + 2*SWORDLENGTH/3){
				current[2].theCell.eps[i].beHit();
				return;//we only hit one pirate at a time
			}
		}
	}
	else{//facing left
		for(var i = 0; i<current[1].theCell.numEP(); i++){
			var distAway = proximity(1, i);
			if( distAway<0 && distAway >= -BODYWIDTH - 2*SWORDLENGTH/3){
				current[1].theCell.eps[i].beHit();
				return;//we only hit one pirate at a time
			}
		}
		for(var i= 0; i<current[0].theCell.numEP(); i++){//checks any pirates who may have strayed from their cell
			var distAway = proximity(0, i);
			if( distAway<0 && distAway >= -BODYWIDTH - 2*SWORDLENGTH/3){
				current[0].theCell.eps[i].beHit();
				return;//we only hit one pirate at a time
			}
		}
	}
}

function moveRight(){
	if(current[1].theCell.theType() == 'r' && current[1].theCell.ppPos() == 124){
		return;//we don't want to go off the ship
	}
	current[1].theCell.pp.moveR();
	if(current[1].theCell.ppPos() > SCREENENDX ){//go to next cell to the right
		current[2].theCell.receivePP(current[1].theCell);
		if(current[0].theCell.theType() != 'x')
			world[current[0].id] = current[0].theCell;//updates the world
		current[0].id = current[1].id;
		current[0].theCell = current[1].theCell;
		current[1].id = current[2].id;
		current[1].theCell = current[2].theCell;
		current[1].theCell.setPP(-SCREENENDX);//move pp to the far left side of the new cell

		if(current[2].id == world.length -1){
			var temp = new cell('x');
			current[2].theCell = temp;
			current[2].id = world.length;
		}
		else{
			current[2].id++;//we load the next higher cell
			current[2].theCell = world[ current[2].id ];
		}
	}
	if(current[1].id == treasureCell){
		if(current[1].theCell.ppPos() >= -CHESTWIDTH/2 && current[1].theCell.ppPos() <= CHESTWIDTH/2){
			winFunc();
		}
	}
}

function moveLeft(){
	if(current[1].theCell.theType() == 'l' && current[1].theCell.ppPos() == -124){
		return;//we don't want to go off the ship
	}
	current[1].theCell.pp.moveL();
	if(current[1].theCell.ppPos() < -SCREENENDX ){//go to the next cell to the left
		current[0].theCell.receivePP( current[1].theCell );//the cell to the left receives the pp
		if(current[0].theCell.theType() != 'x')			
			world[current[2].id] = current[2].theCell;//updates the world
		current[2].id = current[1].id;
		current[2].theCell = current[1].theCell;
		current[1].id = current[0].id;
		current[1].theCell = current[0].theCell;
		current[1].theCell.setPP(SCREENENDX);//move pp to the far right side of the new cell
		if(current[0].id == 0){
			var temp = new cell('x');//we are unable to get into this cell, as we are stopped by the edge of the screen
			current[0].theCell = temp;
			current[0].id = -1;
		}
		else{
			current[0].id--;//we load the next lower cell
			current[0].theCell = world[ current[0].id ];
		}
	}
	if(current[1].id == treasureCell){
		if(current[1].theCell.ppPos() >= -CHESTWIDTH/2 && current[1].theCell.ppPos() <= CHESTWIDTH/2){
			winFunc();
		}
	}
}

function backGroundEvent(){
	if( current[1].theCell.pp.isDead() ){
		deathFunc();
	}
	current[1].theCell.pp.continueAction();
	if(current[1].theCell.pp.isSwing() && current[1].theCell.pp.completeLevel()>= 60){
		checkEPHit();
	}
	for(var i=0; i < current.length; i++){
		for(var j=0; j<current[i].theCell.numEP(); j++){
			current[i].theCell.eps[j].continueAction();
			if(	current[i].theCell.eps[j].isSwing() && current[i].theCell.eps[j].completeLevel()>=60 ){
				if( (i == 1) ||/*in pp's cell*/ 
					(i == 0 && current[0].theCell.eps[j].faceR() && current[0].theCell.epPos(j) + BODYWIDTH/2 + 2*SWORDLENGTH/3 > SCREENENDX)||/*swinging into pp's cell from left cell*/
					(i == 2 && !current[2].theCell.eps[j].faceR() && current[2].theCell.epPos(j) - BODYWIDTH/2 - 2*SWORDLENGTH/3 < -SCREENENDX)){/*swinging into pp's cell from right cell*/
					checkPPHit(i, j);
				}
			}
		}
	}
	shimmer++;
//	glutPostRedisplay();
//	glutTimerFunc(WAITTIME, backGroundEvent, 0);//resets timer to redraw again shortly
}

function AIEvent(){
  if(PERFDEBUG)var initDrawTime = Date.now();
	if(current[1].theCell.pp.isDead() ){
		alert("Garr!!! Yer lost to Davey Jones!!!");
	}
	for(var cellNum = 0; cellNum < 3; cellNum++){
		var currCell = current[cellNum].theCell;
		for(var epNum = 0, len = currCell.numEP(); epNum < len; epNum++){
			var distAway = proximity(cellNum, epNum);
			var absDistAway = Math.abs(distAway);
			if( absDistAway < 2*SWORDLENGTH ){
				if( toSwing %4 ==0 ){
					currCell.eps[epNum].swing();
				}
			}
			else if( absDistAway <= SCREENENDX ){//move towards pp
				var numEps = currCell.numEP();
				if(distAway<0){//is in negative direction
					var toMove = true;
					for(var i=0; i<numEps && toMove; i++){//quits early if toMove is changed
						if(i==epNum)
							continue;
						var epAway = proximity(cellNum, i);
						if(distAway + ARMLENGTH >= epAway - BODYWIDTH/2 && distAway < epAway){
							toMove = false;
						}

					}
					for(var i=0; i<numEps && toMove; i++){//check both your cell and the middle cell, skips out early if 
						if(i==epNum && cellNum ==1)
							break;//we have already tested 1 if this is the case
						var epAway = proximity(1, i);
						if(distAway + ARMLENGTH >= epAway - BODYWIDTH/2 && distAway<epAway){
							toMove = false;
						}
					}
					if(toMove)
						currCell.eps[epNum].moveR();
				}
				else{
					var toMove = true;
					for(var i=0; i<numEps; i++){
						if(i==epNum)
							continue;
						var epAway = proximity(cellNum, i);
						if(distAway - ARMLENGTH <= epAway + BODYWIDTH/2 && distAway >epAway)
							toMove = false;
					}
					for(var i=0; i<numEps && toMove; i++){//check both your cell and the middle cell, skips out early if 
						if(i==epNum && cellNum ==1)
							break;//we have already tested 1 if this is the case
						var epAway = proximity(1, i);
						if(distAway - ARMLENGTH <= epAway + BODYWIDTH/2 && distAway >epAway)
							toMove = false;
					}
					if(toMove)
						currCell.eps[epNum].moveL();
				}
			}
		}
	}
	toSwing++;
	  if(PERFDEBUG)console.log("ai event:" + (Date.now() - initDrawTime));
}

function createWorld(){
	var numPirates = 20 ;
	var numCells = 9;
	for(var i=0; i<numCells; i++)
	{
		world[i] = new cell();
		world[i].changeType('d');
		if( (i-1)%3 == 0)
			world[i].addObj('m');
	}
	world[0].changeType('l');
//	world[1].addObj('m');
//	world[4].addObj('m');
//	world[7].addObj('m');
	world[world.length - 1].changeType('r');

	treasureCell = world.length-1;
	world[treasureCell].addObj('t');//add treasure to ship
	for(var i=0; i<numPirates; i++){
		world[Math.floor(Math.random()*numCells)].addEP();//don't put eps where they can be off the ship's deck
	}
	for(var i= 0; i<numCells; i++){
		for(var j= 0; j<world[i].numEP(); j++){
			if(j%2 ==0)
				world[i].setEP(j, -SCREENENDX + 3*BODYWIDTH/2*j);
			else
				world[i].setEP(j, SCREENENDX - 3*BODYWIDTH/2*j);
		}
	}
}

var backgroundTmr;
var drawTmr;
var AITmr;

function recurringEvent(repeat) {
	var timer;
	return {
		start: function(){
			repeat();
			timer = setInterval(repeat, RECURTIME);
		},
		stop: function(){
			clearInterval(timer);
		}
	};
}

var currEvent = null;

function keyDown(e){
//precondition: current[1] contains pp
//postcondition: the keystroke will be interpreted in the graphics correctly
	currEvent = currEvent && currEvent.stop();
	var KeyID = (window.event) ? event.keyCode : e.keyCode;
	switch(KeyID)
	{
		case 37:
		case 97:
			currEvent = recurringEvent(moveLeft);
			currEvent.start();
			break;
		case 39:
		case 100:
			currEvent = recurringEvent(moveRight);
			currEvent.start();
			break;
		case 32:
		case 115:
			currEvent = recurringEvent(function(){current[1].theCell.pp.swing()});
			currEvent.start();
			break;
		default:
			currEvent = currEvent && currEvent.stop();			
	};	
}

function keyUp(){
	currEvent = currEvent && currEvent.stop();
}

function touchDown(e){
	currEvent = currEvent && currEvent.stop();
	if(e.touches.length === 1) {
		//move left or right
		if(e.touches[0].pageX > SCREENENDX /2){
			currEvent = recurringEvent(moveRight);
		} else {
			currEvent = recurringEvent(moveLeft);
		}
		currEvent.start();
	}
	else if(e.touches.length === 2) {
		currEvent = recurringEvent(function(){current[1].theCell.pp.swing()});
		currEvent.start();
	}
	e.preventDefault();
}
function touchUp(e){
	currEvent = currEvent && currEvent.stop();
	e.preventDefault();
}
window.addEventListener('load', function () {
	//window.addEventListener('keypress', keyEvent, false);
	window.addEventListener('keydown', keyDown, false);
	window.addEventListener('keyup', keyUp, false);
	// Get the canvas element.
	var elem = document.getElementById('myCanvas');
	if (!elem || !elem.getContext) {
		return;
	}
	elem.addEventListener('touchstart', touchDown, false);
	elem.addEventListener('touchend', touchUp, false);

	// Get the canvas 2d context.
	var context = elem.getContext('2d');
	if (!context) {
		return;
	}

	alert("Pirates: Click Ok to start.  \r\n A or left to move left.\r\n D or right to move right. \r\n S or space to swing.\r\n Battle the pirates and find the gold!");



	context.fillStyle = "rgb(0,0,255)";
	//draw rectangle
	context.fillRect(0,0,1048,700);

	//context.translate(500,300);


	//set up world like gluOrtho2D(-524.0, 524.0, -350.0, 350.0);
	context.translate(524,350);
	invert(context);
	context.save();

	toSwing = 0;

	//startScreen = true;
	toSwing = 0;
	createWorld();
	var temp = new loadStruct();
	temp.id = 0;
	temp.theCell = world[temp.id];
	current[0] = temp;
	temp = new loadStruct();
	temp.id = 1;
	temp.theCell = world[temp.id];
	current[1] = temp;	
	current[1].theCell.setPP(0);//the pp only exists in the current cells.  he is in the world, but not of the world... okay, I apologize for that one
	temp = new loadStruct();
	temp.id = 2;
	temp.theCell = world[temp.id];
	current[2] = temp;
	(function drawAndWait() {
		drawEvent();
		setTimeout(drawAndWait, DRAWTIME);
	}());
	backgrounfTmr = setInterval(backGroundEvent, WAITTIME);
	AITmr = setInterval(AIEvent, AITIME);


}, false);

}());
