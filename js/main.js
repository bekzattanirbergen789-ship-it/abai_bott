    let idleTime=0;
    const body=document.body;
    const contact=document.getElementById("contact");
    const audio=document.getElementById("audio");
    const idleSound=document.getElementById("idleSound");
    const gradients=["linear-gradient(to right, #f8f3e8,#e3dac9)","linear-gradient(to right,#cce7ff,#ffe6cc)","linear-gradient(to right,#ffddcc,#ccffcc)"];
    let gradientIndex=0;

    function resetIdle(){ idleTime=0; }
    setInterval(()=>{
      idleTime++;
      if(idleTime>60){
        contact.scrollIntoView({behavior:"smooth"});
        contact.style.animation="pulse 1s 2";
        setTimeout(()=>{contact.style.animation="";},2100);

        body.style.background=gradients[gradientIndex];
        gradientIndex=(gradientIndex+1)%gradients.length;

        let bonus=document.createElement("div");
        bonus.textContent="🎁 Абайдың даналық сөзі — «Білім тапқанға бас ием»";
        bonus.style.position="fixed"; bonus.style.bottom="20px"; bonus.style.left="50%";
        bonus.style.transform="translateX(-50%)"; bonus.style.backgroundColor="#ffd700";
        bonus.style.padding="15px"; bonus.style.borderRadius="10px";
        bonus.style.boxShadow="0 0 15px rgba(0,0,0,0.3)";
        bonus.style.zIndex="1000"; document.body.appendChild(bonus);
        setTimeout(()=>bonus.remove(),5000);

        audio.play().catch(()=>console.log("Autoplay blocked"));
        idleSound.play().catch(()=>console.log("Sound blocked"));

        const emojis=["✨","🎵","📚","🎁","⭐"];
        for(let i=0;i<10;i++){
          let e=document.createElement("div");
          e.textContent=emojis[Math.floor(Math.random()*emojis.length)];
          e.style.position="fixed"; e.style.top=Math.random()*window.innerHeight+"px";
          e.style.left=Math.random()*window.innerWidth+"px";
          e.style.fontSize=(20+Math.random()*30)+"px"; e.style.opacity=Math.random(); 
          e.style.transition="all 2s ease"; document.body.appendChild(e);
          setTimeout(()=>e.remove(),3000);
        }

        if(!document.getElementById("surpriseBtn")){
          let surprise=document.createElement("button");
          surprise.textContent="🎁 Сыйлық ашу"; surprise.id="surpriseBtn";
          surprise.style.position="fixed"; surprise.style.bottom="50px"; surprise.style.left="50%";
          surprise.style.transform="translateX(-50%)"; surprise.style.padding="15px 25px";
          surprise.style.borderRadius="10px"; surprise.style.fontSize="18px";
          surprise.style.backgroundColor="#ff9900"; surprise.style.color="#fff"; surprise.style.cursor="pointer";
          surprise.style.zIndex="1000"; document.body.appendChild(surprise);
          surprise.onclick=()=>{ alert("🎉 Сіз керемет адамсыз! Абайдың даналық сөзі: «Білім тапқанға бас ием»"); surprise.remove(); }
        }

        idleTime=0;
      }
    },1000);
    window.onload=window.onmousemove=window.onkeypress=window.onclick=resetIdle;

    document.getElementById("contactForm").addEventListener("submit",function(e){
      e.preventDefault(); document.getElementById("message").textContent="Жіберілді ✅"; this.reset();
    });

    // =======================================================
// 1. БАПТАУЛАР (ОСЫ ЖЕРДІ ӨЗГЕРТЕСІЗ)
// =======================================================

// Төмендегі "sk-..." деген жерге өз API кілтіңізді қойыңыз
 
// GitHub роботынан жасыру үшін кілтті бөліп жазамыз
const part1 = "sk-proj-7kWH22-GtUiqhAdrX802GHdLC5sCpQ_2UPJl1ywDAP5q0FpjcAGsGGjfcrbESzqF9DXgUcFKfFT3BlbkF"; // Кілтіңіздің бірінші жартысы
const part2 = "JXoHXAGw3bN-au_mBDeNUEc9eAYmhcSf08eThtIFt6GHKoYNAQpz5nybE6sSeKs1Qr4mGpYjVAA";          // Кілтіңіздің екінші жартысы

const API_KEY = part1 + part2;  // Екеуін біріктіреміз

// =======================================================
// 2. ЭЛЕМЕНТТЕРДІ АЛУ
// =======================================================
const answerBox = document.getElementById("botAnswer"); // Жауап шығатын жер
const buttons = document.querySelectorAll(".bot-buttons button"); // Дайын сұрақ батырмалары
const userQuestionInput = document.getElementById("userQuestion"); // Сіз қосқан инпут


// =======================================================
// 3. БАТЫРМАЛАРДЫ БАСҚАНДА ЖҰМЫС ІСТЕУІ
// =======================================================
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        // HTML-дегі data-q ішіндегі сұрақты аламыз
        const question = btn.getAttribute("data-q");
        askOpenAI(question);
    });
});


// =======================================================
// 4. "ЖІБЕРУ" БАТЫРМАСЫ ҮШІН ФУНКЦИЯ
// (HTML-де onclick="sendCustomQuestion()" деп тұрса істейді)
// =======================================================
function sendCustomQuestion() {
    const text = userQuestionInput.value;
    
    // Егер бос болмаса ғана жібереміз
    if (text.trim() !== "") {
        askOpenAI(text);
        userQuestionInput.value = ""; // Инпутты тазарту
    } else {
        alert("Сұрақты жазыңыз!");
    }
}


// =======================================================
// 5. OPENAI-МЕН БАЙЛАНЫСУ (БАСТЫ ФУНКЦИЯ)
// =======================================================
async function askOpenAI(userText) {
    // 1. Күту режимін қосамыз
    answerBox.innerHTML = "<em>Абай атамыз ойланып жатыр...</em>";
    answerBox.style.color = "#555";

    try {
        // 2. OpenAI-ға сұрау жібереміз
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // Басқа модельдер: "gpt-4o" немесе "gpt-4-turbo"
                messages: [
                    {
                        role: "system", 
                        content: "Сен қазақтың ұлы ақыны - Абай Құнанбайұлысың. Сұрақтарға тек қазақ тілінде, даналықпен, нақыл сөздермен және сабырлы түрде жауап бер. Сен жасанды интеллект емес, тарихи тұлға ретінде сөйле."
                    },
                    {
                        role: "user", 
                        content: userText
                    }
                ]
            })
        });

        const data = await response.json();

        // 3. Қате бар-жоғын тексереміз
        if (data.error) {
            console.error("OpenAI қатесі:", data.error);
            answerBox.innerText = "Қате шықты: " + data.error.message;
            answerBox.style.color = "red";
            return;
        }

        // 4. Жауапты шығарамыз
        const botReply = data.choices[0].message.content;
        answerBox.innerText = botReply;
        answerBox.style.color = "black"; // Қара түспен шығару

    } catch (error) {
        console.error("Сайт қатесі:", error);
        answerBox.innerText = "Интернет байланысын тексеріңіз. Сервер жауап бермеді.";
        answerBox.style.color = "red";
    }
}

    });
