var
  inquirer = require("inquirer"),
  fs = require('fs'),
  path = require('path'),
  gfile = require('gfilesync'),
  yaml = require('js-yaml');

module.exports = {
  do: function(data, callback) {

    var dependenciesChoices = [
      {
        name: "Data - JDBC",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-jdbc"
        }
      },
      {
        name: "Data - JPA",
        value: {
         groupId: "org.springframework.boot",
         artifactId: "spring-boot-starter-jpa"
       }
      },
      {
        name: "Data - MongoDB",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-mongodb"
        }
      },
      {
        name: "Data - Redis",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-redis"
        }
      },
      {
        name: "Data - Gemfire",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-gemfire"
        }
      },
      {
        name: "Data - Solr",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-solr"
        }
      },
      {
        name: "Data - Elasticsearch",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-elasticsearch"
        }
      },
      {
        name: "Web - Web",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-web"
        }
      },
      {
        name: "Web - Websocket",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-websocket"
        }
      },
      {
        name: "Web - WS",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-ws"
        }
      },
      {
        name: "Web - Jersey (JAX-RS)",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-jersey"
        }
      },
      {
        name: "Web - Rest Repositories",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-rest"
        }
      },
      {
        name: "Web - Mobile",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-mobile"
        }
      },
      {
        name: "Web - Security",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-security"
        }
      },
      {
        name: "Core - AOP",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-aop"
        }
      },
      {
        name: "Core - Atomikos (JTA)",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-jta-atomikos"
        }
      },
      {
        name: "Core - Bitronix (JTA)",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-jta-bitronix"
        }
      },
      {
        name: "I/O - Batch",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-batch"
        }
      },
      {
        name: "I/O - Integration",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-integration"
        }
      },
      {
        name: "I/O - JMS - Hornetq",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-hornetq"
        }
      },
      {
        name: "I/O - AMQP",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-amqp"
        }
      },
      {
        name: "I/O - Mail",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-mail"
        }
      },
      {
        name: "Template Engines - Freemarker",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-freemarker"
        }
      },
      {
        name: "Template Engines - Velocity",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-velocity"
        }
      },
      {
        name: "Template Engines - Groovy Templates",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-groovy-templates"
        }
      },
      {
        name: "Template Engines - Thymeleaf",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-thymeleaf"
        }
      },
      {
        name: "Template Engines - Mustache",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-mustache"
        }
      },
      {
        name: "Social - Facebook",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-social-facebook"
        }
      },
      {
        name: "Social - Linkedin",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-social-linkedin"
        }
      },
      {
        name: "Social - Twitter",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-social-twitter"
        }
      },
      {
        name: "Ops - Actuator",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-actuator"
        }
      },
      {
        name: "Ops - Cloud Connectors",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-cloud-connectors"
        }
      },
      {
        name: "Ops - Remote Shell",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-remote-shell"
        }
      }
    ];

    var questions = [
      {
        type: 'list',
        name: 'buildTool',
        message: 'Which build tool ?',
        choices: [{
          name: 'Maven',
          value: 'maven'
        },{
          name: 'Gradle',
          value: 'gradle'
        }],
        default: 'maven'
      },
      {
        type: 'checkbox',
        name: 'dependenciesSelected',
        message: 'Which dependencies ?',
        choices: dependenciesChoices
      }
    ];
    inquirer.prompt(questions, function( answers ) {
      /*
      if(answers.buildTool == 'maven') {
        gfile.copy(
          path.join(__dirname,'../model/config.@maven.yml'),
          path.join(process.cwd(),'model/config.@maven.yml'));
      }
      if(answers.buildTool == 'gradle') {
        gfile.copy(
          path.join(__dirname,'../model/config.@gradle.yml'),
          path.join(process.cwd(),'model/config.@gradle.yml'));
      }
      */

      var data = gfile.loadYaml(path.join(process.cwd(),'Genjsfile.yml'));

      if(data.global == null) {
        data.global = {};
      }
      if(data.global.project == null) {
        data.global.project = {};
      }
      if(data.global.project.name == null) {
        data.global.project.name = 'myapp';
      }
      if(data.global.project.version == null) {
        data.global.project.version = '0.1';
      }
      if(data.global.project.description == null) {
        data.global.project.description = '';
      }

      if(data.global.maven == null) {
        data.global.maven = {};
      }
      if(data.global.maven.groupId == null) {
        data.global.maven.groupId = 'demo';
      }
      if(data.global.maven.artifactId == null) {
        data.global.maven.artifactId = 'myapp';
      }
      if(data.global.maven.packaging == null) {
        data.global.maven.packaging = 'war'
      }

      if(data.global.version == null) {
        data.global.version = {};
      }
      if(data.global.version.springboot == null) {
        data.global.version.springboot = '1.2.1';
      }
      if(data.global.version.java == null) {
        data.global.version.java = '1.8';
      }

      gfile.writeYaml(path.join(process.cwd(),'Genjsfile.yml'), data);

      var dependencies = [];
      for(var i = 0; i<dependenciesChoices.length; i++) {
        var isSelected = false;
        for (var j = 0; j < answers.dependenciesSelected.length && !isSelected; j++) {
          if(answers.dependenciesSelected[j] == dependenciesChoices[i].value) {
            isSelected = true;
          }
        }
        var dependency = {};
        dependency[dependenciesChoices[i].value] = isSelected;
        dependencies.push(dependency);
      }
      var data = {
        dependencies: dependencies
      };

      gfile.writeYaml(path.join(process.cwd(),'model','config.@'+answers.buildTool+'.yml'), data);

      if(callback) {
        callback();
      }
    });
  }
};
