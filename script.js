// State Management
let currentUser = JSON.parse(localStorage.getItem('loggedUser')) || null;
let projects = JSON.parse(localStorage.getItem('projects')) || [
    { id: 1, title: "Neural Engine", desc: "Advanced AI Physics", status: "Active" }
];
let applications = JSON.parse(localStorage.getItem('apps')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkUserRole();
    showPage('portfolio');
});

function checkUserRole() {
    const devTab = document.getElementById('devTab');
    const authBtn = document.getElementById('authBtn');
    
    if (currentUser) {
        authBtn.innerText = "Logout";
        authBtn.onclick = logout;
        if (currentUser.username.toLowerCase() === "avarin") {
            devTab.classList.remove('hidden');
        }
    } else {
        devTab.classList.add('hidden');
        authBtn.innerText = "Login";
        authBtn.onclick = openAuth;
    }
}

// Routing Engine
function showPage(page) {
    const container = document.getElementById('app-container');
    container.classList.remove('fade-in');
    void container.offsetWidth; // Trigger reflow
    container.classList.add('fade-in');

    if (page === 'portfolio') {
        renderPortfolio();
    } else if (page === 'hiring') {
        renderHiring();
    } else if (page === 'dashboard') {
        renderDashboard();
    }
}

function renderPortfolio() {
    const container = document.getElementById('app-container');
    let html = `<div class="grid">`;
    projects.forEach(p => {
        html += `
            <div class="card">
                <span class="status-tag">${p.status}</span>
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
            </div>
        `;
    });
    html += `</div>`;
    container.innerHTML = html;
}

function renderHiring() {
    const container = document.getElementById('app-container');
    container.innerHTML = `
        <div style="max-width: 600px; margin: 120px auto;" class="card">
            <h2>Join the Studio</h2>
            <input type="text" id="appName" placeholder="Your Name">
            <input type="text" id="appRole" placeholder="Role (e.g. Scripter)">
            <textarea id="appExp" placeholder="Experience details..."></textarea>
            <button class="primary-btn" onclick="submitApplication()">Send Application</button>
        </div>
    `;
}

function renderDashboard() {
    if (!currentUser || currentUser.username.toLowerCase() !== "avarin") return showPage('portfolio');
    
    const container = document.getElementById('app-container');
    container.innerHTML = `
        <div class="grid">
            <div class="card">
                <h3>Manage Projects</h3>
                <button onclick="addProject()">+ Add New Project</button>
            </div>
            <div class="card">
                <h3>Hiring Requests (${applications.length})</h3>
                <div id="app-list"></div>
            </div>
        </div>
    `;
}

// Logic Helpers
function handleAuth() {
    const user = document.getElementById('username').value;
    if (user) {
        currentUser = { username: user };
        localStorage.setItem('loggedUser', JSON.stringify(currentUser));
        closeAuth();
        checkUserRole();
        showPage('portfolio');
    }
}

function logout() {
    localStorage.removeItem('loggedUser');
    currentUser = null;
    location.reload();
}

function openAuth() { document.getElementById('authModal').classList.remove('hidden'); }
function closeAuth() { document.getElementById('authModal').classList.add('hidden'); }
