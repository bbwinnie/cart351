import os
from flask import Flask,render_template, url_for, request, redirect, session


app = Flask(__name__)

#图片要保存到哪个文件夹。
UPLOAD_FOLDER = 'static/uploads'
#把这个文件夹路径放进 Flask 的配置里面，之后其他 Function 就可以使用它。
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
#设置整个请求的最大允许大小为 16 MB。
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

# 因为 Flask 默认会把 Session 数据放进浏览器的 Cookie，并使用 secret_key 对 Cookie 进行数字签名，防止用户随意篡改数据。
app.secret_key = "BAD_SECRET_KEY"


# @app.route('/')
# def index():
#     return render_template("index.html",
#                            user={"username":"sabine"})
# # user传给 HTML 的变量名 + Python Dictionary + key username + value = sabine

@app.route("/")
def index():
    return render_template(
        "index.html",
        user={"username": "sabine"},
        passedDictionary={
            "fav_color": "fuscia",
            "fav_veg": "cauliflower",
            "fav_fruit": "kiwi",
            "fav_animal": "toucan"
        },
        imgPath="../static/images/pineapple_2.jpg"
    )

@app.route("/pineappleA")
def pineAppleA():
    return render_template(
        "pineappleChild.html",
        dataPassedA="child A!"
    )

@app.route("/pineappleB")
def pineAppleB():
    return render_template(
        "pineappleChild_B.html",
        # passedImg="../static/images/pineapple_2.jpg"
        passedImg="pineapple_2.jpg"
    )

@app.route("/inputPlant")
def addPlantData():
    return render_template("addPlantData.html")

@app.route("/thank_you")
def thank_you():

    # request.args：读取 URL 中的查询参数。app.logger.info()：把这些信息打印到 Terminal，方便我们观察。
    app.logger.info(request.args)

    # return render_template(
    #     "thankyou.html",
    #     owner_name=request.args["o_name"]
    # )

    # return render_template(
    #     "thankyou.html",
    #     plantData=request.args
    # )

    #有没有数据都回到Thank you 这个页面，redirect如果你输入了数据，但我不想要url的数据，直接跳到thankyou页面，不要带数据参数的url

    if "o_name" in request.args:

        app.logger.info("first run to redirect")

        return redirect(url_for("thank_you"))

    else:

        app.logger.info("reloaded and redirected")

        return render_template("thankyou.html")

@app.errorhandler(404)
def page_not_found(e):

    #404 因为它代表 HTTP Status Code（HTTP 状态码）。如果不写后面的 404，虽然网页上可以显示 Error 404，但 Flask 默认可能返回 200 OK，让浏览器误以为访问成功。
    return render_template("404.html"), 404

# 	                       GET	                      POST
# 数据通常放在哪里	     URL查询参数	              Request Body
# 地址栏显示表单数据	     是	                          否
# Flask 读取表单数据     request.args	           request.form
# 常见用途	          搜索、筛选、查看信息	        提交表单、注册、修改数据
# 能否收藏含参数的URL	     通常可以	         无法仅靠收藏 URL 重现 POST 请求
# <form action="/thank_you" method="POST">
# @app.route("/thank_you", methods=["POST"])
# post 不再从 URL 的 args 里面找数据，而是从提交的 Form Data 中找。

@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/reg_thank_you", methods=["POST", "GET"])
def reg_thank_you():

    # GET 表单数据：通常用 request.args。
    # POST 表单数据：使用 request.form。
    # files 读取上传的文件 request.files。
    app.logger.info(request.method)
    app.logger.info(request.form)

    if request.method == "POST":

        fName = request.form["f_name"]
        lName = request.form["l_name"]

        return render_template(
            "thankyou_reg.html",
            fName=fName,
            lName=lName
        )

    # 一个 Function 可以写多个 return，但每次调用只能走到其中一个。
    return render_template("thankyou_reg.html")

@app.route("/inputSessionData")
def inputSessionData():
    return render_template("inputSessionData.html")

@app.route("/saveSession")
def saveSession():

    #读取数据
    app.logger.info(request.args["data_a"])

    #把这次 Request 收到的 Winnie，保存到 Session 中。
    session["data_a"] = request.args["data_a"]
    session["data_b"] = request.args["data_b"]

    return redirect(url_for("inputSessionData"))

#显示修改数据的网页
@app.route("/modifySessionData")
def modifySessionData():
    return render_template("modifySessionData.html")

#接收用户修改的数据，更新 Session
@app.route("/modifySession")
def modifySession():

    app.logger.info(request.args["data_a"])

    session["data_a"] = request.args["data_a"]
    session["data_b"] = request.args["data_b"]

    return redirect(url_for("modifySessionData"))

@app.route("/deleteSession")
def deleteSession():

#session当前用户的 Session /.pop()	删除指定 Key 及其 Value /"data_a"要删除的 Key /None如果 Key不存在，就不报错
    session.pop("data_a", None)
    session.pop("data_b", None)

    return redirect(url_for("modifySessionData"))

@app.route("/getForm")
def getFetchForm():
    return render_template("form_fetch.html")


@app.route("/getDataFromForm")
def getDataFromForm():

    app.logger.info(request.args)

    return {
        "data_received": "success",
        "owner": request.args["o_name"],
        "plantname": request.args["p_name"]
    }

@app.route("/addPlantExtended")
def addPlantExtended():
    return render_template("addPlantExtended.html")

@app.route("/postPlantFormFetch",methods = ['POST'])

@app.route("/postPlantFormFetch",methods = ['POST'])
def postPlantFormFetch():
    #key is the same as in the form :)
    uploadedfile = request.files['the_file']
    #save file to uploads folder filePath 是一个保存文件路径的变量，本身还没有执行保存操作。
    filePath = os.path.join(app.config['UPLOAD_FOLDER'], uploadedfile.filename)
    app.logger.info(filePath)
    #request.files 负责接收，os.path.join 负责生成路径，只有 save() 才真正保存文件。
    uploadedfile.save(filePath)
    app.logger.info(uploadedfile.filename)
    # the textual data will be in request.form
    app.logger.info(request.form)
    #return the file name + path
    return({"imagePath":filePath})

app.run(debug=True)