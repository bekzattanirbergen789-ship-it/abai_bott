let idleTime = 0;
const body = document.body;
const contact = document.getElementById("contact");
const audio = document.getElementById("audio");
const idleSound = document.getElementById("idleSound");
const gradients = ["linear-gradient(to right, #f8f3e8,#e3dac9)", "linear-gradient(to right,#cce7ff,#ffe6cc)", "linear-gradient(to right,#ffddcc,#ccffcc)"];
let gradientIndex = 0;

function resetIdle() { idleTime = 0; }
setInterval(() => {
    idleTime++;
    if (idleTime > 60) {
        if (contact) {
            contact.scrollIntoView({ behavior: "smooth" });
            contact.style.animation = "pulse 1s 2";
            setTimeout(() => { contact.style.animation = ""; }, 2100);
        }

        body.style.background = gradients[gradientIndex];
        gradientIndex = (gradientIndex + 1) % gradients.length;

        let bonus = document.createElement("div");
        bonus.textContent = "🎁 Абайдың даналық сөзі — «Білім тапқанға бас ием»";
        bonus.style.position = "fixed"; bonus.style.bottom = "20px"; bonus.style.left = "50%";
        bonus.style.transform = "translateX(-50%)"; bonus.style.backgroundColor = "#ffd700";
        bonus.style.padding = "15px"; bonus.style.borderRadius = "10px";
        bonus.style.boxShadow = "0 0 15px rgba(0,0,0,0.3)";
        bonus.style.zIndex = "1000"; document.body.appendChild(bonus);
        setTimeout(() => bonus.remove(), 5000);

        if (audio) audio.play().catch(() => console.log("Autoplay blocked"));
        if (idleSound) idleSound.play().catch(() => console.log("Sound blocked"));

        const emojis = ["✨", "🎵", "📚", "🎁", "⭐"];
        for (let i = 0; i < 10; i++) {
            let e = document.createElement("div");
            e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            e.style.position = "fixed"; e.style.top = Math.random() * window.innerHeight + "px";
            e.style.left = Math.random() * window.innerWidth + "px";
            e.style.fontSize = (20 + Math.random() * 30) + "px"; e.style.opacity = Math.random();
            e.style.transition = "all 2s ease"; document.body.appendChild(e);
            setTimeout(() => e.remove(), 3000);
        }

        if (!document.getElementById("surpriseBtn")) {
            let surprise = document.createElement("button");
            surprise.textContent = "🎁 Сыйлық ашу"; surprise.id = "surpriseBtn";
            surprise.style.position = "fixed"; surprise.style.bottom = "50px"; surprise.style.left = "50%";
            surprise.style.transform = "translateX(-50%)"; surprise.style.padding = "15px 25px";
            surprise.style.borderRadius = "10px"; surprise.style.fontSize = "18px";
            surprise.style.backgroundColor = "#ff9900"; surprise.style.color = "#fff"; surprise.style.cursor = "pointer";
            surprise.style.zIndex = "1000"; document.body.appendChild(surprise);
            surprise.onclick = () => { alert("🎉 Сіз керемет адамсыз! Абайдың даналық сөзі: «Білім тапқанға бас ием»"); surprise.remove(); }
        }

        idleTime = 0;
    }
}, 1000);

window.onload = window.onmousemove = window.onkeypress = window.onclick = resetIdle;

const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const msgElement = document.getElementById("message");
        if (msgElement) msgElement.textContent = "Жіберілді ✅";
        this.reset();
    });
}

// =======================================================
// 1. БАПТАУЛАР (API KEY)
// =======================================================
const part1 = "sk-proj-JpNE06sl2_fSPWkpNd51uBprOUhysJBa-ypo9nmWdPiv0-94ucYtAGOGm-hCWUNISpXMViS-39";
const part2 = "T3BlbkFJzbka-gekJHhBuyyt87zrY6Dy3AUAyZqLkSoomSjj7juhGCsVEDKCJPC5IY3tCVyJDc9u2jigYA";
const API_KEY = part1 + part2;

// =======================================================
// 2. ЭЛЕМЕНТТЕРДІ АЛУ
// =======================================================
const answerBox = document.getElementById("botAnswer");
const userQuestionInput = document.getElementById("userQuestion");

// =======================================================
// 3. СҰРАҚ ЖІБЕРУ ФУНКЦИЯСЫ
// =======================================================
function sendCustomQuestion() {
    if (!userQuestionInput) return;
    const text = userQuestionInput.value;
    if (text.trim() !== "") {
        askOpenAI(text);
        userQuestionInput.value = "";
    } else {
        alert("Сұрақ жазуды ұмыттыңыз!");
    }
}

if (userQuestionInput) {
    userQuestionInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendCustomQuestion();
    });
}

// =======================================================
// 4. OPENAI-МЕН БАЙЛАНЫСУ (Проксисіз нұсқа)
// =======================================================
async function askOpenAI(userText) {
    if (!answerBox) return;
    answerBox.innerHTML = "<em>Абай атамыз ойланып жатыр...</em>";
    answerBox.style.color = "#555";

    try {
        // Проксисіз тікелей OpenAI-ға жіберу
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "Сен Абай Құнанбайұлысың. Сұрақтарға қазақ тілінде, даналықпен, нақты дерекпен жауап бер." },
                    { role: "user", content: userText }
                ]
            })
        });

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }

        if (data.choices && data.choices.length > 0) {
            answerBox.innerText = data.choices[0].message.content;
            answerBox.style.color = "black";
        }

    } catch (error) {
        console.error("Қателік:", error);
        answerBox.innerText = "Қате орын алды. Браузерде CORS-ты өшіру керек немесе API кілтін тексеріңіз.";
        answerBox.style.color = "red";
    }
}
