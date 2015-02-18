<?php
	$arr = array();
	if($file = fopen('1.txt','r')){
		$arr['lat'] = fgets($file);
		$arr['longi'] = fgets($file);
		$arr['alt'] = fgets($file);
		echo json_encode($arr);
	}else{
		echo "SHIT";
	}

?>