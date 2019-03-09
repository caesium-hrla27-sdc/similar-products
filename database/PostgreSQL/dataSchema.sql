CREATE DATABASE similar_and_like;

CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_name VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS kinds (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  kind_name VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_name TEXT,
  category INT REFERENCES categories(id),
  kind INT REFERENCES kinds (id),
  size TEXT,
  description TEXT,
  sku INT,
  stars REAL,
  reviews INT,
  badge BOOLEAN,
  loves INT,
  exclusive BOOLEAN,
  online_only BOOLEAN,
  limited_edition BOOLEAN,
  free_shipping BOOLEAN,
  price REAL,
  image TEXT
);

-- CREATE TABLE similars (
--   id INT GENERATED ALWAYS AS IDENTITY,
--   i INT references products(id),
--   ii INT references products(id),
--   iii INT references products(id),
--   iv INT references products(id),
--   v INT references products(id),
--   vi INT references products(id),
--   vii INT references products(id),
--   viii INT references products(id),
--   ix INT references products(id),
--   x INT references products(id),
--   xi INT references products(id),
--   xii INT references products(id),
--   xiii INT references products(id),
--   xiv INT references products(id),
--   xv INT references products(id)
-- );

-- CREATE TABLE likes (
--   id INT GENERATED ALWAYS AS IDENTITY,
--   i INT references products(id),
--   ii INT references products(id),
--   iii INT references products(id),
--   iv INT references products(id),
--   v INT references products(id),
--   vi INT references products(id),
--   vii INT references products(id),
--   viii INT references products(id),
--   ix INT references products(id),
--   x INT references products(id),
--   xi INT references products(id),
--   xii INT references products(id),
--   xiii INT references products(id),
--   xiv INT references products(id),
--   xv INT references products(id)
-- );

-- SELECT * FROM products WHERE products.id IN (select * from similars where id = 3) AND products.id = (select * from likes where id = 3);
-- SELECT * FROM products WHERE products.id = (select * from similars where id = 3) AND products.id = (select * from likes where id = 3);