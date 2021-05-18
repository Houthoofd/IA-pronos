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
    <?php include 'process_inscription.php'; ?>
    <div id="inscription">
      <form action="process_inscription.php" action="post">
        <div class="input_inscription">
          <label for="name">Nom</label>
          <input type="text" class="input" name="nom"></br>
        </div>
        <div class="input_inscription">
          <label for="prenom">Prénom</label>
          <input type="text" class="input" name="prenom"></br>
        </div>
        <div class="input_inscription">
          <label for="phone">Pseudonyme</label>
          <input type="text" class="input" name="pseudo"></br>
        </div>
        <div class="input_inscription">
          <label for="mail">E-mail</label>
          <input type="text" class="input" name="mail"></br>
        </div>
        <div class="input_inscription">
          <label for="phone">N° Téléphone</label>
          <input type="text" class="input" name="phone"></br>
        </div>
        <div class="input_inscription">
          <label for="date_naissance">Date de naissance</label>
          <input type="text" class="input" name="naissance"></br>
        </div>
        <div class="input_inscription">
          <label for="password">Mot de passe</label>
          <input type="text" class="input" name="password"></br>
        </div>
        <div class="input_inscription">
          <label for="second_validation">Confirmer mot de passe</label>
          <input type="text" class="input" name="confirme_password"></br>
        </div>
        <button type="submit" name="register">S'enregistrer</button>
      </form>
    <div>
    </body>
    <script src="js.js"></script>
  </html>
