// Basic interactions: open card, yes/no, confetti, typewriter, music
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('openBtn');
  const front = document.getElementById('front');
  const inside = document.getElementById('inside');
  const card = document.getElementById('card');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const celebrate = document.getElementById('celebrate');
  const closeCelebrate = document.getElementById('closeCelebrate');
  const music = document.getElementById('music');

  // You can change the displayed name/message here or edit the HTML elements directly
  const recipientEl = document.getElementById('recipient');
  const messageEl = document.getElementById('message');
  const headlineEl = document.getElementById('headline');
  recipientEl.textContent = '[Her Name]'; // change to her actual name
  messageEl.textContent = "I pick you today and every day. Would you be my Valentine?";
  headlineEl.textContent = "Will you be my Valentine?";

  // small typewriter effect for the message when opening
  function typewriter(el, text, speed = 30) {
    el.textContent = '';
    let i = 0;
    const t = setInterval(() => {
      el.textContent += text[i++] || '';
      if (i > text.length) clearInterval(t);
    }, speed);
  }

  function throwConfetti() {
    if (window.confetti) {
      const duration = 2500;
      const end = Date.now() + duration;
      (function frame() {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      }());
    }
  }

  openBtn.addEventListener('click', () => {
    // simple flip effect via classes
    front.classList.add('hidden');
    inside.classList.remove('hidden');
    inside.setAttribute('aria-hidden', 'false');

    // animate typewriter
    typewriter(messageEl, messageEl.textContent, 28);

    // small pop animation
    card.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.02)' }, { transform: 'scale(1)' }], {
      duration: 420,
      easing: 'ease-out'
    });

    // optionally play music if available
    if (music && music.src) {
      // attempt to play (may require a user gesture — we are inside a click handler)
      music.currentTime = 0;
      music.play().catch(() => {/* ignore autoplay errors */});
    }
  });

  yesBtn.addEventListener('click', () => {
    // Celebration: confetti + overlay
    throwConfetti();
    celebrate.classList.remove('hidden');
    celebrate.setAttribute('aria-hidden', 'false');

    // If you want to change the final text dynamically:
    const finalText = document.getElementById('finalText');
    finalText.textContent = "So happy you said yes — can't wait to make lots of memories with you! 💫";
  });

  noBtn.addEventListener('click', () => {
    // playfully handle a "no" — gentle prompt to try again
    noBtn.textContent = "Really? Try again 💌";
    noBtn.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-8px)' }, { transform: 'translateY(0)' }], {
      duration: 420,
      easing: 'cubic-bezier(.2,.9,.2,1)'
    });
  });

  if (closeCelebrate) {
    closeCelebrate.addEventListener('click', () => {
      celebrate.classList.add('hidden');
      celebrate.setAttribute('aria-hidden', 'true');
    });
  }

  // Extra: keyboard support (Enter opens, Y = yes, N = no)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !inside.classList.contains('hidden')) {
      yesBtn.focus();
    }
    if (e.key.toLowerCase() === 'y') yesBtn.click();
    if (e.key.toLowerCase() === 'n') noBtn.click();
  });
});
