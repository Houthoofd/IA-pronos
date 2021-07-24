-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : Dim 18 juil. 2021 à 10:24
-- Version du serveur :  10.4.17-MariaDB
-- Version de PHP : 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `paris_sportifs_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `paris_encoder`
--

CREATE TABLE `paris_encoder` (
  `id` int(255) NOT NULL,
  `date_` varchar(255) NOT NULL,
  `event` varchar(255) NOT NULL,
  `sport` varchar(255) NOT NULL,
  `cote` int(100) NOT NULL,
  `mise` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `paris_encoder`
--

INSERT INTO `paris_encoder` (`id`, `date_`, `event`, `sport`, `cote`, `mise`, `status`) VALUES
(1, 'Nadal vs Féderer', 'Tennis', '2', 2, '10 euros', 'Validé'),
(2, 'jacqui la moula vs moulagaman', 'Football', '1.56', 2, '10 euros', 'Validé'),
(3, 'jacqui la moula vs moulagaman', 'Football', '1.56', 2, '10 euros', 'Validé'),
(4, 'jacqui la moula vs moulagaman', 'Football', '1.76', 2, '10 euros', 'Validé'),
(5, 'Nadal vs Féderer', 'Tennis', '1.76', 2, '10 euros', 'Validé'),
(6, 'Nadal vs Féderer', 'Tennis', '1.76', 2, '10 euros', 'Validé'),
(7, 'Eminem vs 50 cent', 'MMA', '1.45', 1, '10 euros', 'Validé'),
(8, 'Eminem vs 50 cent', 'MMA', '1.45', 1, '10 euros', 'Validé'),
(9, 'Eminem vs 50 cent', 'MMA', '1.45', 1, '10 euros', 'Validé');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `name` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `conf_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `paris_encoder`
--
ALTER TABLE `paris_encoder`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`name`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `paris_encoder`
--
ALTER TABLE `paris_encoder`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
