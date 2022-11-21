window.onload = function () {
  const submit = document.querySelector("#submit");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const user = { username, password };

    fetch("http://http://martinserver-env.eba-fevdyzkz.us-east-2.elasticbeanstalk.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Success") {
          console.log(data);
          fetch("http://http://martinserver-env.eba-fevdyzkz.us-east-2.elasticbeanstalk.com/users", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data2) => {
              console.log(data2);

              if (data.user) {
                const albums = data2.users;
                const list = document.querySelector(".lists");
                albums.forEach((album, index) => {
                  const li = document.createElement("li");
                  li.classList.add("list");
                  li.innerHTML = `
                    <a href="#" class="nav-link">
                      <i class="bx bx-home-alt icon"></i>
                      <span class="link" id='${album._id}'>${album.username}'s Album</span>
                    </a>
                  `;
                  list.appendChild(li);
                });

                const signinarea = document.getElementsByClassName("sign_in");
                console.log("signinarea", signinarea);
                signinarea[0].style.display = "none";
                const lists = document.querySelectorAll(".list");
                lists.forEach((list, index) => {
                  list.addEventListener("click", () => {
                    const link = list.querySelector(".link");

                    fetch(`http://martinserver-env.eba-fevdyzkz.us-east-2.elasticbeanstalk.com/getAlbumsById/${link.id}`, {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    })
                      .then((res) => res.json())
                      .then((data3) => {
                        let images = data3.media;
                        let html = "";
                        images.forEach((image) => {
                          html += `<img onclick="makeImageBigger()" src="${image.url}" alt="image" />`;
                        });
                        document.getElementById("userImages").innerHTML = html;
                      });
                  });
                });
              }
            });
        }
      });
  });
  document.getElementById("logout").addEventListener("click", () => {
    const signinarea = document.getElementsByClassName("sign_in");
    const list = document.querySelector(".lists");
    signinarea[0].style.display = "block";
    list.innerHTML = "";
    document.getElementById("userImages").innerHTML = "";
  });
};

//create a function to make an image bigger when clicked
const makeImageBigger = () => {
  console.log("clicked");
  const images = document.querySelectorAll("#userImages img");
  images.forEach((image) => {
    image.addEventListener("click", () => {
      image.classList.toggle("bigger");
    });
  });
};
