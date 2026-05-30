const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = [...document.querySelectorAll(".main-nav a")];
const principleButtons = [...document.querySelectorAll("[data-principle]")];
const principleDetail = document.querySelector("[data-principle-detail]");
const form = document.querySelector("[data-form]");
const formNote = document.querySelector("[data-form-note]");

const principleCopy = {
  nature: {
    title: "道法自然",
    body:
      "“自然”强调万物自有其生长秩序。游学中会把这一思想放到山水、节令、宫观格局与日常礼仪里观察，理解它如何影响修身、处世与审美。",
  },
  quiet: {
    title: "清静无为",
    body:
      "“无为”不是消极不做，而是减少过度干预和急躁妄动。课程会用晨读、静坐与观察记录，让参与者体会安静、节制与判断力的关系。",
  },
  virtue: {
    title: "尊道贵德",
    body:
      "“道”提供根本秩序，“德”体现为人的修养和行动。游学会讨论道教伦理中的谦下、诚信、慈俭、敬畏与日常责任。",
  },
  life: {
    title: "贵生济世",
    body:
      "道教传统重视生命、身心调养与社会关怀。相关内容会从养生观、护生观、地方公益与民间信仰的实际功能展开。",
  },
};

function setHeaderState() {
  header.classList.toggle("scrolled", window.scrollY > 12);
}

function closeMenu() {
  header.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

principleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.principle;
    const content = principleCopy[key];

    principleButtons.forEach((item) => item.classList.toggle("active", item === button));
    principleDetail.innerHTML = `
      <p class="detail-kicker">核心教旨</p>
      <h3>${content.title}</h3>
      <p>${content.body}</p>
    `;
  });
});

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 },
);

sections.forEach((section) => observer.observe(section));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name") || "您";

  formNote.textContent = `${name}，咨询信息已记录在当前页面示例中。正式上线时可接入表单、CRM 或微信客服。`;
  formNote.classList.add("success");
  form.reset();
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();
