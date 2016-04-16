## THE MASTER COPY LIVES HERE : https://github.com/gSchool/node-curriculum/blob/master/unit-1/03-http-and-node.md

http://slides.com/chos-kim/creating-an-http-sever-with-node-js#/

#### Comments
(This is Cho. I'll update the instructor notes in a few days.)

When talking about the importance of content-type, have students see the signifance of both. Maybe pass an h1 tag and text as text/html, then as text/plain.

For status code, change it from 200 to 404, to 204. When students change it to 204, they no longer send content in the response body. Ask them why--they should, on their own initative, look it up and realize that 204 sends no content.

When talking about requests and responses, talk about how certain tags (e.g., link, images, script) in HTML sends their own requests. This info is very important to solve the first exercise in creating a file server.

Students loved being asked white boarding (WB) questions through this learning experience.

#### The Syntax of a Uniform Resource Locator (URL)
Questions (WB):

- Example URL: `http://www.example.com:8080/faq/foo?company=galvanie&language=en#/#/acme`
1. What's the protocol
2. What's the domain name
3. What's the port
6. What's the path
4. What are the query string keys
5. What are the query string values
7. What's the hash

8. Which words form the initialism URL?
9. Construct the URL on port `2065`, the domain `foobarski.xyz`, and on the `ftp` protocol.
10. Construct the URL on port `80`, with the domain `www.minions2015`, on the `http` protocol, with a path of `movie`, and a query string with a parameter of `language` and a value of `english`.

Answers:

1. `http`
2. `www.example.com`
3. `8080`
4. `/faq/foo`
5. `company` and `language`
6. `galvanize` and `en`
7. `/#/acme`

8. A URL is a Uniform Resource Locator. 
9. `ftp://foobarski.xyz:2065`
10. `http://www.minions2015/movie?language=english`

#### Domain Name System (DNS)
Based on our aquired knowledge, 
try to answer the following questions about URLs:

  1. What's the IP Address of http://www.philzcoffee.com/
  2. What's the domain name of `54.213.26.162`
  3. Is the IP Address `54.213.26.362` valid? Why?
  4. Is the IP Address `207.171.162.180:80` valid? Why?

The corresponding answers:

  1. `167.216.129.13:80`
  2. http://www.galvanize.com/
  3. No, the last octet is greater than 255.
  4. Yes, each octet is within a correct range.

-----------------------------------------------------------------
#### HTTP
Question (WB)

- What does HTTP stand for?
- When requests and responses are sent over HTTP, what's the data type being used?

#### HTTP Request
Questions (WB)

- What's the default verb of a request
- What's are some of the differences between GET and POST method?

- What's the text found in the request line of www.galvanize.com?
- Inside of the header, what's the host for http://www.galvanize.com?
- What's sent in the request body of www.galvanize.com?

Answers

- GET
- http://www.diffen.com/difference/GET_(HTTP)_vs_POST_(HTTP)

- GET / HTTP/1.1
- www.galvanize.com
- nothing

#### HTTP Response  
Questions (WB)

- Which class of status codes represent success ?
- Which class of status codes represent redirect?
- What's the status code for "Not Found"
- What's the status code for "Success"

- What's the text found in the response line of www.galvanize.com?
- Inside of the header, what's the content-type for www.galvanize.com?
- What's sent in the request body of www.galvanize.com?

Answers

- 2XX
- 3XX
- 404
- 200

- HTTP/1.1 200 OK
- text/html; charset=UTF-8
- An HTML file

------------------------------------------------------
#### Create an HTTP server with Node.js
Questions (WB)

- what's localhost
- what's it IP Address

Answers

- a hostname
- 127.0.0.1

------------------------------------------------------
#### Access the components of a URL with the url module
Question (Written)

- Considering that HTTP requests and responses are passed as strings, what value does the url module provide?

Answer

- The url module parses the strings and appends it as properties of an object.
