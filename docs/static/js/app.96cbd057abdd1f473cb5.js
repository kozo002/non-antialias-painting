webpackJsonp([1],{DtaP:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),i=n("CtjL"),s=n.n(i),o=n("Dd8w"),r=n.n(o),h=n("ajhH"),c=n.n(h),u=n("//Fk"),d=n.n(u),l=n("Zrlr"),g=n.n(l),v=n("wxAW"),f=n.n(v),p=n("mvHQ"),m=n.n(p),w=n("d7EF"),x=n.n(w),M=n("Gu7T"),b=n.n(M),C=/^#?[0-9A-Fa-f]{1,2}[0-9A-Fa-f]{1,2}[0-9A-Fa-f]{1,2}$/,y=/^rgb\((\s+)?[0-9]{1,3},(\s+)?[0-9]{1,3},(\s+)?[0-9]{1,3}(\s+)?\)$/,A=function(){function t(){g()(this,t),this.canvases={}}return f()(t,[{key:"parseColor",value:function(t){var e=C.test(t),n=y.test(t);if(!e&&!n)throw new Error("Color is not correct format. #123123 or rgb(123, 123, 123) format required.");if(e){var a="#"===t[0]?t.slice(1):t;return a=3===a.length?a.split("").reduce(function(t,e){return[].concat(b()(t),[e,e])},[]).join(""):a,{r:parseInt(a.slice(0,2),16),g:parseInt(a.slice(2,4),16),b:parseInt(a.slice(4,6),16)}}if(n){var i=t.replace(/rgb|\s+|\(|\)/g,"").split(",").map(function(t){return parseInt(t)}),s=x()(i,3),o=s[0],r=s[1],h=s[2];return{r:o=o>255?255:o,g:r=r>255?255:r,b:h=h>255?255:h}}}},{key:"make",value:function(t){var e=t.size,n=t.color;try{e*=window.devicePixelRatio;var a=this.parseColor(n),i=m()(a);if(this.canvases[i]=this.canvases[i]||{},null!=this.canvases[i][e])return this.canvases[i][e];var s=document.createElement("canvas");e+=e%2,s.width=e,s.height=e;for(var o=s.getContext("2d"),r=o.createImageData(e,e),h=0;h<r.data.length;h+=4)r.data[h]=255,r.data[h+1]=255,r.data[h+2]=255,r.data[h+3]=0;return this.plotCircle(2*e,4*e*(e/2),e/2,r,e,a),this.fillCircle(r,a),o.putImageData(r,0,0),this.canvases[i][e]=s,s}catch(t){console.error(t)}}},{key:"plotCircle",value:function(t,e,n,a,i,s){var o=-n,r=0,h=2-2*n;do{var c=t-4*(o+1)+(e+4*i*(r-1));a.data[c+0]=s.r,a.data[c+1]=s.g,a.data[c+2]=s.b,a.data[c+3]=255;var u=t-r*(4*i)+(e-4*(o+1));a.data[u+0]=s.r,a.data[u+1]=s.g,a.data[u+2]=s.b,a.data[u+3]=255;var d=t+4*o+(e-r*(4*i));a.data[d+0]=s.r,a.data[d+1]=s.g,a.data[d+2]=s.b,a.data[d+3]=255;var l=t+4*i*(r-1)+(e+4*o);a.data[l+0]=s.r,a.data[l+1]=s.g,a.data[l+2]=s.b,a.data[l+3]=255,(n=h)<=r&&(h+=2*++r+1),(n>o||h>r)&&(h+=2*++o+1)}while(o<0)}},{key:"fillCircle",value:function(t,e){for(var n=4*t.width,a=1;a<t.height-1;a+=1)for(var i=!1,s=!1,o=!1,r=0;r<n;r+=4){var h=n*a+r,c=t.data[h+3],u=255===c;u&&!i?i=!0:0===c&&i?s=!0:u&&i&&s&&(o=!0),i&&s&&!o&&(t.data[h]=e.r,t.data[h+1]=e.g,t.data[h+2]=e.b,t.data[h+3]=255)}}}]),t}(),R=function(){function t(e){g()(this,t),this.canvas=e,this.context=e.getContext("2d"),this.stampMaker=new A,this.isMouseDown=!1,this.startPosition=null,this.configPixelRatio(),this.canvas.addEventListener("mouseup",this.handleCanvasMouseUp)}return f()(t,[{key:"configPixelRatio",value:function(){var t=this.canvas,e=t.width,n=t.height;this.canvas.width=e*this.dpr,this.canvas.height=n*this.dpr,this.canvas.style.width=e+"px",this.canvas.style.height=n+"px",this.context.scale(this.dpr,this.dpr),this.context.imageSnoothingEnabled=!1}},{key:"exportAsPNG",value:function(t){var e=this;return new d.a(function(n,a){try{var i=document.createElement("canvas"),s=i.getContext("2d"),o=e.canvas,r=o.width,h=o.height,c=r/e.dpr,u=h/e.dpr;i.width=c,i.height=u,s.imageSmoothingEnabled=!1,s.drawImage(e.canvas,0,0,r,h,0,0,c,u),i.toBlob(function(e){e.lastModifedDate=new Date,e.name=t,n(e)})}catch(t){a(t)}})}},{key:"handleCanvasMouseUp",value:function(){for(var t=this.context.getImageData(0,0,this.canvas.offsetWidth,this.canvas.offsetHeight),e=0;e<t.data.length;e+=4)t.data[e+3]=255;this.context.pushImageData(0,0,this.canvas.offsetWidth,this.canvas.offsetHeight)}},{key:"distanceBetween",value:function(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}},{key:"angleBetween",value:function(t,e){return Math.atan2(e.x-t.x,e.y-t.y)}},{key:"draw",value:function(t){var e=t.from,n=t.to,a=t.size,i=t.color;this.context.globalCompositeOperation="source-over",this.brush({from:e,to:n,size:a,color:i})}},{key:"erase",value:function(t){var e=t.from,n=t.to,a=t.size;this.context.globalCompositeOperation="destination-out",this.brush({from:e,to:n,size:a,color:"#000000"})}},{key:"brush",value:function(t){var e=this,n=t.from,a=t.to,i=t.size,s=t.color,o=(i-i%2)/2,r=this.stampMaker.make({size:i,color:s});if(n.x!==a.x||n.y!==a.y)for(var h=this.distanceBetween(n,a),c=this.angleBetween(n,a),u=function(t){var a=n.x+Math.sin(c)*t-o,s=n.y+Math.cos(c)*t-o;window.requestAnimationFrame(function(){e.context.drawImage(r,Math.round(a),Math.round(s),i,i)})},d=0;d<h;d+=1)u(d);else{var l=n.x-o,g=n.y-o;this.context.drawImage(r,Math.round(l),Math.round(g),i,i)}}},{key:"pixelate",value:function(){for(var t=this.canvas,e=t.width,n=t.height,a=this.context.getImageData(0,0,e,n),i=a.data,s=0;s<i.length;s+=4){var o=i[s],r=i[s+1],h=i[s+2];0===o&&0===r&&0===h||(i[s]=0,i[s+1]=0,i[s+2]=0,i[s+3]=255)}this.context.putImageData(a,0,0)}},{key:"dpr",get:function(){return window.devicePixelRatio||1}}]),t}();window.Konva.pixelRatio=window.devicePixelRatio||1;var P={Brush:"brush",Eraser:"eraser"},k={name:"App",data:function(){return{stageConfig:{},size:11,color:"#000000",brushCursorConfig:{fill:"#000000",strokeWidth:0,x:0,y:0,perfectDrawEnabled:!1,angle:360},isMouseOver:!1,Mode:P,currentMode:P.Brush,isPainting:!1,beginningPosition:null,canvas:null,context:null,isSimple:!1,isSimpleStamp:!1}},created:function(){window.addEventListener("resize",this.handleWindowResize),this.exampleImage=new Image,this.exampleImage.src=c.a,this.canvas=document.createElement("canvas"),this.canvas.width=window.innerWidth,this.canvas.height=500,this.context=this.canvas.getContext("2d"),this.pxBrush=new R(this.canvas)},mounted:function(){var t=this;this.$nextTick(function(){t.handleWindowResize()})},beforeDestroy:function(){window.removeEventListener("resize",this.handleWindowResize)},computed:{canvasOperation:function(){return this.currentMode===P.Brush?"source-over":"destination-out"},dpr:function(){return window.devicePixelRatio}},methods:{handleWindowResize:function(){var t=window.innerWidth;this.stageConfig=r()({},this.stageConfig,{width:t,height:500})},handleStageMouseOver:function(){this.isMouseOver=!0},handleStageMouseOut:function(){this.isMouseOver=!1,this.isPainting=!1},handleStageMouseMove:function(t){var e=(this.size-this.size%2)/2,n=this.$refs.stage.getStage().getPointerPosition(),a={innerRadius:e-1<0?0:e-1,outerRadius:e};if(this.brushCursorConfig=r()({},this.brushCursorConfig,a,{x:Math.round(n.x),y:Math.round(n.y)}),!this.isPainting||!this.beginningPosition)return!1;if(this.isSimple){this.context.imageSmoothingEnabled=!1,this.context.strokeStyle="#000",this.context.lineWidth=this.size,this.context.lineJoin="round",this.context.beginPath();var i=this.beginningPosition,s=i.x,o=i.y;this.context.moveTo(s,o);var h=n.x,c=n.y;this.context.lineTo(h,c),this.context.closePath(),this.context.stroke()}else if(this.isSimpleStamp){var u=n.x-e,d=n.y-e;this.context.drawImage(this.exampleImage,Math.round(u),Math.round(d))}else switch(this.currentMode){case P.Brush:this.pxBrush.draw({from:this.beginningPosition,to:n,size:this.size,color:this.color});break;case P.Eraser:this.pxBrush.erase({from:this.beginningPosition,to:n,size:this.size,color:this.color})}this.$refs.paintingCanvas.getStage().batchDraw(),this.beginningPosition=n},handleBrushRadioButtonChange:function(t){t.target.checked&&(this.currentMode=P.Brush)},handleEraserRadioButtonChange:function(t){t.target.checked&&(this.currentMode=P.Eraser)},handleStageMouseDown:function(){this.isPainting=!0,this.beginningPosition=this.$refs.stage.getStage().getPointerPosition();var t=this.currentMode===P.Brush?"draw":"erase";this.pxBrush[t]({from:this.beginningPosition,to:this.beginningPosition,size:this.size,color:this.color}),this.$refs.paintingCanvas.getStage().batchDraw()},handleStageMouseUp:function(){this.isPainting=!1,this.beginningPosition=null},handleSizeChange:function(t){this.size=parseInt(t.target.value)},handleColorChange:function(t){this.color=t.target.value},handleSaveButtonClick:function(){this.pxBrush.exportAsPNG("result.png").then(function(t){var e=URL.createObjectURL(t),n=document.createElement("a");n.download=t.name,n.href=e;var a=document.createEvent("MouseEvents");a.initMouseEvent("click"),n.dispatchEvent(a)})}}},z={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("v-stage",{ref:"stage",staticClass:"stage",attrs:{config:t.stageConfig}},[n("v-layer",{ref:"paintingCanvas"},[t.canvas?n("v-image",{attrs:{config:{image:t.canvas,x:0,y:0,width:t.stageConfig.width,height:t.stageConfig.height}},on:{mouseover:t.handleStageMouseOver,mouseout:t.handleStageMouseOut,mousemove:t.handleStageMouseMove,mousedown:t.handleStageMouseDown,mouseup:t.handleStageMouseUp}}):t._e(),t._v(" "),n("v-arc",{attrs:{config:t.brushCursorConfig}})],1)],1),t._v(" "),n("div",{staticStyle:{"margin-bottom":"100px"}},[n("label",[n("input",{attrs:{type:"radio",name:"mode"},domProps:{checked:t.currentMode===t.Mode.Brush},on:{change:t.handleBrushRadioButtonChange}}),t._v("\n      Brush\n    ")]),t._v(" "),n("label",[n("input",{attrs:{type:"radio",name:"mode"},domProps:{checked:t.currentMode===t.Mode.Eraser},on:{change:t.handleEraserRadioButtonChange}}),t._v("\n      Eraser\n    ")])]),t._v(" "),n("div",{staticStyle:{"text-align":"left"}},[t._v("\n    Size\n    "),n("input",{attrs:{type:"range",min:"1",max:"100",step:"1"},domProps:{value:t.size},on:{input:t.handleSizeChange}}),t._v("\n    "+t._s(t.size)+"\n    /\n    Color\n    "),n("input",{attrs:{type:"color"},domProps:{value:t.color},on:{change:t.handleColorChange}}),t._v(" "),n("br"),t._v(" "),n("button",{on:{click:t.handleSaveButtonClick}},[t._v("save")])])],1)},staticRenderFns:[]};var S=n("VU/8")(k,z,!1,function(t){n("DtaP")},null,null).exports;a.default.config.productionTip=!1,a.default.use(s.a),new a.default({el:"#app",components:{App:S},template:"<App/>"})},ajhH:function(t,e){t.exports="data:image/gif;base64,R0lGODlhCwALAIABAAAAAP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyOTAyMTQ3MzFBRDExMUU5OEFCRUZDODNCQjA4ODY0RSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyOTAyMTQ3NDFBRDExMUU5OEFCRUZDODNCQjA4ODY0RSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI5MDIxNDcxMUFEMTExRTk4QUJFRkM4M0JCMDg4NjRFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI5MDIxNDcyMUFEMTExRTk4QUJFRkM4M0JCMDg4NjRFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAAsACwAAAhGMgWibze2gnLRaG+qD6zhTAAA7"}},["NHnr"]);
//# sourceMappingURL=app.96cbd057abdd1f473cb5.js.map