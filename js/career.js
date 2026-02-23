// document.getElementById("careerBtn").addEventListener("click", careerSuggest);

// function careerSuggest() {
//   const input = document.getElementById("interest").value.trim().toLowerCase();
//   const resultBox = document.getElementById("careerResult");

//   if (!input) {
//     resultBox.classList.remove("hidden");
//     resultBox.innerHTML = "⚠ Please enter your interest first.";
//     return;
//   }

//   const careerData = [
//     {
//       keywords: ["coding", "programming", "software"],
//       result:
//         "💻 You can become: Web Developer, Software Engineer, AI Engineer, App Developer.",
//     },
//     {
//       keywords: ["farming", "agriculture", "farmer"],
//       result:
//         "🌾 You can explore: AgriTech Specialist, Organic Farming, Govt Agriculture Officer.",
//     },
//     {
//       keywords: ["design", "drawing", "art"],
//       result: "🎨 You can become: Graphic Designer, UI/UX Designer, Animator.",
//     },
//     {
//       keywords: ["teaching", "education"],
//       result: "📚 You can become: Teacher, Lecturer, Online Educator.",
//     },
//     {
//       keywords: ["police", "army", "defense"],
//       result: "🛡 You can prepare for: Army, Police Officer, Defense Services.",
//     },
//   ];

//   let found = false;

//   for (let career of careerData) {
//     if (career.keywords.some((keyword) => input.includes(keyword))) {
//       resultBox.classList.remove("hidden");
//       resultBox.innerHTML = career.result;
//       found = true;
//       break;
//     }
//   }

//   if (!found) {
//     resultBox.classList.remove("hidden");
//     resultBox.innerHTML =
//       "🔍 Explore skill-based courses, ITI programs, government scholarships, or entrepreneurship opportunities.";
//   }
// }

document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chatBox");
  const sendBtn = document.getElementById("sendBtn");
  const userInput = document.getElementById("userInput");

  // 🔑 Replace with your API key. Never expose this publicly in production!
  const API_KEY = "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";

  // Handle send
  sendBtn.addEventListener("click", handleUserMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleUserMessage();
  });

  async function handleUserMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, "user");
    userInput.value = "";

    const tempMsg = addMessage("🤖 Thinking...", "ai", true);

    try {
      const aiResponse = await getAIResponse(message);
      updateMessage(tempMsg, aiResponse);
    } catch (error) {
      updateMessage(
        tempMsg,
        "⚠ Sorry, I could not fetch AI suggestions. Try again.",
      );
      console.error(error);
    }
  }

  function addMessage(text, sender, isTemporary = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className =
      sender === "user"
        ? "bg-green-600 text-white p-3 rounded-lg w-fit ml-auto"
        : "bg-gray-200 text-gray-800 p-3 rounded-lg w-fit";
    messageDiv.innerText = text;

    if (isTemporary) messageDiv.dataset.temp = "true";

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageDiv; // Return reference to allow updating
  }

  function updateMessage(element, newText) {
    element.innerText = newText;
    element.removeAttribute("data-temp");
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  async function getAIResponse(userMessage) {
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
    return data.choices[0].message.content.trim();
  }
});
