
//const btn = document.querySelector("#btn");
//btn.onclick = () => alert("Hello World\!");




//const link = document.querySelector(".comm");
//link.textContent = "Mozilla Developer Network";
/*link.href = "https://developer.mozilla.org";*/
const sect = document.querySelector("section");
const para = document.createElement("div");
para.textContent = "This is the new div";

para.setAttribute("class", "secDiv");   //auto styled in css as soon as given class, inline styles below
sect.appendChild(para);

const text = document.createTextNode(
    " this is the created text node addition",
  );
  const linkPara = document.querySelector(".secDiv");
  linkPara.appendChild(text);
  sect.appendChild(linkPara);

  const btn = document.querySelector("#btn");
  btn.addEventListener("click", function (e) {
    sect.removeChild(linkPara);
    e.target.style.background = "blue";
  });

//sect.removeChild(linkPara);   //Removing a node is pretty simple as well, at least when you have a reference to the node to be removed and its parent. In our current case, we just use Node.removeChild(), like this
//linkPara.remove();     //When you want to remove a node based only on a reference to itself, which is fairly common, you can use Element.remove()
//linkPara.parentNode.removeChild(linkPara);  //older browsers

//Inline styles
/*para.style.color = "white";
para.style.backgroundColor = "purple";
para.style.padding = "10px";
para.style.width = "250px";
para.style.textAlign = "center";*/
