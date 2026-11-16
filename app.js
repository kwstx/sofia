/**
 * SOFIA — The Global Luxury Trading Platform
 * Interactions & Overlay Verification Tool
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const btnTopAccess = document.getElementById('btnTopAccess');
  const btnHeroAccess = document.getElementById('btnHeroAccess');
  const accessModal = document.getElementById('accessModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const accessForm = document.getElementById('accessForm');
  const toastMessage = document.getElementById('toastMessage');

  // Pixel comparison overlay elements
  const diffToggleBtn = document.getElementById('diffToggleBtn');
  const diffBadge = document.getElementById('diffBadge');
  const referenceOverlay = document.getElementById('referenceOverlay');

  // Modal handlers
  function openModal() {
    if (!accessModal) return;
    accessModal.classList.add('is-open');
    accessModal.setAttribute('aria-hidden', 'false');
    const firstInput = accessModal.querySelector('input');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }

  function closeModal() {
    if (!accessModal) return;
    accessModal.classList.remove('is-open');
    accessModal.setAttribute('aria-hidden', 'true');
  }

  if (btnTopAccess) btnTopAccess.addEventListener('click', openModal);
  if (btnHeroAccess) btnHeroAccess.addEventListener('click', openModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  // Close modal when clicking backdrop
  if (accessModal) {
    accessModal.addEventListener('click', (e) => {
      if (e.target === accessModal) {
        closeModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
    // 'O' key toggles pixel comparison overlay
    if ((e.key === 'o' || e.key === 'O') && !['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      toggleOverlay();
    }
  });

  // Handle application submission
  if (accessForm) {
    accessForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('Application received. A Sofia partner director will contact you within 24 hours.');
      accessForm.reset();
    });
  }

  // Toast handler
  let toastTimer = null;
  function showToast(msg) {
    if (!toastMessage) return;
    toastMessage.textContent = msg;
    toastMessage.classList.add('is-active');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastMessage.classList.remove('is-active');
    }, 4500);
  }

  // Overlay Comparison Handler
  function toggleOverlay() {
    if (!referenceOverlay || !diffBadge) return;
    const isVisible = referenceOverlay.classList.toggle('is-visible');
    diffBadge.textContent = isVisible ? '50% Opacity' : 'Off';
    diffBadge.classList.toggle('is-active', isVisible);
  }

  if (diffToggleBtn) {
    diffToggleBtn.addEventListener('click', toggleOverlay);
  }
});
