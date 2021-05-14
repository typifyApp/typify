# Backend api documentation

## POST /login
Send :
```json
{
    "username" : "<username>",
    "password" : "<password>"
}
```
Recieve :
```json
{
    "accepted": bool,
    "response": "<Error message or Login accepted>",
    "cookie": ""
}
```
## POST /register

