# var_a = 33
# var_b = 200

#using input and if-elseif int(convert string to number）python can check the input after user input
var_a = int(input("Enter another integer a:"))
var_b = int(input("Enter another integer b:"))

if var_b > var_a:
    print("b is greater than a")
#else if = elif
elif var_a>var_b:
    print("a is greater than b")
#你可以放很多elif，但是else需要在最后
else:
    print("a==b")
