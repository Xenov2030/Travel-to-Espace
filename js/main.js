/**
 * Space Tourism - Functional Logic
 * Handles Navigation and Data Injection
 */

const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

// --- Navigation Toggle Logic ---

/**
 * Handles the mobile menu toggle state and accessibility attributes
 */
navToggle.addEventListener("click", () => {
    const visibility = nav.getAttribute("data-visible");

    if (visibility === "false") {
        nav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true);
    } else {
        nav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
    }
});

// --- Tab System & Data Injection ---

const tabList = document.querySelector('[role="tablist"]');
const tabs = document.querySelectorAll('[role="tab"]');

if (tabList) {
    tabList.addEventListener('keydown', changeTabFocus);
}

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});

let tabFocus = 0;

/**
 * Manages keyboard navigation (Left/Right arrows) for accessibility
 */
function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;

    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);

        if (e.keyCode === keydownRight) {
            tabFocus++;
            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            }
        } else if (e.keyCode === keydownLeft) {
            tabFocus--;
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }

        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
    }
}

/**
 * Main function to switch content based on data-attributes
 * Matches information from data.json to the UI
 */
function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");

    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    // Switch active state indicators
    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);

    targetTab.setAttribute("aria-selected", true);

    // Hide all panels and show the selected one
    hideContent(mainContainer, '[role="tabpanel"]');
    showContent(mainContainer, [`#${targetPanel}`]);

    // Hide all images and show the selected one
    hideContent(mainContainer, 'picture');
    showContent(mainContainer, [`#${targetImage}`]);
}

/**
 * Helper to hide elements with a fade-out animation potential
 */
function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach((item) => item.setAttribute("hidden", true));
}

/**
 * Helper to reveal elements
 */
function showContent(parent, content) {
    parent.querySelector(content).removeAttribute("hidden");
}

// --- Data Persistence (Optional: Deep Linking) ---

/**
 * If the user refreshes, we check the URL to maintain the active tab
 */
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    
    if (tabParam) {
        const activeTab = document.querySelector(`[aria-controls="${tabParam}"]`);
        if (activeTab) activeTab.click();
    }
});