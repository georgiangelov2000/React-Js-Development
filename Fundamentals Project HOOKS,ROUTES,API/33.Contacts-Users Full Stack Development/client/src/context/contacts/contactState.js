import React, { useReducer } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import ContactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    error:null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  const addContact = async (contact) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/api/contacts",
        contact,
        config
      );
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type:CONTACT_ERROR, payload:error.response.msg });
    }
  };

  const deleteContact = (id) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  };

  const setCurrentContact = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };

  const clearCurrentContact = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

  const updateCurrentContact = (contact) => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact,
    });
  };

  const filterContacts = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text,
    });
  };

  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error:state.error,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        updateCurrentContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
