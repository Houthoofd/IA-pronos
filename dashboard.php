<!DOCTYPE html>
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

  <div class="dashboard__container">
    <h3 class="title__dashboard">Statistiques</h3>
    <div class="dashboard__stats__container">
      <div id="average__odd" class="card">
        <h4>Côte de moyenne</h4>
        <span>1.45</span>
      </div>
      <div id="average__gain" class="card">
        <h4>Gain moyen</h4>
        <span>10.45 euros</span>
      </div>
      <div id="roi" class="card">
        <h4>Roi</h4>
        <span>1.45</span>
      </div>
      <div id="nbre__paris" class="card">
        <h4>Nombres de paris</h4>
        <span>100</span>
      </div>
      <div id="paris__perdus" class="card">
        <h4>Nombres de paris perdus</h4>
        <span>40</span>
      </div>
      <div id="paris__gagnes" class="card">
        <h4>Nombres de paris gagnés</h4>
        <span>60</span>
      </div>
    </div>
  </div>
  <div class="dashboard__charts__container">
    <h3>Graphiques</h3>
  </div>
  </body>
  <script src="js.js"></script>
</html>
