/**List to done
 * Render song
 * Scroll top
 * Play / pause/ seek
 * Cd rotate
 * Next/ previous
 * Random song
 * Next/ repeat when ended
 * Active song
 * Scroll active song into view
 * Play song when click
 * 
 * ----------------------------------------------------------------
 * List need to do to update this app
 * Remove playlist to Button menu
 * Show/ hide playlist
 * add volume bar
 * menu to button in song 
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//const PLAYER_STORAGE_KEY ='MINH_PLAYER' ;

const dashboard = $('.dashboard');
const heading = $('.nav__content-name');
const slideImage = $('.slide__img');
const audio = $('#audio');
const slide = $('.slide');
const progress = $('#progress')
const playBtn = $('.nav__icon-play');
const nextBtn = $('.nav__icon-next');
const backBtn = $('.nav__icon-back');
const repeatBtn = $('.nav__icon-repeat');
const randomBtn = $('.nav__icon-random');
const playList = $('.playlist');

const app = {
    currentIndex: 0,
    isPlaying: false, 
    isRepeat: false,
    isRandom: false,
    //config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name:'On my way',
            singer: 'Alan Walker',
            path: './asset/song/song_1.mp3',    
            image:'./asset/img/song_1.png'
        },
        {
            name:'Dark side',
            singer: 'Alan Walker',
            path: './asset/song/song_2.mp3',
            image:'./asset/img/song_2.jpg'
        },
        {
            name:'Lily',
            singer: 'Alan Walker',
            path: './asset/song/song_3.mp3',
            image:'./asset/img/song_3.jpg'
        },
        {
            name:'Faded',
            singer: 'Alan Walker',
            path: './asset/song/song_5.mp3',
            image:'./asset/img/song_5.jpg'
        },
        {
            name:'The Drum',
            singer: 'Alan Walker',
            path: './asset/song/song_6.mp3',
            image:'./asset/img/song_6.jpg'
        },
        {
            name:'Lily',
            singer: 'Alan Walker',
            path: './asset/song/song_3.mp3',
            image:'./asset/img/song_3.jpg'
        },
        {
            name:'Faded',
            singer: 'Alan Walker',
            path: './asset/song/song_5.mp3',
            image:'./asset/img/song_5.jpg'
        },
        {
            name:'The Drum',
            singer: 'Alan Walker',
            path: './asset/song/song_6.mp3',
            image:'./asset/img/song_6.jpg'
        },
        {
            name:'Alone',
            singer: 'Alan Walker',
            path: './asset/song/song_7.mp3',
            image:'./asset/img/song_7.jpg'
        },
        {
            name:'Price tag',
            singer: 'Jessie J',
            path: './asset/song/song_4.mp3',
            image:'./asset/img/song_4.jpg'
        },
        {
            name:'Lily',
            singer: 'Alan Walker',
            path: './asset/song/song_3.mp3',
            image:'./asset/img/song_3.jpg'
        },
        {
            name:'Faded',
            singer: 'Alan Walker',
            path: './asset/song/song_5.mp3',
            image:'./asset/img/song_5.jpg'
        },
        {
            name:'The Drum',
            singer: 'Alan Walker',
            path: './asset/song/song_6.mp3',
            image:'./asset/img/song_6.jpg'
        },
        {
            name:'Alone',
            singer: 'Alan Walker',
            path: './asset/song/song_7.mp3',
            image:'./asset/img/song_7.jpg'
        }
    ],
    //setConfig: function(key, value) {
    //    this.config[key] = value;
    //    localStorage.setItem('PLAYER_STORAGE_KEY', JSON.stringify(this.config));
    //},
    render: function(songs){
        var htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data_index = ${index}>
                <img src="${song.image}" alt="poster"class="song__img">
                
                <div class="song__content">
                    <h3 class="song__name">${song.name}</h3>
                    <p class="song__description">${song.singer} </p>
                </div>
                
                <div class="song__extension">
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
                `;
            });
            
            playList.innerHTML = htmls.join('');
        },
    
    //it helped you defined the Property to save the element
    definedProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex];
            },
        })
        
    },
    
    handleEvents: function(){
        const slideWidth = slide.offsetWidth;

        //Xu ly slideImage quay rotate
        const slideAnimate = slideImage.animate([
            { transform: 'rotate(360deg)'}
        ],{
            duration: 10000, //10s
            iterations: Infinity //vo han   
        })
        slideAnimate.pause()
        
        //Xử lý scroll top: phóng to thu nhỏ slide
        // document.onscroll = function(){
        //     const scrollTop = window.scrollY || document.documentElement.scrollTop
        //     const newSlideWidth = slideWidth - scrollTop; 

            
        //     //set cho kích thước của slide giảm dần khi scroll --> và kiểm tra giá trị lớn hơn 0 hay k(là kiểm tra loại trừ số âm, khi do mình scroll nhanh quá)
        //     slide.style.width = newSlideWidth > 0 ? + newSlideWidth +'px': 0;
        //     //set cho nó khi thu nhỏ sẽ mờ dần dựa theo tỉ lệ kích thước thay đổi
        //     slide.style.opacity = newSlideWidth / slideWidth;
            
        // }

        

        //Xử lý khi onclick play
        playBtn.onclick = function(){
            if(app.isPlaying){
                audio.pause();
            }
            else {
                audio.play();
            }
        }

        //When the song is playing
        audio.onplay = function(){
            app.isPlaying = true;
            dashboard.classList.add('playing');
            slideAnimate.play();
        }
        //When the song paused
        audio.onpause = function(){
            app.isPlaying = false;
            dashboard.classList.remove('playing');
            slideAnimate.pause();
        }
        //Khi tien do bai hat thay doi - progress bar
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent;
            }
        }   
        //khi tua tien do bai hat - progress seek
        progress.oninput = (e) => {
            const seekTime = audio.duration /  100 * e.target.value;
            audio.currentTime = seekTime;
        }
        //Khi next song
        nextBtn.onclick = function(){
            if(app.isRandom){
                app.playRandomSong();
            }else{
                app.nextSong();
            }
            audio.play();
            app.render();
            app.scrollToActiveSong();
        }
        //khi back song
        backBtn.onclick = function(){
            if(app.isRandom){
                app.playRandomSong();
            }else{
                app.backSong();
            }
            audio.play();
            app.render();
            app.scrollToActiveSong();
        }
        //random song: handle when on or off button is clicked
        randomBtn.onclick = function(){
            app.isRandom = !app.isRandom;
            //app.setConfig('isRandom',app.isRandom)
            randomBtn.classList.toggle('active', app.isRandom);
            
        }
        //repeat song
        repeatBtn.onclick = function(){
            app.isRepeat =!app.isRepeat;
            //app.setConfig('isRepeat',app.isRepeat);
            repeatBtn.classList.toggle('active', app.isRepeat)
        }

        //handle when audio ended
        audio.onended = function(){
            if(app.isRepeat){
                audio.play();
            }else{
                nextBtn.click();
            }
        }

        //lang nghe hanh vi click vao playlist: ca truong hop them bai hat moi vao DOM
        playList.onclick = (e) =>{
            //closest: except the song is active, just on song not active or Btn extension
            const songNotActive = e.target.closest('.song:not(.active)');
            const btnInSong = e.target.closest('.song__extension');
            if(songNotActive || btnInSong){
                //need to get the index of the song:  data_index = (${index})
                //Handle when click on song
                if(songNotActive){
                    app.currentIndex = Number(songNotActive.getAttribute('data_index'))
                    //console.log(songNotActive.dataset.index = songNotActive.getAttribute('data_index'));
                    app.loadCurrentSong();
                    app.render();
                    audio.play();
                }
                //Handle when click on Btn
                if(btnInSong){

                }
            }
        }
        
        

    },

    //scroll to active song
    scrollToActiveSong:function(){
        setTimeout(()=> {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',

            });
        }, 300 )
    },

    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name;
        slideImage.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    //loadConfig: function(){
    //    this.isRandom = this.config.isRandom;
    //    this.isRepeat = this.config.isRepeat;
    //},

    nextSong: function(){
        this.currentIndex ++;   //tang index cua bai hat len
        if(this.currentIndex >= this.songs.length ){
            this.currentIndex = 0;
        }
        this.loadCurrentSong() // khi ket thuc bai hat thi load bai moi len
    },

    backSong: function(){
            //giam index cua bai hat len
        if(this.currentIndex > 0){
            this.currentIndex --;
        }else{
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong() // khi ket thuc bai hat thi load bai moi len
    },
    
    playRandomSong: function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random( ) * this.songs.length)
        } while (newIndex === this.currentIndex) //except the case when newIndex = oldIndex(this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong() 
    },

    //playRepeatSong: function(){
    //    this.currentIndex = this.currentIndex;
    //    this.loadCurrentSong();
    //},

    start: function(){
        //gan cau hinh tu config vao app
        //this.loadConfig();
        //Định nghĩa các thuộc tính cho object
        this.definedProperties();
        //lắng nghe và xử lý các sự kiện (Dom event)
        this.handleEvents();
        //Tải thông tin bài hát đầu tiên vào UI (user interface) khi chạy ứng dụng
        this.loadCurrentSong();
        //render các playlist
        this.render();

        //Hiển thị trạng thái ban đầu của button random and repeat
        //randomBtn.classList.toggle('active', this.isRandom);
        //repeatBtn.classList.toggle('active', this.isRepeat);
    
    }
}
// /
app.start();