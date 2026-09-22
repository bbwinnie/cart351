# def least_difference(x1,x2,x3): #this the lable for this function
#     diff1 = abs(x1 - x2) #abs:absolute value 绝对值
#     diff2 = abs(x1 - x3)
#     diff3 = abs(x2 - x3)
#     return min(diff1,diff2,diff3) #When Python encounters a return statement, it exits the function immediately, and passes the value on the right hand side to the calling context.

# print(least_difference(1,2,3))

#这里是function设置
def write_A_String(printVar):
    print(f"hello{printVar}")
stringToPrint = "sabine"

#这里就是调用function
write_A_String(stringToPrint)
write_A_String("nerly")

