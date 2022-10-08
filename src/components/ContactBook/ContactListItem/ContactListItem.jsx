import css from '../ContactList/ContactList.module.css';
import PropTypes from 'prop-types';

export function ContactListItem({ user, deleteUser }) {
  const { id, name, number } = user;
  return (
    <li className={css.user_item}>
      {name}: <span>{number}</span>
      <button className={css.user_delete_btn} onClick={() => deleteUser(id)}>
        Delete
      </button>
    </li>
  );
}

ContactListItem.propTypes = {
  user: PropTypes.object,
};
