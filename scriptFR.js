const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
let userMessage = null; // Variable pour stocker le message de l'utilisateur
const API_KEY = "COLLER-VOTRE-CLÉ-API"; // Collez votre clé API ici
const inputInitHeight = chatInput.scrollHeight;
const createChatLi = (message, className) => {
    // Créer un élément de chat <li> avec le message et la classe passés
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // retourner l'élément de chat <li>
}
const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");
    // Définir les propriétés et le message pour la requête API
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }
    // Envoyer une requête POST à l'API, obtenir la réponse et définir la réponse comme texte du paragraphe
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops ! Quelque chose s'est mal passé. Veuillez réessayer.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}
const handleChat = () => {
    userMessage = chatInput.value.trim(); // Récupérer le message saisi par l'utilisateur et supprimer les espaces blancs supplémentaires
    if(!userMessage) return;
    // Effacer le texte du textarea et réinitialiser sa hauteur à sa valeur par défaut
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;
    // Ajouter le message de l'utilisateur à la boîte de chat
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Afficher le message "Pensée..." en attendant la réponse
        const

