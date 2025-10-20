# 🎓 Student Management System

A professional full-stack web application for managing student records with role-based access control.

---

## 🚀 HOW TO RUN THIS PROJECT

### **Quick Start (Recommended)**

1. **Double-click this file:**
   ```
   START-PROJECT.bat
   ```

2. **Wait for both servers to start** (about 30-40 seconds)

3. **Browser will open automatically** to http://localhost:3000

4. **Create an account or login**

That's it! You're ready to go! 🎉

---

## 📋 Features

### **Role-Based Access Control**

#### 👑 **Administrator (ADMIN)**
- ✅ View ALL student records (from all users)
- ✅ Add new student records
- ✅ Edit ANY student record
- ✅ Delete ANY student record
- ✅ Full system access

#### 👁️ **Viewer (VIEWER)** - Read-Only
- ✅ View ALL student records (from all users)
- ✅ Search and filter students
- ✅ Sort and navigate data
- ❌ Cannot add students
- ❌ Cannot edit students
- ❌ Cannot delete students
- Perfect for: Auditors, supervisors, managers

#### 👤 **Regular User (USER)**
- ✅ View ONLY their own student records
- ✅ Add new student records
- ✅ Edit ONLY their own records
- ❌ Cannot delete records
- ❌ Cannot see other users' data

### **Core Features**
- 🔐 **Secure Authentication**: JWT-based with BCrypt password hashing
- 📊 **Student Management**: Full CRUD operations
- 🔍 **Search & Filter**: Search students by name
- 📄 **Pagination**: Navigate through large datasets (5 per page)
- ↕️ **Sorting**: Sort by any column (ascending/descending)
- 🎨 **Modern UI**: Gradient backgrounds, glass-morphism design, smooth animations
- 📱 **Responsive**: Works on all screen sizes
- 🔔 **Toast Notifications**: Real-time feedback for all actions

---

## 🛠️ Technology Stack

### **Backend**
- Spring Boot 3.5.5
- Spring Security (JWT Authentication)
- Spring Data JPA (Hibernate)
- MySQL Database
- Maven

### **Frontend**
- React 18
- React Router DOM
- Axios
- React Toastify
- CSS3 with animations

---

## 📖 User Guide

### **First Time Setup**

1. **Run the project** using `START-PROJECT.bat`

2. **Register an account:**
   - Click "Register" on the login page
   - Fill in your details
   - Choose account type:
     - **Regular User**: For normal users
     - **Viewer (Read-Only)**: Can see all data but cannot modify
     - **Administrator**: For full access
   - Click "Register"

3. **Login** with your credentials

4. **Start managing students!**

---

### **Using the System**

#### **As an Administrator:**

1. **View All Students:**
   - You'll see ALL students in the system
   - Students added by any user are visible

2. **Add a Student:**
   - Click "Add Student" button
   - Fill in the form (all fields required)
   - Click "Save"
   - Student appears immediately in the list

3. **Edit Any Student:**
   - Click "Edit" button on any student
   - Modify the information
   - Click "Update"
   - Changes appear immediately

4. **Delete Any Student:**
   - Click "Delete" button on any student
   - Confirm the action
   - Student is removed from the system

#### **As a Regular User:**

1. **View Your Students:**
   - You'll see ONLY students YOU created
   - Other users' data is hidden for privacy

2. **Add a Student:**
   - Click "Add Student" button
   - Fill in the form
   - Click "Save"
   - Student is linked to your account

3. **Edit Your Students:**
   - Click "Edit" on students YOU created
   - You can only edit your own records
   - Others' records show "View Only"

4. **Delete:**
   - Regular users cannot delete any records
   - Only administrators have delete permission

---

## 🔍 Troubleshooting

### **Problem: Servers won't start**
**Solution:**
- Make sure MySQL is running
- Check if ports 8080 and 3000 are not blocked by other applications
- Close any existing terminal windows and try again

### **Problem: "Access Denied" or "403 Forbidden"**
**Solution:**
- Make sure you're logged in
- Check if your JWT token is valid (tokens expire after 24 hours)
- Try logging out and logging in again

### **Problem: Students not showing**
**Solution:**
- If you're a regular user, you only see YOUR students
- Try logging in as an administrator to see all records
- Check browser console (F12) for errors

### **Problem: Can't edit/delete students**
**Solution:**
- Regular users can only edit THEIR OWN records
- Only administrators can delete records
- Check if you're logged in with the correct account type

### **Problem: Database errors**
**Solution:**
- Make sure MySQL server is running
- Verify database "student" exists
- Backend will auto-create tables on first run

---

## 📁 Project Structure

```
JOVAC Project/
├── Backend/
│   └── Student-Management-System/
│       ├── src/main/java/com/kishan/demo/
│       │   ├── Controller/     # REST API endpoints
│       │   ├── Entity/         # Database models
│       │   ├── Repository/     # Data access layer
│       │   ├── Service/        # Business logic
│       │   ├── Security/       # JWT & Spring Security
│       │   └── DTO/           # Data transfer objects
│       └── src/main/resources/
│           └── application.properties  # DB config
├── Frontend/
│   └── student-management-frontend/
│       └── src/
│           ├── components/     # React components
│           ├── context/        # Auth context
│           └── services/       # API calls
└── START-PROJECT.bat          # Main startup script
```

---

## 🔐 Security Features

- **Password Encryption**: BCrypt hashing (never stores plain text passwords)
- **JWT Tokens**: Stateless authentication with 24-hour expiry
- **Role-Based Authorization**: Different permissions for Admin vs User
- **Protected Routes**: Frontend routes require authentication
- **CORS Protection**: Only localhost:3000 can access the API
- **SQL Injection Prevention**: Hibernate ORM with parameterized queries

---

## 💾 Database Schema

### **Users Table**
```
users
├── id (PK)
├── username (UNIQUE)
├── password (BCrypt encrypted)
├── email
├── full_name
└── role (USER, VIEWER, or ADMIN)
```

### **Students Table**
```
students
├── id (PK)
├── first_name
├── last_name
├── email
├── address
├── phno
└── created_by (username of creator)
```

---

## 📝 API Endpoints

### **Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### **Students** (All require JWT token)
- `GET /api/students` - Get students (filtered by role)
- `POST /api/students` - Add new student
- `PUT /api/students/{id}` - Update student (role-based)
- `DELETE /api/students/{id}` - Delete student (admin only)

---

## 🎨 UI Features

- **Gradient Backgrounds**: Beautiful animated gradients
- **Glass-morphism Cards**: Modern frosted glass effect
- **Smooth Animations**: Fade-in effects and transitions
- **Loading States**: Spinners for async operations
- **Toast Notifications**: Non-intrusive feedback messages
- **Responsive Design**: Mobile-friendly layout
- **Icon Integration**: SVG icons for better visuals

---

## ⚙️ Configuration

### **Backend Configuration** (`application.properties`)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
server.port=8080
```

### **Frontend Configuration** (`api.js`)
```javascript
const API_URL = "http://localhost:8080/api/students";
```

---

## 🎯 Quick Reference

| Action | Admin | Viewer | User |
|--------|-------|--------|------|
| View all students | ✅ Yes | ✅ Yes | ❌ No (only own) |
| Add student | ✅ Yes | ❌ No | ✅ Yes |
| Edit any student | ✅ Yes | ❌ No | ❌ No (only own) |
| Delete student | ✅ Yes | ❌ No | ❌ No |

---

## 📞 Support

If you encounter any issues:

1. Check the browser console (F12 → Console tab)
2. Check the backend terminal for error messages
3. Verify MySQL is running
4. Make sure both servers are running
5. Try refreshing the page or logging in again

---

## 🏁 Getting Started Checklist

- [ ] MySQL server is running
- [ ] Database "student" exists in MySQL
- [ ] Double-clicked `START-PROJECT.bat`
- [ ] Two terminal windows opened (don't close them)
- [ ] Waited 30-40 seconds for servers to start
- [ ] Browser opened to http://localhost:3000
- [ ] Created an account (choose Admin or User)
- [ ] Logged in successfully
- [ ] Ready to manage students!

---

**Made with ❤️ using Spring Boot & React**

**Version:** 2.0 with Role-Based Access Control
**Last Updated:** 2025
