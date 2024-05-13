/* -------------------------------
As VARIAVEIS  declaradas fora de uma função são consideradas GLOBAIS.
Ou seja: elas podem ser utilizadas em qualquer lugar; enquanto que aquelas que são declaradas dentro de uma função só funcionarão dentro daquela função.
----------------------------------- */
//variáveis bolinha
let xBolinha = 30;   // posição horizontal da bolinha (largura)
let yBolinha = 250;   // posição vertical da bolinha   (altura)
let diametro = 20;  //  diametro da bolinha
let raio = diametro /2; //dividindo o diametro por 2 tenho o raio da bolinha
let velocidadeXBolinha = 5; //  velocidade do jogo - bolinha horizontal
let velocidadeYBolinha = 5; //  velocidade do jogo - bolinha vertical
//variáveis raquete geral
let velocidadeRaquete = 10
let raqueteComprimento = 10;
let raqueteAltura = 100;
let colidiu = false;
//variaveis da minha raquete
let xRaquete = 5;
let yRaquete = 200;
//requete oponente
let xRaqueteOponente = 780;
let yRaqueteOponente = 200;
let velocidadeYOponente;
//variaveis placar
let meusPontos = 0;
let pontosDoOponente = 0;
//sons do jogo
let raquetada;
let ponto;
let trilha;


function setup() {
  createCanvas(800, 500);    // cria a tela e define tamanho (x,y)(larguara/altura)
  trilha.loop(); // chamo o som trilha e o coloco em looping
}

function mostraBolinha() {
 circle(xBolinha, yBolinha, diametro);  // exiba um circulo na posição (x,y,com diametro)
}

function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;// adiciono movimento a bolinha x horizontal.
    yBolinha += velocidadeYBolinha;// adiciono movimento a bolinha y vertical
}

function verificaColisaoBorda(){
    if (xBolinha + raio > width || xBolinha - raio < 0) { 
          // executa SE xBolinha + raio for > que largura OU se for < que 0
        velocidadeXBolinha *= -1;   // * (multiplica por)  -1  -- inverte o sentido da bolinha
    }

    if (yBolinha + raio > height || yBolinha - raio < 0) { 
          // executa SE yBolinha + raio for > que altura OU se for < que 0
        velocidadeYBolinha *= -1;   // * (multiplica por)  -1  -- inverte o sentido da bolinha
    }  
  
}

function mostraRaquete(x,y) { // a função recebe 2 valores e os transforma em variáveis (x e y)
    rect(x, y, raqueteComprimento, raqueteAltura);
        //rect(posicaoX, posiçãoY , largua, altura) -- onde: w=largura  h=altura 
}

function movimentaMinhaRaquete() {
  if(keyIsDown(UP_ARROW)) {  //se a tecla (seta pra cima) for pressionada 
    if (yRaquete >= velocidadeRaquete) { // para parar a raquete na borda
      yRaquete -= velocidadeRaquete; //mova a raquete para cima
    }    
  }
  
  if(keyIsDown(DOWN_ARROW)) { //se a tecla (seta pra baixo) for pressionada 
        if (yRaquete <=  height - raqueteAltura - velocidadeRaquete) { 
          // para parar a raquete na borda
        yRaquete += velocidadeRaquete; //mova a raquete para baixo
        }
  }
}

function movimentaRaqueteOponente() {
  if(keyIsDown(109)) {  //se a tecla (-) for pressionada 
    if (yRaqueteOponente >= velocidadeRaquete) { // para parar a raquete na borda
      yRaqueteOponente -= velocidadeRaquete; //mova a raquete para cima
    }    
  }
  
  if(keyIsDown(107)) { //se a tecla (+) for pressionada 
        if (yRaqueteOponente <=  height - raqueteAltura - velocidadeRaquete) { 
          // para parar a raquete na borda
        yRaqueteOponente += velocidadeRaquete; //mova a raquete para baixo
        }
  }
}

function verificaColisaoRaquete(x, y) { // a função recebe 2 valores e os converte em (x e y)
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu){
        velocidadeXBolinha *= -1;
        raquetada.play(); // som da batida na raquete
    }
}

function incluiPlacar() {
  textSize(30); // tamanho da fonte
  text(meusPontos, (width/4)  , 30); // windth/4 acha um quarto da largura da tela para exibir meus pontos
  text(pontosDoOponente,(width-(width/4)), 30); // o ultimo valor é a altura
  fill(("#FFEB3B3A"));
  stroke(255); // inclui o contorno branco
  rect((width/4)-5, 5, 80, 30);
  rect((width-(width/4)-5), 5, 80, 30);  
}

function marcaPonto() {
  if (xBolinha > width - 15) { // largura -10 
    meusPontos += 1;
    ponto.play(); // som do ponto
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1;
    ponto.play(); // som do ponto
  }
}

function preload(){ //função para carregar os arquivos necessarios (sons)
  trilha = loadSound("trilha.mp3"); 
  // o arquivo é chamado de forma direta pois já esta no diretório rais
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function bolinhaNaoFicaPresa(){  // função para não deixar a bolinha presa atraz da raquete
    if (xBolinha - raio< 0){ // se a boilinha passou da raquete da esquerda - reposiciona a bolinha
    xBolinha = 30;
    yBolinha = 250 
    }
    if (xBolinha - raio > (width-25)){ // se a bolinha passou da raquete da esquerda - reposiciona a bolinha
    xBolinha = width-30;  //width = largura 
    yBolinha = 250 
    }  
}

function draw() {
  background("#10173F");  // cor de fundo da tela  
              // a cor de fundo está aqui para não deixar o rastro
              // aqui apaga o desenho anterior (rastro) a cada ciclo
  fill("#FFC107");    // cor da caneta/objeto
  // chama cada uma das funções abaixo
  mostraBolinha(); 
  movimentaBolinha() 
  verificaColisaoBorda()
  mostraRaquete(xRaquete, yRaquete); //chama função e envia valores para (xRaquete e yRaquete)
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);  //chama função e envia valores para (xRaqueteOponente e yRaqueteOponente)
  movimentaMinhaRaquete(); //chama função
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);//chama função e envia valores para (xRaqueteOponente e yRaqueteOponente)
  verificaColisaoRaquete(xRaquete, yRaquete);//chama função e envia valores para (xRaquete e yRaquete)
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

//aula 7
        //nesta aula criamos a raquete do oponente e demos movimento 
        // criamos a função colisao
//aula 8 e 9
        // criamos os placar
//aula 10
        // subindo os sons
        // movimenta a raquete do oponente com os sinais de + e- 
