// var bodyClass = document.body.classList,
//     lastScrollY = 0;
// window.addEventListener('scroll', function(){
//   var st = this.scrollY;
//   // 判斷是向上捲動，而且捲軸超過 200px
//   if( st < lastScrollY) {
//     bodyClass.remove('fixed-hide');
//   }else{
//     bodyClass.add('fixed-hide');
//   }
//   lastScrollY = st;
// });


// navbar-toggle-button
jQuery(document).ready(function() {
	$('#navbarBurger').click(function (event) {
		$(this).toggleClass('close');
		$('.navbar-menu').toggleClass('is-active');
	});
	$('.top-nav > li').click(function(event) {
		$('.navbar-menu').removeClass('is-active');
		$('#navbarBurger').removeClass('close');
	});
});



// 平滑捲動毛點
$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top -80
    }, 1200, "swing");
});

// 滾動效果
$(document).ready(function() {
	$('.scroll-target').click(function() {
		event.preventDefault(); // 增加效能
		var target = $(this).attr('href');
		var targetPos = $(target).offset().top -80;

		$('html, body').animate({scrollTop: targetPos}, 1000);

	});
	var showSkill = false; // 為了讓滾動條只顯示一次，否則他會因為一直滾動的狀態重置


	// 視窗滾動
	$(window).scroll(function(){
		var scrollPos = $(window).scrollTop();
		var windowHeight = $(window).height();
		// console.log(scrollPos, windowHeight);
		// console.log(scrollPos);
		// 
		// 滾動nav錨點對應的區域
		$('.scroll-target').each(function() {
			var target = $(this).attr('href');
			var targetPos = $(target).offset().top -90;
			var targetHeight = $(target).outerHeight();// 可包含了padding的高度
			// console.log(target, targetPos, targetHeight);
			if (targetPos  <= scrollPos && (targetPos + targetHeight) > scrollPos) {
				// console.log(target);
				$(this).addClass('is-active');
			} else {
				$(this).removeClass('is-active');
			}
		});

		// progress bar
		
		var skillTop = $('#skill').position().top;
		// console.log('skillTop', skillTop);
		if (skillTop <= scrollPos + (windowHeight / 1.5)&& !showSkill) {
			// showSkill = true;
			$('#skill .progress > span').each(function() {
				var thisValue = $(this).data('progress');
				// console.log('thisValue', thisValue);
				$(this).css('width', thisValue + '%');
			});
		}

		// header show fixed
		if (scrollPos >= windowHeight +2) {
			$('body').removeClass('fixed-hide');
		}
		else {
			$('body').addClass('fixed-hide');
		}
	})
});

// timeline-animation
jQuery(document).ready(function($){
	var timelineBlocks = $('.timeline-block'),
		offset = 0.8;

	//hide timeline blocks which are outside the viewport
	hideBlocks(timelineBlocks, offset);

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		(!window.requestAnimationFrame) 
			? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
			: window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
	});

	function hideBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).addClass('is-visibility-hidden');
		});
	}

	function showBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).hasClass('is-visibility-hidden') ) && $(this).removeClass('is-visibility-hidden').addClass('is-move-in');
		});
	}
});