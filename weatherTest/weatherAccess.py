#pip list 在终端可以查看list of enivornment 
#import the lib
import requests

#city arg
city="Montreal"

#my api key
api_key = "2ba267fc5ab5b4c99201b8efab509d99" 

#url to get results with the city added
url_with_city ="http://api.openweathermap.org/data/2.5/weather?q=" +city 

#url with the api key appeneded
url_to_send = url_with_city + "&APPID=" + api_key 
#response = requests.get(bare_url , params={"q": city, "APPID":api_key }) 可以用这个more 干净整洁for ask requests

#make the request
response = requests.get(url_to_send) 

#get the response as json
data = response.json() 

#print
print(data)
print(type(data)) #因为是个dictionary 所以mains key and value 
print (data.keys())

print(data["weather"])
print(type(data["weather"]))
