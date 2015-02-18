<?php

  $balls = $_POST['balls'];
  $newBalls = strval(0);
	
  function replace_archivo($team) {
    
    //En ciclo hasta que el lock se haga, luego se libera.
    $lines = file($team . '.txt');
	  $new = $GLOBALS['balls']. "\n";
    if(sizeof($lines) > 0){
        $val = intval(rtrim($lines[0]))+intval($GLOBALS['balls']);
        $new = strval($val) . "\n";
    }

	file_put_contents($team . '.txt', $new, LOCK_EX);

  }

  //Funcion que lee el archivo enemigo y toma las coordenadas
  
  function read_file($team) {
    $lines = file($team . '.txt');
    $new = strval(0) . "\n";
    if(sizeof($lines) > 0){
        $GLOBALS['newBalls'] = rtrim($lines[0]);
    }
    file_put_contents($team . '.txt', $new, LOCK_EX);
  }

  replace_archivo($_POST['team']);

  //Se lee el archivo enemigo

  if($_POST['team'] == 1) {
    read_file('2');
  } else {
    read_file('1');
  }



  echo json_encode($newBalls);

?>