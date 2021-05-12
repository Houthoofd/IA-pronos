
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
  <div id="login">
    <form action="post">
      <div class="input_login">
        <label for="phone">Pseudonyme</label>
        <input type="text" class="input"></br>
      </div>
      <div class="input_login">
        <label for="phone">Mot de passe</label>
        <input type="text" class="input"></br>
      </div>
      <a href="inscription.php">Toujours pas de compte ? Cliquer <strong>ici</strong></a>
      <button type="submit">Se connecter</button>
    </form>
  </div>
  </body>
  <script src="js.js"></script>
</html>
