// Mobile navigation
const mobileMenuButton = document.getElementById("mobile-menu-button");
const navigationMenu = document.getElementById("nav-links");

if (mobileMenuButton && navigationMenu) {
    function closeMobileMenu() {
        navigationMenu.classList.remove("active");
        mobileMenuButton.setAttribute("aria-expanded", "false");
        mobileMenuButton.setAttribute("aria-label", "Open navigation menu");
        mobileMenuButton.innerHTML = '<i class="fa-solid fa-bars text-xl" aria-hidden="true"></i>';
    }

    mobileMenuButton.addEventListener("click", function () {
        const isOpen = navigationMenu.classList.toggle("active");
        mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
        mobileMenuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        mobileMenuButton.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark text-xl" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-bars text-xl" aria-hidden="true"></i>';
    });

    navigationMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeMobileMenu();
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 1024) closeMobileMenu();
    });
}

//////////////////////////////////////////

// Active navigation links
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const navSections = navLinks
    .map(function (link) {
        return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

function updateActiveNavLink() {
    const activePosition = window.scrollY + 120;
    let activeSection = navSections[0];

    navSections.forEach(function (section) {
        if (section.offsetTop <= activePosition) activeSection = section;
    });

    navLinks.forEach(function (link) {
        const isActive = link.getAttribute("href") === `#${activeSection.id}`;
        link.classList.toggle("active", isActive);
        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

window.addEventListener("scroll", updateActiveNavLink, { passive: true });
window.addEventListener("load", updateActiveNavLink);
updateActiveNavLink();

//////////////////////////////////////////

// Theme button
const html = document.documentElement;
const themeBtn = document.getElementById("theme-toggle-button");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark" || savedTheme === "light") {
    html.classList.toggle("dark", savedTheme === "dark");
}

function updateThemeButton() {
    themeBtn.setAttribute("aria-pressed", String(html.classList.contains("dark")));
}

updateThemeButton();
themeBtn.addEventListener("click", function () {
    html.classList.toggle("dark");
    const isDark = html.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeButton();
    if (typeof savedThemeColors !== "undefined") applyTheme(savedThemeColors);
});
//////////////////////////////////////////

// Portfolio filters
const portfolioFilterButtons = document.querySelectorAll(".portfolio-filter");
const portfolioItems = document.querySelectorAll(".portfolio-item");
const activeFilterClasses = [
    "active",
    "bg-linear-to-r",
    "from-primary",
    "to-secondary",
    "text-white",
    "hover:shadow-lg",
    "hover:shadow-primary/50"
];
const inactiveFilterClasses = [
    "bg-white",
    "dark:bg-slate-800",
    "text-slate-600",
    "dark:text-slate-300",
    "hover:bg-slate-100",
    "dark:hover:bg-slate-700",
    "border",
    "border-slate-300",
    "dark:border-slate-700"
];

function setActivePortfolioFilter(activeButton) {
    portfolioFilterButtons.forEach(function (button) {
        const isActive = button === activeButton;
        button.classList.remove(...activeFilterClasses, ...inactiveFilterClasses);
        button.classList.add(...(isActive ? activeFilterClasses : inactiveFilterClasses));
        button.setAttribute("aria-pressed", String(isActive));
    });
}

portfolioFilterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        setActivePortfolioFilter(button);

        portfolioItems.forEach(function (item) {
            const isVisible =
                button.dataset.filter === "all" ||
                button.dataset.filter === item.dataset.category;

            if (isVisible) {
                item.classList.remove("hidden");
                item.style.opacity = "0";
                item.style.transform = "scale(0.95)";
                requestAnimationFrame(function () {
                    item.style.opacity = "1";
                    item.style.transform = "scale(1)";
                });
            } else {
                item.style.opacity = "0";
                item.style.transform = "scale(0.95)";
                item.classList.add("hidden");
            }
        });
    });
});

//////////////////////////////////////////

// Testimonials carousel
const testimonialsCarousel = document.getElementById("testimonials-carousel");
const testimonialCards = testimonialsCarousel
    ? Array.from(testimonialsCarousel.querySelectorAll(".testimonial-card"))
    : [];
const testimonialIndicatorGroup = document.querySelector('[aria-label="Project indicators"]');
const nextTestimonialButton = document.getElementById("next-testimonial");
const previousTestimonialButton = document.getElementById("prev-testimonial");
let testimonialIndex = 0;
let visibleTestimonialCount = 1;
let testimonialIndicators = [];

function getVisibleTestimonialCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
}

function renderTestimonialIndicators() {
    if (!testimonialIndicatorGroup || !testimonialCards.length) return;

    const indicatorCount = Math.max(
        1,
        testimonialCards.length - visibleTestimonialCount + 1
    );
    testimonialIndicatorGroup.replaceChildren();

    for (let index = 0; index < indicatorCount; index += 1) {
        const indicator = document.createElement("button");
        indicator.type = "button";
        indicator.className = "carousel-indicator w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 cursor-pointer";
        indicator.dataset.index = String(index);
        indicator.setAttribute("role", "tab");
        indicator.setAttribute("aria-label", `Project ${index + 1}`);
        indicator.addEventListener("click", function () {
            testimonialIndex = index;
            updateTestimonialsCarousel();
        });
        testimonialIndicatorGroup.appendChild(indicator);
    }

    testimonialIndicators = Array.from(
        testimonialIndicatorGroup.querySelectorAll(".carousel-indicator")
    );
}

function updateTestimonialsCarousel() {
    if (!testimonialsCarousel || !testimonialCards.length) return;

    const lastIndex = Math.max(0, testimonialCards.length - visibleTestimonialCount);
    testimonialIndex = Math.min(testimonialIndex, lastIndex);
    testimonialsCarousel.style.transform =
        `translateX(${testimonialIndex * (100 / visibleTestimonialCount)}%)`;

    testimonialIndicators.forEach(function (indicator, index) {
        const isActive = index === testimonialIndex;
        indicator.classList.toggle("scale-125", isActive);
        indicator.classList.toggle("bg-accent", isActive);
        indicator.classList.toggle("bg-slate-400", !isActive);
        indicator.classList.toggle("dark:bg-slate-600", !isActive);
        indicator.setAttribute("aria-selected", String(isActive));
        indicator.setAttribute("tabindex", isActive ? "0" : "-1");
    });
}

function refreshTestimonialsCarousel() {
    visibleTestimonialCount = getVisibleTestimonialCount();
    renderTestimonialIndicators();
    updateTestimonialsCarousel();
}

if (testimonialsCarousel && testimonialCards.length) {
    if (nextTestimonialButton) {
        nextTestimonialButton.addEventListener("click", function () {
            const lastIndex = Math.max(0, testimonialCards.length - visibleTestimonialCount);
            testimonialIndex = testimonialIndex >= lastIndex ? 0 : testimonialIndex + 1;
            updateTestimonialsCarousel();
        });
    }

    if (previousTestimonialButton) {
        previousTestimonialButton.addEventListener("click", function () {
            const lastIndex = Math.max(0, testimonialCards.length - visibleTestimonialCount);
            testimonialIndex = testimonialIndex <= 0 ? lastIndex : testimonialIndex - 1;
            updateTestimonialsCarousel();
        });
    }

    window.addEventListener("resize", refreshTestimonialsCarousel);
    refreshTestimonialsCarousel();
}

// settings sidebar
const body = document.querySelector("body");
const settingsToggle = document.getElementById("settings-toggle");
const settingsSidebar = document.getElementById("settings-sidebar");
const closeSettings = document.getElementById("close-settings");

function setSettingsOpen(isOpen) {
    settingsSidebar.classList.toggle("translate-x-full", !isOpen);
    settingsToggle.style.right = isOpen ? "20rem" : "0";
    settingsToggle.setAttribute("aria-expanded", String(isOpen));
    settingsSidebar.setAttribute("aria-hidden", String(!isOpen));

    if (isOpen) {
        closeSettings.focus();
    } else {
        settingsToggle.focus();
    }
}

settingsToggle.addEventListener("click", function () {
    const isOpen = settingsToggle.getAttribute("aria-expanded") !== "true";
    setSettingsOpen(isOpen);
});

closeSettings.addEventListener("click", function () {
    setSettingsOpen(false);
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && settingsToggle.getAttribute("aria-expanded") === "true") {
        setSettingsOpen(false);
    }
});

const fontOption = document.querySelectorAll(".font-option");
const availableFonts = ["alexandria", "tajawal", "cairo"];

function applyFont(fontName) {
    if (!availableFonts.includes(fontName)) return;

    body.classList.remove("font-alexandria", "font-tajawal", "font-cairo");
    body.classList.add(`font-${fontName}`);
    fontOption.forEach(function (btn) {
        const isActive = btn.dataset.font === fontName;
        btn.classList.remove(
            "active",
            "border-primary",
            "bg-slate-50",
            "dark:bg-slate-800"
        );
        btn.setAttribute("aria-checked", String(isActive));
        if (isActive) {
            btn.classList.add(
                "active",
                "border-primary",
                "bg-slate-50",
                "dark:bg-slate-800"
            );
        }
    });
    localStorage.setItem("font", fontName);
}

fontOption.forEach(function (btn) {
    btn.addEventListener("click", function () {
        applyFont(btn.dataset.font);
    });
});

let savedFont = localStorage.getItem("font");
applyFont(availableFonts.includes(savedFont) ? savedFont : "alexandria");

//////////////////////////////////////////

// Theme Colors
const themeColorsGrid = document.getElementById("theme-colors-grid");
const themes = [
    {
        name: "Slate & Blue",
        primary: "#315b7d", secondary: "#477a99", accent: "#627f75",
        darkPrimary: "#9fbcd1", darkSecondary: "#bad0df", darkAccent: "#b8c9c0"
    },
    {
        name: "Deep Navy",
        primary: "#2c485d", secondary: "#3e6c85", accent: "#6b8173",
        darkPrimary: "#a2bdcf", darkSecondary: "#bdd1de", darkAccent: "#bdcbc1"
    },
    {
        name: "Steel Blue",
        primary: "#405c77", secondary: "#5b778b", accent: "#70867a",
        darkPrimary: "#b1c2d4", darkSecondary: "#c2d0dc", darkAccent: "#c1cec6"
    },
    {
        name: "Ocean Slate",
        primary: "#34495e", secondary: "#406d82", accent: "#647d70",
        darkPrimary: "#afc2d1", darkSecondary: "#bdd1d8", darkAccent: "#bacbc1"
    }
];

function applyTheme(theme) {
    const isDarkMode = document.documentElement.classList.contains("dark");
    document.documentElement.style.setProperty("--color-primary", isDarkMode ? theme.darkPrimary : theme.primary);
    document.documentElement.style.setProperty("--color-secondary", isDarkMode ? theme.darkSecondary : theme.secondary);
    document.documentElement.style.setProperty("--color-accent", isDarkMode ? theme.darkAccent : theme.accent);
    const themeButtons = themeColorsGrid.querySelectorAll("button");
    themeButtons.forEach(function (btn) {
        const isActive =
            btn.dataset.primary === theme.primary &&
            btn.dataset.secondary === theme.secondary &&
            btn.dataset.accent === theme.accent;
        btn.classList.remove(
            "ring-2",
            "ring-primary",
            "ring-offset-2",
            "ring-offset-white",
            "dark:ring-offset-slate-900"
        );
        btn.setAttribute("aria-pressed", String(isActive));
        if (isActive) {
            btn.classList.add(
                "ring-2",
                "ring-primary",
                "ring-offset-2",
                "ring-offset-white",
                "dark:ring-offset-slate-900"
            );
        }
    });
    localStorage.setItem("themeColors", JSON.stringify(theme));
}

themes.forEach(function (theme) {
    const button = document.createElement("button");
    button.className =
        "w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700";
    button.style.background = theme.primary;
    button.dataset.primary = theme.primary;
    button.dataset.secondary = theme.secondary;
    button.dataset.accent = theme.accent;
    button.title = theme.name;
    button.setAttribute("aria-label", theme.name);
    button.setAttribute("aria-pressed", "false");
    button.type = "button";
    button.addEventListener("click", function () {
        applyTheme(theme);
    });
    themeColorsGrid.appendChild(button);
});

let savedThemeColors = themes[0];
const storedThemeColors = localStorage.getItem("themeColors");
if (storedThemeColors) {
    try {
        const parsedTheme = JSON.parse(storedThemeColors);
        savedThemeColors =
            themes.find(function (theme) {
                return (
                    theme.primary === parsedTheme.primary &&
                    theme.secondary === parsedTheme.secondary &&
                    theme.accent === parsedTheme.accent
                );
            }) || themes[0];
    } catch (error) {
        console.error("Could not restore saved theme colors.", error);
        localStorage.removeItem("themeColors");
    }
}
applyTheme(savedThemeColors);

//////////////////////////////////////////
// Reset Settings

const resetSettings = document.getElementById("reset-settings");
resetSettings.addEventListener("click", function () {
    localStorage.removeItem("font");
    localStorage.removeItem("themeColors");
    applyFont("alexandria");
    applyTheme(themes[0]);
});

// scroll to Top Button

const scrollToTop = document.getElementById("scroll-to-top");
window.addEventListener("scroll", function () {
    if (window.scrollY >= 590) {
        scrollToTop.classList.remove("opacity-0", "invisible");
    } else {
        scrollToTop.classList.add("opacity-0", "invisible");
    }
});

scrollToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

// Accessible contact form submission
const contactForm = document.getElementById("contact-form");
const contactFormStatus = document.getElementById("contact-form-status");
const contactSuccess = document.getElementById("contact-success");
const sendAnotherButton = document.getElementById("contact-send-another");

if (contactForm && contactFormStatus && contactSuccess) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        if (!contactForm.reportValidity()) return;

        const submitButton = contactForm.querySelector('[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.setAttribute("aria-busy", "true");
        contactFormStatus.textContent = "Sending your message…";

        try {
            const formData = new FormData(contactForm);
            const submission = Object.fromEntries(formData.entries());
            submission._replyto = submission.email;

            const response = await fetch(contactForm.action, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(submission)
            });
            const result = await response.json();

            if (!response.ok || result.success === "false" || result.success === false) {
                throw new Error(result.message || "Message could not be sent.");
            }

            contactForm.reset();
            contactForm.hidden = true;
            contactSuccess.classList.remove("hidden");
            contactFormStatus.textContent = "";
        } catch (error) {
            contactFormStatus.textContent = "Sorry, your message could not be sent right now. Please email me directly at omarmustafa62dx@gmail.com.";
        } finally {
            submitButton.disabled = false;
            submitButton.removeAttribute("aria-busy");
            submitButton.innerHTML = originalButtonText;
        }
    });

    if (sendAnotherButton) {
        sendAnotherButton.addEventListener("click", function () {
            contactSuccess.classList.add("hidden");
            contactForm.hidden = false;
            contactFormStatus.textContent = "";
            contactForm.querySelector("input[name='name']").focus();
        });
    }
}
