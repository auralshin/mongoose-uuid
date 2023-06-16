# mongoose-uuid-ts

This package provides a way to work with UUIDs (Universally Unique Identifiers) in Mongoose, a MongoDB object modeling tool. It extends Mongoose's built-in types to include a UUID type, which can be used to define UUID fields in your Mongoose schemas.

## Installation

```bash
npm install mongoose-uuid-ts
```

## Usage

To use the UUID type in a Mongoose schema:

```typescript
import mongoose from 'mongoose';
import { mongooseUuid } from 'mongoose-uuid-ts';

const UserSchema = new mongoose.Schema({
  _id: {
    type: mongooseUuid,
    required: true
  },
  name: String,
});
```

In this example, the `_id` field of the `User` schema is defined to be of type UUID.

## API

The `mongoose-uuid-ts` package exports the following:

- `getter`: Function that gets the string representation of a UUID from a binary buffer.
- `checkRequired`: Function that checks if a given value is a buffer.
- `cast`: Function that casts a given value to a UUID, either from a buffer or a string.
- `castForQuery`: Function that casts a given value for a query. Used internally by Mongoose.

## TypeScript Support

This package includes TypeScript definitions for all exported functions.

## Testing

To run the tests for this package:

```bash
npm test
```

This will run the test suite using Jest.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.


// Usage
const UserSchema = new Schema({
  userId: {
    type: UUIDSchemaType,
    required: true,
  },
});

const user = new User({
  userId: uuidv4(),
});

user.save();
