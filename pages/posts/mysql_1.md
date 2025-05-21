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

`charset(string)`

> 返回字符串对应的编码方式

```sql
mysql> select * from t6;
+--------+
| name   |
+--------+
| avs    |
| avs    |
| 中国   |
+--------+
3 rows in set (0.00 sec)

mysql> select charset(name) from t6;
+---------------+
| charset(name) |
+---------------+
| utf8          |
| utf8          |
| utf8          |
+---------------+
3 rows in set (0.00 sec)
```
`concat(string, ...)`

> 连接字符串

```sql
mysql> select concat('a', 'b', 'c') as res;
+------+
| res  |
+------+
| abc  |
+------+
1 row in set (0.00 sec)
```

`instr(string, substring)`

> 查询子串在字符串中出现的位置, 没有则返回0(下标是从1开始)。

```sql
mysql> select instr("slfdlabcd", "abc");
+---------------------------+
| instr("slfdlabcd", "abc") |
+---------------------------+
|                         6 |
+---------------------------+
1 row in set (0.00 sec)
```

`ucase(string)`

> 转换大写

```sql
mysql> select ucase('asdkad');
+-----------------+
| ucase('asdkad') |
+-----------------+
| ASDKAD          |
+-----------------+
1 row in set (0.00 sec)
```

`lcase(string)`

> 转换小写

```sql
mysql> select lcase('AJSK');
+---------------+
| lcase('AJSK') |
+---------------+
| ajsk          |
+---------------+
1 row in set (0.00 sec)
```

`left(string, length)`

> 从最左边开始提取length个字符

```sql
mysql> select left('shdkajd', 3);
+--------------------+
| left('shdkajd', 3) |
+--------------------+
| shd                |
+--------------------+
1 row in set (0.00 sec)
```

`length(string)`

> 返回字符串的长度

```sql
mysql> select length('sdajl');
+-----------------+
| length('sdajl') |
+-----------------+
|               5 |
+-----------------+
1 row in set (0.00 sec)
```

`replace(string, search_str, replace_str)`

> 在string用replace_str代替search_str

```sql
mysql> select replace('aseskd', 'es', 'ab');
+-------------------------------+
| replace('aseskd', 'es', 'ab') |
+-------------------------------+
| asabkd                        |
+-------------------------------+
1 row in set (0.00 sec)
```

`strcmp(string1, string2)`

>string1 < string2, 返回 -1, 相等则返回 0, 否则返回 1。

```sql
mysql> select strcmp('abd', 'acds');
+-----------------------+
| strcmp('abd', 'acds') |
+-----------------------+
|                    -1 |
+-----------------------+
1 row in set (0.00 sec)

mysql> select strcmp('aed', 'acds');
+-----------------------+
| strcmp('aed', 'acds') |
+-----------------------+
|                     1 |
+-----------------------+
1 row in set (0.00 sec)

mysql> select strcmp('abc', 'abc');
+----------------------+
| strcmp('abc', 'abc') |
+----------------------+
|                    0 |
+----------------------+
1 row in set (0.00 sec)
```

`substring(string, pos, length)`

> 从pos开始提取length个字符

```sql
mysql> select substring('dsjhfuiah', 3, 4);
+------------------------------+
| substring('dsjhfuiah', 3, 4) |
+------------------------------+
| jhfu                         |
+------------------------------+
1 row in set (0.00 sec)
```


