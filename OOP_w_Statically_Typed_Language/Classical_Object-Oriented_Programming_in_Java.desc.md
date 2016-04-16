Fork and clone this repo and follow along!

https://github.com/gSchool/java-curriculum

## Resources

- http://docs.oracle.com/javase/tutorial/java/concepts/QandE/questions.html
- http://docs.oracle.com/javase/tutorial/java/nutsandbolts/QandE/questions_variables.html
- http://docs.oracle.com/javase/tutorial/java/javaOO/QandE/creating-questions.html
- http://www.quora.com/What-is-the-difference-between-compiled-and-interpreted-programming-languages
- http://beginnersbook.com/2013/03/polymorphism-in-java/

## Setting up jUnit

- create a directory called algorithms
- create a directory structure like this:

    ```
    algorithms <- this is the directory you created in step 1
        src
            main
                java
                    Television.java
            test
                java
                    TelevisionTest.java
        build.gradle
    ```
- add a build.gradle file with the following contents

    ```
    apply plugin: 'java'
    
    repositories {
        mavenCentral()
    }
    
    dependencies {
      compile 'log4j:log4j:1.2.17'
      testCompile 'junit:junit:4.12'
    }
    
    jar {
        from { configurations.compile.collect { it.isDirectory() ? it : zipTree(it) } }
        manifest {
            attributes 'Main-Class': 'challenges.HelloWorld'
        }
    }

    test {
        testLogging {
            exceptionFormat "full"
            showStandardStreams = true
        }
    }
    ```
- add a test that looks like this:

    ```
    import org.junit.Before;
    import org.junit.Test;
    import static org.junit.Assert.assertEquals;
    
    public class YourClassTest {
      @Test
      public void methodName_ShouldDoSomething() {
        YourClass foo = new YourClass();
        assertEquals("Some value", foo.someMethod());
      }
    }
    ```
