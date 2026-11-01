from flask import Flask
# flask 小写是 python package 安装的包，Flask大写是里面的一个class类 from。。。import。。。是从某个包中导入需要使用的东西 （简单的来说就是从从 flask 这个工具箱中，拿出 Flask 这个工具。）


# basic route： 固定的 / @app.route() 决定访问什么网址，而 def index() 决定这个网址返回什么内容
app = Flask(__name__)

@app.route("/")
def index():
    return "<h1>Hello CART 351!</h1>"

@app.route("/about")
def about():
    return '<h1 style="color:purple">About Cart 351!</h1>'

# 加网页 /后的新网页
@app.route("/cat") 

# 定义网页名字每次都得改
def cat():
    # 输出的内容
    return '<h1 style="color:red"> Hello! my cat!</h1>'


# Dynamic Route 做route（给不同的用户不同的域名）
# 接受一个名字，然后存到name里
@app.route("/user/<name>")
# 下面这个name 是 parameter 参数
def user_profile(name):
    # 有了f才会吧变量变成文本
    return f"<h2>This is {name}'s profile page</h2>"


@app.route("/another/<dynamicVar>")
def another_route(dynamicVar):
    return f"<h2>The 100th letter of {dynamicVar} is {dynamicVar[99]}</h2>"

@app.route("/catlatin/<name>")
def catlatin_route(name):

    # 如果名字以 y 结尾 检查名字是不是以y结尾 用end.swith
    if name.endswith("y"):
        # 如果名字不是以 y 结尾   name[:-1] 保留字符串除了最后一个的
        new_name = name[:-1] + "iful"
    else:
        new_name = name + "y"

    return f"<h1>{new_name}</h1>"

# Debug Mode 帮助我们找到程序错误。 还可以自动重启服务器，就不需要ctrl+c了
app.run(debug=True)


