var tutors = null;
function login(user,pass) {
    var data = {
        todo:"login",
        user: user,
        password: pass
    };
    console.log(data);
    axios.post('http://169.233.161.73:8080/', qs.stringify(data))
    .then(function (response) {
        if(response.data.result != null){
            sessionStorage.setItem('user', response.data.result);
            switch(response.data.result.type){
                case "tutor":
                    window.location.href = 'tutor.html'
                    break;
                case "tutee":
                    window.location.href = 'tutee.html'
                    break;
                default:
                    console.log("unknown type");
            }
            
        }
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

function findByKeyword() {
    var keyword = $('#search').val();
    var data = {
        type:"tutee",
        todo:"findByKeyword",
        keyword:keyword
    };
    console.log("sent");
    clear();
    if(keyword == null)return;
    axios.post('http://169.233.161.73:8080/', qs.stringify(data))
    .then(function (response) {
        if(response.data.message == "success"){
            var b = $('#main');
            tutors = response.data.result;
            for (let i = 0; i < response.data.result.length; i++) {
                var tutor = response.data.result[i];
                console.log(tutor);
                if(b.last().length >= 3){
                    b.append("<div class=\"w3-row-padding\"></div>");
                }
                b.last().append(createNewElement(tutor,i));
            }
        }
    })
    .catch(function (error) {
        console.log(error);
    });
    return false;
}

 function clear() {
    var b = $('#main');
    $('.w3-row-padding').remove();
    $('.w3-container').remove();
    b.append("<div class=\"w3-row-padding\"></div>");
 }

function createNewElement(tutor,index){
    var n = "<div class=\"w3-third w3-container\" id=\""+index+"\">";
    var subjects = "";
    for (const subject of tutor.subjects) {
        subjects += subject+", ";
    }

    n += "<div class=\"w3-container w3-white\">";
    n += "<p><b>" + tutor.fName+ tutor.lName+"</b></p>";
    n += addAttr("Teaches: ",subjects);
    n += addAttr("Experience: ",tutor.exp);
    n += addAttr("About: ",tutor.desc);
    n += addAttr("Hourly Rate: ",tutor.pay);
    n += addAttr("Availablility: ",tutor.available);
    n += "<button onClick = \"matchTutor("+index+");\">Request</button><button onClick = \"remove("+index+");\">Decline</button>";
    n += "</div>";
    n += "</div>";
    return n;
}

function addAttr(name,value) {
    return "<p>"+name+value+"</p>";
}

function matchTutor(index){
    if(tutors == null)return;
    
    var data = {
        type:"tutee",
        todo:"swipeRight",
        tutee:sessionStorage.getItem("user").user,
        tutor:tutors[index].user
    };
    console.log("sent");
    axios.post('http://169.233.161.73:8080/', qs.stringify(data))
    .then(function (response) {
        console.log(response);
        alert("Request sent!");
    })
    .catch(function (error) {
        console.log(error);
    });
    return false;
}

function remove(index){
    var x = "#"+index+"";
    $(x).remove();
    return false;
}

function getMatches() {
    var data = {
        type:"tutee",
        todo:"findByKeyword",
        keyword:keyword
    };
    console.log("sent");
    axios.post('http://169.233.161.73:8080/', qs.stringify(data))
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

function signupTutor(user,pass,fname,lname,subjects,exp,desc,pay,available,email,pic) {
    var data = {
        type:"tutor",
        todo:"signup",
        user: user,
        password: pass,
        fName: fname,
        lName: lname,
        subjects: subjects,
        exp: exp,
        desc: desc,
        pay:pay,
        available:available,
        email:email,
        pic:pic
    };
    axios.post('http://169.233.161.73:8080/', qs.stringify(data))
    .then(function (response) {
        if(response.data.message == "success"){
            sessionStorage.setItem('user', response.data.result);
            window.location.href = 'tutor.html';
        }
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
}

function signupTutee(user,pass,fname,lname,subjects,email,pic) {
    var data = {
        type:"tutee",
        todo:"signup",
        user: user,
        password: pass,
        fName: fname,
        lName: lname,
        subjects: subjects,
        email:email,
        pic:pic
    };
    console.log(data);
    axios.post('http://169.233.161.73:8080/', qs.stringify(data))
    .then(function (response) {
        if(response.data.message == "success"){
            sessionStorage.setItem('user', response.data.result);
            window.location.href = 'tutee.html';
        }
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
}