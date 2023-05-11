class Api {
    url = "";
    data = null;

    constructor(newURL) {
        this.url = newURL;
    }

    
    async getData() {
        await fetch(this.url).then(function (response) {
            return response.json();
        }).then((data) => {
            this.data = data.episodes;
        });
        return this.data;
        
    }
}

class header{
    headerElement;
    titleElement;
    logoElement;
    placeToRenderHeader;

    constructor(placeToRenderHeader) {
        this.placeToRenderHeader = document.getElementsByTagName(placeToRenderHeader)[0];
        console.log(placeToRenderHeader);

        this.headerElement = document.createElement("header");
        this.headerElement.classList = "title__collection";

        this.logoElement = document.createElement("i");
        this.logoElement.classList = "fa-brands fa-spotify";

        this.titleElement = document.createElement("h1");
        this.titleElement.classList = "title__collection";
        this.titleElement.innerText = "Collection of Happiness";


       
        
    }


    render() {
        this.headerElement.appendChild(this.logoElement);
        this.headerElement.appendChild(this.titleElement);
        this.placeToRenderHeader.appendChild(this.headerElement);
    }
}

class main {
    placeToRenderMain;
    leftsection;
    rightsection;
  
    constructor(placeToRenderMain, data) {
      this.placeToRenderMain = document.getElementsByTagName(placeToRenderMain)[0];
  
      this.mainElement = document.createElement("main");
      this.mainElement.classList = "main";
  
      this.rightsection = new rightsection(this.mainElement, data);
      this.leftsection = new leftsection(this.mainElement, this.rightsection);
    }
        
        makeCardsFromData(data){
            this.leftsection.makeCardsFromData(data);
        }
    
    render() {
        this.placeToRenderMain.appendChild(this.mainElement);
        this.leftsection.render();
        this.rightsection.render();
        }
        
}
    


class leftsection{
    mainElement;
    rightsection;

    constructor(mainElement, rightsection) {
        this.mainElement = mainElement;
        this.rightsection = rightsection;

        this.leftsectionElement = document.createElement("section");
        this.leftsectionElement.classList = "left__section";

        this.articleElement = document.createElement("article");
        this.articleElement.classList = "collection__article";

        this.cardsElement = document.createElement("ul");
        this.cardsElement.classList = "collection__cards";


    }

    makeCardsFromData(data) {
        this.cardsElement.innerHTML = "";
        console.log(data);
        let usedIndexes = [];
        for (let i = 0; i < 4; i++){
            let random;
            do {
                random = Math.floor(Math.random() * data.length);
            } while (usedIndexes.includes(random));
            usedIndexes.push(random);

            //Used indexes checkt voor images die al zijn gebruikt en "probeert" de image niet meerdere malen te tonen,
    
            this.cardElement = document.createElement("li");
            this.cardElement.classList = "cards__episodes";
    
            this.cardDate = document.createElement("p");
            this.cardDate.classList = "date";
            this.cardDate.innerText = data[random].date;
    
    
            this.cardTitle = document.createElement("p");
            this.cardTitle.classList = "title";
            this.cardTitle.innerText = data[random].title;
    
            this.cardImg = document.createElement("img");
            this.cardImg.classList = "cards__episodes__images";
            this.cardImg.src = data[random].img;
    
            this.rightsection.changeData(data[random]);
    
            this.cardElement.onclick = () => {
                console.log(data);
                this.rightsection.changeData(data[random]);
            }
    
            this.cardsElement.appendChild(this.cardElement);
            this.cardElement.appendChild(this.cardDate);
            this.cardElement.appendChild(this.cardTitle);
            this.cardElement.appendChild(this.cardImg);
        }
    }
    

    render() {
        this.mainElement.appendChild(this.leftsectionElement);
        this.leftsectionElement.appendChild(this.cardsElement);
    }
}

class rightsection{
    mainElement;
    leftsection;

    constructor(mainElement, data) {
        this.mainElement = mainElement;
        this.data = data;

        this.rightsection = document.createElement("section");
        this.rightsection.classList = "right__section";

        this.rightArticle = document.createElement("article");
        this.rightArticle.classList = "episode__container";

        this.rightFigure = document.createElement("figure");
        this.rightFigure.classList = "episode__banner";

        this.rightDate = document.createElement("p");
        this.rightDate.classList = "date-right";

        this.rightTitle = document.createElement("p");
        this.rightTitle.classList = "title-right";

        this.rightImage = document.createElement("img");
        this.rightImage.classList = "episode__display";

        this.rightText = document.createElement("p");
        this.rightText.classList = "episode__paragraph";

        this.source = document.createElement("a");
        this.source.classList = "source__button";
        this.src = data.url;
        this.source.src = this.src;

        this.audio = document.createElement("audio");
        this.audio.classList = "audio__tag";
        this.audio.controls = true;
        this.src = data.audio;
        this.audio.src = this.src;
    }

    changeData(data) {
        console.log(data);
        this.rightTitle.innerText = data.title;

        this.rightImage.src = data.img;
        this.rightDate.innerText = data.date;

        this.rightText.innerText = data.summary;

        this.audio.innerText = "Audio";
        this.source.innerText = "Source >"
        
        this.audio.src = data.audio;
        this.source.href = data.source;

        this.source.onclick = () => {
            this.source = window.open(data.url);
        }
    }

    render() {
        this.mainElement.appendChild(this.rightsection);
        this.rightsection.appendChild(this.rightArticle);
        this.rightArticle.appendChild(this.rightFigure);
        this.rightFigure.appendChild(this.rightImage);
        this.rightFigure.appendChild(this.rightDate);
        this.rightFigure.appendChild(this.rightTitle);
        this.rightArticle.appendChild(this.audio);
        this.rightArticle.appendChild(this.source);
        this.rightArticle.appendChild(this.rightText);
      }

}

class footer{
    footerElement;
    footerTextElement
    placeToRenderFooter;

    constructor(placeToRenderFooter) {
        this.placeToRenderFooter = document.getElementsByTagName(placeToRenderFooter)[0];
        
        this.footerElement = document.createElement("footer");
        this.footerElement.classList = "footer";
        this.footerElement.innerText = "Gemaakt door Uday Singh SD2C MediaCollege";
        //this.footerTextElement = document.createElement("p");
    }

    render(){
        this.placeToRenderFooter.appendChild(this.footerElement);
    }
    
}

class App {
    header;
    main;
    footer;
  
    constructor() {
        this.header = new header("body");
        this.footer = new footer("body");

      

      this.Api = new Api("./data/data.json");
      this.Api.getData().then((data) => {
        this.main = new main("body", data);
  
        this.main.makeCardsFromData(data);
          this.header.render();
          this.main.render();
          this.footer.render();
      });
    }
  }
  
  const app = new App();
