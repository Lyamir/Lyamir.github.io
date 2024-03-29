var db = firebase.firestore();

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
    

});

db.collection("others").doc("intro").get().then(function(doc){
    let intro = document.createTextNode(doc.data().value);
    let h3 = document.createElement('h3');
    document.getElementById('intro').appendChild(h3);
    h3.appendChild(intro);
});