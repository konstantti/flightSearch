# syntax=docker/dockerfile:1

FROM openjdk:latest

WORKDIR /app

COPY ./target/backend-0.0.1-SNAPSHOT.jar /app


CMD ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]