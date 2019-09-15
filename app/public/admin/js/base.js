$(function(){
   app.init();
});

let app = {
	init:function() {
		this.toggleAside();
	},
	toggleAside:function() {
		$('.aside h4').click(function() {
			$(this).siblings('ul').slideToggle();
		})
	},
	changeStatus:function(el,model,attr,id) {
		$.get('/admin/changeStatus',{model,attr,id},function(res) {
			if(res.code == 200) {
				if(el.src.indexOf('yes')!=-1) {
					el.src = '/public/admin/images/no.gif';
				} else {
					el.src = '/public/admin/images/yes.gif';
				}
			}
		})
	}
}
