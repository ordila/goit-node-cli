const {program} = require("commander")
const contacts = require("./contacts")




// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allBooks = await contacts.getAll();
      console.log(allBooks[0]);
      break;

    case "get":
      const contactByID = await contacts.getContactById(id)
      console.log(contactByID)
      break;

    case "add":
      const newContact = await contacts.addContact({name,email,phone});
      console.log(newContact)
      break;

    case "update":
      const updatedContact = await contacts.updateContact(id,{name,email,phone});
      console.log(updatedContact)
      break;

      case "delete":
        const deletedContact = await contacts.deleteContact(id);
        console.log(deletedContact)
        break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

  program.parse();

const options = program.opts();

invokeAction(options);

