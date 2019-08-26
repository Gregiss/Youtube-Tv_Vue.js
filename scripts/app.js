var enter = new Audio("./audio/cross-enter.mp3" );
var light = new Audio("./audio/same-light.mp3" );
var toggle = new Audio("./audio/same-toggle.mp3" );
var block = new Audio("./audio/same-heavy.mp3");
var air = new Audio("./audio/airstream_move.mp3");

function playToogle(){
	toggle.play();
	setTimeout(function(){
	toggle.pause();
	toggle.currentTime = 0;
	}, 300);
}

function playBlock(){
	block.play();
	setTimeout(function(){
	block.pause();
	block.currentTime = 0;
	}, 300);
}

function playlight(){
	light.play();
	setTimeout(function(){
    light.pause();
    light.currentTime = 0;
	}, 300);
}

function playenter(){
	enter.play();
	setTimeout(function(){
    enter.pause();
    enter.currentTime = 0;
	}, 300);
}

function playair(){
	air.play();
	setTimeout(function(){
    air.pause();
    air.currentTime = 0;
	}, 400);
}

var app = new Vue({
    el: "#app",
    data: {
        youtube: null,
        youtubeLinks: [
        {"name" : "search", "icon" : "fas fa-search", "have_icon" : true, "acessou" : false, "dentro": false},
        {"name" : "home", "icon" : "fas fa-home", "have_icon" : true, "acessou" : true,  "dentro": false},
        {"name" : "settings", "icon" : "fas fa-cogs", "have_icon" : true, "acessou" : false,  "dentro": false}
        ],
        logo: "NekoApp",
        youtubeAcess: {"id": 1, "dentro": false},
        termSearchs: [],
        videos: [],
        imVideo: -1,
        scrollX: 0,
        load: false,
        generers: [{"id": 0, "name": "Animes"}],
        where: 0,
        mobile: false,
        searchAnimes: [],
        searchText: "",
        nightMode: true,
        animeView: false,
        animeViewTs: []
    },
    mounted(){
        document.title = this.logo;
        this.nightMode = localStorage.nightMode ? JSON.parse(localStorage.nightMode): []
        this.getJson()
        this.load = true
        var width = screen.width
        if (width <= 1000){
            this.mobile = true
        } else{
            this.mobile = false
        }
    },
    methods: {
        getJson(){
            fetch("./animes.json")
            .then(r => r.json())
            .then(json => {
            this.videos=json;
            });
        },
        acessar(link){
            playToogle()
            for(var i = 0; i < this.youtubeLinks.length;i++){
                this.youtubeLinks[i].acessou = false
                this.youtubeLinks[i].dentro = false
            }
            const index = this.youtubeLinks.indexOf(link)
            link.acessou = true
            this.youtubeLinks[index] = link
            this.youtubeAcess.id = index
            this.youtubeAcess.dentro = false
            localStorage.youtubeLinks = JSON.stringify(this.youtubeLinks)
        },
        keyBoard(e){
            if(e.which == 38){
                if(!this.youtubeAcess.dentro){
                    if(this.youtubeAcess.id > 0){
                        this.youtubeAcess.id--
                        playToogle()
                        for(var i = 0; i < this.youtubeLinks.length;i++){
                            this.youtubeLinks[i].acessou = false
                        }
                        this.youtubeLinks[this.youtubeAcess.id].acessou = true
                    } else{
                    }
                }
            }
            if(e.which == 40){
                if(!this.youtubeAcess.dentro){
                    if(this.youtubeAcess.id < this.youtubeLinks.length - 1){
                        this.youtubeAcess.id++
                        playToogle()
                        for(var i = 0; i < this.youtubeLinks.length;i++){
                            this.youtubeLinks[i].acessou = false
                        }
                        this.youtubeLinks[this.youtubeAcess.id].acessou = true
                    } else{
                        playBlock()
                    }
                }
            }
            if(e.which == 39){
                if(!this.youtubeAcess.dentro){
                playenter()
                for(var i = 0; i < this.youtubeLinks.length;i++){
                    this.youtubeLinks[i].acessou = false
                    this.youtubeLinks[i].dentro = false
                }
                this.youtubeAcess.dentro = true
                this.youtubeLinks[this.youtubeAcess.id].acessou = false
                this.youtubeLinks[this.youtubeAcess.id].dentro = true
                }
            }
            if(e.which == 37){
                if(!this.youtubeLinks[this.youtubeAcess.id].name == 'search' && this.youtubeLinks[0].dentro){
                if(imVideo == 0){
                playlight()
                for(var i = 0; i < this.youtubeLinks.length;i++){
                    this.youtubeLinks[i].dentro = false
                    this.youtubeLinks[i].acessou = false
                }
                this.youtubeAcess.dentro = false
                this.youtubeLinks[this.youtubeAcess.id].acessou = true
                }
            }
            }
            if(e.which == 13){
                if(!this.youtubeAcess.dentro){
                playenter()
                for(var i = 0; i < this.youtubeLinks.length;i++){
                    this.youtubeLinks[i].acessou = false
                    this.youtubeLinks[i].dentro = false
                }
                this.youtubeAcess.dentro = true
                this.youtubeLinks[this.youtubeAcess.id].acessou = false
                this.youtubeLinks[this.youtubeAcess.id].dentro = true
                for(var i = 0; i < this.videos.length; i++){
                    this.videos[i].hover = false
                }
                this.imVideo = 0
                this.videos[this.imVideo].hover = true
                }
            }
            if(e.which == 27){
                if(!this.animeView){
                this.youtubeAcess.dentro = false
                this.youtubeLinks[this.youtubeAcess.id].acessou = true
                this.youtubeLinks[this.youtubeAcess.id].dentro = false
                } else{
                    this.youtubeAcess.dentro = true
                    this.youtubeLinks[this.youtubeAcess.id].acessou = false
                    this.animeView = false
                    this.youtubeLinks[this.youtubeAcess.id].acessou = false
                    this.youtubeLinks[this.youtubeAcess.id].dentro = true
                }
            }
            if(this.youtubeLinks[1].dentro){
                if(!this.animeView){
                if(e.which == 39){
                    var max = this.videos.length
                    console.log(max)
                    for(var i = 0; i < this.videos.length; i++){
                        this.videos[i].hover = false
                    }
                    if(this.imVideo < max - 1){
                        playair()
                        this.imVideo++
                        if(this.imVideo >= 1){
                            this.scrollX = this.imVideo * 1 * 9.7 * -1
                        }
                    } else{
                        playBlock()
                    }
                    this.videos[this.imVideo].hover = true
                }
                }
                if(e.which == 37){
                    if(!this.animeView){
                    var max = this.videos.length
                    for(var i = 0; i < this.videos.length; i++){
                        this.videos[i].hover = false
                    }
                    if(this.imVideo > 0){
                        playair()
                        this.imVideo--
                        this.scrollX = this.imVideo * 1 * 9.7 * -1
                    } else{
                        playToogle()
                        for(var i = 0; i < this.youtubeLinks.length;i++){
                            this.youtubeLinks[i].dentro = false
                            this.youtubeLinks[i].acessou = false
                        }
                        this.youtubeAcess.dentro = false
                        this.youtubeLinks[this.youtubeAcess.id].acessou = true
                        for(var i = 0; i < this.videos.length; i++){
                            this.videos[i].hover = false
                        }
                        this.imVideo = -1
                        this.scrollX = 0
                    }
                    this.videos[this.imVideo].hover = true
                }
                }
                if(e.which == 13){
                    this.animeView = true
                    this.animeViewTs = this.videos[this.imVideo]
                }
                if(e.which == 27){
                    playToogle()
                    for(var i = 0; i < this.youtubeLinks.length;i++){
                        this.youtubeLinks[i].dentro = false
                        this.youtubeLinks[i].acessou = false
                    }
                    this.youtubeAcess.dentro = false
                    this.youtubeLinks[this.youtubeAcess.id].acessou = true
                    for(var i = 0; i < this.videos.length; i++){
                        this.videos[i].hover = false
                    }
                    this.imVideo = -1
                    this.scrollX = 0
                }
            
            }
        },
        hoverOver(video){
            if(this.youtubeAcess.id == 1){
                this.youtubeAcess.dentro = true
                this.youtubeLinks[this.youtubeAcess.id].dentro = true
            }
            if(this.youtubeLinks[this.youtubeAcess.id].dentro){
            playair()
            const index = this.videos.indexOf(video)
            this.imVideo = index
            var width = screen.width
            if (width <= 800){
                this.scrollX = 0
            } else{
                this.scrollX = this.imVideo * 1 * 9.7 * -1
                for(var i = 0; i < this.videos.length; i++){
                    this.videos[i].hover = false
                }
                this.videos[this.imVideo].hover = true
            }
        }
        },
        search(e){
            var charTyped = String.fromCharCode(e.which)
            if (/[a-z\d]/i.test(charTyped)) {
                this.termSearchs.push({
                    letter: e.key
                })
                this.searchText = ""
                for(var i = 0; i < this.termSearchs.length; i++){
                    this.searchText += this.termSearchs[i].letter
                }
                if(this.mobile){
                    var animes =  this.videos.filter(function(anime) {
                        return anime.name == this.searchText;
                    }); 
                    this.searchAnimes = animes
                }
            }
            if(e.key == "Backspace"){
                if(this.termSearchs.length > 0){
                    this.termSearchs.pop()
                } 
            }
            if(e.which == 32){
                this.termSearchs.push({
                    letter: " "
                })
                this.searchText = ""
                for(var i = 0; i < this.termSearchs.length; i++){
                    this.searchText += this.termSearchs[i].letter
                }
            }
            if(e.which == 13){
                var animes =  this.videos.filter(function(anime) {
                    return anime.name == this.searchText;
                }); 
                console.log(animes.length)
                this.searchAnimes = animes
            }
        },
        hoverLeft(){
            if(this.mobile == false){
            if(this.youtubeLinks[this.youtubeAcess.id].dentro){
                for(var i = 0; i < this.videos.length; i++){
                    this.videos[i].hover = false
                }
                playToogle()
                this.youtubeAcess.dentro = false
                this.youtubeLinks[this.youtubeAcess.id].acessou = true
                this.youtubeLinks[this.youtubeAcess.id].dentro = false
                this.imVideo = 0
                this.scrollX = this.imVideo * 1 * 9.7 * -1
                this.videos[this.imVideo].hover = false
            }
        }
        },
        hoverCenter(){
            if(this.mobile == false){
            if(this.youtubeLinks[this.youtubeAcess.id].dentro == false){
                playenter()
                this.youtubeAcess.dentro = true
                this.youtubeLinks[this.youtubeAcess.id].acessou = false
                this.youtubeLinks[this.youtubeAcess.id].dentro = true
                this.imVideo = 0
                this.videos[this.imVideo].hover = true
            }
        }
        },
        nightModeA(){
            playToogle()
            if(this.nightMode){
                this.nightMode = false
            } else{
                this.nightMode = true
            }
            localStorage.nightMode = JSON.stringify(this.nightMode)
        },
        changeTab(tab){
            this.where = tab
        },
        openAnime(anime){
            this.animeView = true
            this.animeViewTs = anime
        },
        voltarNavegacao(){
            this.animeView = false
        },
        nothing(){
            console.log("nothing")
        }
    },
})