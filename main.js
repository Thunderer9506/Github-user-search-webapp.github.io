const input = document.getElementsByTagName("input")[0]
const month = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dec"];

function getValue(){
    getData(input.value)
}
function whereWhat(where,what){
    if (what == "" || what == null){
        where.innerText = "Not Available"
    }
    else{
        where.innerText = what
    }
}

function changeColor(){
    if (document.querySelector(".colorMode p").innerText === "DARK"){
        document.querySelector(".colorMode i").setAttribute("class","fa-solid fa-sun fa-lg")
        document.querySelector(".colorMode p").innerText = "LIGHT"
        document.documentElement.style.setProperty('--white', 'hsl(220 40% 13%)');
        document.documentElement.style.setProperty('--darkBlue', '#ffffff');
        document.querySelector(".data").style.backgroundColor = "hsl(220 40% 13%)"
        document.documentElement.style.setProperty('--background', 'hsl(222 41% 20%)');
        document.documentElement.style.setProperty('--grayBlue', '#ffffff');
        document.documentElement.style.setProperty('--marine', '#ffffff');
        document.querySelector(".search input").style.color = "#ffffff"
    }
    else if(document.querySelector(".colorMode p").innerText === "LIGHT"){
        document.querySelector(".colorMode i").setAttribute("class","fa-solid fa-moon fa-xl")
        document.querySelector(".colorMode p").innerText = "DARK"
        document.documentElement.style.setProperty('--white', '#ffffff');
        document.documentElement.style.setProperty('--darkBlue', 'hsl(217 21% 21%)');
        document.querySelector(".data").style.backgroundColor = "hsl(227 100% 98%)"
        document.documentElement.style.setProperty('--background', '#ffffff');
        document.documentElement.style.setProperty('--grayBlue', 'hsl(217 20% 51%)');
        document.documentElement.style.setProperty('--marine', 'hsl(217 35% 45%)');
        
        document.querySelector(".search input").style.color = "black"
    }
}

function getData(whose){
    fetch("https://api.github.com/users/"+whose)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        let date = new Date(data["created_at"])
        document.querySelector(".main img").setAttribute("src",data["avatar_url"])
        document.querySelector(".username h2").innerText = data["name"]
        document.querySelector(".username a").setAttribute("href",data["html_url"])
        document.querySelector(".username a").innerText = "@"+data["login"]
        document.querySelector(".joined").innerText = "Joined "+date.getDate()+" "+month[date.getMonth()]+" "+date.getFullYear()
        whereWhat(document.querySelector(".bio"),data["bio"])
        document.querySelector(".repos .number").innerText = data["public_repos"]
        document.querySelector(".followers .number").innerText = data["followers"]
        document.querySelector(".following .number").innerText = data["following"]
        whereWhat(document.querySelector(".location p"),data["location"])
        whereWhat(document.querySelector(".twitter p"),data["twitter_username"])
        whereWhat(document.querySelector(".link a"),data["blog"])
        whereWhat(document.querySelector(".business p"),data["company"])
        document.querySelector(".link a").href = data["blog"]
      })
      .catch(error => {
        console.error('Error:', error);
      });
}