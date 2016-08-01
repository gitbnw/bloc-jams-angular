 (function() {
     function SongPlayer($rootScope, Fixtures) {
         var SongPlayer = {};
         /**
          * @desc album data
          * @type {Object}
          */
         var currentAlbum = Fixtures.getAlbum();
         var currentBuzzObject = null;

         /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
         var setSong = function(song) {
             if (currentBuzzObject) {
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
             }
             /**
              * @function SongPlayer.playSong
              * @desc Plays song
              * @param {Object} song
              */
             var playSong = function(song) {
                 currentBuzzObject.play();
                 song.playing = true;
             };
             /**
              * @desc Buzz object audio file
              * @type {Object}
              */
             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });
             currentBuzzObject.bind('timeupdate', function() {
                 $rootScope.$apply(function() {

                     SongPlayer.currentTime = currentBuzzObject.getTime();

                 });
             });
             currentBuzzObject.bind('ended', function() {
                 $rootScope.$apply(function() {

                     SongPlayer.next();

                 });
             });


             SongPlayer.currentSong = song;
            //  SongPlayer.volume = currentBuzzObject.getVolume();

         };

         /**
          * @function playSong
          * @desc Plays song
          * @param {Object} song
          */
         var playSong = function(song) {
             currentBuzzObject.play();
             song.playing = true;
         };
         /**
          * @function stopSong
          * @desc Stops song duh
          * @param {Object} song
          */
         var stopSong = function(song) {
             currentBuzzObject.stop();
             song.playing = null;
         };

         /**
          * @function getSongIndex
          * @desc Retrieve index of given song
          * @param {Object} song
          */
         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };
         SongPlayer.currentSong = null;
         /**
          * @desc Current playback time (in seconds) of currently playing song
          * @type {Number}
          */
         SongPlayer.currentTime = null;
         /**
          * @desc Current volume of currently playing song
          * @type {Number}
          */
         SongPlayer.volume = 80;

         /**
          * @function SongPlayer.play
          * @desc Plays or pauses song depending on current playing state
          * @param {Object} song
          */
         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
                 setSong(song);
                 playSong(song);
             } else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     playSong(song);
                 }
             }
         };
         /**
          * @function SongPlayer.pause
          * @desc Pauses song
          * @param {Object} song
          */
         SongPlayer.pause = function(song) {
             song = song || SongPlayer.currentSong;
             currentBuzzObject.pause();
             song.playing = false;
         };

         /**
          * @function SongPlayer.previous
          * @desc decrease current song index by one and play song
          */
         SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;
             if (currentSongIndex < 0) {
                 stopSong(song);
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };
         /**
          * @function SongPlayer.next
          * @desc decrease current song index by one and play song
          */
         SongPlayer.next = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;
             if (currentSongIndex === currentAlbum.songs.length - 1) {
                 stopSong(song);
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };
         /**
          * @function setCurrentTime
          * @desc Set current time (in seconds) of currently playing song
          * @param {Number} time
          */
         SongPlayer.setCurrentTime = function(time) {
             if (currentBuzzObject) {
                 currentBuzzObject.setTime(time);
             }
         };
          SongPlayer.setVolume = function(volume) {
            console.log(volume)
             if (currentBuzzObject) {
                 currentBuzzObject.setVolume(volume);
             }
         };
         return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
