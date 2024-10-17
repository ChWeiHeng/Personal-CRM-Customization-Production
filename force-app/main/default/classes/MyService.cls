@RestResource(urlMapping='/myservice')
global class MyService {
    @HttpGet
    global static void doGet() {
        RestContext.response.addHeader('Content-Type', 'text/plain');
        String name = RestContext.request.params.get('name');
        RestContext.response.responseBody = Blob.valueOf('Hello '+ name);
    }
}