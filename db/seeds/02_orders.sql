-- user_id, created_at, completed_at

-- Past Orders
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (1, '2020-10-09 17:10:25-07', 30, '2020-10-09 17:40:25-07');
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (2, '2020-10-09 18:10:25-07', 45, '2020-10-09 18:40:25-07');
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (3, '2020-10-10 15:23:25-07', 40, '2020-10-10 15:53:25-07');
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (1, '2020-10-10 16:42:25-07', 45, '2020-10-10 17:15:25-07');
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (4, '2020-10-10 19:32:25-07', 40, '2020-10-10 20:00:25-07');
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (3, '2020-10-12 14:13:25-07', 40, '2020-10-12 14:40:25-07');
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (5, '2020-10-12 16:15:25-07', 40, '2020-10-12 16:50:25-07');
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (2, '2020-10-13 15:35:25-07', 45, '2020-10-13 16:00:25-07');
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (4, '2020-10-14 14:53:25-07', 25, '2020-10-14 15:20:25-07');
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (4, '2020-10-15 16:42:25-07', 50, '2020-10-15 17:00:25-07');
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (5, '2020-10-15 17:34:25-07', 40, '2020-10-15 17:59:25-07');
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (3, '2020-10-15 19:09:25-07', 45, '2020-10-15 19:09:25-07');

-- Orders waiting to be finished
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (5, '2020-10-19 13:42:25-07', 30, NULL);
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (6, '2020-10-19 14:16:25-07', 35, NULL);
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (7, '2020-10-19 14:16:25-07', 40, NULL);
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (8, '2020-10-19 15:16:25-07', 35, NULL);
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (9, '2020-10-19 16:16:25-07', 35, NULL);
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (10, '2020-10-19 17:16:25-07', 45, NULL);
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (11, '2020-10-19 18:16:25-07', 30, NULL);
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (2, '2020-10-19 18:18:25-07', 40, NULL);
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (12, '2020-10-19 18:24:25-07', 45, NULL);
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (13, '2020-10-19 18:32:25-07', 50, NULL);
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (14, '2020-10-19 18:36:25-07', 50, NULL);

-- Orders waiting to be confirmed
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (15, '2020-10-19 18:40:25-07', NULL, NULL);
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (16, '2020-10-19 19:42:25-07', NULL, NULL);
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (17, '2020-10-19 19:47:25-07', NULL, NULL);
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (18, '2020-10-19 19:50:25-07', NULL, NULL);
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (19, '2020-10-19 19:51:25-07', NULL, NULL);
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (20, '2020-10-19 19:57:25-07', NULL, NULL);
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (21, '2020-10-19 20:13:25-07', NULL, NULL);
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (22, '2020-10-19 20:22:25-07', NULL, NULL);
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (5, '2020-10-19 20:35:25-07', NULL, NULL);
INSERT INTO orders (user_id, created_at, confirmed, completed_at) VALUES (23, '2020-10-19 20:42:25-07', NULL, NULL);
