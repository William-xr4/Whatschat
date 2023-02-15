const firebaseConfig = {
  apiKey: "AIzaSyAS-a7m2wXp7AJrKMxMSIBO6wVEM3E5wIQ",
  authDomain: "whatschat-7f430.firebaseapp.com",
  databaseURL: "https://whatschat-7f430-default-rtdb.firebaseio.com",
  projectId: "whatschat-7f430",
  storageBucket: "whatschat-7f430.appspot.com",
  messagingSenderId: "602000043040",
  appId: "1:602000043040:web:4af3b01afbeab8a8e36045"
}

firebase.initializeApp(firebaseConfig);

var User_name = localStorage.getItem("userName");
var nome_da_sala=localStorage.getItem("Sala");

function Enviar_mensagem(){
  var mensagem=document.getElementById("msg").value;
  firebase.database().ref(nome_da_sala).push({
    name:User_name,
    message:mensagem,
    like:0
  });
  mensagem="";
}

function PegarDado(){
  firebase.database().ref("/"+nome_da_sala).on("value", function(snapshot){
    document.getElementById("output").innerHTML="";
    snapshot.forEach(function(childSnapshot){
      var childKey=childSnapshot.key;
      var childData=childSnapshot.val();
      if(childKey!="purpose"){
        var Id_da_Mensagem = childKey;
        var Dado_da_Mensagem = childData;
        console.log(Id_da_Mensagem);
        console.log(Dado_da_Mensagem);
        var nome_do_usuario =Dado_da_Mensagem["name"];
        var mensagem = Dado_da_Mensagem["message"];
        var like = Dado_da_Mensagem["like"];

        var Tag_do_nome = '<h4>'+nome_do_usuario+'<img class="user_tick" src="tick.png"></h4>';
        var Tag_da_mensagem = '<h4 clss="message_h4">'+mensagem+'</h4>';
        var Tag_do_like = '<button class="btn btn-primary" id='+Id_da_Mensagem+' value='+like+' onclick=Like(this.id)>';
        var Imagem_do_Like = '<span class="glyphicon glyphicon-thumbs-up">LIKE: '+like+'</span></button><hr>';
        var caixa = Tag_do_nome+Tag_da_mensagem+Tag_do_like+Imagem_do_Like;
        DocumentType.getElementById("output").innerHTML+=caixa;
      }
    });
  });
}
PegarDado();

function Like(Id_da_Mensagem){
  var Id_do_botao = Id_da_Mensagem;
  var Likes = document.getElementById(Id_do_botao).value;
  var Atualiza_Like = Number(Likes)+1;
  firebase.database().ref(nome_da_sala).child(Id_da_Mensagem).update({
    like:Atualiza_Like
  });
}

function logout(){
  localStorage.removeItem("Sala");
  localStorage.removeItem("userName");
  window.location="index.html";
}