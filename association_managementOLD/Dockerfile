FROM openjdk:11
COPY target/*.jar AssociationManagement-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.default=prod",  "/AssociationManagement-0.0.1-SNAPSHOT.jar"]
EXPOSE 8082

