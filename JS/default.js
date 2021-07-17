
var playlist = [{
    artist: 'Bruno Mars',
    title: 'Grenade',
    mp3: 'songs/grenade.mp3',
    img: 'images/grenade.jpg',   
}, {
    artist: 'Dirty Heads',
    title: 'Vacation',
    mp3: 'songs/vacation.mp3',
    img: 'images/dirtyHeads.jpg',
},{
    artist: 'Imagine Dragons',
    title: 'Radioactive',
    mp3: 'songs/radioactive.mp3',
    img: 'images/radioactive.jpg'
}, {
    artist: 'Bruno Mars',
    title: 'Leave the Door Open',
    mp3: 'songs/leaveTheDoorOpen.mp3',
    img: 'images/leaveDoorOpen.png'
},
{
    artist: "Guns n' Roses",
    title: 'Sweet Child of mine',
    mp3: 'songs/SweetChildOfMine.mp3',
    img: 'https://i.scdn.co/image/ab67616d0000b27321ebf49b3292c3f0f575f0f5'
}];


var currentTrack = 0;
var numTracks = playlist.length;



var player = $(".player").jPlayer({
ready: function () {
    // configura a faixa inicial do jPlayer
    player.jPlayer("setMedia", playlist[currentTrack]);
    player.playCurrent();
    $('.musicName').text(playlist[currentTrack].artist)
    $('.singers').text(playlist[currentTrack].title);
    $('#imagej').attr("src", playlist[currentTrack].img);
    //right-side
    NextMusic();
    // Lyrics
    var artista = playlist[currentTrack].artist;
    var song = playlist[currentTrack].title;
    const url = 'https://api.vagalume.com.br/search.php' + "?art=" + artista + "&mus=" + song + "&apikey={93ce12cc311d1bd8d8b752ff65f6a84a}";
    function PegarLetra(){
        fetch(url)
        .then((Response) => Response.json())
        .then(function(data){
            //Musica normal
            var musicLetter = data.mus[0].text;
            let subMusic = musicLetter.replace(/[\n]+/g, '<br>');
            $('.letter').html(subMusic);

            //Musica traduzida
            var musicaTraduzida = data.mus[0].translate[0].text;
            let subTraduzida = musicaTraduzida.replace(/[\n]+/g, '<br>');
            $('.translate').click(function(){
                $('.letter').html(subTraduzida);
            });
            $('.original').click(()=>{
                $('.letter').html(subMusic);
            });
        });
    }
    PegarLetra();
    },
    ended: function() {
        $(this).playNext();
    },
    play: function(){
    //left-side
    $('.musicName').text(playlist[currentTrack].artist)
    $('.singers').text(playlist[currentTrack].title);
    $('#imagej').attr("src", playlist[currentTrack].img);
    //right-side
    NextMusic();
    var artista = playlist[currentTrack].artist;
    var song = playlist[currentTrack].title;
    const url = 'https://api.vagalume.com.br/search.php' + "?art=" + artista + "&mus=" + song + "&apikey={93ce12cc311d1bd8d8b752ff65f6a84a}";
    function PegarLetra(){
        fetch(url)
        .then((Response) => Response.json())
        .then(function(data){
            console.log(data);
            //Musica normal
            var musicLetter = data.mus[0].text;
            let subMusic = musicLetter.replace(/[\n]+/g, '<br>');
            $('.letter').html(subMusic);
            //Musica traduzida
            var musicaTraduzida = data.mus[0].translate[0].text;
            let subTraduzida = musicaTraduzida.replace(/[\n]+/g, '<br>');

            $('.translate').click(function(){
                $('.letter').html(subTraduzida);
            }); 
            $('.original').click(()=>{
                $('.letter').html(subMusic);
            });
        });
    }
    PegarLetra();
    },
    swfPath: 'js/plugins/jplayer',
    supplied: "mp3",
    cssSelectorAncestor: "",
    cssSelector: {
        play: '.player-play',
        pause: ".player-pause",
        stop: ".player-stop",
        seekBar: ".player-timeline",
        playBar: ".player-timeline-control"
    },
    size: {
        width: "1px",
        height: "1px"
    }
});

player.playCurrent = function() {
player.jPlayer("setMedia", playlist[currentTrack]).jPlayer("play");
}

player.playNext = function() {
currentTrack = (currentTrack == (numTracks -1)) ? 0 : ++currentTrack;
player.playCurrent();
};

player.playPrevious = function() {
    currentTrack = (currentTrack == 0) ? numTracks - 1 : --currentTrack;
    player.playCurrent();
};

$('.player-next').click(function() {
player.playNext();
});

$('.player-prev').click(function() {
player.playPrevious();
});

$('.btn').click(function(){
$('.letter').toggle();
});

function NextMusic(){
    if (currentTrack < 4){
        $('.title').text(playlist[currentTrack + 1].title);
        $('.author').text(playlist[currentTrack + 1].artist);
        $('.imageLeft1').attr("src", playlist[currentTrack + 1].img);
    }else{
        $('.title').text(playlist[currentTrack - 4].title);
        $('.author').text(playlist[currentTrack - 4].artist);
        $('.imageLeft1').attr("src", playlist[currentTrack - 4].img);
    }
}








    
