/* Overalls: Easily Customizable Overlays for Jquery v 1.4
   Released under the MIT license by Tyler Montgomery March 2010 
   http://github.com/ubermajestx/jquery.overalls
*/
(function($) {
  function Overalls(message){
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
      window_size = { width: $(window).width(), height: $(window).height()}
      log(window_size)
      
      transparency_css = {
        position: 'absolute',
        top: 0,
        left:0,
        width: window_size.width,
        height: window_size.height, 
        opacity: 0.6,
        background: '#1d1d1d'
      }
      $('<div id="overalls-transparency" style=""></div>').css(transparency_css)
      .click(close_overalls()).appendTo('body')
      // add transparency to 100% of the document
      // add overlay div to page
      // 
      // concerns: 
      //   multiple overlays
      //   scrolling
      // 
      
      document.onkeyup = (function(e) {
        if (e.keyCode == 27) {
          close_overalls();
        };
      });
      
    function close_overalls(){
      //TODO animate
      $('div#overalls-transparency, div#overalls-overlay').remove
    }  
    
    
    function log() {
        if (window.console) {
            console.log.apply(console, arguments);
        }
    }
    
    }
  $.overalls = function(message){
    var overalls = new Overalls(message)
    return overalls
  }
})(jQuery);