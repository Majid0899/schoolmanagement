# School Management App (Next.js + MySQL)

This project is a simple School Management application built with **Next.js**, **MySQL**, **React Hook Form**, and **Axios**.  
It allows you to **add new schools** with details (name, address, city, state, contact, email, image) and view all schools in a grid layout.

---

## 🚀 Features
- Add a new school using a responsive form
- Validation using `react-hook-form` (email regex, required fields)
- File upload using multer (school image) saved in `/public/schoolImages`
- Stores school data in MySQL `schools` table
- Fetch and display schools in an e-commerce-like card grid
- Responsive design with Tailwind CSS
- Error handling for DB and API operations

---

## 📂 Project Structure
schoolmanagement/
│
├── pages/
│ ├── addSchool.jsx # Form to add new school
│ ├── showSchools.jsx # Display schools in grid layout
│ └── api/
│  └── school/
│         └── index.js # API endpoint for GET/POST requests       
│
├── public/
│ └── schoolImages/ # Uploaded school images
│
├── lib/
│ └── db.js # MySQL connection helper
│ └── multer.js # Multer config file
│
├── styles/ # Global styles
├── .env.local # Database environment variables
└── README.md


---

##  Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/Majid0899/schoolmanagement.git
cd schoolmanagement

### 2. Install Dependencies
npm install

### 3. Create Database and then create table
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  contact VARCHAR(20) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  image VARCHAR(255)
);

### 4. Configure DB in .env.local
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=schooldb


### 5. Run the Server
npm run dev






