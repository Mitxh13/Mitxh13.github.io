// 1. SCROLL ANIMATION (Intersection Observer)
// This creates that smooth "fade in up" look as you scroll down
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1 // Triggers when 10% of element is visible
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// 2. NETFLIX CAROUSEL LOGIC
function scrollCerts(direction) {
    const container = document.getElementById('certList');
    const scrollAmount = 400; // Adjust for scroll distance
    if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// 3. MODAL LOGIC
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');

function openModal(imgSrc, title) {
    modal.style.display = 'flex';
    modalImg.src = imgSrc;
    modalTitle.innerText = title;
    // Prevent background scrolling
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    modal.style.display = 'none';
    // Restore background scrolling
    document.body.style.overflow = 'auto'; 
}

// Close modal if clicking outside the content area
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// --- EMAIL COPY FUNCTION ---
function copyEmail() {
    const email = "kmitesh2006@gmail.com"; // CHANGE THIS TO YOUR ACTUAL EMAIL
    
    // Copy to clipboard
    navigator.clipboard.writeText(email).then(() => {
        // Show Toast Notification
        const toast = document.getElementById("email-toast");
        toast.innerText = `Email copied: ${email}`; // Set text dynamically
        toast.classList.add("show-toast");

        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove("show-toast");
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}