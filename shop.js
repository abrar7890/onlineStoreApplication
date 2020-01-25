function formSubmit(){
    
    var errors = '';
    
    //Fetching all the inputs user entered
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var postcode = document.getElementById('postcode').value;
    var province = document.getElementById('province').value;
    var deliverytime = document.getElementById('deliverytime').value;
    var product1Quantity = document.getElementById("product1").value;
    var product2Quantity = document.getElementById("product2").value;
    var product3Quantity = document.getElementById("product3").value;

    var phoneregex = /^\(?(\d{3})\)?[\.\-\/\s]?(\d{3})[\.\-\/\s]?(\d{4})$/;

    // validating if phone is in same pattern
    if(phoneregex.test(phone))
    {
        // Returns true if phone matches the pattern
        errors += ''; //there is no error in phone
    }
    else{
        // Error is displayed in phone;
        errors += 'Phone Number is not in a correct format <br/>'; 
    }

    var postcodeRegex = /^[A-Z][0-9][A-Z]\s[0-9][A-Z][0-9]$/;

    // Converting the postcode to uppercase before validating
    postcode = postcode.toUpperCase(); 

    // validating if postcode is in same pattern
    if(postcodeRegex.test(postcode))
    { 
        // Returns true if postcode matches the pattern
        errors += ''; //there is no error
    }
    else{
        errors += 'Post code is not in correct format <br/>'; 
        // Error is displayed in postcode
    }

    //if none of the product value is filled error is displayed

    if((product1Quantity == '') && (product2Quantity == '') && (product3Quantity == ''))
    {
        errors += 'Atleast one product should be bought!!!<br/>';
    }
    else{
        //converting input values of products to a number
        product1Quantity = parseInt(product1Quantity);
        product2Quantity = parseInt(product2Quantity);
        product3Quantity = parseInt(product3Quantity);
    }

    if (errors.trim() != '') //used trim to remove any of the spaces
    {        
        document.getElementById('errors').innerHTML = `****Please fix these errors to proceed further**** <br/> ${errors}`;
        document.getElementById('name').focus();
    }
    else{
        //if there are no errors do the following

        var product1Charge = 10;    //charges of one product 2
        var product2Charge = 20;    //charges of one product 2
        var product3Charge = 30;    //charges of one product 2

        var product1Total = 0;
        var product2Total = 0;
        var product3Total = 0;

        for(var i = 0;i<=product1Quantity;i++)
        {
            product1Total = product1Quantity * product1Charge;
        }

        for(var i = 0;i<=product2Quantity;i++)
        {
            product2Total = product2Quantity * product2Charge;
        }

        for(var i = 0;i<=product3Quantity;i++)
        {
            product3Total = product3Quantity * product3Charge;
        }

        var shippingCharges = 0; //charges depending on delivery time selected

        if(deliverytime == 1)
        {
            shippingCharges += 40;
        }
        if(deliverytime == 2)
        {
            shippingCharges += 30;
        }
        if(deliverytime == 3){
            shippingCharges += 20;
        }
        if(deliverytime == 4)
        {
            shippingCharges += 10;
        }

        var subTotal = product1Total + product2Total + product3Total + shippingCharges; //subtotal is sum of product and delivery charges

        var taxRate = 0;
        var taxCharges = 0;
        //taxcharges calcuted on different tax rates for all provinces

        if(province == "Ontario" || province == "Manitoba")
        {
            taxRate = 13;
            taxCharges = ((taxRate/100)*subTotal).toFixed(2);   //after calculating the taxcharges, fixed the decimal place to 2
        }
        else if(province == "Quebec")
        {
            taxRate = 14.975;
            taxCharges = ((taxRate/100)*subTotal).toFixed(2);

        }else if(province == "British Columbia")
        {
            taxRate = 12;
            taxCharges = ((taxRate/100)*subTotal).toFixed(2);
        }
        else if(province == "Alberta" || province == "Northwest Territories" || province == "Nunavut" || province == "Yukon")
        {
            taxRate = 5;
            taxCharges = ((taxRate/100)*subTotal).toFixed(2);
        }
        else if(province == "New-Brunswick" || province == "Newfoundland and Labrador" || province == "Nova Scotia" || province == "Prince Edward Island")
        {
            taxRate = 15;
            taxCharges = ((taxRate/100)*subTotal).toFixed(2);
        }else{
            taxRate = 11;
            taxCharges = ((taxRate/100)*subTotal).toFixed(2);
        }

        var total = 0;
        total = (parseFloat(subTotal) + parseFloat(taxCharges)).toFixed(2);

        var myOutput = '';
        myOutput =  `	<p align="center" style="color:black;font-size:25px;">INVOICE</p>
                        <p>NAME:${name}</p>
                        <p>EMAIL: ${email}</p>
                        <p>PHONE: ${phone}</p>
                        <p>DELIVERY ADDRESS: ${address},
                                             ${city},
                                             ${province}, ${postcode}</p>
                    `;

        if(!isNaN(product1Quantity))
        {
        	myOutput += `<p>${product1Quantity} PRODUCT 1 @ $${product1Charge}: $${product1Total}</p>`;
        }
        if(!isNaN(product2Quantity))
        {
        	myOutput += `<p>${product2Quantity} PRODUCT 2 @ $${product2Charge}: $${product2Total}</p>`;
        }
        if(!isNaN(product3Quantity))
        {
        	myOutput += `<p>${product3Quantity} PRODUCT 3 @ $${product3Charge}: $${product3Total}</p>`;
        }
        myOutput+= `
        			<p>SHIPPING CHARGES: $${shippingCharges}</p>
                    <p>SUB TOTAL: $${subTotal}</p>
                    <p>TAXES @ ${taxRate}%: $${taxCharges}</p>
                    <p>TOTAL: $${total}</p>
                `;
        myOutput = myOutput.toUpperCase();

        document.getElementById('errors').innerHTML = '';

        document.getElementById('invoice').innerHTML = myOutput;
    }
    return false;
}