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

    // Абай Бот
    const botResponses={
      "Абай кім?":"Абай (Ибраһим) Құнанбайұлы — қазақ халқының ұлы ақыны, ойшылы, композиторы, қоғам қайраткері.",
      "Қара сөздер деген не?":"Абайдың 'Қара сөздері' — философиялық ойлары мен адамгершілік, білім жайлы кеңестері.",
      "Абай қай жылы туған?":"Абай 1845 жылы туған.",
      "Абайдың әндері бар ма?":"Иә, Аабайдың бірнеше әндері бар, мысалы 'Көзімнің қарасы'.",
      "Абайдың шығармашылығы":"Абай қазақ әдеби тілін қалыптастырған, философиялық ойлар жазған, қоғамға үлкен үлес қосқан.",
      "Абайдың өмірі қандай болды?":"Абай ауылда дүниеге келген, білімге құштар, қазақ халқы үшін еңбек етті.",
      "Абайдың әкесі кім?":"Құнанбай — Абайдың әкесі, беделді қоғам қайраткері.",
      "Абайдың туындылары":"Қара сөздері, өлеңдері, аудармалары, әндері."
    };

    // Батырмалар арқылы жауап беру
    const botButtons=document.querySelectorAll(".bot-buttons button");
    const botAnswer=document.getElementById("botAnswer");
    botButtons.forEach(btn=>{
      btn.onclick=()=>{
        const q=btn.getAttribute("data-q");
        botAnswer.textContent=botResponses[q]||"Кешіріңіз, мен бұл сұраққа жауап білмеймін 😅";
      }
    });