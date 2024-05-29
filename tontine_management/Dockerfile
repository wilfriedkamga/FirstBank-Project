FROM openjdk:11
COPY target/*.jar TontineManagement-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.default=none", "/TontineManagement-0.0.1-SNAPSHOT.jar"]
EXPOSE 8081
