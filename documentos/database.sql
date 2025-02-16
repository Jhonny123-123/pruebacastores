CREATE DATABASE IF NOT EXISTS `pruebacastores` DEFAULT CHARACTER SET utf8 ;
USE `pruebacastores` ;

-- -----------------------------------------------------
-- Table `pruebacastores`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pruebacastores`.`roles` (
  `id_rol` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pruebacastores`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pruebacastores`.`usuarios` (
  `id_usuario` INT(6) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `correo` VARCHAR(255) NOT NULL,
  `contrasena` VARCHAR(255) NOT NULL,
  `id_rol` INT(11) NOT NULL,
  `estatus` INT(1) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  INDEX `fk_usuarios_roles1_idx` (`id_rol` ASC),
  CONSTRAINT `fk_usuarios_roles1`
  FOREIGN KEY (`id_rol`)
  REFERENCES `pruebacastores`.`roles` (`id_rol`)
)ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pruebacastores`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pruebacastores`.`productos` (
  `id_productos` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `cantidad` INT(11) NOT NULL DEFAULT 0,
  `estado` SMALLINT(6) NOT NULL DEFAULT 1,
  `id_usuario` INT(6) NOT NULL,
  PRIMARY KEY (`id_productos`),
  INDEX `fk_productos_usuarios_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_productos_usuarios`
  FOREIGN KEY (`id_usuario`)
  REFERENCES `pruebacastores`.`usuarios` (`id_usuario`)
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pruebacastores`.`historial`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pruebacastores`.`historial` (
  `id_historial` INT(11) NOT NULL AUTO_INCREMENT,
  `tipo` SMALLINT(6) NOT NULL,
  `cantidad` INT(11) NOT NULL,
  `fecha_hora` VARCHAR(255) NOT NULL DEFAULT NOW(),
  `id_productos` INT(11) NOT NULL,
  `id_usuario` INT(6) NOT NULL,
  PRIMARY KEY (`id_historial`),
  INDEX `fk_historial_productos1_idx` (`id_productos` ASC),
  INDEX `fk_historial_usuarios1_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_historial_productos1`
  FOREIGN KEY (`id_productos`)
  REFERENCES `pruebacastores`.`productos` (`id_productos`),
  CONSTRAINT `fk_historial_usuarios1`
  FOREIGN KEY (`id_usuario`)
  REFERENCES `pruebacastores`.`usuarios` (`id_usuario`)
) ENGINE = InnoDB;


INSERT INTO `roles` VALUES ('1', 'Administrador'), ('2', 'Almacenista');
INSERT INTO `usuarios` VALUES ('1', 'Jonathan Rojas', 'prueba@gmail.com', '1234', '1', '1'), ('2', 'Joaquin Rodriguez', 'joaquin@gmail.com', '1234', '2', '1');
