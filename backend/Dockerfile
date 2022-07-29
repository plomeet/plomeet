FROM openjdk:11

ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-jar", "/app.jar", "-Dspring-boot.run.arguments=--username=${USERNAME}, --password=${PASSWORD}, --url=${URL}"]