process.stdin.setEncoding("utf8");

var reader = require("readline").createInterface({
  input: process.stdin,
});

console.log("Please input your message");
reader.on("line", (line) => {
  //改行ごとに"line"イベントが発火される
  //lines.push(line); //ここで、lines配列に、標準入力から渡されたデータを入れる
  console.log(line);
});