(function($) {

  $.Thumbnails = function(el) {
    this.$el = $(el);
    this.$activeImg = this.$el.find(".gutter-images img:first-child");
    this.activate(this.$activeImg);
    this.gutterIdx = 0;
    this.$images = this.$el.find('.gutter-images img');
    // this.fillGutterImages();
    this.bindCallbacks();
   };

  $.Thumbnails.STATE_PICS = {
    'ca': [
            '<img src="./trip_images/san_leandro_sunset.jpg">', 
            '<img src="./trip_images/sacramento.jpg">',
            '<img src="./trip_images/cali2.jpg">',
            '<img src="./trip_images/cali3.jpg">',
            '<img src="./trip_images/cali4.jpg">',
            '<img src="./trip_images/cali5.jpg">'
          ]
  };

  $.Thumbnails.prototype.activate = function ($img) {
    $('div.active').html($img.clone());
  };

  // $.Thumbnails.prototype.fillGutterImages = function () {
  //   var $gutterImages = this.$el.find('.gutter-images');
  //   $gutterImages.empty();
  //   this.$images.each(function(img) {
      
  //   });
  //   for (var i = this.gutterIdx; i < this.gutterIdx + 5; i++) {
  //     $gutterImages.append(this.$images.eq(i));
  //   }
  // };

  $.Thumbnails.prototype.clickCallback = function (e) {
    var targetImage = $(e.currentTarget);
    this.$activeImg = targetImage;
    this.activate(targetImage);
  };

  // $.Thumbnails.prototype.navCallback = function (e) {
  //   var targetArrow = $(e.currentTarget);
  //   if (targetArrow.attr("id") === "right-arrow") {
  //     if (this.gutterIdx < this.$images.length - 5) {
  //       this.gutterIdx += 1;
  //     }
  //   } else {
  //     if (this.gutterIdx > 0) {
  //       this.gutterIdx -= 1;
  //     }
  //   }

  //   this.fillGutterImages();
  // };

  $.Thumbnails.prototype.enterCallback = function (e) {
    var targetImage = $(e.currentTarget);
    this.activate(targetImage);
  };

  $.Thumbnails.prototype.leaveCallback = function (e) {
    var targetImage = $(e.currentTarget);
    this.activate(this.$activeImg);
  };

  $.Thumbnails.prototype.bindCallbacks = function () {
    var img = this.$el.find(".gutter-images");
    // var navs = this.$el.find(".nav");
    img.on('click', 'img', this.clickCallback.bind(this));
    // navs.on('click', this.navCallback.bind(this));
    img.on('mouseenter', 'img', this.enterCallback.bind(this));
    img.on('mouseleave', 'img', this.leaveCallback.bind(this));
  };

  $.fn.addListeners = function(){
    this.on('click', this.activateState.bind(this));
  };

  $.fn.activateState = function(e){
    var previouslyActive = $('.toc li.active-state')[0];
    var activeState = $(e.currentTarget);
    if (previouslyActive === activeState) {
      return 0;
    } else {
      $('.toc li').removeClass('active-state');
      activeState.addClass('active-state');
      var gutter = $('.gutter-images');
      gutter.html("");
      $.Thumbnails.STATE_PICS[activeState.data('state')].forEach(function(imgString) {
        gutter.append(imgString);
      });
      $('.thumbnails').thumbnails();
    }
  };

  $.fn.thumbnails = function(){
    this.each(function() {
      new $.Thumbnails(this);
    });
  };
})(jQuery);
