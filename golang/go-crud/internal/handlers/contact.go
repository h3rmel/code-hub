package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"github.com/h3rmel/code-hub/golang/go-crud/internal/models"
	"github.com/h3rmel/code-hub/golang/go-crud/internal/service"
)

type ContactHandler struct {
	service *service.ContactService
}

func NewContactHandler(service *service.ContactService) *ContactHandler {
	return &ContactHandler{service: service}
}

func (h *ContactHandler) HandleContacts(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		if id := getIDFromPath(r.URL.Path); id > 0 {
			h.handleGetContact(w, id)
		} else {
			h.handleListContacts(w)
		}
	case http.MethodPost:
		h.handleCreateContact(w, r)
	case http.MethodPut:
		id := getIDFromPath(r.URL.Path)
		h.handleUpdateContact(w, r, id)
	case http.MethodDelete:
		id := getIDFromPath(r.URL.Path)
		h.handleDeleteContact(w, id)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func (h *ContactHandler) handleListContacts(w http.ResponseWriter) {
	contacts := h.service.List()
	respondWithJSON(w, http.StatusOK, contacts)
}

func (h *ContactHandler) handleGetContact(w http.ResponseWriter, id int) {
	contact, err := h.service.Get(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	respondWithJSON(w, http.StatusOK, contact)
}

func (h *ContactHandler) handleCreateContact(w http.ResponseWriter, r *http.Request) {
	var contact models.Contact
	if err := json.NewDecoder(r.Body).Decode(&contact); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	contact = h.service.Create(contact)
	respondWithJSON(w, http.StatusCreated, contact)
}

func (h *ContactHandler) handleUpdateContact(w http.ResponseWriter, r *http.Request, id int) {
	var contact models.Contact
	if err := json.NewDecoder(r.Body).Decode(&contact); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := h.service.Update(id, contact); err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	respondWithJSON(w, http.StatusOK, contact)
}

func (h *ContactHandler) handleDeleteContact(w http.ResponseWriter, id int) {
	if err := h.service.Delete(id); err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

// Funções auxiliares

func getIDFromPath(path string) int {
	parts := strings.Split(path, "/")
	if len(parts) < 3 {
		return 0
	}
	id, _ := strconv.Atoi(parts[2])
	return id
}

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(payload)
}
