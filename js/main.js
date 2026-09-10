(function () {
  "use strict";

  /* Sticky header shadow on scroll */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Mobile menu toggle */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".mobile-menu");
  if (toggle && menu) {
    var closeMenu = function () {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    var openMenu = function () {
      toggle.setAttribute("aria-expanded", "true");
      menu.classList.add("is-open");
      document.body.style.overflow = "hidden";
      var firstLink = menu.querySelector("a");
      if (firstLink) firstLink.focus();
    };
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* Scroll-reveal for elements marked .reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Contact form: static-friendly submit handling (Formspree-style endpoint) */
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    form.addEventListener("submit", function (e) {
      var action = form.getAttribute("action") || "";
      if (action.indexOf("YOUR_FORM_ID") !== -1) {
        e.preventDefault();
        if (status) {
          status.textContent =
            "Booking note: this form isn't connected to a live inbox yet - swap the Formspree endpoint in contact.html before going live.";
          status.className = "form-status is-visible error";
        }
        return;
      }
      /* Progressive enhancement: let Formspree's AJAX endpoint handle it without a page reload */
      if (window.fetch) {
        e.preventDefault();
        var data = new FormData(form);
        fetch(action, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (response) {
            if (response.ok) {
              form.reset();
              if (status) {
                status.textContent = "Thank you - your message has been sent. Hayley will be in touch soon.";
                status.className = "form-status is-visible success";
              }
            } else {
              throw new Error("Network response was not ok");
            }
          })
          .catch(function () {
            if (status) {
              status.textContent = "Something went wrong sending your message. Please try again, or call/email directly.";
              status.className = "form-status is-visible error";
            }
          });
      }
    });
  }

  /* Calendify embed: friendly fallback if the placeholder hasn't been swapped yet */
  var calendifyEl = document.querySelector("[data-calendify]");
  if (calendifyEl) {
    var value = calendifyEl.getAttribute("data-calendify") || "";
    if (value.indexOf("YOUR_CALENDIFY_USERNAME") !== -1) {
      var fallback = document.createElement("div");
      fallback.className = "booking-fallback";
      fallback.innerHTML =
        "Online booking will appear here once the Calendify account is connected.<br>" +
        "(Swap <code>data-calendify=\"" + value + "\"</code> in contact.html with your real username/event slug.)";
      calendifyEl.replaceWith(fallback);
    }
  }
})();
