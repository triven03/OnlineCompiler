console.log("hello");

let run = document.getElementById('rbtn');
let out = document.getElementById('out');
let h6 = document.getElementById('h6');
let lang = document.getElementById('lang');
let input = document.getElementById('inp');


run.addEventListener('click', fun);

function fun() {
     out.innerHTML = "Output : ";
    let lid = lang.value;
    let code = input.value;
    if(code===''){
      out.innerHTML = "Output : Please Write Something  ";  
    }
    else{

    sendData(lid, code);
    }

    // console.log('Button clicked');
    // h6.innerHTML = 'Compiling  <i class="fa fa-spinner fa-spin" style="font-size:12px"></i>';
    // let a = document.createElement('h5');
    // a.innerText = 'Button Clicked';
    // out.appendChild(a);

};

function sendData(lid, code) {
    var request = new XMLHttpRequest();
    request.open("POST", "https://codequotient.com/api/executeCode");

    request.setRequestHeader("Content-Type", "application/json");

    var body = {
        "code": code,
        "langId": lid
    }
    request.send(JSON.stringify(body));

    
    request.onload = function () {
        console.log('done');
      //h6.innerHTML = 'Compilation Done ';
      let result =JSON.parse(this.responseText);
      console.log(result)
      getResult(result);
      } 

    
    }

    function getResult(output) {
    let cd= output.codeId;
    let resRequest = new XMLHttpRequest();
    resRequest.open("GET", `https://codequotient.com/api/codeResult/${cd}`);
    resRequest.setRequestHeader("Content-Type", "application/json");
     
     h6.innerHTML = 'Compiling  <i class="fa fa-spinner fa-spin" style="font-size:12px"></i>';
    const id = setTimeout(function() {
        resRequest.send();
       
    }, 4000);
       
   
    resRequest.addEventListener("load", function() {
        clearTimeout(id);
       h6.innerHTML ="Completed"
        let result = JSON.parse(resRequest.responseText);
        let data =JSON.parse(result.data);
        //let data = JSON.parse(parse.data);
        console.log(data.output);
         if(data.errors!="")
      {
        out.innerHTML = data.errors;
      }
      else{
       out.innerHTML = data.output;
      }

        //showOutput(JSON.parse(result));
    });


     }



