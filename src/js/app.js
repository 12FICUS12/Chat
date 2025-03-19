/* eslint-disable no-console */
import ChatDOM from './chatdom';
import ChatControl from './chatcontrol';
import ChatWS from './chatws';
import ChatApi from './chatapi';

/* домен сервера */
const domainUrl = 'chatserver-e4h3.onrender.com';


/* элемент блока div в DOM */
const hw = document.querySelector('#hw');

/*
*  создание класса отвечающего за DOM
*  и присвоение ему div элемента
*/
const chatDOM = new ChatDOM();
chatDOM.bindToDOM(hw);

/*
*  создание классов отвечающих за вебсокет и за API
*/
const chatWS = new ChatWS(domainUrl);
const chatApi = new ChatApi(domainUrl);

/*
* создание класса отвечающего за контрольт и инициализация класса
*/
const chatControl = new ChatControl(chatDOM, chatWS, chatApi);
chatControl.init();

console.log('app started');