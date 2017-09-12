var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation, view1;
var stageWidth =  document.documentElement.clientWidth;
var stageHeight = document.documentElement.clientHeight;
var stageScale = stageWidth/(750/2);
function init() {
    canvas = document.getElementById("canvas");
    anim_container = document.getElementById("animation_container");
    dom_overlay_container = document.getElementById("dom_overlay_container");
    images = images||{};
    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", handleFileLoad);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(lib.properties.manifest);
}
function handleFileLoad(evt) {  
    if (evt.item.type == "image") { images[evt.item.id] = evt.result; } 
}
function handleComplete(evt) {
    var queue = evt.target;
    var ssMetadata = lib.ssMetadata;
    for(i=0; i<ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
    }
    // 这里需要把我们上面声明好导出来的类方法进行替换
    exportRoot = new lib.view1;
    stage = new createjs.Stage(canvas);
    stage.addChild(exportRoot); 
    //监听事件
    fnStartAnimation = function() {
        createjs.Ticker.setFPS(lib.properties.fps);
        createjs.Ticker.addEventListener("tick", stage);
    }       
    //处理屏幕自适应
    function makeResponsive(event)
    {
        if(stageWidth!=document.documentElement.clientWidth||stageHeight!= document.documentElement.clientHeight)
        {
            stageWidth =  document.documentElement.clientWidth;
            stageHeight = document.documentElement.clientHeight;
            if(stageWidth/stageHeight > 0.665)
            {
                stageScale = stageHeight/(1206/2);
            }
            else
            {
                stageScale = stageWidth/(750/2);
            }
 
            canvas.style.width = 750/2*stageScale + 'px';
            canvas.style.height = 1206/2*stageScale + 'px';
        }
        stage.update();
    }
    makeResponsive();   
    fnStartAnimation();
}