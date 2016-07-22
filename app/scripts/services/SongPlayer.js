 (function() {
     function SongPlayer(Fixtures) {
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

             SongPlayer.currentSong = song;
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
          * @function getSongIndex
          * @desc Retrieve index of given song
          * @param {Object} song
          */
         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };
         SongPlayer.currentSong = null;
         /**
          * @function SongPlayer.play
          * @desc Plays or pauses song depending on current playing state
          * @param {Object} song
          */
         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
                 if (currentBuzzObject) {
                     currentBuzzObject.stop();
                     SongPlayer.currentSong.playing = null;
                 }

                 currentBuzzObject = new buzz.sound(song.audioUrl, {
                     formats: ['mp3'],
                     preload: true
                 });
                 SongPlayer.currentSong = song;
                 setSong(song);

                 playSong(song);

             } else if (SongPlayer.currentSong === song) {

                 if (currentBuzzObject.isPaused()) {
                     currentBuzzObject.play();
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
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };



         return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
