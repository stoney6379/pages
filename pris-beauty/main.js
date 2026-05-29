const { siteContent } = window;

const bindLinks = () => {
  const { contact } = siteContent;
  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappPrefill)}`;

  document.querySelectorAll('[data-slot="primary-wa"]').forEach((node) => {
    node.href = whatsappUrl;
    node.target = "_blank";
    node.rel = "noreferrer";
  });

  document.querySelectorAll('[data-slot="phone-link"]').forEach((node) => {
    node.href = `tel:${contact.phoneDisplay}`;
  });

  document.getElementById("address-line").textContent = contact.address;
  document.getElementById("hours-line").textContent = contact.hours;

  const emailLink = document.getElementById("email-link");
  emailLink.textContent = contact.email;
  emailLink.href = `mailto:${contact.email}`;

  const mapLink = document.getElementById("map-link");
  mapLink.href = contact.mapUrl;
};

const renderFaq = () => {
  const faqList = document.getElementById("faq-list");

  siteContent.faq.forEach((item, index) => {
    const wrapper = document.createElement("article");
    wrapper.className = "faq-item";

    const button = document.createElement("button");
    button.className = "faq-question";
    button.type = "button";
    button.setAttribute("aria-expanded", index === 0 ? "true" : "false");

    const title = document.createElement("strong");
    title.textContent = item.question;

    const icon = document.createElement("span");
    icon.textContent = index === 0 ? "−" : "+";

    button.append(title, icon);

    const answer = document.createElement("p");
    answer.className = "faq-answer";
    answer.textContent = item.answer;
    if (index !== 0) answer.hidden = true;

    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      icon.textContent = expanded ? "+" : "−";
      answer.hidden = expanded;
    });

    wrapper.append(button, answer);
    faqList.append(wrapper);
  });
};

const revealOnScroll = () => {
  const nodes = document.querySelectorAll(".section, .topbar, .sticky-cta");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  nodes.forEach((node) => observer.observe(node));
};

bindLinks();
renderFaq();
revealOnScroll();
