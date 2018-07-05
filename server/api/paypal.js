const paypal = require("paypal-rest-sdk");
paypal.configure({
  mode: "live",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
  openid_client_id: process.env.PAYPAL_CLIENT_ID,
  openid_secret: process.env.PAYPAL_CLIENT_SECRET,
  openid_redirect_uri: "http://172.16.23.251:1337/paypal"
});

// const getRefreshToken = code => {
//   let refreshToken = "";
//   paypal.openid_connect.tokeninfo.create(code, (error, userToken) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("getrefresh");
//       console.log(userToken);
//       refreshToken = userToken.refresh_token;
//     }
//   });
//   console.log(refreshToken);
//   return refreshToken;
// };

const createInvoice = (code, list, recipient) => {
  paypal.openid_connect.tokeninfo.create(code, (error1, token) => {
    if (error1) {
      console.log(error1);
    } else {
      paypal.openid_connect.tokeninfo.refresh(
        token.refresh_token,
        (error2, userToken) => {
          if (error2) {
            console.log(error2);
          } else {
            paypal.openIdConnect.userinfo.get(
              userToken.access_token,
              (error3, user) => {
                if (error3) {
                  console.log(error3);
                } else {
                  const invoice = {
                    merchant_info: {
                      email: user.email
                    },
                    billing_info: [
                      {
                        email: recipient.email
                      }
                    ],
                    items: list.map(item => ({
                      name: item.item,
                      quantity: 1,
                      unit_price: {
                        currency: "USD",
                        value: Number(item.price.trim())
                      }
                    })),
                    shipping_info: {},
                    tax_inclusive: true
                  };
                  if (recipient.phone) {
                    invoice.shipping_info.phone = {
                      country_code: "001",
                      national_number: recipient.phone
                    };
                  }
                  if (recipient.name) {
                    const [first, last] = recipient.name.split(" ");
                    invoice.shipping_info.first_name = first;
                    invoice.shipping_info.last_name = last;
                  }
                  paypal.invoice.create(
                    invoice,
                    { refresh_token: token.refresh_token },
                    (err, receipt) => {
                      if (err) {
                        console.log(err.response);
                      } else {
                        console.log("invoice sent!");
                        console.log(receipt);
                        setTimeout(() => {
                          paypal.invoice.send(receipt.id, (sendErr, rv) => {
                            console.log(sendErr ? sendErr : rv);
                          });
                        }, 5000);
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  });
};

module.exports = { paypal, createInvoice };
