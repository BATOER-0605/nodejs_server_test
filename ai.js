const { GoogleGenerativeAI } = require("@google/generative-ai");

process.stdin.setEncoding("utf8");

// Access your API key as an environment variable (see "Set up your API key" above)
const KEY = 'ここにトークン';
const genAI = new GoogleGenerativeAI(KEY);

var chat_data = [
    {
      role: "user",
      parts: [{text: "あなたは、旅行のスペシャリストです。旅行に関する質問のみを受け付けます。旅行以外に関する話題は避けてください。旅行に関する内容以外はすべて「旅行に関するお話以外できません」と回答してください。"}],
    },
  ];

async function run(msg) {
  // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const chat = model.startChat({
    history: chat_data,
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  console.log(text);
    chat_data.push(
        {
        role: "user",
        parts: [{ text: msg }]
        },
        {
        role: "model",
        parts: [{ text: text }]
        },);
}

var reader = require("readline").createInterface({
  input: process.stdin,
});

reader.on("line", (line) => {
  //改行ごとに"line"イベントが発火される
  //lines.push(line); //ここで、lines配列に、標準入力から渡されたデータを入れる
  if (line === '') {
    process.exit();
  }
  run(line);
});