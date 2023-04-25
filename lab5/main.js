let player;//YouTubePlayer
let currentPlay=0;//記錄目前撥到第幾首歌

//YouTubeAPIReady
function onYouTubeIframeAPIReady(){
    player=new YT.Player("player",{
        height:"390",
        width:"640",
        videoId:playList[currentPlay],
        playerVars:{
            autoplay:0,//是否自動撥放
            controls:0,//是否顯示控制項
            start:playTime[currentPlay][0],//開始秒數
            end:playTime[currentPlay][1],//結束秒數
            iv_load_policy:3
        },
        events:{
            onReady:onPlayerReady,
            onStateChange:onPlayerStateChange
        }
    });
}

//YouTubePlayerReady
function onPlayerReady(event){
    $("#playButton").on("click",function(){
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    });
}

      
$('#play-pause').on('click', function() {
    if (player.getPlayerState() == YT.PlayerState.PLAYING) {
      // 暫停播放器
      player.pauseVideo();
      $(this).text('播放');
    } else {
      // 播放播放器
      player.playVideo();
      $(this).text('暫停');
    }
  });
  $('#prev').on('click', function() {
    if (currentPlay > 0) {
      // 播放上一首歌曲
      currentPlay--;
    } else {
      // 回到最後一首歌曲
      currentPlay = playList.length - 1;
    }
    // 加載或預備上一首歌曲
    player.loadVideoById({
      videoId: playList[currentPlay],
      startSeconds: playTime[currentPlay][0],
      endSeconds: playTime[currentPlay][1],
      suggestedQuality: 'large'
    });
  });
  
  $('#next').on('click', function() {
    if (currentPlay < playList.length - 1) {
      // 播放下一首歌曲
      currentPlay++;
    } else {
      // 回到第一首歌曲
      currentPlay = 0;
    }
    // 加載或預備下一首歌曲
    player.loadVideoById({
      videoId: playList[currentPlay],
      startSeconds: playTime[currentPlay][0],
      endSeconds: playTime[currentPlay][1],
      suggestedQuality: 'large'
    });
  });
    
//PlayerStateChange
function onPlayerStateChange(event){
    if (Math.floor(player.getCurrentTime()) == playTime[currentPlay][1]) {
        if (currentPlay < playList.length - 1) {
          // 播放下一首歌曲
          currentPlay++;
        } else {
          // 回到第一首歌曲
          currentPlay = 0;
        }
        // 加載或預備下一首歌曲
        player.loadVideoById({
          videoId: playList[currentPlay],
          startSeconds: playTime[currentPlay][0],
          endSeconds: playTime[currentPlay][1],
          suggestedQuality: 'large'
        });
      }
      
    if(Math.floor(player.getCurrentTime())==playTime[currentPlay][1]){
        if(currentPlay<playList.length-1){
            currentPlay++;
            player.loadVideoById({
                videoId:playList[currentPlay],
                startSeconds:playTime[currentPlay][0],
                endSeconds:playTime[currentPlay][1],
                suggestedQuality:"large"
            });
        }
        else{
            currentPlay=0;
            player.cueVideoById({videoId:playList[currentPlay],
                startSeconds:playTime[currentPlay][0],
                endSeconds:playTime[currentPlay][1],
                suggestedQuality:"large"
            });
        } 
    }
    if(event.data==1){
        $("h2").text(player.getVideoData().title);
    }
}
