import React from "react";
import css from'./Filter.module.css'

const Filter = ({ filteredUsers }) => (
    <input className={css.filter} type="text" name="filter"
    onChange={filteredUsers} /> 
)

export default Filter