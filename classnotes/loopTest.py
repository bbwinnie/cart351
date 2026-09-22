# num=5
#function defaults to 0 as a starting value

# for i in range (num):
#     print(i)

# sum = 0
# for i in range(0, 20, 2): # where i start, where i stops , how much i add. range(i, j, k)
#     sum = sum +i
#     print(f"i-{i}")
#     print(f"sum-{sum}")
# print(sum)

# for index in range(20):
#   print(index)
# else: #到20了就跳finished for loop / 这个else 有没有都可以
#   print("finished for loop!")

# break break out the loop  #下面这个到3就会停止
# for index in range(10):
#   print(f"for loop :) {index}")
#   if index == 3:
#     break

# #if the break is executed then the else will NOT run.
# def test_break_else(num):
#   #go through loop
#   for index in range(num):
#     print(f"for loop :) {index}")
#     #condition for break
#     if index == 30:
#       print(f"breaking out")
#       break
#   #come here if we DO NOT break
#   else:
#     print("finished for loop - num is less than 30!")

#   #out of for loop clause
#   print(f"out of the foor loop")

# #test_break_else(20)
# #test_break_else(40)

# #python will do function first. so you can not call function at beginning.下面这段时可以加入input的
# testInput=int(input("add a number:"))
# test_break_else(testInput)

# Condition of the while loop (ctrl+c可以kill the loop)
number =int(input("Please input number: ")) 
while number < 20 :  
    print(f"in while loop: number is {number}\n")
    # Increment the value of the variable "number by 1"
    number = number+1 #如果没有这句话，这个就会一直执行loop
print(f"after the while loop: number is: {number}")