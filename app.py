from flask import Flask,request,render_template,url_for,jsonify
from flask_cors import CORS
import os
import json

app=Flask(__name__,template_folder='templates')
#fetchs the data b/w diff ports
CORS(app)

upload_folder = 'static/uploads'
app.config['UPLOAD_FOLDER'] = upload_folder
os.makedirs(upload_folder, exist_ok=True)

#inventory class
class inventory():
  #dict to store the products data
  products={}
  def __init__(self):
    #if file exits prints data
    if os.path.exists("sample.json"):
      with open("sample.json", "r") as f:
        self.products = json.load(f)

    else:
      self.products = {}


   #add products method
  def addprdt(self,product_id,product_name,price,product_img):
    self.product_id=product_id
    self.product_name=product_name
    self.price=price
    self.product_img=product_img

    with open('sample.json','w') as f:#opening a file
       #products data entry
      self.products[str(self.product_id)] = [
      self.product_name,
      self.price,
      self.product_img
      ]
      json.dump(self.products,f,indent=4)
    return True

         
   #remove product method
  def removeprdt(self,product_id):
    id_remove=str(product_id)
    if id_remove in self.products:
      self.products.pop(id_remove)
      with open('sample.json','w') as f:
       json.dump(self.products,f,indent=4)
      return True
    return False
  

 
   #show product details
  def show(self):
      return self.products
      

  #search product method      
  def search(self,search_product):
    search_product=str(search_product).lower()
    matching_products={}

    for product_id, product_data in self.products.items():
        product_name = str(product_data[0]).lower()
        if search_product in product_id.lower() or search_product in product_name:
            matching_products[product_id] = product_data

    return matching_products

invntobj=inventory()


#show product

@app.route('/',methods=['GET'])
def home():
  return render_template('index.html')

@app.route('/products',methods=['GET'])
def get_product():
  show_product=invntobj.show()
  return jsonify(show_product)

#admin log page
@app.route('/adminlog.html',methods=['GET'])
def show_adminlog():
  return render_template('adminlog.html')

#admin page
@app.route('/admin.html',methods=['GET'])
def show_admin():
  return render_template('admin.html')

#cart page
@app.route('/cart',methods=['GET'])
def show_cart():
  return render_template('cartpage.html')


#search product
@app.route('/search/<search_product>',methods=['GET'])
def search_product(search_product):
  search_result=invntobj.search(search_product)
  if search_result:
    return jsonify(search_result),200
  else:
    return jsonify({"error": "Product not found."}),404

#admin Authentication
@app.route('/adminlog',methods=['POST'])
def authentication():
  data=request.get_json()
  user_name=data.get('admin_user_name')
  admin_key=data.get('admin_password')
  if user_name=='karthik' and admin_key=='s@i123':
    return jsonify({'message':'login successfully!'}),200
  else:
    return '<h2>INVALID USER</h2>',401
  


#add the products

@app.route('/add',methods=['POST'])
def add_product():
  #storing the json data sent by js
  # data=request.get_json()

  # if isinstance(data,str):
  #   data=json.loads(data)

  p_id=request.form.get('product_id')
  p_name=request.form.get('product_name')
  p_price=request.form.get('product_price')
  p_img='https://via.placeholder.com/150'

  if 'product_image' in request.files:
    file = request.files['product_image']
    if file.filename != '':
      # filename=secure_filename(file.filename)
      file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
      file.save(file_path)
      p_img= file_path.replace('\\', '/')
      
  if not p_id or not p_name or not p_price:
    return jsonify({"error": "Missing data"})

  invntobj.addprdt(p_id,p_name,p_price,p_img)

  return jsonify({"message": f"product {p_name} is added successfully!"})



#remove product

@app.route('/remove/<product_id>',methods=['DELETE'])
def remove_data(product_id):
  success=invntobj.removeprdt(product_id)
  if success:
    return jsonify({"message": f"Product {product_id} deleted."}) 
  else:
    return jsonify({"error": "Product not found."})


#main function

if __name__=="__main__":
  app.run(host='0.0.0.0',debug=True)




