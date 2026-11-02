from flask import Flask,render_template,request,redirect,url_for
import requests

app = Flask(__name__)


# the default route
@app.route("/")
def index():
      return render_template("index.html")

#*************************************************
#Task-1: GET REQUEST
@app.route("/t1")
def t1():
    return render_template("t1.html",have_results=False)

#*************************************************
@app.route("/getSearchCriteria")
def getSearchCriteria():
    spaceImage = request.args.get("space")

    nasaURL = f"https://images-api.nasa.gov/search?q={spaceImage}&media_type=image"

    nasaResponse = requests.get(nasaURL)

    print(nasaResponse.status_code)

    spaceData = nasaResponse.json() 

    spaceList = spaceData["collection"]["items"]

    firstItem = spaceList[0]

    description = firstItem["data"][0]["description"]
    imgFromNasa = firstItem["links"][0]["href"]

#replace the empty space to be url encoded
    imgFromNasa = imgFromNasa.replace(' ', '%20')
    return render_template("t1.html",
                              have_results = True,
                              description=description,
                              imgPath = imgFromNasa
                                           
                           )


#*************************************************
# #Task-2: GET REQUEST
# @app.route("/t2")
# def t2():
#     return render_template("t2.html")
#*************************************************
@app.route("/getSearchCriteria_adv")
def getSearchCriteria_adv():
 #fill me in :
#  return render_template("t2.html",images=encodedImageLinks)
    pass
#*************************************************

#run
app.run(debug=True)