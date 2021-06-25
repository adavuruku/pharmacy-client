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