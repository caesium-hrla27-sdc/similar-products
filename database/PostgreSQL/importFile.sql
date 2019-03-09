COPY kinds FROM '/Users/kooma/Desktop/SDC/similar-products/similarProducts.csv' DELIMITER ',' CSV HEADER;
COPY categories FROM '/Users/kooma/Desktop/SDC/similar-products/likeProducts.csv' DELIMITER ',' CSV HEADER;
COPY products FROM '/Users/kooma/Desktop/SDC/similar-products/products.csv' DELIMITER ',' CSV HEADER;