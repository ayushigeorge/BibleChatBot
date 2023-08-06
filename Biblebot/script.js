const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const chatOptions = document.getElementById("chat-options");

const bibleVerses = [
  "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. - John 3:16",
  "Trust in the LORD with all your heart and lean not on your own understanding. - Proverbs 3:5",
  "I can do all this through him who gives me strength. - Philippians 4:13",
  "Rejoice in the lord, again I say rejoice. - Phil 4:4",
  // Add more Bible verses here
];

const botResponses = {
  about:
    "I am a Biblical Chatbot. I can provide you with Bible verses and information on various biblical topics.",
  salvation:
    "Salvation is the act of accepting Jesus Christ as your Lord and Savior to receive eternal life.",
  love:
    "Love is a central theme in the Bible. One of the most well-known verses about love is 1 Corinthians 13:4-7.",
  // Add more topic responses here
};

function displayBotMessage(message) {
  const botMessage = `<div class="chat-message bot-message fade-in">${message}</div>`;
  chatLog.insertAdjacentHTML("beforeend", botMessage);
}

function displayUserMessage(message) {
  const userMessage = `<div class="chat-message user-message fade-in">${message}</div>`;
  chatLog.insertAdjacentHTML("beforeend", userMessage);
}

function getRandomBibleVerse() {
  const randomIndex = Math.floor(Math.random() * bibleVerses.length);
  return bibleVerses[randomIndex];
}

function handleUserInput() {
  const message = userInput.value.trim();
  if (message !== "") {
    displayUserMessage(message);
    userInput.value = "";

    // Check if the user's message is a topic
    const topicResponse = botResponses[message.toLowerCase()];
    if (topicResponse) {
      setTimeout(() => {
        displayBotMessage(topicResponse);
      }, 1000);
    } else {
      // Bot responds with a random Bible verse
      const botMessage = getRandomBibleVerse();
      setTimeout(() => {
        displayBotMessage(botMessage);
      }, 1000);
    }
  }
}

function sendMessage() {
  handleUserInput();

  // Remove previous bot message if any
  const botMessageElement = chatLog.querySelector(".bot-message");
  if (botMessageElement) {
    botMessageElement.remove();
  }
}

// Add chatbot options using flexbox
for (const topic in botResponses) {
  const optionButton = document.createElement("button");
  optionButton.innerText = topic.charAt(0).toUpperCase() + topic.slice(1);
  optionButton.addEventListener("click", () => {
    userInput.value = topic;
    sendMessage();
  });
  chatOptions.appendChild(optionButton);
}
