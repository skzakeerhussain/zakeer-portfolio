"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("main section[id]")];
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (menuToggle && navMenu) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navMenu.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) closeMenu();
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-30% 0px -60% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

const typedText = document.querySelector(".typed-text");
if (typedText && !prefersReducedMotion) {
  const phrases = ["beautiful digital experiences", "interfaces that feel effortless", "ideas people love to use"];
  let phraseIndex = 0;
  let characterIndex = phrases[0].length;
  let deleting = true;

  const type = () => {
    const phrase = phrases[phraseIndex];
    if (deleting) {
      characterIndex -= 1;
      typedText.textContent = phrase.slice(0, characterIndex);
      if (characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        window.setTimeout(type, 400);
        return;
      }
    } else {
      characterIndex += 1;
      typedText.textContent = phrases[phraseIndex].slice(0, characterIndex);
      if (characterIndex === phrases[phraseIndex].length) {
        deleting = true;
        window.setTimeout(type, 1900);
        return;
      }
    }
    window.setTimeout(type, deleting ? 34 : 54);
  };

  window.setTimeout(type, 2200);
}

document.querySelector("#current-year").textContent = String(new Date().getFullYear());

if (form) {
  const fields = [...form.querySelectorAll("input[required], textarea[required]")];
  fields.forEach((field) => {
    field.addEventListener("input", () => field.removeAttribute("aria-invalid"));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const invalidField = fields.find((field) => !field.checkValidity());
    if (invalidField) {
      fields.forEach((field) => {
        if (!field.checkValidity()) field.setAttribute("aria-invalid", "true");
      });
      formStatus.textContent = "Please enter a valid name, email address, and message (at least 10 characters).";
      formStatus.className = "form-note is-error";
      invalidField.focus();
      return;
    }

    formStatus.textContent = "Looks good! This demo does not send messages. Connect an email service or backend to receive submissions.";
    formStatus.className = "form-note is-success";
  });
}
