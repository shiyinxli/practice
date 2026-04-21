curl -X POST http://localhost:8080/auth/login \
-H "Content-Type: application/json" \
-d '{
"email": "test@test.com",
"password": "123456"
}'

```bash
git fetch origin
git reset --hard origin/main
git clean -fd
```

mvn spring-boot:run -X

```bash
curl -X POST http://localhost:8080/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"test@test.com","password":"123456"}'
```

# test protected endpoint
```bash
curl -v http://localhost:8080/api/hello   # 403 unauthorized

curl -X POST http://localhost:8080/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"test@test.com","password":"123456"}' # get token

curl http://localhost:8080/api/hello \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." # get Hello, authenticated user!
```