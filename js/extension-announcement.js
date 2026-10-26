const extensionAnnouncement = document.getElementById("extension-announcement");
const extensionAnnouncementToggle = document.getElementById("extension-announcement-toggle");
const extensionAnnouncementDetails = document.getElementById("extension-announcement-details");
const extensionBrowserCopy = document.getElementById("extension-browser-copy");
const extensionBrowserCopyStatus = document.getElementById("extension-browser-copy-status");

if (/Edg\//.test(navigator.userAgent)) {
    extensionBrowserCopy.dataset.url = "edge://extensions/";
    extensionBrowserCopy.textContent = "Copy edge://extensions/";
}

extensionAnnouncementToggle.addEventListener("click", () => {
    const isExpanded = extensionAnnouncementToggle.getAttribute("aria-expanded") === "true";
    extensionAnnouncementToggle.setAttribute("aria-expanded", String(!isExpanded));
    extensionAnnouncementToggle.textContent = isExpanded ? "Read more" : "Show less";
    extensionAnnouncementDetails.hidden = isExpanded;
    extensionAnnouncement.classList.toggle("is-expanded", !isExpanded);
});

document.getElementById("extension-announcement-close").addEventListener("click", () => {
    extensionAnnouncement.hidden = true;
});

extensionBrowserCopy.addEventListener("click", async () => {
    const address = extensionBrowserCopy.dataset.url;
    try {
        if (navigator.clipboard?.writeText) {
            try {
                await navigator.clipboard.writeText(address);
            } catch {
                copyWithLegacyClipboard(address);
            }
        } else {
            copyWithLegacyClipboard(address);
        }
        extensionBrowserCopyStatus.textContent = "Copied. Paste it in your address bar.";
    } catch (error) {
        console.error("Could not copy the browser extensions address.", error);
        extensionBrowserCopyStatus.textContent = `Copy failed. Enter ${address} in your address bar.`;
    }
});

function copyWithLegacyClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    try {
        if (!document.execCommand("copy")) {
            throw new Error("The browser rejected the clipboard copy command.");
        }
    } finally {
        textarea.remove();
    }
}
