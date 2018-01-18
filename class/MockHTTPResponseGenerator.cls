global class MockHTTPResponseGenerator implements HttpCalloutMock{
	global HTTPResponse respond(HTTPRequest req) {
        // Create a fake response
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody('{"country":"","extension":"pdf","offset":"0","numFound":"13057","numberTotal":"13057","search_results":{"assets":{"asset":[{"originalFileName":"ESM_final.pdf","languages":{"locale":"en","value":"All Languages - None"},"lastModifiedDate":"2016-11-04T18:45:16-05:00","mediaType":"Document","countries":{"locale":"en","value":"United States"},"creationDate":"2012-01-05T17:29:23-06:00","ownerID":"ushaa003","version":"0","versionDate":"2012-01-05T17:29:23-06:00","descriptions":[{"locale":"en","value":"ESM Final Catalog  ~Keywords: austin."}],"divisions":{"locale":"en","value":"Electronics Materials Solutions Div"},"score":"0.18862356","security":"Public","activeStatus":"Valid","originalFileSize":"3563062","content_type":{"locale":"en","value":"Catalog"},"mime_type":"application/pdf","fileExtension":"pdf","name":"ESM_final.pdf","id":"21916","locked":false,"assetStatus":"Approved","download_urls":[{"preview":"https://multimedia.3m.com/mws/media/21916P/esm-final-catalog.jpg"},{"thumbnail":"https://multimedia.3m.com/mws/media/21916T/esm-final-catalog.jpg"},{"original":"https://multimedia.3m.com/mws/media/21916O/esm-final-catalog.pdf"}],"marketplace_names":{"locale":"en","value":"ESM Final Catalog"}}]}},"search_term":"cable","limit":"10","language":""}');
        res.setStatusCode(200);
        return res;
    }
}

