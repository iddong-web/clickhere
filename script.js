document.addEventListener('DOMContentLoaded', function() {
    /* ========== 갤러리 비디오 모달 (gallery.html) ========== */
    const videoModal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const galleryCloseBtn = document.querySelector("#videoModal .close-btn");

    if (videoModal && modalVideo && galleryCloseBtn) {
        const galleryItems = document.querySelectorAll('.gallery-item a');

        galleryItems.forEach(item => {
            item.addEventListener('click', function(e) {
                const fileUrl = this.getAttribute('href');
                if (fileUrl && fileUrl.toLowerCase().endsWith('.mp4')) {
                    e.preventDefault();
                    videoModal.style.display = "block";
                    modalVideo.src = fileUrl;
                    modalVideo.load();
                    modalVideo.play();
                }
            });
        });

        galleryCloseBtn.addEventListener('click', closeVideoModal);

        window.addEventListener('click', function(event) {
            if (event.target === videoModal) closeVideoModal();
        });

        window.addEventListener('keydown', function(e) {
            if (e.key === "Escape" && videoModal.style.display === "block") closeVideoModal();
        });

        function closeVideoModal() {
            videoModal.style.display = "none";
            modalVideo.pause();
            modalVideo.src = "";
        }
    }

    /* ========== 포트폴리오 스크롤 네비게이션 (portfolio.html) ========== */
    const scrollWrapper = document.getElementById('scrollWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageDots = document.querySelectorAll('.page-dot');
    const currentPageSpan = document.getElementById('currentPage');

    if (scrollWrapper && prevBtn && nextBtn && pageDots.length > 0 && currentPageSpan) {
        let currentIndex = 0;
        const totalItems = 4;

        function updateNavigation() {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === totalItems - 1;
            const itemWidth = scrollWrapper.querySelector('.portfolio-item').offsetWidth;
            scrollWrapper.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            pageDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            currentPageSpan.textContent = currentIndex + 1;
            const sectionTitle = document.getElementById('sectionTitle');
if (sectionTitle) {
    sectionTitle.textContent = (currentIndex < 2) ? "WORK" : "PROJECT";
}
        }
        /* ========== 포트폴리오 스크롤 네비게이션 수정 부분 ========== */

function updateNavigation() {
    // 1. 기존 로직들 (버튼 활성화, 슬라이드 이동 등)
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalItems - 1;
    
    const itemWidth = scrollWrapper.querySelector('.portfolio-item').offsetWidth;
    scrollWrapper.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    
    pageDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
    currentPageSpan.textContent = currentIndex + 1;

    // 2. [추가] 페이지 번호에 따라 제목 변경 로직
    const sectionTitle = document.getElementById('sectionTitle');
    if (sectionTitle) {
        if (currentIndex < 2) { 
            // 0, 1번째 인덱스 (1, 2페이지)
            sectionTitle.textContent = "WORK";
        } else {
            // 2, 3번째 인덱스 (3, 4페이지)
            sectionTitle.textContent = "PROJECT";
        }
    }
}

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) { currentIndex--; updateNavigation(); }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalItems - 1) { currentIndex++; updateNavigation(); }
        });

        pageDots.forEach((dot, index) => {
            dot.addEventListener('click', () => { currentIndex = index; updateNavigation(); });
        });

        updateNavigation();

        window.addEventListener('resize', () => {
            scrollWrapper.style.transition = 'none';
            updateNavigation();
            setTimeout(() => { scrollWrapper.style.transition = 'transform 0.5s ease'; }, 10);
        });
    }

    /* ========== Vytz 상세 이미지 모달 (portfolio.html) ========== */
    const vytzModal = document.getElementById('vytzModal');
    const vytzGalleryTrigger = document.getElementById('vytzGalleryTrigger');

    function openVytzModal() {
        if (vytzModal) {
            vytzModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeVytzModal() {
        if (vytzModal) {
            vytzModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    window.closeVytzModal = closeVytzModal;

    if (vytzGalleryTrigger) {
        vytzGalleryTrigger.addEventListener('click', openVytzModal);
    }

    window.addEventListener('click', function(event) {
        if (vytzModal && event.target === vytzModal) closeVytzModal();
    });

    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && vytzModal && vytzModal.style.display === 'block') closeVytzModal();
    });

    /* ========== 청춘로그(log) 3장 상세 이미지 모달 (portfolio.html) ========== */
    const logModal = document.getElementById('logModal');
    const logGalleryTrigger = document.getElementById('logGalleryTrigger');

    function openLogModal() {
        if (logModal) {
            logModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLogModal() {
        if (logModal) {
            logModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    window.closeLogModal = closeLogModal;

    if (logGalleryTrigger) {
        logGalleryTrigger.addEventListener('click', openLogModal);
    }

    window.addEventListener('click', function(event) {
        if (logModal && event.target === logModal) closeLogModal();
    });

    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && logModal && logModal.style.display === 'block') closeLogModal();
    });

    /* ========== 포트폴리오 단일 이미지 모달 - GIF 등 (portfolio.html) ========== */
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const imageModalClose = document.querySelector('.image-modal-close');
    const imageViewItems = document.querySelectorAll('.image-view-item:not(#vytzGalleryTrigger)');

    if (imageModal && modalImage && imageModalClose) {
        imageViewItems.forEach(item => {
            item.addEventListener('click', function() {
                const src = this.getAttribute('data-src') || this.querySelector('img')?.src;
                if (src) {
                    modalImage.src = src;
                    modalImage.alt = this.querySelector('img')?.alt || '상세보기';
                    imageModal.style.display = 'block';
                }
            });
        });

        imageModalClose.addEventListener('click', closeImageModal);

        window.addEventListener('click', function(event) {
            if (event.target === imageModal) closeImageModal();
        });

        window.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && imageModal.style.display === 'block') closeImageModal();
        });

        function closeImageModal() {
            imageModal.style.display = 'none';
            modalImage.src = '';
        }
    }
});