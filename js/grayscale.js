// On window load. This waits until images have loaded which is essential
	jQuery(document).ready(function($) {
		var aho_opacity = parseInt(grayscale_vars.opacity_js)*1000;
		var aho_color   = parseInt(grayscale_vars.color_js);
		var aho_color = 0;
	$(window).load(function(){
		
		// Fade in images so there isn't a color "pop" document load and then on window load
		$(".item-gray img").fadeIn(aho_opacity);
		
		// clone image
		$('.item-gray img').each(function(){
			var el = $(this);
			el.css({"position":"absolute"}).wrap("<div class='img_wrapper' style='display: inline-block; float: left; padding:0 15px 15px 0;'>").clone().addClass('img_grayscale').css({"position":"absolute","z-index":"998","opacity":"0"}).insertBefore(el).queue(function(){
				var el = $(this);
				el.parent().css({"width":this.width,"height":this.height});
				el.dequeue();
			});
			//if(ppg_color == 1){
			this.src = grayscale(this.src);
		//}
		});
		
		// Fade image 
		$('.item-gray img').mouseover(function(){
			$(this).parent().find('img:first').stop().animate({opacity:1}, aho_opacity);
		})
		$('.img_grayscale').mouseout(function(){
			$(this).stop().animate({opacity:0}, aho_opacity);
		});		
	});
	
	// Grayscale w canvas method
	function grayscale(src){
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var imgObj = new Image();
		imgObj.src = src;
		canvas.width = imgObj.width;
		canvas.height = imgObj.height; 
		ctx.drawImage(imgObj, 0, 0); 
		var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
		for(var y = 0; y < imgPixels.height; y++){
			for(var x = 0; x < imgPixels.width; x++){
				var i = (y * 4) * imgPixels.width + x * 4;
				var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
				imgPixels.data[i] = avg; 
				imgPixels.data[i + 1] = avg; 
				imgPixels.data[i + 2] = avg;
			}
		}
		ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
		return canvas.toDataURL();
    }
});