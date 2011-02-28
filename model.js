var current = [];

function pirate(typeChar)
{
	this.dead = false; //"I'm not dead yet"
	this.type = typeChar;
	this.pos = 0;
	this.faceRight;//will distinguish between facing right and left
	if(typeChar == 'p')
		this.faceRight = true;
	else
		this.faceRight = false;
	this.leg = 20.0;//the right leg and left leg are at symmetric angles
	this.arm = 90.0;
	this.body = 0.0;
	this.legSwing = true;//true is right leg swinging forward
	this.action = 'a';//s = swing, h = hit, a = base action
	this.completion = 0;//keeps track of what point in the swinging action we are in
	this.setPos = function(x){
		this.pos = x;
	};		
	this.moveR = function(){
		if(this.action == 'h')//we do not interupt hit action
			return;
		if(this.faceRight)
		{
			this.pos += 8;
			if(Math.abs(this.leg)>= 20){
				this.legSwing = !this.legSwing;
			}
			if(this.legSwing){
				this.leg += 10.0;
			}
			else{
				this.leg -= 10.0;
			}
		}
		else{
			this.faceRight = true;
		}
		this.continueAction();
	};		
	this.moveL = function(){
		if(this.action == 'h')//we do not interupt hit action
			return;
		if(!this.faceRight)
		{
			this.pos -= 8;
			if(Math.abs(this.leg)>= 20){
				this.legSwing = !this.legSwing;
			}
			if(this.legSwing){
				this.leg += 10.0;
			}
			else{
				this.leg -= 10.0;
			}
		}
		else{
			this.faceRight = false;
		}
		this.continueAction();
	};		
	this.beHit = function(){
		this.action = 'h';
		this.completion = 0;
		this.continueAction();
	};
	this.swing = function(){
		//will ignore command if already swinging
		if(this.action == 'a')//we do not interupt hit action
		{
			this.action = 's';
			this.completion = 0;
			this.continueAction();//changes arm level to fit the action
		}
	};
	this.armLevel = function(){
		return this.arm*Math.PI/180;//angle the arm is being held at
	};
	this.rLeg = function(){//angle of right leg
		if(this.legSwing){
			return this.leg*Math.PI/180;
		}
		else{
			return -1*this.leg*Math.PI/180;
		}
	};
	this.lLeg = function(){//angle of left leg
		if(!this.legSwing){
			return this.leg*Math.PI/180;
		}
		else{
			return -1*this.leg*Math.PI/180;
		}
	};
	this.faceR = function(){
		return this.faceRight;
	};
	this.continueAction = function(){
	//continues the motion of swinging the sword
	//notes: there are 4 basic parts of the swing set apart by 4 different fourths of 100: upswing > 90, 
	//downswing > 90, downswing < 90, and upswing < 90
		if(this.completion >=100){
			this.action = 'a';
			return;
		}
		switch(this.action){
			case 'a':
				return;
				break;
			case 's':
				if(this.completion<25)//upswing >90
					this.arm = 90 + (this.completion/6.25*5.0);
				if(this.completion>=25&&this.completion<50)//downswing>90
					this.arm = 110 - ((this.completion-25)/6.25*5.0);
				if(this.completion>=50&&this.completion<75)//downswing<90
					this.arm = 90 - ((this.completion-50)/6.25*15.0);
				if(this.completion>=75&&this.completion<100)//downswing>90
					this.arm = 30 + ((this.completion-75)/6.25*15.0);
				this.completion += 6.25;
				break;
			case 'h':
				this.body = (this.completion/20*5.625);//9 degrees is 1/5 of 45
				this.completion += 12.5;
				if(this.completion >=100)
					this.dead = true;
				break;
			case 'b':
				this.arm = 60;
				this.completion += 6.25;
			default:;
		};
	};
	this.getPos = function(){
		return this.pos;
	};
	this.bodyAngle = function(){
		return this.body *Math.PI/180;
	};
	this.isDead = function(){
		return this.dead;
	};
	this.isSwing = function(){
		return this.action == 's';
	};
	this.completeLevel = function(){
		return this.completion;
	};
	this.block = function(){
		//will ignore command if already swinging
		if(this.action != 'h')//we do not interupt hit action
		{
			this.action = 'b';
			this.completion = 0;
			this.continueAction();//changes arm level to fit the action
		}
	};
}

function cell(typeChar)
{
	this.type = typeChar;
	this.pp = null;
	this.eps = [];
	this.objects = new Array();
	this.changeType = function(x){
		this.type = x;
	};
	this.theType = function(){
		return this.type;
	};
	this.hasMast = function(){
		for(var i = 0; i<this.objects.length; i++){
			if(this.objects[i]=='m')
				return true;
		}
	};
	this.hasChest = function(){
		for(var i = 0; i<this.objects.length; i++){
			if(this.objects[i]=='t')//t for treasure
				return true;
		}
	};

	this.ppPos = function(){
		return this.pp.getPos();
	};
	this.numEP = function(){
		return this.eps.length;
	};
	this.epPos = function(x){
		return this.eps[x].getPos();
	};
	this.addObj = function(x){
		this.objects[this.objects.length] = x;	
	};
	this.addEP = function(){
		var temp = new pirate('e');
		this.eps[this.eps.length] = temp;//adds EP to the center of cell
	};
	this.setPP = function(loc){
		if(this.pp == null)
			this.pp = new pirate('p');
		this.pp.setPos(loc);
	};
	this.receivePP = function(borderingCell){
	//precondition: borderingCell must contain the pp
	//postcondition: this cell will contain pp, and the borderingCell will not
		this.pp = borderingCell.pp;
		borderingCell.pp = null;
	};
	this.setEP = function(num, loc){
		this.eps[num].setPos(loc);
	};
}

function loadStruct(){
	this.id = 0;
	this.theCell = new cell();
}