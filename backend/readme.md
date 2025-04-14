# API Endpoints Documentation

## Users Endpoints

### 1. Register User

#### Endpoint
**POST** `/users/register`

#### Description
This endpoint registers a new user into the system. It performs the following:
- **Validates** the request payload to ensure all required fields are provided and meet the specified criteria.
- **Hashes** the provided password using bcrypt before storing the user.
- **Creates** a new user record in the database.
- **Generates** a JSON Web Token (JWT) for authentication purposes.

#### Request Body

```json
{
  "fullname": {
    "firstname": "exampleFirstName",  // Required, minimum length: 3 characters
    "lastname": "exampleLastName"     // Required, minimum length: 3 characters
  },
  "email": "user@example.com",        // Required, must be a valid email format
  "password": "yourPassword"          // Required, minimum length: 8 characters
}
```

#### Response

##### Success Response
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
      }
    }
    ```

##### Error Responses
1. **Validation Error:**
   - **Status Code:** `400 Bad Request`
   - **Body:**

      ```json
      {
        "errors": [
          {
            "msg": "Error message",
            "param": "field_name",
            "location": "body"
          }
        ]
      }
      ```

2. **User Already Exists:**
   - **Status Code:** `400 Bad Request`
   - **Body:**

      ```json
      {
        "message": "User already exists"
      }
      ```

---

### 2. Login User

#### Endpoint
**POST** `/users/login`

#### Description
This endpoint authenticates an existing user.

#### Request Body

```json
{
  "email": "user@example.com",        // Required, must be a valid email address
  "password": "yourPassword"          // Required, minimum length: 6 characters
}
```

#### Response

##### Success Response
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
      }
    }
    ```

##### Error Responses
1. **Invalid Credentials:**
   - **Status Code:** `401 Unauthorized`
   - **Body:**

      ```json
      {
        "message": "Invalid email or Password"
      }
      ```

---

### 3. Get User Profile

#### Endpoint
**GET** `/users/profile`

#### Description
This endpoint retrieves the profile of the currently authenticated user.

#### Request Headers

```
Authorization: Bearer <your_jwt_token>
```

#### Response

##### Success Response
- **Status Code:** `200 OK`
- **Body:**

    ```json
    {
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "exampleFirstName",
          "lastname": "exampleLastName"
        },
        "email": "user@example.com"
      }
    }
    ```

##### Error Responses
1. **Unauthorized Access:**
   - **Status Code:** `401 Unauthorized`
   - **Body:**

      ```json
      {
        "message": "Authentication required"
      }
      ```

2. **User Not Found:**
   - **Status Code:** `404 Not Found`
   - **Body:**

      ```json
      {
        "message": "User not found"
      }
      ```

---

### 4. Logout User

#### Endpoint
**GET** `/users/logout`

#### Description
This endpoint logs out the currently authenticated user by clearing the authentication token and blacklisting it.

#### Request Headers

```
Authorization: Bearer <your_jwt_token>
```

#### Response

##### Success Response
- **Status Code:** `200 OK`
- **Body:**

    ```json
    {
      "message": "Logout successfully"
    }
    ```

##### Error Responses
1. **Unauthorized Access:**
   - **Status Code:** `401 Unauthorized`
   - **Body:**

      ```json
      {
        "message": "Authentication required"
      }
      ```

---

## Captains Endpoints

### 1. Register Captain

#### Endpoint
**POST** `/captains/register`

#### Description
This endpoint registers a new captain into the system.

#### Request Body

```json
{
  "fullname": {
    "firstname": "exampleFirstName"  // Required, minimum length: 3 characters
  },
  "email": "captain@example.com",    // Required, must be a valid email format
  "password": "yourPassword",        // Required, minimum length: 6 characters
  "vehicle": {
    "color": "red",                  // Required, minimum length: 3 characters
    "plate": "ABC123",               // Required, minimum length: 3 characters
    "capacity": 4,                   // Required, must be an integer greater than or equal to 1
    "vehicleType": "car"             // Required, must be one of ["car", "motorcycle", "auto"]
  }
}
```

#### Response

##### Success Response
- **Status Code:** `201 Created`
- **Body:**

    ```json
    {
      "token": "generated_jwt_token",
      "captain": {
        "_id": "captain_id",
        "fullname": {
          "firstname": "exampleFirstName"
        },
        "email": "captain@example.com",
        "vehicle": {
          "color": "red",
          "plate": "ABC123",
          "capacity": 4,
          "vehicleType": "car"
        }
      }
    }
    ```

##### Error Responses
1. **Validation Error:**
   - **Status Code:** `400 Bad Request`
   - **Body:**

      ```json
      {
        "errors": [
          {
            "msg": "Error message",
            "param": "field_name",
            "location": "body"
          }
        ]
      }
      ```

2. **Captain Already Exists:**
   - **Status Code:** `400 Bad Request`
   - **Body:**

      ```json
      {
        "message": "Captain already exists"
      }
      ```

---

## Additional Notes

- All endpoints requiring authentication use JWT tokens.
- Ensure the following environment variables are set in your `.env` file:
  - `DB_CONNECT` (MongoDB connection string)
  - `JWT_SECRET` (secret key for signing JWT tokens)
  - `PORT` (server port)

For further details, refer to the source files:
- [userControllers.js](d:\uber\backend\controllers\userControllers.js)
- [captainController.js](d:\uber\backend\controllers\captainController.js)
- [userRoute.js](d:\uber\backend\routes\userRoute.js)
- [captainRoutes.js](d:\uber\backend\routes\captainRoutes.js)