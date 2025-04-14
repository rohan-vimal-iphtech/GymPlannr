# 🏋️‍♂️ GymPlanr

**GymPlanr** is a modern fitness planning web app designed to help users manage and visualize their weekly workout routines with ease. It offers an interactive experience with drag-and-drop planning, exercise filtering by muscle or equipment, and detailed visual reports—all built with a responsive and elegant UI.

---

## 🌟 Features

- 🔍 Filter exercises by **muscle group** or **equipment**
- 📅 Plan workouts for each day of the week (one plan only)
- 🔄 Drag-and-drop reordering of exercises using `@dnd-kit`
- 📊 Weekly report with estimated time shown in a **line chart**
- 💾 Data stored persistently in **LocalStorage** via Redux
- 🎨 Smooth **blurred background** effect for popups
- 🖥️ Responsive and intuitive design (built with Tailwind CSS)

---

## 🛠️ Tech Stack

| Technology       | Version        | Description                            |
|------------------|----------------|----------------------------------------|
| React            | ^18.2.0        | UI framework                           |
| Vite             | ^5.0.8         | Build tool for fast development        |
| Redux Toolkit    | ^1.9.5         | State management                       |
| React Redux      | ^8.1.1         | Redux bindings for React               |
| Tailwind CSS     | ^3.4.1         | Utility-first CSS framework            |
| @dnd-kit         | ^6.0.6         | Drag and drop functionality            |
| Recharts         | ^2.8.0         | Charting library for data visualization |
| API Ninjas       | -              | Exercise API for gym data              |
| ExerciseDB API   | -              | Alternative Exercise API               |

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rohan-vimal-iphtech/GymPlanr.git
cd GymPlanr
2. Install Dependencies
bash
Copy
Edit
npm install
3. Start the App
bash
Copy
Edit
npm run dev
The app will run at http://localhost:5173.

- 💾 Local Storage Integration
- The app uses Redux Toolkit to manage state and syncs it to localStorage. This ensures:
- Your workout plan persists between sessions
- No backend setup is needed to store user data
- Redux is connected to LocalStorage via a custom middleware setup in store.js.
- 📊 Reports & Visualization
- Weekly reports are displayed using a line chart (Recharts)
- A color-filled area appears below the line for visual clarity
- Rest days show 0 minutes on the chart
 ```
[![Meme](https://i.imgflip.com/9q8qrm.gif)](https://imgflip.com/gif/9q8qrm)



