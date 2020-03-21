package main

import (
	"fmt"
	"net/http"
) 

func main() {
	changeHeaderThenServe := func(h http.Handler) http.HandlerFunc {
		return func(w http.ResponseWriter, r *http.Request) {
			// Set some header.
			w.Header().Add("Access-Control-Allow-Origin", "*")
			// Serve with the actual handler.
			h.ServeHTTP(w, r)
		}
	}
	fmt.Println("Start")
	http.Handle("/", changeHeaderThenServe(http.FileServer(http.Dir("./snet"))))
	http.ListenAndServe(":5555", nil)
}