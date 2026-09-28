# class_professors = {'Cart_253_A':'Pippin Bar',
#                     'Cart_211':'Brad Todd',
#                     'Cart_214':'Joanna Berzowska', 
#                     'Cart_215':'Jonathan Lessard'}
# print(type(class_professors))
# specialList = {17: [1.6, 2.45], 42: [11.6, 19.4], 101: [0.123, 4.89]}
# # print(specialList[17]) #用key去找
# # print(type(specialList[17])) #用key去找
# # print(specialList.keys()) #print the key
# # for key in specialList.keys(): #print the inform inside the key
# #     print(specialList[key])

# print(specialList.values()) #reten as a lists
# for value in specialList.values():
#     print(value)
# print(specialList.items()) #but note that the output is a **tuple** dict_items([(17, [1.6, 2.45]), (42, [11.6, 19.4]), (101, [0.123, 4.89])])
# for key_val in specialList.items():
#     print(key_val) 
#     print(key_val[0])

# #可以用这个做检查
# print('Cart_253_A' in class_professors )
# #True
# print('Cart_253' in class_professors )
# #False

# shopping = {
#             'vegetables': ['spinach', 'carrots','broccoli','lettuce'],
#             'fruit': ['canteloupe', 'banananas'],
#              'bakery': ['bagels', 'rye bread'],
#             }

# shopping["vegetable"][0] # 这个等于 spinach 

# shopping = {
#             'vegetables': [{'spinach':["green","blue"]}, 'carrots','broccoli','lettuce'],
#             'fruit': ['canteloupe', 'banananas'],
#              'bakery': ['bagels', 'rye bread'],
#             } # {}这个是 dictionary []这个是list 所以你要找绿的就是dictionary得用文字item找，然后value得用index找

# shopping["vegetable"][0]["spinach"][0] # 这个等于 spinach 

#adding thing to dictionary
shopping_rev = {
            'vegetables': {"green":["spinach","broccoli","lettuce"],"orange":["carrots"]},
            'fruit': ['canteloupe', 'banananas'],
             'bakery': ['bagels', 'rye bread'],
            }

shopping_rev["cleaning_items"] = ["dish-soap", "sponges"]
print(shopping_rev)
shopping_rev["cleaning_items"].append("bleach")
print(shopping_rev)

