if [[ -f "fullchain.pem" && -f "privkey.pem" ]]; then 
    echo "Already generated certificate"
else
    openssl req -new -newkey rsa:4096 -x509 -sha512 -days 3650 -nodes -out fullchain.pem -keyout privkey.pem -config development_config
fi
