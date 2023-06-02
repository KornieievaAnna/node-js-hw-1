const db = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allConnects = await db.listContacts();
      console.log(allConnects);
      break;

    case "get":
      const contact = await db.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await db.addContact({ name, email, phone });
      console.log("Contact added:", newContact);
      break;

    case "updateContactById":
      const updateContact = await db.updateContact(id, {
        name,
        email,
        phone,
      });
      console.log("Contact added:", updateContact);
      break;

    case "remove":
      const removeContact = await db.removeContact(id);
        console.log("Contact removed:", removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
// invokeAction({ action: "list"});

// invokeAction({ action: "get", id: "AeHIrLTr6JkxGE6SN-0Rw" });

// invokeAction({
//   action: "add",
//   name: "anna",
//   email: "anna@test.com",
//   phone: "123456",
// });

// invokeAction({
//   action: "updateContactById",
//   id: "qAyQPUxLGnbnwAk10V-Yq",
//   name: "anna3",
//   email: "anna@test.com",
//   phone: "123456",
// });

// invokeAction({
//   action: "remove",
//   id: "qAyQPUxLGnbnwAk10V-Yq",
// });

invokeAction(argv);

