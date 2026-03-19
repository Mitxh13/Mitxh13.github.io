if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}
// 1. SCROLL ANIMATION (Intersection Observer)
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
    const email = "kmitesh2006@gmail.com"; // my mail is here
    
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

// --- RESUME DOWNLOAD FUNCTION ---
// function resumeDownload() {
//     const resumePath = 'Mitesh_Resume.pdf'; 
//     const fallbackText = "Failed to fetch document"; // temp text till u update resume

//     // 1. Try to fetch the file headers to see if it exists
//     // fetch(resumePath, { method: 'HEAD' })
//     //     .then(response => {
//     //         if (response.ok) {
//     //             // 2. If file exists, create a hidden link and trigger the download
//     //             const link = document.createElement('a');
//     //             link.href = resumePath;
//     //             link.download = 'Mitesh_Resume.pdf'; // Name the file will save as
//     //             document.body.appendChild(link);
//     //             link.click();
//     //             document.body.removeChild(link);
//     //         } else {
//     //             // 3. If file is not found (404), throw an error to trigger the catch block
//     //             throw new Error('File not found');
//     //         }
//     //     })
//     //     .catch(err => {
//     //         // 4. If fetch fails (or file not found), show the toast notification
//     //         console.error('Failed to fetch: ', err);
            
//     //         const toast = document.getElementById("email-toast");
//     //         toast.innerText = fallbackText; // Set text dynamically
//     //         toast.classList.add("show-toast");

//     //         // Hide after 3 seconds
//     //         setTimeout(() => {
//     //             toast.classList.remove("show-toast");
//     //         }, 3000);
//     //     }
//     // );
//     const toast = document.getElementById("email-toast");
//     toast.innerText = fallbackText; // Set text dynamically
//     toast.classList.add("show-toast");

//     // Hide after 3 seconds
//     setTimeout(() => {
//         toast.classList.remove("show-toast");
//     }, 3000);
// }


const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;

// --- VIEW MORE PROJECTS LOGIC ---
const viewMoreBtn = document.getElementById('viewMoreBtn');
const extraProjects = document.querySelectorAll('.extra-project');
const viewMoreText = document.getElementById('viewMoreText');

if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
        viewMoreBtn.classList.toggle('expanded');
        
        if (viewMoreBtn.classList.contains('expanded')) {
            // SHOW extra projects
            extraProjects.forEach(proj => {
                proj.classList.add('is-visible'); // Makes it display: block
                
                // Slight delay so the browser registers the display change before animating
                setTimeout(() => {
                    proj.classList.add('show');
                }, 50);
            });
            viewMoreText.innerText = 'Show Less';
        } else {
            // HIDE extra projects
            extraProjects.forEach(proj => {
                proj.classList.remove('show'); // Fades it out
                
                // Wait for the CSS fade out animation to finish before removing it from the layout
                setTimeout(() => {
                    proj.classList.remove('is-visible');
                }, 500); 
            });
            viewMoreText.innerText = 'View More';
            
            // Scroll back up smoothly so the user isn't left at the bottom of the page
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}