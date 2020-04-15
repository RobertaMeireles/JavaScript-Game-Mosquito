
    //VARIAVEIS
    //criar o evento para o body
    const tela = document.querySelector('body');
    //achar a altura e largura da tela
    let altura=0;
    let largura=0;
    //sortear um eixo x e eixo y gerar a posiçao randomica do mosquito
    let positionX;
    let positionY;
    //verificar a quantidade de vidas
    let life = 1;
    //para o tempo o cronometro
    let time=10;
    //para indicar o nivel
    let nivelEscolhidoUsuario;
    //estabelecer niveis de tempo
    let timeNivel;



    //RECUPERAR O NÍVEL PELO USUÁRIO
    nivelEscolhidoUsuario = window.location.search; //buscar o que foi passado de nível. informaçao consta no browser
    
    
    //ACHAR A ALTURA E LARGURA DO BROWSER:
    const heightWidth = ()=>{
        altura = window.innerHeight;
        largura = window.innerWidth;

        console.log(largura,altura);
    }

    //CHAMAR A FUNÇAO HEIGTWIDTH NO MOMENTO QUE O BROWSER FOR INICIADO:
    tela.addEventListener('onresize',heightWidth)
    
    
    heightWidth();

    const functionNivel = () =>{
        if(nivelEscolhidoUsuario=="?normal"){
            timeNivel=1500;
        }else if (nivelEscolhidoUsuario=="?difficult"){
            timeNivel=1000;
        }else if (nivelEscolhidoUsuario=="?chucknorris"){
            timeNivel=750;
        }
    }

    functionNivel()

    //FUNÇAO CRONOMETRO
    const cronometro = setInterval(() => {
        time-=1 //diminuir um valor cada vez que passar
        document.querySelector('#resultado').innerHTML = time;
        if(time==0){
            window.location.href='win.html'
        }
    }, timeNivel)


    //a cada milisegundos chama a funçao positionMosquito
    setInterval(() => {
        positionMosquito();
    }, 1000);


    const positionMosquito = ()=>{

        //REMOVER O MOSQUITO ANTERIOR CASO ELE EXISTA POIS QUANDO ELE É EXECULTADO PELA 1X NAO EXISTE
        let tagCriada = document.querySelector('#mosquito');
        if(tagCriada){ //se tag criada for verdadeira remove a mesma, se nao entra no loop e passa para a criaçao abaixo
            document.querySelector('#mosquito').remove();
        
            if(life>3){
                window.location.href = "game_over.html";
            }else{
                document.querySelector('#v' + life).src='imagens/coracao_vazio.png';//cada vez que errar acrecenta 1 na variavel life e altera o id trocando a imagem para coração vazio
                life++;
            }
        }

        
         //GERAR A POSIÇAO RANDOMICA DO MOSQUITO
        //onde vá de 0 até o numero da altura e largura do browser
        positionX = Math.floor(Math.random()*largura)-90;//90 devido a imagem mosquito possuir um espaço e possa passar quando ficar proximo ao fim do broser 
        positionY = Math.floor(Math.random()*altura)-90;

        /* como subtraiu 90 do resultaodo, pode aparecer valores menores que 0, e com isso o mosquito
        sairia da tela, sendo assim foi feito o seguinte:
        caso a posicaoY ou posicaoX for menor que 0 recebe o valor 0, se nao recebe o valor 
        da ositionX ou ositionY*/
        positionX = positionX < 0 ? 0 : positionX; 
        positionY = positionY < 0 ? 0 : positionY;

        //CRIAR OS ELEMENTOS (MOSQUITOS) ELEMENTOS PARA O HTML
         let mosquito = document.createElement('img');  //criando uma tag imagem para o body
        mosquito.src= 'imagens/mosca.png' //criar o src da nova tag imagem
        //mosquito.className='mosquito1'; //indicar que o elemento criado possui a class mosquito1 crianda no css
        mosquito.className= `${sizeRandom()} " " ${sideRandom()}`//retona as classes (concatenadas)  apartir da funçao sorteada em sizeRandom  e sideRandom nao esquecer do espaço para nao aparecer as classes juntas e no caso nao funcionaria
        mosquito.id='mosquito';//criar um id para para o elemento igm criado
        document.body.appendChild(mosquito);//adcionar a tag criada mosquito como filho do body

        mosquito.style.position = 'absolute'; //acessar o style do elemento criado indicando que o style é absolute
        mosquito.style.left = positionX + 'px'; //colocar as coodenadas criadas concatenando px e assim alterando o style do css 
        mosquito.style.top = positionY + 'px'; //colocar as coodenadas criadas concatenando px e assim alterando o style do css
        
        //CRIAR A FUNÇÃO ONDE AO CLICAR NO MOSQUITO REMOVE O MESMO 
        mosquito.onclick = function () {
            this.remove()
            
        }

    }
    






    //FUNÇAO PARA SORTEAR O TAMANHO DO MOSQUITO QUE APARECE NA TELA
    //Cada hora o mosquito irá aparecer de tamanhos diferentes, ou seja com uma class diferente
    const sizeRandom = () =>{
        let classMosquitoSize = Math.floor(Math.random()*3);//3 para retornar valor 0 a 3

        switch (classMosquitoSize) {
            case 0:
                return 'mosquito1'
            case 1:
                return 'mosquito2'
            case 2:
                return 'mosquito3'
            //nota com o uso do return nao é aplicado usar o break pois o swicth finaliza ao retornar o item 
        }
    }

    
    //FUNÇAO PARA SORTEAR O LADO DO MOSQUITO QUE APARECE NA TELA
    //Cada hora o mosquito irá aparecer de uma lado diferente, ou seja com uma class diferente
    const sideRandom = () =>{
        let classMosquitoSide = Math.floor(Math.random()*2); //2 para retornar valor 0 a 1

        switch (classMosquitoSide) {
            case 0:
                return 'sideA'
            case 1:
                return 'sideB'
            //nota com o uso do return nao é aplicado usar o break pois o swicth finaliza ao retornar o item 
        }
    }


