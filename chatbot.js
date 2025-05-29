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
        scrollToBottom();
        return;


        case "The Shuck 🥔":
            botMessage = "Established in <strong>2002</strong> on reclaimed farmland just outside downtown Boise, the stadium celebrates Idaho’s <strong>agricultural heritage</strong> with a perfect blend of rural charm and modern ballpark innovation 🥔";
            break;        
            case "🪑Seating Chart":
                botMessage = `Here's the full layout of <strong><a href="seats.html" target="_blank" style="color: #D4A019; text-decoration: underline;">The Shuck</a></strong>! From the premium <strong>'Potato Box'</strong> seats to the rowdy <strong>'Fryer Fan Zone'</strong> in left field, there’s not a bad spud in the bunch! 🥔`;
                break;            
        case "🎟️Buy Tickets":
                botMessage = `You're just a few clicks away from catching all the action at <strong>The Shuck</strong>! Tap below to view <strong>ticket options</strong>, <strong>seating availability</strong>, and <strong>special promotions</strong> 🎫<br><br><a href="ticket.html" target="_blank" style="color: #D4A019; text-decoration: underline;"><strong>🎟️ View Ticket Options</strong></a>`;
                break;                                             
        case "🚗 Parking/Entry":
                botMessage = `General parking is <strong>free</strong> in Lot A. Gates open <strong>90 minutes before first pitch</strong>, and both mobile and printed tickets are accepted.<br>
                <a href="parking.html" target="_blank" style="color: #D4A019; text-decoration: underline;"><strong>🅿️ View Full Parking Details</strong></a>`;
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
        scrollToBottom();

        if (option === "The Shuck 🥔") {
            setTimeout(() => {
                const buttonContainer = document.createElement("div");
                buttonContainer.classList.add("button-container");
                buttonContainer.appendChild(createButton("🪑Seating Chart"));
                buttonContainer.appendChild(createButton("🎟️Buy Tickets"));
                buttonContainer.appendChild(createButton("🚗 Parking/Entry"));
                buttonContainer.appendChild(createButton("🍻Bleacher Barn"));
                messages.appendChild(buttonContainer);
                scrollToBottom();
            }, 1000);
        }

        if (option === "Team ⚾") {
            setTimeout(() => {
                const buttonContainer = document.createElement("div");
                buttonContainer.classList.add("button-container");
                buttonContainer.appendChild(createButton("📋 Roster"));
                buttonContainer.appendChild(createButton("📅 Schedule"));
                buttonContainer.appendChild(createButton("🧢 Coaches"));
                buttonContainer.appendChild(createButton("🥔 Meet Tater"));
                messages.appendChild(buttonContainer);
                scrollToBottom();
            }, 1000);
        }

        if (option === "💬24/7 Support") {
            setTimeout(() => {
                const buttonContainer = document.createElement("div");
                buttonContainer.classList.add("button-container");
                buttonContainer.appendChild(createButton("👋 Instant Support"));
                buttonContainer.appendChild(createButton("👤 Workload"));
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

// First greeting message
const greetingMessage1 = document.createElement("div");
greetingMessage1.classList.add("message", "bot-message");
greetingMessage1.innerHTML = "Hello! My name is <strong>Stratus</strong>🤖<br>I'll be your <strong>virtual assistant</strong> during your visit today!";
messages.appendChild(greetingMessage1);


// Optional delay for realism (500ms)
setTimeout(() => {
    // Second follow-up message
    const greetingMessage2 = document.createElement("div");
    greetingMessage2.classList.add("message", "bot-message");
    greetingMessage2.innerHTML = "How can I assist you today?";
    messages.appendChild(greetingMessage2);
    scrollToBottom();
}, 500); // Adjust delay as needed

scrollToBottom();

}


window.onload = greetUser;

function scrollToBottom() {
    const chatBody = document.querySelector(".chat-body");
    if (chatBody) {
        chatBody.scrollTo({
            top: chatBody.scrollHeight,
            behavior: "smooth"
        });
    }
    
}