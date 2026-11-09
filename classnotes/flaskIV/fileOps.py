# Open rainbow.txt in append mode
# r – Read-only mode. This mode allows you to read from the file, but you can’t make any changes to it. It raises an error if the file is not existing on your system.
# w – Write-only mode. This mode allows you to write to the file, but you can’t read from it. It creates the file if it does not exist on your system. It will overwrite if the file is present in your system.
# a – Append-only mode. This mode allows you to write to the file, but you can’t read from this mode. It creates the file if it does not exist on your system. It will add new data if the file already has data.
# r+ – Read + Write mode. This mode allows you to read from and write to the file. It raises an error if the file is not existing on your system.
# w+ – Write + Read mode. This mode allows you to read from and write to the file. It creates the file if it does not exist on your system. It will overwrite if the file is present in your system.
# a+ – Append + Read mode. This mode allows you to read from and write to the file. It creates the file if it does not exist on your system. It will add new data if the file already has data.
rainbowFile = open("/Users/weiniwang/Desktop/CONCORDIA/cart351/classnotes/flaskIV/files/rainbow.txt", "r")

#1 charachter = 1 bit / read first 4 chars
out = rainbowFile.read(4) 
# print(out)

#空括号代表 read all (但是这个读取是跟着上一次的内容继续读取。。)
outAll = rainbowFile.read() 
# print(outAll)

#这个seek0 代表从头开始读。。这样就能重新读了
rainbowFile.seek(0)
out_all_again = rainbowFile.read()
# print(out_all_again)

#go back to beginning 只读一行
#readline(): Reads one line of the file and returns in form of a string.
rainbowFile.seek(0)
oneLine = rainbowFile.readline()
# print(oneLine)

#go back to beginning
rainbowFile.seek(0)
#stored in a list - each line is one element in the list
#readlines(): Reads all the lines and return them as each line a string element in an iterable list
allLines = rainbowFile.readlines()
# print(allLines)
# print(allLines[0])

# sampleFile = open("/Users/weiniwang/Desktop/CONCORDIA/cart351/classnotes/flaskIV/files/sample_text_rev.txt", "w")

# for i in range(3): 
#     a_name = input("Enter the name of the animal: ") 
#     sampleFile.write(a_name) 
#     sampleFile.write("\n") 
# sampleFile.close() 
# print("Data is written into the file.") 

# colorList = [] 
# for i in range(3): 
#     a_name = input("Enter the name of a color: ") 
#     colorList.append(a_name + '\n') 
# sampleFile.writelines(colorList) 
# sampleFile.close() 
# print("Data is written into the file.") 

sampleFile_a = open("/Users/weiniwang/Desktop/CONCORDIA/cart351/classnotes/flaskIV/files/sample_text.txt", "a")
nameList = [] 
for i in range(3): 
    a_name = input("Enter the name of someone in your class: ") 
    #append means adding to the end
    nameList.append(a_name + '\n') 
sampleFile_a.writelines(nameList) 
sampleFile_a.close() 
print("Data is written into the file.") 




