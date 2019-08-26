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
	}, 100);
}

function playBlock(){
	block.play();
	setTimeout(function(){
	block.pause();
	block.currentTime = 0;
	}, 100);
}

function playlight(){
	light.play();
	setTimeout(function(){
    light.pause();
    light.currentTime = 0;
	}, 100);
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
	}, 300);
}

var app = new Vue({
    el: "#app",
    data: {
        youtube: null,
        youtubeLinks: [
        {"name" : "search", "icon" : "fas fa-search", "have_icon" : true, "acessou" : false, "dentro": false},
        {"name" : "home", "icon" : "fas fa-home", "have_icon" : true, "acessou" : true,  "dentro": false}
        ],
        logo: "Youtube",
        youtubeAcess: {"id": 1, "dentro": false},
        termSearchs: [],
        videos: [],
        imVideo: -1,
        scrollX: 0,
        load: false,
        generers: [{"id": 0, "name": "Recommended"}],
        where: 0,
        mobile: false
    },
    mounted(){
        document.title = this.logo;
        this.getJson()
        this.load = true
        var width = screen.width
        if (width <= 800){
            this.mobile = true
        } else{
            this.mobile = false
        }
    },
    methods: {
        getJson(){
            fetch("./videos.json")
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
                }
            }
            if(e.which == 27){
                this.youtubeAcess.dentro = false
                this.youtubeLinks[this.youtubeAcess.id].acessou = true
                this.youtubeLinks[this.youtubeAcess.id].dentro = false
            }
            if(this.youtubeLinks[1].dentro){
                if(e.which == 39){
                    var max = this.videos.contents.tvBrowseRenderer.content.tvSecondaryNavRenderer.sections[0].tvSecondaryNavSectionRenderer.tabs[0].tabRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items.length
                    console.log(max)
                    for(var i = 0; i < this.videos.contents.tvBrowseRenderer.content.tvSecondaryNavRenderer.sections[0].tvSecondaryNavSectionRenderer.tabs[0].tabRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items.length; i++){
                        this.videos.contents.tvBrowseRenderer.content.tvSecondaryNavRenderer.sections[0].tvSecondaryNavSectionRenderer.tabs[0].tabRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items[i].gridVideoRenderer.hover = false
                    }
                    if(this.imVideo < max - 1){
                        playair()
                        this.imVideo++
                        if(this.imVideo >= 1){
                            this.scrollX = this.imVideo * 1 * 3.7 * -1
                        }
                    } else{
                        playBlock()
                    }
                    this.videos.contents.tvBrowseRenderer.content.tvSecondaryNavRenderer.sections[0].tvSecondaryNavSectionRenderer.tabs[0].tabRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items[this.imVideo].gridVideoRenderer.hover = true
                }
                if(e.which == 37){
                    var max = this.videos.contents.tvBrowseRenderer.content.tvSecondaryNavRenderer.sections[0].tvSecondaryNavSectionRenderer.tabs[0].tabRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items.length
                    for(var i = 0; i < this.videos.contents.tvBrowseRenderer.content.tvSecondaryNavRenderer.sections[0].tvSecondaryNavSectionRenderer.tabs[0].tabRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items.length; i++){
                        this.videos.contents.tvBrowseRenderer.content.tvSecondaryNavRenderer.sections[0].tvSecondaryNavSectionRenderer.tabs[0].tabRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items[i].gridVideoRenderer.hover = false
                    }
                    if(this.imVideo > 0){
                        playair()
                        this.imVideo--
                        this.scrollX = this.imVideo * 1 * 3.7 * -1
                    } else{
                        playBlock()
                        for(var i = 0; i < this.youtubeLinks.length;i++){
                            this.youtubeLinks[i].dentro = false
                            this.youtubeLinks[i].acessou = false
                        }
                        this.youtubeAcess.dentro = false
                        this.youtubeLinks[this.youtubeAcess.id].acessou = true
                        for(var i = 0; i < this.videos.contents.tvBrowseRenderer.content.tvSecondaryNavRenderer.sections[0].tvSecondaryNavSectionRenderer.tabs[0].tabRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items.length; i++){
                            this.videos.contents.tvBrowseRenderer.content.tvSecondaryNavRenderer.sections[0].tvSecondaryNavSectionRenderer.tabs[0].tabRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items[i].gridVideoRenderer.hover = false
                        }
                        this.imVideo = -1
                        this.scrollX = 0
                    }
                    this.videos.contents.tvBrowseRenderer.content.tvSecondaryNavRenderer.sections[0].tvSecondaryNavSectionRenderer.tabs[0].tabRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items[this.imVideo].gridVideoRenderer.hover = true
                }
                if(e.which == 27){
                    playToogle()
                    for(var i = 0; i < this.youtubeLinks.length;i++){
                        this.youtubeLinks[i].dentro = false
                        this.youtubeLinks[i].acessou = false
                    }
                    this.youtubeAcess.dentro = false
                    this.youtubeLinks[this.youtubeAcess.id].acessou = true
                    for(var i = 0; i < this.videos.contents.tvBrowseRenderer.content.tvSecondaryNavRenderer.sections[0].tvSecondaryNavSectionRenderer.tabs[0].tabRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items.length; i++){
                        this.videos.contents.tvBrowseRenderer.content.tvSecondaryNavRenderer.sections[0].tvSecondaryNavSectionRenderer.tabs[0].tabRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items[i].gridVideoRenderer.hover = false
                    }
                    this.imVideo = -1
                    this.scrollX = 0
                }
            }
        },
        hoverOver(video){
            playair()
            const index = this.videos.contents.tvBrowseRenderer.content.tvSecondaryNavRenderer.sections[0].tvSecondaryNavSectionRenderer.tabs[0].tabRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items.indexOf(video)
            this.imVideo = index
            var width = screen.width
            if (width <= 800){
                this.scrollX = 0
            } else{
                this.scrollX = this.imVideo * 1 * 3.7 * -1
                for(var i = 0; i < this.videos.contents.tvBrowseRenderer.content.tvSecondaryNavRenderer.sections[0].tvSecondaryNavSectionRenderer.tabs[0].tabRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items.length; i++){
                    this.videos.contents.tvBrowseRenderer.content.tvSecondaryNavRenderer.sections[0].tvSecondaryNavSectionRenderer.tabs[0].tabRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items[i].gridVideoRenderer.hover = false
                }
                this.videos.contents.tvBrowseRenderer.content.tvSecondaryNavRenderer.sections[0].tvSecondaryNavSectionRenderer.tabs[0].tabRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items[index].gridVideoRenderer.hover = true
            }  
        },
        search(e){
            var charTyped = String.fromCharCode(e.which);
            if (/[a-z\d]/i.test(charTyped)) {
                this.termSearchs.push({
                    letter: e.key
                })
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
            }
        },
        changeTab(tab){
            this.where = tab
        },
        nothing(){
            console.log("nothing")
        }
    },
})