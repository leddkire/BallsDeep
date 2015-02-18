<?php
/**
 * @copyright  Copyright 2012 metaio GmbH. All rights reserved.
 * @link       http://www.metaio.com
 * @author     Frank Angermann
 * 
 * @abstract	This tutorial gives you a basic understanding of image recogination with junaio and working with animated md2 models. 
 * 				You will need the metaio man image.
 * 				
 * 				Learnings:
 * 					- overlay a 3D model on an image
 * 					- show html information on which image to track
 * 					- hide and display the "what to track" information based on tracking events
 * 					- start an animation based on touchstart (click) event of the object
 * 					- start an animation based on animation ended event of the object 
 **/

require_once '../ARELLibrary/arel_xmlhelper.class.php';
 
/**
 * When the channel is being viewed, a poi request will be sent
 * $_GET['l']...(optional) Position of the user when requesting poi search information
 * $_GET['o']...(optional) Orientation of the user when requesting poi search information
 * $_GET['p']...(optional) perimeter of the data requested in meters.
 * $_GET['uid']... Unique user identifier
 * $_GET['m']... (optional) limit of to be returned values
 * $_GET['page']...page number of result. e.g. m = 10: page 1: 1-10; page 2: 11-20, e.g.
 **/
 
//use the Arel Helper to start the output with arel

//start output
ArelXMLHelper::start(NULL, "/arel/index.html");

//2. Image POI
$oObject = ArelXMLHelper::createLocationBasedPOI(
		"2", //id
		"Hello Image POI", //title
		array(48.12325, 11.218691, 0), //location
		"/resources/thumb_image.png", //thumb
		"/resources/icon_image.png", //icon
		"This is our Image POI\n\nThe image source is: http://www.flickr.com/photos/ediamjunaio/5206110815/", //description
		array(array("Show Image", "imageButton", "http://farm5.static.flickr.com/4104/5206110815_7ea891be0b.jpg")) //buttons
	);

//output the object
ArelXMLHelper::outputObject($oObject);
//end the output
ArelXMLHelper::end();

?>