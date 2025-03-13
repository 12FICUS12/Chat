export default class ChatControl {
    constructor(ChatDom, ChatWS, ChatApi) {
        this.ChatDom = ChatDom;
        this.ChatWS = ChatWS;
        this.ChatApi = ChatApi;
        this.login = '';
    }

    init() {
        this.ChatDom.drawHtml();
        this.ChatDom.addOnLoginListener(this.onLogin.bind(this));
        this.ChatDom.addOnGetMessagesListener(this.onSendMessage.bind(this));
        this.ChatWS.addMessageListener(this.onLoadMessage.bind(this));

        this.backendLoading();
    }

    async onLogin(login) {

        if (login.length === 0) { 
            this.ChatDom.errorInputAdd('popUpLogin', 'Введите псевдоним');
            return;
        }

        if (login.length <3) {
            this.ChatDom.errorInputAdd('popUpLogin', 'Слишком короткий псевдоним');
            return;
        }

        const result = await this.ChatApi.logining({login});

        if (result && result.status === true) {
            this.ChatWS.init(login);
            this.ChatDom.popupClose();
            this.login = login;
        }

        if (result && result.status === false) {
            console.log(result)
            this.ChatDom.errorInputAdd('popUpLogin', "Псевдоним занят");
        }
    }

    onSendMessage(message) {
        const newMessage = JSON.stringify({message, type: 'message'});
        this.ChatWS.ws.send(newMessage);
    }

    onLoadMessage(message) {
        const messageEdit = message;

        if (messageEdit.type === 'message') {
            messageEdit.classEl = messageEdit.name === this.login ? 'message-right' : 'message-left';
            messageEdit.name = messageEdit.name === this.login ? 'You' : messageEdit.name;
            this.ChatDom.loadMessages(messageEdit);
            return true;
        }
    
        if (messageEdit.type === 'user') {
            this.ChatDom.loadUser(message.names, this.login);
            return true;
        }
        return false;
    }

    async backendLoading() {
        const result = await this.ChatApi.checkServer();
        if (result && result.status === true) {
            this.ChatDom.backendLoaded();
        }
    }
}
