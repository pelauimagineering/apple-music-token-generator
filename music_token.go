package main

import (
	"fmt"
	"log"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

const (
	secret = `-----BEGIN PRIVATE KEY-----
ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123
-----END PRIVATE KEY-----`
	keyID  = "0123456789"
	teamID = "9876543210"
)

func main() {
	now := time.Now()
	token := jwt.NewWithClaims(
		jwt.SigningMethodES256,
		&jwt.StandardClaims{
			IssuedAt:  now.Unix(),
			ExpiresAt: now.Add(12 * time.Hour).Unix(),
			Issuer:    teamID})
	token.Header["kid"] = keyID

	signedToken, err := token.SignedString([]byte(secret))
	if err != nil {
		log.Panic(err)
	}

	fmt.Printf("----TOKEN----\n%s\n", signedToken)
	fmt.Printf("----CURL----\ncurl -v -H 'Authorization: Bearer %s' \"https://api.music.apple.com/v1/catalog/us/artists/36954\"\n", signedToken)
}
