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
    <div id="inscription">
      <form action="post">
        <div class="input_inscription">
          <label for="name">Nom</label>
          <input type="text" class="input"></br>
        </div>
        <div class="input_inscription">
          <label for="prenom">Prénom</label>
          <input type="text" class="input"></br>
        </div>
        <div class="input_inscription">
          <label for="phone">Pseudonyme</label>
          <input type="text" class="input"></br>
        </div>
        <div class="input_inscription">
          <label for="mail">E-mail</label>
          <input type="text" class="input"></br>
        </div>
        <div class="input_inscription">
          <label for="phone">N° Téléphone</label>
          <input type="text" class="input"></br>
        </div>
        <div class="input_inscription">
          <label for="date_naissance">Date de naissance</label>
          <input type="text" class="input"></br>
        </div>
        <div class="input_inscription">
          <label for="password">Mot de passe</label>
          <input type="text" class="input"></br>
        </div>
        <div class="input_inscription">
          <label for="second_validation">Confirmer mot de passe</label>
          <input type="text" class="input"></br>
        </div>
        <button type="submit">S'enregistrer</button>
      </form>
    <div>
    </body>
    <script src="js.js"></script>
  </html>
