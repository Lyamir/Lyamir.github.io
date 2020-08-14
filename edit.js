firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("USER LOGGED IN")
    } else {
        console.log("NO USER")
      location.href="/index.html"
    }
  });

  var db = firebase.firestore();


//loads data from the database to the website
db.collection("education").get().then(function(snapshot){
    snapshot.forEach(function(doc){
        let div = document.createElement('div');
        div.classList.add('educContainer');

        let school = document.createTextNode(doc.data().school);
        let schoolTitle = document.createElement('span');
        schoolTitle.appendChild(school);
        schoolTitle.style.fontWeight = '600';
        
        let degree = document.createTextNode(doc.data().degree);
        let yearStart = document.createTextNode(doc.data().yearStart);
        let yearEnd = document.createTextNode(doc.data().yearEnd);
        let image = document.createElement('div');

        image.style.backgroundSize = 'contain';
        image.style.backgroundColor = 'white';
        image.style.backgroundImage = "url(" + doc.data().image + ")";
        image.style.height = '200px';
        image.style.width = '200px';
        image.style.margin = '10px auto';

        div.appendChild(image);
        div.appendChild(schoolTitle);
        var br = document.createElement('br');
        div.appendChild(br);
        div.appendChild(degree);
        var br = document.createElement('br');
        div.appendChild(br);
        div.appendChild(yearStart);
        div.appendChild(document.createTextNode(" - "));
        div.appendChild(yearEnd); 

        document.getElementById('educInfo').appendChild(div);
    });
});

db.collection("organizations").get().then(function(snapshot){
    snapshot.forEach(function(doc){

        let table = document.getElementById('orgTable');
        
        let name = document.createTextNode(doc.data().name);
        let position = document.createTextNode(doc.data().position);
        let yearStart = document.createTextNode(doc.data().yearStart);
        let yearEnd = document.createTextNode(doc.data().yearEnd);

        let tr = document.createElement('tr');
        table.appendChild(tr);
        
        let td = document.createElement('td');
        td.appendChild(name);
        table.appendChild(td);

        td = document.createElement('td');
        td.appendChild(position);
        table.appendChild(td);

        td = document.createElement('td');
        td.appendChild(yearStart);
        table.appendChild(td);

        td = document.createElement('td');
        td.appendChild(yearEnd);
        table.appendChild(td);
    
    });
});

db.collection("works").get().then(function(snapshot){
    snapshot.forEach(function(doc){

        
        let table = document.getElementById('projectTable');

        let name = document.createTextNode(doc.data().name);
        let year = document.createTextNode(doc.data().year);

        
        let a = document.createElement('a');
        a.classList.add('link');
        a.href = doc.data().link;
        a.target = '_blank';
        let link = document.createTextNode(doc.data().link);
        

        let tr = document.createElement('tr');
        table.appendChild(tr);

        let td = document.createElement('td');
        td.appendChild(name);
        table.appendChild(td);

        td = document.createElement('td');
        td.appendChild(year);
        table.appendChild(td);

        td = document.createElement('td');
        td.appendChild(a);
        a.appendChild(link);
        table.appendChild(td);
    
    });
});

db.collection("others").doc("link").get().then(function(doc){

    document.getElementById('github').href = doc.data().github;
    document.getElementById('linkedin').href = doc.data().linkedin;
    document.getElementById('twitter').href = doc.data().twitter;
    
    document.getElementById('githubInput').value = doc.data().github;
    document.getElementById('linkedinInput').value = doc.data().linkedin;
    document.getElementById('twitterInput').value = doc.data().twitter;

});

db.collection("others").doc("intro").get().then(function(doc){
    let intro = document.createTextNode(doc.data().value);
    let h3 = document.createElement('h3');
    document.getElementById('intro').appendChild(h3);
    h3.appendChild(intro);
});


//lists in select forms
db.collection("education").get().then(function(snapshot){
  snapshot.forEach(function(doc){
    let option = document.createElement('option')
    option.setAttribute("data-id", doc.id)
    option.append(doc.data().school + " | " + doc.data().degree + " | " + doc.data().yearStart + " | " + doc.data().yearEnd)
    document.getElementById("selectEducation").append(option);
  })
})

db.collection("organizations").get().then(function(snapshot){
  snapshot.forEach(function(doc){
    let option = document.createElement('option')
    option.setAttribute("data-id", doc.id)
    option.append(doc.data().name + " | " + doc.data().position + " | " + doc.data().yearStart + " | " + doc.data().yearEnd)
    document.getElementById("selectOrganization").append(option);
  })
})

db.collection("works").get().then(function(snapshot){
  snapshot.forEach(function(doc){
    let option = document.createElement('option')
    option.setAttribute("data-id", doc.id)
    option.append(doc.data().name + " | " + doc.data().year + " | " + doc.data().link)
    document.getElementById("selectProject").append(option);
  })
})



function addEducation() {
  let school = document.getElementById("schoolInput").value;
  let degree = document.getElementById("degreeInput").value;
  let yearStart = document.getElementById("yearStartEduc").value;
  let yearEnd = document.getElementById("yearEndEduc").value;
  let image = document.getElementById("imageInput").value;

  db.collection("education").add({
    school: school,
    degree: degree,
    yearStart: yearStart,
    yearEnd: yearEnd,
    image: image
  }).then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
}

function deleteEducation(){
  let list = document.getElementById("selectEducation")
  
  db.collection("education").get().then(function(snapshot){
    snapshot.forEach(function(doc){
      let selected = list.options[list.selectedIndex].getAttribute("data-id");
      if (selected == doc.id)
        db.collection("education").doc(doc.id).delete().then(function(){
          console.log("DELETE SUCCESSFUL")
        })
    })
  })
}


function addOrganization() {
  let org = document.getElementById("orgInput").value;
  let position = document.getElementById("positionInput").value;
  let yearStart = document.getElementById("yearStartOrg").value;
  let yearEnd = document.getElementById("yearEndOrg").value;

  db.collection("organizations").add({
    name: org,
    position: position,
    yearStart: yearStart,
    yearEnd: yearEnd
  }).then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
}

function deleteOrganization(){
  let list = document.getElementById("selectOrganization")
  
  db.collection("organizations").get().then(function(snapshot){
    snapshot.forEach(function(doc){
      let selected = list.options[list.selectedIndex].getAttribute("data-id");
      if (selected == doc.id)
        db.collection("organizations").doc(doc.id).delete().then(function(){
          console.log("DELETE SUCCESSFUL")
        })
    })
  })
}


function addProject() {
  let project = document.getElementById("projectInput").value;
  let yearDone = document.getElementById("yearDoneInput").value;
  let link = document.getElementById("linkInput").value;

  db.collection("works").add({
    name: project,
    year: yearDone,
    link: link
  }).then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
}

function deleteProject(){
  let list = document.getElementById("selectProject")
  
  db.collection("works").get().then(function(snapshot){
    snapshot.forEach(function(doc){
      let selected = list.options[list.selectedIndex].getAttribute("data-id");
      if (selected == doc.id)
        db.collection("works").doc(doc.id).delete().then(function(){
          console.log("DELETE SUCCESSFUL")
        })
    })
  })
}

function updateSocials(){
  db.collection("others").doc("link").update({
    github: document.getElementById("githubInput").value,
    linkedin: document.getElementById("linkedinInput").value,
    twitter: document.getElementById("twitterInput").value
  }).then(function(){
  console.log("UPDATE SUCCESSFUL")
}).catch(function(err){
  console.error("Error updating document: ", err);
})}

