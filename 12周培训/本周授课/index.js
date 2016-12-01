var $$ = function (dom, num) {
    var ele = (num === 'all') ? document.querySelectorAll(dom) : document.querySelector(dom);
    return ele;
};

//this

//全局作用域
console.log('全局作用域')
console.log(this);
//在全局作用域下 this和window是绝对相等的
console.log(this === window);

console.log('------------------------------');

//所以我们在全局作用域中声明的变量也会只想this
console.log('所以我们在全局作用域中声明的变量也会只想this')
var x = 1;
console.log(this.x);
console.log(window.x);
//当声明变量时不使用var或let，就相当于给全局的this添加货改变属性值
var x = 0;
var changeX = function () {
    x = 1;
};
console.log(x);
changeX();
console.log(x);

console.log('------------------------------');

//看起来很简单，就是一个等价于window的对象么
//如果仅仅只是这样，this就没什么存在的必要了
//this最让人头痛就是在不同的作用域下，他的形态也是不同的





//在函数中
//到这里this的陷阱就开始渐渐出现了
//在这为什么会说是在函数中而不是在局部作用域中

//那么我们需要知道function是什么
//在javascript中，function作为js的一个特殊对象，是有着不同形态的

//我们通常看到
console.log('我们通常看到')
var set = function () {
    var x = 1;
};
//在这一形态下，其内部的this是与全局作用域时一样，直接指向window，所以其形态 依然等价于window。
var x = 0;
var num = function () {
    this.x = 1;
};
console.log(x);
num();
console.log(x);

console.log('------------------------------');


//同样的在函数座位对象的方法的时候
console.log('同样的在函数座位对象的方法的时候')
var point = {
    x: 0,
    y: 0,
    move: function (x, y) {
        var moveX = function (x) {
            this.x = x;
        };
        var moveY = function (y) {
            this.y = y;
        };

        moveX(x);
        moveY(y);
    },
};
point.move(1, 1);
console.log(point.x);
console.log(point.y);
console.log(x);
console.log(y)

//这就是javascript的设计缺陷，所以我们为了规避这种缺陷
console.log('------------------------------');

console.log('所以我们为了规避这种缺陷')
var point = {
    x: 0,
    y: 0,
    move: function (x, y) {
        var that = this;
        var moveX = function (x) {
            that.x = x;
        };
        var moveY = function (y) {
            that.y = y;
        };

        moveX(x);
        moveY(y);
    },
};
point.move(1, 1);
console.log(point.x);
console.log(point.y);



console.log('------------------------------');


//这里就是经常容易犯得错误，很多人觉得，当this已经在一个function之中时，其目前所处位置为当前的局部作用域，所以目前指向的应该是此函数
//但是，如果你将这个函数实例化（new）之后，此函数将生成一个全新的环境，此时在此实例中的this也会随之发生变化，它将指向所在实例。
console.log('实例化1 构造函数')
var x = 0;
var setThis = function () {
    this.x = 1;
};
console.log(x);
new setThis();
console.log(x);
console.log(new setThis().x);

// a：构造函数的函数名的第一个字母通常大写。
// b：函数体内使用this关键字，代表所要生成的对象实例。
// c：生成对象的时候，必须使用new命令来调用构造函数。

console.log('------------------------------');

//这是因为，当实例化之后，此函数变成了一个实例对象，而其内部的this也自然而然的指向了此实例对象，如同一开始的this是指向window的对象一样指向了它所在的实例
//另外，在我们写javascript的时候，我们通常还会有一种调用函数的方法，即为元素绑定事件，比如button.addEventListener(‘click', fn, false)等，



//实例化this
console.log('实例化2')
var instantiation = function () {
    var box_red = $$('.box-red');

    var redClick = function () {
        console.log(this);
    };

    box_red.addEventListener('click', redClick);
};
instantiation();



function Point(x, y){ 
    this.x = x; 
    this.y = y; 
    this.moveTo = function(x, y){ 
        this.x = x; 
        this.y = y; 
    } 
} 

var p1 = new Point(0, 0); 
var p2 = {x: 0, y: 0}; 
p1.moveTo(1, 1); 
p1.moveTo.apply(p2, [10, 10]);



    






//闭包
//闭包就是能够读取其他函数内部变量的函数。

//那么
// var n = 999;
// var disN = function () {
//     console.log('n : ' + n);
// };
//disN();
//但是
// var varN = function () {
//     var n = 999;
// };
//console.log(n)



//如何从外部获取到函数内部的变量

// var outside = function () {
//     var a = 999;

//     var close = function () {
//         alert(a)
//     };

//     return close;
// };
// outside()();

//close就是闭包



//闭包可以用在许多地方。它的最大用处有两个，
//一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中。

// var outside = function () {
//     var a = 999;

//     aAdd = function () {
//         a += 1;
//     };

//     var close = function () {
//         alert(a)
//     };

//     return close;
// };
// var result = outside();
// result();
// aAdd();
// result();

//为什么不用outside()()
//因为result就是闭包f2函数，outside()()会自动清理
//aAdd也是闭包




// var name = "The Window";
// var object = {
//     name : "My Object",
//     getNameFunc : function(){
//         return function(){
//             return this.name;
//         };
//     }
// };
// alert(object.getNameFunc()());



// var name = "The Window";
// var object = {
//     name : "My Object",
//     getNameFunc : function(){
//         var that = this
//         return function(){
//             return that.name;
//         };
//     }
// };
// alert(object.getNameFunc()());





//事件对象



//事件委托
// var nav_box = $$('.nav-box');
// var input = $$('.dis');

// var getThing = function (event) {
//     var e = event || window.event;
//     console.log(e)

//     console.log(this);
//     console.log(e.currentTarget)

//     input.value = e.target.innerHTML;
// };


// nav_box.addEventListener('click', getThing);


//事件冒泡
// var box_blue = $$('.box-blue');
// var box_block = $$('.box-block');

// box_blue.addEventListener('click', function () {
//     alert('blue');
// });
// box_block.addEventListener('click', function () {
//     alert('block')
// });






