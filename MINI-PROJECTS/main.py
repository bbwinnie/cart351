from flask import Flask,render_template,url_for,request
import json


app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/garden')
def garden():
    return render_template("garden.html")

#Get saved emotions from JSON
@app.route('/getEmotions')
def getEmotions():

   #read the existing emotions from JSON
   jsonFile = open("files/emotion.json","r")
   emotions = json.load(jsonFile)
   jsonFile.close()

   #add the new emotion
   emotions.apped(newEmotion)

   #save the updated emotions to JSON
   jsonFile = open("files/emotion.json","w")
   json.dump(emtions,jsonFile,indent=4)
   jsonFile.close()

   return{"emotions":emotions}

#save a new emotion into JSON
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



app.run(debug=True)