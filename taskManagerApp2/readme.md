# basis
backend has three main layers:
```plain text
Client (browser / frontend)
↓
Controller  ← handles HTTP (API)
↓
Repository ← talks to database
↓
Database (PostgreSQL)

later change to Controller → Service → Repository 
````
```plain text
TaskRepository
   ↓
Spring Data JPA
   ↓
Hibernate (ORM)
   ↓
SQL
```
```plain text
Request → Controller → Repository → JPA/Hibernate → Database
                                         ↓
Response ← JSON ← Controller ← Java Objects
```
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

# 6
```
taskmanager
 └─ src/main/java/com/example/taskmanager
      ├─ TaskmanagerApplication.java
      ├─ entity
      ├─ repository
      ├─ service
      └─ controller
```
Das ist eine Standard-Spring-Boot Architektur.
# 7. task entity erstellen
```
entity/Task.java
```
```
@Entity  -> Tabelle in DB
@Table   -> Tabellenname
@Id      -> Primary Key
@GeneratedValue -> Auto increment
```
# 8. repository erstellen
Spring Boot generiert automatisch:

save()

findAll()

deleteById()

findById()

Du musst keinen SQL-Code schreiben.
# 9. controller erstellen
```
controller/TaskController.java
```
server neu starten:
mvn spring-boot:run
# 10. test
create tasks:
```bash
curl -X POST http://localhost:8080/tasks \
-H "Content-Type: application/json" \
-d '{"title":"Learn Spring Boot","completed":false}'
```
get tasks:
```bash
curl http://localhost:8080/tasks
```

# Front end
## 1.create React app
go to your project root
run:
```bash
npx create-react-app frontend
```
## 2. start frontend
```bash
cd frontend
npm start
```
open: http://localhost:3000

keep backend running in another terminal:
```bash
mvn spring-boot:run
```
## 3. clean react project
open: frontend/src/App.js
## 4. fix CORS error
it will likely get an error: `CORS policy blocked`
open controller:
```java
@RestController
@RestMapping("/tasks")
```
add:
```java
@CrossOrigin(origins = "http://localhost:3000")
```
Now:

Backend running → localhost:8080

Frontend running → localhost:3000

# tailwind
**tailwind v4 does not work properly with Create React App, must use v3**
1. install correct Tailwind version
```bash
npm uninstall tailwindcss
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p 
```
2. `postcss.config.js`
```
module.exports = {
  plugins: {
   tailwindcss: {},
    autoprefixer: {},
  },
};
```
3. `index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
4. `tailwind.config.js`
```
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```
5. npm start

# Authentication
```
Frontend → login → Backend
                ↓
             returns JWT
                ↓
Frontend stores token
                ↓
Frontend sends token with every request
                ↓
Backend verifies token
```

## backend add dependency
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
```
## create user entity and userRepository
## register endpoint
## login logic
## frontend login
## send token with requests