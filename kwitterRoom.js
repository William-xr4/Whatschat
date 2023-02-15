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
document.getElementById("userName").innerHTML ="Bem-vindo(a) "+User_name+"!";
function addRoom(){
  var Sala = document.getElementById("roomName").value;
  firebase.database().ref("/").child(Sala).update({
    purpose:"Adicionando sala"
  });
  localStorage.setItem("Sala", Sala);
  window.location="kwitterPage.html";
}
function PegarDado(){
  firebase.database().ref("/").on("value", function(snapshot){
    document.getElementById("output").innerHTML="";
    snapshot.forEach(function(childSnapshot){
      var childKey=childSnapshot.key;
      var salas=childKey;
      console.log(salas);
      var caixa='<div class="room_name" id="'+salas+'" onclick="Redirecionar_para_a_sala(this.id)">#'+salas+'</div><hr>';
      document.getElementById("output").innerHTML+=caixa;
    });
  });
}
PegarDado();

function Redirecionar_para_a_sala(nome_da_sala){
  console.log(nome_da_sala);
  localStorage.setItem("Sala", nome_da_sala);
  window.location="kwitterPage.html";
}
function logout(){
  localStorage.removeItem("Sala");
  localStorage.removeItem("userName");
  window.location="index.html";
}