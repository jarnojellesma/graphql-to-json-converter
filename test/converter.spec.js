const chai = require('chai');
const convert = require('../index');

describe('Converter', function () {

    const validJsonSchema = getValidJsonSchema();
    const validGqlSchema = getValidGqlSchema();

    it('works', () => {
        const json = convert(validGqlSchema);
        chai.expect(json).to.eql(validJsonSchema);
    });
});


function getValidJsonSchema() {
    return {
        "type": {
          "User": {
            "id": {
              "type": "Int",
              "array": false,
              "required": true
            },
            "name": {
              "type": "String",
              "array": false,
              "required": true
            },
            "avatar": {
              "type": "Photo",
              "array": false,
              "required": false
            }
          },
          "Message": {
            "id": {
              "type": "Int",
              "array": false,
              "required": true
            },
            "text": {
              "type": "String",
              "array": false,
              "required": false
            },
            "user": {
              "type": "User",
              "array": false,
              "required": false
            }
          },
          "Query": {
            "user": {
              "type": "User",
              "array": false,
              "required": false
            },
            "users": {
              "type": "Users",
              "array": true,
              "required": false
            },
            "message": {
              "type": "Message",
              "array": false,
              "required": false
            },
            "messages": {
              "type": "Message",
              "array": true,
              "required": false
            }
          },
          "Mutation": {
            "createUser": {
              "args": {
                "data": {
                  "type": "UserInput",
                  "array": false,
                  "required": true
                }
              },
              "type": "User",
              "array": false,
              "required": false
            },
            "createMessage": {
              "args": {
                "text": {
                  "type": "String",
                  "array": false,
                  "required": false
                }
              },
              "type": "Message",
              "array": false,
              "required": false
            },
            "uploadPhotos": {
              "args": {
                "data": {
                  "type": "PhotoInput,",
                  "array": true,
                  "required": false
                },
                "repository": {
                  "type": "ID,",
                  "array": false,
                  "required": false
                }
              },
              "type": "Photo",
              "array": true,
              "required": false
            }
          },
          "Subscription": {
            "messageCreated": {
              "args": {
                "repository": {
                  "type": "Int",
                  "array": false,
                  "required": false
                }
              },
              "type": "Message",
              "array": false,
              "required": false
            }
          }
        },
        "input": {
          "PhotoInput": {
            "file": {
              "type": "String",
              "array": false,
              "required": true
            },
            "name": {
              "type": "String",
              "array": false,
              "required": true
            }
          },
          "UserInput": {
            "name": {
              "type": "String",
              "array": false,
              "required": true
            },
            "photo": {
              "type": "InputPhoto",
              "array": false,
              "required": false
            }
          }
        },
        "schema": {
          "query": {
            "type": "Query",
            "array": false,
            "required": false
          },
          "mutation": {
            "type": "Mutation",
            "array": false,
            "required": false
          },
          "subscription": {
            "type": "Subscription",
            "array": false,
            "required": false
          }
        }
      }      
}

function getValidGqlSchema() {
    return `
        type User {
        id: Int!
        name: String!
        avatar: Photo
        }

        type Message {
        id: Int!
        text: String
        user: User
        }

        input PhotoInput {
        file: String!
        name: String!
        }

        input UserInput {
        name: String!
        photo: InputPhoto
        }

        type Query {
        user: User
        users: [Users]
        message: Message
        messages: [Message]
        }

        type Mutation {
        createUser(data: UserInput!): User
        createMessage(text: String): Message
        uploadPhotos(
            data: [PhotoInput],
            repository: ID,
        ): [Photo]
        }

        type Subscription {
        messageCreated(repository: Int): Message
        }

        type schema {
        query: Query
        mutation: Mutation
        subscription: Subscription
        }
        `
}