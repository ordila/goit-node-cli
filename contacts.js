const fs = require('fs/promises')
const path = require('path')
const {nanoid} = require('nanoid')

const contactsPath = path.join(__dirname, 'db/contacts.json');

const updateContacts = async (contact) => { await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2))}

const getAll = async () => {
    const data = await fs.readFile(contactsPath, 'utf8')
    return JSON.parse(data);
}

const getContactById = async (id) => {
    const data = await getAll();
    const result = data.find(contact => contact.id === id)
    return result || null;
}

const addContact = async (contact) => {
    const data = await getAll();
    const newContact = { ...contact, id: nanoid() };
    data.push(newContact);
    await updateContacts(data)
    return newContact;
}

const updateContact = async (id,contactsInfo) => {
    const data = await getAll();
    const index = data.findIndex(contact => contact.id === id)
    if(index === -1) {
        return null;
    }
    data[index] = {id, ...contactsInfo}
    await updateContacts(data)
    return data[index]

}

const deleteContact = async(id) => {
    const data = await getAll();
    const index = data.findIndex(contact => contact.id === id);
        if(index === -1) {
            return null;
        }
    const [result] = data.splice(index, 1);
    await updateContacts(data)
    return result;
}
module.exports = {
    getAll,
    getContactById,
    addContact,
    updateContact,
    deleteContact
}