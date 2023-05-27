// Форма додавання контактів. Це статична форма - не змінна (при відправці викликає ф-цію зміни state)

import { Component } from "react";                     // для класів
import PropTypes from 'prop-types';
import { Form, Input, Button } from "./styled";


export class ContactForm extends Component {       // для класів
    // state потрібен для подальшої очистки форми (reset)
    state = { 
        name: '',
        number: '',
    }
    
    //Функція записує нові значення в state
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value }); // name - це значення атрибута <input> (name i number)     
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        this.props.addContact(this.state); // передає об'єкт 1го контакта {name: _, number: _} до App.jsx 
        this.setState({ 
            name: '',
            number: '',
        });  
    }

    render() {
        const { handleFormSubmit, handleChange } = this;
        const { name, number } = this.state;
        return (
            <Form onSubmit={handleFormSubmit} autoComplete="off">
                <label>
                    Name
                        <Input
                            type="text"
                            name="name"
                            value={name} // контрольований input (без цього reset не зробиш)
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            placeholder="Oles Honchar"
                            required
                            onChange={handleChange}
                        />
                </label>
                <label>
                    Number
                    <Input
                        type="tel"
                        name="number"
                        value={number} // контрольований input (без цього reset не зробиш)
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        placeholder="459-12-56"
                        onChange={handleChange}
                    />
                </label>
                <Button>Add contact</Button>
            </Form>
        );
    }
}

ContactForm.propTypes = {
    addContact: PropTypes.func.isRequired,
};