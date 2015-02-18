
var xmlhttp;
var hand;
var user="";
var start = false;
var lat = 0.0;
var longi = 0.0;
var alt = 0.0;
var team = 0;
var id = 0;
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
		
	
}true);  
  
function registerUser(form){
	this.user = form.uName.value;
	
}
  


function Handler(team,id){
	

	var t = team;
	var user = id;
	
	this.init = function(){
		var that = this;
		this.refreshList();
		//arel.Events.setListener(this.firstLoc, function(obj,type,params){this.handlePositions(obj,type,params);},this);
		
	};
	
	this.handlePositions = function(obj,type,params){
		this.refreshList();
		
		
	};
	
	this.refreshList = function(){

		if(this.name = ""){
			$.getJSON("get_list.php", function(data){
					/*alert(data.lat + ", " + data.longi + " ," + data.alt);*/
					
						var lol = new arel.Object.POI();
						var LLA = new arel.LLA(data.lat,data.longi,data.alt,1);
						lol.setID("1");
						lol.setTitle("LOL");
						lol.setLocation(LLA);
						lol.setVisibility(true,true,true);
						arel.Scene.addObject(lol);
			});
		}	
			
		
		var that = this;
		setTimeout(function(){that.refreshList();},2000);
	};
	this.init();
	
}




