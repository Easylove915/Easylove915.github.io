/* 站内小交互：复制、mailto 兜底提示 */
(() => {
  const MAIL = '2748916664@qq.com';

  /* ---------- toast ---------- */
  let toastEl = null;
  let toastTimer = null;

  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    requestAnimationFrame(() => toastEl.classList.add('is-on'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 2800);
  }

  function legacyCopy(text) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '-1000px';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, text.length);
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch { return false; }
  }

  async function copy(text) {
    // 非安全上下文（http://局域网 IP）里 clipboard API 会直接抛错；
    // 也可能因为焦点/权限问题挂住，所以加超时兜底。
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await Promise.race([
          navigator.clipboard.writeText(text),
          new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 800)),
        ]);
        return true;
      } catch { /* 继续走兜底 */ }
    }
    return legacyCopy(text);
  }

  /* ---------- 通用复制按钮（.ci-copy[data-copy]） ---------- */
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.ci-copy');
    if (!btn) return;
    const text = btn.dataset.copy || '';
    const ok = await copy(text);
    const old = btn.textContent;
    btn.textContent = ok ? '已复制' : '请手动复制';
    btn.classList.toggle('is-done', ok);
    setTimeout(() => { btn.textContent = old; btn.classList.remove('is-done'); }, 1600);
    toast(ok ? `已复制 ${text}` : `复制被浏览器拦了，请手动选中 ${text}`);
  });

  /* ---------- mailto 兜底 ----------
     浏览器有默认邮件客户端时会正常唤起；没有时至少让用户看到“已复制”，
     可以直接粘贴到任意邮箱 App。 */
  document.addEventListener('click', async (e) => {
    const a = e.target.closest('a[href^="mailto:"]');
    if (!a) return;
    const ok = await copy(MAIL);
    toast(ok
      ? `邮箱 ${MAIL} 已复制，没弹出邮箱应用时可直接粘贴`
      : `邮箱 ${MAIL}，可手动复制`);
  });

  window.__siteToast = toast;
})();
