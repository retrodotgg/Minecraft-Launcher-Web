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
    if (!navigator.clipboard?.writeText) {
        extensionBrowserCopyStatus.textContent = `Clipboard unavailable. Enter ${address} in your address bar.`;
        return;
    }

    try {
        await navigator.clipboard.writeText(address);
        extensionBrowserCopyStatus.textContent = "Copied. Paste it in your address bar.";
    } catch (error) {
        console.error("Could not copy the browser extensions address.", error);
        extensionBrowserCopyStatus.textContent = `Copy failed. Enter ${address} in your address bar.`;
    }
});
