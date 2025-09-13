let noClickCount = 0;

function showModal() {
    document.getElementById('modal').style.display = 'block';
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

function handleYes() {
    closeModal();
    
    // Create hearts with responsive positioning
    const heartCount = window.innerWidth < 768 ? 10 : 20;
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 100);
    }
    
    // Create confetti with responsive amount
    const confettiCount = window.innerWidth < 768 ? 15 : 30;
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 50);
    }
    
    // Show success message
    setTimeout(() => {
        showMessage("You Made My Day! 💕", "The bouquet is yours! Thank you!");
    }, 500);
}

function handleNo() {
    noClickCount++;
    
    if (noClickCount === 1) {
        // Make button run away
        const noBtn = document.getElementById('noBtn');
        noBtn.classList.add('run-away');
        setTimeout(() => {
            noBtn.classList.remove('run-away');
        }, 500);
        
        // Create sad faces with responsive amount
        const faceCount = window.innerWidth < 768 ? 3 : 5;
        for (let i = 0; i < faceCount; i++) {
            setTimeout(() => {
                createSadFace();
            }, i * 200);
        }
        
        // Change button text
        noBtn.textContent = "Really? 🥺";
        
    } else if (noClickCount === 2) {
        const noBtn = document.getElementById('noBtn');
        noBtn.textContent = "Pretty please? 🙏";
        noBtn.style.transform = "scale(0.9)";
        
    } else if (noClickCount >= 3) {
        // Give up and accept anyway
        closeModal();
        
        // Still create hearts but fewer
        const heartCount = window.innerWidth < 768 ? 5 : 10;
        for (let i = 0; i < heartCount; i++) {
            setTimeout(() => {
                createHeart();
            }, i * 150);
        }
        
        setTimeout(() => {
            showMessage("You're Getting It Anyway! 😄", "These flowers are too beautiful not to be yours! No returns accepted!");
        }, 500);
    }
}

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    
    // Random position across viewport width
    const xPos = Math.random() * (window.innerWidth - 30);
    heart.style.left = xPos + 'px';
    heart.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

function createConfetti() {
    const colors = ['#ff6b9d', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Random position across viewport width
    const xPos = Math.random() * (window.innerWidth - 10);
    confetti.style.left = xPos + 'px';
    confetti.style.top = '-10px';
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 3000);
}

function createSadFace() {
    const faces = ['😢', '😭', '💔', '😔', '🥺'];
    const face = document.createElement('div');
    face.className = 'sad-face';
    face.innerHTML = faces[Math.floor(Math.random() * faces.length)];
    
    // Responsive positioning
    const maxX = window.innerWidth - 50;
    const maxY = window.innerHeight - 50;
    face.style.left = Math.random() * maxX + 'px';
    face.style.top = Math.random() * maxY + 'px';
    
    document.body.appendChild(face);
    
    setTimeout(() => {
        face.remove();
    }, 2000);
}

function showMessage(title, text) {
    const messageDisplay = document.getElementById('messageDisplay');
    messageDisplay.innerHTML = `
        <h2>${title}</h2>
        <p>${text}</p>
    `;
    messageDisplay.style.display = 'block';
    
    // Hide message and reset
    setTimeout(() => {
        messageDisplay.style.display = 'none';
        noClickCount = 0; // Reset counter
        document.body.style.overflow = 'auto'; // Restore scroll
    }, 4000);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal();
    }
}

// Handle escape key to close modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('modal');
        if (modal.style.display === 'block') {
            closeModal();
        }
    }
});

// Prevent touch scrolling when modal is open on mobile
document.addEventListener('touchmove', function(e) {
    const modal = document.getElementById('modal');
    if (modal.style.display === 'block') {
        e.preventDefault();
    }
}, { passive: false });