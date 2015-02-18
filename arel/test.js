
var xmlhttp;
var hand;
var user="";
var start = false;
var lat = 0.0;
var longi = 0.0;
var alt = 0.0;
var team = 0;
var id = 0;
var shooter;
var yourBalls = 0;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }

arel.sceneReady(function()
{
	//Just for Debuging purposes
	//arel.Debug.activate();
	//arel.Debug.deactivateArelLogStream();
	//shooter = new Shooter();
	
	xmlhttp.onreadystatechange=function()
		  {
		  
		  
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				alert(xmlhttp.responseText);
				var obj = JSON.parse(xmlhttp.responseText);
				this.team = obj.team;
				this.id = obj.id;
				
				new Handler(this.team,this.id);
			}
		  }
	xmlhttp.open("POST","requestTeam.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		
		xmlhttp.send();
	
	/*	
	arel.Scene.getLocation(function(location){
		this.lat = location.getLatitude()/1;
		this.longi = location.getLongitude();
		this.alt = location.getAltitude();
           //create new POI/billboard
                    //var lol = new arel.Object.POI();
                   // var LLA = new arel.LLA(lat,longi,alt,1);
                    //lol.setID("1");
                    //lol.setTitle("12");
                    //lol.setLocation(LLA);
                    //lol.setVisibility(true,true,true);
		});	
	*/
		
	
},true);  
  

  
function Shooter()
{
	this.ball = undefined;
		
	/*ADVANCED*/
	//make sure that the object was not hit
	this.objectHit = [];
		
	this.init = function()
	{
		try
		{
			//get the trooper and the blaster
			this.ball = arel.Scene.getObject("ball");
			//this.blaster = arel.Scene.getObject("legoBlaster");
			
			//register object event handler to the trooper
			arel.Events.setListener(this.ball, function(obj, type, params) {this.handleBallsEvents(obj, type, params);}, this);
			this.addNewBall();			
			//start the idle animation of the blaster
			/*this.blaster.startAnimation("idle", true);
			this.trooper.startAnimation("appear");
			//set a timer to let the trooper shoot after 3s
			var that = this;
						
		
			//every 10 seconds add a new trooper at a random position
			setTimeout(function(){that.addNewTrooper();}, 10000);*/
		}
		catch(e)
		{
			arel.Debug.error("init " + e);
		}
	};

	this.handleBallsEvents = function(obj, type, params)
	{
		if(type && type == arel.Events.Object.ONREADY)
		{
			arel.Media.startSound("/resources/mambo.mp3")
		}else if(type && type == arel.Events.Object.ONTOUCHSTARTED)
		{
			yourBalls = yourBalls + 1;
			document.getElementById("header").innerHTML = "x"+ yourBalls.toString();
			arel.Scene.removeObject(obj);
		}
		//arel.Media.stopSound("/resources/mambo.mp3");
	}
	
	this.handleTrooperEvents = function(obj, type, params)
	{
		/*ADVANCED*/
		//this is only called once the second trooper is loaded
		if(type && type == arel.Events.Object.ONREADY)
		{
			obj.startAnimation("appear");
			setTimeout(function(){that.trooper.startAnimation("fire", false);}, 4000);
		}
		else if(type && type == arel.Events.Object.ONANIMATIONENDED && params.animationname == "appear")
		{	
			var that = this;
			//now that the object has appeared, we can start the shooting
			arel.Events.setListener(this.blaster, function(obj, type, params) {this.handleBlasterEvents(obj, type, params);}, this);
			
			/*ADVANCED*/
			//have the trooper shoot after 4s (unless he is dead)
			//simple: setTimeout(function(){that.trooper.startAnimation("fire", false);}, 4000);
			setTimeout(function(){
				if($.inArray(obj.getID(), that.objectHit) === -1)
					obj.startAnimation("fire", false);}, 4000
			);	
		}
		else if(type && type == arel.Events.Object.ONANIMATIONENDED && params.animationname == "fire")
		{	
			//after the animation is done, wait another second to trigger it again
			setTimeout(function(){obj.startAnimation("fire", false);}, 4000);	
		}	
	};
	
	this.handleBlasterEvents = function(obj, type, params)
	{
		if(type && type == arel.Events.Object.ONTOUCHSTARTED)
		{			
			obj.startAnimation("fire");			
		}
		else if(type && type == arel.Events.Object.ONANIMATIONENDED && params.animationname == "fire")
		{
			//check if the model was hit
			//take the center of the screen
			var screenCoordinates = new arel.Vector2D();
			screenCoordinates.setX(0.5);
			screenCoordinates.setY(0.5);
			
			//check if in the center of the screen, something was hit
			arel.Scene.getObjectFromScreenCoordinates(screenCoordinates, function(objectID){ this.checkObjectHit(objectID); }, this);
			
			//go back to idling
			obj.startAnimation("idle", true);
		}		
	};

	this.addNewBall = function()
	{
		//only add a new trooper, if there are less than 5 + blaster + box 
		//if(arel.Scene.getNumberOfObjects() < 7)
		//{
			var that = this;
			var newBall = arel.Object.Model3D.create(new Date().valueOf() + "_" + arel.Scene.getNumberOfObjects(),"/resources/ball.obj","/resources/icecream_texture.jpg");
			
			//set an ID that is not given yet
			//newBall.setID(new Date().valueOf() + "_" + arel.Scene.getNumberOfObjects());
			
			//add a random value to the position (-1000 - 1000)
			var randomNumberX = Math.floor((Math.random() * 600) - 300);
			var randomNumberY = Math.floor((Math.random() * 600) - 300);
			console.log("ennananana");
			newBall.setTranslation(new arel.Vector3D(randomNumberX,randomNumberY,0));
			newBall.setScale(new arel.Vector3D(50,50,50));
			arel.Scene.addObject(newBall);

			arel.Events.setListener(newBall, function(obj, type, params) {this.handleBallsEvents(obj, type, params);}, this);
		//}
		
		//add another one in 10 seconds
		setTimeout(function(){that.addNewBall();}, 10000);
		
	};
	
	this.checkObjectHit = function(objectID)
	{
		//you hit it
		/*ADVANCED*/
		//simple: if(objectID !== "box"
		if(objectID !== "")
		{
			if(objectID !== "box" && $.inArray(objectID, this.objectHit))
			{
				//start the die animation and push the object on the stack of dead objects
				arel.Scene.getObject(objectID).startAnimation("die");
				this.objectHit.push(objectID) ;
				
				//remove this object after 4 seconds
				setTimeout(function(){arel.Scene.removeObject(objectID);}, 4000);
			}
		}		
	};
	
	this.init();
}

function Handler(team,id){
	

	var t = team;
	var user = id;
	var lat;
	var longi;
	var alt;
	
	this.init = function(){
		var that = this;
		this.refreshList();
		//arel.Events.setListener(this.firstLoc, function(obj,type,params){this.handlePositions(obj,type,params);},this);
		
	};
	
	this.handlePositions = function(obj,type,params){
		this.refreshList();
		
		
	};
	
	this.refreshList = function(){
	
	arel.Scene.getLocation(function(location){
		this.lat = location.getLatitude()/1;
		this.longi = location.getLongitude();
		this.alt = location.getAltitude();
		xmlhttp.onreadystatechange=function()
		  {
		  
		  
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				alert(xmlhttp.responseText);
				var obj = JSON.parse(xmlhttp.responseText);
				$.each(obj,function(key,eval){
					
				
				});
				this.team = obj.team;
				this.id = obj.id;
				new Handler(this.team,this.id);
			}
		  }
		xmlhttp.open("POST","requestTeam.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		
		xmlhttp.send("uName:"+this.id+"&team:"+this.t+"&lat:"+this.lat+"&longi"+this.longi+"&alt"+this.alt);
	});	
		
		
			
		
		var that = this;
		setTimeout(function(){that.refreshList();},2000);
	};
	this.init();
	
}




