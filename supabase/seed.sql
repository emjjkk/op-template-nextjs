-- ==========================
-- 🟢 USERS TABLE
-- ==========================
create table if not exists users (
    id uuid primary key default gen_random_uuid(),
    full_name text not null,
    email text unique not null,
    password_hash text not null,
    role text check (role in ('user', 'admin')) default 'user',
    created_at timestamp default now()
);

-- ==========================
-- 📝 BLOG TABLES
-- ==========================
create table if not exists blog_categories (
    id serial primary key,
    name text unique not null
);

create table if not exists blog_posts (
    id serial primary key,
    title text not null,
    slug text unique not null,
    content text not null,
    author_id uuid references users(id) on delete cascade,
    category_id integer references blog_categories(id) on delete set null,
    published boolean default false,
    created_at timestamp default now()
);

create table if not exists blog_comments (
    id serial primary key,
    post_id integer references blog_posts(id) on delete cascade,
    user_id uuid references users(id) on delete cascade,
    content text not null,
    created_at timestamp default now()
);

-- ==========================
-- 🛒 ECOMMERCE TABLES
-- ==========================
create table if not exists products (
    id serial primary key,
    name text not null,
    description text,
    price numeric(10,2) not null,
    stock integer default 0,
    image_url text,
    created_at timestamp default now()
);

create table if not exists orders (
    id serial primary key,
    user_id uuid references users(id) on delete cascade,
    total_price numeric(10,2) not null,
    status text check (status in ('pending', 'completed', 'cancelled')) default 'pending',
    created_at timestamp default now()
);

create table if not exists order_items (
    id serial primary key,
    order_id integer references orders(id) on delete cascade,
    product_id integer references products(id) on delete cascade,
    quantity integer not null check (quantity > 0),
    price numeric(10,2) not null
);

-- ==========================
-- 🏦 CHECKOUT & PAYMENTS
-- ==========================
create table if not exists payments (
    id serial primary key,
    order_id integer references orders(id) on delete cascade,
    user_id uuid references users(id) on delete cascade,
    payment_method text check (payment_method in ('credit_card', 'paypal', 'crypto')) not null,
    payment_status text check (payment_status in ('pending', 'paid', 'failed')) default 'pending',
    transaction_id text unique,
    created_at timestamp default now()
);

-- ==========================
-- 🔻 INSERT SAMPLE DATA
-- ==========================

-- Sample users
insert into users (full_name, email, password_hash, role) values
('Admin User', 'admin@example.com', 'hashedpassword123', 'admin'),
('Regular User', 'user@example.com', 'hashedpassword456', 'user');

-- Sample blog categories
insert into blog_categories (name) values ('Technology'), ('Lifestyle'), ('Business');

-- Sample blog post
insert into blog_posts (title, slug, content, author_id, category_id, published) values
('Welcome to Our Blog', 'welcome-blog', 'This is the first post!', 
 (select id from users where email='admin@example.com'), 1, true);

-- Sample products
insert into products (name, description, price, stock, image_url) values
('T-shirt', 'Comfortable cotton T-shirt', 19.99, 50, 'https://example.com/tshirt.jpg'),
('Laptop', 'High-performance laptop', 999.99, 10, 'https://example.com/laptop.jpg');

-- Sample order
insert into orders (user_id, total_price, status) values
((select id from users where email='user@example.com'), 1019.98, 'pending');

-- Sample order item
insert into order_items (order_id, product_id, quantity, price) values
((select id from orders limit 1), (select id from products where name='T-shirt'), 2, 19.99),
((select id from orders limit 1), (select id from products where name='Laptop'), 1, 999.99);

-- Sample payment
insert into payments (order_id, user_id, payment_method, payment_status, transaction_id) values
((select id from orders limit 1), (select id from users where email='user@example.com'), 'credit_card', 'paid', 'txn_123456789');
