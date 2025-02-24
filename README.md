# Perfumes' Store with `REACT`

## `FUNCTIONALITY`

This a perfumes' store made with react. It's purpose is to simulate a real online shopping page, where products are shown and added to a cart.

Database contains all the existing products, as the different users.

---

## `REQUIREMENTS`

- [x] Login and users' validation.

  > Managed using JSON.
  >
  > Includes `admin` and `client` users.

- [x] Choose a specific theme and view an online catalog with products and their description.

- [x] Implement a shopping cart

- [x] Include images.

- [x] Provide a registration form for users.

  > User data should be stored and persist within the app (JSON).

- [x] Use of components to implement the app's different sections.

- [x] Utilize Hooks (`useEffect`, `useState`, `useContext`).

  > Their usage must be justified.

---

## `DEPENDENCIES`

```bash
npx create-react-app project_name

npm install web-vitals
npm install react-router-dom
npm install json-server
npm install bootstrap bootstrap-icons
npm install axios
npm install react-icons
npm install react-hook-form
npm install react-toastify
npm install jspdf@2.5.1 jspdf-autotable@latest
npm install concurrently --save-dev

npm run start:dev
```

#### REACT ROUTER DOM

> For links/endpoints management.

#### JSON SERVER

> To simulate the API and data's storage.

#### BOOTSTRAP & BOOTSTRAP-ICONS

> To give the app some stilying.

#### AXIOS

> To manage petitions to our json or any other API.

#### REACT-ICONS

> To add icons to the app in a simple way.

#### REACT HOOK FORM

> To manage the forms of the app (login, register...).

#### REACT TOASTIFY

> To show pop-up notifications (product added to the cart...).

#### CONCURRENTLY

> To execute more than one command merged in one.

#### JSPDF JSPDF-AUTOTABLE

> To generate .pdf files in an easy way.

---

## `STRUCTURE`

>
    ├── node_modules/
    ├── public/
    |   ├── images/             ## Images for the db
    ├── src/
    |   ├── components/         ## Common components (NavBar, Footer...)
    |   ├── pages/              ## App's pages (Home, Login...)
    |   ├── data/               ## JSON data used (products, users...)
    |   ├── services/           ## App's logic (Axios data fetching)
    |   ├── App.js              ## Main component
    |   ├── index.js            ## App's entry point
    |   ├── reportWebVitals.js  ## To show errors at the browser

## `CODE`

#### `package.json`

Implement this code to execute parallel commands. This will allow to initialize the app with only one command.

```json

"scripts": {
  "start:dev" : "concurrently \"npx json-server --watch src/data/db.json --port 3001\" \"npm start\""
}

```

#### `useEffect, useState`

We make use of `useEffect` to execute code that interacts with other parts of the app (Example: API petitions).

```js
useEffect( () => { /*code*/ }
```

We make use of `useState` to define variables with a value that will change while the app is working.

```js
const [products, setProducts] = useState([]);
```

#### `localStorage`

We make use of `localStorage` to save the items needed to check if the user is Logged in and, this way, show (or not) the username at the NavBar and decide wich auth links to show.

```js
localStorage.setItem("isLogged", true);
localStorage.setItem("username", username);
```