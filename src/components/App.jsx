import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Container, Title, SubTitle, AlertMessage } from "./styled";
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


export class App extends Component {

  state = {
    contacts: [
      {id: 'id-1', name: 'Mykhailo Kotsiubynsky', number: '459-12-56'},
      {id: 'id-2', name: 'Saint Nicholas', number: '443-89-12'},
      {id: 'id-3', name: 'Chris Martin', number: '645-17-79'},
      {id: 'id-4', name: 'Plumber Stephan', number: '227-91-26'},
    ],    
    filter: ''
  }

  componentDidMount() {  //при монтуванні компонента (відбувається 1 раз) 
    console.log('componentDidMount');
    const localStorageContacts = JSON.parse(localStorage.getItem('contacts'));  //отримали з localStorage
 
    if(localStorageContacts) {
      this.setState({ contacts: localStorageContacts });    //записали в state
    }
  }

  componentDidUpdate(_, prevState) {   //при зміні компонента
    console.log('componentDidUpdate');
    if(prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts)); //якщо в state є зміни, то записали в localStorage
    }
  }

  // Функція викликається при відправці форми - змінює state (зшиває масив контактів з новим об'єктом 1го контакта)
  // Якщо введене ім'я вже є в state контактах, то спливе відповідне повідомлення і об'єкт з цим ім'ям не додасться до state 
  
  addContact = (userInput) => {  // приймає об'єкт 1го контакта
    const newContactObject = {id: nanoid(), ...userInput};  // короткі властивості (name: name, number: number)
    
    const nameClone = this.state.contacts.find((contact) => ( // вертає об'єкт з ім'ям, що повторюється
      contact.name.toLowerCase() === userInput.name.toLowerCase()
    ));

    if(nameClone) {
      Notify.failure(`${userInput.name} is already in contacts`); 
      return;
    }

    this.setState(prevState => ({ 
      contacts: [...prevState.contacts, newContactObject]  //зшиває масив контактів з новим об'єктом 1го контакта 
    }));
  }


  // Функція, що змінює state (записує в filter введене користувачем значення)
  handleFilter = (event) => {
    this.setState({ filter: event.target.value });  
  };


  // Функція, яка шукає співпадіння введеного в фільтр імені серед імен масиву об'єктів в state
  //повертає новий масив знайдених об'єктів (якщо фільтр в state пустий, то новий масив контактів не створиться, 
  // а з ф-ції повернеться масив контактів, що в state)
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) => 
      name.toLowerCase().includes(filter.toLowerCase()) 
    );
    
  }
  
  // Функція видалення 1го контакта по id (filter створює новий масив без об'єкта з заданим id)
  deleteContact = (contactID) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactID),
    }));
  };


  render() {
    const { addContact, handleFilter, getVisibleContacts, deleteContact } = this;
    return (
        <Container>
          <Title>Phonebook</Title>
          <ContactForm addContact={addContact} /> 

          <SubTitle>Contacts</SubTitle>
          <Filter filter={this.state.filter} onChange={handleFilter} />
          
          {/* {getVisibleContacts().length ? (       рендер по умові
          <ContactList contacts={getVisibleContacts()} onDeleteContact={DeleteContact} /> // якщо фільтр пустий, то передасться [] контактів зі state, якщо повний, то [] зі співпадіннями 
          ) : (
            <AlertMessage>There is no contact matching your request.</AlertMessage>
          )} */}

          {getVisibleContacts().length !==0 && <ContactList contacts={getVisibleContacts()} onDeleteContact={deleteContact} />}  {/* якщо фільтр пустий, то передасться [] контактів зі state, якщо повний, то [] зі співпадіннями  */}
          {getVisibleContacts().length ===0 && <AlertMessage>There is no contact matching your request.</AlertMessage>}
          
        </Container>
    );
  }
}