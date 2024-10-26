--for initialization purpose, to erase

INSERT INTO adress (street, house_number, city, country)
VALUES ('Main St', '1A', 'Paris', 'France'),
       ('Elm', '2B', 'Lyon', 'France'),
       ('Oak St', '3C', 'Berlin', 'Germany'),
       ('Pine', '4D', 'Madrid', 'Spain')
;
INSERT INTO category (name)
VALUES ('Laptops'),
       ('Keyboards'),
       ('Mice'),
       ('Monitors'),
       ('Accessories')
;
INSERT INTO customer (first_name, last_name, email, pwd, birth_date, phone_number, id_adress)
VALUES ('John', 'Doe', 'john.doe@example.com', 'password123', '1990-01-01', '0123456789', 1),
       ('Jane', 'Smith', 'jane.smith@example.com', 'password456', '1985-02-02', '9876543210', 2),
       ('Alice', 'Johnson', 'alice.johnson@example.com', 'password789', '1992-03-03', '0543216789', 3),
       ('Bob', 'Williams', 'bob.williams@example.com', 'password000', '1991-04-04', '0632145789', 4)
;
INSERT INTO product (name, description, image, available_quantity, price, id_category)
VALUES ('Gaming Laptop', 'High performance laptop for gaming', 'gaming_laptop.jpg', 50, 1500.00, 1),
       ('Mechanical Keyboard', 'RGB mechanical keyboard', 'mechanical_keyboard.jpg', 100, 99.99, 2),
       ('Wireless Mouse', 'Ergonomic wireless mouse', 'wireless_mouse.jpg', 150, 49.99, 3),
       ('27" Gaming Monitor', 'High refresh rate gaming monitor', 'gaming_monitor.jpg', 80, 299.99, 4),
       ('Laptop Stand', 'Adjustable laptop stand', 'laptop_stand.jpg', 200, 29.99, 5)
;
INSERT INTO orders (order_date, reference, total_amount, id_customer)
VALUES ('2024-10-25', 'ORD001', 1599.99, 1),
       ('2024-10-26', 'ORD002', 99.99, 2),
       ('2024-10-27', 'ORD003', 49.99, 3),
       ('2024-10-28', 'ORD004', 329.98, 4)
;
INSERT INTO orderline (id_order, id_product, quantity)
VALUES (1, 1, 1),
       (2, 2, 1),
       (3, 3, 4),
       (4, 4, 2),
       (4, 5, 1)
;
INSERT INTO review (title, description, rating, id_customer, id_product)
VALUES ('Awesome Laptop!', 'The gaming laptop is fantastic!', 5, 1, 1),
       ('Best Keyboard Ever', 'I love the feel of this mechanical keyboard!', 5, 2, 2),
       ('Great Mouse', 'Very comfortable and responsive.', 4, 3, 3),
       ('Amazing Monitor', 'Picture quality is top-notch!', 5, 4, 4);
