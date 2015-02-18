
var xmlhttp;
var hand;
var user="";
var start = false;
var lat = 0.0;
var longi = 0.0;
var alt = 0.0;
var team = 0;
var id = 0;
var vivo = 1;
var shooter;
var yourBalls = 0;
var balls = 0;
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
	

	arel.Scene.getLocation(function(location){
		lat = location.getLatitude();
		longi = location.getLongitude();
		alt = location.getAltitude();
		xmlhttp.onreadystatechange=function(){
		  	if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				alert(xmlhttp.responseText);
				var obj = JSON.parse(xmlhttp.responseText);
				id = obj[0];
				team = obj[1];
				new Handler(team,id);
			}
	  	}
		xmlhttp.open("POST","get_new_player.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		
		xmlhttp.send("lat="+lat+"&longi="+longi+"&alt="+alt+"&vivo="+vivo);
	});

	// xmlhttp.onreadystatechange=function()
	// 	  {
		  
		  
	// 	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	// 		{
	// 			alert(xmlhttp.responseText);
	// 			var obj = JSON.parse(xmlhttp.responseText);
	// 			this.team = obj.team;
	// 			this.id = obj.id;
				
	// 			new Handler(this.team,this.id);
	// 		}
	// 	  }
	// 	xmlhttp.open("POST","get_new_player.php",true);
	// 	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		
	// 	xmlhttp.send();
	
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
  

 

function Handler(team,id){
	
	this.ball = undefined;
	var t = team;
	var user = id;
	var lat;
	var longi;
	var alt;
	
	this.init = function(){
		var that = this;
		this.ball = arel.Scene.getObject("ball");
			//this.blaster = arel.Scene.getObject("legoBlaster");
			
			//register object event handler to the trooper
			arel.Events.setListener(this.ball, function(obj, type, params) {this.handleBallsEvents(obj, type, params);}, this);
		this.refreshList();
		//arel.Events.setListener(this.firstLoc, function(obj,type,params){this.handlePositions(obj,type,params);},this);
		
	};
	
	this.handleBallsEvents = function(obj, type, params)
	{
		if(type && type == arel.Events.Object.ONREADY)
		{
			//arel.Media.startSound("/resources/mambo.mp3")
		}else if(type && type == arel.Events.Object.ONTOUCHSTARTED)
		{
			yourBalls = yourBalls - 1;
			document.getElementById("header").innerHTML = "x"+ yourBalls.toString();
			arel.Scene.removeObject(obj);
			balls = balls + 1;
		}
		//arel.Media.stopSound("/resources/mambo.mp3");
	};
	
	this.refreshList = function(){
	var that = this;
	if(yourBalls >=20){
		vivo = 0;
	}
	arel.Scene.getLocation(function(location){
		lat = location.getLatitude()/1;
		longi = location.getLongitude();
		alt = location.getAltitude();
		xmlhttp.onreadystatechange=function()
		  {
		  
		  
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				
				//alert(xmlhttp.responseText);
				var obj = JSON.parse(xmlhttp.responseText);
					for(int i =0; i< obj.balls; i++){
						var newBall = arel.Object.Model3D.create(new Date().valueOf() + "_" + arel.Scene.getNumberOfObjects(),"/resources/ball.obj","/resources/icecream_texture.jpg");
						arel.Events.setListener(newBall, function(obj, type, params) {that.handleBallsEvents(obj, type, params);}, that);
						var randomNumberX = Math.floor((Math.random() * 600) - 300);
						var randomNumberY = Math.floor((Math.random() * 600) - 300);
						newBall.setTranslation(new arel.Vector3D(randomNumberX,randomNumberY,0));
						newBall.setScale(new arel.Vector3D(50,50,50));
						arel.Scene.addObject(newBall);
						
						document.getElementById("header").innerHTML = "x"+ yourBalls.toString();
						
					
					}
					yourBalls = yourBalls + obj.balls;
					balls = 0;
			}
		  }
		xmlhttp.open("POST","requestTeam.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("balls="+balls);
	});	
		
		if(vivo){
			var that = this;
			setTimeout(function(){that.refreshList();},2000);
		}else{
			alert("Perdiste. Reinicie el canal para volver a jugar");
		}	
			
		
		
	};
	this.init();
	
}




