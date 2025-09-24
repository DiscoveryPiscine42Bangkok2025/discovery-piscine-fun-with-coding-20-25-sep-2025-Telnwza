// jQuery ScrollSpy + Smooth Scroll
(function($){
  const $smoothLinks = $('a[href^="#"]').not('[href="#"]').filter(function(){
    const href = $(this).attr('href');
    return href && href.trim().length > 1;
  });
  if ($smoothLinks.length === 0) return;

  const $navLinks = $('.floating-nav__link[href^="#"]').not('[href="#"]').filter(function(){
    const href = $(this).attr('href');
    return href && href.trim().length > 1;
  });

  const $sections = $navLinks.map(function(){
    const selector = $(this).attr('href');
    const $target = $(selector);
    return $target.length ? $target[0] : null;
  });

  let sectionTops = [];
  function updateOffsets(){
    if ($sections.length === 0) return;
    sectionTops = $.map($sections, function(el){
      const $el = $(el);
      return { id: el.id, top: Math.round($el.offset().top) };
    }).sort(function(a, b){ return a.top - b.top; });
  }

  function setActive(hash){
    if ($navLinks.length === 0) return;
    $navLinks.each(function(){
      const $link = $(this);
      const active = ($link.attr('href') === hash);
      $link.toggleClass('is-active', active)
           .attr('aria-current', active ? 'page' : 'false');
    });
  }

  $smoothLinks.on('click', function(event){
    const target = $(this).attr('href');
    const $target = $(target);
    if ($target.length){
      event.preventDefault();
      const y = Math.max(0, $target.offset().top - 16);
      $('html, body').stop().animate({ scrollTop: y }, 350, 'swing');
      setActive(target);
    }
  });

  let ticking = false;
  function onScroll(){
    if ($navLinks.length === 0 || sectionTops.length === 0) return;
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function(){
      const scrollY = $(window).scrollTop() + window.innerHeight * 0.35;
      let current = sectionTops[0] ? sectionTops[0].id : null;
      for (let i = 0; i < sectionTops.length; i++){
        if (scrollY >= sectionTops[i].top) current = sectionTops[i].id; else break;
      }
      if (current) setActive('#' + current);
      ticking = false;
    });
  }

  $(window).on('load resize', function(){ updateOffsets(); onScroll(); });
  setTimeout(function(){ updateOffsets(); onScroll(); }, 300);
  setTimeout(function(){ updateOffsets(); onScroll(); }, 1200);

  $(document).on('scroll', onScroll);
})(jQuery);
