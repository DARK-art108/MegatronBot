$(function () {
  var INDEX = 0;
  var startup_counter = 1;
  $(".chat-box-refresh").hide();
  setCookie("latitude", "undefined", "1");
  setCookie("longitude", "undefined", "1");

  var error_message_en =
    "There is an error from our side. Sorry for the inconvenience caused! :(";
  var error_message_hi = "हमारी तरफ से एक त्रुटि है। असुविधा के लिए क्षमा करें! :(";
  var error_message_zh_cn = "我们这边有一个错误。对带来的麻烦表示抱歉！ :(";
  var error_message_ja = "私たちの側からエラーがあります。ご不便をおかけして申し訳ございません。 : (";
  var error_message_es = "Hay un error de nuestra parte.¡Lamento el inconveniente causado! : (";
  var error_message_fr = "Il y a une erreur de notre côté.Désolé pour la gêne occasionnée! : (";
  var error_message_ar = "هناك خطأ من جانبنا. عذرا على الإزعاج! :(";
  var error_message_bn = "আমাদের পক্ষ থেকে একটি ত্রুটি আছে। অসুবিধার জন্য দুঃখিত! : (";
  var error_message_gu = "અમારી બાજુથી એક ભૂલ આવી છે. અસુવિધા થવા બદલ માફ કરશો! :(";
  var error_message_mr = "आमच्या बाजूने एक त्रुटी आहे. होणार्‍या गैरसोयीबद्दल क्षमस्व! :(";
  var error_message_kn = "ನಮ್ಮ ಕಡೆಯಿಂದ ದೋಷವಿದೆ.ಉಂಟಾದ ಅನಾನುಕೂಲತೆಗೆ ಕ್ಷಮಿಸಿ! : (";
  var error_message_te = "మా వైపు నుండి లోపం ఉంది.అసౌకర్యానికి చింతిస్తున్నాము! : (";
  var error_message_ta = "எங்கள் தரப்பிலிருந்து ஒரு பிழை உள்ளது. ஏற்பட்ட சிரமமத்திற்கு வருந்துகிறேன்! :(";

  var good_bye_message_en =
    "Thank you for connecting with us. Hope your queries are resolved. Have a nice day!";
  var good_bye_message_hi =
    "हमारे साथ जुड़ने के लिए धन्यवाद। आशा है कि आपकी जिज्ञासाओं का समाधान हो जाएगा। आपका दिन शुभ हो!";
  var good_bye_message_zh_cn = "感谢您与我们联系。希望您的查询得到解决。祝你今天愉快！";
  var good_bye_message_ja = "ご連絡ありがとうございます。クエリが解決されることを願っています。ごきげんよう！";
  var good_bye_message_es = "Gracias por conectar con nosotros.Espero que sus consultas estén resueltas.¡Que tengas un buen día!";
  var good_bye_message_fr = "Merci de vous être connecté.J'espère que vos requêtes sont résolues. Bonne journée!";
  var good_bye_message_ar = "شكرا لتواصلك معنا. آمل أن يتم حل استفساراتك. أتمنى لك نهارا سعيد!";
  var good_bye_message_bn = "আমাদের সাথে সংযোগ করার জন্য আপনাকে ধন্যবাদ। আশা করি আপনার প্রশ্নের সমাধান হয়েছে। আপনার দিনটি শুভ হোক!";
  var good_bye_message_gu = "અમારી સાથે જોડાવા બદલ આભાર. આશા છે કે તમારી પ્રશ્નો ઉકેલાય. તમારો દિવસ શુભ રહે!";
  var good_bye_message_mr = "आमच्याशी संपर्क साधल्याबद्दल धन्यवाद.आशा आहे की आपल्या प्रश्नांचे निराकरण होईल.आपला दिवस चांगला जावो!";
  var good_bye_message_kn = "ನಮ್ಮೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು.ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳನ್ನು ಪರಿಹರಿಸಲಾಗಿದೆ ಎಂದು ಭಾವಿಸುತ್ತೇವೆ.ದಿನವು ಒಳೆೣಯದಾಗಲಿ!";
  var good_bye_message_te = "మాతో కనెక్ట్ అయినందుకు ధన్యవాదాలు.మీ ప్రశ్నలు పరిష్కారమవుతాయని ఆశిస్తున్నాము.మంచి రోజు!";
  var good_bye_message_ta = "எங்களுடன் இணைந்ததற்கு நன்றி. உங்கள் கேள்விகள் தீர்க்கப்படும் என்று நம்புகிறேன். ஒரு நல்ல நாள்!";
 
  var conversation_msg_en =
    "Welcome to iNeuron support service. How can i assist you?";
  var conversation_msg_hi = "INeuron समर्थन सेवा में आपका स्वागत है। मैं आपकी सहायता कैसे कर सकता हूँ?";
  var conversation_msg_zh_cn = "欢迎使用iNeuron支持服务。我该如何协助您？";
  var conversation_msg_ja = "iNeuronサポートサービスへようこそ。どのように私はあなたを支援することができますか？";
  var conversation_msg_es = "Bienvenido al servicio de soporte de iNeuron.¿Cómo puedo ayudarle ?";
  var conversation_msg_fr = "Bienvenue sur le service d'assistance iNeuron. Comment puis je vous aider?";
  var conversation_msg_ar = "مرحبًا بكم في خدمة دعم iNeuron. كيف يمكنني مساعدتك؟";
  var conversation_msg_bn = "আইইউরন সহায়তা পরিষেবাতে আপনাকে স্বাগতম। আমি কীভাবে আপনাকে সহায়তা করতে পারি?";
  var conversation_msg_gu = "આઇ ન્યુરોન સપોર્ટ સર્વિસમાં આપનું સ્વાગત છે. હું તમને કેવી રીતે સહાય કરી શકું?";
  var conversation_msg_mr = "आयन्यूरॉन समर्थन सेवेमध्ये आपले स्वागत आहे. मी तुम्हाला कशी मदत करू?";
  var conversation_msg_kn = "ಐನ್ಯೂರಾನ್ ಬೆಂಬಲ ಸೇವೆಗೆ ಸುಸ್ವಾಗತ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?";
  var conversation_msg_te = "INeuron మద్దతు సేవకు స్వాగతం. నేను మీకు ఎలా సహాయం చేయగలను?";
  var conversation_msg_ta = "INeuron ஆதரவு சேவைக்கு வருக. நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?";

  var assist_msg_en = "Do you want further assistance?";
  var assist_msg_hi = "क्या आप और सहायता चाहते हैं ?";
  var assist_msg_zh_cn = "您需要进一步的协助吗？";
  var assist_msg_ja = "さらに支援が必要ですか？";
  var assist_msg_es = "¿Quieres más ayuda?";
  var assist_msg_fr = "Souhaitez-vous une assistance supplémentaire?";
  var assist_msg_ar = "هل تريد المزيد من المساعدة؟";
  var assist_msg_bn = "আপনি কি আরও সহায়তা চান?";
  var assist_msg_gu = "શું તમે આગળ સહાય માંગો છો?";
  var assist_msg_mr = "तुम्हाला आणखी मदत हवी आहे का?";
  var assist_msg_kn = "ನಿಮಗೆ ಹೆಚ್ಚಿನ ಸಹಾಯ ಬೇಕೇ?";
  var assist_msg_te = "మీకు మరింత సహాయం కావాలా?";
  var assist_msg_ta = "மேலும் உதவி வேண்டுமா?";

  var satisfy_msg_en = "Are you satisfy with your query?";
  var satisfy_msg_hi = "क्या आप और सहायता चाहते हैं ?";
  var satisfy_msg_zh_cn = "您需要进一步的协助吗？";
  var satisfy_msg_ja = "さらに支援が必要ですか？";
  var satisfy_msg_es = "¿Quieres más ayuda?";
  var satisfy_msg_fr = "Souhaitez-vous une assistance supplémentaire?";
  var satisfy_msg_bn = "আপনি কি আরও সহায়তা চান?";
  var satisfy_msg_gu = "શું તમે આગળ સહાય માંગો છો?";
  var satisfy_msg_mr = "तुम्हाला आणखी मदत हवी आहे का?";
  var satisfy_msg_kn = "ನಿಮಗೆ ಹೆಚ್ಚಿನ ಸಹಾಯ ಬೇಕೇ?";
  var satisfy_msg_te = "మీకు మరింత సహాయం కావాలా?";
  var satisfy_msg_ta = "மேலும் உதவி வேண்டுமா?";

  var button_option_msg_en = "Here are some of the options you can avail and interact with me:-";
  var button_option_msg_hi = "यहाँ कुछ विकल्प दिए गए हैं जिनका आप लाभ उठा सकते हैं और मेरे साथ बातचीत कर सकते हैं:-";
  var button_option_msg_zh_cn = "以下是您可以与我互动的一些选项：-";
  var button_option_msg_ja = "ここにあなたが利用して私と対話することができるいくつかのオプションがあります：-";
  var button_option_msg_es = "Estas son algunas de las opciones que puede aprovechar e interactuar conmigo:-";
  var button_option_msg_fr = "Voici quelques-unes des options que vous pouvez utiliser et interagir avec moi:-";
  var button_option_msg_ar = "فيما يلي بعض الخيارات التي يمكنك الاستفادة منها والتفاعل معي: -";
  var button_option_msg_bn = "আপনি যে কোনও অপশনটি উপভোগ করতে এবং আমার সাথে ইন্টারঅ্যাক্ট করতে পারেন তা এখানে:-";
  var button_option_msg_gu = "અહીં કેટલાક વિકલ્પો છે જે તમે મેળવી શકો છો અને મારી સાથે સંપર્ક કરી શકો છો:-";
  var button_option_msg_mr = "आपण घेऊ शकता आणि माझ्याशी संवाद साधू शकता असे काही पर्याय येथे आहेतः";
  var button_option_msg_kn = "ನನ್ನೊಂದಿಗೆ ನೀವು ಪಡೆಯಬಹುದಾದ ಮತ್ತು ಸಂವಹನ ಮಾಡುವ ಕೆಲವು ಆಯ್ಕೆಗಳು ಇಲ್ಲಿವೆ:-";
  var button_option_msg_te = "మీరు పొందగలిగే మరియు నాతో సంభాషించే కొన్ని ఎంపికలు ఇక్కడ ఉన్నాయి:-";
  var button_option_msg_ta = "என்னுடன் நீங்கள் பெறக்கூடிய மற்றும் தொடர்பு கொள்ளக்கூடிய சில விருப்பங்கள் இங்கே:-";


  
  /* Check Mobile */
  var isMobile = false; //initiate as false
  // device detection
  if ($(window).height() < 1000 && $(window).width() < 700) {
    isMobile = true;
  }

  /* Clear chats */
  $(".chat-box-refresh").click(function () {
    $(".chat-logs").empty();
    getMenu("startup");
  });

  /* User Location */
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // Success function
        showPosition,
        // Error function
        null,
        // Options. See MDN for details.
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    setCookie("latitude", latitude, "1");
    setCookie("longitude", longitude, "1");
  }

  window.onload = getLocation();

  /* Set Cookie Values */
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  /* Get Cookie Values */
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  /* Toggle Chat Box*/
  $("#chat-circle").click(function () {
    if (isMobile) {
      $(".chat-box").css({
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
      });
      $("#chat-circle").toggle("scale");
      $(".chat-box").toggle("scale");
      validateCookie();
    } else {
      $("#chat-circle").toggle("scale");
      $(".chat-box").toggle("scale");
      validateCookie();
    }
  });

  /* Validate Cookie */
  function validateCookie() {
    var name = getCookie("name");
    var email = getCookie("email");
    var mobile = getCookie("mobile");
    if (name == "" && email == "" && mobile == "") {
      $(".chat-box-form").show();
      $(".chat-box-body").hide();
      $(".chat-input").hide();
      $(".chat-input button").hide();
    } else {
      $(".chat-box-body").show();
      $(".chat-input").show();
      $(".chat-input button").show();
      $(".chat-box-refresh").show();
      $(".chat-box-form").hide();
      if (startup_counter == 1) {
        getMenu("startup");
        startup_counter++;
      }
    }
  }

  $(".chat-box-toggle").click(function () {
    $("#chat-circle").toggle("scale");
    $(".chat-box").toggle("scale");
  });

  /* User Message */
  function user_message(msg) {
    var str = "";
    str += "<div id='cm-msg-user-" + INDEX + "' class='chat-msg user'>";
    str += "          <div class='cm-msg-text'>";
    str += msg;
    str += "          </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#cm-msg-user-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    INDEX++;
  }

  /* Bot Message */
  function bot_message(msg) {
    var str = "";
    str += "<div id='cm-msg-bot-" + INDEX + "' class='chat-msg bot'>";
    str += "          <span class='msg-avatar'>";
    str += "            <img src='static/img/lady_bot.png'>";
    str += "          </span>";
    str += "          <div class='cm-msg-text reply'>";
    str += msg;
    str += "          </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#cm-msg-bot-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    INDEX++;
  }

  /* Bot typing  */
  function bot_typing() {
    var str = "";
    str +=
      "<div id='bot-typing-" + INDEX + "' class='chat-msg bot bot-typing'>";
    str += "          <span class='msg-avatar'>";
    str += "            <img src='static/img/lady_bot.png'>";
    str += "          </span>";
    str += "          <div class='cm-msg-text'>";
    str += "          <div id='circleWrapper'>";
    str += "            <div class='circle' id='circle1'></div>";
    str += "            <div class='circle' id='circle2'></div>";
    str += "            <div class='circle' id='circle3'></div>";
    str += "          </div>";
    str += "          </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#bot-typing-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    INDEX++;
  }

  /* Bot Links */
  function bot_links(msg) {
    var str = "";
    str += "<div id='cm-msg-bot-links-" + INDEX + "' class='chat-msg bot'>";
    str += msg;
    str += "</div>";
    $(".chat-logs").append(str);
    $("#cm-msg-bot-links-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    INDEX++;
  }
  /* Get Menu */
  function getMenu(type = "conversation") {
    var lan_name = "conversation_msg_" + getCookie("language").replace("-", "_");
    var menu_msg_en =
      "Hello " +
      getCookie("name") +
      "! Hope you are doing well. Welcome to iNeuron support service. How can i assist you?";

    var menu_msg_hi =
      "नमस्ते " +
      getCookie("name") +
      "! आशा है आप अच्छे होंगे. INeuron समर्थन सेवा में आपका स्वागत है। मैं आपकी सहायता कैसे कर सकता हूँ?";

    var menu_msg_zh_cn = "你好 " +
      getCookie("name") +
      "！希望你一切顺利。欢迎使用iNeuron支持服务。我该如何协助您？";
    var menu_msg_ja = "こんにちは " +
      getCookie("name") +
      "！あなたがうまくやっていることを願っています。 iNeuronサポートサービスへようこそ。どのように私はあなたを支援することができますか？";
    var menu_msg_es = "Hola " +
      getCookie("name") +
      "! Espero que estés bien. Bienvenido al servicio de soporte de iNeuron. ¿Cómo puedo ayudarle?";
    var menu_msg_fr = "Bonjour " +
      getCookie("name") +
      "! J'espère que tu vas bien. Bienvenue sur le service d'assistance iNeuron. Comment puis je vous aider?";
    var menu_msg_ar = "مرحبا " +
      getCookie("name") +
      "! آمل أن تبلي بلاء حسنا. مرحبًا بكم في خدمة دعم iNeuron. كيف يمكنني مساعدتك؟";
    var menu_msg_bn = "হ্যালো " +
      getCookie("name") +
      "! আপনি ভাল করছেন আশা করি। আইইউরন সহায়তা পরিষেবাতে আপনাকে স্বাগতম। আমি কীভাবে আপনাকে সহায়তা করতে পারি?";
    var menu_msg_gu = "નમસ્તે " +
      getCookie("name") +
      "! આશા છે કે તમે સારું કરી રહ્યા છો. આઇ ન્યુરોન સપોર્ટ સર્વિસમાં આપનું સ્વાગત છે. હું તમને કેવી રીતે સહાય કરી શકું?";
    var menu_msg_mr = "नमस्कार " +
      getCookie("name") +
      "! आशा आहे तुमचे उत्तम चालले आहे. आयन्यूरॉन समर्थन सेवेमध्ये आपले स्वागत आहे. मी तुम्हाला कशी मदत करू?";
    var menu_msg_kn = "ಹಲೋ " +
      getCookie("name") +
      "! ನೀನು ಆರಾಮವಾಗಿ ಇರುವೆಯೆಂದು ಭಾವಿಸುತ್ತೇನೆ. ಐನ್ಯೂರಾನ್ ಬೆಂಬಲ ಸೇವೆಗೆ ಸುಸ್ವಾಗತ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?";
    var menu_msg_te = "హలో " +
      getCookie("name") +
      "! మీరు బాగా చేస్తున్నారని ఆశిస్తున్నాను. INeuron మద్దతు సేవకు స్వాగతం. నేను మీకు ఎలా సహాయం చేయగలను?";
    var menu_msg_ta = "வணக்கம் " +
      getCookie("name") +
      "! நீங்கள் நன்றாக இருக்கிறீர்கள் என்று நம்புகிறேன். INeuron ஆதரவு சேவைக்கு வருக. நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?";

    var startup_lan = "menu_msg_" + getCookie("language").replace("-", "_");
    var str = "";
    if (type == "startup") {
      str +=
        "<div id='cm-msg-menu-startup-" + INDEX + "' class='chat-msg bot'>";
      str += "  <span class='msg-avatar'>";
      str += "    <img src='static/img/lady_bot.png' />";
      str += "  </span>";
      str += "  <div class='cm-msg-text'>";
      str += eval(startup_lan);
      str += "  </div>";
      
      str += "  <div class='cm-msg-button'>";
      str += "    <ul>";
      str += "      <li>";
      str +=
        "          <button class='btn btn-sm btn-outline-primary general-form'>General</button>";
      str += "      </li>";
      str += "      <li>";
      str +=
        "          <button class='btn btn-sm btn-outline-primary technical-form'>Technical</button>";
      str += "      </li>";
      str += "      <li>";
      str +=
        "          <button class='btn btn-sm btn-outline-primary language-change'>Change language</button>";
      str += "      </li>";
      str += "    </ul>";
      str += "  </div>";

      str += "</div>";
      $(".chat-logs").append(str);
      $("#cm-msg-menu-startup-" + INDEX.toString())
        .hide()
        .fadeIn(1000);
      $(".chat-logs")
        .stop()
        .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
      speak(eval(startup_lan));
      INDEX++;
    } else {
      str +=
        "<div id='cm-msg-menu-conversation-" +
        INDEX +
        "' class='chat-msg bot'>";
      str += "  <span class='msg-avatar'>";
      str += "    <img src='static/img/lady_bot.png' />";
      str += "  </span>";
      str += "  <div class='cm-msg-text'>";
      str += eval(lan_name);
      str += "  </div>";
      
      str += "  <div class='cm-msg-button'>";
      str += "    <ul>";
      str += "      <li>";
      str +=
        "          <button class='btn btn-sm btn-outline-primary general-form'>General</button>";
      str += "      </li>";
      str += "      <li>";
      str +=
        "          <button class='btn btn-sm btn-outline-primary technical-form'>Technical</button>";
      str += "      </li>";
      str += "      <li>";
      str +=
        "          <button class='btn btn-sm btn-outline-primary language-change'>Change language</button>";
      str += "      </li>";
      str += "    </ul>";
      str += "  </div>";

      str += "</div>";
      $(".chat-logs").append(str);
      $("#cm-msg-menu-conversation-" + INDEX.toString())
        .hide()
        .fadeIn(1000);
      $(".chat-logs")
        .stop()
        .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
      speak(eval(lan_name));
      var lan_name = "conversation_msg_" + getCookie("language").replace("-", "_");
      INDEX++;
    }

    $(".language-change").on("click", function (e) {
      e.preventDefault();
      var str = "";
      str += "<div id='language-change-" + INDEX + "' class='chat-msg bot'>";
      str += "          <span class='msg-avatar'>";
      str += "            <img src='static/img/lady_bot.png'>";
      str += "          </span>";
      str += "          <div class='cm-msg-text'>";
      str += "             <label for='Language'>Choose Language</label>";
      str += "             <select class='form-control language_change' id='language-change-select-" + INDEX + "' name='language' required>";
      str += "              <option value=''>Select language</option>";
      str += "              <option value='en'>English</option>";
      str += "              <option value='hi'>Hindi</option>";
      str += "              <option value='zh-cn'>Chinese</option>";
      str += "              <option value='ja'>Japanese</option>";
      str += "              <option value='es'>Spanish</option>";
      str += "              <option value='fr'>French</option>";
      str += "              <option value='ar'>Arabic</option>";
      str += "              <option value='bn'>Bengali</option>";
      str += "              <option value='gu'>Gujarati</option>";
      str += "              <option value='mr'>Marathi</option>";
      str += "              <option value='kn'>kannada</option>";
      str += "              <option value='te'>Telugu</option>";
      str += "             <option value='ta'>Tamil</option>";
      str += "            </select>";
      str += "             </div>";
      str += "          </div>";
      str += "        </div>";
      
      $(".chat-logs").append(str);
      $('#language-change-select-' + INDEX.toString()).val(getCookie("language"));
      $("#language-change-" + INDEX.toString())
        .hide()
        .fadeIn(1000);
      $(".chat-logs")
        .stop()
        .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
      INDEX++;

      $(".language_change")
        .unbind()
        .change(function (e) {
          e.preventDefault();
          if ($(this).val() != getCookie("language")) {
            setCookie("language", $(this).val(), "en");
            $(".language_change").attr("disabled", "disabled");
            var lan_name_change = "assist_msg_" + getCookie("language").replace("-", "_");
            bot_message("Your language has changed to " + $(".language_change option:selected:last").text());
            bot_message(eval(lan_name_change));
              assistanceButton();
            speak("Your language has changed to " + $(".language_change option:selected:last").text());
            speak(eval(lan_name_change));
            
          } else {
            $(".language_change").attr("disabled", "disabled");
            var lan_name_change = "assist_msg_" + getCookie("language").replace("-", "_");
              bot_message("Your chosen language is already " + $(".language_change option:selected:last").text());
            bot_message(eval(lan_name_change));
              assistanceButton();
            speak("Your chosen language is already " + $(".language_change option:selected:last").text());
            speak(eval(lan_name_change));
          }
        });
    });

    /* General query Form */
    $(".general-form").on("click", function (e) {
      e.preventDefault();
      general_form_generate();
    });

    /* General query Form */
    $(".technical-form").on("click", function (e) {
      e.preventDefault();
      technical_form_generate();
    });

  }

  function getDate() {
    var today = new Date();
    return (
      today.getFullYear() +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2)
    );
  }

  /* General form generate */
  function general_form_generate() {
    var button_lan = "button_option_msg_" + getCookie("language").replace("-", "_");
    var str = "";
    str += "<div id='general-form-" + INDEX + "' class='chat-msg bot'>";
    str += "          <span class='msg-avatar'>";
    str += "            <img src='static/img/lady_bot.png'>";
    str += "          </span>";
    str += "          <div class='cm-msg-text'>";
    // str += "Please select from the following";
    str += eval(button_lan);
    str += "  </div>";

    str += "  <div class='cm-msg-button'>";
    str += "    <ul>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary course'>Course</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary class'>Class</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary resume'>Resume</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary internship'>Internship</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary certificate'>Certificate</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary batch-query'>Batch issue</button>";
    str += "      </li>";
    str += "    </ul>";
    str += "  </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#general-form-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    speak(eval(button_lan));
    INDEX++;

    /* course form generate */
    $(".course").on("click", function (e) {
      e.preventDefault();
      course_form_generate();
    });

    /* class form generate */
    $(".class").on("click", function (e) {
      e.preventDefault();
      class_form_generate();
    });

    /* internship form generate */
    $(".internship").on("click", function (e) {
      e.preventDefault();
      internship_form_generate();
    });

    /* certificate form generate */
    $(".certificate").on("click", function (e) {
      e.preventDefault();
      certificate_form_generate();
    });

    /* batch-query form generate */
    $(".batch-query").on("click", function (e) {
      e.preventDefault();
      batch_query_form_generate();
    });
    
    
  }

  /* Technical form generate */
  function technical_form_generate() {
    var button_lan = "button_option_msg_" + getCookie("language").replace("-", "_");
    var str = "";
    str += "<div id='technical-form-" + INDEX + "' class='chat-msg bot'>";
    str += "          <span class='msg-avatar'>";
    str += "            <img src='static/img/lady_bot.png'>";
    str += "          </span>";
    str += "          <div class='cm-msg-text'>";
    // str += "Please select from the following";
    str += eval(button_lan);
    str += "  </div>";

    str += "  <div class='cm-msg-button'>";
    str += "    <ul>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary anaconda'>Anaconda</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary cnn'>CNN</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary bert'>BERT</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary tfod'>TFOD</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary others_technical'>Others</button>";
    str += "      </li>";
    str += "    </ul>";
    str += "  </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#technical-form-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    speak(eval(button_lan));
    INDEX++;

    /* others_technical form generate */
    $(".others_technical").on("click", function (e) {
      e.preventDefault();
      others_technical_form_generate();
    });

  }

  // others_technical_form_generate
  function others_technical_form_generate() {
    var str = "";
    str += "<div id='others_technical-query-form-" + INDEX + "' class='chat-msg bot'>";
    str += "          <span class='msg-avatar'>";
    str += "            <img src='static/img/lady_bot.png'>";
    str += "          </span>";
    str += "          <div class='cm-msg-text'>";
    str +=
      "           <form id='others_technical-query-form' name='technical-query-form' class='others_technical-query-generate-form' method='POST'>";
    str +=
      "               <p>To proceed forward please enter your technical query:</p>";
    str += "               <div class='form-row'>";
    str += "                  <div class='form-group'>";
    str += "                   <label for='topic'>Technical Query</label>";
    str +=
      "                      <input type='text' id='others_technical-query-" + INDEX + "' class='form-control others_technical-query'  name='query' value='' required/>";
    str += "                  </div>";
    str += "             </div>";
    str +=
      "             <button type='submit' class='btn btn-primary form-submit' >Submit </button>";
    str += "           </form>";
    str += "          </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("others_technical-query-form-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);

    INDEX++;
  }

/* course form generate */
  function course_form_generate() {
    var button_lan = "button_option_msg_" + getCookie("language").replace("-", "_");
    var str = "";
    str += "<div id='course-form-" + INDEX + "' class='chat-msg bot'>";
    str += "          <span class='msg-avatar'>";
    str += "            <img src='static/img/lady_bot.png'>";
    str += "          </span>";
    str += "          <div class='cm-msg-text'>";
    str += eval(button_lan);
    str += "  </div>";

    str += "  <div class='cm-msg-button'>";
    str += "    <ul>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary course-details'>Course details</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary course-registration'>Course Registration</button>";
    str += "      </li>";
    str += "    </ul>";
    str += "  </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#course-form-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    speak(eval(button_lan));
    INDEX++;

    /* course-details form generate */
    $(".course-details").on("click", function (e) {
      e.preventDefault();
      course_details_form_generate();
    });

    /* course-details form generate */
    $(".course-registration").on("click", function (e) {
      e.preventDefault();
      course_registration_form_generate();
    });

  }

  /* course details form generate */
  function course_details_form_generate() {
    var button_lan = "button_option_msg_" + getCookie("language").replace("-", "_");
    var str = "";
    str += "<div id='course-details-form-" + INDEX + "' class='chat-msg bot'>";
    str += "          <span class='msg-avatar'>";
    str += "            <img src='static/img/lady_bot.png'>";
    str += "          </span>";
    str += "          <div class='cm-msg-text'>";
    str += eval(button_lan);
    str += "  </div>";

    str += "  <div class='cm-msg-button'>";
    str += "    <ul>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary fees'>Course fees</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary timings'>Course Timings</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary syllabus'>Syllabus</button>";
    str += "      </li>";
    str += "    </ul>";
    str += "  </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#course-details-form-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    speak(eval(button_lan));
    INDEX++;

  }

  /* course registration form generate */
  function course_registration_form_generate() {
    var button_lan = "button_option_msg_" + getCookie("language").replace("-", "_");
    var str = "";
    str += "<div id='course-registration-form-" + INDEX + "' class='chat-msg bot'>";
    str += "          <span class='msg-avatar'>";
    str += "            <img src='static/img/lady_bot.png'>";
    str += "          </span>";
    str += "          <div class='cm-msg-text'>";
    str += eval(button_lan);
    str += "  </div>";

    str += "  <div class='cm-msg-button'>";
    str += "    <ul>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary ML'>ML</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary DL'>DL</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary BAM'>Analytics</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary python'>Python</button>";
    str += "      </li>";
    str += "      <li>";
    str += "         <div class='btn-group dropright'>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary dropdown-toggle more' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>More</button>";
    str += "         <div class='dropdown-menu'>";
    str +="                 <button class='dropdown-item DevOps' type='button'>DevOps</button>";
    str+="                 <button class='dropdown-item DSA' type='button'>Data Structure algorithm</button>";
    str+="                 <button class='dropdown-item NLP' type='button'>NLP</button>";
    str+="                 <button class='dropdown-item Others' type='button'>Others</button>";
    str+="           </div>";
    str+="           </div>";
    str += "      </li>";
    str += "    </ul>";
    str += "  </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#course-registration-form-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    speak(eval(button_lan));
    INDEX++;

  }

   /* internship form generate */
  function internship_form_generate() {
    var button_lan = "button_option_msg_" + getCookie("language").replace("-", "_");
    var str = "";
    str += "<div id='internship-form-" + INDEX + "' class='chat-msg bot'>";
    str += "          <span class='msg-avatar'>";
    str += "            <img src='static/img/lady_bot.png'>";
    str += "          </span>";
    str += "          <div class='cm-msg-text'>";
    str += eval(button_lan);
    str += "  </div>";

    str += "  <div class='cm-msg-button'>";
    str += "    <ul>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary internship_start_date'>Internship start date</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary internship_query_button'>Internship query</button>";
    str += "      </li>";
    str += "    </ul>";
    str += "  </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#internship-form-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    speak(eval(button_lan));
    INDEX++;

    /* Internship query button form generate */
    $('.internship_query_button').on('click', function (e) {
      e.preventDefault();
      internship_query_button_form_generate();
    })

  }

  /* certificate form generate */
  function certificate_form_generate() {
    var button_lan = "button_option_msg_" + getCookie("language").replace("-", "_");
    var str = "";
    str += "<div id='certificate-form-" + INDEX + "' class='chat-msg bot'>";
    str += "          <span class='msg-avatar'>";
    str += "            <img src='static/img/lady_bot.png'>";
    str += "          </span>";
    str += "          <div class='cm-msg-text'>";
    str += eval(button_lan);
    str += "  </div>";

    str += "  <div class='cm-msg-button'>";
    str += "    <ul>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary generate_certificate'>Generate certificate</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary certificate_query'>Certificate query</button>";
    str += "      </li>";
    str += "    </ul>";
    str += "  </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#certificate-form-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    speak(eval(button_lan));
    INDEX++;

    /* Internship query button form generate */
    $('.certificate_query').on('click', function (e) {
      e.preventDefault();
      certificate_query_form_generate();
    })

  }

      // fees,timings, syllabus button form submit
  $(document).on("click", ".fees, .timings, .syllabus, .class-materials, .class-link, .recordings, .resume, .internship_start_date", function (e) {
    var class_name = $(e.target).attr('class');
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/dbFetchDetails",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          var batches = response.list_of_courses;
          if (class_name.toLowerCase().indexOf("fees") >= 0){
            course_detail_form_generate("course_fees_query", batches);
          }
          else if (class_name.toLowerCase().indexOf("timings") >= 0) {
            course_detail_form_generate("course_timings", batches);
          }
          else if (class_name.toLowerCase().indexOf("class-materials") >= 0) {
            file_not_found_form_generate("file_not_found", batches);
          }
          else if (class_name.toLowerCase().indexOf("class-link") >= 0) {
            class_link_form_generate("class_link", batches);
          }
          else if (class_name.toLowerCase().indexOf("recordings") >= 0) {
            class_link_form_generate("recordings_not_avilable", batches);
          }
          else if (class_name.toLowerCase().indexOf("resume") >= 0) {
            course_detail_form_generate("Resume_discussion_session_details", batches);
          }
          else if (class_name.toLowerCase().indexOf("internship_start_date") >= 0) {
            course_detail_form_generate("internship_query", batches);
          }
          else{
            course_detail_form_generate("course_contents", batches);
          }
          
          
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
  });

  // course registration button form submit
  $(document).on("click", ".ML, .DL, .NLP, .BAM, .python, .DevOps, .DSA, .Others", function (e) {
    var class_name = $(e.target).attr('class');
    if (class_name.toLowerCase().indexOf("ml") >= 0) {
      var url_link = 'https://ineuron.ai/home/courses/machine-learning';
    }
    else if (class_name.toLowerCase().indexOf("dl") >= 0){
      var url_link = 'https://ineuron.ai/home/courses/deep-learning';
    }
    else if (class_name.toLowerCase().indexOf("bam") >= 0){
      var url_link = 'https://ineuron.ai/home/courses/data-analysis';
    }
    else if (class_name.toLowerCase().indexOf("python") >= 0){
      var url_link = 'https://ineuron.ai/home/courses/python-language';
    }
    else if (class_name.toLowerCase().indexOf("devops") >= 0){
      var url_link = 'https://ineuron.ai/home/courses/devops';
    }
    else if (class_name.toLowerCase().indexOf("dsa") >= 0) {
      var url_link = 'https://ineuron.ai/home/courses/data-structure-algorithm';
    }
    else if (class_name.toLowerCase().indexOf("nlp") >= 0) {
      var url_link = 'https://ineuron.ai/home/courses/nlp';
    }
    else{
      var url_link = 'https://ineuron.ai/home/courses?keyword=';
    }
    var json_data = {
      "msg": "You can enroll yourself from below link",
      "url_link": url_link
    };
    var assist_msg = "assist_msg_" + getCookie("language").replace("-", "_");
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/languageTranslateWithThumbnail",
      dataType: "json",
      data: JSON.stringify(json_data),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          var html_parse = thumbnail_generate(response.result);
          bot_message(response.speak_msg);
          speak(response.speak_msg);
          bot_links(html_parse);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              if (value_index == 'Do you want further assistance?') {
                button = 'assistance';
              } else { button = '' }
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
          // if (class_name.toLowerCase().indexOf("ml") >= 0) {
          //   bot_message(response.result + ":- <a href='https://ineuron.ai/home/courses/machine-learning' target='_blank'>https://ineuron.ai/home/courses/machine-learning</a>");
          //   bot_message(eval(assist_msg));
          //   assistanceButton();
          //   speak(response.result);
          //   speak(eval(assist_msg));

          // }
          // else if (class_name.toLowerCase().indexOf("dl") >= 0) {
          //   bot_message(response.result + ":- <a href='https://ineuron.ai/home/courses/deep-learning' target='_blank'>https://ineuron.ai/home/courses/deep-learning</a>");
          //   bot_message(eval(assist_msg));
          //   assistanceButton();
          //   speak(response.result);
          //   speak(eval(assist_msg));
          // }
          // else if (class_name.toLowerCase().indexOf("bam") >= 0) {
          //   bot_message(response.result + ":- <a href='https://ineuron.ai/home/courses/data-analysis' target='_blank'>https://ineuron.ai/home/courses/data-analysis</a>");
          //   bot_message(eval(assist_msg));
          //   assistanceButton();
          //   speak(response.result);
          //   speak(eval(assist_msg));
          // }
          // else if (class_name.toLowerCase().indexOf("python") >= 0) {
          //   bot_message(response.result + ":- <a href='https://ineuron.ai/home/courses/python-language' target='_blank'>https://ineuron.ai/home/courses/python-language</a>");
          //   bot_message(eval(assist_msg));
          //   assistanceButton();
          //   speak(response.result);
          //   speak(eval(assist_msg));
          // }
          // else if (class_name.toLowerCase().indexOf("devops") >= 0) {
          //   bot_message(response.result + ":- <a href='https://ineuron.ai/home/courses/devops' target='_blank'>https://ineuron.ai/home/courses/devops</a>");
          //   bot_message(eval(assist_msg));
          //   assistanceButton();
          //   speak(response.result);
          //   speak(eval(assist_msg));
          // }
          // else if (class_name.toLowerCase().indexOf("dsa") >= 0) {
          //   bot_message(response.result + ":- <a href='https://ineuron.ai/home/courses/data-structure-algorithm' target='_blank'>https://ineuron.ai/home/courses/data-structure-algorithm</a>");
          //   bot_message(eval(assist_msg));
          //   assistanceButton();
          //   speak(response.result);
          //   speak(eval(assist_msg));
          // }
          // else if (class_name.toLowerCase().indexOf("nlp") >= 0) {
          //   bot_message(response.result + ":- <a href='https://ineuron.ai/home/courses/nlp' target='_blank'>https://ineuron.ai/home/courses/nlp</a>");
          //   bot_message(eval(assist_msg));
          //   assistanceButton();
          //   speak(response.result);
          //   speak(eval(assist_msg));
          // }
          // else {
          //   bot_message(response.result + ":- <a href='https://ineuron.ai/home/courses?keyword=' target='_blank'>https://ineuron.ai/home/courses?keyword=</a>");
          //   bot_message(eval(assist_msg));
          //   assistanceButton();
          //   speak(response.result);
          //   speak(eval(assist_msg));
          // }


        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
  });

       // technical button submit response
  $(document).on("click", ".anaconda, .cnn, .bert, .tfod", function (e) {
    var class_name = $(e.target).attr('class');
    if (class_name.toLowerCase().indexOf("anaconda") >= 0) {
      var technical_concept = "anaconda_installation"
    }
    else if (class_name.toLowerCase().indexOf("cnn") >= 0) {
      var technical_concept = "cnn_question"
    }
    else if (class_name.toLowerCase().indexOf("bert") >= 0) {
      var technical_concept = "Bert_query"
    }
    else{
      var technical_concept = "tfod_error"
    }
    var json_data = {
      "msg": "You can refer this link :-",
      "technical_concept": technical_concept
    };
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(json_data),
      url: "/api/technicalButtonPrediction",
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);       
          var html_parse = thumbnail_generate(response.result);
          bot_message(response.speak_msg);
          speak(response.speak_msg);
          bot_links(html_parse);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          // assistanceButton();
          satisfiedTechnical();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
  });

  // generate_certificate
  $(document).on("click", ".generate_certificate", function (e) {
    var json_data = {
      "msg": "You can request for certificate from the internship portal. Your leads will approve & generate certificate for you. Here is the portal link"
    };
    var assist_msg = "assist_msg_" + getCookie("language").replace("-", "_");
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/languageTranslate",
      dataType: "json",
      data: JSON.stringify(json_data),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          bot_message(response.result + ":- <a href='https://internship-ineuron.com/' target='_blank'>https://internship-ineuron.com/</a>");
            bot_message(eval(assist_msg));
            assistanceButton();
            speak(response.result);
            speak(eval(assist_msg));
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
  });
  
  /* class form generate */
  function class_form_generate() {
    var button_lan = "button_option_msg_" + getCookie("language").replace("-", "_");
    var str = "";
    str += "<div id='class-form-" + INDEX + "' class='chat-msg bot'>";
    str += "          <span class='msg-avatar'>";
    str += "            <img src='static/img/lady_bot.png'>";
    str += "          </span>";
    str += "          <div class='cm-msg-text'>";
    str += eval(button_lan);
    str += "  </div>";

    str += "  <div class='cm-msg-button'>";
    str += "    <ul>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary dashboard-query'>Dashboard query</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary class-link'>Class link</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary recordings'>Recordings</button>";
    str += "      </li>";
    str += "    </ul>";
    str += "  </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#class-form-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    speak(eval(button_lan));
    INDEX++;

    /* dashboard-query form generate */
    $(".dashboard-query").on("click", function (e) {
      e.preventDefault();
      dashboard_query_form_generate();
    });

  }

  /* dashboard_query form generate */
  function dashboard_query_form_generate() {
    var button_lan = "button_option_msg_" + getCookie("language").replace("-", "_");
    var str = "";
    str += "<div id='dashboard-query-form-" + INDEX + "' class='chat-msg bot'>";
    str += "          <span class='msg-avatar'>";
    str += "            <img src='static/img/lady_bot.png'>";
    str += "          </span>";
    str += "          <div class='cm-msg-text'>";
    str += eval(button_lan);
    str += "  </div>";

    str += "  <div class='cm-msg-button'>";
    str += "    <ul>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary dashboard-access'>Dashboard access</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary class-materials'>Class materials NA</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary assignment-query'>Assignment query</button>";
    str += "      </li>";
    str += "    </ul>";
    str += "  </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#dashboard-query-form-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    speak(eval(button_lan));
    INDEX++;

    $('.assignment-query').on('click', function(e){
      e.preventDefault();
      assignment_query_form_generate();
    })
  }

  // dashboard-access form submit
  $(document).on("click", ".dashboard-access", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/dbFetchDetailsForRegisteredStudent",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          var batches = response.list_of_courses;
          dashboard_access_form_generate(batches);

         } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
  });

  /* Dashboard access form generate */
  function dashboard_access_form_generate(batches) {
    var list_course = JSON.parse(batches);
    var str = "";
    str += "<div id='dashboard-access-form-" + INDEX + "' class='chat-msg bot'>";
    str += "          <span class='msg-avatar'>";
    str += "            <img src='static/img/lady_bot.png'>";
    str += "          </span>";
    str += "          <div class='cm-msg-text'>";
    str +=
      "           <form id='dashboard-access-form' class='dashboard-access-generate-form' method='POST'>";
    str +=
      "               <p>Here are list of your registered batches. please select course:</p>";
    str += "               <div class='form-row'>";
    str += "              <div class='form-group'>";
    str += "                   <label for='coursename'>Registered course</label>";
    str +=
      "                      <select name='coursename' id='coursename' class='form-control' required>";
    str += "                        <option value=''>Select course</option>";
    list_course.forEach(function (item, index) {
      console.log(item, index);
      str +=
        "<option class='' value='" + item.unique_batch_name + "'>" + item.unique_course_name + "</option>";
    });
    str += "                    </select>";
    str += "               </div>";
    str += "             </div>";
    str +=
      "             <button type='submit' class='btn btn-primary form-submit' >Submit </button>";
    str += "           </form>";
    str += "          </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#dashboard-access-form-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    INDEX++;
  }

  // assignment_query_form_generate
  function assignment_query_form_generate() {
    var str = "";
    str += "<div id='assignment-query-form-" + INDEX + "' class='chat-msg bot'>";
    str += "          <span class='msg-avatar'>";
    str += "            <img src='static/img/lady_bot.png'>";
    str += "          </span>";
    str += "          <div class='cm-msg-text'>";
    str +=
      "           <form id='assignment-query-form' class='assignment-query-generate-form' method='POST'>";
    str +=
      "               <p>To proceed forward please enter your query:</p>";
    str += "               <div class='form-row'>";
    str += "                  <div class='form-group'>";
    str += "                   <label for='topic'>Assignment Query</label>";
    str +=
      "                      <input type='text' id='query-" + INDEX + "' class='form-control'  name='query' required/>";
    str += "                  </div>";
    str += "             </div>";
    str +=
      "             <button type='submit' class='btn btn-primary form-submit' >Submit </button>";
    str += "           </form>";
    str += "          </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("assignment-query-form-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);

    INDEX++;
  }

  // internship_query_button_form_generate
  function internship_query_button_form_generate() {
    var str = "";
    str += "<div id='internship-query-button-form-" + INDEX + "' class='chat-msg bot'>";
    str += "          <span class='msg-avatar'>";
    str += "            <img src='static/img/lady_bot.png'>";
    str += "          </span>";
    str += "          <div class='cm-msg-text'>";
    str +=
      "           <form id='internship-query-button-form' class='internship-query-button-generate-form' method='POST'>";
    str +=
      "               <p>To proceed forward please enter your query:</p>";
    str += "               <div class='form-row'>";
    str += "                  <div class='form-group'>";
    str += "                   <label for='topic'>Internship Query</label>";
    str +=
      "                      <input type='text' id='internship-query-button-" + INDEX + "' class='form-control'  name='query' required/>";
    str += "                  </div>";
    str += "             </div>";
    str +=
      "             <button type='submit' class='btn btn-primary form-submit' >Submit </button>";
    str += "           </form>";
    str += "          </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("internship-query-button-form-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);

    INDEX++;
  }

  // certificate_query_form_generate
  function certificate_query_form_generate() {
    var str = "";
    str += "<div id='certificate_query-button-form-" + INDEX + "' class='chat-msg bot'>";
    str += "          <span class='msg-avatar'>";
    str += "            <img src='static/img/lady_bot.png'>";
    str += "          </span>";
    str += "          <div class='cm-msg-text'>";
    str +=
      "           <form id='certificate_query-form' class='certificate_query-generate-form' method='POST'>";
    str +=
      "               <p>To proceed forward please enter your query:</p>";
    str += "               <div class='form-row'>";
    str += "                  <div class='form-group'>";
    str += "                   <label for='topic'>Certificate Query</label>";
    str +=
      "                      <input type='text' id='certificate_query-" + INDEX + "' class='form-control'  name='query' required/>";
    str += "                  </div>";
    str += "             </div>";
    str +=
      "             <button type='submit' class='btn btn-primary form-submit' >Submit </button>";
    str += "           </form>";
    str += "          </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("certificate_query-form-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);

    INDEX++;
  }

  // batch_query_form_generate
  function batch_query_form_generate() {
    var str = "";
    str += "<div id='batch_query-form-" + INDEX + "' class='chat-msg bot'>";
    str += "          <span class='msg-avatar'>";
    str += "            <img src='static/img/lady_bot.png'>";
    str += "          </span>";
    str += "          <div class='cm-msg-text'>";
    str +=
      "           <form id='batch_query-form' class='batch_query-generate-form' method='POST'>";
    str +=
      "               <p>To proceed forward please enter your query:</p>";
    str += "               <div class='form-row'>";
    str += "                  <div class='form-group'>";
    str += "                   <label for='topic'>Batch Query</label>";
    str +=
      "                      <input type='text' id='batch_query-" + INDEX + "' class='form-control'  name='query' required/>";
    str += "                  </div>";
    str += "             </div>";
    str +=
      "             <button type='submit' class='btn btn-primary form-submit' >Submit </button>";
    str += "           </form>";
    str += "          </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("batch_query-form-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);

    INDEX++;
  }

/* Class link form generate */
  function class_link_form_generate(course_detail, batches) {
    var list_course = JSON.parse(batches);
    var str = "";
    str += "<div id='" + course_detail + "-form-" + INDEX + "' class='chat-msg bot'>";
    str += "          <span class='msg-avatar'>";
    str += "            <img src='static/img/lady_bot.png'>";
    str += "          </span>";
    str += "          <div class='cm-msg-text'>";
    str +=
      "           <form id='" + course_detail + "-form' class='" + course_detail + "-generate-form' method='POST'>";
    str +=
      "               <p>To proceed forward please select course:</p>";
    str += "               <div class='form-row'>";
    str += "              <div class='form-group'>";
    str += "                   <label for='coursename'>Registered course</label>";
    str +=
      "                      <select name='coursename' id='coursename' class='form-control' required>";
    str += "                        <option value=''>Select course</option>";
    list_course.forEach(function (item, index) {
      console.log(item, index);
      str +=
        "<option class='' value='" + item.unique_batch_name + "'>" + item.unique_course_name + "</option>";
    });
    str += "                    </select>";
    str += "               </div>";
    str += "                  <div class='form-group'>";
    str += "                   <label for='date'>Date</label>";
    str +=
      "                      <input id='datepicker-" + INDEX + "' class='form-control' placeholder='YYYY-MM-dd' name='date' required/>";
    str += "                  </div>";
    str += "             </div>";
    str +=
      "             <button type='submit' class='btn btn-primary form-submit' >Submit </button>";
    str += "           </form>";
    str += "          </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#" + course_detail + "-form-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    

    var date_picker = new Date();
    var startDate = new Date(2019, 08, 1);
    if (course_detail == "youtube_link" || course_detail == "youtube_video_availability" || course_detail == "session_recording_query" || course_detail == "previous_recording" || course_detail == "recordings_not_avilable"){
      var end_Date = new Date(new Date().setDate(new Date().getDate()));
    }else{
      var end_Date = new Date(new Date().setDate(new Date().getDate() + 31));
    }

    $("#datepicker-" + INDEX.toString()).datepicker({
      uiLibrary: "bootstrap4",
      // startDate: 0,
      minDate:startDate,
      maxDate: end_Date,
      dateFormat: "YYYY-MM-dd",
      
    });
    INDEX++;
  }

  /* Course timings,details,fees,contents form generate */
  function course_detail_form_generate(course_detail, batches) {
    var list_course = JSON.parse(batches);
    var str = "";
    str += "<div id='" + course_detail + "-form-" + INDEX + "' class='chat-msg bot'>";
    str += "          <span class='msg-avatar'>";
    str += "            <img src='static/img/lady_bot.png'>";
    str += "          </span>";
    str += "          <div class='cm-msg-text'>";
    str +=
      "           <form id='" + course_detail + "-form' class='" + course_detail +"-generate-form' method='POST'>";
    str +=
      "               <p>To proceed forward please select course:</p>";
    str += "               <div class='form-row'>";
    str += "              <div class='form-group'>";
    str += "                   <label for='coursename'>Registered course</label>";
    str +=
      "                      <select name='coursename' id='coursename' class='form-control' required>";
    str += "                        <option value=''>Select course</option>";
    list_course.forEach(function (item, index) {
      console.log(item, index);
      str +=
        "<option class='' value='" + item.unique_batch_name + "'>" + item.unique_course_name + "</option>";
    });
    str += "                    </select>";
    str += "               </div>";
    str += "             </div>";
    str +=
      "             <button type='submit' class='btn btn-primary form-submit' >Submit </button>";
    str += "           </form>";
    str += "          </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#" + course_detail + "-form-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    INDEX++;
  }

  // dashboard_access form submit
  $(document).on("submit", ".dashboard-access-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/dashboardAccess",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".dashboard-access-generate-form")[0].reset();
    $(".dashboard-access-generate-form select").attr("disabled", "true");
    $(".dashboard-access-generate-form button").attr("disabled", "true");
  });

  // assignment-query form submit
  $(document).on("submit", ".assignment-query-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/assignmentQuery",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".assignment-query-generate-form")[0].reset();
    $(".assignment-query-generate-form select").attr("disabled", "true");
    $(".assignment-query-generate-form button").attr("disabled", "true");
  });

  // certificate-query form submit
  $(document).on("submit", ".certificate_query-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/certificateQuery",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".certificate_query-generate-form-generate-form")[0].reset();
    $(".certificate_query-generate-form-generate-form select").attr("disabled", "true");
    $(".certificate_query-generate-form-generate-form button").attr("disabled", "true");
  });

  // batch-query form submit
  $(document).on("submit", ".batch_query-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/batchQuery",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".batch_query-generate-form-generate-form")[0].reset();
    $(".batch_query-generate-form-generate-form select").attr("disabled", "true");
    $(".batch_query-generate-form-generate-form button").attr("disabled", "true");
  });
  
   // internship-query-button form submit
  $(document).on("submit", ".internship-query-button-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/internshipQueryButton",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".internship-query-button-generate-form")[0].reset();
    $(".internship-query-button-generate-form select").attr("disabled", "true");
    $(".internship-query-button-generate-form button").attr("disabled", "true");
  });

  // file_not_found_form_generate
  function file_not_found_form_generate(course_detail, batches) {
    var list_course = JSON.parse(batches);
    var str = "";
    str += "<div id='" + course_detail + "-form-" + INDEX + "' class='chat-msg bot'>";
    str += "          <span class='msg-avatar'>";
    str += "            <img src='static/img/lady_bot.png'>";
    str += "          </span>";
    str += "          <div class='cm-msg-text'>";
    str +=
      "           <form id='" + course_detail + "-form' class='" + course_detail + "-generate-form' method='POST'>";
    str +=
      "               <p>To proceed forward please select course:</p>";
    str += "               <div class='form-row'>";
    str += "              <div class='form-group'>";
    str += "                   <label for='coursename'>Registered course</label>";
    str +=
      "                      <select name='coursename' id='coursename' class='form-control' required>";
    str += "                        <option value=''>Select course</option>";
    list_course.forEach(function (item, index) {
      console.log(item, index);
      str +=
        "<option class='' value='" + item.unique_batch_name + "'>" + item.unique_course_name + "</option>";
    });
    str += "                    </select>";
    str += "               </div>";
    str += "                  <div class='form-group'>";
    str += "                   <label for='topic'>Topic</label>";
    str +=
      "                      <input type='text' id='topic-" + INDEX + "' class='form-control'  name='topic' required/>";
    str += "                  </div>";
    str += "             </div>";
    str +=
      "             <button type='submit' class='btn btn-primary form-submit' >Submit </button>";
    str += "           </form>";
    str += "          </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#" + course_detail + "-form-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    
    INDEX++;
  }

  // file_not_found form submit
  $(document).on("submit", ".file_not_found-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/fileNotFound",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
              // if (getCookie("language") == "en") {
              //   speak(value_index);
              // }
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".file_not_found-generate-form")[0].reset();
    $(".file_not_found-generate-form select").attr("disabled", "true");
    $(".file_not_found-generate-form button").attr("disabled", "true");
  });

  // Youtube link form submit
  $(document).on("submit", ".youtube_link-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/youtubeLink",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
              // if (getCookie("language") == "en") {
              //   speak(value_index);
              // }
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
              // if (getCookie("language") == "en") {
              //   speak(value_index);
              // }
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".youtube_link-generate-form")[0].reset();
    $(".youtube_link-generate-form select").attr("disabled", "true");
    $(".youtube_link-generate-form button").attr("disabled", "true");
  });

  //  youtube_video_availability link form submit
  $(document).on("submit", ".youtube_video_availability-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/youtubeLink",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".youtube_video_availability-generate-form")[0].reset();
    $(".youtube_video_availability-form select").attr("disabled", "true");
    $(".youtube_video_availability-generate-form button").attr("disabled", "true");
  });
 
  //  session_recording_query form submit
  $(document).on("submit", ".session_recording_query-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/youtubeLink",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".session_recording_query-generate-form")[0].reset();
    $(".session_recording_query-form select").attr("disabled", "true");
    $(".session_recording_query-generate-form button").attr("disabled", "true");
  });
  
   //  previous_recording form submit
  $(document).on("submit", ".previous_recording-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/youtubeLink",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".previous_recording-generate-form")[0].reset();
    $(".previous_recording-form select").attr("disabled", "true");
    $(".previous_recording-generate-form button").attr("disabled", "true");
  });

  //  recordings_not_avilable form submit
  $(document).on("submit", ".recordings_not_avilable-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/youtubeLink",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".recordings_not_avilable-generate-form")[0].reset();
    $(".recordings_not_avilable-form select").attr("disabled", "true");
    $(".recordings_not_avilable-generate-form button").attr("disabled", "true");
  });
  
  //  doubt_clear_session_recording form submit
  $(document).on("submit", ".doubt_clear_session_recording-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/youtubeLink",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".doubt_clear_session_recording-generate-form")[0].reset();
    $(".doubt_clear_session_recording-form select").attr("disabled", "true");
    $(".doubt_clear_session_recording-generate-form button").attr("disabled", "true");
  });
  
  // course_timings form submit
  $(document).on("submit", ".course_timings-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/courseTimings",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".course_timings-generate-form")[0].reset();
    $(".course_timings-generate-form select").attr("disabled", "true");
    $(".course_timings-generate-form button").attr("disabled", "true");
  });

  // course_contents form submit
  $(document).on("submit", ".course_contents-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/courseContents",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
              // if (getCookie("language") == "en") {
              //   speak(value_index);
              // }
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
              // if (getCookie("language") == "en") {
              //   speak(value_index);
              // }
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".course_contents-generate-form")[0].reset();
    $(".course_contents-generate-form select").attr("disabled", "true");
    $(".course_contents-generate-form button").attr("disabled", "true");
  });

  // course_fees_query form submit
  $(document).on("submit", ".course_fees_query-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/courseFees",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
              // if (getCookie("language") == "en") {
              //   speak(value_index);
              // }
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
              // if (getCookie("language") == "en") {
              //   speak(value_index);
              // }
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".course_fees_query-generate-form")[0].reset();
    $(".course_fees_query-generate-form select").attr("disabled", "true");
    $(".course_fees_query-generate-form button").attr("disabled", "true");
  });

  // course_details form submit
  $(document).on("submit", ".course_details-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/courseDetails",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              console.log(value_index);
              bot_message(value_index);
              speak(value_index);
              // if (getCookie("language") == "en") {
              //   speak(value_index);
              // }
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
              // if (getCookie("language") == "en") {
              //   speak(value_index);
              // }
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".course_details-generate-form")[0].reset();
    $(".course_details-generate-form select").attr("disabled", "true");
    $(".course_details-generate-form button").attr("disabled", "true");
  });

  // community class form submit
  $(document).on("submit", ".community_class-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/courseDetails",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              console.log(value_index);
              bot_message(value_index);
              speak(value_index);
              // if (getCookie("language") == "en") {
              //   speak(value_index);
              // }
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
              // if (getCookie("language") == "en") {
              //   speak(value_index);
              // }
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".community_class-generate-form")[0].reset();
    $(".community_class-generate-form select").attr("disabled", "true");
    $(".community_class-generate-form button").attr("disabled", "true");
  });

  // New batch details form submit
  $(document).on("submit", ".NewBatch_details-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/courseDetails",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              console.log(value_index);
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".NewBatch_details-generate-form")[0].reset();
    $(".NewBatch_details-generate-form select").attr("disabled", "true");
    $(".NewBatch_details-generate-form button").attr("disabled", "true");
  });

  // class_link form submit
  $(document).on("submit", ".class_link-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/classLink",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              console.log(value_index);
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".class_link-generate-form")[0].reset();
    $(".class_link-generate-form select").attr("disabled", "true");
    $(".class_link-generate-form button").attr("disabled", "true");
  });

  // community_class_link form submit
  $(document).on("submit", ".community_class_link-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/classLink",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              console.log(value_index);
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".community_class_link-generate-form")[0].reset();
    $(".community_class_link-generate-form select").attr("disabled", "true");
    $(".community_class_link-generate-form button").attr("disabled", "true");
  });

  // doubt_session_link form submit
  $(document).on("submit", ".doubt_session_link-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/classLink",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              console.log(value_index);
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".doubt_session_link-generate-form")[0].reset();
    $(".doubt_session_link-generate-form select").attr("disabled", "true");
    $(".doubt_session_link-generate-form button").attr("disabled", "true");
  });

  // zoom_link_query form submit
  $(document).on("submit", ".zoom_link_query-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/classLink",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              console.log(value_index);
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".zoom_link_query-generate-form")[0].reset();
    $(".zoom_link_query-generate-form select").attr("disabled", "true");
    $(".zoom_link_query-generate-form button").attr("disabled", "true");
  });

  // payment_detail form submit
  $(document).on("submit", ".payment_detail-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/paymentDetail",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              console.log(value_index);
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".payment_detail-generate-form")[0].reset();
    $(".payment_detail-generate-form select").attr("disabled", "true");
    $(".payment_detail-generate-form button").attr("disabled", "true");
  });

   // Resume_discussion_session_details form submit
  $(document).on("submit", ".Resume_discussion_session_details-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/resumeDetails",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              console.log(value_index);
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".Resume_discussion_session_details-generate-form")[0].reset();
    $(".Resume_discussion_session_details-generate-form select").attr("disabled", "true");
    $(".Resume_discussion_session_details-generate-form button").attr("disabled", "true");
  });
  
  // internship_query form submit
  $(document).on("submit", ".internship_query-generate-form", function (e) {
    e.preventDefault();
    bot_typing();
    $.ajax({
      type: "POST",
      url: "/api/internshipQuery",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              console.log(value_index);
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $(".internship_query-generate-form")[0].reset();
    $(".internship_query-generate-form select").attr("disabled", "true");
    $(".internship_query-generate-form button").attr("disabled", "true");
  });

  /* Saving User Data */
  $(".user-form").on("submit", function (e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    var userDetails = {};
    $(data).each(function (i, field) {
      userDetails[field.name] = field.value;
    });
    $.ajax({
      type: "POST",
      url: "/api/userdetails",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status == 200) {
          setCookie("name", userDetails.name, "1");
          setCookie("email", userDetails.email, "1");
          setCookie("mobile", userDetails.mobile, "1");
          setCookie("language", userDetails.language, "1");
          $(".chat-box-body").show();
          $(".chat-input").show();
          $(".chat-input button").show();
          $("#volume-up").show();
          $(".chat-box-refresh").show();
          $(".chat-box-form").hide();
          if (startup_counter == 1) {
            getMenu("startup");
            startup_counter++;
          }
        } else {
          var lan_name = "error_message_" + getCookie("language").replace("-", "_")
          speak(eval(lan_name));
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });
    $("#user-form")[0].reset();
  });


  $("#chat-submit").on("keyup",function(e) { 
      e.preventDefault();
          e.stopPropagation();
        if (e.keyCode === 13) { 
          $('.query').trigger('submit');
        } 
    });


  $("#chat-submit").on("click", function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.query').trigger('submit');
  });
  /* Chatbot Chats */
  $(document).on("submit", ".query, .others_technical-query-generate-form", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var class_name = $(e.target).attr('class');
    if (class_name.toLowerCase().indexOf("others_technical-query-generate-form") >= 0) {
      var values = {};
      $.each($('.others_technical-query-generate-form').serializeArray(), function(i, field) {
    values[field.name] = field.value;
      });
      var msg = values.query;
    }else{
      var msg = document.forms["query-form"].query.value;
    }
      user_message(msg);
      bot_typing();
      $.ajax({
        type: "POST",
        url: "/api/prediction",
        data: $(this).serialize(),
        success: function (response) {
          if (response.status == 200) {
            var intent = response.intent;
            var intent_type = response.intent_type;
            $('.user_query_hidden').attr('value', msg);
            if (intent == "class_link" || intent == "class_query"){
              $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses
              class_link_form_generate("class_link", batches);
            } 
            else if (intent == "doubt_session_link"){
              $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses
              class_link_form_generate("doubt_session_link", batches);
            }
            else if (intent == "zoom_link_query"){
              $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses
              class_link_form_generate("zoom_link_query", batches);
            }
            else if (intent == "community_class_link"){
              $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses
              class_link_form_generate("community_class_link", batches);
            }
            else if (intent == "payment_detail") {
              $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses
              course_detail_form_generate("payment_detail", batches);
            }
            else if (intent == "youtube_link"){
              $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses
              class_link_form_generate("youtube_link", batches);
            }
            else if (intent == "youtube_video_availability") {
              $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses
              class_link_form_generate("youtube_video_availability", batches);
            } 
            else if (intent == "session_recording_query") {
              $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses
              class_link_form_generate("session_recording_query", batches);
            }
            else if (intent == "previous_recording") {
              $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses
              class_link_form_generate("previous_recording", batches);
            }
            else if (intent == "recordings_not_avilable") {
              $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses
              class_link_form_generate("recordings_not_avilable", batches);
            }
            else if (intent == "doubt_clear_session_recording") {
              $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses
              class_link_form_generate("doubt_clear_session_recording", batches);
            }
            else if (intent == "course_timings"){
               $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses
              course_detail_form_generate("course_timings", batches);
            }
            else if (intent == "course_contents") {
              $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses
              course_detail_form_generate("course_contents", batches);
            }
            else if (intent == "course_fees_query") {
              $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses
              course_detail_form_generate("course_fees_query", batches);
            }
            else if (intent == "course_details") {
              $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses
              course_detail_form_generate("course_details", batches);
            }
            else if (intent == "community_class") {
              $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses
              course_detail_form_generate("community_class", batches);
            } 
            else if (intent == "Resume_discussion_session_details") {
              $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses
              course_detail_form_generate("Resume_discussion_session_details", batches);
            }
            else if (intent == "NewBatch_details") {
              $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses
              course_detail_form_generate("NewBatch_details", batches);
            }
            else if (intent == "file_not_found") {
              $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses
              file_not_found_form_generate("file_not_found", batches);
            } 
            else if (intent == "Dashboard_access") {
              $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses;
              dashboard_access_form_generate(batches);
            } 
            else if (intent == "internship_query") {
              $(".bot-typing").hide().fadeOut(1000);
              var batches = response.list_of_courses
              course_detail_form_generate("internship_query", batches);
            }
            else if (intent == "Not_identified"){
              $(".bot-typing").hide().fadeOut(1000);
              var html_parse = thumbnail_generate(response.result);
              $.each(response.fulfillmentMessages, function (index, value) {
                $.each(value.text.text, function (index, value_index) {
                  bot_message(value_index);
                  speak(value_index);
                });
              });
              bot_links(html_parse);
              var assist_msg = "assist_msg_" + getCookie("language").replace("-", "_");
              var satisfy_msg = "satisfy_msg_" + getCookie("language").replace("-", "_");
              
              if (intent_type == "Technical") {
                bot_message(response.scrape_msg);
                speak(response.scrape_msg);
                ticketGenerateButton();
              }
              else {
                bot_message(response.scrape_msg);
                speak(response.scrape_msg);
              //   bot_message(eval(assist_msg));
              // speak(eval(assist_msg));
                // assistanceButton();
                ticketGenerateButton();
              }
            }
            else if (intent == "list_thumbnail") {
              $(".bot-typing").hide().fadeOut(1000);
              var button = '';
              var html_parse = thumbnail_generate(response.result);
              bot_message(response.speak_msg);
              speak(response.speak_msg);
              bot_links(html_parse);
              $.each(response.fulfillmentMessages, function (index, value) {
                $.each(value.text.text, function (index, value_index) {
                  if (value_index == 'Do you want further assistance?'){
                    button = 'assistance';
                  }else{button = ''}
                  bot_message(value_index);
                  speak(value_index);
                });
              });
              if (intent_type == "Technical") {
                satisfyButton();
              }
              else if (button == 'assistance'){
                assistanceButton();
              }else{
                ticketGenerateButton();
              }
            }
            else{
              $(".bot-typing").hide().fadeOut(1000);
              var button = '';
              $.each(response.fulfillmentMessages, function (index, value) {
                $.each(value.text.text, function (index, value_index) {
                  if (value_index == 'Do you want further assistance?') {
                    button = 'assistance';
                  } else { button = '' }
                  bot_message(value_index);
                  speak(value_index);
                });
              });
              if (intent_type == "Technical") {
                satisfyButton();
              }
              else if (button == 'assistance') {
                assistanceButton();
              } else {
                ticketGenerateButton();
              }
            }
            
          } else {
            $(".bot-typing").hide().fadeOut(1000);
            $('.user_query_hidden').attr('value', msg);
            $.each(response.fulfillmentMessages, function (index, value) {
              $.each(value.text.text, function (index, value_index) {
                bot_message(value_index);
                speak(value_index);
              });
            });
            assistanceButton();
          }
        },
        error: function (xhr, errmsg, err) {
          console.log(errmsg);
          console.log(err);
        },
      });
    $(".query")[0].reset();
    $(".others_technical-query-generate-form")[0].reset();
    $(".others_technical-query-generate-form select").attr("disabled", "true");
    $(".others_technical-query-generate-form button").attr("disabled", "true");
  });

  function thumbnail_generate(data) {
    var str = "";
    str += "<div class='col-md-12' style='margin-bottom: 20px;'>";
    str +=
      "  <div id='CarouselTest-" +
      INDEX +
      "' class='carousel slide pointer-event' data-ride='carousel'>";
    str += "    <div class='carousel-inner'>";
    $.each(data, function (index, value) {
      if (index == 0) {
        str += "        <div class='carousel-item active'>";
        str += "          <div class='card'>";
        str +=
          "            <img class='card-img-top' src='" +
          value.image +
          "' alt='Card image cap'>";
        str += "            <div class='card-body'>";
        str += "              <h5 class='card-title'>" + value.title + "</h5>";
        str +=
          "              <p class='card-text'>" + value.description + " </p>";
        str +=
          "              <a href='" +
          value.url +
          "' class='btn btn-primary' target='_blank'>Visit page</a>";
        str += "             </div>";
        str += "           </div>";
        str += "         </div>";
      } else {
        str += "        <div class='carousel-item'>";
        str += "          <div class='card'>";
        str +=
          "            <img class='card-img-top' src='" +
          value.image +
          "' alt='Card image cap'>";
        str += "            <div class='card-body'>";
        str += "              <h5 class='card-title'>" + value.title + "</h5>";
        str +=
          "              <p class='card-text'>" + value.description + " </p>";
        str +=
          "              <a href='" +
          value.url +
          "' class='btn btn-primary' target='_blank'>Visit page</a>";
        str += "             </div>";
        str += "           </div>";
        str += "         </div>";
      }
    });
    str += "      </div>";
    str +=
      "      <a class='carousel-control-prev' href='#CarouselTest-" +
      INDEX +
      "' role='button' data-slide='prev'>";
    str +=
      "        <span class='carousel-control-prev-icon' aria-hidden='true' style='background-color:#f5a55a;'></span>";
    str += "        <span class='sr-only'>Previous</span>";
    str += "      </a>";
    str +=
      "      <a class='carousel-control-next' href='#CarouselTest-" +
      INDEX +
      "' role='button' data-slide='next'>";
    str +=
      "        <span class='carousel-control-next-icon' aria-hidden='true' style='background-color:#f5a55a;'></span>";
    str += "        <span class='sr-only'>Next</span>";
    str += "      </a>";
    str += "  </div>";
    str += "</div>";
    INDEX++;
    return str;
  }
  
  /* Get assistance(Yes/No) button */
  function assistanceButton() {
    var str = "";

    str += "<div id='cm-msg-assistance-" + INDEX + "' class='chat-msg bot'>";
    str += "  <div class='cm-msg-button assist-button'>";
    str += "    <ul>";
    str += "      <li>";
    str +=
      "          <button  class='btn btn-sm btn-outline-primary assist-yes'>Yes</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary assist-no'>No</button>";
    str += "      </li>";
    str += "    </ul>";
    str += "  </div>";
    str += "</div>";
    $(".chat-logs").append(str);
    $("#cm-msg-assistance-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    INDEX++;
  }

  // Yes assistance click menu display
  $(document).on("click", ".assist-yes", function (e) {
    getMenu("conversation");
    $(".assist-button button").attr("disabled", "true");
  });

  // No assistance click menu display
  $(document).on("click", ".assist-no", function (e) {
    var lan_name = "good_bye_message_" + getCookie("language").replace("-", "_")
    bot_message(eval(lan_name));
    speak(eval(lan_name));
    $(".assist-button button").attr("disabled", "true");
  });


  /* Get satisfied (Yes/No) button */
  function satisfyButton() {
    var str = "";

    str += "<div id='cm-msg-satisfied-" + INDEX + "' class='chat-msg bot'>";
    str += "  <div class='cm-msg-button satisfy-button'>";
    str += "    <ul>";
    str += "      <li>";
    str +=
      "          <button  class='btn btn-sm btn-outline-primary satisfy-yes'>Yes</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary satisfy-no'>No</button>";
    str += "      </li>";
    str += "    </ul>";
    str += "  </div>";
    str += "</div>";
    $(".chat-logs").append(str);
    $("#cm-msg-satisfied-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    INDEX++;
  }

   /* ticketGenerateButton (Yes/No)  */
  function ticketGenerateButton() {
    var str = "";

    str += "<div id='cm-msg-tktGenerate-" + INDEX + "' class='chat-msg bot'>";
    str += "  <div class='cm-msg-button tktGenerate-button'>";
    str += "    <ul>";
    str += "      <li>";
    str +=
      "          <button  class='btn btn-sm btn-outline-primary tktGenerate-yes'>Generate ticket</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary tktGenerate-no'>I am satisfy with the query</button>";
    str += "      </li>";
    str += "    </ul>";
    str += "  </div>";
    str += "</div>";
    $(".chat-logs").append(str);
    $("#cm-msg-tktGenerate-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    INDEX++;
  }

   /* Get satisfied from technical button (Yes/No)*/
  function satisfiedTechnical() {
    var str = "";

    str += "<div id='cm-msg-satisfied-technical-" + INDEX + "' class='chat-msg bot'>";
    str += "  <div class='cm-msg-button satisfied-technical-button'>";
    str += "    <ul>";
    str += "      <li>";
    str +=
      "          <button  class='btn btn-sm btn-outline-primary satisfied-technical-yes'>Yes</button>";
    str += "      </li>";
    str += "      <li>";
    str +=
      "          <button class='btn btn-sm btn-outline-primary satisfied-technical-no'>No</button>";
    str += "      </li>";
    str += "    </ul>";
    str += "  </div>";
    str += "</div>";
    $(".chat-logs").append(str);
    $("#cm-msg-satisfied-technical-" + INDEX.toString())
      .hide()
      .fadeIn(1000);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    INDEX++;
  }

  // Yes satisfy click assistance display
  $(document).on("click", ".satisfy-yes, .tktGenerate-no, .satisfied-technical-yes", function (e) {
    var assist_msg = "assist_msg_" + getCookie("language").replace("-", "_");
    bot_message(eval(assist_msg));
    speak(eval(assist_msg));
    assistanceButton();
    $(".satisfy-button button").attr("disabled", "true");
    $(".tktGenerate-button button").attr("disabled", "true");
  });

  /* Technical button satisfy no then ask for query */
  $(document).on("click", '.satisfied-technical-no', function(e){
  others_technical_form_generate();
  })
  // No satisfy click scrape & displa URL
  $(document).on("click", ".satisfy-no", function (e) {
    var user_msg = $('.user_query_hidden').val();
    console.log(user_msg);
    bot_typing();
    var json_data = {
      "user_query": user_msg
    }
    $.ajax({
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(json_data),
      url: "/api/satisfyNoScrapeData",
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          var html_parse = thumbnail_generate(response.result);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          bot_links(html_parse);
          bot_message(response.scrape_msg_after);
          speak(response.scrape_msg_after);
          ticketGenerateButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });

    $(".satisfy-button button").attr("disabled", "true");
  });

   // tktGenerate-yes send email to support
  $(document).on("click", ".tktGenerate-yes", function (e) {
    var user_msg = $('.user_query_hidden').val();
    console.log(user_msg);
    bot_typing();
    var json_data = {
      "user_query": user_msg
    }
    $.ajax({
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(json_data),
      url: "/api/notSatisfiedSendEmail",
      success: function (response) {
        if (response.status == 200) {
          $(".bot-typing").hide().fadeOut(1000);
          var html_parse = thumbnail_generate(response.result);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        } else {
          $(".bot-typing").hide().fadeOut(1000);
          $.each(response.fulfillmentMessages, function (index, value) {
            $.each(value.text.text, function (index, value_index) {
              bot_message(value_index);
              speak(value_index);
            });
          });
          assistanceButton();
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(errmsg);
        console.log(err);
      },
    });

    $(".tktGenerate-button button").attr("disabled", "true");
  });

  /* Speech recognition and synthesis */

  // Test browser support
  window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition || null;

  if (window.SpeechRecognition === null) {
    console.log("speech recognition not supported in your browser");
    $("#chat-submit-mic").attr("data-toggle", "tooltip");
    $("#chat-submit-mic").attr(
      "title",
      "Speech recognition not supported in your browser"
    );
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
    $("#chat-submit-mic").prop("disabled", true);
  } else {
    $("#chat-submit-mic").attr("data-toggle", "tooltip");
    $("#chat-submit-mic").attr("title", "Press and hold to speak");
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });


    var recognizer = new window.SpeechRecognition();
    var transcription = document.getElementById("chat-input");

    // Recognizer doesn't stop listening even if the user pauses
    recognizer.continuous = true;

    // Start recognizing
    recognizer.onresult = function (event) {
    transcription.val = "";

      for (var i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcription.val = event.results[i][0].transcript;
          console.log("Confidence: " + event.results[i][0].confidence);
          $("#chat-input").val(transcription.val);
        } else {
          transcription.val += event.results[i][0].transcript;
        }
      }

      $(document).ready(function ($) {
        if ($("#chat-input").val().length > 1) {
          $("#chat-submit").trigger("click");
          transcription.val = "";
        }
      });
      
    };

    // Listen for errors
    recognizer.onerror = function (event) {
      console.log("Recognition error: " + event.message);
    };

    $("#chat-submit-mic").bind("mousedown touchstart", function (e) {
      e.preventDefault();
      try {
        recognizer.start();
        $(".chat-submit-mic").css({ color: "red" });
        console.log("Recognition started");
      } catch (ex) {
        console.log("Recognition error: " + ex.message);
      }
    });

    $("#chat-submit-mic").bind("mouseup touchend", function (e) {
      e.preventDefault();
      try {
        recognizer.stop();
        $(".chat-submit-mic").css({ color: "#f5a55a" });
        console.log("Recognition stopped");
      } catch (ex) {
        console.log("Recognition error: " + ex.message);
      }
    });
  }

  /*
   * Check for browser support
   */

  /* Set Volume */
  var volumeInput = 1;
  $("#volume-down").hide();
  $("#volume-up").click(function () {
        volumeInput = 0;
        $("#volume-down").show();
        $("#volume-up").hide();
        window.speechSynthesis.cancel();
  });

  $("#volume-down").click(function () {
        volumeInput = 1;
        $("#volume-up").show();
        $("#volume-down").hide();
  });

  if ("speechSynthesis" in window) {
    console.log("Your browser supports speech synthesis.");
    var synthesis = window.speechSynthesis;
    // var utterance = new SpeechSynthesisUtterance("Hello World");
    // Regex to match all English language tags e.g en, en-US, en-GB
    // var langRegex = /^en(-[a-z]{2})?$/i;

    // Get the available voices and filter the list to only have English speakers
    var voices = speechSynthesis
      .getVoices();
      // .filter((voice) => langRegex.test(voice.lang));

    // Log the properties of the voices in the list
    voices.forEach(function (voice) {
      console.log({
        name: voice.name,
        lang: voice.lang,
        uri: voice.voiceURI,
        local: voice.localService,
        default: voice.default,
      });
    });
  } else {
    console.log(
      "Sorry your browser does not support speech synthesis. Try this in Chrome Canary."
    );
  }

  // Create a new utterance for the specified text and add it to
  // the queue.
  function speak(text) {
    // Create a new instance of SpeechSynthesisUtterance.
    var msg = new SpeechSynthesisUtterance();

    // Set the text.
    msg.text = text;

    // Get the attribute controls.
    var rateInput = 1;
    var pitchInput = 1;

    // Set the attributes.
    msg.lang = getCookie("language");
    msg.volume = parseFloat(volumeInput);
    msg.rate = parseFloat(rateInput);
    msg.pitch = parseFloat(pitchInput);

    msg.voice = voices[3];
 
    window.speechSynthesis.speak(msg);
  }
  
});
