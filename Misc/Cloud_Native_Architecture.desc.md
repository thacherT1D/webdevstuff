Ideally you'd be able to explain microservice architecture that involves:

- JSON Services
- Java Spring Boot "proxy" servers (w/ Hystrix)
- Eureka for service discovery
- Config servers that "push" configuration to proxy servers

## Circuit Breaker Pattern

<iframe src="https://player.vimeo.com/video/143561979?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

- http://martinfowler.com/bliki/CircuitBreaker.html
- https://www.youtube.com/watch?v=I56HzTKvZKc

In Spring Boot (a Java Web Framework) circuit breakers are just one solution built into Hystrix.

- https://github.com/Netflix/Hystrix/wiki
- https://github.com/Netflix/Hystrix/wiki/FAQ 

Be able to describe cascading failures, and how Hystrix can help prevent them through

- circuit breakers
- quick timeouts
- fallbacks

## Clound Foundry

<iframe src="https://player.vimeo.com/video/143581180?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Microservice Architecture

<iframe src="https://player.vimeo.com/video/143581790?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Make sure you are familiar with both Eureka
- https://github.com/Netflix/eureka/wiki/Eureka-at-a-glance 
- https://github.com/Netflix/eureka/wiki/FAQ

## Resources

This gives a quick overview of what it look like to create these circuit breaker patterns in CloudFoundry https://www.youtube.com/watch?v=Vd243GqrkMI

Hear from one of the Netflix microservices architects at https://www.youtube.com/watch?v=pwpxq9-uw_0 - it's long but good.

Watch Martin Fowler describe microservice architectures  https://www.youtube.com/watch?v=2yko4TbC8cI or read about the same content at http://martinfowler.com/articles/microservices.html

Here are a few other links:

- https://netflix.github.io/
- https://github.com/Netflix/eureka
- https://github.com/Netflix/hystrix

Definitely read http://www.amazon.com/gp/product/B00A32NXZO?ie=UTF8&tag=martinfowlerc-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=B00A32NXZO

Also read http://pivotal.io/platform/migrating-to-cloud-native-application-architectures-ebook

- http://www.slideshare.net/Pivotal/cloud-native-runtime-platform-54230410
- http://www.slideshare.net/Pivotal/pivotal-cloud-foundryroadshowdevexp
- http://www.slideshare.net/Pivotal/pivotal-cloud-foundry-roadshow
- http://www.slideshare.net/Pivotal/pivotal-cloud-foundryroadshowenablingcd
- http://www.slideshare.net/Pivotal/pivotal-cloud-foundryroadshowbuildpacks

