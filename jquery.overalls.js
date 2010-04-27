/* Overalls: Easily Customizable Overlays for Jquery v 1.4
   Released under the MIT license by Tyler Montgomery March 2010 
   http://github.com/ubermajestix/jquery.overalls
*/

(function($) {

  var Overalls = function() {
  }

  $.extend(Overalls.prototype, {
    display: function(html, callback) {
      var self = this;

      var transparency = this.transparencyDiv();

      // set the css each time in case options change
      transparency.css({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.0, // fades up to specified opacity later
        display: 'block', // make sure it's visible
        zIndex: this.options.zIndex,
        background: this.options.color
      });

      var container = $('<div id="overalls-container"></div>').css({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '0',
        opacity: 0.0,
        zIndex: this.options.zIndex + 1,
        background: 'transparent'
      }).appendTo('body');

      var overlay = $('<div id="overalls-overlay"></div>').html(html);

      if(this.options.blank) {
        // noop
      }
      else {
        if(this.options.cssClass) {
          overlay.addClass(this.options.cssClass);
        }
        else {
          overlay.css({
            background: '#fff',
            color: '#1d1d1d',
            width: this.options.width,
            height: this.options.height,
            opacity: 1.0,
            padding: '10px'
          });
        }
      }

      overlay.appendTo(container);

      // set width/height/margins
      var default_margin = {
        marginTop: $(document).scrollTop(),
        marginLeft: 'auto',
        marginRight: 'auto'
      }
      var centering_margin = $(window).height() / 2 - overlay.height() / 2
      if (centering_margin > 0) {
        default_margin.marginTop = default_margin.marginTop + centering_margin
      }
      else {
        default_margin.marginTop = default_margin.marginTop + 30
      }

      overlay.css(default_margin);

      if (this.options.blank) {
        overlay.css({
          width: overlay.children(':first').width(),
          // height: overlay.children(':first').height()
        });
      }

      // now that everything's set, fade it in
      transparency.fadeTo('normal', this.options.opacity);
      container.fadeTo('normal', 1.0);

      $(document).bind('keyup.overalls', function(e) {
        if (e.keyCode == 27) {
          self.close();
        };
      });

      transparency.bind('click.overalls', function() { self.close(); });
      // overlay.bind('click.overalls', function() { return false; }); // allow clicks on the overlay

      if(callback) { callback.apply(overlay, []); };
    },

    close: function(callback) {
      $(document).unbind('.overalls');
      $('#overalls-container').fadeOut('normal', function() {
        $(this).remove();
      });
      $('#overalls-transparency')
        .unbind('.overalls')
        .fadeOut('normal', function() {
          if(callback) { callback() };
        });
    },

    isVisible: function() {
      return $('#overalls-overlay').is(':visible');
    },

    transparencyDiv: function() {
      if(!$('#overalls-transparency').length) {
        $('body').append($('<div id="overalls-transparency"></div>'));
      }
      return $('#overalls-transparency');
    }
  });

  $.overalls = function(html, opts, callback) {
    var overalls = $.overalls.instance;
    if(!overalls) { overalls = $.overalls.instance = new Overalls(); }
    overalls.options = $.extend({}, $.overalls.defaults, opts || {});

    if(overalls.isVisible()) {
      overalls.close(function() {
        overalls.display(html, callback)
      });
    }
    else {
      overalls.display(html, callback);
    }
    return overalls;
  }

  $.overalls.close = function() {
    if($.overalls.instance && $.overalls.instance.isVisible) {
      $.overalls.instance.close();
    }
  }

  $.overalls.defaults = {
    opacity: 0.5,
    color: "#000",
    zIndex: 100,
    blank: false,
    cssClass: null,
    width: '650px',
    height: '350px'
  }

  function log() {
    if (window.console) {
      console.log.apply(console, arguments);
    }
  }

})(jQuery);

