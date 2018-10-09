# Implementation of SET protocol with 3-D Secure pin
Secure Electronic Transaction ([SET](https://en.wikipedia.org/wiki/Secure_Electronic_Transaction)) is a protocol designed to securely purchase product from e-commerce vendors by securely sending payment and order information. 
It makes use of encryptions, digital signatures, and digital certificates to achieve security. This project aims to implement this protocol along with secure-3D pin (OTP) which will be send to the customer to verify transaction, as an extra security step. The digital signatures and digital certificates couldn't be implemented in this project.

## Technologies used
- `Node.js`
- `Express` (framework)
- `Bootstrap` (user interface)
- `Mongodb` (database)
- `node-jsencrypt` (to decrypt encrypted data using private key, for server side)
- `jsencrypt.min.js` (to encrypt order and payment information in the client side)
- `Msg91` (to send SMS OTP)
- `nodemailer` (to send email to customer)


## Routes
- `/register` [GET] - New users can register
- `/login` [GET] - Existing users login using username and password
- `/purchase` [GET] - User enters credit card details and initiates purchase of a product
- `/purchase/submit` [POST] - User submits payment information and order information in encrypted form to merchant
- `/bank/verify?` [GET] - Merchant passes payment information to bank to verify payment
- `/purchase-verification` [GET] - User enters OTP to complete the payment
- `purchase-verification/submit` [POST] - User submits OTP and bank verifies it
- `/order-successful` [GET] - User gets success message after completing payment

# Screenshots
![Login](/docs/screenshots/login.png)

![Purchase](/docs/screenshots/purchase.png)

![Login](/docs/screenshots/otp.png)

Flowchart:

![Flowchart](/docs/flowchart.png)



