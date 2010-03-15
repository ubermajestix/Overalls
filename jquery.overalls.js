/* Overalls: Easily Customizable Overlays for Jquery v 1.4
   Released under the MIT license by Tyler Montgomery March 2010 
   http://github.com/ubermajestx/jquery.overalls
*/
(function($) {
  function Overalls(html, opts){
      // alert('overalls: ' + message)
      // return false;
      // options for:
      // overalls-transparent div:
      //   opacity
      //   color
      // overalls-overlay div
      //   height
      //   width
      //   page placement
      //   css-class
      //   
      
      
      close_overalls(); //clear any existing overlays
      z_index = max_z_index() //make sure Overalls is the highest z-index'd set of divs (avoids hardcoding rediculous z-index)
      
      // add transparency to 100% of the document
      transparency_css = {
        position: 'fixed',
        top: 0,
        left:0,
        width: '100%',
        height: '100%',
        opacity: 0.0, //option
        zIndex: z_index,
        background: '#1d1d1d' //option
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
        // 'transparent'
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
        marginLeft: 'auto',
        marginRight: 'auto',
        zIndex: z_index + 2,
        opacity: 1.0
      }
      
      overlay_div = $('<div id="overalls-overlay"></div>').css({marginTop:$('body').scrollTop() + 30})
      if(opts.cssClass){
        log('adding css class', opts.cssClass)
        overlay_div.addClass(opts.cssClass)
      }
      else if(opts.blank == true){
        // no-op
      }
      else{
        overlay_div.css(overlay_css)
      }
      overlay_div.html(html)
      .appendTo(super_transparent_div)
      
      $(transparency_div).fadeTo("slow", 0.6)
      $(overlay_div).fadeTo("slow", 1.0)
    
      document.onkeyup = (function(e) {
        if (e.keyCode == 27) {
          close_overalls();
        };
      });
      
      overalls = this
      overalls.close = close_overalls
      
      function close_overalls(){
        log('taking the overalls off')
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