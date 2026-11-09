window.onload = function () {

    console.log("loaded script_post.js");

    document
        .querySelector("#insertPlantFormFetchPost")
        .addEventListener("submit", async function (event) {

            event.preventDefault();

            console.log("post form clicked");

            let form = document.querySelector("#insertPlantFormFetchPost");

            let data = new FormData(form);

            try {
                //把我刚刚收集的植物信息和图片，一起发送给 Flask！”
                let res = await fetch("/postPlantFormFetch", {
                    method: "POST",
                    body: data
                });

                let resJSON = await res.json();

                console.log(resJSON);

                document.querySelector("#result-container").innerHTML = `<img src = ${resJSON.imagePath} />`

            } catch (err) {

                console.log(err);

            }
        });

};