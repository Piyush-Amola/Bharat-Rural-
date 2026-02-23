async function aiChat() {
  const inputField = document.getElementById("aiInput");
  const chatBox = document.getElementById("chatBox");
  const userMessage = inputField.value.trim();
  if (!userMessage) return;

  // Show user message
  chatBox.innerHTML += `
    <div class="text-right mb-2">
      <span class="bg-blue-500 text-white px-3 py-1 rounded-lg">${userMessage}</span>
    </div>
  `;
  inputField.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  const API_KEY = "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"; // 🔴 paste your gsk_ key here

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b", // ✅ free tier model
          messages: [{ role: "user", content: userMessage }],
          temperature: 1,
          max_completion_tokens: 8192,
        }),
      },
    );

    const data = await response.json();
    console.log("Groq Response:", data);

    if (!response.ok) {
      throw new Error(data.error?.message || "Request failed");
    }

    const aiReply = data.choices[0].message.content;

    chatBox.innerHTML += `
      <div class="text-left mb-2">
        <span class="bg-gray-300 px-3 py-1 rounded-lg">${aiReply}</span>
      </div>
    `;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    chatBox.innerHTML += `
      <div class="text-red-500">Error: ${error.message}</div>
    `;
  }
}
