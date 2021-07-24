<?php
  //On écrit un premier texte dans notre fichier
  file_put_contents('datas.txt', 'Ecriture dans un fichier');

  //On récupère le contenu du fichier
  $texte = file_get_contents('datas.txt');

  //On ajoute notre nouveau texte à l'ancien
  $texte .= "\n**NOUVEAU TEXTE**";

  //On écrit tout le texte dans notre fichier
  file_put_contents('datas.txt', $id + 1 . ' ' . $event);
?>