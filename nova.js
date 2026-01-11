// تشغيل أصوات الـ Hover
function playHover() {
    const sound = document.getElementById('hoverSound');
    sound.currentTime = 0; // إعادة الصوت للبداية
    sound.volume = 0.2;    // خفض الصوت ليكون مريحاً
    sound.play().catch(e => {}); // التغفل عن أخطاء المتصفح إذا لم يتفاعل المستخدم أولاً
}

// تشغيل أصوات الـ Click
function playClick() {
    const sound = document.getElementById('clickSound');
    sound.currentTime = 0;
    sound.volume = 0.5;
    sound.play().catch(e => {});
}

// ميزة آبل: ظهور العناصر بالتدريج عند الفتح
document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.glass-apple');
    // تأكد من أن البطاقة تبدأ مخفية في CSS أو قم بإخفائها هنا
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'all 1s cubic-bezier(0.2, 0.8, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 300); // 300ms بعد تحميل الصفحة
});

// منع سياق القائمة اليمنى (اختياري لزيادة الاحترافية)
document.addEventListener('contextmenu', event => event.preventDefault());

// --- كود الإحصائيات التفاعلية (The Matrix Counters) ---

// 1. تحديد العناصر
const statsSection = document.querySelector('#statsSection');
const counters = document.querySelectorAll('.stat-number');
let started = false; // للتأكد من أن العد يعمل مرة واحدة فقط

// 2. دالة العد السريع
function startCounting(counter) {
    const target = +counter.getAttribute('data-target'); // الرقم المستهدف (مثلاً 15000)
    const count = +counter.innerText; // الرقم الحالي
    
    // معادلة السرعة: كلما كان الرقم كبيراً زادت سرعة العد
    const increment = target / 100; // تقسيم الرقم على 100 خطوة

    if (count < target) {
        // زيادة الرقم وتحديثه في الصفحة
        counter.innerText = Math.ceil(count + increment);
        
        // إعادة استدعاء الدالة بسرعة لعمل تأثير الحركة
        setTimeout(() => startCounting(counter), 20); 
    } else {
        counter.innerText = target; // التأكد من وصول الرقم للنهاية بالضبط
    }
}

// 3. مراقب الشاشة (Intersection Observer)
// وظيفته: تشغيل العداد فقط عندما يظهر القسم على الشاشة
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
            counters.forEach(counter => startCounting(counter));
            started = true; // منع التكرار
        }
    });
}, { threshold: 0.5 }); // يعمل عندما يظهر 50% من القسم

// بدء المراقبة
if (statsSection) {
    observer.observe(statsSection);
}
// تأثير الميلان ثلاثي الأبعاد لبطاقة الـ VIP
const vipCard = document.querySelector('.vip-card');

if (vipCard) {
    vipCard.addEventListener('mousemove', (e) => {
        let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        vipCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    vipCard.addEventListener('mouseenter', () => {
        vipCard.style.transition = 'none';
    });

    vipCard.addEventListener('mouseleave', () => {
        vipCard.style.transition = 'all 0.5s ease';
        vipCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
}
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;

        // close others (اختياري لكنه احترافي)
        document.querySelectorAll('.faq-item').forEach(i => {
            if (i !== item) i.classList.remove('active');
        });

        item.classList.toggle('active');
    });
});
document.querySelectorAll('.payment-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.04)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});