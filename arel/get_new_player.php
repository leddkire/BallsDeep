<?php
	$equipo = mt_rand(1, 2);
	$file = "'$equipo'.txt";
	// Contamos cuantos jugadores hay en el equipo contando el numero de lineas
	$jugadores_actuales = intval(exec("wc -l '$file'"));
	$id_jugador = $jugadores_actuales + 1;
	$file = fopen('file','a');
retry:
	if (!flock($file, LOCK_EX))
		goto retry;
	$string = $id_jugador.",".$_POST["lat"].","$_POST["longi"].",".$_POST["alt"]
	fclose($file);
	echo ($id_jugador);

?>