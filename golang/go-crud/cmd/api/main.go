package main

import (
	"log"
	"net/http"

	"github.com/h3rmel/code-hub/golang/go-crud/internal/handlers"
	"github.com/h3rmel/code-hub/golang/go-crud/internal/service"
)

func main() {
	// Inicializa o serviço
	contactService := service.NewContactService()
	
	// Inicializa o handler
	contactHandler := handlers.NewContactHandler(contactService)

	// Define as rotas
	http.HandleFunc("/contacts/", contactHandler.HandleContacts)
	http.HandleFunc("/contacts", contactHandler.HandleContacts)

	// Inicia o servidor
	log.Println("Server starting on port 8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
