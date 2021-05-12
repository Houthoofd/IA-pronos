<?php
$id = 0;
$event = ($_POST["event"]);
$sport = ($_POST["sport"]);
$date = ($_POST["date"]);
$cote = ($_POST["cote"]);
$mise = ($_POST["mise"]);
$status = ($_POST["status"]);

$data = array();
array_push($data, $event,$sport,$date,$cote,$mise,$status);
print_r($data);

?>
<html lang="en" dir="ltr">
  <head>
    <link rel="stylesheet" href="css.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    <meta charset="utf-8">
    <title>IA Pronos</title>
  </head>
  <body>
  <?php include 'components/header.php'; ?>
  <?php include 'components/navbar.php'; ?>
  <div class="encodage__container">
    <h3>Encoder vos paris</h3>
    <form method="post">
      <div class="encodage__container__input">
        <label for="event"></label>
        <input type="text" class="input-form" name="event" placeholder="Evènement"></br>
      </div>
      <div class="encodage__container__input">
        <label for="event"></label>
        <input type="text" class="input-form" name="date" placeholder="Date"></br>
      </div>
      <div class="encodage__container__input">
        <label for="event"></label>
        <input type="text" class="input-form" name="sport" placeholder="Sport"></br>
      </div>
      <div class="encodage__container__input">
        <label for="event"></label>
        <input type="text" class="input-form" name="cote" placeholder="Côte"></br>
      </div>
      <div class="encodage__container__input">
        <label for="event"></label>
        <input type="text" class="input-form" name="mise" placeholder="Mise"></br>
      </div>
      <div class="encodage__container__input">
        <label for="event"></label>
        <input type="text" class="input-form" name="status" placeholder="Status"></br>
      </div>
      <button type="submit">Encoder</button>
    </form>
  </div>
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

  <div class="encodage__container__table">
    <h3>Résultas</h3>
    <table>
      <thead>
        <tr>
          <td>N°</td>
          <td>Date</td>
          <td>Evènement</td>
          <td>Sport</td>
          <td>Côte</td>
          <td>Mise</td>
          <td>Status</td>
        </tr>
      </thead>
      <tbody>
        <tr class="result-row">
          <?php echo '<td>' . $id . '</td>';?>
          <?php echo '<td>' . $date . '</td>';?>
          <?php echo '<td>' . $event . '</td>';?>
          <?php echo '<td>' . $sport . '</td>';?>
          <?php echo '<td>' . $cote . '</td>';?>
          <?php echo '<td>' . $mise . '</td>';?>
          <?php echo '<td>' . $status . '</td>';?>
        </tr>
      </tbody>
    </table>
  </div>

  </body>
  <script src="js.js"></script>
</html>
