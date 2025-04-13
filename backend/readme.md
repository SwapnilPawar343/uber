# User Endpoints Documentation

## Registration Endpoint

### Endpoint
**POST** `/users/register`

> **Note:** Although the prompt mentions `/user/register`, the actual route set in [userRoute.js](d:\uber\backend\routes\userRoute.js) is `/users/register`.

### Description
This endpoint registers a new user into the system. It performs the following:
- **Validates** the request payload to ensure all required fields are provided and meet the specified criteria.
- **Hashes** the provided password using bcrypt before storing the user.
- **Creates** a new user record in the database.
- **Generates** a JSON Web Token (JWT) for authentication purposes.

### Request Body

The endpoint expects a JSON payload in the following format:

```json
{
  "fullname": {
    "firstname": "exampleFirstName",  // Required, minimum length: 3 characters
    "lastname": "exampleLastName"       // Required, minimum length: 3 characters
  },
  "email": "user@example.com",          // Required, must be a valid email format and minimum length of 10 characters
  "password": "yourPassword"            // Required, minimum length: 8 characters (validated at route level with 6 characters minimum, but defined as 8 in the model)
}
```

### Response

#### Success Response

- **Status Code:** `201 Created`
- **Body:**

    ```json
    {
      "token": "generated_jwt_token",
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "exampleFirstName",
          "lastname": "exampleLastName"
        },
        "email": "user@example.com"
        // other user fields if applicable...
      }
    }
    ```

#### Error Responses

1. **Validation Error:**
   - **Status Code:** `400 Bad Request`
   - **Body:**

      ```json
      {
        "errors": [
          {
            "msg": "Error message detailing the validation issue",
            "param": "field name",
            "location": "body"
          }
          // other errors...
        ]
      }
      ```

2. **Missing Fields or Other Validation Failure:**
   - The endpoint will throw an error with a descriptive message if any required fields (`fullname.firstname`, `fullname.lastname`, `email`, `password`) are missing.

---

## Login Endpoint

### Endpoint
**POST** `/users/login`

### Description
This endpoint authenticates an existing user. It performs the following:
- **Validates** the request payload to ensure the email and password meet the required criteria.
- **Verifies** that the user exists in the database, including a selection of the password field.
- **Compares** the provided password with the stored hashed password.
- **Generates** a JSON Web Token (JWT) upon successful authentication.

### Request Body

The endpoint expects a JSON payload in the following format:

```json
{
  "email": "user@example.com",          // Required, must be a valid email address
  "password": "yourPassword"            // Required, minimum length: 6 characters
}
```

### Response

#### Success Response

- **Status Code:** `200 OK`
- **Body:**

    ```json
    {
      "token": "generated_jwt_token",
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "exampleFirstName",
          "lastname": "exampleLastName"
        },
        "email": "user@example.com"
        // other user fields if applicable...
      }
    }
    ```

#### Error Responses

1. **Validation Error:**
   - **Status Code:** `400 Bad Request`
   - **Body:**

      ```json
      {
        "errors": [
          {
            "msg": "Error message detailing the validation issue",
            "param": "email or password",
            "location": "body"
          }
          // other errors...
        ]
      }
      ```

2. **Authentication Failure:**
   - **Status Code:** `401 Unauthorized`
   - **Body:**

      ```json
      {
        "message": "Invalid email or Password"
      }
      ```

---

## Additional Notes

- The request payloads are validated using [express-validator](https://express-validator.github.io/docs/).
- The password is hashed using bcrypt before storing new users, and bcrypt is used again for password comparison during login.
- JWT tokens are generated with [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) using a secret key specified in your environment configuration.
- Ensure that the following environment variables are set in your `.env` file:
  - `DB_CONNECT` (for MongoDB connection)
  - `JWT_SECRET` (for signing JWT tokens)
  - `PORT` (to set the server port)

For further information, please check the source at:
- [server.js](d:\uber\backend\server.js)
- [app.js](d:\uber\backend\app.js)
- [userControllers.js](d:\uber\backend\controllers\userControllers.js)
- [userServices.js](d:\uber\backend\services\userServices.js)