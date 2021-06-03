const json = '{"result":true, "count":42}';
const obj = JSON.parse("[" + json + "]");

// expected output: 42
obj.forEach(element => {
  console.log(element.count);
});
