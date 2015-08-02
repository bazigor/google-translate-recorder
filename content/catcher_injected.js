(function() {
    var recorderId = document.documentElement.getAttribute("data-google-translate-recorder");
    var XHR = XMLHttpRequest.prototype;
    // Remember references to original methods
    var open = XHR.open;
    var send = XHR.send;

    // Overwrite native methods
    // Collect data:
    XHR.open = function(method, url) {
        this._method = method;
        this._url = url;
        return open.apply(this, arguments);
    };

    // Implement "ajaxSuccess" functionality
    XHR.send = function(postData) {
        this.addEventListener('load', function() {
            // Method:  this._method
            // URL: this._url
            // Response body: this.responseText
            // Request body:  postData
            var done = (this.readyState == this.DONE);
            if (done && this._method == 'GET'
                && this.responseURL.match(/^(https?\:\/\/translate.google.com)?\/translate_a\/single\?/) ) {
                chrome.runtime.sendMessage(recorderId, {
                    type: 'request',
                    method: this._method,
                    url: this.responseURL,
                    done: done,
                    response: done && Function("return " +this.response)()
                });
            }
        });
        return send.apply(this, arguments);
    };
})();
