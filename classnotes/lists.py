#  python classnotes/lists.py

# fruits = ["oranges","bananas","melons","strawberries"]
# for el in fruits:  （el = element in = 在。。。里面）
#     print(f"i love {el}") #我的用f才能用el as a value to print out 

# testString = "A wonderful sunshiny day"
# for ch in testString:
#     print(ch)

# newItems = [] #empty list
# newItems.append("first") #append()给list加东西在list最后
# # print(newItems) 这个是直接print list
# # (pythonCart351) weinideMacBook-Pro:cart351 weiniwang$ python classnotes/lists.py
# # ['first']
# print(newItems[0]) #这个是pring list 的第一个item
# # (pythonCart351) weinideMacBook-Pro:cart351 weiniwang$ python classnotes/lists.py
# # first

#len（）allow us acces the whole list
#insert（which index，”new element“)
#extend marge two list 组合两个list 
#error 就是输入有问题

# #sort可以排序
# listToSort = ['water','question','apples','wander']
# listToSortBools = [True,True,False,True]
# listToSort.sort()
# print(listToSort)
# listToSort.reverse() #reverse the list
# print(listToSort)
# listToSortBools.sort()
# print(listToSortBools)
# #pop 从 list 里拿走一个元素，而且这个元素会被返回。

# element_list = ["hydrogen", "helium", "lithium", "beryllium", "boron"]
# glue = ", and "
# single_str = glue.join(element_list) #the glue is the one called list
# print(single_str)


# print(aList[1:5]) #start 1 up to 5 not including 5
# stepA = aList[::2] # step every 2 element a time

# aList = [1,2,3,4,5,'a','b','c','d','e'] 
# negA = aList[-2:] # Get elements starting from index -2 to end of list 从倒数第二个开始
# print(negA)
# #Get from index 1 to last (excluding last)
# negE= aList[1:-1]
# print(negE)

# len(fruits)              # list里有多少个东西
# fruits[0]                # 拿第0个东西
# fruits.index("banana")   # banana在第几个位置

# rList = [1,2,3,4,5,'a','b','c','d','e'] 
# rList[0:2] = 'zz'  
# (pythonCart351) weinideMacBook-Pro:cart351 weiniwang$ python classnotes/lists.py
# ['z', 'z', 3, 4, 5, 'a', 'b', 'c', 'd', 'e']
## replace [1,2] with ['z','z']  this index should be use this charactor if you want to add string you need using insert
# print(rList)


# greek = ["alpha", "beta", "gamma", "delta", "epsilon","zeta"]
# new_letters = "eta theta"
# new_letters_list = new_letters.split(" ") # <-- replace this

# print(new_letters_list)

# 从new letters list 里的element 放进 letter——name里
# for letter_name in new_letters_list:
# 	greek.append(letter_name)  # <-- and replace this

# print(greek)

franken_1 = open("data/frankenstein.txt").read()
#count
count_my = franken_1.count("my")
print(count_my)
#length
lenText = len(franken_1)
print(lenText)

print(franken_1.replace("my", "*********MY*****"))
print(franken_1)
