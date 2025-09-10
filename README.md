# Prime Numbers Assignment



> **A beautiful 3D animated React application that visualizes and solves 7 prime number problems with real-time Python execution and a stunning interface.**

***

## 🚀 Features

- **3D animated landing page** with mathematical particle effects
- **Interactive question selection as a card** (7 questions corresponding to attached Python files)
- **Live terminal output** running your Python code in the backend
- **Tabbed interface**: Question, Solution (terminal), Hint & code viewer
- **Progress tracker** and visual completion effects
- **Thank you/celebration page** after completion
- **Modern responsive UI:** Glassmorphism, gradients, parallax, custom fonts, smooth transitions
- **Team information card** on landing page

***


## ✨ Demo

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

***

## 📦 Installation & Usage

### Prerequisites

- Node.js (16+ recommended)
- Python (3.8+ recommended; with `gmpy2` and `sympy`)
- npm (usually comes with node)

### One-shot Setup

```sh
# 1. Clone/download this repo & unzip if needed
git clone https://github.com/YOURUSERNAME/prime-numbers-assignment.git
cd prime-numbers-assignment

# 2. Run the setup script (on Mac/Linux or Git Bash/WSL for Windows)
chmod +x setup.sh
./setup.sh

# 3. Start backend (Terminal 1)
cd backend
npm start

# 4. Start frontend (Terminal 2)
cd frontend
npm start

# 5. Visit http://localhost:3000 in your browser!
```

### Manual Setup (If setup.sh doesn't run)

```sh
cd backend
npm install
cd ../frontend
npm install

# Python dependencies (optional, for backend code execution)
pip install gmpy2 sympy
```

***

## 📝 How To Add/Adjust Questions & Python Files

- Python backend scripts are in `backend/python_scripts`
- Each question maps to one file:
  - Q1: 1_t.py
  - Q2: 2.py
  - ...
- For hints, edit `frontend/src/questionData.js` or the frontend components.

***

## 👥 Team

```
Presented By:
- Malhar Kanhegaonkar — ES24BTECH11018
- Kripalu Sonar — ES24BTECH11021
- Taleem Hossain — ES24BTECH11036
```

***

## 🛠️ Technologies Used

- **Frontend**: React, CSS3
- **Backend**: Node.js, Python3
- **Animations**: Parallax, custom particle system, framer-motion , Stunning Mathematics inspired Background

***

## 🤝 Contributions

Contributions, issue reports, and suggestions are welcome!  
Create a Pull Request or open an Issue to discuss changes.

***



## 💡 Credits & Inspiration

Built for IIT Hyderabad Prime Numbers Assignment for Numerical Methods (CH2120) course.

***


[7](https://stackoverflow.com/questions/71193194/github-pages-only-showing-readme-file-in-react-app)
[8](https://www.makeareadme.com)
[9](https://github.com/topics/react-project)
