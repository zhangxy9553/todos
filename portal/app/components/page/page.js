getPage = function(url, page, pageSize, total){
   this.url = url;
   this.page = page;
   this.pageSize = pageSize;
   this.total = total;
   console.log(url);
   console.log(page);
   console.log(pageSize);
   console.log(total);

   if(this.total % this.pageSize === 0){
      this.pageCount = parseInt(this.total/this.pageSize);
   }else {
     this.pageCount = parseInt(this.total/this.pageSize) + 1;
   }
   this.page = (this.page>(parseInt(this.pageCount)-1))?(parseInt(this.pageCount)-1):this.page;
   this.page = (this.page<0)?0:page;

   if((this.page-1)>0){
     this.prev = this.page-1
   }else {
     this.prev = 0;
   }
   this.next = parseInt(this.page) + 1;
   if(this.next >= this.pageCount){
     this.next = parseInt(this.pageCount) - 1;
   }

   //保留url原来参数，去掉page参数
   if(this.url.indexOf("/page/")>0){
        console.log("===exit===");
     	var urlArr = this.url.split("/page/");
  	var lastUrl = urlArr[1];
  	var pageIndex = lastUrl.indexOf("/");
   	var endUrl = lastUrl.substr(pageIndex+1);
   	this.url = urlArr[0]+ endUrl;
   }
   var prevPageShow = parseInt(this.prev)+1;
   var nextPageShow = parseInt(this.next)+1;
   var currentPageShow = parseInt(this.page)+1;

   //return {prevPage:this.prev,nextPage:this.next,pageCount:this.pageCount,url:this.url,current:this.page,pageShowArr:this.pageShowArr,pageShowCount:this.pageShowCount};
   return {prevPage:this.prev,nextPage:this.next,pageCount:this.pageCount,url:this.url,current:this.page,prevShow:prevPageShow,nextShow:nextPageShow,currentShow:currentPageShow };
}



module.exports.getPageHtml = function(url, page, pageSize, total){
  if(total <= 0){
    return '';
  }else{
  var page = getPage(url, page, pageSize, total);
  console.log(page);
  var pageHtml = '<div class="pruchasePages">'
 +'<div class="pages"><!-- 此内容用于PC端分页 -->'
   +'<a href="'+page.url+'/page/0/">首 页</a>';
   if(page.current > 0 && page.prevPage != page.Current){
	pageHtml += '<a href="'+page.url+'/page/'+page.prevPage+'/">上一页</a>';
   }
   if(page.current > 1){
	pageHtml +='<span>...</span>';
   }
   if(page.current > 0 && page.prevPage != page.Current){
	pageHtml += '<a href="'+page.url+'/page/'+page.prevPage+'/">'+page.prevShow+'</a>';
   }
   pageHtml += '<a href="javascript:;" class="active">'+page.currentShow+'</a>';
   if(page.currentShow < page.pageCount && page.nextPage != page.Current){
	pageHtml +='      <a href="'+page.url+'/page/'+page.nextPage+'/">'+page.nextShow+'</a>';
   }
   if(page.current < page.pageCount-2){
	pageHtml +='<span>...</span>';
   }
   if(page.currentShow < page.pageCount && page.nextPage != page.Current){
	pageHtml += '<a href="'+page.url+'/page/'+page.nextPage+'/">下一页</a>';
   }
   pageHtml +='<a href="'+page.url+'/page/'+eval(page.pageCount-1)+'/">末 页</a>'
+'  </div>'
+'  <div class="visible-elements loading"><!-- 此内容用于手机页面加载 -->'
+'    <span>正在加载...</span>'
+'    <span style="display:none">加载完毕</span><!-- 加载最后一页显示 -->'
+'  </div>'
+'</div>';
  }
  return pageHtml;
}
