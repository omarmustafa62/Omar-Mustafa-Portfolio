//  active links
let heroSection = document.getElementById("hero-section")
let about = document.getElementById("about")
let portfolio = document.getElementById("portfolio")
let experience = document.getElementById("experience")
let testimonials = document.getElementById("testimonials")
let contact = document.getElementById("contact")
let navLinks = document.querySelectorAll(".nav-links a")

// console.log(heroSection.offsetTop)
// console.log(heroSection.offsetHeight)
// console.log(about.offsetTop)
// console.log(about.offsetHeight)
// console.log(portfolio.offsetTop)
// console.log(portfolio.offsetHeight)
// console.log(experience.offsetTop)
// console.log(experience.offsetHeight)
// console.log(experience.offsetTop)
// console.log(experience.offsetHeight)

window.addEventListener("scroll", function () {
    navLinks.forEach(function (link) {
        link.classList.remove("active")
    })
    if (window.scrollY >= heroSection.offsetTop && window.scrollY < about.offsetTop) {
        navLinks[0].classList.add("active")
    } else if (window.scrollY >= about.offsetTop && window.scrollY < portfolio.offsetTop) {
        navLinks[1].classList.add("active")
    } else if (window.scrollY >= portfolio.offsetTop && window.scrollY < experience.offsetTop) {
        navLinks[2].classList.add("active")
    } else if (window.scrollY >= experience.offsetTop && window.scrollY < testimonials.offsetTop) {
        navLinks[3].classList.add("active")
    } else if (window.scrollY >= testimonials.offsetTop && window.scrollY < contact.offsetTop) {
        navLinks[4].classList.add("active")
    } else {
        navLinks[5].classList.add("active")
    }
})

//////////////////////////////////////////

// Theme button
let html = document.documentElement;
let themeBtn = document.getElementById("theme-toggle-button");
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    html.classList.add("dark");
} else {
    html.classList.remove("dark");
}
themeBtn.addEventListener("click", function () {
    html.classList.toggle("dark");
    if (html.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});
//////////////////////////////////////////

// Nav And Taps
let portfolioFilters = document.getElementById("portfolio-filters")
let portfolioFilterBtn = document.querySelectorAll(".portfolio-filter")
let portfolioItem = document.querySelectorAll(".portfolio-item")
let portfolioGrid = document.getElementById("portfolio-grid")

portfolioFilterBtn.forEach(function (button) {
    button.addEventListener("click", function () {
        portfolioFilterBtn.forEach(function (btnActive) {
            btnActive.classList.remove("active")
            btnActive.setAttribute("aria-pressed", "false");
            btnActive.classList.remove("rounded-xl", "bg-linear-to-r", "from-primary", "to-secondary", "text-white", "font-bold", "transition-all", "duration-300", "hover:shadow-lg", "hover:shadow-primary/50")
            btnActive.classList.add("rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "font-bold", "transition-all", "duration-300", "hover:bg-slate-100", "dark:hover:bg-slate-700", "border", "border-slate-300", "dark:border-slate-700")
        });
        button.setAttribute("aria-pressed", "true");
        button.classList.remove(
            "bg-white",
            "dark:bg-slate-800",
            "text-slate-600",
            "dark:text-slate-300",
            "hover:bg-slate-100",
            "dark:hover:bg-slate-700",
            "border",
            "border-slate-300",
            "dark:border-slate-700"
        );
        button.classList.add(
            "bg-linear-to-r",
            "from-primary",
            "to-secondary",
            "text-white",
            "hover:shadow-lg",
            "hover:shadow-primary/50",
        );
        portfolioItem.forEach(function (card) {
            card.style.opacity = "0";
            card.style.transform = "scale(0.8)";
            if (button.dataset.filter == "all" || button.dataset.filter == card.dataset.category) {
                card.classList.remove("hidden")
                setTimeout(function () {
                    card.style.opacity = "1";
                    card.style.transform = "scale(1)";
                }, 300);
            } else {
                card.classList.add("hidden")
            }
        })
    })
});

//////////////////////////////////////////

// carousel
let nextTestimonial = document.getElementById("next-testimonial")
let prevTestimonial = document.getElementById("prev-testimonial")
let carouselIndicator = document.querySelectorAll(".carousel-indicator")
let testimonialCard = document.querySelectorAll(".testimonial-card")
let testimonialsCarousel = document.getElementById("testimonials-carousel")
let currentIndex = 0
const totalCards = testimonialCard.length;
const visibleCards = 3;
const maxIndex = totalCards - visibleCards;
const movePercentage = 100 / visibleCards;

prevTestimonial.addEventListener("click", function () {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = maxIndex;
    }
    testimonialsCarousel.style.transform =
        `translateX(${currentIndex * movePercentage}%)`;
    updateIndicators();
})

nextTestimonial.addEventListener("click", function () {
    currentIndex++;
    if (currentIndex > maxIndex) {
        currentIndex = 0;
    }
    testimonialsCarousel.style.transform =
        `translateX(${currentIndex * movePercentage}%)`;
    updateIndicators();
})


function updateIndicators() {
    carouselIndicator.forEach(function (indicator) {
        indicator.classList.add("bg-slate-400");
        indicator.classList.remove("bg-accent");
        indicator.classList.add("dark:bg-slate-600");
        indicator.setAttribute("aria-selected", "false");
        indicator.classList.remove("scale-125");
        if (Number(indicator.dataset.index) === currentIndex) {
            indicator.classList.remove("bg-slate-400");
            indicator.classList.add("bg-accent");
            indicator.classList.add("scale-125");
            indicator.classList.remove("dark:bg-slate-600");
            indicator.setAttribute("aria-selected", "true");
        }
    });
}

carouselIndicator.forEach(function (indicator) {
    indicator.addEventListener("click", function () {
        currentIndex = Number(indicator.dataset.index);
        testimonialsCarousel.style.transform =
            `translateX(${currentIndex * movePercentage}%)`;
        updateIndicators()
    })
})

// settings sidebar
let body = document.querySelector("body")
let settingsToggle = document.getElementById("settings-toggle")
let settingsSidebar = document.getElementById("settings-sidebar")
let closeSettings = document.getElementById("close-settings")

settingsToggle.addEventListener("click", function () {
    settingsSidebar.classList.remove("translate-x-full")
    settingsToggle.style.right = "20rem"
})

closeSettings.addEventListener("click", function () {
    settingsSidebar.classList.add("translate-x-full")
    settingsToggle.style.right = "0"
})

let fontOption = document.querySelectorAll(".font-option");

function applyFont(fontName) {

    body.classList.remove(
        "font-alexandria",
        "font-tajawal",
        "font-cairo"
    );
    body.classList.add(`font-${fontName}`);
    fontOption.forEach(function (btn) {
        btn.classList.remove(
            "active",
            "border-primary",
            "bg-slate-50",
            "dark:bg-slate-800"
        );
        btn.classList.add(
            "border-slate-200",
            "dark:border-slate-700"
        );
        if (btn.dataset.font === fontName) {
            btn.classList.remove(
                "border-slate-200",
                "dark:border-slate-700"
            );
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
if (savedFont) {
    applyFont(savedFont);
} else {
    applyFont("tajawal");
}

//////////////////////////////////////////

// Theme Colors

let themeColorsGrid = document.getElementById("theme-colors-grid");

let themes = [
    {
        name: "Purple Blue",
        primary: "#6366f1",
        secondary: "#8b5cf6",
        accent: "#ec4899"
    },
    {
        name: "Pink Orange",
        primary: "#ec4899",
        secondary: "#f97316",
        accent: "#fb923c"
    },
    {
        name: "Green Emerald",
        primary: "#10b981",
        secondary: "#059669",
        accent: "#34d399"
    },
    {
        name: "Blue Cyan",
        primary: "#3b82f6",
        secondary: "#06b6d4",
        accent: "#22d3ee"
    },
    {
        name: "Red Rose",
        primary: "#ef4444",
        secondary: "#f43f5e",
        accent: "#fb7185"
    },
    {
        name: "Amber Orange",
        primary: "#f59e0b",
        secondary: "#ea580c",
        accent: "#fbbf24"
    }
];

function applyTheme(theme) {
    document.documentElement.style.setProperty(
        "--color-primary",
        theme.primary
    );
    document.documentElement.style.setProperty(
        "--color-secondary",
        theme.secondary
    );
    document.documentElement.style.setProperty(
        "--color-accent",
        theme.accent
    );
    let themeButtons = themeColorsGrid.querySelectorAll("button");
    themeButtons.forEach(function (btn) {
        btn.classList.remove(
            "ring-2",
            "ring-primary",
            "ring-offset-2",
            "ring-offset-white",
            "dark:ring-offset-slate-900"
        );
        if (
            btn.dataset.primary === theme.primary &&
            btn.dataset.secondary === theme.secondary
        ) {
            btn.classList.add(
                "ring-2",
                "ring-primary",
                "ring-offset-2",
                "ring-offset-white",
                "dark:ring-offset-slate-900"
            );
        }
    });
    localStorage.setItem(
        "themeColors",
        JSON.stringify(theme)
    );
}

themes.forEach(function (theme) {
    let button = document.createElement("button");
    button.className =
        "w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700";
    button.style.background =
        `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`;
    button.dataset.primary = theme.primary;
    button.dataset.secondary = theme.secondary;
    button.title = theme.name;
    button.addEventListener("click", function () {
        applyTheme(theme);
    });
    themeColorsGrid.appendChild(button);
});

let savedThemeColors = localStorage.getItem("themeColors");
if (savedThemeColors) {
    let savedTheme = JSON.parse(savedThemeColors);
    applyTheme(savedTheme);
} else {
    applyTheme(themes[0]);
}

//////////////////////////////////////////
// Reset Settings

let resetSettings = document.getElementById("reset-settings");
resetSettings.addEventListener("click", function () {
    localStorage.removeItem("font");
    localStorage.removeItem("themeColors");
    applyFont("tajawal");
    applyTheme(themes[0]);
});

// scroll to Top Button

let scrollToTop = document.getElementById("scroll-to-top");
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
    });
});