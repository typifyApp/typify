if [[ -f server.crt && -f server.key ]]; then 
    echo "Already generated certificate"
else
    openssl req -new -newkey rsa:4096 -x509 -sha512 -days 3650 -nodes -out server.crt -keyout server.key
fi
