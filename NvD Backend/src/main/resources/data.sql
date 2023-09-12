INSERT INTO product_category (category_name)
VALUES
    ('laptops'),
    ('smartphones'),
    ('PC''s');

INSERT INTO web_product (product_name, product_code, price, product_category_id, product_brand, delivery_location, product_description, specifications)
VALUES
    ('Laptop 1', 'LP001', 1000, (SELECT id FROM product_category WHERE category_name = 'laptops' LIMIT 1), 'Brand 1', 'Location 1', 'Description 1', 'Specs 1', null),
  ('Laptop 2', 'LP002', 1500, (SELECT id FROM product_category WHERE category_name = 'laptops' LIMIT 1), 'Brand 2', 'Location 2', 'Description 2', 'Specs 2', null);

INSERT INTO web_product (product_name, product_code, price, product_category_id, product_brand, delivery_location, product_description, specifications)
VALUES
    ('Smartphone 1', 'SP001', 500, (SELECT id FROM product_category WHERE category_name = 'smartphones' LIMIT 1), 'Brand 1', 'Location 1', 'Description 1', 'Specs 1', null),
  ('Smartphone 2', 'SP002', 800, (SELECT id FROM product_category WHERE category_name = 'smartphones' LIMIT 1), 'Brand 2', 'Location 2', 'Description 2', 'Specs 2', null);

INSERT INTO web_product (product_name, product_code, price, product_category_id, product_brand, delivery_location, product_description, specifications)
VALUES
    ('PC 1', 'PC001', 1500, (SELECT id FROM product_category WHERE category_name = 'PC''s' LIMIT 1), 'Brand 1', 'Location 1', 'Description 1', 'Specs 1', null),
  ('PC 2', 'PC002', 2000, (SELECT id FROM product_category WHERE category_name = 'PC''s' LIMIT 1), 'Brand 2', 'Location 2', 'Description 2', 'Specs 2', null);
