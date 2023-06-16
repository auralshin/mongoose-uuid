# Mongoose UUID Schema Type

This is a custom schema type for Mongoose that allows storing and manipulating UUID (Universally Unique Identifier) values as buffers in MongoDB. It extends the existing `UUID` schema type provided by Mongoose.

## Installation

To use the `UUIDSchemaType`, you need to have Mongoose and the `uuid` package installed in your project.

```bash
npm install mongoose uuid
```

## Usage

1. Import the required dependencies:

```javascript
import mongoose from "mongoose";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { Buffer } from "buffer";
```

2. Define the `UUIDSchemaType` class, extending the `UUID` schema type provided by Mongoose:

```javascript
class UUIDSchemaType extends mongoose.Schema.Types.UUID {
  // Custom implementation of the UUID schema type
  // ...
}
```

3. Implement the necessary methods (`cast`, `castForQuery`, `get`, `checkRequired`) in the `UUIDSchemaType` class according to your requirements. These methods handle the casting, querying, getting, and validation of UUID values.

4. Register the `UUIDSchemaType` with Mongoose:

```javascript
mongoose.Schema.Types.UUID = UUIDSchemaType;
```

5. Now, you can use the `UUID` schema type in your Mongoose schemas:

```javascript
const MySchema = new mongoose.Schema({
  uuidField: {
    type: mongoose.Schema.Types.UUID,
    required: true,
  },
  // ...
});
```

## Example

Here's an example demonstrating the usage of the `UUIDSchemaType`:

```javascript
// Import necessary dependencies and define UUIDSchemaType

// ...

// Add UUID to Mongoose Schema types
mongoose.Schema.Types.UUID = UUIDSchemaType;

// Create a sample schema
const UserSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.UUID,
    default: () => uuidv4(),
  },
  name: String,
});

// Create a model using the schema
const User = mongoose.model("User", UserSchema);

// Create a new user
const newUser = new User({
  name: "John Doe",
});

// Save the user to the database
newUser.save()
  .then((user) => {
    console.log("User created:", user);
  })
  .catch((error) => {
    console.error("Error creating user:", error);
  });
```

## License

This code is provided under the [MIT License](https://opensource.org/licenses/MIT).

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request on GitHub.

## Credits

This custom schema type is developed and maintained by [Your Name](https://github.com/your-github-username).

## Resources

- [Mongoose Documentation](https://mongoosejs.com/)
- [UUID npm package](https://www.npmjs.com/package/uuid)

Feel free to modify and enhance the README as per your specific requirements and preferences.