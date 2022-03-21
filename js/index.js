function Order(size, crust, toppings, amount, price){
    this.size = size;
    this.crust = crust;
    this.toppings = toppings;
    this.amount = amount
    this.price = price
}
Order.prototype.cost = function(){ 
// prices for different pizza sizes
    if(this.size === "Large"){
        var sizePrice = 1000;
    }else if(this.size === "Medium"){
        var sizePrice = 700;
    }else if(this.size ==="Small"){
        var sizePrice = 500;
    }
// prices for different crusts
    if(this.crust === "Butter-Cheese"){
        var crustPrice = 200;
    }else if (this.crust === "Garlic-buttery-blend"){
        var crustPrice = 180;
    }else if (this.crust === "Gluten-free"){
        var crustPrice = 250;
    }else if(this.crust === "Fiery-red-pepper"){
        var crustPrice = 150;
    }
// checkbox prices
    let checkboxes = $('input[name="toppings"]:checked').length;
    if (checkboxes<= 4){
        if(this.size === "Large"){
            var toppingsPrice = checkboxes * 150;
        }else if(this.size === "Medium"){
            var toppingsPrice = checkboxes * 100;
        }else if(this.size ==="Small"){
            var toppingsPrice = checkboxes * 50;
        }
        return (sizePrice + crustPrice + toppingsPrice)* this.amount;
    }else{
        
        alert("You've selected more than 4 toppings!!");
        
    }  
}

Order.prototype.name =function(){
    let pizzaName =`${this.amount} ${this.size} ${this.crust} ${'crusted pizza, with'} ${this.toppings} ${"for the topping."}`;
    return pizzaName;
}
function clearFields(){
    $('select#size').val("");
    $('select#crust').val(""); 
    $("input[type='checkbox']"). val("");
    $('input#amount').val("");
    $('input[name="toppings"]').prop("checked", false);
}
    
$("document").ready(function(){

    $("#make-pizza").submit (function(event){
        event.preventDefault();
        var size = $('select#size').val();
        var crust = $('select#crust').val(); 
        var toppings = [];
        $.each($('input[name="toppings"]:checked'),function(){
            toppings.push($(this).val());
        });
        var amount = parseInt($('input#amount').val());
        if (toppings.length <= 4){
            var pizzaOrder = new Order(size, crust, toppings, amount);
        $('.order span').text( `${pizzaOrder.name()} ${"which will cost"} ${pizzaOrder.cost()}`)
        $('.order').show(); 
        $('#p-order').prop('disabled', true);
        }else{
            alert("You've selected more than 4 toppings!!")
            location.reload();
        }

        $('.checkout').click(function(){
            $('#p-amount').append(amount);
            $('#p-crust').append(crust);
            $('#p-toppings').append(toppings);
            $('#p-size').append(size);
            $('#p-price span').text(pizzaOrder.cost()/amount);
            $('#cost').append(pizzaOrder.cost());
            $('.summary').show();
            $('.checkout').prop('disabled', true);
        })
        $('.delivery .checkout').click(function(){
            $('#p-deli').append(200);
            $('#deli-cost').append(pizzaOrder.cost() + 200)
        })
        $('.pick-up .checkout').click(function(){
            $('#p-deli').append(0);
            $('#deli-cost').append(pizzaOrder.cost() + 0)
        })
 

    })

    $("#deliver").click(function(){
        $('.location').show();
        $(".order").hide();
    })
    $(".location button").click(function(event){
        event.preventDefault();
        var location = $('.location input').val();
        $('.delivery span').text(location);
        $('.location').hide();
        $('.delivery').show();
    })
    $("#instore").click(function(){
        $(".pick-up").show();
        $(".order").hide();
    }) 
    $('.new-order').click(function(){
        location.reload();
    })
    

    clearFields();
})