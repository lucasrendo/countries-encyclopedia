# Countries Encyclopedia

This application provides details about various countries

## Prerequisites

-   Node.js
-   npm (Node Package Manager)
-   The repository cloned:
    ```sh
    git clone https://github.com/lucasrendo/countries-encyclopedia.git
    ```

## Backend Setup

1. Navigate to the backend directory:

    ```sh
    cd ../backend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Configure environment variables:
   Create a `.env` file in the `backend` directory and add the following:

    ```
    PORT = 4000
    ```

4. Start the backend server:
    ```sh
    npm start
    ```

It should now display the message _"server listening on port 4000"_

## Frontend Setup

1. Navigate to the frontend directory:

    ```sh
    cd ../frontend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Configure environment variables:
   Create a `.env` file in the `frontend` directory and add the following:

    ```
    REACT_APP_API_URL = http://localhost:4000
    ```

4. Start the frontend server (make sure the server is already running):
    ```sh
    npm start
    ```

It should launch the application on the browser. The URL to the app is _`http://localhost:3000`_

---

### Enjoy exploring the countries!
