function authentication() {
    
    let email = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;

    
    firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){

}).catch(function(err){
    if(err.code == "auth/wrong-password"){
        alert("wrong password");
    }else{
        alert(err.message);
    }
})
}




firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("USER")
      location.href="/edit.html";
    } else {
        console.log("NO USER")
      //location.href="/index.html";
    }
  });