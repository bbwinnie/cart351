from flask import Flask,render_template,request,session,redirect,url_for
import os

app = Flask(__name__)
app.secret_key = "BAD_SECRET_KEY"

UPLOAD_FOLDER = 'static/uploads' 
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 # 16 MB limit

#DEFAULT ROUTE
@app.route('/')
def index():
   return render_template("index.html",
                           user={"username":"sabine"},
                           passedDictionary={
                                            "fav_color":"fuscia", 
                                             "fav_veg":"cauliflower",
                                             "fav_fruit":"kiwi",
                                             "fav_animal":"toucan"
                                             },
                            imgPath = "../static/images/pineapple_2.jpg"
                                        
                        )

# INPUT FORM
@app.route("/inputPlant")
def addPlantData():
    return render_template("addPlantData.html") 

#@app.route("/thank_you")
#def thank_you():
    #app.logger.info(request.args)
    #return render_template("thankyou.html") 
    #return render_template("thankyou.html",owner_name = request.args["o_name"]) 
    #return render_template("thankyou.html",plantData = request.args) 

#THANKS
@app.route("/thank_you")
def thank_you():
    app.logger.info(request.args)
  
    if('o_name' in request.args):
        owner_name = request.args["o_name"] 
        app.logger.info("first run to redirect")
         #url is not clean
        #return render_template("thankyou.html",plantData = request.args) 
        
        # issue we lose the parameters! - but url is clean :)
        return redirect(url_for("thank_you")) 
    #part of the reloading process... we redirect - then headers rewritten and reload the template
    else:
        app.logger.info("reloaded and redirected")
        return render_template("thankyou.html") 
#error
@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"),404

#register
@app.route("/register")
def register():
     return render_template("register.html")

@app.route("/reg_thank_you",methods = ['POST', 'GET'])
def reg_thank_you():
     app.logger.info(request.method)
     app.logger.info(request.form)
     app.logger.info(request.form["f_name"])
     app.logger.info(request.form["l_name"])
     fName = request.form["f_name"]
     lName = request.form["l_name"]
     return render_template("thankyou_reg.html", fName = fName, lName=lName)
     #return render_template("thankyou_reg.html")

#add session route app = flask
@app.route('/inputSessionData')
def inputSessionData():
    return render_template("inputSessionData.html")

# becuase html have action saveSession, so the main.py need below to link connection
@app.route('/saveSession')
def saveSession():
    app.logger.info(request.args['data_a'])
    #reload  - use url_for() here :) - the function...
    #but note that the data will be gone
    # so add in a session variable
    session['data_a'] = request.args['data_a']
    session['data_b'] = request.args['data_b']

    session['counter'] = 0
    return redirect(url_for('inputSessionData'))

# flask will save the data in the cokkies, you can copy past the data and 解码按下面步骤
# eyJkYXRhX2EiOiJvcmFuZ2UiLCJkYXRhX2IiOiJraXdpcyJ9（到这个点之前是你的data）.aujdFA.vnJLWci3q74qqUb1tQsYjeWYAtY

# allow pasting
# atob("eyJkYXRhX2EiOiJvcmFuZ2UiLCJkYXRhX2IiOiJraXdpcyJ9")
# '{"data_a":"orange","data_b":"kiwis"}'

#modify session route
@app.route('/modifySessionData')
def modifySessionData():
    return render_template("modifySessionData.html")

@app.route('/modifySession')
def modifySession():
    app.logger.info(request.args['data_a'])

    #reload  - use url_for here :) - the function...
    #but note that the data will be gone
    # so add in a session variable
    session['data_a'] = request.args['data_a']
    session['data_b'] = request.args['data_b']
    session['counter'] = session['counter']+1
    return redirect(url_for('modifySessionData'))

@app.route('/deleteSession')
def deleteSession():
    # Clear the session data stored in the session object using pop for delet
    session.pop('data_a', default=None)
    session.pop('data_b', default=None)
    return redirect(url_for('modifySessionData'))

# aroute
@app.route('/getForm')
def getFetchForm():
    return render_template("form_fetch.html")

# for the get
@app.route('/getDataFromForm')
def getDataFromForm():
    app.logger.info(request.args)
    return ({"data_received":"success",
    "owner":request.args['o_name'],
    "plantname":request.args['p_name']})

# another route
@app.route('/addPlantExtended')
def addPlantExtended():
    return render_template("addPlantExtended.html")

@app.route("/postPlantFormFetch",methods = ['POST'])
def postPlantFormFetch():
     #key is the same as in the form :)
    uploadedfile = request.files['the_file']
    #save file to uploads folder
    filePath = os.path.join(app.config['UPLOAD_FOLDER'], uploadedfile.filename)
    app.logger.info(filePath)
    uploadedfile.save(filePath)
    app.logger.info(uploadedfile.filename)
     # the textual data will be in request.form 
    app.logger.info(request.form)
    #return the file name + path
    return({"imagePath":filePath})
    # app.logger.info(request.form)
    # return({"test":"nothing"})
app.run(debug=True)