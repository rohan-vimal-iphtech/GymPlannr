Certainly! Here's a professionally formatted and detailed `README.md` for your **GymPlanr** project, incorporating the GIFs and information you've provided:

---

# 🏋️‍♂️ GymPlanr

**GymPlanr** is a modern fitness planning web application that empowers users to create, customize, and manage a weekly workout plan. Featuring real-time drag-and-drop interactions, intelligent exercise filtering, and visual analytics—all wrapped in a sleek, mobile-responsive UI.

![Workout Motivation](https://i.imgflip.com/9wevjx.gif)


---

## 🌟 Features

* 🔍 **Exercise Filtering**
  Easily filter exercises by **muscle group** or **equipment** using live data from public APIs like [ExerciseDB](https://exercisedb.p.rapidapi.com/) and [API Ninjas](https://api-ninjas.com/api/exercises).

* 📅 **Date-wise Workout Planning**
  Add and manage workouts **per day** using a simple tab-based layout or calendar selector.

* 🧲 **Drag-and-Drop Exercise Management**
  Reorder exercises interactively using [`@dnd-kit`](https://dndkit.com/), supporting smooth animations and intuitive reordering logic.

* 📊 **Weekly Workout Report**
  View your weekly summary in a beautiful **line chart** with a color gradient (using [Recharts](https://recharts.org/)). Displays:

  * Total workout minutes per day
  * 0-minute indicators for rest days

* 💾 **Persistent Storage**
  All workout data is stored locally using **Redux Toolkit** combined with **localStorage middleware**—no backend required.

* 🎨 **Modern UI/UX Design**
  Clean interface built with **Tailwind CSS**, featuring:

  * Blurred background modals
  * Responsive layout
  * Smooth transitions and hover effects

---

## 🛠️ Tech Stack

| Technology                                           | Version | Description                                    |
| ---------------------------------------------------- | ------- | ---------------------------------------------- |
| [React](https://reactjs.org/)                        | ^18.2.0 | Component-based UI library                     |
| [Vite](https://vitejs.dev/)                          | ^5.0.8  | Lightning-fast development server & bundler    |
| [Redux Toolkit](https://redux-toolkit.js.org/)       | ^1.9.5  | Scalable state management with slices          |
| [React Redux](https://react-redux.js.org/)           | ^8.1.1  | React bindings for Redux                       |
| [Tailwind CSS](https://tailwindcss.com/)             | ^3.4.1  | Utility-first CSS framework for styling        |
| [@dnd-kit](https://dndkit.com/)                      | ^6.0.6  | Drag-and-drop toolkit for React                |
| [Recharts](https://recharts.org/)                    | ^2.8.0  | Charting library for data visualization        |
| [API Ninjas](https://api-ninjas.com/api/exercises)   | -       | Real-time exercise information by muscle group |
| [ExerciseDB API](https://exercisedb.p.rapidapi.com/) | -       | Open-source exercise database                  |

---

## 📦 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/rohan-vimal-iphtech/GymPlanr.git
cd GymPlanr
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start the App

```bash
npm run dev
```

The application will be available at: [http://localhost:5173](http://localhost:5173)

---

## 💾 Local Storage Integration

The app utilizes a custom Redux middleware to sync workout data to `localStorage`, ensuring:

* **Persistent data** across browser sessions
* **No need for a backend** or external database
* **Instant loading** upon page refresh

---

## 📊 Weekly Reports

* Implements **Recharts** for line and area visualizations
* Provides a breakdown of **minutes exercised per day**
* Features a **color-filled area** under the line for emphasis
* **Rest days** are clearly indicated with 0 minutes

---

## 🖼️ Sample Meme

![Motivational Meme](https://i.imgflip.com/9wevjx.gif)

*"One more rep… because GymPlanr told me to."*

---

## 📁 Folder Structure Overview

```
/src
├── /components        → Reusable UI components (modals, tabs, cards)
├── /features          → Redux slices (planner, user, filters, etc.)
├── /hooks             → Custom React hooks
├── /pages             → Route-level components (Home, Planner, Report)
├── /redux             → Store setup & middleware
├── /utils             → Helper functions (localStorage, calculations)
└── App.jsx            → Main app layout and routing
```

---

## 🔗 Additional Resources

* **Live Demo**: *Coming Soon*
* **API References**:

  * [ExerciseDB API](https://exercisedb.p.rapidapi.com/)
  * [API Ninjas - Exercises](https://api-ninjas.com/api/exercises)

---

Feel free to customize this `README.md` further to match your project's specific details or branding. Let me know if you need assistance with any other aspect of your project!
