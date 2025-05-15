---
title: MySQL内置函数
date: 2025-5-15
updated: 2025-5-15
categories: MySQL
tags:
  - MySQL
top: 1
---

# 日期函数

## 时间戳
```sql
mysql> select current_date();
+----------------+
| current_date() |
+----------------+
| 2025-05-15     |
+----------------+
1 row in set (0.00 sec)

mysql> select current_time();
+----------------+
| current_time() |
+----------------+
| 00:08:42       |
+----------------+
1 row in set (0.00 sec)

mysql> select current_timestamp();
+---------------------+
| current_timestamp() |
+---------------------+
| 2025-05-15 00:09:17 |
+---------------------+
1 row in set (0.00 sec)

mysql> select now();
+---------------------+
| now()               |
+---------------------+
| 2025-05-15 00:11:52 |
+---------------------+
1 row in set (0.00 sec)

```

## 提取日期
```sql
mysql> select date('2025-5-15 00:00:00');
+----------------------------+
| date('2025-5-15 00:00:00') |
+----------------------------+
| 2025-05-15                 |
+----------------------------+
1 row in set (0.00 sec)

mysql> select date(now());
+-------------+
| date(now()) |
+-------------+
| 2025-05-15  |
+-------------+
1 row in set (0.00 sec)
```

## 日期计算

`加时间`

```sql
mysql> select date_add('2025-5-15', interval 40 day);
+----------------------------------------+
| date_add('2025-5-15', interval 40 day) |
+----------------------------------------+
| 2025-06-24                             |
+----------------------------------------+
1 row in set (0.00 sec)

mysql> select date_add(now(), interval 40 day);
+----------------------------------+
| date_add(now(), interval 40 day) |
+----------------------------------+
| 2025-06-24 00:18:55              |
+----------------------------------+
1 row in set (0.00 sec)

mysql> select date_add(date(now()), interval 40 day);
+----------------------------------------+
| date_add(date(now()), interval 40 day) |
+----------------------------------------+
| 2025-06-24                             |
+----------------------------------------+
1 row in set (0.00 sec)

mysql> select date_add(now(), interval 40 second);
+-------------------------------------+
| date_add(now(), interval 40 second) |
+-------------------------------------+
| 2025-05-15 00:20:03                 |
+-------------------------------------+
1 row in set (0.00 sec)

mysql> select date_add(now(), interval 40 minute);
+-------------------------------------+
| date_add(now(), interval 40 minute) |
+-------------------------------------+
| 2025-05-15 00:59:38                 |
+-------------------------------------+
1 row in set (0.00 sec)
```

`减时间`

```sql
mysql> select date_sub(now(), interval 40 minute);
+-------------------------------------+
| date_sub(now(), interval 40 minute) |
+-------------------------------------+
| 2025-05-14 23:41:46                 |
+-------------------------------------+
1 row in set (0.00 sec)

mysql> select date_sub(now(), interval 40 day);
+----------------------------------+
| date_sub(now(), interval 40 day) |
+----------------------------------+
| 2025-04-05 00:21:53              |
+----------------------------------+
1 row in set (0.00 sec)

mysql> select date_sub(now(), interval 40 second);
+-------------------------------------+
| date_sub(now(), interval 40 second) |
+-------------------------------------+
| 2025-05-15 00:21:17                 |
+-------------------------------------+
1 row in set (0.00 sec)
```

`日期相减`

```sql
mysql> select datediff('2017-10-10', '2016-09-01');
+--------------------------------------+
| datediff('2017-10-10', '2016-09-01') |
+--------------------------------------+
|                                  404 |
+--------------------------------------+
1 row in set (0.00 sec)
```

## 应用

### 创建一个生日记录表

```sql
mysql> create table tmp(
    -> id int primary key auto_increment,
    -> birthday date
    -> );

mysql> desc tmp;
+----------+---------+------+-----+---------+----------------+
| Field    | Type    | Null | Key | Default | Extra          |
+----------+---------+------+-----+---------+----------------+
| id       | int(11) | NO   | PRI | NULL    | auto_increment |
| birthday | date    | YES  |     | NULL    |                |
+----------+---------+------+-----+---------+----------------+
2 rows in set (0.00 sec)

mysql> insert into tmp (birthday) values('1900-01-01');
Query OK, 1 row affected (0.00 sec)

mysql> insert into tmp (birthday) values('1974-01-01');
Query OK, 1 row affected (0.01 sec)

mysql> insert into tmp (birthday) values('1978-11-01');
Query OK, 1 row affected (0.00 sec)

mysql> insert into tmp (birthday) values(current_date());
Query OK, 1 row affected (0.00 sec)

mysql> select * from tmp;
+----+------------+
| id | birthday   |
+----+------------+
|  1 | 1900-01-01 |
|  2 | 1974-01-01 |
|  3 | 1978-11-01 |
|  4 | 2025-05-15 |
+----+------------+
4 rows in set (0.00 sec)

```

### 创建一个留言表

```sql
mysql> create table msg (
    -> id int primary key auto_increment,
    -> content varchar(100) not null,
    -> sendtime datetime
    -> );

mysql> select * from msg;
+----+--------------+---------------------+
| id | content      | sendtime            |
+----+--------------+---------------------+
|  1 | 人生啊       | 2025-05-15 11:11:46 |
|  2 | 我要吃饭     | 2025-05-15 11:13:02 |
|  3 | 你是谁       | 2025-05-15 11:13:09 |
|  4 | 无敌了       | 2025-05-15 11:21:22 |
+----+--------------+---------------------+
4 rows in set (0.00 sec)

/*查询两分钟以内的留言*/

mysql> select     
    ->     *
    -> from
    ->    msg
    -> where
    ->    date_add(sendtime, interval 2 minute) >= now();
+----+-----------+---------------------+
| id | content   | sendtime            |
+----+-----------+---------------------+
|  4 | 无敌了    | 2025-05-15 11:21:22 |
+----+-----------+---------------------+
1 row in set (0.00 sec)


```

# 字符串函数
