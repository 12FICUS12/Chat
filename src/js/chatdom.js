export default class ChatDom {
    constructor() {
        this.container = null;
        this.onLoginListeners = [];
        this.getMessagesListeners = [];
    }

    bindToDOM(container) {
        if (!(container instanceof HTMLElement)) {
            throw new Error('container is not HTMLElement');
        }
        this.container = container;
    }

    checkBinding() {
        if (this.container === null) {
            throw new Error('container is not binded');
        }
    }

    drawHtml() {
        this.checkBinding();

        this.container.innerHTML = `
        <header class="header">
          <p>Домашнее задание к занятию "8. EventSource, Websockets"</p>
          <p>Чат</p>
        </header>
        <div class="container">
          <div class="chat"></div>
          <div class="users"></div>
          <div class="chat-control">
            <input class="chat-message"/>
            <button class="chat-send">Отправить</button>
          </div>
        </div>
        <div class="popup">
          <div class="loading">Backend Loading...</div>
          <form class="popup-container close">
            <div class="popup-header">Выберите псевдоним</div>
            <input name="name" type="text" class="popup-login"/>
            <button class="popup-button">Продолжить</button>
          </form>
        </div>
      `;

        this.chat = this.container.querySelector('.chat');
        this.users = this.container.querySelector('.users');
        this.chatMessage = this.container.querySelector('.chat-message');
        this.chatSend = this.container.querySelector('.chat-send');
        this.popUp = this.container.querySelector('.popup');
        this.popUpSubmit = this.container.querySelector('.popup-container');
        this.loading = this.container.querySelector('.loading');
        this.popUpLogin = this.container.querySelector('.popup-login');

        this.popUpSubmit.addEventListener('submit', (event) => this.onLogin(event));
        this.chatSend.addEventListener('click', (event) => this.onSendMessage(event));
        this.popUpLogin.addEventListener('focus', () => this.onFocusClear('popUpLogin'));
    }

    addOnLoginListener(callback) {
        this.onLoginListeners.push(callback);
    }

    onLogin(e) {
        e.preventDefault();
        const login = this.popUpLogin.value;
        this.popUpLogin.value = '';
        this.onLoginListeners.forEach((o) => o.call(null, login));
    }

    addOnGetMessagesListener(callback) {
        this.getMessagesListeners.push(callback);
    }

    onSendMessage(e) {
        e.preventDefault();
        const message = String(this.chatMessage.value);
        if (!message) { return; }
        this.chatMessage.value = '';
        this.getMessagesListeners.forEach((o) => o.call(null, message));
    }

    loadMessages(message) {
        const {
            name,
            text,
            date,
            classEl,

        } = message;

        const messageEl = document.createElement('div');
        messageEl.classList.add('message-container');
        messageEl.classList.add(classEl);
        messageEl.innerHTML = `
        <div class="message">
        <div class="message-author">${name}, ${date}</div>
        <div class="message-text">${text}</div>
      </div>
        `;

        this.chat.appendChild(messageEl);
        this.chat.scrollTop = (0, 99999);
    }

    popupClose() {
        this.popUp.classList.add('close');
    }

    message(input, text) {
        this[input].placeholder = text;
    }

    onFocusClear(input) {
        this.message(input, '');
        this[input].classList.remove('error-add');
    }

    errorInputAdd(input, text) {
        this[input].value = '';
        this.message(input, text);
        this[input].classList.add('error-add');
    }

    loadUser(users, login) {
        this.users.innerHTML = '';

        for (let i = 0; i < users.length; i++) {
            const userEl = document.createElement('div');
            userEl.classList.add('user');
            userEl.textContent = users[i];

            if (users[i] === login) {
                userEl.textContent = "You";
            }

            if (users[i] !== login) {
                userEl.textContent = users[i];
            }

            this.users.appendChild(userEl);
        }
    }

    backendLoaded() {
        this.loading.classList.add('close');
        this.popUp.classList.remove('close');
    }
}