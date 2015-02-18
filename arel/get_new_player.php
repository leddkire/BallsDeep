<?php
	$jugadores_1 = intval(exec("wc -l 1.txt"));
	$jugadores_2 = intval(exec("wc -l 2.txt"));
	if ($jugadores_1 > $jugadores_2) {
		$equipo = 2;
		$n_file = "2.txt";
		$id_jugador = $jugadores_2 + 1;
	} else {
		$equipo = 1;
		$n_file = "1.txt";
		$id_jugador = $jugadores_1 + 1;
	}
	$file = fopen($n_file,'a');
retry:
	if (!flock($file, LOCK_EX))
		goto retry;
	$string = $id_jugador.",".$_POST["lat"].",".$_POST["longi"].",".$_POST["alt"].",".$_POST["vivo"]."\n";
	fwrite($file, $string);
	fclose($file);

	echo (json_encode(array($id_jugador, $equipo)));

?>