// Фільтр пошуку у списку контактів

import PropTypes from 'prop-types';
import { Input } from '../ContactForm/styled';
import { Container } from "./styled";


export const Filter = ({ filter, onChange }) => { 
    return (
        <Container>
            <label>
                Find contacts by name
                <Input 
                    type="name"
                    name="filter"
                    value={filter}
                    required
                    placeholder="Oles"
                    onChange={onChange}
                />
            </label>
        </Container>
    );
}

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};