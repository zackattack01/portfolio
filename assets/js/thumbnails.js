(function($) {

  $.Thumbnails = function(el) {
    this.$el = $(el);
    $('div.active').html("");
    if (this.$el.find('.toc li.active-state').data("state") === "tl") {
      $('div.active').html('<video class="time-lapse" controls><source src="./trip_images/CAtoNY.mp4" type="video/mp4"></video>');
    } else {
      this.$activeImg = this.$el.find(".gutter-images img:first-child");
      this.activate(this.$activeImg);
      this.gutterIdx = 0;
      this.$images = this.$el.find('.gutter-images img');
      this.bindCallbacks();
    }
   };

  $.Thumbnails.STATE_PICS = {
    'tl': [],

    'ca': [
            '<img src="./trip_images/san_leandro_sunset.jpg">', 
            '<img src="./trip_images/sacramento.jpg">',
            '<img src="./trip_images/cali2.jpg">',
            '<img src="./trip_images/cali3.jpg">',
            '<img src="./trip_images/cali4.jpg">',
            '<img src="./trip_images/cali5.jpg">'
          ],

    'nv': [
            '<img src="./trip_images/nevada1.jpg">', 
            '<img src="./trip_images/nevada2.jpg">',
            '<img src="./trip_images/nevada3.jpg">',
            '<img src="./trip_images/nevada4.jpg">',
            '<img src="./trip_images/nevada_sun1.jpg">',
            '<img src="./trip_images/nevada_sun2.jpg">',
            '<img src="./trip_images/nevada_sun3.jpg">',
            '<img src="./trip_images/nevada_sun4.jpg">',
            '<img src="./trip_images/nevada_sun5.jpg">'
          ],

    'ut': [
          '<img src="./trip_images/utah_morning.jpg">', 
          '<img src="./trip_images/utah1.jpg">', 
          '<img src="./trip_images/utah2.jpg">',
          '<img src="./trip_images/utah3.jpg">',
          '<img src="./trip_images/utah4.jpg">',
        ],

    'co': [
            '<img src="./trip_images/colorado_river.jpg">',
            '<img src="./trip_images/colorado_river2.jpg">',
            '<img src="./trip_images/colorado_denver.jpg">',
            '<img src="./trip_images/colorado1.jpg">',
            '<img src="./trip_images/colorado2.jpg">'
          ],
    
    'ne': [
            '<img src="./trip_images/nebraska1.jpg">',
            '<img src="./trip_images/nebraska2.jpg">',
            '<img src="./trip_images/nebraska3.jpg">',
            '<img src="./trip_images/nebraska4.jpg">',
            '<img src="./trip_images/nebraska5.jpg">',
            '<img src="./trip_images/nebraska6.jpg">',
            '<img src="./trip_images/nebraska7.jpg">'
          ],

    'ia': [
            '<img src="./trip_images/iowa1.jpg">',
            '<img src="./trip_images/iowa2.jpg">',
            '<img src="./trip_images/iowa3.jpg">',
            '<img src="./trip_images/iowa4.jpg">',
            '<img src="./trip_images/iowa5.jpg">',
            '<img src="./trip_images/iowa6.jpg">',
            '<img src="./trip_images/iowa7.jpg">',
            '<img src="./trip_images/iowa8.jpg">'
          ],
    
    'il': [
            '<img src="./trip_images/illinois1.jpg">',
            '<img src="./trip_images/illinois2.jpg">',
            '<img src="./trip_images/illinois3.jpg">',
            '<img src="./trip_images/illinois4.jpg">',
            '<img src="./trip_images/illinois5.jpg">',
            '<img src="./trip_images/illinois6.jpg">',
            '<img src="./trip_images/illinois7.jpg">',
            '<img src="./trip_images/illinois8.jpg">'
            ]

  };

  $.Thumbnails.prototype.activate = function ($img) {
    $('div.active').html($img.clone());
  };

  $.Thumbnails.prototype.clickCallback = function (e) {
    var targetImage = $(e.currentTarget);
    this.$activeImg = targetImage;
    this.activate(targetImage);
  };

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
    img.on('click', 'img', this.clickCallback.bind(this));
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
