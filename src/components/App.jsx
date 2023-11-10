import React, { useState, useEffect } from 'react';
import { Container, Title } from './AppStyles'; 
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts) || [];
    setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const isNameExists = contacts.some(contact => contact.name === name);

    if (isNameExists) {
      alert("Це ім'я вже існує в телефонній книзі.");
      return;
    }

    const newContact = {
      id: `id-${Date.now()}`,
      name,
      number,
    };

    setContacts([...contacts, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onAddContact={addContact} />
      <Title>Contacts</Title>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
};



export default App;
