Send a span to the collector
Here’s the command. Check the URL and then run this at the command line, or paste it into Postman.

```
curl -i http://localhost:4318/v1/traces -X POST -H "Content-Type: application/json" -d @span.json
```

Here,
```
`-i` means “show me what happens”
`http://localhost` is the URL to the collector—yours might be different
`4318` is the port standard port for OTLP/HTTP
`/v1/traces` is the standard endpoint for OTLP traces
`-X POST` sends an HTTP POST request
`-H "Content-Type: application/json"` says “here comes some JSON”
`-d @span.json` says “read the body of the request from a file called span.json”
If you’re using Postman, you’ll probably paste in the body separately, so you won’t need the `-d span.json`.
```
The collector should respond happily, and say very little:
```
HTTP/1.1 200 OK
Content-Type: application/json
Vary: Origin
Date: Tue, 12 Jul 2022 18:44:50 GMT
Content-Length: 2

{}
The collector logs also say nothing. It doesn’t log about normal functioning. 
```
