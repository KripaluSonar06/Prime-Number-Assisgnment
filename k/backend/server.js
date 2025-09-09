const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to execute Python scripts
app.post('/api/execute/:questionId', (req, res) => {
    const { questionId } = req.params;
    const { inputs } = req.body;

    console.log(`Received request for question ${questionId} with inputs:`, inputs);

    // Map question IDs to Python files
    const scriptMap = {
        '1': '1_t.py',
        '2': '2.py',
        '3': '3.py',
        '4': '4.py',
        '5': '5.py',
        '6': '6.py',
        '7a': '7a.py',
        '7b': '7b.py',
        '7c': '7c.py',
        '7d': '7d.py',
        '7e': '7e.py',
        '7f': '7f.py'
    };

    const scriptName = scriptMap[questionId];
    if (!scriptName) {
        return res.status(400).json({ error: 'Invalid question ID' });
    }

    const scriptPath = path.join(__dirname, 'python_scripts', scriptName);

    // Set up streaming response
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Transfer-Encoding': 'chunked',
        'Access-Control-Allow-Origin': '*'
    });

    console.log(`Executing: python3 ${scriptPath}`);

    const pythonProcess = spawn('python3', [scriptPath], {
        stdio: ['pipe', 'pipe', 'pipe']
    });

    // Send inputs to Python script
    if (inputs) {
        Object.values(inputs).forEach(input => {
            if (input !== null && input !== undefined && input !== '') {
                pythonProcess.stdin.write(input.toString() + '\n');
            }
        });
    }
    pythonProcess.stdin.end();

    pythonProcess.stdout.on('data', (data) => {
        const output = data.toString();
        console.log('Python output:', output);
        res.write(output);
    });

    pythonProcess.stderr.on('data', (data) => {
        const error = data.toString();
        console.error('Python error:', error);
        res.write(`ERROR: ${error}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Process finished with code: ${code}`);
        res.write(`\n\n=== Process completed with exit code: ${code} ===\n`);
        res.end();
    });

    pythonProcess.on('error', (error) => {
        console.error('Execution error:', error);
        res.write(`\n\nExecution error: ${error.message}\n`);
        res.end();
    });
});

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'Backend server running successfully',
        timestamp: new Date().toISOString(),
        port: PORT
    });
});

// Get question list
app.get('/api/questions', (req, res) => {
    const questions = {
        1: { title: "Pattern Prime Numbers", description: "Find prime numbers following concatenation pattern" },
        2: { title: "Repunit Primes", description: "Find primes consisting only of 1's" },
        3: { title: "Mersenne Primes", description: "Find primes of form 2^p - 1" },
        4: { title: "Brocard's Conjecture", description: "Four primes between consecutive prime squares" },
        5: { title: "Palindromic Primes", description: "Find palindromic prime numbers" },
        6: { title: "Perfect Numbers", description: "Find perfect numbers using Mersenne primes" },
        7: { title: "Prime Conjectures", description: "Various famous prime conjectures" }
    };
    res.json(questions);
});

app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📋 Available endpoints:`);
    console.log(`   POST /api/execute/:questionId - Execute Python scripts`);
    console.log(`   GET  /api/health - Health check`);
    console.log(`   GET  /api/questions - Get questions list`);
});