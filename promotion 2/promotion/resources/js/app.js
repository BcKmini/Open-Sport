$(document).ready(function() {
    $('#fullpage').fullpage({
        //네비게이션 설정
        navigation: true,   
        navigationPosition: 'right',
        navigationTooltips: ['sec1', 'sec2', 'sec3', 'sec4', 'sec5'],
        showActiveTooltip:true,
        //섹션 설정
        anchors: ['section1','section2','section3','section4','section5'],
        sectionsColor: ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'],
        // 스크롤 및 애니메이션
        autoScrolling: true,
        scrollingSpeed: 900,
        css3: true,
        slidesNavigation: true,
        controlArrows: true,
        //앵커 애니메이션 활성화
        animateAnchor:true,

        
        // h1로고 클릭하면 1페이지로 이동
        // $("").on("click", function(){
        //     $.fn.fullpage.moveTo(1);
        // });
    });
    // 모바일 환경에서 일반 스크롤 활성화
    if ($(window).width() <= 1024) {
        $.fn.fullpage.setAutoScrolling(false); // 일반 스크롤 활성화
        $.fn.fullpage.setFitToSection(false); // 섹션 맞춤 비활성화
    }

    // 창 크기 변경 시 반응형 처리
    $(window).on('resize', function () {
        if ($(window).width() <= 1024) {
            $.fn.fullpage.setAutoScrolling(false);
            $.fn.fullpage.setFitToSection(false);
        } else {
            $.fn.fullpage.setAutoScrolling(true);
            $.fn.fullpage.setFitToSection(true);
        }
    });
    
    $('.menu_btn').click(function() {
        $(this).find('i').toggleClass('fa-bars fa-times');
        $('.top_util li').slice(0, 3).toggle();
        $('.menu_btn').toggleClass('m_menu_btn');
        $('.gnb').toggleClass('m_gnb');
    });

    $('.gnb li').click(function() {
        $(this).find('.sub').slideToggle();   
        var t = $(this).find('.sub'); 
        $('.sub').not(t).slideUp();
    });
    
    var max_h = 0;
    $(".sub").each(function () {
        var h = parseInt($(this).css("height"));
        if (max_h < h) {
            max_h = h;
        }
    });

    $('.gnb').mouseenter(function () {
        var menuHeight = $('#header').outerHeight();
        $('.hd_bg').css({
            'top': menuHeight + 'px',
            height: max_h + 30 + 'px',
        });
        $('#header').addClass('open');
    });
    
    $('.gnb').mouseleave(function () {
        $('.hd_bg').css('height', '0');
        $('#header').removeClass('open');
    });
    
    $('.gnb > li').mouseenter(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });
    
    $('.gnb > li').mouseleave(function () {
        $(this).removeClass('active');
    });
    
    // 메인 비주얼 swiper
    var swiper = new Swiper(".main_swiper", {
        speed : 1500,
        autoplay: {delay: 3000},
        allowTouchMove: true,                
        loop: true,
        mousewheel: false,
        watchSlidesProgress: true,
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper_nav_next",
            prevEl: ".swiper_nav_prev",
        }
    });

    // 메인 탭 메뉴
    var tNum = 0; // 현재 메인 탭 번호
    var tabBtn = $(".tab-btn");
    var tabContent = $(".tab-content");

    // 메인 탭 클릭 및 더블 클릭 이벤트
    tabBtn.on('click dblclick', function (e) {
        var className = $(this).attr("class").split(" ")[1]; // 'menu_0'과 같은 클래스 가져오기

        if ($(this).hasClass('on')) return; // 이미 활성화된 탭이면 아무 작업도 하지 않음

        tabSelect(className);
    });

    // 메인 탭 선택 함수
    function tabSelect(className) {
        tabBtn.removeClass('on');
        $("." + className).addClass('on'); // 클릭된 탭에 'on' 클래스 추가
        tabContent.removeClass('current');
        $(".tab-content." + className).addClass('current'); // 해당 콘텐츠 표시
        tNum = className;

        // 모든 중첩 탭의 첫 번째 탭을 초기화
        nestedTabReset(); 
    }

    // 메인 탭 초기 설정
    tabSelect("menu_0");

    // 중첩 탭 클릭 및 더블 클릭 이벤트
    var nestedTabBtn = $(".nested-tab-btn");
    var nestedTabContent = $(".nested-tab-content");

    nestedTabBtn.on('click dblclick', function (e) {
        var className = $(this).attr("class").split(" ")[1]; // 'nested_menu_0'과 같은 클래스 가져오기

        if ($(this).hasClass('on')) return; // 이미 활성화된 탭이면 아무 작업도 하지 않음

        nestedTabSelect(className, $(this));
    });

    // 중첩 탭 선택 함수
    function nestedTabSelect(className, tab) {
        tab.siblings().removeClass('on');
        tab.addClass('on'); // 클릭된 중첩 탭에 'on' 클래스 추가
        nestedTabContent.removeClass('current');
        $(".nested-tab-content." + className).addClass('current'); // 해당 중첩 콘텐츠 표시
    }
   
    // 모든 메인 탭의 첫 번째 중첩 탭 초기화 함수
    function nestedTabReset() {
        $(".tab-content").each(function () {
            var firstNestedTab = $(this).find(".nested-tab-btn:first");
            if (firstNestedTab.length > 0) {
                var nestedClassName = firstNestedTab.attr("class").split(" ")[1];
                firstNestedTab.siblings().removeClass('on');
                firstNestedTab.addClass('on');
                $(this).find(".nested-tab-content").removeClass('current');
                $(this).find(".nested-tab-content." + nestedClassName).addClass('current');
            }
        });
    }

    nestedTabReset();

    // 공지사항 스와이퍼
    new Swiper('.notice_swiper_wrap', {
        init: true,
        initalSlide:0,
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20,
        loop: true,
        loopedSlides:0,
        speed:1000,
        loopFillGroupWithBlank: true,
        navigation: {
            nextEl: '.swiper-notice-next',
            prevEl: '.swiper-notice-prev',
        },
        pagination: {
            el: ".notice-swiper-pagination",
            clickable: true,
        },
        breakpoints: {
        1024: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
        768: {
            slidesPerView: 1,
            slidesPerGroup: 1,
        },
    },
    });
});
