DROP DATABASE miadb;
CREATE DATABASE miadb;

USE miadb;

CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
email VARCHAR(70) NOT NULL UNIQUE,
telefone VARCHAR(20) NOT NULL UNIQUE,
cpf VARCHAR(14) NOT NULL UNIQUE,
senha VARCHAR(255) NOT NULL,
bloqueado BOOLEAN DEFAULT 0
);

CREATE TABLE gato(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(30) NOT NULL,
raca ENUM("srd", "abyssinian", "aphrodite_giant", "aegean", "american_bobtail", 
    "american_curl", "american_shorthair", "american_wirehair", "arabian_mau", 
    "australian_mist", "balinese", "bambino", "bengal", "birman", "burmese", 
    "bombay", "brazilian_shorthair", "british_longhair", "british_shorthair", 
    "burmilla", "california_spangled", "chantilly_tiffany", "chartreux", 
    "chausie", "colorpoint_shorthair", "cornish_rex", "cymric", "devon_rex", 
    "donskoy", "egyptian_mau", "european_shorthair", "exotic_shorthair", 
    "german_rex", "havana_brown", "highlander", "himalayan", "japanese_bobtail", 
    "khao_manee", "korat", "kurilian_bobtail", "laperm", "lykoi", "maine_coon", 
    "manx", "minskin", "munchkin", "nebelung", "norwegian_forest", "ocicat", 
    "oriental_longhair", "oriental_shorthair", "persian", "peterbald", 
    "pixie_bob", "ragamuffin", "ragdoll", "russian_blue", "savannah", 
    "scottish_fold", "selkirk_rex", "serengeti", "siberian", "singapura", 
    "snowshoe", "somali", "sphynx", "thai", "tonkinese", "toyger", 
    "turkish_angora", "turkish_van", "ukrainian_levkoy", "york_chocolate"
) DEFAULT "srd",
idade ENUM("filhote", "jovem" , "adulto", "senior", "geriatrico") NOT NULL,
descricao TEXT NOT NULL,
sexo ENUM("Macho" , "Fêmea") NOT NULL,
porte ENUM("pequeno", "médio" , "grande") NOT NULL,
foto_principal TEXT,  
cadastrado BOOLEAN DEFAULT FALSE NOT NULL,
vacinado BOOLEAN DEFAULT FALSE NOT NULL,
id_usuario INT NOT NULL,
FOREIGN KEY (id_usuario) REFERENCES usuario (id)
);

CREATE TABLE pedido_adocao(
id INT PRIMARY KEY AUTO_INCREMENT,
data_horas DATETIME NOT NULL,
id_usuario INT NOT NULL,
id_gato INT NOT NULL,
status ENUM("pendente","recusado","feito", "em analise") DEFAULT "em analise",
FOREIGN KEY (id_usuario) REFERENCES usuario (id),
FOREIGN KEY (id_gato) REFERENCES gato (id)
);

SHOW DATABASES;
SHOW TABLES;
SHOW TABLES FROM usuario;
SHOW TABLES FROM gato;
SHOW TABLES FROM pedido_adocao;
DESC usuario;
DESC gato;
DESC pedido_adocao;
SELECT * FROM usuario;
SELECT * FROM gato;
SELECT * FROM pedido_adocao;
SELECT * FROM gato WHERE id=1;