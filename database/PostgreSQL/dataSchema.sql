CREATE DATABASE similar_and_like;

-- CREATE TABLE IF NOT EXISTS categories (
--   id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--   category_name VARCHAR(30)
-- );

-- CREATE TABLE IF NOT EXISTS kinds (
--   id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--   kind_name VARCHAR(30)
-- );

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

CREATE TABLE IF NOT EXISTS baskets (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_id INT REFERENCES products (id),
  quantity INT,
  item_name TEXT
);