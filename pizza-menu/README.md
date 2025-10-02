# 🍕 Pizza Menu (React + Vite)

This is a simple React project built while learning React (with Jonas on Udemy).  
It showcases a small pizza menu for **Fast React Pizza Co.**, where each pizza has a name, ingredients, price, image, and availability status.

## ✨ Features
- Displays a list of pizzas dynamically from a `pizzaData` array
- Shows pizza name, ingredients, price, and image
- Highlights pizzas that are **sold out**
- Conditional rendering for when the restaurant is open/closed
- Built with **React** + **Vite** + **CSS**

## 📂 Project Structure
```
pizza-menu/
├── src/
│ ├── App.jsx     # Main React component
│ ├── index.css   # Styles
│ └── main.jsx    # Entry point
├── public/
  └── pizzas/     # Pizza images
```

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install

2. **Run development server**
   ```bash
   npm run dev

📝 Notes

. Opening hours are set from 12:00 to 22:00.

. If the restaurant is closed, the footer displays a message instead of the order button.

. This is an educational project for practicing React fundamentals: components, props, lists & keys, conditional rendering.
