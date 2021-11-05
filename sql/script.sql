-- Esse script vale para o MySQL 8.x. Se seu MySQL for 5.x, precisa executar essa linha comentada:
CREATE DATABASE IF NOT EXISTS cinemystik;
-- CREATE DATABASE IF NOT EXISTS cinemystik DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE cinemystik;

CREATE TABLE Filme (
  idFilme INT NOT NULL,
  Nome VARCHAR(45) NOT NULL,
  Ano INT NOT NULL,
  Diretor VARCHAR(45) NOT NULL,
  Sinopse VARCHAR(1500) NOT NULL,
  Genero VARCHAR(45) NOT NULL,
  SubGenero VARCHAR(45) NULL,
  PRIMARY KEY (idFilme))
ENGINE = InnoDB;