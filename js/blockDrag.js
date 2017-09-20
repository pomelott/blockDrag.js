	function blockDrag(obj){
		this.set={
			boxNode:"#box", //拖拽区域盒子结点，传ID,默认为#box
			dragNode:"#drag",//拖拽结点，传ID,默认为#drag
			blockW:150,   //拖拽结点的宽度，单位为像素，默认为150
			blockH:100,    //拖拽结点的高度，单位为像素，默认为100
			block:"(5,5)",    //栅格的排数和列数(排数,列数)，默认为(5,5)
			startPos:"(1,1)"   //拖拽结点的起始位置，例如(3,5)为第三排第五列,默认为(1,1)
		}
		jQuery.extend(this.set,obj);
		this.startX=this.set.startPos.substring(3,4);
		this.startY=this.set.startPos.substring(1,2);
		this.row=this.set.block.substring(1,2);
		this.col=this.set.block.substring(3,4);
		if(this.startY>this.row||this.startX>this.col){
			this.startX=1;
			this.startY=1;
		}
		this.dragId=this.set.dragNode.substring(1,this.set.dragNode.length);
		this.wrapId=this.dragId+"Wrap";
		this.wrapNode="#"+this.wrapId;
		var _this=this;
		$(this.set.dragNode).wrap("<div id='"+this.wrapId+"'></div>");
		$(this.wrapNode).css({"width":this.set.blockW+"px","height":this.set.blockH+"px","position":"absolute","top":(this.startY-1)*this.set.blockH+"px","left":(this.startX-1)*this.set.blockW+"px"});
		$(this.set.boxNode).css({"width":this.col*this.set.blockW+"px","height":this.row*this.set.blockH+"px"});
		$(this.wrapNode).mousedown(function(event){
            var boxX=parseInt($(this).css("left"));
            var boxY=parseInt($(this).css("top"));
            var startX=event.pageX;
            var startY=event.pageY;
            event.stopPropagation();
            _this.moveFn=function(event){
                var nowX=event.pageX;
                var nowY=event.pageY;        
                $(_this.wrapNode).css({"left":(boxX+nowX-startX)+"px","top":(boxY+nowY-startY)+"px"})
            }
            $(document).on("mousemove",_this.moveFn)
            if($(_this.wrapNode).get(0).setCapture){
              $(_this.wrapNode).get(0).setCapture();
            }
            $(document).mouseup(function(event){
          		var nowL=parseInt($(_this.wrapNode).css("left"));
          		var nowT=parseInt($(_this.wrapNode).css("top"));
          		var averW=_this.set.blockW/2;
          		var averH=_this.set.blockH/2;
          		var lResult=parseInt(nowL/averW);
          		var tResult=parseInt(nowT/averH);
          		lResult<0?lResult=0:null;
          		tResult<0?tResult=0:null;
          		lResult>(_this.col-1)*2?lResult=(_this.col-1)*2:null;
          		tResult>(_this.row-1)*2?tResult=(_this.row-1)*2:null;
          		if(lResult%2==0){
          			$(_this.wrapNode).animate({"left":(((lResult+2)/2)-1)*_this.set.blockW+"px"},50);
          		}
          		else{
          			$(_this.wrapNode).animate({"left":(((lResult+3)/2)-1)*_this.set.blockW+"px"},50);
          		}
          		if(tResult%2==0){
          			$(_this.wrapNode).animate({"top":(((tResult+2)/2)-1)*_this.set.blockH+"px"},50);
          		}
          		else{
          			$(_this.wrapNode).animate({"top":(((tResult+3)/2)-1)*_this.set.blockH+"px"},50);
          		}
                $(document).off("mousemove").off("mouseup");
                $(_this.wrapNode).off("mouseup");
            }) 
        })
        if($(_this.wrapNode).get(0).releaseCapture){
              $(_this.wrapNode).get(0).releaseCapture();
        }
        return false;
	}