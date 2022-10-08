import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactBook/ContactForm/ContactForm';
import ContactList from './ContactBook/ContactList/ContactList';
import Filter from './ContactBook/Filter/Filter';
import css from './ContactBook/ContactBook.module.css';
import { Section } from './ContactBook/Section/Section';

const USER_KEY = 'reader_item_contacts';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate = (prevProps, prevState) => {
    const contactsToLS = JSON.stringify(this.state.contacts);
    localStorage.setItem(USER_KEY, contactsToLS);
  };

  componentDidMount() {
    if (JSON.parse(localStorage.getItem(USER_KEY))) {
      this.setState(prevState => ({
        contacts: JSON.parse(localStorage.getItem(USER_KEY)),
      }));
    }
  }

  addContact = userData => {
    let { contacts } = this.state;

    if (contacts.some(formData => formData.name === userData.name)) {
      alert(`${userData.name} is already in contacts`);
    } else {
      userData.id = nanoid(5);
      this.setState(prevState => ({
        contacts: [...prevState.contacts, userData],
      }));
    }
  };

  handleChangeFilter = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  deleteUser = userId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(user => user.id !== userId),
    }));
  };

  filter = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div className={css.contact_wrap}>
        <Section title="Phonebook">
          <ContactForm onSubmitForm={this.addContact} />
        </Section>

        <Section title="Contacts">
          <Filter filteredUsers={this.handleChangeFilter} />
          {contacts.length > 0 ? (
            filter ? (
              <ContactList
                users={this.filter()}
                onDeleteUser={this.deleteUser}
              />
            ) : (
              <ContactList users={contacts} onDeleteUser={this.deleteUser} />
            )
          ) : (
            <></>
          )}
        </Section>
      </div>
    );
  }
}

export default App;
