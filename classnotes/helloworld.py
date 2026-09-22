# conda info --envs , you need add the space for the words
# enivornment (setting up the 属性 for your pathon, you can have different version of python runing at differtent time)

# typing in the terminal it will only be one way things, once you close the terminal. it will disappear. 
# >>> print("hello world")
# hello world
# >>> var_one = 10 
# >>> print(var_one)
# 10
# >>> var_two = 20
# >>> var_3 = var_one + var_two 
# >>> print(var_3)
# 30
# >>> exit() if you want to end type exit()

# print("hello world")
# run the python file in terminal (pythonCart351) weinideMacBook-Pro:cart351 weiniwang$ python hello.py
# Hello World

# indentaion
# if 10 > 4:
#     print("ahahah!")

# print (25+30/7) #float division
# print (25+30//7) # integer division 

# print("Broccoli:", 100 - 25 * 3 % 4)
#--> order of precedence says (100 - (25 * 3) % 4) == 97. 25*3 and modulo then 余3 is 3. 100-3 +97

# print("Is it equal?",5==5) 等于 ==
# print("Is it not equal?",5!=5) 不等于！= 
#都会给你一个bollean value true or false

# bool_var_a = True
# bool_var_b = False
# bool_var_c = False

# # in java not_a =! bool_var_a 
# not_a = not(bool_var_a) #false
# and_a_b = bool_var_a and bool_var_b  #TTT TFF FFF
# or_a_b = bool_var_a or bool_var_b # 只要有T就是T

# 你需要定义你用的variables，然后你必须先定义上面的在才可以在下面用。

# Text Type: str
# Numeric Types: int （full number）, float （with 小数点）, complex
# Sequence Types: list, tuple, range
# Mapping Type: dict （distortionary）
# Set Types: set, frozenset
# Boolean Type: bool （t or f )
# Binary Types: bytes, bytearray 
# None Type: NoneType

# testVar = 5
# print(type(testVar)) 用这个可以让python自己告诉你你用的是什么data type

# my_name = "winnie"
# my_fav_fruit = "apple" # my_fav_fruit = f"my favorite fruit is {my_fav_fruit}" f就是告诉python后面的括号里是value
# saved_str = f"my favorite fruit is {my_fav_fruit}"
# my_fav_fruit = "kiwi" #就算你在这里改了你喜欢kiwi 还是会显示你喜欢苹果，因为order of your statement
# print(f"my favorite fruit is {my_fav_fruit}")

# #it will wait you input the wait and saved the value into your variables. 
# my_name = input("Name: ")
# my_fav_fruit =  input("Fav Fruit: ")
# my_fav_animal = input("Fav Animal: ")
# my_fav_veg = input ("Fav Veg: ")
# my_fav_color = input ("Fav Color: ")
# a_saved_fstring = f"Your fav fruit is {my_fav_fruit}"

# print(f"Your name is {my_name}")
# print(f"Your favorite color is {my_fav_color} and You also love {my_fav_animal}s")
# print(a_saved_fstring)

#help(round) in terminal you can help you find the functions