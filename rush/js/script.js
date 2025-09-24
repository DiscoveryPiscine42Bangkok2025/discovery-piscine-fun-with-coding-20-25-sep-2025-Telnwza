
// jQuery ScrollSpy + Smooth Scroll
(function($){
  const $links = $('a[href^="#"]').not('[href="#"]').filter(function(){ return $(this).attr('href').trim().length > 1; }); // include hero buttons & any in-page hash links
  if ($links.length === 0) return;

  // Collect target sections
  const $sections = $links.map(function(){
    const sel = $(this).attr('href');
    const $t = $(sel);
    return $t.length ? $t[0] : null;
  });

  let sectionTops = [];
  function updateOffsets(){
    sectionTops = $.map($sections, function(el){
      const $el = $(el);
      return { id: el.id, top: Math.round($el.offset().top) };
    });
    sectionTops.sort(function(a,b){ return a.top - b.top; });
  }

  function setActive(hash){
    $links.each(function(){
      const $a = $(this);
      const active = ($a.attr('href') === hash);
      $a.toggleClass('bg-slate-800 text-blue-400', active)
        .toggleClass('text-white/85', !active)
        .attr('aria-current', active ? 'page' : 'false');
    });
  }

  // Smooth scroll on click
  $links.on('click', function(e){
    const target = $(this).attr('href');
    const $target = $(target);
    if ($target.length){
      e.preventDefault();
      const y = Math.max(0, $target.offset().top - 16); // small offset
      $('html, body').stop().animate({ scrollTop: y }, 350, 'swing');
      setActive(target);
    }
  });

  // ScrollSpy using requestAnimationFrame for performance
  let ticking = false;
  function onScroll(){
    if (ticking) return; ticking = true;
    requestAnimationFrame(function(){
      const scrollY = $(window).scrollTop() + window.innerHeight * 0.35; // bias toward viewport center
      let current = sectionTops[0]?.id || null;
      for (let i = 0; i < sectionTops.length; i++){
        if (scrollY >= sectionTops[i].top) current = sectionTops[i].id; else break;
      }
      if (current) setActive('#' + current);
      ticking = false;
    });
  }

  // Recompute offsets on load/resize/content changes
  $(window).on('load resize', function(){ updateOffsets(); onScroll(); });
  // If images/fonts load later
  setTimeout(function(){ updateOffsets(); onScroll(); }, 300);
  setTimeout(function(){ updateOffsets(); onScroll(); }, 1200);

  $(document).on('scroll', onScroll);
})(jQuery);