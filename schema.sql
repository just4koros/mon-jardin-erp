CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  role VARCHAR(32),
  name TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT,
  category TEXT,
  cost_price NUMERIC,
  selling_price NUMERIC,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  farmer_id INT REFERENCES users(id),
  buyer_id INT REFERENCES users(id),
  product_id INT REFERENCES products(id),
  quantity INT,
  price NUMERIC,
  delivery_location TEXT,
  status VARCHAR(32) DEFAULT 'Pending',
  assigned_agent INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inventory (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id),
  quantity_available INT DEFAULT 0,
  location TEXT,
  reorder_threshold INT DEFAULT 0,
  supplier TEXT,
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  amount NUMERIC,
  mode VARCHAR(32),
  status VARCHAR(32) DEFAULT 'Pending',
  recorded_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS feedback (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  rating INT,
  comments TEXT,
  created_at TIMESTAMP DEFAULT now()
);