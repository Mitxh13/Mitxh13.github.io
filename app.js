// Personal Dev + Social Site Data
const projects = [
  {
    title: "G-M8 Chat",
    desc: "A real-time chat app built with Node.js, Express, and Socket.io.",
    link: "https://github.com/Mitxh13/G-M8"
  },
  {
    title: "Sol I",
    desc:"AI-Powered Adaptive Operating System with Self-Learning Security",
    udev: "Under Development"
  },
];

const skills = [
  "Python", "C", "JavaScript", "React", "Node.js",
  "MongoDB", "Express.js", "Git"
];

const socials = [
  { name: "GitHub", link: "https://github.com/Mitxh13" },
  { name: "LinkedIn", link: "https://linkedin.com/in/mitesh-kurumeti" },
  { name: "X", link: "https://x.com/kmiteshh"},
];

// Render projects
const projectGrid = document.getElementById("projectGrid");
projects.forEach(p => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
  <h3>${p.title}</h3>
  <p>${p.desc}</p><br>
  ${
    p.apply
      ? `<a href="${p.apply}" target="_blank" class="btn" style="font-size:13px;">Apply</a>`
      : p.link
        ? `<a href="${p.link}" target="_blank" class="btn" style="font-size:13px;">View</a>`
        : p.udev
          ? `<a target="_blank" class="udev">${p.udev}</a>`
          : p.otherb
            ? `<a href="${p.otherb}" target="_blank" class="otherb" style="font-size:13px;">Test</a>`
            : ""
  }
`;
  projectGrid.appendChild(card);
});

// Render skills
const skillList = document.getElementById("skillList");
skills.forEach(s => {
  const el = document.createElement("div");
  el.className = "skill";
  el.textContent = s;
  skillList.appendChild(el);
});

// Render socials
const socialLinks = document.getElementById("socialLinks");
socials.forEach(s => {
  const a = document.createElement("a");
  a.href = s.link;
  a.textContent = s.name;
  a.target = "_blank";
  a.className = "social";
  socialLinks.appendChild(a);
});
