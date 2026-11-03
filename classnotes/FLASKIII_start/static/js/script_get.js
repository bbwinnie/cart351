window.onload = function () {
    console.log("loaded script_get.js")
    document
        .querySelector("#insertPlantFormFetch")
        .addEventListener("submit",
            async function (event) {
                // only for sbmit but don't go anywhere
                event.preventDefault();
                console.log("button clicked");
                const htmlForm = document.querySelector("#insertPlantFormFetch");
                // console.log(htmlForm)
                const formData = new FormData(htmlForm);
                //doing a get request
                const queryParams = new URLSearchParams(formData).toString();
                const url = `/getDataFromForm?${queryParams}`;

                try {
                    let res = await fetch(url)
                    let resJSON = await res.json()
                    console.log(resJSON)

                    document.querySelector("#result-container").innerHTML +=
                        ` THE NEW RESULT: ${resJSON.data_received}
                        OWNER NAME : ${resJSON.owner}
                        PLANT NAME : ${resJSON.plantname}`

                }
                catch (err) {
                    console.log(err)
                }


            });
}
