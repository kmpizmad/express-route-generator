# Changelog v1.1.0

## Added

- `Exception`: This is the base class for all errors / exceptions.
  - `throw(): never`: This method will log the message on the console then exits the program with code 1
- `Schema`: This class handles the schema generation along with the `SchemaBuilder`
  - `build(): void`: Builds the schema
  - `RouterSchema`: Only used for the built-in router schema
  - `HandlerSchema`: Only used for the built-in handler schema
  - `TestSchema`: Only used for the built-in test schema
- `SchemaBuilder`: This class holds and creates the built-in schemes
  - `build(): void`: Builds the built-in schemes
  - `userBuild(): void`: Builds the user defined schemes
  - `defaultBuild(): void`: Builds the default (built-in) schemes
- `ConfigLoader`: Static class that loads the `erg.config` file via it's `load(): Config | undefined` method
- `FileManager`: Static class that is used for managing and working with files
  - `setExtension(): string[]`: Creates multiple entries for a file (same name, different extension)
