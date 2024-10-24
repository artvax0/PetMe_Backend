![Logo](https://github.com/user-attachments/assets/2e63cb0f-5ed0-45ae-809e-e02a7bb95beb)  

# PetMe - Backend

This is a clone of the backend side of [PetMe](https://github.com/artvax0/PetMe) repo, which will become available to public once the frontend side is complete.  

PetMe is an e-commerce project for pet related items and care.

Review this document thoroughly and the documentation written in Postman in-order to get the optimal and expected result from this repository.  

This repository is educational and was made as part of my Fullstack Web Development course in HackerU's (ThriveDX) online course's assignment.  

This project is protected by copyright law and cannot be used outside the purpose of examining this assignment. Any of my code, illustration, endpoints, idea, name, or brand- made or changed without my permission will be claimed under my name and will be followed up in a lawful action.  
## Installation

Clone this repository  

Install PetMe - Backend with npm  

```bash
  npm i
```

### Environment Values

After all the libraries have been installed, create a **.env** file  
The name of the environmental variables must remain the same for the code to work properly.  
The .env file will have the following:  
* `ATLAS_CONT` - The connection string to Atlas's cloud, you may put a connection string to any cloud you want
* `LOCAL_CONT` - The connection string to a local database on your machine, I recommend you use mongodb compass, with the connection string **mongodb://127.0.0.1:27017/petMe** you may altername *petMe* with any name you'd like your database to be named  
* `PORT` - The port will be **8181** this can be changed only if in the endpoints URL you change the port accordingly, and if you update the initial users' images URL after changing the port  
* `SECRET_KEY` - This is the second most important environment variable, this can be any value you want it to be. I recommend a **strong, random, unpredictable and unique long key no one knows**, or using a generator to generate a long and strong key for you - Beware: If you change the secret key again, all your currently in-use tokens will be invalid

### Launching the Server

After creating and saving your .env file, start the server in development mode to create initial data in your server 
```bash
  npm run dev
```
This will create three users for you:  
* An admin user  
* An employee user  
* A regular user  

In addition, it will create all 6 allowed pets in the database, 11 categories, 3 mock products, 3 carts; one for each user, and 3 "completed" orders; one for each user  

Detailed information about each of the initial mock data created will be listed further down below  

## Features

### REST API  

This backend is using REST API for the following:
- Add (register), login, get user details, and update users.
- Add, get cateogory details, and update categories.
- Add, and get pet details.
- Add, get product details, update product, update stock and delete products.
- Add, get, empty, and add products to users' carts.
- Add, get, and update order statuses.  
Only products can be deleted from the database using the endpoints. Users, categories, pets, carts and orders will remain saved in the database.  

### Logging  

This project uses chalk and Morgan logger in-addition to NodeJS's File System to log the endpoints, and create/change external logs upon encountering responses with status code 400 and above, and will order these external logs by day of the year.  

The */logs* folder is being ignored by **.gitignore** and will not upload to the github repository, this can be changed by removing it from the .gitignore file.  
Make sure nothing else is removed from said file.

### Password Encryption  

The users' passwords are encrypted and hashed with the bcryptjs library, and will **never return** from the endpoint response in the user's objects, using the lodash library.  

### CORS  

The backend is currently programmed to only accept requests sent by **http://localhost:5173** - this will be the local frontend project once completed.  

### Environments  

This project is using the config and dotenv libraries to separate and control the environments and config files.  

The configuration files hold the following information:  
- Token Generator - Which token generator the environment uses (Default: jwt)  
- Logger - Which logging method the environment uses (Default: morgan)  
- Validator - Which validator the environment uses (Default: joi)  
- Db - Which database the environment uses (Default: mongodb)  

There are only two environments:
- Development
- Production  

At the current moment and as configured by me, both environments share the same default configuration settings, the only difference is that the production environment will use the *ATLAS_CONT* connection string.  

### Tokens, Authentication and Authorization  

The server uses JSON Web Tokens (JWT) to create and decrypt tokens using a secret key (SECRET_KEY environment variable), most endpoints will require a valid token in the header of the request known as **auth-token** to make said requests.  

### Validations  

The server uses the joi library to validate the schemas and requests made by the user, to fit mongoose's schemas.  
Follow the validation rules provided by the endpoints' documentation to pass proper objects in the requests.  

### Static Files  

The server allows the use of a public static folder, currently, the server has an *images* folder which holds three avatars, used by the initial mock data.  

### Initial Mock Data  

When the server is ran in development mode, the server will search all database documents, if any of the documents are empty- it will initialize said document with 3 premade models.  

*Note: All initial datas are mock-ups and are not in any way realistic, and may not be used or attempted to be used outside of the project.*

#### Users  

The first user is both an admin and an employee level user, and may be accessed with the following login credentials:  

> **Email:** yotta@terracotta.com  
>  
> **Password:** 1yotta!Terracotta  

The second user is an employee level user, and may be accessed with the following login credentials:  

> **Email:** lthompson@petme.com  
>  
> **Password:** L@thompson321  

The third user is a regular level user, and may be accessed with the following login credentials:  

> **Email:** peterjones@test.com  
>  
> **Password:** peterJones!123  

#### Categories  

The server will create 11 categories with the names and descriptions as such:  

> Food  
>  
>> Pet food products that offer balanced nutrition for animals, including dry, wet, and specialized diet options for various types of pets. This includes grain-free, organic, or veterinary-approved formulas.

> Treats  
>  
>> A range of tasty snacks designed for rewarding pets during training or as a treat. These include dental chews, training treats, rawhide bones, and species-specific snacks like catnip for cats or chew sticks for small mammals.  

> Toys  
>  
>> Interactive, durable, and entertaining products for pets that promote exercise and mental stimulation. Includes plush toys, squeaky toys, chew toys, laser pointers, and puzzle feeders tailored to different pet species..  

> Bedding & Furniture  
>  
>> Comfortable sleeping arrangements and furniture for pets, including beds, mats, hammocks, scratching posts, and pet-specific furniture like cat trees or small pet habitats.  

> Grooming Products  
>  
>> Essential care products to maintain pet hygiene, such as shampoos, brushes, nail clippers, ear cleaners, and deshedding tools. These products cater to different skin and fur types, including sensitive and medicated options.  

> Health & Wellness  
>  
>> Products aimed at supporting the overall health of pets, including vitamins, supplements, flea/tick prevention, dental care items, first aid kits, and specialized medications for common pet health issues.  

> Clothing & Accessories  
>  
>> Apparel and functional accessories designed for pets, such as sweaters, raincoats, booties, and harnesses. This category also includes decorative items like bandanas and seasonal costumes for pets.  

> Feeding & Watering Supplies  
>  
>> Bowls, dispensers, and feeders that help with portion control and hydration. Includes automatic feeders, water fountains, slow-feeder bowls, and portable travel bowls for pets.  

> Training & Behaviour Aids  
>  
>> Products that assist in training pets and modifying behavior. This includes training clickers, pee pads, litter boxes, calming collars, and gates or crates for managing pets indoors.  

> Travel & Outdoor Gear  
>  
>> Equipment and supplies that make traveling with pets safer and more comfortable, including carriers, car seat covers, pet strollers, life jackets, and outdoor gear like dog backpacks and outdoor kennels.  

> Pet Tech  
>  
>> Technology-focused products designed for pet care, including GPS trackers, activity monitors, smart collars, and interactive devices like treat dispensers and pet cameras that connect to apps.  

#### Pets  

There are only 6 allowed pets in the database:  
- Dogs  
- Cats  
- Birds  
- Fish  
- Rodents  
- Reptiles  

#### Other initial data  

The server will create 3 mock products, carts and orders and link them together with the relevant IDs.  

### Products Stock, Discounts, Carts, and Orders  

The server will automatically create a cart for each other that registers, there can only be one unique cart for each user.  

A product can be on sale by providing a discount percentage to it, as well as a start and end date to the discount, additionally, products have limited stock which is provided when a product is created, or when an employee changes the stock amount of said product.  

Every time a cart object is being called, it will check all its products for:
- Is the product still in stock?  
- Is the product currently having a sale?  

If the product is in stock, it will flag the **isStocked** key in the cart as true, and will flag it as false otherwise. This can be used by the frontend to block the "Order" button.  

If the product is currently having a discount, it will adjust its total product price accordingly.  

When creating the order, the same check method is used on each of the produce.  

## 🛠 Skills
This project uses NodeJS, and REST API.  

**Dependencies:**  

- bcryptjs: 2.4.3  
- chalk: 5.3.0  
- config: 3.3.12  
- cors: 2.8.5  
- cross-env: 7.0.3  
- dotenv: 16.4.5  
- express: 4.21.0  
- joi: 17.13.3  
- jsonwebtoken: 9.0.2  
- lodash: 4.17.21  
- mongoose: 8.6.3  
- morgan: 1.10.0  




## API Reference

#### The API can be referenced in the Postman documentation listed [here](https://documenter.getpostman.com/view/36563774/2sAY4rF5Km).  

Make sure to read the API reference thoroughly.  

