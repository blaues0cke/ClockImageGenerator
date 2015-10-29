<?php

function emptyFixed (&$toCheck)
{
	return empty($toCheck) && $toCheck !== 0 && $toCheck !== '0';
}

if (!empty($_POST['imageData']))
{
	$fileName = 'img/last-image.png';
	
	if (!emptyFixed($_POST['hour']) && !emptyFixed($_POST['minute']) && !emptyFixed($_POST['second']))
	{
		$fileName = 'img/'.$_POST['hour'].'_'.$_POST['minute'].'_'.$_POST['second'].'.png';
	}
	
	$image = base64_decode($_POST['imageData']);
	file_put_contents($fileName, $image);
	
	die($fileName);
}