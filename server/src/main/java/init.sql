CREATE TABLE category
(
  id   BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE product
(
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) UNIQUE NOT NULL,
  description TEXT                NOT NULL,
  image       VARCHAR(255),
  available_quantity DOUBLE NOT NULL,
  price DOUBLE NOT NULL,
  id_category BIGINT              NOT NULL,
  FOREIGN KEY (id_category) REFERENCES category (id)
);

CREATE TABLE address
(
  id           BIGINT AUTO_INCREMENT PRIMARY KEY,
  street       VARCHAR(255) NOT NULL,
  house_number VARCHAR(50)  NOT NULL,
  city         VARCHAR(255) NOT NULL,
  country      VARCHAR(255) NOT NULL
);

CREATE TABLE roles
(
  id   BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE customer
(
  id           BIGINT AUTO_INCREMENT PRIMARY KEY,
  first_name   VARCHAR(255)        NOT NULL,
  last_name    VARCHAR(255)        NOT NULL,
  birth_date   DATE                NOT NULL,
  phone_number VARCHAR(50)         NOT NULL,
  email        VARCHAR(255) UNIQUE NOT NULL,
  password     VARCHAR(255)        NOT NULL,
  created_at   DATE                NOT NULL,
  updated_at   DATE,
  id_role      BIGINT,
  id_address   BIGINT              NOT NULL,
  FOREIGN KEY (id_role) REFERENCES roles (id),
  FOREIGN KEY (id_address) REFERENCES address (id)
);

CREATE TABLE orders
(
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  order_date  DATE                NOT NULL,
  reference   VARCHAR(255) UNIQUE NOT NULL,
  total_amount DOUBLE NOT NULL,
  tax DOUBLE NOT NULL,
  delivery_price DOUBLE NOT NULL DEFAULT 0,
  id_customer BIGINT              NOT NULL,
  FOREIGN KEY (id_customer) REFERENCES customer (id)
);

CREATE TABLE orderline
(
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  quantity DOUBLE NOT NULL,
  id_order   BIGINT NOT NULL,
  id_product BIGINT NOT NULL,
  FOREIGN KEY (id_order) REFERENCES orders (id),
  FOREIGN KEY (id_product) REFERENCES product (id)
);

CREATE TABLE review
(
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT         NOT NULL,
  rating      INT          NOT NULL,
  id_customer BIGINT       NOT NULL,
  id_product  BIGINT       NOT NULL,
  FOREIGN KEY (id_customer) REFERENCES customer (id),
  FOREIGN KEY (id_product) REFERENCES product (id)
);


-- DATA INSERTION --------------------------------------------------------

INSERT INTO category (name)
VALUES ('hightech'),
       ('computer'),
       ('keyboard and mice'),
       ('headphone'),
       ('screen');

INSERT INTO product (name, description, image, available_quantity, price, id_category)
VALUES ('Wacom Graphics Tablet', 'A high-end graphic tablet for artists.', 'https://img.freepik.com/premium-vector/graphic-tablet-design-illustration-isolated-white-background_216222-93.jpg?w=826', 100, 400.0, 1),
       ('Connected Laser Sword', 'A futuristic connected laser sword.', 'https://img.freepik.com/premium-vector/purple-lightsaber-standing-upright-white-background_98402-210222.jpg?w=826', 50, 300.0, 1),
       ('GPS Navigator', 'Portable GPS device with advanced features.', 'https://img.freepik.com/premium-psd/smartphone-display-mockup_1310-1075.jpg?w=996', 200, 150.0, 1),
       ('Drone', 'A high-performance drone with camera.', 'https://img.freepik.com/free-photo/quadcopter-flying-park_231208-10455.jpg?t=st=1731356096~exp=1731359696~hmac=4532a3581186a5dec3632d1c133d694ebb9576b2328f90d41371141115415b28&w=996', 70, 500.0, 1),

       ('Asus Gaming Laptop', 'High performance gaming laptop with RTX graphics.', 'https://img.freepik.com/premium-photo/notebook-external-hard-drive_692498-7888.jpg?w=996', 30, 1200.0, 2),
       ('Dell Workstation Desktop', 'Reliable workstation for office and development.', 'https://img.freepik.com/premium-photo/pc-computer-box-computer-case-computer-tower-isolated-chassis_488220-78385.jpg?w=740', 50, 700.0, 2),
       ('Barebone PC', 'Barebone PC kit for custom builds.', 'https://img.freepik.com/premium-photo/ssd-external-hdd-backup-external-storage-are-mainly-used-data-storage-be-it-desktop-tower-computers-quotlaptopquot-notebook-perform-backups-user-files_695181-1300.jpg?w=996', 40, 350.0, 2),
       ('Windows OS', 'Official Windows operating system.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/480px-Windows_logo_-_2012.svg.png?uselang=fr', 200, 100.0, 2),

       ('Flat Keyboard', 'Slim and stylish flat keyboard.', 'https://img.freepik.com/vecteurs-premium/clavier-bureau-realiste_208581-971.jpg?w=1060', 120, 40.0, 3),
       ('A simple white mice', 'Optical Computer Mouse with USB Nano Receiver', 'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 50, 200.0, 3),

       ('Noise Cancelling Headphones', 'Headphones with active noise canceling feature.', 'https://img.freepik.com/free-photo/levitating-music-headphones-display_23-2149817602.jpg?t=st=1730042692~exp=1730046292~hmac=d42649bd6dc9603e6504bbf60f362aec8f654c0ff760612ce7397a3e44d0c55f&w=740', 80, 180.0, 4),
       ('Ipad 64 GO', 'this Apple screen is amazing to read novels, very robust', 'https://images.unsplash.com/photo-1630331528526-7d04c6eb463f?q=80&w=1162&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 60, 350.0, 5),
       ('Regular White Monitor', '27 Inch IPS Monitor 75 Hz Powered with AOC Technology FHD 1080P HDMI, Display Port and VGA Input VESA Compatible Built-in Speakers for Office and Home, White', 'https://img.freepik.com/premium-psd/three-dimensional-image-computer_53876-1610.jpg?ga=GA1.1.373636575.1708292350&semt=ais_hybrid', 100, 150.0, 5);


INSERT INTO address (street, house_number, city, country)
VALUES ('1 Rue des Tulipes', '10', 'Estaires', 'France'),
       ('4 Avenue des Champs', '5', 'Paris', 'France'),
       ('7 Boulevard Rouge', '22', 'Paris', 'France'),
       ('3 Rue de la Liberté', '18', 'Lyon', 'France'),
       ('5 Place de la République', '11', 'Marseille', 'France');

INSERT INTO roles (name)
VALUES ('ROLE_USER'),
       ('ROLE_ADMIN');

INSERT INTO customer (first_name, last_name, birth_date, phone_number, email, password, created_at, updated_at, id_role, id_address)
VALUES ('Deborah', 'Kane', '1990-05-15', '0123456789', 'deborah.kane@email.com', '12345678', CURRENT_DATE, CURRENT_DATE, 1, 1),
       ('Admin','Admin','2000-10-10','0600000000','admin@email.com','12345678',CURRENT_DATE, CURRENT_DATE, 2, null),
       ('Jean-François', 'Cotté', '1965-08-22', '0987654321', 'jean.cotte@email.com', '12345678', CURRENT_DATE, CURRENT_DATE, 1, 2),
       ('Kim', 'Yoon', '1992-01-03', '0147852369', 'kim.yoon@email.com', '12345678', CURRENT_DATE, CURRENT_DATE, 1, null),
       ('Ben', 'Alleck', '1980-11-10', '0145792638', 'ben.alleck@email.com', '12345678', CURRENT_DATE, CURRENT_DATE, 1, 4),
       ('Medhi', 'Moulib', '1988-02-18', '0192837465', 'medhi.moulib@email.com', '12345678', CURRENT_DATE, CURRENT_DATE, 1, 5);


INSERT INTO orders (order_date, reference, total_amount, tax, delivery_price, id_customer)
VALUES (CURRENT_DATE, 'xx123460', 400.0, 60.0, 10.0, 1),
       (CURRENT_DATE, 'xx123461', 300.0, 45.0, 10.0, 1),
       (CURRENT_DATE, 'xx123462', 150.0, 25.0, 10.0, 1),
       (CURRENT_DATE, 'xx123463', 500.0, 75.0, 10.0, 1),

       (CURRENT_DATE, 'xx123464', 1200.0, 180.0, 15.0, 5),
       (CURRENT_DATE, 'xx123465', 700.0, 100.0, 15.0, 4),
       (CURRENT_DATE, 'xx123466', 350.0, 50.0, 15.0, 4),
       (CURRENT_DATE, 'xx123467', 100.0, 15.0, 10.0, 5),

       (CURRENT_DATE, 'xx123468', 40.0, 5.0, 5.0, 3),
       (CURRENT_DATE, 'xx123469', 200.0, 30.0, 10.0, 3),
       (CURRENT_DATE, 'xx123470', 180.0, 25.0, 10.0, 2),
       (CURRENT_DATE, 'xx123471', 350.0, 50.0, 15.0, 2),
       (CURRENT_DATE, 'xx123472', 150.0, 20.0, 10.0, 5),
       (CURRENT_DATE, 'xx123473', 400.0, 60.0, 10.0, 3);


INSERT INTO orderline (quantity, id_order, id_product)
VALUES (1, 1, 1),
       (1, 2, 2),
       (1, 3, 3),
       (1, 4, 4),

       (1, 5, 5),
       (1, 6, 6),
       (1, 7, 7),
       (1, 8, 8),

       (1, 9, 9),
       (1, 10, 10),
       (1, 11, 11),
       (1, 12, 12),
       (1, 13, 13),
       (1, 14, 14);


INSERT INTO review (title, description, rating, id_customer, id_product)
VALUES
('Perfect for Artists', 'This tablet is perfect for digital artists! Very precise and smooth drawing experience.', 5, 1, 1),
('Futuristic and Fun', 'The laser sword is a fun gadget, very cool but not as practical as expected.', 4, 1, 2),
('Accurate and Fast', 'The GPS works well for hiking and road trips, never lost signal.', 5, 1, 3),
('Amazing Drone', 'The drone is very easy to fly, and the camera quality is superb for the price.', 4, 1, 4),

('Great Gaming Laptop', 'I can run all my favorite games at high settings. The laptop is super fast.', 5, 5, 5),
('Solid Desktop', 'Very stable and reliable workstation for all my office tasks and programming.', 4, 4, 6),
('Great for Building', 'The barebone kit is great for custom builds. Works exactly as advertised.', 4, 4, 7),
('Essential Software', 'Windows OS is just what I need to run all my programs and games.', 5, 5, 8),

('Great Feedback', 'The mechanical keyboard has great tactile feedback, perfect for typists and gamers.', 5, 3, 9),
('Sleek and Quiet', 'This flat keyboard is sleek, and its low profile is perfect for minimal setups.', 4, 3, 10),

('Superb Sound Quality', 'Beats headphones provide amazing bass and clarity. Highly recommend.', 5, 2, 11),
('Perfect for Reading', 'This iPad is a game-changer for reading novels. Very robust and great screen quality.', 5, 2, 12),
('Great Curvature', 'The curvy monitor gives an immersive experience, very nice for gaming and movies.', 5, 5, 13),
('Reliable Display', 'The regular monitor is exactly what I need for everyday work. Simple but effective.', 4, 3, 14);
