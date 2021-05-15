# Backend api documentation

## POST /api/login
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
    "json_token": ""
}
```
## POST /api/register
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
    "account_restoration_key" : "<key>",
    "json_token" : "",
}
```