FROM openjdk:11
COPY target/NotificationManagementTont-0.0.1-SNAPSHOT.jar NotificationManagementTont-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.default=prod", "/NotificationManagementTont-0.0.1-SNAPSHOT.jar"]
EXPOSE 8091
