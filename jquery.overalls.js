/* Overalls: Easily Customizable Overlays for Jquery v 1.4
   Released under the MIT license by Tyler Montgomery March 2010 
   http://github.com/ubermajestx/jquery.overalls
*/
(function($) {
  function Overalls(html, opts){
      overalls = this
      overalls.close = close_overalls
      overalls.opacity = 0.6
      overalls.color = "#1d1d1d"
      parse_options(opts)
      log('overalls: ', overalls)
      
      close_overalls(); // clear any existing overlays
      z_index = max_z_index() // make sure Overalls is the highest z-index'd set of divs (avoids hardcoding rediculous z-index)
      
      // add transparency to 100% of the document
      transparency_css = {
        position: 'fixed',
        top: 0,
        left:0,
        width: '100%',
        height: '100%',
        opacity: 0.0, //f ades up to specified opactiy later
        zIndex: z_index,
        background: overalls.color // option
      }
      
      transparency_div = $('<div id="overalls-transparency"></div>').css(transparency_css)
      .click(function(){close_overalls()})
      .appendTo('body')
      
      // make another completely transparent div to place the overly div inside of
      super_transparent_css = {
        position: 'absolute',
        top:0,
        left:0,
        width: '100%',
        height: '0',
        zIndex: z_index + 1,
        background: 'transparent'
      }
      super_transparent_div = $('<div id="overalls-super-transparent"></div>').css(super_transparent_css)
      .appendTo('body')
      
      // add overlay div to page
      overlay_css = {
        background: '#fff',
        color: '#1d1d1d',
        height: '350px',//remove this to resize to the content
        width: '650px',//remove this to resize to the content
        padding: '20px',
        zIndex: z_index + 2,
        opacity: 1.0
      }

      overlay_div = $('<div id="overalls-overlay"></div>')
      
      // blank mode
      if(opts.blank == true){
        // no-op, but explicitly set width of overalls-overlay later so click to close works
      }
      // css-customizable mode
      else if(opts.cssClass){
        log('adding css class', opts.cssClass)
        overlay_div.addClass(opts.cssClass)
      }
      // basic mode
      else{
        overlay_div.css(overlay_css)
      }
      overlay_div.html(html)
      .appendTo(super_transparent_div)
      
      
      // positions the overlay in the verticle center if its small enough to fit, and the horizontal center
      default_margin = {
        marginTop:$(document).scrollTop(),
        marginLeft: 'auto',
        marginRight: 'auto'
      }
      centering_margin = $(window).height()/2 - $('div#overalls-overlay').height()/2
      if(centering_margin > 0)
        default_margin.marginTop = default_margin.marginTop + centering_margin
      else
        default_margin.marginTop = default_margin.marginTop + 30
      overlay_div.css(default_margin)
       
      //set width of overalls-overlay so click to close works 
      if(opts.blank == true){
        overlay_div.css({width: $(overlay_div).children(':first').width()})
      }
      
      // Fade in the overlays
      $(transparency_div).fadeTo("slow", overalls.opacity)
      $(overlay_div).fadeTo("slow", 1.0)
    
      // bind the escape key
      $(document).bind('keyup.overalls', function(e) {
        if (e.keyCode == 27) {
          close_overalls();
        };
      });
      

      
      function close_overalls(){
        log('taking the overalls off')
        $(document).unbind('keyup.overalls')
        all_divs = $('div#overalls-transparency, div#overalls-super-transparent, div#overalls-overlay').fadeOut(600)
        setTimeout(function(){all_divs.remove()},650)
      }  
      
      function max_z_index(){
        z = 0
        $('*').each(function() {
          current = parseInt($(this).css('zIndex'));
          z = current > z ? current : z; 
        });
        return z + 1;
      }
      
      function parse_options(opts){
        if(opts.opacity)
          overalls.opacity = opts.opacity
        if(opts.color)
          overalls.color = opts.color
      }

      function log() {
          if (window.console) {
              console.log.apply(console, arguments);
          }
      }
      
    } // end of Overalls

  $.overalls = function(html, opts){
    if(!opts)
      opts = {}
    var overalls = new Overalls(html, opts)
    return overalls
  }
})(jQuery);