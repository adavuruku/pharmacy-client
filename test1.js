const animals = ['ant', 'bison', 'camel', 'duck', 'elephant','goat', 'cow', 'fowl', 'cat'];

page = 0
limitStep = 4
offset = page * limitStep
limit = (page+1) * limitStep
console.log(animals.slice(offset, limit));
console.log(animals.slice(offset, limit));
console.log(animals.slice(offset, limit));

let a = [{"a":1},{"a":2},{"a":3}]

let r = [...a]
a[0].k = 20
console.log(r,a)


arr = [{x:2,  y:'sat', w:2}, {x:3, y:'Abb', w:1}]

let ro = arr.reduce((accumulator, current) => accumulator + current.x, 0);
let rot = arr.reduce((accumulator, current) => accumulator + (current.x * current.w), 0);

console.log(ro, rot)

let g = []

let re = g.map(e=>e)