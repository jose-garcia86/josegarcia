// Theme switcher (Paper Light Mode <-> Terminal Dark Mode)
document.addEventListener("DOMContentLoaded", function () {
    var toggleBtn = document.getElementById("theme-toggle");
    var labelEl = document.querySelector("[data-theme-label]");

    function syncLabel(theme) {
        if (!labelEl) return;
        labelEl.textContent = theme === "dark" ? "TERM // DARK" : "PAPER // LIGHT";
    }

    var currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    syncLabel(currentTheme);

    if (toggleBtn) {
        toggleBtn.addEventListener("click", function () {
            var active = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
            var next = active === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            try {
                localStorage.setItem("theme", next);
            } catch (e) {}
            syncLabel(next);
        });
    }
});
