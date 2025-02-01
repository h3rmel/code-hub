package service

import (
	"errors"

	"github.com/h3rmel/code-hub/golang/go-crud/internal/models"
)

// ContactService gerencia as operações de contatos
type ContactService struct {
	contacts map[int]models.Contact
}

// NewContactService cria uma nova instância do serviço de contatos
func NewContactService() *ContactService {
	return &ContactService{
		contacts: make(map[int]models.Contact),
	}
}

// List retorna todos os contatos
func (s *ContactService) List() []models.Contact {
	var contacts []models.Contact
	for _, contact := range s.contacts {
		contacts = append(contacts, contact)
	}
	return contacts
}

// Get retorna um contato específico pelo ID
func (s *ContactService) Get(id int) (models.Contact, error) {
	if contact, ok := s.contacts[id]; ok {
		return contact, nil
	}
	return models.Contact{}, errors.New("contact not found")
}

// Create adiciona um novo contato
func (s *ContactService) Create(contact models.Contact) models.Contact {
	id := len(s.contacts) + 1
	contact.Id = id
	s.contacts[id] = contact
	return contact
}

// Update atualiza um contato existente
func (s *ContactService) Update(id int, contact models.Contact) error {
	if _, ok := s.contacts[id]; !ok {
		return errors.New("contact not found")
	}
	contact.Id = id
	s.contacts[id] = contact
	return nil
}

// Delete remove um contato
func (s *ContactService) Delete(id int) error {
	if _, ok := s.contacts[id]; !ok {
		return errors.New("contact not found")
	}
	delete(s.contacts, id)
	return nil
}
