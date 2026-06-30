# Wordle-Custom
This is just a simple project to help refine my web dev skills, its a custom world
<br>
A clean, lightweight, custom Wordle game built using HTML, CSS, and Vanilla JavaScript. 

##  How to Run Locally

Because the game fetches the secret word from a separate text file (`today.txt`) using JavaScript `fetch()`, opening the `index.html` file directly in your browser will trigger a CORS error. You need to run it via a local development server.

### Option 1: VS Code Live Server (Easiest)
1. Open this project folder in **VS Code**.
2. Install the **Live Server** extension if you haven't already.
3. Click the **"Go Live"** button in the bottom-right corner of VS Code.

### Option 2: Python Command Line
If you have Python installed, open your terminal inside the project directory and run:
```bash
python -m http.server 8000
