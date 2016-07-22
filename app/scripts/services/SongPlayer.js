 (function() {
     function SongPlayer() {
         var SongPlayer = {};

         var currentSong = null;
         var currentBuzzObject = null;

         /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
         var setSong = function(song) {
             if (currentBuzzObject) {
                 currentBuzzObject.stop();
                 currentSong.playing = null;
             }
             /**
              * @desc Buzz object audio file
              * @type {Object}
              */
             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });

             currentSong = song;
         };
         /**
          * @function SongPlayer.play
          * @desc Plays or pauses song depending on current playing state
          * @param {Object} song
          */
         SongPlayer.play = function(song) {

             if (currentSong !== song) {
                 if (currentBuzzObject) {
                     currentBuzzObject.stop();
                     currentSong.playing = null;
                 }

                 currentBuzzObject = new buzz.sound(song.audioUrl, {
                     formats: ['mp3'],
                     preload: true
                 });
                 currentSong = song;
                 setSong(song);

                 SongPlayer.playSOng(song);

             } else if (currentSong === song) {
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
             currentBuzzObject.pause();
             song.playing = false;
         };
         /**
          * @function SongPlayer.playSong
          * @desc Plays song
          * @param {Object} song
          */
         SongPlayer.playSong = function(song){
           currentBuzzObject.play();
           song.playing = true;
         };

         return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
