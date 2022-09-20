<?php


function error($str){
    http_response_code(400);
    die(json_encode([
		'status' => 'error',
		'reason' => $str
	]));
}

function ok($data){
    die(json_encode([
		'status' => 'ok',
		'execTime' => round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7),
		'data' => $data
	]));
}



function validFloat($val){
	if(!$val === null){ return; }
	$val = strval($val);
	if(strlen($val) > 5){return; }
	$val = str_replace(',', '.', $val);
    if(!is_numeric($val)){return;}
	$val = floatval($val);
	return $val;
}

function check($y, $x, $r){
	$triangle = ($x >= 0 && $y <= 0 && $x <= ($r/2) && $y >= -($r/2) && $y <= $r - $x);
	$rectangle = ($x >= 0 && $y >= 0 && $y <= $r / 2 && $x <= $r);
	$sector = ($x <= 0 && $y >= 0 && ($x * $x + $y * $y <= $r * $r));
	if ($triangle | $rectangle | $sector){return 'Hit';}
	else{return 'Miss';}
}


$y = $_GET['y'] ?? null;
$r = $_GET['r'] ?? null;
$x = $_GET['x'] ?? null;




$y = validFloat($y);
if((!$y and !($y == 0)) | $y < -3 | $y > 5){ error('invalid y'); }

$r = validFloat($r);
$rItems = [1,1.5,2,2.5,3];
if(!$r | !in_array($r, $rItems)){ error('invalid r'); }

$x = validFloat($x);
$xItems = [-3,-2,-1,0,1,2,3,4,5];
if((!$x and !($x == 0)) | !in_array($x, $xItems)){ error('invalid x'); }

$hit = check($y, $x, $r);

ok([
	'y' => $y,
	'r' => $r,
	'x' => $x,
	'hit' => check($y, $x, $r)
])



?>