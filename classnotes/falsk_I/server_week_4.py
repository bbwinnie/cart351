from flask import Flask, render_template 
# render_template : 让 Flask 找到 HTML 文件，并把它渲染成网页。

app = Flask(__name__)

@app.route("/")
def index():
    # 返回一个 HTML 模板
    return render_template("pineapple.html")

@app.route("/another")
def another():
    return render_template("pineapple_2.html")

# 添加变量在html里 (HTML 不需要修改，Python 变量改变，网页内容就可以跟着改变。)
# @app.route("/three")
# def three():
#     someNewVar = "Sabine"
#     return render_template("pineapple_three.html", my_variable=someNewVar)

# list : List 用数字 Index 找值
@app.route("/three")
def three():
    # list
    someNewVar = "Sabine"
    someList = ["one", "two", "three"]
    # Dictionary ：Dictionary 用 Key 找值。
    someDict = {
        "color": "yellow",
        "feature": "spiky",
        "taste": "delicious"
    }
    return render_template("pineapple_three.html", my_variable=someNewVar, my_list=someList,my_dict=someDict)

# 自动列表
@app.route("/four")
def four():
    # HTML 不需要知道 List 里有多少个元素，它会自动重复相应的次数。
    a_new_list = [1, 2, 3, 4, 5]
    # a_new_list = [10, 20, 30]

    b_new_list = [
        "yellow", "orange", "blue",
        "green", "turquoise", "fuscia", "navy"
    ]

    return render_template("pineapple_four.html", a_num_list=a_new_list,color_list=b_new_list)

# 用户登陆
# Python 负责准备数据，Jinja 根据这些数据决定显示哪一部分 HTML。
@app.route("/five")
def five():
    userLoggedIn = False

    return render_template(
        "pineapple_five.html",
        user_bool=userLoggedIn
    )

app.run(debug=True)