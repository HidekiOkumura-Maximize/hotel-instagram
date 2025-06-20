// スムーススクロールとアニメーション
document.addEventListener('DOMContentLoaded', function() {
    // スクロールアニメーション
    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // アニメーション対象要素
    const animateElements = document.querySelectorAll('.strategy-card, .flow-step, .flow-outcome');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // フォーム送信処理（仮）
    const form = document.querySelector('.mobile-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('フォームが送信されました（テスト）');
        });
    }
});