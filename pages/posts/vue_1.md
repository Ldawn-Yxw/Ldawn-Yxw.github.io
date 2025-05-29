---
title: Vue前置知识
date: 2025-5-29
updated: 2025-5-29
categories: Vue
tags:
  - Vue
  - 前端
top: 1
---

## 常量与变量 📝

`let` 定义变量, 可以被多次赋值 ✏️

`const` 定义常量, 不能被二次赋值 🔒

```js
// 变量
let name = '张三';
console.log(name);
name = '李四';
console.log(name);
// 常量
const age = 18;
console.log(age);
age = 20; // 报错
```

<img src="../img/vue1.png">

🧐 `const` 声明的数组可以添加或删除吗？ `const` 声明的对象可以添加或修改属性吗？

> 答: 可以的, 因为数组和对象在JS中属于引用类型，对其做添加、删除等操作, 并不改变其内存地址。

<img src="../img/vue3.png">

```js
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

arr = [4, 5, 6]; // 报错

const obj = {
  name: '张三',
  age: 18
}
obj.name = '李四';
console.log(obj);
```

<img src="../img/vue2.png">

## 模板字符串 🧩

`普通字符串`：用单引号或双引号声明的

`模板字符串`：用反引号声明,``

```js
// 普通字符串
let str = 'hello world';
let str2 = "hello world";
console.log(str);
console.log(str2);
// 模板字符串
let str3 = `hello world`;
console.log(str3);
```

`模板字符串`的优势：

`1.` 任意换行

`2.` 在字符串中方便的嵌入表达式, ${表达式}

```js
let name1 = '<div><h1>hello world</h1>
  <p>hello world</p></div>'; // 报错

let name2 = `<div><h1>hello world</h1>
  <p>hello world</p></div>`; // 正常

let age = 18;
let str4 = '张三是' + (age > 18 ? '成年人' : '未成年人');
let str5 = `张三是${age > 18 ? '成年人' : '未成年人'}`;

console.log(str4);
console.log(str5);
```

## 对象 🧱

`对象` = `属性` + `方法` 的 集合

**取值**

`1.` 点

```js
obj.name
```

`2.` 中括号

```js
obj[name]
```
> Note: 当属性名是字符串的时候, 只能用中括号取值

```js
let x = 'name'
obj[x]
```

**简写**

`简写`: 当对象的属性名和属性值名字一样的时候, 可以只写一个

```js
let min = 1;
let max = 1;

const obj = {
  min,
  max
} 

console.log(obj)
```

<img src="../img/vue4.png">

## 解构赋值 🧩

`解构赋值`: 根据一定的结构从数组或对象中快速取值

> `目标`：数组或对象 🎯

> `作用`：让数组或对象的取值更便捷 ⚡️

### 数组的解构
```js
const arr = [1,2,3,4,5,6,7,8,9,10];

// 把数组前三个元素分别赋值给 a, b, c
// 旧写法
a = arr[0];
b = arr[1];
c = arr[2];
console.log(a, b, c);

// 新写法
let [a, b, c] = arr;
console.log(a, b, c);
```

> **小练习:** 
> 
>```js
>const arr = [2, [3, 4, 5], 6]
>//把中间3, 4, 5分别赋值给 b, c, d
>let [, [b, c, d], ] = arr
>console.log(b, c, d);
>```

### 对象的解构
```js
const obj = {
  name: '张三',
  age: 18,
  gender: '男'
}

// let {age, name, gender} = obj // 这三项的顺序可以任意
// console.log(name, age, gender);

// 第一个赋值给 name，其余的赋值给 c
let {name, ...c} = obj
console.log(name, c);

// 指定，把name赋给 a
let {name: a} = obj
console.log(a);
```

> **小练习:**
>```js
>const obj = {
>  data: {
>    name: '张三',
>    age: 18,
>    gender: '男'
>  },
>  status: 200,
>  message: 'success',
>  arr: [1, 2, 3, 4, 5]
>}
>// 取出 data 中的 name, age, gender
>let {data: {name, age, gender}} = obj
>console.log(name, age, gender);
>```

## 箭头函数 ➡️

`箭头函数`: 对之前普通函数的一种简化, 写法更简洁

`有名函数`
```js
function solve(a, b) {
  return a + b
}

let a = 1
let b = 2
console.log(a + " + " + b + " = " + solve(a, b))
```

`函数表达式`
```js
let solve = function(a, b) {
  return a + b
}

let a = 1
let b = 2
console.log(a + " + " + b + " = " + solve(a, b))
```

`箭头函数`
```js
let solve = (a, b) => {
  return a + b
}

let a = 1
let b = 2
console.log(a + " + " + b + " = " + solve(a, b))
```

### 特性: ✨
`1.` 当参数只有一个时，可以忽略小括号
```js
const solve = a => {
  console.log(a)
}
```
`2.` 当函数体只有一句话时，可以忽略大括号，此时箭头函数自带 return 功能
```js
const add = (a, b) => a + b
```

`3.`直接返回一个对象
```js
const solve = () => {
  return {
    name: '张三'
  }
}
```

### 应用: 💡
既可以用于函数的声明，也可以多用于回调函数传参

```js
// 旧写法
solve(function(
  console.log(100)
), 100)

// 新写法
solve( () => {
  console.log(100)
}, 100)
```

## 数组重要方法 🧮

### 添加 ➕

  `push()` : 尾部添加

  `unshift()` : 头部添加

### 删除 ➖
   
  `pop()` : 尾部删除

  `shift()` : 头部删除

### 任意位置删除或添加 🔄

  `splice(startIndex, delCount, ...addItem)`: 

  startIndex: 起始下标

  delCount: 删除元素的个数

  addItem: 要填加的元素

### 遍历 🔍

```js
arr.forEach((item, index, array) => {
  // item: 每次遍历的对象
  // index: 当前元素在数组中的下标
  // array: 遍历的数组本身
  console.log(item, index, array)
})

let result = arr.forEach((item, index, array) => {
  // item: 每次遍历的对象
  // index: 当前元素在数组中的下标
  // array: 遍历的数组本身
  console.log(item, index, array)
})

console.log(result)
```

### 过滤 🎯
```js
const eventArr = arr.filter((item) => {
  if (item % 2 == 0) {
    return true
  } else {
    return false
  }
})
```

### 映射 🔄
```js
arr.map((item, index, array) => {
  console.log(item, index, array)
})

doubleArr = arr.map(item => item * 2)

console.log(doubleArr)

// 得到一个对象数组 (存放一堆对象的数组)
const newArr = arr.map((index, item) => {
  return {
    index,
    item
  }
})

console.log(newArr)
```

### 检测每一个 ✅

`检测每一个`: 检测数组中每一个元素是否都满足条件，如果都满足，则返回true; 否则只要发现一个不满足，就返回false

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const flag = arr.every(item => item > 0)

console.log(flag)
```
<img src="../img/vue5.png">