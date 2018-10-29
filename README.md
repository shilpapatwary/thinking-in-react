# Restful API's using Express.js

Create a Restful API for a Note taking application. You should be able to `Create`, `Read`, `Update` and `Delete` a particular note. Also, create one api to fetch all the Notes. 

1. Get all the notes. (It should also support sorting the notes by it's date of creation)
2. Get a single note by it's ID.
3. Create a new note.
4. Update a existing note.
5. Delete a existing note.

- Test your API's using Postman.
- Send back proper Http status codes and error messages on invalid requests.
- Write modular code with the help of Express router.
- Create a middleware to validate the request body.
- Error Handling should be in place.
- Setup Eslint with Airbnb and resolve all lint errors and warnings.

Make sure **Note** has atleast these 4 properties. 
 - noteId
 - noteTitle
 - noteDescription
 - createdAt

Feel free to add more properties to the Note object as per your requirements.

CD should be configured and the API's should be deployed on Heroku.