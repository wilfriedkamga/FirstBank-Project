FROM openjdk:11
COPY target/*.jar SavingsPlanManagement-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.default=none",  "/SavingsPlanManagement-0.0.1-SNAPSHOT.jar"]
EXPOSE 8085