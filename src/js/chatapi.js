
export default class ChatApi {
    constructor(domainUrl) {
        this.baseURL = `http://${domainUrl}`;
    }
    
    options(method, urlParam, body) {
        return {
            method,
            urlParam,
            body: JSON.stringify(body)
        };
    }

    async createRequest(options) {
        const { method, urlParam, body } = options;
        const newUrl = `${this.baseURL}/${urlParam}`;
 
        try {
            const response = await fetch(newUrl, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            });
 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
 
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Fetch error:', error);
            return false; 
        }
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
