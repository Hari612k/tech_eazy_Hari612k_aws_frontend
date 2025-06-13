# 🚚 Zero Mile Delivery System – Frontend (ReactJS)

This is the frontend of the **Zero Mile Delivery System**, developed using ReactJS. It connects to a Spring Boot backend and supports role-based access for Admin and Vendor users, as well as public parcel tracking.

---

## 📦 Tech Stack

- ReactJS 19
- React Router DOM v7
- Axios
- JWT Decode
- CSS (custom styling)

---

## ▶️ Getting Started

### 1. Install Dependencies
npm install

2. Run the Development Server
  npm start

This will start the app on:
📍 http://localhost:3000

# Proxy Setup (Connect to Backend)
In your package.json, this line should be present:
  "proxy": "http://localhost:8080"


# Role-Based Routing
Routing is handled in App.js using role-based logic from decoded JWT tokens.

| URL Path   | Component         | Access Level     |
| ---------- | ----------------- | ---------------- |
| `/`        | PublicTrackParcel | Public (no auth) |
| `/login`   | Login             | Public (no auth) |
| `/admin`   | ParcelForm + Grid | Admin only       |
| `/upload`  | UploadOrder       | Vendor only      |
| `/orders`  | OrderList         | Admin & Vendor   |
| `/summary` | ParcelSummary     | Admin only       |


# Login Credentials

| Role   | Username  | Password    |
| ------ | --------- | ----------- |
| Admin  | `admin`   | `admin@123` |
| Vendor | `vendor1` | `admin@123` |


Key Features
✅ JWT Authentication
✅ Role-Based UI and Routing
✅ Admin:

Create, view, edit, delete parcels

View parcel summary grouped by pincode/address

✅ Vendor:

Upload delivery order file

View list of uploaded orders with pagination & filters

✅ Public:

Track parcel by tracking number without login


# Testing Instructions
1. Start the backend on port 8080.

2. Start the frontend on port 3000 using npm start.

3. Open browser at http://localhost:3000

4. Use login credentials to explore role-based access.

5. Test Public Parcel Tracking from the home page / without logging in.


