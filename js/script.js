$(function(){
    let n=0;
    viewslide(n);
    //slide 버튼 클릭
    $('.slide-left').click(function(){
        n--;
        if(n<0){
            n=4;
        }
        viewslide(n);
    });
    $('.slide-right').click(function(){
        n++;
        if(n>4){
            n=0;
        }
        viewslide(n);
    });

    $('.small-list').hover(function(){
        $(this).find('.small-navbox').toggle();
    });
    //검색이벤트
    $('.search-select').click(function(){
        if($(this).find('.fa-solid').hasClass('fa-angle-down')){
            $(this).find('.fa-solid')
                .removeClass('fa-angle-down')
                .addClass('fa-angle-up');
            $('.select-value').slideDown(100);
        }else{
            $(this).find('.fa-solid')
                .removeClass('fa-angle-up')
                .addClass('fa-angle-down');
            $('.select-value').slideUp(100);
        }
    });
    $('.select-value li').click(function(){
        const txt = $(this).text(); //선택한 text가져옴
        $('.select-value li').removeClass('active'); //li 에 모든 active가 지워짐
        $(this).addClass('active');

        $('.search-select>span').text(txt);
        $('.search-form').focus();
    });
    // 마우스 데면 색 바뀌는거 고정
    $('.slider-list li').mouseenter(function(){
        $('.slider-list li').removeClass('active');
        $(this).addClass('active');
        
    });
    
    //자동 실행
    setInterval(autoslide,10000);


    //main04 pop-cafe ajax
    $.ajax({
        type:'get',
        url: '../data/list.json',
        dataType: 'json',
        success: function(data){
            let pop = data.list;
            let li = '';
            const lists = pop.filter((item, index) => index <10);
            for(let i = 0; i<lists.length; i++){
                li +=   '<li>'+
                        '<a href="#">'+
                                '<div class="d-flex align-items-center pop-list-info">'+
                                    '<div class="img-thumb"><img src="'+pop[i].img+'" alt="1"></div>'+
                                    '<p class="pop-num">'+pop[i].num+'</p>'+
                                    '<p class="pop-text">'+pop[i].text+'</p>'+
                                    '<p class="pop-cafe-list">'+pop[i].cafename+'</p>'+
                                    '<span class="pop-comment">'+pop[i].comment+'</span>'+
                                '</div>'+
                            '</a>'+
                        '</li>';
                        //앞으로는 이렇게~
                        // `<li>
                        //     <a href="#">
                        //         <div class="d-flex">
                        //             <div class="img-thumb"><img src="${pop[i].img}" alt="1"></div>
                        //             <p class="pop-num">${pop[i].num}</p>
                        //             <p class="pop-text">${pop[i].text}</p>
                        //             <p class="pop-cafe-list">${pop[i].cafename}</p>
                        //             <span class="pop-comment">${pop[i].comment}</span>
                        //         </div>
                        //     </a>
                        // </li>`;
                $('.pop-list').html(li);
            }
        },
        error: function(request, status, error){
            console.log(error);
        }
    })
});

// 자동실행 슬라이드 넘어가는거
function autoslide(){
       let slide = $('.slide-row');
       let index = slide.index($('.zindex'));
       let n = 0;
        if(index == 4){ //4보다 높으면 0으로 초기화
            n=0;
        }else{
            n=index + 1;
        }
        viewslide(n);

}

function viewslide(n){
    $('.slide-row').removeClass('zindex');

    $('.slide-row').eq(n).addClass('zindex');
    $('.slider-list>li').css({
        opacity: 0,
        top:'30px',
        position:'relative'
    });
    $('.slider-list>li').animate({
        opacity:1,
        top: '0px'
    }, 500);
    
}
