<?php
    $fileName = $_POST['name'];
	if($file = fopen($fileName .'.txt',"w")){
		fclose($file);
		echo "YAY";
	}else{
		echo $fileName;
	}
	
	
?>