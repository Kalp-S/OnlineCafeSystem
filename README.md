# Online Cafeteria System

## Background
  The online cafeteria system was a final project for a 4rth year software engineering undergraduate course. The project was based around servicing a company wide cafeteria where employee's can order food from various vendors. Some inspiration was taken from existing solutions on the market; namely Ritual (food ordering platform), where users can order food ahead of time from vendors on the platform for pickup at a later time.

## What does the project do?
  This project simulates a browser based online food ordering system. Users can order food from vendors on the platform for pickup in the upcoming days. Users are able to order food in advance, but not within 12 hours of the pickup date. Caterers on the platform are able to view existing orders, and modify future offerings.
   
 ## How does the project work?
 End users are split into three categories:
   - User: Have the ability to order food from caterer. Can also register to the platform as an employee of their company.
   - Company: Can register onto the platform. Have the ability to add/remove users into/off the system.
   - Caterer: Have the ability to access specific caterer pages where they can update menu offerings and view remaining orders.
   - Admin: Have the ability to modify user + caterer + company access and have the ability to change personal information of all parties.
  
  At launch, the program begins with only 1 account on the system, with admin privleges. Caterer accounts and company accounts can be added to the system by the admin when     necessary. Company accounts can also be input to the system by registering themselves. Users accounts can then be input to the system by the company or user accounts can be   added by signing up with a company on the system.
  
  From this point on, users can interact with the system to order food/cancel orders, modify user information. Meanwhile caterers can check orders, edit menu items
  
  
  ## Screenshots:
  
  Login Page
  ![alt text](https://raw.githubusercontent.com/Kalp-S/OnlineCafeSystem/master/Demo%20Pictures/LoginPage.png "LoginPage")
  
  ### Company
  Invalid Company Login
  ![alt text](https://raw.githubusercontent.com/Kalp-S/OnlineCafeSystem/master/Demo%20Pictures/InvalidLoginCompany.png "InvalidLoginCompany")
  
  Company Main Page (Lists current employee's on the system, not initially populated)
  ![alt text](https://raw.githubusercontent.com/Kalp-S/OnlineCafeSystem/master/Demo%20Pictures/CompanyLoginPage.png "CompanyLoginPage")

  Add Employee
  ![alt text](https://raw.githubusercontent.com/Kalp-S/OnlineCafeSystem/master/Demo%20Pictures/AddPerson1.png "AddPerson1")

  Delete Employee
  ![alt text](https://raw.githubusercontent.com/Kalp-S/OnlineCafeSystem/master/Demo%20Pictures/DeleteEmployee.png "DeleteEmployee")
  ![alt text](https://raw.githubusercontent.com/Kalp-S/OnlineCafeSystem/master/Demo%20Pictures/CompanyLoginPageUpdated2.png "CompanyLoginPageUpdated2")

  ### Caterer
  
  Invalid Caterer Login
  ![alt text](https://raw.githubusercontent.com/Kalp-S/OnlineCafeSystem/master/Demo%20Pictures/InvalidLoginCaterer.png "InvalidLoginCaterer ")
  
  Caterer Main Page
  ![alt text](https://raw.githubusercontent.com/Kalp-S/OnlineCafeSystem/master/Demo%20Pictures/CatererLoginPage.png "CatererLoginPage")

  Caterer Add to Menu
  ![alt text](https://raw.githubusercontent.com/Kalp-S/OnlineCafeSystem/master/Demo%20Pictures/AddFood.png "AddFood")

  Caterer View Orders
  ![alt text](https://raw.githubusercontent.com/Kalp-S/OnlineCafeSystem/master/Demo%20Pictures/CatererViewOrder.png "CatererViewOrder")


  ### User
  Employee Registration
  ![alt text](https://raw.githubusercontent.com/Kalp-S/OnlineCafeSystem/master/Demo%20Pictures/RegisterEmployee.png "RegisterEmployee")

  Invalid User Company Entry Error
  ![alt text](https://raw.githubusercontent.com/Kalp-S/OnlineCafeSystem/master/Demo%20Pictures/AddEmployeeInvalidCompany.png "AddEmployeeImvalidCompany")

  User Place Order Page
  ![alt text](https://raw.githubusercontent.com/Kalp-S/OnlineCafeSystem/master/Demo%20Pictures/UserPlaceOrder.png "UserPlaceOrder")

  User Settings
  ![alt text](https://raw.githubusercontent.com/Kalp-S/OnlineCafeSystem/master/Demo%20Pictures/UserSettings.png "UserSettings")

  User View Order
  ![alt text](https://raw.githubusercontent.com/Kalp-S/OnlineCafeSystem/master/Demo%20Pictures/UserViewOrder.png "UserViewOrder")

  User Delete Item from Order
  ![alt text](https://raw.githubusercontent.com/Kalp-S/OnlineCafeSystem/master/Demo%20Pictures/UserDeleteItemSuccess.png "UserDeleteItemSuccess")
  ![alt text](https://raw.githubusercontent.com/Kalp-S/OnlineCafeSystem/master/Demo%20Pictures/UserDeleteItemSuccessUpdate.png "UserDeleteItemSuccessUpdate")

  User Delete Item from order fail (due to cancel condition)
  ![alt text](https://raw.githubusercontent.com/Kalp-S/OnlineCafeSystem/master/Demo%20Pictures/UserDeleteOrderFail.png "UserDeleteOrderFail")


## Demo Video
  Demo Video: [Link](https://drive.google.com/file/d/1aB6g_3Au31SJBCjUM7RhuS4FLITSGOQ3/view?usp=sharing)
  
## Required Dependencies
 - npm
 - DynamoDB
 - Node
 - React
