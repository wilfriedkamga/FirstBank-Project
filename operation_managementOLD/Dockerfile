FROM openjdk:11
COPY target/*.jar OperationManagement-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.default=none",  "/OperationManagement-0.0.1-SNAPSHOT.jar"]
EXPOSE 8082