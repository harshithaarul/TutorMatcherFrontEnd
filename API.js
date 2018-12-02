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
    axios.post('http://169.233.161.73:8080/', qs.stringify(data))
    .then(function (response) {
        if(response.data.message == "success"){
            var b = $('#main');
            for (let i = 0; i < response.data.result.length; i++) {
                var tutor = response.data.result[i];
                console.log(tutor);
                if(b.last().length >= 3){
                    b.append("<div class=\"w3-row-padding\"></div>");
                }
                // b.append(createNewElement());
            }
        }
    })
    .catch(function (error) {
        console.log(error);
    });
    return false;
}

function createNewElement(){

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