package models

// Contact representa a estrutura de dados de um contato
type Contact struct {
	Id    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Phone string `json:"phone"`
}
