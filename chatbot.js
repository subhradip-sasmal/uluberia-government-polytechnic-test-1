async function sendMessage() {
  const input = document.getElementById("userInput").value;
  const chatbox = document.getElementById("chatbox");

  if (!input) return;

  chatbox.innerHTML += `<div class="msg user"><b>You:</b> ${input}</div>`;
  document.getElementById("userInput").value = "";

  const apiKey = "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"; // 🔴 Insert your API key here temporarily

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant for students of Uluberia Government Polytechnic. Answer only questions related to the college." },
        { role: "user", content: input }
      ]
    })
  });

  const data = await response.json();

  if (data.choices && data.choices[0]) {
    const reply = data.choices[0].message.content;
    chatbox.innerHTML += `<div class="msg bot"><b>Bot:</b> ${reply}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight;
  } else {
    chatbox.innerHTML += `<div class="msg bot"><b>Bot:</b> Sorry, something went wrong.</div>`;
  }
}
