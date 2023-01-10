(function(){
let url = window.location.href;
if (url.match('take.net/en/') || url.match('take.net/es/') || url.match('take.net/contato') || url == 'https://www.take.net/') {
  console.log("teste")
} else {
  const WIDGET_CUSTOM_COMMON_URL = 'https://contatointeligentetake.chat.blip.ai/';

  const BLIP_CHAT_CONTAINER_ID_SELECTOR = '#blip-chat-container';
  const MESSAGE_BUBBLE_CLASS_SELECTOR = 'message-bubble';
  bannerInPag = document.querySelectorAll('a[href="#widget"]');
  if (bannerInPag != null) {
    bannerInPag.forEach(b => {
      b.setAttribute('onclick', 'destroyAndStart("Quero baixar meu material")');
    })
  }
  class BlipChatWidget {
    constructor(messages = [], messageDelay = 0, mainColor = '#3f7de8', secondaryColor = '#b3d4ff') {
      this.messages = messages;
      this.messageDelay = messageDelay;
      this.mainColor = mainColor;
      this.secondaryColor = secondaryColor;

    }
    closeBlipChat() {
      try {
        this.widget.destroy();
        this.widget = undefined;
      } catch (e) {
        return e;
      }
    }
    reload(params) {
      this.widget = new BlipChat();
      this.widget
        .withAppKey(
          'dGFrZXdhOjQwZjljNmJmLWIzZjktNGZjNi05ZWVkLWUwMjJhNDAwMjg5ZQ=='
        )
        .withButton({ color: this.mainColor, icon: '' })
        .withCustomMessageMetadata({ pageOrigin: window.location.href })
        .withCustomCommonUrl(WIDGET_CUSTOM_COMMON_URL)
        .withCustomStyle(this.customStyle)
        .withEventHandler(BlipChat.LOAD_EVENT, () => {
          this.widget.sendMessage({
            type: 'text/plain',
            content: params,
          });
        })
        .build();
      this.widget.toogleChat();
      document.getElementById('bubble').remove()
    }
    init() {
      this.setUpCustomCss();
      this.mount();
      this.addMessageBubbleIfAny();
    }

    mount() {
      this.widget = new BlipChat();
      this.widget
        .withAppKey(
          'dGFrZXdhOjQwZjljNmJmLWIzZjktNGZjNi05ZWVkLWUwMjJhNDAwMjg5ZQ=='
        )
        .withButton({ color: this.mainColor, icon: '' })
        .withCustomMessageMetadata({ pageOrigin: window.location.href })
        .withCustomCommonUrl(WIDGET_CUSTOM_COMMON_URL)
        .withCustomStyle(this.customStyle)
        .withEventHandler(BlipChat.ENTER_EVENT, () => {
          if (!!this.addMessageBubbleTimeout) {
            clearTimeout(this.addMessageBubbleTimeout);
          }
          document.querySelector('#blip-chat-iframe').style.position = 'fixed';
        })
        .build();
      this.widgetElement = document.querySelector(BLIP_CHAT_CONTAINER_ID_SELECTOR);
    }

    setUpCustomCss() {
      this.customStyle = `
          #blip-chat-header,
          .blip-card .bubble.right,
          button.blip-chat-start,
          .send-button {
              background-color: ${this.mainColor} !important;
          }
          .blip-card .left li.pointer span,
          .blip-card .left .fixed-options li div,
          .blip-card .left span.next,
          .blip-card .left a.next {
              color: ${this.mainColor} !important;
          }
          .select .options li {
              color: ${this.mainColor} !important;
              background-color: ${this.secondaryColor} !important;
              border-color: ${this.mainColor} !important;
          }
      `;
    }

    addMessageBubbleIfAny() {
      if (!!this.messages && this.messages.length > 0) {
        this.addMessageBubbleTimeout = setTimeout(this.addMessageBubble.bind(this), this.messageDelay);
      }
    }

    addMessageBubble() {
      function parseHTML(html) {
        var t = document.createElement('template');
        t.innerHTML = html;
        return t.content;
      }
      this.messageBubble = document.createElement('div');
      this.messageBubble.classList.add(MESSAGE_BUBBLE_CLASS_SELECTOR);
      this.messageBubble.setAttribute('id', 'bubble');
      this.messages.forEach(m => {
        const message = document.createElement('p');
        message.append(
          parseHTML(
            `<h onClick="bubble" id=text-bubble>` + m + `</h>`
          )
        );
        this.messageBubble.appendChild(message);
      });

      const closeButton = document.createElement('span');
      closeButton.classList.add('close-button');
      this.messageBubble.appendChild(closeButton);

      const removeBubble = (e) => {
        if (!!e) { e.stopPropagation(); }
        if (!!this.messageBubble) {
          this.messageBubble.remove();
          delete this.messageBubble;
        }
      };

      const removeBubbleAndStartChat = () => {
        this.widget.toogleChat();
        removeBubble();
      };

      this.messageBubble.addEventListener('click', removeBubbleAndStartChat.bind(this));
      this.widgetElement.addEventListener('click', removeBubble.bind(this));
      closeButton.addEventListener('click', removeBubble.bind(this));

      document.querySelector('body').appendChild(this.messageBubble);
    }
  }

  var head = document.getElementsByTagName('HEAD')[0]
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'https://www.take.net/css-bot/old-blipchat.css';
  head.appendChild(link);
  chat = new BlipChatWidget(['Gostaria de ter a experiência Take Blip na prática?', 'Só me dar um alô.'], 3000);
  window.onload = () => chat.init()
  function destroyAndStart(params) {
    chat.closeBlipChat()
    chat.reload(params)
  }

}
})()