// alert(new Date);
var cl = console.log;

 const formControl = document.querySelector("#form");
  const fnameControl = document.querySelector("#fname");
  const lnameControl = document.querySelector("#lname");
  const emailControl = document.getElementById("email");
   const numControl = document.getElementById("contact");
   const tablebody = document.getElementById("tablebody");
   const submit = document.getElementById("submitbtn");
   const update = document.getElementById("updatebtn");

  // cl(update);
  function uuid(mask = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') {
    return `${mask}`.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
  }

let stdArray = [];

const onsubmitbtn = (ele) =>{
      ele.preventDefault() 
  //  cl(ele, ele.target);
        let obj ={
             lname : lnameControl.value,
             fname: fnameControl.value,
             email : emailControl.value,
             num : numControl.value,
             id : uuid(),
        }
        stdArray.push(obj);
        localStorage.setItem("stdArray", JSON.stringify(stdArray));
        createTable(obj);
   ele.target.reset()
}  
function createTable(obj){
    // cl(obj)
    let tr = document.createElement("tr");
    tr.innerHTML = `
                <tr>
                 <td>${stdArray.length}</td>
                 <td>${obj.lname}</td>
                 <td>${obj.fname}</td>
                 <td>${obj.email}</td>
                 <td>${obj.num}</td>
          <td><button class="btn btn-primary" data-sid=${obj.id} onclick="onclickeditbtn(this)">Edite</button></td>
          <td><button class="btn btn-secondary" data-sid=${obj.id} onclick="onclickdeletebtn(this)">Delete</button></td>          
            </tr>
    `;
    
};
 function templating(std){
        let result = "";
        std.forEach((templ,i)=>{
            result += `
                        <tr>
                        <td>${i + 1}</td>
                        <td>${templ.lname}</td>
                        <td>${templ.fname}</td>
                        <td>${templ.email}</td>
                        <td>${templ.num}</td>
            <td><button class="btn btn-primary" data-sid=${templ.id} onclick="onclickeditbtn(this)">Edite</button></td>
            <td><button class="btn btn-secondary" data-sid=${templ.id} onclick="onclickdeletebtn(this)">Delete</button></td>
                    </tr>
            `;
            
        })
        tablebody.innerHTML = result;
 };
if(localStorage.getItem("stdArray")){
      stdArray =JSON.parse(localStorage.getItem("stdArray"));
      templating(stdArray)
};


let getId;
function onclickeditbtn(ele){
  //  cl(ele);
        getId = ele.getAttribute("data-sid");
        cl(getId);
        submit.classList.add("d-none");
        update.classList.remove("d-none");
          stdArray =  JSON.parse(localStorage.getItem("stdArray"));
           cl(stdArray);
           let req = stdArray.find(ele => ele.id === getId);
               cl(req);
               lnameControl.value =  req.lname;
                fnameControl.value = req.fname;
                 emailControl.value = req.email;
                numControl.value = req.num;
            
}
function onclickupdate(event){
    cl(getId);
    stdArray.forEach((ele)=>{
          if(ele.id === getId){
            ele.fname = fnameControl.value;
            ele.lname = lnameControl.value;
            ele.email = emailControl.value;
            ele.num = numControl.value;
          }
    })
   localStorage.setItem("stdArray", JSON.stringify(stdArray));
          templating(stdArray);
          formControl.reset();
          submit.classList.remove("d-none");
          update.classList.add("d-none")
};
function onclickdeletebtn(del){
    let getid = del.getAttribute("data-sid");
     stdArray = stdArray.filter(ele =>{
       return ele.id != getid
     });
      cl(stdArray)

       localStorage.setItem("stdArray", JSON.stringify(stdArray));
         templating(stdArray);
}

update.addEventListener("click", onclickupdate);
formControl.addEventListener("submit", onsubmitbtn);