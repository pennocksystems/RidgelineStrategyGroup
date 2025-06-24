const elevenLabsApiKey = "";
const elevenLabsVoiceId = ""; 

let ttsMuted = true;  // Start muted

function toggleTTS() {
  ttsMuted = !ttsMuted;
  const btn = document.getElementById("tts-toggle"); // Make sure this matches your button's ID
  if (ttsMuted) {
    btn.textContent = "🔇"; // muted icon
  } else {
    btn.textContent = "🔊"; // unmuted icon
  }
}

async function speak(text) {
  if (ttsMuted) return;

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${elevenLabsVoiceId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": elevenLabsApiKey
    },
    body: JSON.stringify({
      text: text,
      model_id: "eleven_monolingual_v1", // or eleven_multilingual_v2
      voice_settings: {
        stability: 0.4,
        similarity_boost: 0.8
      }
    })
  });

  if (!response.ok) {
    console.error("TTS request failed.");
    return;
  }

  const arrayBuffer = await response.arrayBuffer();
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start(0);
}

async function getOpenAIResponse(userMessage) {
  const apiKey = ""; // 🔐 Replace with your real key
  const endpoint = "https://api.openai.com/v1/chat/completions";

  const systemPrompt = `
You are a helpful AI assistant for Ridgeline Strategy Group.

Ridgeline Strategy Group includes three specialized branches:
- Campus Insight: focused on Higher Education Consulting.
- Pennock Systems: focused on AI integration and Web Design.
- 5-Star Media: focused on custom Digital Media Solutions.

Your role is to guide users through these services. In every message, subtly emphasize Ridgeline Strategy Group's value and innovation. Maintain a friendly, informative, and professional tone. Never break character.

Keep your responses under 80 words.
`;  

  const payload = {
    model: "gpt-4", // or "gpt-3.5-turbo"
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ],
    temperature: 0.7,
    max_tokens: 120  // 👈 Hard limit on token count (approx. 80–90 words)
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Lots of people are trying to access the chat right now. Hang tight or try again later. For urgent matters, head to our contact form!";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "Oops! Something went wrong while reaching Ridgeline's AI assistant.";
  }
}


function handleButtonClick(option) {
    console.log("Button clicked:", option);
    const messages = document.getElementById("chatbot-messages");

    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.textContent = option;
    messages.appendChild(userMessage);
    scrollToBottom();

    const typingBubble = document.createElement("div");
    typingBubble.classList.add("message", "bot-message", "typing");

    const dotsContainer = document.createElement("div");
    dotsContainer.classList.add("typing-dots");

    for (let i = 0; i < 3; i++) {
        const dot = document.createElement("div");
        dot.classList.add("typing-dot");
        dotsContainer.appendChild(dot);
    }

    typingBubble.appendChild(dotsContainer);
    messages.appendChild(typingBubble);
    scrollToBottom();

    setTimeout(() => {
        messages.removeChild(typingBubble);

        let botMessage = "";
                

switch (option) {
    case "Option 1️⃣":
        const botResponse = document.createElement("div");
        botResponse.classList.add("message", "bot-message");
        botResponse.innerHTML = "<strong>Awesome!</strong> 👏 You're now interacting with our live demo chatbot. I'll show you some of the helpful features I can offer your business — from answering customer questions to pulling data from your site and more. Feel free to explore!";
        messages.appendChild(botResponse);

        // 🗣️ TTS call here
        const plainText = botMessage.replace(/<[^>]*>/g, '');
        speak(plainText);
        scrollToBottom();
        return;

        case "💬 Chat":
    botMessage = "What else can I help you with today?";

    const botPromptChat = document.createElement("div");
    botPromptChat.classList.add("message", "bot-message");
    botPromptChat.innerHTML = botMessage;
    messages.appendChild(botPromptChat);
    scrollToBottom();

    setTimeout(() => {
      const inputContainer = document.createElement("div");
      inputContainer.classList.add("custom-input-container");

      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Type your question here...";
      input.classList.add("custom-input");

      const submitBtn = document.createElement("button");
      submitBtn.textContent = "Send";
      submitBtn.classList.add("chatbot-btn");
      submitBtn.onclick = async () => {
        const userInput = input.value.trim();
        if (!userInput) return;

        const userMsg = document.createElement("div");
        userMsg.classList.add("message", "user-message");
        userMsg.textContent = userInput;
        messages.appendChild(userMsg);
        scrollToBottom();

        inputContainer.remove(); // Remove input after submit

        const typingBubble = document.createElement("div");
        typingBubble.classList.add("message", "bot-message", "typing");

        const dotsContainer = document.createElement("div");
        dotsContainer.classList.add("typing-dots");

        for (let i = 0; i < 3; i++) {
            const dot = document.createElement("div");
            dot.classList.add("typing-dot");
            dotsContainer.appendChild(dot);
        }

        typingBubble.appendChild(dotsContainer);
        messages.appendChild(typingBubble);
        scrollToBottom();

        const response = await getOpenAIResponse(userInput);
        messages.removeChild(typingBubble);

        const responseMsg = document.createElement("div");
        responseMsg.classList.add("message", "bot-message");
        responseMsg.innerHTML = response;
        messages.appendChild(responseMsg);

        speak(response.replace(/<[^>]*>/g, ''));
        scrollToBottom();
      };

      inputContainer.appendChild(input);
      inputContainer.appendChild(submitBtn);
      messages.appendChild(inputContainer);
      input.focus();
      scrollToBottom();
    }, 500);
    return;

        case "📊 Services":
            botMessage = "At <strong>Ridgeline Strategy Group</strong>, we offer higher education consulting, AI & automation strategies, custom web design, and digital media solutions. <br><br>Which service aligns with your needs?<br><br>Let me know!";
            break;        
            case "🎓 Campus Insight":
                botMessage = `<strong>Campus Insight</strong> provides institutions with guidance on enrollment, executive transition, and market strategies. <br><br>Can I provide you with more details or would you like to set up a consultation?`;
                break;            
        case "🤖 Pennock Systems":
                botMessage = `<strong>Pennock Systems</strong> improves automation processes, the user-experience, and integrates artificial intelligence so your business can optimize productivity. From custom chatbots to personalized web-design, we've got you covered. <br><br>What further information can I provide for you?`;
                break;                                             
        case "📷 5-Star Media":
                botMessage = `<strong>5-Star Media</strong> enhances your brand's presence through creative digital strategies. From social media campaigns to personal brand display, we tailor solutions that will boost your online visibility. <br><br>Want to learn more? Let me know!`;
                break;          
            case "🍻Bleacher Barn":
                botMessage = `Located just <strong>beyond left field</strong>, the <a href="barn.html" target="_blank" style="color: #D4A019; text-decoration: underline;"><strong>Bleacher Barn</strong></a> is your go-to fan zone featuring an epic lineup of <strong>local breweries</strong> and unbeatable views of the game! 🍻<br><em>21+ to drink. Good times for all.</em>`;
                break;                               
            case "Team ⚾":
                botMessage = 'From <strong>rising rookies</strong> to <strong>seasoned shuckers</strong>, this squad brings the heat every inning at <em>The Shuck</em>🔥<br>What would you like to check out?👇'
                break;
            case "📋 Roster":
                botMessage = `Here's your all-access pass to the 2025 <strong>Boise Spud Shuckers</strong> lineup! 🥔⚾<br>
                    Tap below to view the full roster!<br><br>
                    <a href="roster.html" target="_blank" style="color: #D4A019; text-decoration: underline;"><strong>📋 View Team Roster</strong></a>`;
                break;
            case "📅 Schedule":
                botMessage = `Excited to catch the Shuckers in action?⚾<br>  
                Take a peek at their <strong>full schedule</strong> and plan your visit!<br> 
                <a href="schedule.html" target="_blank" style="color: #D4A019; text-decoration: underline;"><strong>📋 2025 Spud Shuckers Schedule</strong></a>`;
                break;                
            case "👤 Workload":
                botMessage = 'By handling FAQs, the chatbot frees up your team to <strong>focus on more complex or high-priority tasks💡</strong>';
                break;
            case "🌐 Multilingual":
                botMessage = "Communicate with customers in their <strong>preferred language</strong> to widen your reach. Choose from upwards of <strong>10 languages</strong> to provide users with the best experience possible🌎<br> (Rates May Apply)";
                break;
            case "🔑 External Data":
                botMessage = "We can integrate some <strong>pretty cool features</strong> when it comes to external keys that improve functionality, as well as boost the user-experience! <br>Click <a href='features.html' target='_blank'><strong>HERE</strong></a> to see some features you can choose from!";                
                break;
            case "🚀 Scalability":
                botMessage = "Scalability is key to long-term success! A scalable bot means <strong>fewer growing pains and more room for innovation</strong>🧠";
                break;
            default:
                botMessage = "I'm not sure how to respond to that. Please choose a valid option.";
                break;
        }

        const botResponse = document.createElement("div");
        botResponse.classList.add("message", "bot-message");
        botResponse.innerHTML = botMessage;
        messages.appendChild(botResponse);

        // 🗣️ TTS call here
        const plainText = botMessage.replace(/<[^>]*>/g, '');
        speak(plainText);
        scrollToBottom();

        if (option === "📊 Services") {
            setTimeout(() => {
                const buttonContainer = document.createElement("div");
                buttonContainer.classList.add("button-container");
                buttonContainer.appendChild(createButton("🎓 Campus Insight"));
                buttonContainer.appendChild(createButton("🤖 Pennock Systems"));
                buttonContainer.appendChild(createButton("📷 5-Star Media"));
                buttonContainer.appendChild(createButton("RSG MAP"));
                messages.appendChild(buttonContainer);
                scrollToBottom();
            }, 1000);
        }

        if (option === "🎓 Campus Insight") {
            setTimeout(() => {
                const buttonContainer = document.createElement("div");
                buttonContainer.classList.add("button-container");
                buttonContainer.appendChild(createButton("Learn More"));
                buttonContainer.appendChild(createButton("Consultation Form"));
                messages.appendChild(buttonContainer);
                scrollToBottom();
            }, 1000);
        }

        if (option === "🤖 Pennock Systems") {
            setTimeout(() => {
                const buttonContainer = document.createElement("div");
                buttonContainer.classList.add("button-container");
                buttonContainer.appendChild(createButton("Learn More"));
                buttonContainer.appendChild(createButton("Chatbots"));
                buttonContainer.appendChild(createButton("Web-Design"));
                buttonContainer.appendChild(createButton("Consultation Form"));
                messages.appendChild(buttonContainer);
                scrollToBottom();
            }, 1000);
        }

                if (option === "📷 5-Star Media") {
            setTimeout(() => {
                const buttonContainer = document.createElement("div");
                buttonContainer.classList.add("button-container");
                buttonContainer.appendChild(createButton("Learn More"));
                buttonContainer.appendChild(createButton("Consultation Form"));
                messages.appendChild(buttonContainer);
                scrollToBottom();
            }, 1000);
        }

    }, 1000);
}

function createButton(label, url = null) {
    let button;

    if (url) {
        button = document.createElement("a");
        button.href = url;
        button.target = "_blank";
        button.classList.add("chatbot-btn", "chatbot-link-btn");
    } else {
        button = document.createElement("button");
        button.classList.add("chatbot-btn");
        button.onclick = () => handleButtonClick(label);
    }

    button.textContent = label;
    return button;
}

function greetUser() {
  const messages = document.getElementById("chatbot-messages");

  const greetingMessage1 = document.createElement("div");
  greetingMessage1.classList.add("message", "bot-message");
  greetingMessage1.innerHTML = "Hello! My name is <strong>Stratus</strong>🤖<br>I'll be your <strong>virtual assistant</strong> during your visit today!";
  messages.appendChild(greetingMessage1);

  speak("Hello! My name is Stratus. I'll be your virtual assistant during your visit today!");

  setTimeout(() => {
    const greetingMessage2 = document.createElement("div");
    greetingMessage2.classList.add("message", "bot-message");
    greetingMessage2.innerHTML = "How can I assist you today?";
    messages.appendChild(greetingMessage2);

    speak("How can I assist you today?");
    scrollToBottom();
  }, 500);

  scrollToBottom();
}



window.onload = () => {
  const btn = document.getElementById("tts-toggle");
  btn.textContent = "🔇";  // show muted icon initially
  btn.addEventListener("click", toggleTTS);

  greetUser(); // if you want to start with greeting
};


function scrollToBottom() {
    const chatBody = document.querySelector(".chat-body");
    if (chatBody) {
        chatBody.scrollTo({
            top: chatBody.scrollHeight,
            behavior: "smooth"
        });
    }
    
}
