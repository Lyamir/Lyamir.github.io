
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyCy__OH0X3683REs_SpCMNFdlLJz2m1Mmo",
            authDomain: "doble-resume-website.firebaseapp.com",
            databaseURL: "https://doble-resume-website.firebaseio.com",
            projectId: "doble-resume-website",
            storageBucket: "doble-resume-website.appspot.com",
            messagingSenderId: "471366548219",
            appId: "1:471366548219:web:dd4c9c003aa8d1a47ace5e"
        };
        // Initialize Firebase
        var defaultProject = firebase.initializeApp(firebaseConfig);
        var db = firebase.firestore();

        db.collection("education").get().then(function(snapshot){
            snapshot.forEach(function(doc){
        
            })
        });

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
            })
        });
        