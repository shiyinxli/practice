# 1
Gehe auf:
https://start.spring.io
Wähle:  
Project: Maven  
Language: Java  
Spring Boot: 3.x  
Group: com.example  
Artifact: taskmanager  
Packaging: Jar  
Java: 17  
Dependencies hinzufügen:  
Spring Web  
Spring Data JPA  
PostgreSQL Driver (oder H2)  
Lombok  
Dann:  
Generate → ZIP herunterladen  
In IntelliJ öffnen  
# 2
```bash
psql postgres
```
```sql
create database taskmanager;
```
```sql
\l
```
```sql
\q
```
# 3
open `pom.xml` and add:
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```
# 4
Configure Spring Boot database connection

Open:

`src/main/resources/application.properties`

Add:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/taskmanager
#spring.datasource.username=postgres
spring.datasource.username=shiyinli
spring.datasource.password=

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```
Explanation:

ddl-auto=update → automatically create tables

show-sql=true → print SQL in terminal (good for learning)
# 5
Wenn Projekt geöffnet ist:  
Starte es:  
```bash
mvn spring-boot:run
```
Öffne im Browser:  
http://localhost:8080  
Es wird noch nichts angezeigt — das ist normal.