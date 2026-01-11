/**
 * Itch.io HTML5 Embed Protection Script (Modified)
 * * Purpose: 
 * This script detects if an itch.io game is being "hotlinked" (embedded on an 
 * unauthorized third-party domain). 
 * * MODIFICATION: Added specific authorization for cdn.jsdelivr.net to allow 
 * porting/testing on the meowgoober repository.
 */

(() => {
    let formData, referrerDomain, uploadId, isHotlink, ancestorOrigins, referrerUrl;

    // 1. Determine the Referrer URL
    ancestorOrigins = location.ancestorOrigins;
    referrerUrl = (ancestorOrigins != null ? ancestorOrigins[0] : void 0) != null ? 
                  ancestorOrigins[0] : 
                  document.referrer;

    // 2. Extract the Domain from the Referrer URL
    referrerDomain = referrerUrl != null && (match = referrerUrl.match(/\/\/([^\/]+)/)) != null ? 
                     match[1] : 
                     void 0;

    // 3. Extract the Upload ID from the current page URL
    let currentUrl = window.location.href;
    uploadId = currentUrl != null && (idMatch = currentUrl.match(/\/html\/(\d+)/)) != null ? 
               idMatch[1] : 
               void 0;

    // 4. Check if the current domain is authorized
    // We added 'cdn.jsdelivr.net' to the list of authorized domains.
    isHotlink = referrerDomain && !(
        referrerDomain === "itch.io" || 
        referrerDomain.match(/\.itch\.io$/) || 
        referrerDomain.match(/\.itch\.zone$/) ||
        referrerDomain === "cdn.jsdelivr.net" // Authorized for testingporting
    ) ? true : void 0;

    // 5. Report Statistics to itch.io
    if (navigator.sendBeacon != null) {
        formData = new FormData();
        formData.append("domain", referrerDomain || "unknown-domain");
        
        if (uploadId) {
            formData.append("upload_id", uploadId);
        }
        
        if (isHotlink) {
            formData.append("hotlink", "1");
        }

        navigator.sendBeacon("https://itch.io/html-callback", formData);
    }

    // 6. Action: If it is a hotlink (and not on the whitelist), redirect the user
    if (isHotlink) {
        if (uploadId) {
            window.location = "https://itch.io/embed-hotlink/" + uploadId;
        } else {
            window.location = "https://itch.io/embed-hotlink";
        }
    }
})();