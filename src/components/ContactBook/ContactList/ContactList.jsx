import React from "react";
import css from './ContactList.module.css'
import PropTypes from 'prop-types'
import { ContactListItem } from "../ContactListItem/ContactListItem";
const ContactList = ({ users, onDeleteUser}) => (
    <ul className={css.user_list}>
        {users.map(user => <ContactListItem key={user.id} user={user} deleteUser={onDeleteUser} />)
        }
    </ul>
    
)


export default ContactList

ContactList.propTypes = {
    users: PropTypes.array,
}