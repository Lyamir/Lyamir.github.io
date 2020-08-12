
function authentication() {
    let email = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;

    firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
    location.href="/edit.html";

}).catch(function(err){
    if(err.code == "auth/wrong-password"){
        alert("wrong password");
    }else{
        alert(err.message);
    }
})
}
