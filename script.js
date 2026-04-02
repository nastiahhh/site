const WEDDING_DATE = new Date("2026-06-20T13:30:00+03:00");

const EMAILJS_CONFIG = {
  publicKey: "PASTE_PUBLIC_KEY",
  serviceId: "PASTE_SERVICE_ID",
  templateId: "PASTE_TEMPLATE_ID",
  recipientEmail: "your-email@example.com"
};

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function pad(value) {
  return String(value).padStart(2, "0");
}
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  document.querySelectorAll(".hero-back").forEach(el => {
    el.style.transform = `translateY(${scrolled * 0.2}px)`;
  });
});
function updateCountdown() {
  const now = new Date();
  const diffMs = WEDDING_DATE - now;

  if (diffMs <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }
const elements = document.querySelectorAll(".fade-up");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

elements.forEach(el => observer.observe(el));
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

const form = document.getElementById("rsvp-form");
const statusEl = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

function formToPayload(formData) {
  const fullname = (formData.get("fullname") || "").toString().trim();
  const attendance = (formData.get("attendance") || "").toString();
  const drinks = formData.getAll("drinks");

  return {
    fullname,
    attendance,
    drinks: drinks.length ? drinks.join(", ") : "Не указано"
  };
}

function isEmailConfigured() {
  return (
    EMAILJS_CONFIG.publicKey !== "PASTE_PUBLIC_KEY" &&
    EMAILJS_CONFIG.serviceId !== "PASTE_SERVICE_ID" &&
    EMAILJS_CONFIG.templateId !== "PASTE_TEMPLATE_ID"
  );
}

emailjs.init("4sbLvzb43xlCyZi3a");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    fullname: form.fullname.value,
    attendance: form.attendance.value,
    drinks: Array.from(
      document.querySelectorAll('input[name="drinks"]:checked')
    ).map(el => el.value).join(", ")
  };

  emailjs.send(
    "service_2r6e4bt",
    "template_0drp1nb",
    formData
  )
  .then(() => {
    document.getElementById("form-status").innerText = "Анкета отправлена ❤️";
    form.reset();
  })
  .catch((error) => {
    document.getElementById("form-status").innerText = "Ошибка отправки ❌";
    console.log(error);
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const payload = formToPayload(formData);

  if (!payload.fullname || !payload.attendance) {
    statusEl.textContent = "Пожалуйста, заполните обязательные поля.";
    return;
  }

  submitBtn.disabled = true;

  try {
    if (!isEmailConfigured()) {
      const subject = encodeURIComponent("Новый ответ анкеты");
      const body = encodeURIComponent(
        `Имя и Фамилия: ${payload.fullname}\n` +
        `Присутствие: ${payload.attendance}\n` +
        `Напитки: ${payload.drinks}`
      );
    } else {
      emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
        fullname: payload.fullname,
        attendance: payload.attendance,
        drinks: payload.drinks
      });
      statusEl.textContent = "Спасибо! Ваш ответ отправлен.";
      form.reset();
    }
  } catch (error) {
    statusEl.textContent = "Не удалось отправить. Попробуйте еще раз.";
  } finally {
    submitBtn.disabled = false;
  }
  const site = document.getElementById('main-site');
const music = document.getElementById('bg-music');

screen.addEventListener('click', () => {
  envelope.classList.add('open');

  music.volume = 0.5;
  music.play().catch(err => {
    console.log("Audio blocked:", err);
  });

  setTimeout(() => {
    screen.style.opacity = '0';

    setTimeout(() => {
      screen.style.display = 'none';
      site.classList.remove('hidden');
    }, 800);

  }, 1000);
});
});
