import React, { useEffect, useState } from "react";
import AddContact from "./components/AddContact/AddContact";
import ContactsList from "./components/ContactsList/ContactsList";
import EditContacts from "./components/EditContacts/EditContacts";

function App() {
  let [contacts, setContacts] = useState([]); // пустой массив, чтобы push new contacts
  let [editContact, setEditContact] = useState({}); // добавление contacts, который мы хотим отредактировать
  let [isEdit, setIsEdit] = useState(false);

  // ! ==== localStorage start ====

  useEffect(() => {
    if (localStorage.getItem("contacts" === null)) {
      localStorage.setItem("contacts", JSON.stringify([]));
    } else {
      let data = localStorage.getItem("contacts");
      setContacts(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  // ! ==== localStorage end =====

  function handleNewContact(newContact) {
    // console.log(newContact);
    let newContactsArray = [...contacts];
    newContactsArray.push(newContact);

    setContacts(newContactsArray);
  }

  function handleDeleteContact(id) {
    // console.log(id);
    let newContactsArray = contacts.filter((item) => {
      return item.id !== id;
    });
    setContacts(newContactsArray);
  }

  function handleEditIndex(index) {
    // console.log(contacts[index])
    setIsEdit(true);
    setEditContact(contacts[index]);
  }

  function handleSaveEditedContact(newContact) {
    // console.log(newContact);
    let newContactsArray = contacts.map((item) => {
      if (item.id === newContact.id) {
        return newContact;
      }
      return item;
    });

    setContacts(newContactsArray);
    console.log(contacts);
    setIsEdit(false);
  }

  return (
    <div className="App">
      <AddContact handleNewContact={handleNewContact} />
      {isEdit ? (
        <EditContacts
          editContact={editContact}
          handleSaveEditedContact={handleSaveEditedContact}
        />
      ) : null}

      <ContactsList
        contacts={contacts}
        handleDeleteContact={handleDeleteContact}
        handleEditIndex={handleEditIndex}
      />
    </div>
  );
}

export default App;
