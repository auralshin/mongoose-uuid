import mongoose from "mongoose";
import { Buffer } from "buffer";
import { UUIDSchemaType } from "./index";
import { v4 as uuidv4 } from "uuid";
describe("UUIDSchemaType", () => {
  beforeAll(() => {
    // Connect to the MongoDB database using Mongoose
    mongoose.connect("mongodb://127.0.0.1:27017/mydatabase");
  });

  afterAll(async () => {
    // Disconnect from the MongoDB database
    await mongoose.disconnect();
  });

  it("should cast a valid UUID string to Buffer", () => {
    const uuidString = "7b7e8257-36d4-4a7f-b1f7-5d8e8de5e646";
    const uuidBuffer = Buffer.from(uuidString, "hex");

    const uuidSchemaType = new UUIDSchemaType("uuid");
    const castValue = uuidSchemaType.cast(uuidString);

    expect(castValue).toEqual(uuidBuffer);
  });

  it("should throw an error for an invalid UUID string", () => {
    const invalidUuidString = "invalid-uuid-string";

    const uuidSchemaType = new UUIDSchemaType("uuid");

    expect(() => {
      uuidSchemaType.cast(invalidUuidString);
    }).toThrowError(`Value is not a valid UUID string: ${invalidUuidString}`);
  });

  it("should return the original Buffer value for castForQuery", () => {
    const uuidBuffer = Buffer.from(
      "7b7e8257-36d4-4a7f-b1f7-5d8e8de5e646",
      "hex"
    );

    const uuidSchemaType = new UUIDSchemaType("uuid");
    const castValue = uuidSchemaType.castForQuery(uuidBuffer);

    expect(castValue).toEqual(uuidBuffer);
  });

  it("should throw an error for an invalid value in castForQuery", () => {
    const invalidValue = 123;

    const uuidSchemaType = new UUIDSchemaType("uuid");

    expect(() => {
      uuidSchemaType.castForQuery(invalidValue);
    }).toThrowError(
      `UUID must be a string or buffer, got ${typeof invalidValue}`
    );
  });

  it("should convert a Buffer value to a UUID string using the getter", () => {
    const uuidString = "7b7e8257-36d4-4a7f-b1f7-5d8e8de5e646";
    const uuidBuffer = Buffer.from(
      "7b7e8257-36d4-4a7f-b1f7-5d8e8de5e646",
      "hex"
    );

    const uuidSchemaType = new UUIDSchemaType("uuid");
    uuidSchemaType.toString = jest.fn(() => uuidString);

    const result = uuidSchemaType.get((value: any) => value);

    expect(result).toEqual(uuidString);
  });

  it("should return true for checkRequired if the value is a Buffer", () => {
    const uuidBuffer = Buffer.from(
      "7b7e8257-36d4-4a7f-b1f7-5d8e8de5e646",
      "hex"
    );

    const uuidSchemaType = new UUIDSchemaType("uuid");
    const isRequired = uuidSchemaType.checkRequired(uuidBuffer);

    expect(isRequired).toBe(true);
  });
});
