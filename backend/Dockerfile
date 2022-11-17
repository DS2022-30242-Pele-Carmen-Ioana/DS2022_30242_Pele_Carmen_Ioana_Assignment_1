FROM adoptopenjdk:11-jre-hotspot

ADD . ./frontend_a1
WORKDIR /frontend_a1

ARG JAR_FILE=*.jar
COPY  ./target/ds-2020-0.0.1-SNAPSHOT.jar ./ds-2020-0.0.1-SNAPSHOT.jar
CMD ["java", "-jar", "ds-2020-0.0.1-SNAPSHOT.jar"]