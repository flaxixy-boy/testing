// B4UFFEU Shared Utilities
console.log("Shared Utils Loaded");

// Common Toast Function
window.showToast = function(enMsg, bnMsg, icon = 'fa-circle-info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    let hideTimeout;
    function startTimer() {
        if (hideTimeout) clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 5000);
    }

    function renderToast() {
        const message = currentLang === 'en' ? enMsg : bnMsg;
        const btnText = currentLang === 'en' ? 'বাং' : 'EN';
        const nextLang = currentLang === 'en' ? 'bn' : 'en';
        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <span class="toast-msg">${message}</span>
            <div class="toast-actions" style="display: flex; align-items: center; gap: 8px; margin-left: auto;">
                <button class="toast-lang-btn" onclick="event.stopPropagation(); toggleLanguage('${nextLang}'); updateActiveToastsAndResetTimers();">${btnText}</button>
                <button class="toast-close-btn" style="background: transparent; border: none; color: rgba(255,255,255,0.5); cursor: pointer; font-size: 16px;" onclick="event.stopPropagation(); this.parentElement.parentElement.classList.remove('show'); setTimeout(() => this.parentElement.parentElement.remove(), 400);"><i class="fas fa-times"></i></button>
            </div>`;
    }

    renderToast();
    toast.setAttribute('data-en', enMsg);
    toast.setAttribute('data-bn', bnMsg);
    toast.setAttribute('data-icon', icon);
    toast.resetTimer = startTimer;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    startTimer();
};

// Robust Script Loader
window.safeLoadScript = function(src, callback) {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
        if (callback) callback();
        return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
};

// Global Quantity Handler
window.updateQuantity = function(change) {
    if (typeof window.currentQuantity === 'undefined') window.currentQuantity = 1;
    window.currentQuantity += change;
    if (window.currentQuantity < 1) window.currentQuantity = 1;

    const qtyElement = document.getElementById('item-quantity');
    if (qtyElement) qtyElement.value = window.currentQuantity;

    // Trigger update if the page-specific updateTotal exists
    if (typeof window.updateTotal === 'function') {
        window.updateTotal();
    }
};
