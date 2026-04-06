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