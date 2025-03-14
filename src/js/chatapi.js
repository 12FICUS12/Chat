export default class ChatApi {
    constructor(domainUrl) {
        this.baseURl = `http://${domainUrl}`;}
    
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
            const options = this.constructor.options('POST', '?method=logining', body);
            const response = await this.createRequest(options);
            return response;
        }
         async checkServer() {
            const options = this.constructor.options('GET', '');
            const response = await this.createRequest(options);
            return response;
         }

}
