//等网页加载完成以后，再运行这里面的代码。
window.onload = function () {

    console.log("loaded script_get.js");

    document
        .querySelector("#insertPlantFormFetch")
        .addEventListener("submit", async function (event) {

            //阻止默认提交行为
            event.preventDefault();

            console.log("button clicked");

            const htmlForm = document.querySelector(
                "#insertPlantFormFetch"
            );

            //FormData：JavaScript 内置的表单数据对象 （会读取这个表单当前可以提交的字段，并把它们的 name 和 Value 收集起来。）
            //收集数据。
            const formData = new FormData(htmlForm);

            //把数据转换成 GET 查询字符串。
            const queryParams = new URLSearchParams(formData).toString();
            const url = `/getDataFromForm?${queryParams}`;

            //向 Flask 发送请求，并等待它的回复
            try { //先尝试运行 try 里面的代码，如果执行过程中出错，就进入 catch 处理错误。
                //请向 Flask 的 / getDataFromForm 发送一个 GET Request。” 等待 Flask 的 HTTP 回复。
                let res = await fetch(url);

                //读取并解析回复中的 JSON 数据。
                let resJSON = await res.json();

                document.querySelector("#result-container").innerHTML += `
                <p>THE NEW RESULT: ${resJSON.data_received}</p>
                <p>OWNER NAME: ${resJSON.owner}</p>
                <p>PLANT NAME: ${resJSON.plantname}</p>
                `;

                console.log(resJSON);

            } catch (err) {

                console.log(err);

            }
        });
};