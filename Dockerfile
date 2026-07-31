FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Cache Maven dependencies first (this layer only rebuilds when pom.xml changes)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Now copy source and build
COPY src ./src
RUN mvn clean package -DskipTests -q

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8081

# JVM optimizations for faster startup on low-memory containers (Render free = 512MB)
ENTRYPOINT ["java", \
  "-XX:+UseSerialGC", \
  "-Xss512k", \
  "-Xms128m", \
  "-Xmx384m", \
  "-XX:+TieredCompilation", \
  "-XX:TieredStopAtLevel=1", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", "app.jar"]
