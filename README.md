# Zero Mile Delivery System – Frontend (Assignment 4)

This ReactJS frontend is used to track parcels, upload delivery orders, and view parcel summaries based on user roles.

## 🚀 Tech Stack

- ReactJS
- Axios
- React Router DOM
- JWT-Decode

---

## 🌐 Backend Configuration

- Backend Base URL: `http://<YOUR_EC2_PUBLIC_IP>:8080`
- Configured in: `src/api.js`

---

## 🔐 Authentication

- Login to receive JWT token.
- Token is stored in `localStorage` and attached automatically to requests using Axios interceptors.

---

## 🎯 Features

- Public users can track parcels.
- Vendors can upload delivery orders and view their orders.
- Admins can manage parcels, view orders, and access parcel summaries.

---

## 🧪 Frontend Testing Steps

1.  Start the backend on EC2.
2.  Start the frontend locally:

    ```bash
    npm start

    ```

3.  Login using:

        Admin: admin / admin@123

        Vendor: vendor1 / admin@123

4.  Test role-based navigation:

        Admin: Manage parcels, view orders, view summaries.

        Vendor: Upload orders, view orders.

        Public: Parcel tracking without login.

📂 Important

        The api.js file has been updated to point to AWS EC2 public IP.

        Make sure your EC2 instance is running while testing the frontend.

✅ Deployment Note

        Currently tested in local frontend with backend hosted on EC2.

        Can be further deployed to AWS S3 or other hosting services.
