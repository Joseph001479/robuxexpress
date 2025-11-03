document.addEventListener('DOMContentLoaded', function() {
    // Efeito de rolagem suave para âncoras internas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if(href.length > 1 && document.querySelector(href)){
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efeito premium: Parallax flutuante nos cards de produto
    document.querySelectorAll('.product-card .product-image').forEach(wrapper => {
        const img = wrapper.querySelector('.product-img');
        let floatFrame = 0;
        
        function floatingAnim() {
            floatFrame += 0.04 + Math.random()*0.01;
            let floatY = Math.sin(floatFrame) * 8;
            let floatX = Math.cos(floatFrame/2) * 4;
            img.style.transform = `translateY(${floatY}px) translateX(${floatX}px) scale(1.04)`;
            img._floatAnim = requestAnimationFrame(floatingAnim);
        }
        floatingAnim();

        wrapper.addEventListener('mousemove', function(e) {
            const rect = wrapper.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            img.style.transform = `translateY(${y*12}px) translateX(${x*12}px) scale(1.10) rotateY(${x*18}deg) rotateX(${y*-16}deg)`;
            cancelAnimationFrame(img._floatAnim);
        });

        wrapper.addEventListener('mouseleave', function() {
            floatFrame = Math.random() * Math.PI * 2;
            floatingAnim();
        });
        
        wrapper.addEventListener('mouseenter', function() {
            img.style.transform = 'scale(1.13)';
            cancelAnimationFrame(img._floatAnim);
        });
    });

    // Efeito premium: banner de baixo reage ao mouse
    document.querySelectorAll('.banner-hover-zoom').forEach(banner => {
        const img = banner.querySelector('.banner-img');
        banner.addEventListener('mousemove', function(e) {
            const rect = banner.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            img.style.setProperty('--x', `${x*10}deg`);
            img.style.setProperty('--y', `${y*-10}deg`);
            banner.classList.add('is-hover');
        });
        
        banner.addEventListener('mouseleave', function() {
            img.style.setProperty('--x', '0deg');
            img.style.setProperty('--y', '0deg');
            banner.classList.remove('is-hover');
        });
        
        banner.addEventListener('mouseenter', function() {
            banner.classList.add('is-hover');
        });
    });

    // Contador de itens no carrinho (simulado) + animação premium
    const cartCount = document.querySelector('.cart-count');
    let count = 0;
    
    document.querySelectorAll('.btn-product').forEach(btn => {
        btn.addEventListener('click', function() {
            count++;
            cartCount.textContent = count;
            cartCount.classList.remove('cart-pulse');
            void cartCount.offsetWidth;
            cartCount.classList.add('cart-pulse');
            
            // Feedback visual de adicionado
            this.textContent = 'ADICIONADO!';
            this.classList.add('btn-added');
            
            setTimeout(() => {
                this.textContent = 'COMPRAR AGORA';
                this.classList.remove('btn-added');
            }, 1100);
        });
    });

    // Efeito premium de hover nos cards: transição com sombra dourada e brilho
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = "box-shadow 0.5s cubic-bezier(.19,1,.22,1), transform 0.33s cubic-bezier(.19,1,.22,1)";
            this.style.boxShadow = "0 0 28px 8px rgba(255,215,0,0.25), 0 10px 30px rgba(0,0,0,0.22)";
            this.style.transform = "translateY(-13px) scale(1.03)";
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = "";
            this.style.transform = "translateY(0) scale(1)";
        });
    });

    // FAQ abrir/fechar
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.faq-item');
            item.classList.toggle('active');
            
            // Fechar outros
            document.querySelectorAll('.faq-item').forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
        });
    });

    // Accordion para .after-benefits igual ao FAQ
    document.querySelectorAll('.after-benefits-question').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.after-benefits-item');
            item.classList.toggle('active');
            
            // Fecha os outros
            document.querySelectorAll('.after-benefits-item').forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
        });
    });

    // Carrossel de benefícios - efeito de arrastar para mobile
    const benefitsCarousel = document.querySelector('.benefits-carousel');
    if (benefitsCarousel) {
        let isDown = false;
        let startX, scrollLeft;
        
        benefitsCarousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - benefitsCarousel.offsetLeft;
            scrollLeft = benefitsCarousel.scrollLeft;
            benefitsCarousel.style.cursor = 'grabbing';
        });
        
        benefitsCarousel.addEventListener('mouseleave', () => {
            isDown = false;
            benefitsCarousel.style.cursor = '';
        });
        
        benefitsCarousel.addEventListener('mouseup', () => {
            isDown = false;
            benefitsCarousel.style.cursor = '';
        });
        
        benefitsCarousel.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - benefitsCarousel.offsetLeft;
            const walk = (x - startX) * 1.8;
            benefitsCarousel.scrollLeft = scrollLeft - walk;
        });

        // Touch (mobile)
        benefitsCarousel.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - benefitsCarousel.offsetLeft;
            scrollLeft = benefitsCarousel.scrollLeft;
        });
        
        benefitsCarousel.addEventListener('touchend', () => {
            isDown = false;
        });
        
        benefitsCarousel.addEventListener('touchmove', (e) => {
            if(!isDown) return;
            const x = e.touches[0].pageX - benefitsCarousel.offsetLeft;
            const walk = (x - startX) * 1.8;
            benefitsCarousel.scrollLeft = scrollLeft - walk;
        });
    }

    // Carrossel automático mobile e efeito hover desktop nos cards de benefícios
    (function() {
        const carousel = document.querySelector('.benefits-carousel');
        const cards = document.querySelectorAll('.benefit-card');
        if (!carousel || cards.length < 2) return;

        // Auto Slide para mobile
        let autoScroll;
        let isAutoScrolling = false;
        
        function startAutoScroll() {
            if (window.innerWidth > 991) return; // Só mobile/tablet
            if (isAutoScrolling) return;
            isAutoScrolling = true;
            
            autoScroll = setInterval(() => {
                // Se já está no fim, volta ao início
                if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 2) {
                    carousel.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Desliza para o próximo cartão
                    carousel.scrollBy({ left: cards[0].offsetWidth + 20, behavior: 'smooth' });
                }
            }, 2500); // Troca a cada 2.5s
        }
        
        function stopAutoScroll() {
            clearInterval(autoScroll);
            isAutoScrolling = false;
        }

        // Inicia/desliga o autoslide conforme tamanho da tela
        function handleResize() {
            stopAutoScroll();
            if (window.innerWidth <= 991) startAutoScroll();
        }
        
        window.addEventListener('resize', handleResize);
        handleResize();

        // Para auto-slide ao interagir (toque ou arrasto)
        ['mousedown','touchstart','mouseenter'].forEach(ev => {
            carousel.addEventListener(ev, stopAutoScroll, { passive:true });
        });
        
        ['mouseleave','touchend'].forEach(ev => {
            carousel.addEventListener(ev, () => {
                if (window.innerWidth <= 991) startAutoScroll();
            });
        });

        // Efeito de movimento suave no hover (desktop)
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                if (window.innerWidth < 992) return; // Só no desktop
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `scale(1.045) translateX(${x*12}px) translateY(${y*12}px) rotateX(${-y*7}deg) rotateY(${x*7}deg)`;
                card.style.boxShadow = `0 10px 40px 0 rgba(255,215,0,0.13), 0 4px 20px rgba(0,0,0,0.19)`;
            });
            
            card.addEventListener('mouseleave', function() {
                if (window.innerWidth < 992) return;
                card.style.transform = "";
                card.style.boxShadow = "";
            });
        });
    })();

    // Modal de Termos e Condições
    const showTerms = document.getElementById('show-terms-link');
    const modal = document.getElementById('terms-modal');
    const closeTerms = document.getElementById('close-terms');
    
    if(showTerms && modal && closeTerms) {
        showTerms.addEventListener('click', function(e){
            e.preventDefault();
            modal.style.display = 'flex';
        });
        
        closeTerms.addEventListener('click', function(){
            modal.style.display = 'none';
        });
        
        modal.addEventListener('click', function(e){
            if(e.target === modal) modal.style.display = 'none';
        });
    }
});