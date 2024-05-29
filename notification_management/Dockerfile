FROM openjdk:11
COPY target/*.jar NotificationManagement-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.default=none", "/NotificationManagement-0.0.1-SNAPSHOT.jar"]
EXPOSE 8088