# SpringBoot

```
genjs bundle
```
=> Download ```SpringBoot```

# Model

Copy one of the config.yml :

* ```model/config.@maven.yml``` : for Maven
* ```model/config.@gradle.yml``` : for Gradle

=> Content :
```
dependencies:
  - jdbc: false
  - jpa: false
  - mongodb: false
  - redis: false
  - gemfire: false
  - solr: false
  - elasticsearch: false
  - websocket: false
  - ws: false
  - jersey: false
  - rest: false
  - mobile: false
  - security: false
  - aop: false
  - jta-atomikos: false
  - jta-bitronix: false
  - batch: false
  - integration: false
  - hornetq: false
  - amqp: false
  - mail: false
  - freemarker: false
  - velocity: false
  - groovy-templates: false
  - thymeleaf: false
  - facebook: false
  - linkedin: false
  - twitter: false
  - actuator: false
  - cloud-connectors: false
  - remote-shell: false
```
, replace ```false``` by ```true``` to activate the dependency
