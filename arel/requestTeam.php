<?php

  $id = $_POST['uName'];
  $lat = $_POST['lat'];
  $longi = $_POST['longi'];
  $alt = $_POST['alt'];
  $vivo = $_POST['vivo'];
  $positions = array();
	
  function replace_archivo($team) {
    $file = fopen($team .'.txt',"w");
    //En ciclo hasta que el lock se haga, luego se libera.
    while(!flock($file,LOCK_SH)){
      //Not yet
    }
    $lines = file($team .'.txt');
    flock($file,LOCK_UN);
    $i = 0;
    $exists = false;
    while($i < sizeof($lines)){
      $words = explode(",", $lines[$i], 5);
      if($words[0] == $GLOBALS['id']){
        $lines[$i] = $words[0] .",". $GLOBALS['lat'] .",". $GLOBALS['longi'] .",". $GLOBALS['alt'] . "," . $GLOBALS['vivo'] . "\n";
        $exists = true;
        break;
      }
      $i++;
    }
    if(!$exists) {
      array_push($lines, $GLOBALS['id'] .",". $GLOBALS['lat'] .",". $GLOBALS['longi'] .",". $GLOBALS['alt'] . "," . $GLOBALS['vivo'] . "\n");
    }
    $newContent = implode('', $lines);
    //En ciclo hasta que el lock se haga, luego se libera.
    while(!flock($file,LOCK_EX)){
      //Not yet
    }
	file_put_contents($file, $newContent, LOCK_EX);
    flock($file,LOCK_UN);
    fclose($file);
  }

  //Funcion que lee el archivo enemigo y toma las coordenadas
  
  function read_file($team) {
    $file = fopen($team .'.txt',"r");
    //En ciclo hasta que el lock se haga, luego se libera.
    while(!flock($file,LOCK_SH)){
      //Not yet
    }
    
    while (($line = fgets($file)) != false) {
      $words = explode(',', $line, 5);
      if(rtrim($words[4]) == '1') {
        array_push($GLOBALS['positions'],[$words[1], $words[2],$words[3]]);
      }
    }
    flock($file,LOCK_UN);
    fclose($file);
  }

  replace_archivo($_POST['team']);

  //Se lee el archivo enemigo

  if($_POST['team'] == 1) {
    read_file('2');
  } else {
    read_file('1');
  }



  echo json_encode($positions);

?>