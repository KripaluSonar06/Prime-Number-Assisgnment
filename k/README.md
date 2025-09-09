# Prime Numbers Assignment - 3D Animated GUI

A stunning, professional 3D animated web application for exploring prime number problems and mathematical conjectures.

## 🌟 Features

- **Beautiful 3D Animations**: Mathematical particle systems and smooth transitions
- **Real-time Python Execution**: Stream output directly from your Python scripts
- **Professional UI**: Glassmorphism design with particle effects
- **7 Mathematical Problems**: From pattern primes to famous conjectures
- **Interactive Terminal**: Live output display with syntax highlighting
- **Responsive Design**: Works perfectly on all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ ([Download](https://nodejs.org/))
- Python 3.8+ with `gmpy2` and `sympy` packages
- Modern web browser

### Installation

1. **Clone/Download** this project
2. **Run the setup script** (easiest method):
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Start the servers**:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start

   # Terminal 2 - Frontend  
   cd frontend
   npm start
   ```

4. **Open your browser** to `http://localhost:3000`

## 📁 Project Structure

```
prime-numbers-assignment/
├── frontend/                 # React app with 3D animations
│   ├── src/components/      # React components
│   ├── src/styles/          # CSS stylesheets  
│   └── public/              # Static assets
├── backend/                 # Express.js API server
│   ├── python_scripts/      # Your Python solutions
│   └── server.js            # Main server file
├── README.md               # This file
└── setup.sh               # Automated setup script
```

## 🐍 Python Scripts

Your existing Python files are automatically integrated:

- **Q1** → `1_t.py` (Pattern prime numbers)
- **Q2** → `2.py` (Repunit primes) 
- **Q3** → `3.py` (Mersenne primes)
- **Q4** → `4.py` (Brocard's conjecture)
- **Q5** → `5.py` (Palindromic primes)
- **Q6** → `6.py` (Perfect numbers)
- **Q7a-f** → `7a.py through 7f.py` (Various conjectures)

## 🎨 Customization

### Colors & Themes
Edit CSS variables in `frontend/src/styles/App.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #64B5F6;
}
```

### Team Information
Update team member details in `frontend/src/components/LandingPage.js`

### Sound Effects
Uncomment audio placeholders and add your sound files to `frontend/public/sounds/`

## 🛠 Troubleshooting

### Backend Issues
- **Port 5000 in use**: Change port in `backend/server.js`
- **Python not found**: Ensure Python 3 is installed and accessible as `python3`
- **Module errors**: Install required packages with `pip install gmpy2 sympy`

### Frontend Issues  
- **Port 3000 in use**: React will automatically suggest port 3001
- **Build errors**: Delete `node_modules` and run `npm install` again
- **API connection failed**: Ensure backend is running on port 5000

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox  
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🎯 Assignment Questions

1. **Pattern Prime Numbers**: Find primes following concatenation pattern 12345...54321
2. **Repunit Primes**: Numbers consisting only of 1's (11, 111, 1111...)
3. **Mersenne Primes**: Primes of the form 2^p - 1
4. **Brocard's Conjecture**: Four primes between consecutive prime squares
5. **Palindromic Primes**: Primes that read the same forwards and backwards
6. **Perfect Numbers**: Numbers equal to sum of proper divisors
7. **Prime Conjectures**: Wieferich, Goldbach, Legendre, and Oppermann conjectures

## 🏆 Success Indicators

- 🎨 Smooth 3D animations and particle effects
- 📊 Real-time streaming output from Python scripts  
- 🔧 All 7 questions working with proper input validation
- 📱 Responsive design on desktop and mobile
- ⚡ Fast loading and smooth performance

## 📧 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure all prerequisites are installed
3. Verify both frontend and backend servers are running
4. Check browser console for error messages

## 🎉 Enjoy Your Mathematical Journey!

This GUI transforms your prime number assignments into an engaging, visual experience. The combination of mathematical rigor and beautiful design creates a perfect showcase for your computational work.

---

**Created with ❤️ for mathematical excellence**