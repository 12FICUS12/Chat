export default class ChatWS {
    constructor(domainUrl) {
        this.ws = '';
        this.url = `wss://${domainUrl}`;
        this.messageListeners = [];
    }


    init(username) {
        this.ws = new WebSocket(`${this.url}/ws?login=${username}`);
        this.ws.addEventListener('open', (e) => {
            console.log(e);
            console.log('open ws');
        })

        this.ws.addEventListener('close', (e) => {
            console.log(e);
            console.log('close ws');
        })

        this.ws.addEventListener('error', (e) => {
            console.log(e);
            console.log('error ws');
        })

        this.ws.addEventListener('message', (event) => this.onLoadMessage(event));
    }

    addMessageListener(callback) {
        this.messageListeners.push(callback);
    }

    onLoadMessage(e) {
        const data = JSON.parse(e.data);
        const { chat: message } = data;

        message.forEach((message) => {
            this.messageListeners.forEach((o) => o.call(null, message));

        });
    }
}