const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve("models", "contacts.json");
const stringify = (data) => JSON.stringify(data, null, 2);

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const findContactDel = contacts.findIndex(({id}) => id === contactId);
  if(findContactDel === -1) {
    return null;
  }
  const removedContact = contacts.splice(findContactDel, 1);
  await fs.writeFile(contactsPath, stringify(contacts));
  return removedContact; 
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const {name, email, phone} = body;
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  fs.writeFile(contactsPath, stringify([...contacts, newContact]));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(({ id}) => id === contactId);
  if(contactIndex === -1) {
    return null;
  }
  contacts[contactIndex] = {...contacts[contactIndex], ...body};
  await fs.writeFile(contactsPath, stringify(contacts));
  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
