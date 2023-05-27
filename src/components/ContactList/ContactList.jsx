// Рендер списку контактів <ul> та його 1го елемента <li>

import { Component } from "react";                     // для класів
import PropTypes from 'prop-types';
import { ListContainer, Contact, Name, Number, Wrapper, Button } from "./styled";


export class ContactList extends Component {       // для класів
    render() {
        const { contacts, onDeleteContact } = this.props  // contacts - масив об'єктів
        return (
            <ListContainer>                                    {/* <ul> */} 
                {contacts.map(({ id, name, number }) => (
                    <Contact key={id}>                         {/* <li> */} 
                        <Wrapper>
                        <Name>{name}</Name>
                        <Number>{number}</Number>
                        </Wrapper>
                        <Button type='button' onClick={() => onDeleteContact(id)}>Delete</Button>
                    </Contact>      
                ))}
            </ListContainer>
        );
    }
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape ({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    })),
    onDeleteContact: PropTypes.func.isRequired,
};