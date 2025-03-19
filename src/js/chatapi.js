export default class ChatApi {
    constructor(domainUrl) {
        this.baseURl = `https://${domainUrl}`;}
    
        static options (method, urlParam, body) {
            const value = {
                method,
                urlParam,
                body: JSON.stringify(body)

            };
            return value;
        }

        async createRequest(options) {
            const {method, urlParam, body} = options;

            const newUrl = `${this.baseURl}/${urlParam}`;

            const response = await fetch(newUrl, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            });

            const result = await response.json();
            if (!result) { return false; }
            return result;
        }

        async logining(body) {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body), // тело запроса с параметрами
            };
            
            const response = await fetch( `https://${domainUrl}/login`, options);
            return response.json();
        }
         async checkServer() {
            const options = this.constructor.options('GET', '');
            const response = await this.createRequest(options);
            return response;
         }

}
