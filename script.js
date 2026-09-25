/* =========================================
   PORTFOLIO SCRIPTS
========================================= */

document.addEventListener('DOMContentLoaded', function () {

    // ============ 1. Scroll Down Indicator ============
    const scrollDown = document.querySelector('.scroll-down');

    if (scrollDown) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                scrollDown.classList.add('hidden');
            } else {
                scrollDown.classList.remove('hidden');
            }
        });
    }

    // ============ 2. Arrow Buttons (Hero Slider Navigation) ============
    document.querySelectorAll('.arrow-btn[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.getAttribute('data-action');

            if (action === 'scroll-top') {
                window.scrollTo({top: 0, behavior: 'smooth'});
            } else if (action === 'scroll-next') {
                const nextSection = document.getElementById('works');
                if (nextSection) {
                    nextSection.scrollIntoView({behavior: 'smooth', block: 'start'});
                } else {
                    window.scrollBy({top: window.innerHeight, behavior: 'smooth'});
                }
            }
        });
    });

    // ============ 3. Slider Numbers (Hero) ============
    const sliderNumbers = document.querySelectorAll('.slider-numbers .number');
    const sliderSections = ['hero', 'works', 'services', 'about'];

    sliderNumbers.forEach((num, index) => {
        num.addEventListener('click', () => {
            const targetId = sliderSections[index];
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({behavior: 'smooth', block: 'start'});
            }

            sliderNumbers.forEach(n => n.classList.remove('active'));
            num.classList.add('active');
        });
    });

    if (sliderNumbers.length > 0) {
        window.addEventListener('scroll', () => {
            let activeIndex = 0;

            sliderSections.forEach((id, index) => {
                const section = document.getElementById(id);
                if (section) {
                    const sectionTop = section.offsetTop - 150;
                    if (window.scrollY >= sectionTop) {
                        activeIndex = index;
                    }
                }
            });

            sliderNumbers.forEach(n => n.classList.remove('active'));
            if (sliderNumbers[activeIndex]) {
                sliderNumbers[activeIndex].classList.add('active');
            }
        });
    }

    // ============ 4. Smooth Scroll for Anchor Links ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        });
    });

    // ============ 5. Active Nav Link on Scroll ============
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ============ 6. Fade-in on Scroll ============
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.work-card, .service-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });

    // ============ 7. Console Signature ============
    console.log(
        '%c👋 Hey there! Looking at the code? Nice!',
        'color: #5C6AC4; font-size: 16px; font-weight: bold;'
    );
    console.log(
        '%cLet\'s work together: hello@yourname.com',
        'color: #FFD166; font-size: 14px;'
    );

    // ============ 8. Filter Tabs + Sub-filters ============
    const filterBtns = document.querySelectorAll('#mainFilters .filter-btn');
    const allWorkItems = document.querySelectorAll('.work-item');
    const allWebProjects = document.querySelectorAll('.web-project');
    const graphicSubFilters = document.getElementById('graphicSubFilters');
    const photographySubFilters = document.getElementById('photographySubFilters');
    const subFilterBtns = document.querySelectorAll('.sub-filter-btn');

    function applyFilter(filter) {
        // ----- 8.1 نمایش/مخفی زیر-فیلتر گرافیک -----
        if (graphicSubFilters) {
            if (filter === 'graphic') {
                graphicSubFilters.classList.add('active');
                // فقط دکمه‌های زیر-فیلتر گرافیک رو ریست کن
                graphicSubFilters.querySelectorAll('.sub-filter-btn').forEach(b => b.classList.remove('active'));
                const allGraphicBtn = graphicSubFilters.querySelector('.sub-filter-btn[data-subfilter="all-graphic"]');
                if (allGraphicBtn) allGraphicBtn.classList.add('active');
            } else {
                graphicSubFilters.classList.remove('active');
            }
        }

        // ----- 8.2 نمایش/مخفی زیر-فیلتر Photography -----
        if (photographySubFilters) {
            if (filter === 'photography') {
                photographySubFilters.classList.add('active');
                // فقط دکمه‌های زیر-فیلتر Photography رو ریست کن
                photographySubFilters.querySelectorAll('.sub-filter-btn').forEach(b => b.classList.remove('active'));
                const allPhotosBtn = photographySubFilters.querySelector('.sub-filter-btn[data-subfilter="all-photos"]');
                if (allPhotosBtn) allPhotosBtn.classList.add('active');
            } else {
                photographySubFilters.classList.remove('active');
            }
        }

        // ----- 8.3 فیلتر .work-item ها -----
        allWorkItems.forEach(item => {
            const category = item.getAttribute('data-category');
            const featured = item.getAttribute('data-featured') === 'true';
            const isWebProject = item.hasAttribute('data-project-type') && item.getAttribute('data-project-type') === 'web';

            let shouldShow = false;

            if (isWebProject) {
                // کارت وب تو صفحه‌ی اصلی — همیشه نمایش داده بشه
                shouldShow = true;
            } else if (filter === 'all') {
                // Highlights: فقط آیتم‌های منتخب
                shouldShow = featured;
            } else if (filter === 'graphic') {
                // گرافیک: همه‌ی گرافیک‌ها
                shouldShow = category === 'graphic';
            } else if (filter === 'photography') {
                // Photography: همه‌ی عکس‌ها
                shouldShow = category === 'photography';
            } else if (filter === 'web') {
                // تب Web: کارت‌های وبی که با work-item اومدن
                shouldShow = false;
            } else {
                // بقیه دسته‌ها (video, motion)
                shouldShow = category === filter;
            }

            if (shouldShow) {
                item.classList.remove('hidden');
                item.style.display = '';
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 30);
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
            }
        });

        // ----- 8.4 فیلتر .web-project ها (کارت‌های دوگانه در work.html) -----
        allWebProjects.forEach(project => {
            const featured = project.getAttribute('data-featured') === 'true';

            if (filter === 'all') {
                project.style.display = featured ? '' : 'none';
            } else if (filter === 'web') {
                project.style.display = '';
            } else {
                project.style.display = 'none';
            }
        });
    }

    if (filterBtns.length > 0 && (allWorkItems.length > 0 || allWebProjects.length > 0)) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                applyFilter(filter);
            });
        });

        const activeFilter = document.querySelector('#mainFilters .filter-btn.active');
        if (activeFilter) {
            applyFilter(activeFilter.getAttribute('data-filter'));
        }
    }

    // ----- 8.5 زیر-فیلتر گرافیک -----
    if (graphicSubFilters) {
        graphicSubFilters.querySelectorAll('.sub-filter-btn').forEach(subBtn => {
            subBtn.addEventListener('click', () => {
                graphicSubFilters.querySelectorAll('.sub-filter-btn').forEach(b => b.classList.remove('active'));
                subBtn.classList.add('active');

                const subFilter = subBtn.getAttribute('data-subfilter');

                allWorkItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    const subcategory = item.getAttribute('data-subcategory');

                    if (category === 'graphic') {
                        if (subFilter === 'all-graphic' || subcategory === subFilter) {
                            item.classList.remove('hidden');
                            item.style.display = '';
                            item.style.opacity = '0';
                            setTimeout(() => {
                                item.style.opacity = '1';
                            }, 30);
                        } else {
                            item.classList.add('hidden');
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // ----- 8.6 زیر-فیلتر Photography -----
    if (photographySubFilters) {
        photographySubFilters.querySelectorAll('.sub-filter-btn').forEach(subBtn => {
            subBtn.addEventListener('click', () => {
                photographySubFilters.querySelectorAll('.sub-filter-btn').forEach(b => b.classList.remove('active'));
                subBtn.classList.add('active');

                const subFilter = subBtn.getAttribute('data-subfilter');

                allWorkItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    const subcategory = item.getAttribute('data-subcategory');

                    if (category === 'photography') {
                        if (subFilter === 'all-photos' || subcategory === subFilter) {
                            item.classList.remove('hidden');
                            item.style.display = '';
                            item.style.opacity = '0';
                            setTimeout(() => {
                                item.style.opacity = '1';
                            }, 30);
                        } else {
                            item.classList.add('hidden');
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // ============ 9. Video Modal ============
    const videoModal = document.getElementById('videoModal');
    const videoModalPlayer = document.getElementById('videoModalPlayer');
    const videoModalClose = document.querySelector('.video-modal-close');
    const videoModalOverlay = document.querySelector('.video-modal-overlay');
    const videoItems = document.querySelectorAll('.work-item[data-video], .work-item[data-video-type]');

    if (videoModal) {
        videoItems.forEach(item => {
            item.addEventListener('click', () => {
                // اگه گرافیک، عکاسی، یا وب بود، کاری نکن
                if (item.hasAttribute('data-image')) return;
                if (item.hasAttribute('data-project-type')) return;

                const videoType = item.getAttribute('data-video-type');
                const orientation = item.getAttribute('data-orientation');

                let iframeHTML = '';

                if (videoType === 'screenpal-full') {
                    iframeHTML = item.getAttribute('data-video');
                } else {
                    const videoData = item.getAttribute('data-video');
                    if (!videoData) return;

                    if (videoType === 'screenpal') {
                        iframeHTML = `<iframe src="${videoData}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" scrolling="no" allow="fullscreen *;" allowfullscreen></iframe>`;
                    } else if (videoData.trim().startsWith('<iframe')) {
                        iframeHTML = videoData;
                    } else {
                        const separator = videoData.includes('?') ? '&' : '?';
                        const embedUrl = `${videoData}${separator}autoplay=1&title=0&byline=0&portrait=0&badge=0`;
                        iframeHTML = `<iframe src="${embedUrl}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
                    }
                }

                if (!iframeHTML) return;

                videoModal.classList.remove('player-vertical');
                if (orientation === 'vertical') {
                    videoModal.classList.add('player-vertical');
                }

                videoModalPlayer.innerHTML = iframeHTML;
                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        function closeVideoModal() {
            videoModal.classList.remove('active', 'player-vertical');
            videoModalPlayer.innerHTML = '';
            document.body.style.overflow = '';
        }

        videoModalClose.addEventListener('click', closeVideoModal);
        videoModalOverlay.addEventListener('click', closeVideoModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                closeVideoModal();
            }
        });
    }

    // ============ 10. Image Lightbox ============
    const imageLightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const graphicItems = document.querySelectorAll('.work-item[data-image]');

    if (imageLightbox && graphicItems.length > 0) {
        // ... (بقیه کد قبلی: openLightbox, closeLightbox, nextImage, prevImage)

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
        if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
        if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

        // ...
    }

    // ============ 11. Project Modal (Web Design Previews) ============
    const projectModal = document.getElementById('projectModal');

    if (projectModal) {
        const modalTitle = document.getElementById('modalTitle');
        const modalCategory = document.getElementById('modalCategory');
        const modalBody = document.getElementById('modalBody');
        const modalImage = document.getElementById('modalImage');
        const closeBtn = projectModal.querySelector('.project-modal-close');
        const overlay = projectModal.querySelector('.project-modal-overlay');
        const tabs = projectModal.querySelectorAll('.pm-tab-side');

        let currentMobile = '';
        let currentDesktop = '';

        function setImage(view) {
            const src = view === 'mobile' ? currentMobile : currentDesktop;
            const isMobile = view === 'mobile';

            modalBody.classList.toggle('is-mobile', isMobile);
            projectModal.classList.toggle('view-mobile', isMobile);

            modalImage.src = src;
            modalBody.scrollTop = 0;
        }

        function openModal(title, category, mobile, desktop, initialView) {
            modalTitle.textContent = title;
            modalCategory.textContent = category;
            currentMobile = mobile;
            currentDesktop = desktop;

            const view = initialView || 'mobile';

            tabs.forEach(t => t.classList.toggle('active', t.dataset.view === view));
            setImage(view);

            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeProjectModal() {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                modalImage.src = '';
            }, 300);
        }

        document.querySelectorAll('.web-project, .work-item[data-project-type="web"]').forEach(function (card) {
            card.querySelectorAll('.web-preview').forEach(function (preview) {
                preview.addEventListener('click', function (e) {
                    e.stopPropagation();
                    openModal(
                        card.dataset.title,
                        card.dataset.categoryLabel,
                        card.dataset.mobile,
                        card.dataset.desktop,
                        preview.dataset.view
                    );
                });
            });

            card.addEventListener('click', function (e) {
                if (e.target.closest('.web-preview')) return;

                const isHomePageCard = card.classList.contains('work-item');

                openModal(
                    card.dataset.title,
                    card.dataset.categoryLabel,
                    card.dataset.mobile,
                    card.dataset.desktop,
                    isHomePageCard ? 'desktop' : 'mobile'
                );
            });
        });

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                setImage(tab.dataset.view);
            });
        });

        closeBtn.addEventListener('click', closeProjectModal);
        overlay.addEventListener('click', closeProjectModal);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && projectModal.classList.contains('active')) closeProjectModal();
        });
    }

    // ============ 12. Copy Email on Click ============
    document.querySelectorAll('.js-copy-email').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const email = btn.dataset.email;
            if (!email) return;

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(email)
                    .then(function () {
                        showCopyToast(email);
                    })
                    .catch(function () {
                        fallbackCopy(email);
                    });
            } else {
                fallbackCopy(email);
            }
        });
    });

    function fallbackCopy(text) {
        const tempInput = document.createElement('textarea');
        tempInput.value = text;
        tempInput.style.position = 'fixed';
        tempInput.style.top = '-1000px';
        tempInput.style.opacity = '0';
        document.body.appendChild(tempInput);
        tempInput.focus();
        tempInput.select();

        try {
            document.execCommand('copy');
        } catch (err) {
        }
        document.body.removeChild(tempInput);

        showCopyToast(text);
    }

    function showCopyToast(email) {
        const oldToast = document.querySelector('.copy-toast');
        if (oldToast) oldToast.remove();

        const toast = document.createElement('div');
        toast.className = 'copy-toast';

        toast.innerHTML = `
            <div class="copy-toast-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            <div class="copy-toast-text">
                <span class="copy-toast-title">Copied to clipboard</span>
                <span class="copy-toast-value">${email}</span>
            </div>
            <div class="copy-toast-progress"></div>
        `;

        document.body.appendChild(toast);

        setTimeout(function () {
            toast.classList.add('show');
        }, 10);

        setTimeout(function () {
            toast.classList.remove('show');
            setTimeout(function () {
                toast.remove();
            }, 400);
        }, 3000);
    }

});


// ============ Mobile Menu ============
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        const isOpen = mobileMenu.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}