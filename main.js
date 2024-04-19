const input = document.getElementsByTagName("input")[0]
const month = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dec"];

function getValue(){
    console.log(input.value)
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
        document.querySelector(".bio").innerText = data["bio"]
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