FROM openjdk:11
COPY target/UserManagement-0.0.1-SNAPSHOT.jar UserManagement-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.default=prod", "/UserManagement-0.0.1-SNAPSHOT.jar"]
EXPOSE 8088
