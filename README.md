# Zero Mile Delivery System – Frontend

This is the ReactJS frontend for the **Zero Mile Delivery System**, built as part of the AWS Internship Project. It supports **user login with JWT**, **role-based UI rendering** for `ADMIN` and `VENDOR`, **public parcel tracking**, and **file uploads**.

---

## 🌐 Hosted On

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`

---

## ⚙️ Tech Stack

- **ReactJS**
- React Router DOM
- Axios
- JWT Decode
- Tailwind CSS (optional styling)
- RESTful API integration (Spring Boot Backend)

---

## 🔐 Features by Role

### 🔓 Public

- `/`: Track parcel by tracking number (no login required)

### 🔐 Login

- `/login`: Login using `admin` or `vendor` credentials

---

### 👨‍💼 Admin (ROLE_ADMIN)

- `/admin`: Create, update, delete, and view all parcels
- `/summary`: View today's delivery summary grouped by address
- `/orders`: View all uploaded delivery orders

---

### 🚚 Vendor (ROLE_VENDOR)

- `/upload`: Upload delivery order file (`.csv`) for parcel entry
- `/orders`: View their own uploaded orders

---

## 🧪 Testing Steps

### 1. Install Dependencies

        npm install

2.  Start Frontend

        npm start

        Runs on: http://localhost:3000

3.  Login Credentials

    | Username  | Password    | Role          |
    | --------- | ----------- | ------------- |
    | `admin`   | `admin@123` | `ROLE_ADMIN`  |
    | `vendor1` | `admin@123` | `ROLE_VENDOR` |

4.  Token Handling

JWT token is stored in localStorage after login.

It is automatically sent as Authorization: Bearer <token> to backend APIs.

Role is decoded from token to conditionally render UI.

5. Common Issues

   🔁 Always redirects to public page? → Check if token is valid or expired.

   ⚠️ 403 Forbidden? → Ensure correct login and role for the feature.

   📄 File upload not working? → Backend must be running and file should be .csv.

✅ Compatibility

Tested with:

    Backend: Zero Mile Spring Boot Backend

    APIs: Fully integrated with /api/parcels, /api/orders, /auth/login, etc.
