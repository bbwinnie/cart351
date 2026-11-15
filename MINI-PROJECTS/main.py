# This flask application connect the website to a JSON file.
# It displays the home and garden pages, loads saved emotions 
# and saves new emotion records submitted by users.
from flask import Flask,render_template,url_for,request
import json


app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/garden')
def garden():

    #read saved emotions from JSON
    jsonFile = open("files/emotion.json","r")
    emotions =json.load(jsonFile)
    jsonFile.close()

    #send emotions to the garden page
    return render_template("garden.html",emotions = emotions)

#Get saved emotions from JSON
@app.route('/getEmotions')
def getEmotions():

   #read the existing emotions from JSON
   jsonFile = open("files/emotion.json","r")
   emotions = json.load(jsonFile)
   jsonFile.close()

   return{"emotions":emotions}

#receive emotion data from JS using a post request.
#save the new emotion to the json file so it can be loaded later.
@app.route('/saveEmotion',methods=["post"])
def saveEmotion():
    #get data from the form
    feeling = request.form["feeling"]
    intensity = int(request.form["intensity"])
    note = request.form.get("note","")
    timestamp = request.form.get("timestamp","")

    #create a new emotion record
    newEmotion = {
        "feeling":feeling,
        "intensity":intensity,
        "note":note,
        "timestamp":timestamp
    }

    #read the existing emtions from JSON
    jsonFile = open("files/emotion.json","r")
    emotions = json.load(jsonFile)
    jsonFile.close()

     #add the new emotion
    emotions.append(newEmotion)

    #save the updated emotions to JSON
    jsonFile = open("files/emotion.json","w")
    json.dump(emotions,jsonFile,indent=4)
    jsonFile.close()

    return {"saved":True}

#read 

app.run(debug=True)