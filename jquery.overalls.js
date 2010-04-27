/* Overalls: Easily Customizable Overlays for Jquery v 1.4
   Released under the MIT license by Tyler Montgomery March 2010
   http://github.com/ubermajestix/jquery.overalls
*/

(function($) {

  var Overalls = function() {
  }


  $.extend(Overalls.prototype, {

    // show a new overalls overlay
    display: function(html, callback) {
      var self = this;
      var transparency = $('#overalls-transparency');
      if(!transparency.length) {
        transparency = $('<div id="overalls-transparency"></div>').appendTo($('body'));
      }

      transparency.css({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.0, // fades up to specified opacity later
        zIndex: this.options.zIndex,
        backgroundColor: this.options.color
      });

      this.setContent(html);

      transparency.stop().fadeTo('normal', this.options.opacity)
        .bind('click.overalls', function() { self.close(); });
      $(document).bind('keyup.overalls', function(e) {
        if (e.keyCode == 27) { self.close(); };
      });

      this.showContent(callback);

    },

    // replace an existing overalls overlay
    replace: function(html, callback) {
      var self = this;
      $('#overalls-container').stop().fadeTo('normal', 0, function() {
        $(this).html('');
        self.setContent(html);
        var transparency = $('#overalls-transparency');
        transparency.stop().animate({
          zIndex: self.options.zIndex,
          opacity: self.options.opacity,
          backgroundColor: self.options.color
        });
        self.showContent(callback);
      });
    },

    // close the overalls overlay
    close: function() {
      $(document).unbind('.overalls'); // key handler
      $('#overalls-transparency')
        .unbind('.overalls') // click handler
        .stop(true)
        .fadeOut('normal');
      $('#overalls-container').stop(true).fadeOut('normal', function() {
        $(this).remove();
      });
    },

    setContent: function(html) {
      var container = $('#overalls-container');
      if(!container.length) {
        container = $('<div id="overalls-container"></div>').css({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '0',
          opacity: 0.0,
          background: 'transparent'
        }).appendTo('body');
      }

      container.css({zIndex: this.options.zIndex + 1 });

      var overlay = $('#overalls-overlay');
      if(!overlay.length) {
        overlay = $('<div id="overalls-overlay"></div>');//.appendTo(container);
      }
      overlay.html(html);

      if(this.options.blank) { } // noop
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

      container.html(overlay);
      // overlay.appendTo(container);

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

    },

    showContent: function(callback) {
      $('#overalls-container').stop().fadeTo('normal', 1.0, function() {
        if(callback) { callback.apply($('#overalls-overlay'), []); };
      });
    },

    isVisible: function() {
      return $('#overalls-overlay').is(':visible');
    },

  });

  $.overalls = function(html, opts, callback) {
    var overalls = $.overalls.instance;
    if(!overalls) { overalls = $.overalls.instance = new Overalls(); }
    overalls.options = $.extend({}, $.overalls.defaults, opts || {});

    if(overalls.isVisible()) {
      overalls.replace(html, callback);
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

