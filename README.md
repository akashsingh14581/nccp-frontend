# NCCP Frontend

The NCCP Frontend is built using **Vue.js** and provides an admin dashboard for managing events, members, awards, customers, and form data.  

This project is connected to the NCCP Backend using Axios.

Only the **Admin** can log in and access the dashboard.  
There is **no user signup/registration**.

---

## 🚀 Tech Stack

- **Vue.js**
- **Axios** (API calls)
- **Vue Router**
- **Bootstrap 5** (UI styling)
- Custom Components (No Vuex/Pinia, No Tabulator)

---

## 🔐 Authentication

- Only **Admin Login**  
- Admin credentials are created using the backend seeder  
- Login redirects to Dashboard  
- Protected routes implemented using router guard

---

## 📂 Main Features

### 🟦 1. Admin Login
- Secure login form  
- Backend validation  
- Redirects to dashboard after successful login  

---

### 🎟️ 2. Event Management
Admin can:
- Create new events  
- Add event title, description, year, and details  
- Upload event images  
- View list of events  

---

### 👥 3. Member Management
Admin can create and manage 3 types of members:

- **Honorary Members**  
- **Ordinary Members**  
- **Other Members**

Each member includes:
- Name  
- Role / Type  
- Designation  
- Related details  
- Image (optional)  

Members can be added, viewed, and managed through the UI.

---

### 🏆 4. Award Management
Admin can:
- Upload award details  
- Attach award images  
- Connect award to members/events (if needed)  

---

### 📝 5. Form and Customer Management
- Multi-step form UI  
- Add customer data  
- Submit and send form data to backend  
- Customer list view  

---

### 🖼️ 6. Image/File Upload UI
- Bootstrap-based upload UI  
- Preview before upload  
- Validation included  
- Sends files to backend API  

---

## 📁 Folder Structure

```
nccp-frontend/
│── src/
│     ├── components/
│     ├── pages/
│     ├── router/
│     ├── services/      # Axios API service files
│     ├── assets/
│     └── App.vue
│── public/
│── package.json
```

---

## 🔧 Environment Variables

Create `.env` file in root:

```
VITE_API_URL=http://localhost:3000
```

Used for backend API communication.

---

## ▶️ Running the Project

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Build for production:

```
npm run build
```

---

## ⭐ Summary

- Built with Vue.js + Bootstrap  
- Admin-only dashboard  
- Admin login (no signup)  
- Event creation + image upload  
- Member creation (Honorary, Ordinary, Others)  
- Award upload  
- Customer form & data management  
- Simple and clean architecture without Vuex/Pinia  

