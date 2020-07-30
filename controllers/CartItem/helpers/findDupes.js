function findDupes(cartitems = []) {

    let dupes = []
    let checkedProducts = []
    let allDupes = []

    for(let i = 0; i < cartitems.length; i++) {

        let item = cartitems[i]
        
        if(!checkedProducts.includes(item.product)) {
            for(let j = 0; j < cartitems.length; j++) {
                if(item.product == cartitems[j].product && i != j) {
                    if(dupes.length == 0) dupes.push(item, cartitems[j])
                    else dupes.push(cartitems[j])
                }
            }
        }

        checkedProducts.push(item.product)
        if(dupes.length > 0) allDupes.push(dupes)
        dupes = []

    }

    return allDupes

}

module.exports = findDupes