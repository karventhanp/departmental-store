const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const date = require('node-datetime');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sri_departmentstore'
});
conn.connect(error => {
    if (error)
        return error;
});

//Supplier Module
app.get('/supplier', (req, res) => {
    const sql = "SELECT * FROM suppliers";
    conn.query(sql, (error, results) => {
        if (error)
            console.log(error)
        else
            res.send(results);
    });
});
app.post('/addsupplier', (req, res) => {
    const { name, products, email, contact } = req.body;
    let m = '';
    const productList = products.split(',');
    const sqlInsert = "INSERT INTO suppliers(supplier_name,supplier_products,email,contact)VALUES(?,?,?,?)";
    conn.query(sqlInsert, [name, products, email, contact], (error, results) => {
        if (!error) {
            const insertId = results.insertId;
            productList.map(products => {
                const sql = "INSERT INTO supplier_products(supplier_id,supplier_name,product_name)VALUES(?,?,?)";
                conn.query(sql, [insertId, name, products], (error, results) => {
                    res.send();
                });
            });
        }
    });
});
app.put('/updatesupplier', (req, res) => {
    const { id, name, products, email, contact } = req.body.data;
    const productList1 = products.split(',');
    const sqlUpdate = "UPDATE suppliers SET supplier_name=?,supplier_products=?,email=?,contact=? WHERE supplier_id=?";
    conn.query(sqlUpdate, [name, products, email, contact, id], (error, results) => {
        if (error)
            console.log(error)
        else {
            const sqlDelete2 = "DELETE FROM supplier_products WHERE supplier_id=?";
            conn.query(sqlDelete2, id, (error, results) => {
                if (error)
                    console.log(error)
                else {
                    productList1.map(products => {
                        const sqlInsert1 = "INSERT INTO supplier_products(supplier_id,supplier_name,product_name)VALUES(?,?,?)";
                        conn.query(sqlInsert1, [id, name, products], (error, results) => {
                            res.send();
                        })
                    })
                }
            })
        }
    })
});
app.delete('/deletesupplier/:supplierid', (req, res) => {
    const supplierid = req.params.supplierid;
    const sqlDelete = "DELETE FROM suppliers WHERE supplier_id=?";
    conn.query(sqlDelete, supplierid, (error, results) => {
        if (error)
            console.log(error);
        else {
            const sqlDelete1 = "DELETE FROM supplier_products WHERE supplier_id=?";
            conn.query(sqlDelete1, supplierid, (error, results) => {
                res.send();
            })
        }
    });
});
//Purchase Module
app.get('/purchase', (req, res) => {
    const sqlSelect = "SELECT * FROM product_list JOIN supplier_products ON product_list.product_name=supplier_products.product_name ORDER BY product_list.product_id";
    conn.query(sqlSelect, (error, results) => {
        if (!error)
            res.send(results);
    });

});

app.get('/getproducttype', (req, res) => {
    const sqlSelect = "SELECT DISTINCT product_type FROM  product_list";
    conn.query(sqlSelect, (err, results) => {
        if (!err)
            res.send(results);
    })
});

app.post('/sortproduct', (req, res) => {
    const type = req.body.type;
    const sqlSelect = "SELECT * FROM product_list JOIN supplier_products ON product_list.product_name=supplier_products.product_name WHERE product_list.product_type=?";
    conn.query(sqlSelect, type, (error, results) => {
        if (!error)
            res.send(results);
    })
});

app.post('/searchproduct', (req, res) => {
    const name = req.body.name;
    const sqlSelect = "SELECT * FROM product_list JOIN supplier_products ON product_list.product_name=supplier_products.product_name WHERE product_list.product_name LIKE ?";
    conn.query(sqlSelect, '%' + name + '%', (error, results) => {
        if (!error)
            res.send(results);
    })
})

app.post('/getsize', (req, res) => {
    const pid = req.body.pid;
    const sqlSelect = "SELECT * FROM product_size WHERE product_id=?";
    conn.query(sqlSelect, pid, (error, results) => {
        if (!error)
            res.send(results);
    });
});

app.get('/selectcategory', (req, res) => {
    sqlSelect = "SELECT * FROM basic_products";
    conn.query(sqlSelect, (error, results) => {
        if (!error)
            res.send(results);
    })
});

app.post('/addproducts', (req, res) => {
    const { pname, cat, size1, amount1, size2, amount2, size3, amount3, size4, amount4, size5, amount5, expiry } = req.body;
    sqlInsert = "INSERT INTO product_list(product_name,product_type,expiry_date)VALUES(?,?,?)";
    conn.query(sqlInsert, [pname, cat, expiry], (error, results) => {
        if (!error) {
            const id = results.insertId;
            const sqlInsert1 = "INSERT INTO product_size(product_id,size,amount)VALUES(?,?,?)";
            conn.query(sqlInsert1, [id, size1, amount1], (err, res) => {
                console.log(err);
            });
            if ((size2) && (amount2)) {
                const sqlInsert2 = "INSERT INTO product_size(product_id,size,amount)VALUES(?,?,?)";
                conn.query(sqlInsert2, [id, size2, amount2], (err, res) => {
                    console.log(err);
                });
            }
            if ((size3) && (amount3)) {
                const sqlInsert3 = "INSERT INTO product_size(product_id,size,amount)VALUES(?,?,?)";
                conn.query(sqlInsert3, [id, size3, amount3], (err, res) => {
                    console.log(err);
                });
            }
            if ((size4) && (amount4)) {
                const sqlInsert4 = "INSERT INTO product_size(product_id,size,amount)VALUES(?,?,?)";
                conn.query(sqlInsert4, [id, size4, amount4], (err, res) => {
                    console.log(err);
                });
            }
            if ((size5) && (amount5)) {
                const sqlInsert5 = "INSERT INTO product_size(product_id,size,amount)VALUES(?,?,?)";
                conn.query(sqlInsert5, [id, size5, amount5], (err, res) => {
                    console.log(err);
                });
            }
        }
    })
    res.send();
});

app.post('/addtocart', (req, res) => {
    const { pid, pname, psize, pquantity, sname, } = req.body;
    let dt = date.create();
    let todaydate = dt.format('Y-m-d');
    if (psize === "")
        res.send();
    else if (pquantity === "")
        res.send();
    else {
        const sqlSelect = "SELECT amount FROM product_size WHERE product_id=? AND size=?";
        conn.query(sqlSelect, [pid, psize], (error, results) => {
            if (!error) {
                const amount = results[0].amount * pquantity;
                const sqlSelect1 = "SELECT * FROM purchase_cart WHERE product_id=? AND product_size=? AND date_of_order=? ";
                conn.query(sqlSelect1, [pid, psize, todaydate], (error, results1) => {
                    if (!error) {
                        if (results1.length === 0) {
                            const sqlInsert = "INSERT INTO purchase_cart(product_id,product_name,product_size,quantity,amount,supplier_name,date_of_order)VALUES(?,?,?,?,?,?,?)";
                            conn.query(sqlInsert, [pid, pname, psize, pquantity, amount, sname, todaydate], (error, results2) => {
                                if (!error)
                                    res.send("ok");
                            });
                        }
                        else {
                            const quantity1 = results1[0].quantity + parseFloat(pquantity);
                            const amount1 = results1[0].amount + amount;
                            const sqlUpdate = "UPDATE purchase_cart SET quantity=?,amount=? WHERE product_id=? AND product_size=? AND date_of_order=?";
                            conn.query(sqlUpdate, [quantity1, amount1, pid, psize, todaydate], (error, results3) => {
                                if (!error)
                                    res.send("ok");
                            });
                        }
                    }
                });
            }
        });
    }
});

app.get('/purchasecart', (req, res) => {
    const sqlSelect = "SELECT * FROM purchase_cart ORDER BY product_id";
    conn.query(sqlSelect, (error, results) => {
        if (!error)
            res.send(results);
    })
});

app.post('/productedit', (req, res) => {
    const pid = req.body.pid;
    const sqlSelect = "SELECT * FROM product_list LEFT JOIN product_size ON product_list.product_id=product_size.product_id WHERE product_list.product_id=?";
    conn.query(sqlSelect, pid, (error, results) => {
        if (!error)
            res.send(results);
    })
});

app.post('/updateproduct', (req, res) => {
    const { pid, pname, ptype, pexpiry, size0, amount0, size1, amount1, size2, amount2, size3, amount3, size4, amount4 } = req.body;
    const sqlUpdate = "UPDATE product_list SET product_name=?,product_type=?,expiry_date=? WHERE product_id=?";
    conn.query(sqlUpdate, [pname, ptype, pexpiry, pid], (error, results) => {
        if (!error) {
            const sqlDelete = "DELETE FROM product_size WHERE product_id=?";
            conn.query(sqlDelete, pid, (error, results) => {
                if (!error) {
                    const sqlInsert1 = "INSERT INTO product_size(product_id,size,amount)VALUES(?,?,?)";
                    conn.query(sqlInsert1, [pid, size0, amount0], (err, res) => {
                        console.log(err);
                    });
                    if ((size1) && (amount1)) {
                        const sqlInsert2 = "INSERT INTO product_size(product_id,size,amount)VALUES(?,?,?)";
                        conn.query(sqlInsert2, [pid, size1, amount1], (err, res) => {
                            console.log(err);
                        });
                    }
                    if ((size2) && (amount2)) {
                        const sqlInsert3 = "INSERT INTO product_size(product_id,size,amount)VALUES(?,?,?)";
                        conn.query(sqlInsert3, [pid, size2, amount2], (err, res) => {
                            console.log(err);
                        });
                    }
                    if ((size3) && (amount3)) {
                        const sqlInsert4 = "INSERT INTO product_size(product_id,size,amount)VALUES(?,?,?)";
                        conn.query(sqlInsert4, [pid, size3, amount3], (err, res) => {
                            console.log(err);
                        });
                    }
                    if ((size4) && (amount4)) {
                        const sqlInsert5 = "INSERT INTO product_size(product_id,size,amount)VALUES(?,?,?)";
                        conn.query(sqlInsert5, [pid, size4, amount4], (err, res) => {
                            console.log(err);
                        });
                    }
                }
            })
        }
    });
});

app.post('/removeproduct', (req, res) => {
    const pid = req.body.pid;
    const sqlDelete = "DELETE FROM product_list WHERE product_id=?";
    conn.query(sqlDelete, pid, (error, results) => {
        if (!error) {
            const sqlDelete1 = "DELETE FROM product_size WHERE product_id=?";
            conn.query(sqlDelete1, pid, (error, results) => {
                if (!error)
                    res.send();
            });
        }
    });
});

app.get('/fixamount', (req, res) => {
    const sqlSelect = "SELECT * FROM product_list RIGHT JOIN product_size ON product_list.product_id=product_size.product_id ORDER BY product_list.product_id";
    conn.query(sqlSelect, (error, results) => {
        res.send(results);
    })
});

app.post('/fixamountsearch', (req, res) => {
    const name=req.body.name;
    const sqlSelect = "SELECT * FROM product_list RIGHT JOIN product_size ON product_list.product_id=product_size.product_id WHERE product_list.product_name LIKE ? ORDER BY product_list.product_id";
    conn.query(sqlSelect,'%'+name+'%',(error, results) => {
        res.send(results);
    })
});

app.post('/updateamount', (req, res) => {
    const { pid, psize, pamount } = req.body;
    const sqlUpdate = "UPDATE product_size SET amount=? WHERE product_id=? AND size=?";
    conn.query(sqlUpdate, [pamount, pid, psize], (error, results) => {
        if (!error)
            res.send();
    });
});

app.post('/ordersearch', (req, res) => {
    const value = req.body.name;
    const sqlSelect = "SELECT * FROM purchase_cart WHERE product_name LIKE ? ORDER BY product_id";
    conn.query(sqlSelect, '%' + value + '%', (error, results) => {
        res.send(results);
    });
});

app.post('/removepurchasecart', (req, res) => {
    const { id, size, date } = req.body;
    let aa = new Date(date).toLocaleDateString('sv-SE');
    //https://stackoverflow.com/questions/2388115/get-locale-short-date-format-using-javascript
    const sqlDelete = "DELETE FROM purchase_cart WHERE product_id=? AND product_size=? AND date_of_order=?";
    conn.query(sqlDelete, [id, size, aa], (error, results) => {
        if (!error)
            res.send("success");
    });

});

app.post('/addtostock', (req, res) => {
    const { product_id, product_name, amount, supplier_name, date_of_order } = req.body;
    const purchasedata_size = req.body.product_size;
    const purchasedata_quantity = req.body.quantity;
    let product_size = req.body.product_size;
    let quantity = req.body.quantity;
    let d = date.create();
    const sqlSelect9 = "SELECT * FROM basic_products INNER JOIN product_list ON product_list.product_type=basic_products.product_type WHERE product_list.product_id=?";
    conn.query(sqlSelect9, product_id, (error, results) => {
        if (!error) {
            if (results[0].common_type === 'uncategorized-product-unit') {
                const number = product_size.replace(/\D/g, '');
                quantity = number * quantity;
                product_size = "Number of items";
            }
        }
    });
    let todaydate = d.format('Y-m-d');
    let pdate = new Date(date_of_order).toLocaleDateString('sv-SE');
    const sqlSelect33 = "SELECT product_id FROM stock WHERE product_id=?";
    conn.query(sqlSelect33, product_id, (error, results) => {
        if (!error) {
            let x = 0;
            if (results.length === 0) {
                const sqlInsert = "INSERT INTO stock(product_id,product_name,supplier_name)VALUES(?,?,?)";
                conn.query(sqlInsert, [product_id, product_name, supplier_name], (error, results) => {
                    console.log(error);
                });
            }
            const sqlSelect44 = "SELECT * FROM stock_size WHERE product_id=? AND product_size=? AND date_of_purchase=? ORDER BY id DESC";
            conn.query(sqlSelect44, [product_id, product_size, pdate], (error, results) => {
                if (!error) {
                    if (results.length === 0) {
                        const per_quantity = amount / quantity;
                        const sqlInsert1 = "INSERT INTO stock_size(product_id,product_size,quantity,amount,per_quantity,date_of_purchase)VALUES(?,?,?,?,?,?)";
                        conn.query(sqlInsert1, [product_id, product_size, quantity, amount, per_quantity, todaydate], (error, results) => {
                            if (!error) {
                                const sqlInsert2 = "INSERT INTO purchase_data(product_id,product_name,product_size,quantity,amount,supplier_name,date_of_purchase)VALUES(?,?,?,?,?,?,?)";
                                conn.query(sqlInsert2, [product_id, product_name, purchasedata_size, purchasedata_quantity, amount, supplier_name, todaydate], (error, results) => {
                                    if (!error) {
                                        if (product_size === 'Number of items') {
                                            sqlDelete = "DELETE FROM purchase_cart WHERE product_id=? AND date_of_order=?";
                                            conn.query(sqlDelete, [product_id, pdate], (error, results) => {
                                                if (!error)
                                                    res.send('success');
                                            });
                                        }
                                        else {
                                            sqlDelete = "DELETE FROM purchase_cart WHERE product_id=? AND product_size=? AND date_of_order=?";
                                            conn.query(sqlDelete, [product_id, product_size, pdate], (error, results) => {
                                                if (!error)
                                                    res.send('success');
                                            });
                                        }
                                    }
                                });
                            }
                        });
                    }
                    else {
                        const id = results[0].id;
                        const upamount = results[0].amount + amount;
                        const upquantity = results[0].quantity + quantity;
                        const sqlUpdate = "UPDATE stock_size SET quantity=?,amount=? WHERE id=?";
                        conn.query(sqlUpdate, [upquantity, upamount, id], (error, results) => {
                            if (error) {
                                console.log(error);
                            }
                            if (!error) {
                                if (product_size === 'Number of items') {
                                    const sqlSelect55 = "SELECT * FROM purchase_data WHERE product_id=? AND date_of_purchase=? ORDER BY id DESC";
                                    conn.query(sqlSelect55, [product_id, pdate], (error, results) => {
                                        if (!error) {
                                            if (results.length != 0) {
                                                const iid = results[0].id;
                                                const uppquantity = results[0].quantity + purchasedata_quantity;
                                                const uppamount = results[0].amount + amount;
                                                const sqlUpdate11 = "UPDATE purchase_data SET quantity=?,amount=? WHERE id=?";
                                                conn.query(sqlUpdate11, [uppquantity, uppamount, iid], (error, results) => {
                                                    if (!error) {
                                                        sqlDelete = "DELETE FROM purchase_cart WHERE product_id=? AND date_of_order=?";
                                                        conn.query(sqlDelete, [product_id, pdate], (error, results) => {
                                                            if (!error)
                                                                res.send('success');
                                                        });
                                                    }
                                                })
                                            }
                                        }
                                    });
                                }
                                else {
                                    const sqlSelect55 = "SELECT * FROM purchase_data WHERE product_id=? AND product_size=? AND date_of_purchase=? ORDER BY id DESC";
                                    conn.query(sqlSelect55, [product_id, product_size, pdate], (error, results) => {
                                        if (!error) {
                                            if (results.length != 0) {
                                                const iid = results[0].id;
                                                const uppquantity = results[0].quantity + quantity;
                                                const uppamount = results[0].amount + amount;
                                                const sqlUpdate11 = "UPDATE purchase_data SET quantity=?,amount=? WHERE id=?";
                                                conn.query(sqlUpdate11, [uppquantity, uppamount, iid], (error, results) => {
                                                    if (!error) {
                                                        sqlDelete = "DELETE FROM purchase_cart WHERE product_id=? AND product_size=? AND date_of_order=?";
                                                        conn.query(sqlDelete, [product_id, product_size, pdate], (error, results) => {
                                                            if (!error)
                                                                res.send('success');
                                                        });
                                                    }
                                                })
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
    });
});

//Stock Module

app.get('/getstock', (req, res) => {
    const sqlSelect = "SELECT * FROM stock";
    conn.query(sqlSelect, (error, results) => {
        if (!error) {
            res.send(results);
        }
    });
});

app.post('/getstocksize', (req, res) => {
    const { pid } = req.body;
    const sqlSelect = "SELECT * FROM stock_size WHERE product_id=?";
    conn.query(sqlSelect, pid, (error, results) => {
        if (!error)
            res.send(results);
    });
});

app.post('/getdate', (req, res) => {
    const { pid } = req.body;
    const sqlSelect = "SELECT expiry_date FROM product_list WHERE product_id=?";
    conn.query(sqlSelect, pid, (error, results) => {
        if (!error)
            res.send(results);
    })
});

app.post('/getstockmore', (req, res) => {
    const { id } = req.body;
    const sqlSelect = "SELECT * FROM stock_size WHERE product_id=?";
    conn.query(sqlSelect, id, (error, results) => {
        if (!error) {
            res.send(results);
        }
    });
});

app.post('/removestockproduct', (req, res) => {
    const { product_id, product_size, date_of_purchase } = req.body.d;
    const date = new Date(date_of_purchase).toLocaleDateString('sv-SE');
    const sqlDelete = "DELETE FROM stock_size WHERE product_id=? AND product_size=? AND date_of_purchase=?";
    conn.query(sqlDelete, [product_id, product_size, date], (error, results) => {
        if (!error)
            res.send('success');
    });
});

app.post('/searchstockproduct', (req, res) => {
    const name = req.body.name;
    const sqlSelect = "SELECT * FROM stock WHERE product_name LIKE ?";
    conn.query(sqlSelect, '%' + name + '%', (error, results) => {
        if (!error)
            res.send(results);
    })
});

//Sales Module

app.get('/sales', (req, res) => {
    const sqlSelect = "SELECT * FROM stock ORDER BY product_id";
    conn.query(sqlSelect, (error, results) => {
        if (!error)
            res.send(results);
    });
});

app.post('/checkquantity', (req, res) => {
    const { id, size, date } = req.body;
    const d = new Date(date).toLocaleDateString('sv-SE');
    const sqlSelect = "SELECT quantity FROM stock_size WHERE product_id=? AND product_size=?  AND date_of_purchase=? ORDER BY product_id DESC";
    conn.query(sqlSelect, [id, size, d], (error, results) => {
        if (!error) {
            res.send(results);
        }
    })
});

app.post('/addtosalescart', (req, res) => {
    const { pid, pname, psize, per_quantity, date } = req.body;
    const datedate = new Date(date).toLocaleDateString('sv-SE');
    const pquantity = parseFloat(req.body.pquantity);
    const cartamount = per_quantity * pquantity;
    const d = new Date();
    let uq, ua;
    const dd = new Date(d).toLocaleDateString('sv-SE');
    const sqlCheck = "SELECT * FROM sales_cart WHERE product_id=? AND product_size=? AND date_of_sale=?";
    conn.query(sqlCheck, [pid, psize, dd], (error, results) => {
        if (error)
            console.log(error);
        else {
            if (results.length === 0) {
                const sqlInsert = "INSERT INTO sales_cart(product_id,product_name,product_size,size_date,product_quantity,product_amount,per_quantity,date_of_sale)VALUES(?,?,?,?,?,?,?,?)";
                conn.query(sqlInsert, [pid, pname, psize, datedate, pquantity, cartamount, per_quantity, dd], (error, results) => {
                    if (error)
                        console.log(error);
                    else
                        res.send();
                });
            }
            else {
                uq = results[0].product_quantity;
                ua = results[0].product_amount;
                const sqlUpdate = "UPDATE sales_cart SET product_quantity=?,product_amount=?,size_date=? WHERE product_id=? AND product_size=? AND date_of_sale=?";
                conn.query(sqlUpdate, [uq + pquantity, ua + cartamount, datedate, pid, psize, dd], (error, results) => {
                    if (error)
                        console.log(error);
                    else
                        res.send();
                });
            }
        }
    });
});

app.get('/billing', (req, res) => {
    const sqlSelect = "SELECT * FROM sales_cart";
    conn.query(sqlSelect, (error, results) => {
        if (!error)
            res.send(results);
    });
});

app.post('/payment', (req, res) => {
    const { name, number, mode, total, efee } = req.body;
    const date = new Date();
    if (total >= 1000) {
        const sqlCheck = "SELECT * FROM cart_details WHERE cus_name=? AND cus_phno=?";
        conn.query(sqlCheck, [name, number], (error, results) => {
            if (!error) {
                if (results.length === 0) {
                    const sqlInsert111 = "INSERT INTO cart_details(cus_name,cus_phno,points,date)VALUES(?,?,?,?)";
                    conn.query(sqlInsert111, [name, number, 100, date], (error, results) => {
                        if (error)
                            console.log(error);
                    });
                }
                else {
                    const id = results[0].id;
                    const points = results[0].points + 100;
                    const sqlUpdate111 = "UPDATE cart_details SET points=?,date=? WHERE id=?";
                    conn.query(sqlUpdate111, [points, date, id], (error, results) => {
                        if (error)
                            console.log(error);
                    })
                }
            }
        });
    }
    const sqlSelect55 = "SELECT * FROM sales_cart";
    conn.query(sqlSelect55, (error, results) => {
        if (!error) {
            if (results.length === 0) {
                res.send('empty');
            }
            else {
                const sqlInsert = "INSERT INTO customer(cus_name,cus_phno,mode,total,extra_fee,date)VALUES(?,?,?,?,?,?)";
                conn.query(sqlInsert, [name, number, mode, total, efee, date], (error, results) => {
                    if (!error) {
                        const id = results.insertId;
                        const sqlSelect = "SELECT * FROM sales_cart";
                        conn.query(sqlSelect, (error, resultss) => {
                            if (!error) {
                                resultss.map(i => {
                                    const sqlInsert1 = "INSERT INTO customer_products(cus_id,product_id,product_name,product_size,quantity,amount)VALUES(?,?,?,?,?,?)";
                                    conn.query(sqlInsert1, [id, i.product_id, i.product_name, i.product_size, i.product_quantity, i.product_amount], (error, results) => {
                                        if (!error) {
                                            const datess = new Date(i.size_date).toLocaleDateString('sv-SE');
                                            const sqlUpdates = "SELECT id,quantity,amount FROM stock_size WHERE product_id=? AND product_size=? AND date_of_purchase=?";
                                            conn.query(sqlUpdates, [i.product_id, i.product_size, datess], (error, results) => {
                                                if (error)
                                                    console.log(error);
                                                else {
                                                    const upstockq = results[0].quantity - i.product_quantity;
                                                    const upstocka = results[0].amount - i.product_amount;
                                                    const upid = results[0].id;
                                                    const sqlUpdatestock = "UPDATE stock_size SET quantity=?,amount=? WHERE id=?";
                                                    conn.query(sqlUpdatestock, [upstockq, upstocka, upid], (error, results) => {
                                                        if (error)
                                                            console.log(error);
                                                        else {
                                                            const sqlDelete = "TRUNCATE TABLE sales_cart";
                                                            conn.query(sqlDelete, (error, results) => {
                                                                if (!error)
                                                                    res.send();
                                                            });
                                                        }
                                                    })
                                                }
                                            });
                                        }
                                    });
                                });
                            }
                        });
                    }
                });

            }
        }
    });
});

app.delete('/deletesalescart/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM sales_cart WHERE id=?";
    conn.query(sqlDelete, id, (error, results) => {
        if (!error)
            res.send('success');
    });
});

//Cart System Module

app.get('/getcartsystem', (req, res) => {
    const sqlSelect = "SELECT * FROM cart_details";
    conn.query(sqlSelect, (error, results) => {
        if (error)
            console.log(error)
        else
            res.send(results);
    })
});

app.delete('/removecartsystem/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM cart_details WHERE id=?";
    conn.query(sqlDelete, id, (error, results) => {
        if (error)
            console.log(error);
        else
            res.send('success');
    });
});

//Product Return Module

app.get('/getpurchasedata', (req, res) => {
    const sqlSelect = "SELECT * FROM purchase_data ORDER BY product_id";
    conn.query(sqlSelect, (error, results) => {
        if (!error) {
            res.send(results);
        }
    });
});

app.post('/searchpurchasedata', (req, res) => {
    const name = req.body.name;
    const sqlSelect = "SELECT * FROM purchase_data WHERE product_name LIKE ?";
    conn.query(sqlSelect, '%' + name + '%', (error, results) => {
        if (!error)
            res.send(results);
    })
});

app.post('/purchasereturn', (req, res) => {
    const { product_id, date_of_purchase, id } = req.body;
    const date = new Date(date_of_purchase).toLocaleDateString('sv-SE');
    var product_size = req.body.product_size;
    const sqlSelect = "SELECT * FROM basic_products INNER JOIN product_list ON product_list.product_type=basic_products.product_type WHERE product_list.product_id=?";
    conn.query(sqlSelect, product_id, (error, results) => {
        if (error)
            console.log(error)
        else {
            if (results[0].common_type === 'uncategorized-product-unit') {
                product_size = 'Number of items';
                const sqlSelect1 = "SELECT * FROM stock_size INNER JOIN stock ON stock.product_id=stock_size.product_id WHERE stock_size.product_id=? AND stock_size.product_size=? AND stock_size.date_of_purchase=?";
                conn.query(sqlSelect1, [product_id, product_size, date], (error, results) => {
                    if (error)
                        console.log(error)
                    else {
                        const sname = results[0].supplier_name;
                        const sqlDelete = "DELETE FROM stock_size WHERE id=?";
                        conn.query(sqlDelete, results[0].id, (error, results1) => {
                            if (error)
                                console.log(error)
                            else {
                                const sqlDelete1 = "DELETE FROM purchase_data WHERE id=?";
                                conn.query(sqlDelete1, id, (error, results2) => {
                                    if (error)
                                        console.log(error)
                                    else {
                                        const d1d1 = new Date();
                                        const sqlSelectsup = "SELECT contact FROM suppliers WHERE supplier_name=?";
                                        conn.query(sqlSelectsup, sname, (error, results1) => {
                                            if (!error) {
                                                const contact = results1[0].contact;
                                                const sqlInsertr = "INSERT INTO return_products(pid,pname,psize,pquantity,pamount,name,phno,return_type,date)VALUES(?,?,?,?,?,?,?,?,?)";
                                                conn.query(sqlInsertr, [results[0].product_id, results[0].product_name, results[0].product_size, results[0].quantity, results[0].amount, sname, contact, "purchase-return", d1d1], (error, results) => {
                                                    if (error)
                                                        console.log(error)
                                                    else
                                                        res.send('success');

                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        })
                    }
                });
            }
            else {
                const sqlSelect1 = "SELECT * FROM stock_size INNER JOIN stock ON stock.product_id=stock_size.product_id WHERE stock_size.product_id=? AND stock_size.product_size=? AND stock_size.date_of_purchase=?";
                conn.query(sqlSelect1, [product_id, product_size, date], (error, results) => {
                    if (error)
                        console.log(error)
                    else {
                        const sname = results[0].supplier_name;
                        const sqlDelete = "DELETE FROM stock_size WHERE id=?";
                        conn.query(sqlDelete, results[0].id, (error, results1) => {
                            if (error)
                                console.log(error)
                            else {
                                const sqlDelete1 = "DELETE FROM purchase_data WHERE id=?";
                                conn.query(sqlDelete1, id, (error, results2) => {
                                    if (error)
                                        console.log(error)
                                    else {
                                        const d1d1 = new Date();
                                        const sqlSelectsup = "SELECT contact FROM suppliers WHERE supplier_name=?";
                                        conn.query(sqlSelectsup, sname, (error, results1) => {
                                            if (!error) {
                                                const contact = results1[0].contact;
                                                const sqlInsertr = "INSERT INTO return_products(pid,pname,psize,pquantity,pamount,name,phno,return_type,date)VALUES(?,?,?,?,?,?,?,?,?)";
                                                conn.query(sqlInsertr, [results[0].product_id, results[0].product_name, results[0].product_size, results[0].quantity, results[0].amount, results[0].supplier_name, contact, "purchase-return", d1d1], (error, results) => {
                                                    if (error)
                                                        console.log(error)
                                                    else
                                                        res.send('success');

                                                });
                                            }

                                        });
                                    }
                                });
                            }
                        })
                    }
                });
            }
        }
    });


});

app.post('/getsalesdata', (req, res) => {
    const { name, phno } = req.body;
    const sqlSelect = "SELECT * FROM customer_products LEFT JOIN customer ON customer_products.cus_id=customer.cus_id WHERE customer.cus_name=? AND customer.cus_phno=?";
    conn.query(sqlSelect, [name, phno], (error, results) => {
        if (error)
            console.log(error);
        else
            res.send(results);
    })
});

app.post('/salesreturn', (req, res) => {
    const { id, product_id, product_name, product_size, quantity, amount, cus_name, cus_phno } = req.body;
    const sqlDelete1 = "DELETE FROM customer_products WHERE id=?";
    conn.query(sqlDelete1, id, (error, results) => {
        if (error)
            console.log(error)
        else {
            const date = new Date();
            const sqlInsert = "INSERT INTO return_products(pid,pname,psize,pquantity,pamount,name,phno,return_type,date)VALUES(?,?,?,?,?,?,?,?,?)";
            conn.query(sqlInsert, [product_id, product_name, product_size, quantity, amount, cus_name, cus_phno, "sales-return", date], (error, results) => {
                if (error)
                    console.log(error);
                else
                    res.send('success');
            })

        }
    });
});

//Account module

app.post('/addemployee', (req, res) => {
    const { name, phno, address } = req.body;
    const sqlInsert = "INSERT INTO employee(emp_name,emp_phno,emp_address)VALUES(?,?,?)";
    conn.query(sqlInsert, [name, phno, address], (error, results) => {
        if (error)
            console.log(error)
        else
            res.send();
    })
});

app.post('/viewemployee', (req, res) => {
    const { name, phno } = req.body;
    const sqlSelect = "SELECT * FROM employee WHERE emp_name=? AND emp_phno=?";
    conn.query(sqlSelect, [name, phno], (error, results) => {
        if (error)
            console.log(error)
        else
            res.send(results);
    })
});

app.post('/saveaccount', (req, res) => {
    let { ec, tr } = req.body;
    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date();
    let monthno = new Date();
    monthno = monthno.getMonth();
    const year = date.getFullYear();
    const monthmonth = month[monthno];
    if (ec === '')
        ec = 0;
    else if (tr === '')
        tr = 0;
    const sqlSelect = "SELECT * FROM account";
    conn.query(sqlSelect, (error, results) => {
        if (error)
            console.log(error)
        else {
            if (results.length === 0) {
                const sqlInsert = "INSERT INTO account(electrical,transport,month,year,date)VALUES(?,?,?,?,?)";
                conn.query(sqlInsert, [ec, tr, monthmonth, year, date], (error, results) => {
                    if (error)
                        console.log(error)
                    else
                        res.send();
                });
            }
            else {
                const sqlSelect1 = "SELECT * FROM account WHERE month=? AND year=?"
                conn.query(sqlSelect1, [monthmonth, year], (error, results) => {
                    if (error)
                        console.log(error)
                    else {
                        
                        if (results.length === 0) {
                            const sqlInsert1 = "INSERT INTO account(electrical,transport,month,year,date)VALUES(?,?,?,?,?)";
                            conn.query(sqlInsert1,[ec,tr,monthmonth,year,date],(error,results1)=>{
                                if(error)
                                console.log(error)
                                else
                                res.send();
                            })
                        }
                        else{
                        const upec=results[0].electrical+parseFloat(ec);
                        const uptr=results[0].transport+parseFloat(tr);
                            if(ec===0&&tr!==0){
                                const sqlUpdate="UPDATE account SET transport=? WHERE month=? AND year=?";
                                conn.query(sqlUpdate,[uptr,monthmonth,year],(error,results)=>{
                                    if(error)
                                    console.log(error);
                                    else
                                    res.send();
                                });
                            }
                            else if(tr===0&&ec!==0){
                                const sqlUpdate="UPDATE account SET electrical=?,date=? WHERE month=? AND year=?";
                                conn.query(sqlUpdate,[upec,date,monthmonth,year],(error,results)=>{
                                    if(error)
                                    console.log(error);
                                    else
                                    res.send();
                                });
                            }
                            else{
                                const sqlUpdate="UPDATE account SET electrical=?,transport=?,date=? WHERE month=? AND year=?";
                                conn.query(sqlUpdate,[upec,uptr,date,monthmonth,year],(error,results)=>{
                                    if(error)
                                    console.log(error);
                                    else
                                    res.send();
                                });

                            }
                        }

                    }
                })
            }
        }
    })
});

app.get('/lastupdate',(req,res)=>{
    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date=new Date();
    let month1=date.getMonth();
    const month2=month[month1];
    const year=date.getFullYear();
    const sqlSelect="SELECT * FROM account WHERE month=? AND year=?";
    conn.query(sqlSelect,[month2,year],(error,results)=>{
        if(error)
        console.log(error);
        else
        res.send(results);
    })

});

app.get('/getmonth',(req,res)=>{
    const sqlSelect="SELECT * FROM account";
    conn.query(sqlSelect,(error,reslts)=>{
        if(error)
        console.log(error);
        else
        res.send(reslts);
    })
});

app.post('/getmonthdata',(req,res)=>{
    const id=req.body.id;
    const sqlSelect="SELECT * FROM account WHERE id=?";
    conn.query(sqlSelect,id,(error,results)=>{
        if(error)
        console.log(error)
        else
        res.send(results);
    })
});

app.get('/pcost',(req,res)=>{
    const sqlSelect="SELECT amount FROM purchase_data";
    conn.query(sqlSelect,(error,results)=>{
        if(!error)
        res.send(results);
    });
});

app.get('/scost',(req,res)=>{
    const sqlSelect="SELECT total FROM customer";
    conn.query(sqlSelect,(error,results)=>{
        if(!error)
        res.send(results);
    });
});

app.get('/acost',(req,res)=>{
    const sqlSelect="SELECT * FROM account";
    conn.query(sqlSelect,(error,results)=>{
        if(!error)
        res.send(results);
    });
});

//Login Module

app.post('/login',(req,res)=>{
    const {name,pass}=req.body;
    const sqlSelect="SELECT * FROM admin WHERE name=? AND password=?";
    conn.query(sqlSelect,[name,pass],(error,results)=>{
        if(error)
        console.log(error)
        else{
            if(results.length===0)
            res.send('denied');
            else{
                if((name===results[0].name)&&(pass===results[0].password)){
                    res.send('accepted');
                }
                else
                res.send('denied');
            }
        }
        
    });
});

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));