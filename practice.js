
// let o ="name:gokul,age:99"

// let p =o.split(",").join(" ")

// console.log(p)

// const array1 =[{age:2},{age:5}]

// console.log(array1.map((i)=>{
//     return i.age
// }))

const products = [
    {
        product: '6567a0e9b7d88ed2e292687d',
        count: 4,
        color: 'red',
        _id: '6565ce850199568462b8635e',
    },
    {
        product: '656829318744b96f0cd0a107',
        count: 3,
        color: 'green',
        _id: '6565ce850199568462b8635f',
    },
];

const productDetails = [
    {
        _id: '6567a0e9b7d88ed2e292687d',
        title: 'big brand',
        slug: 'big-brand',
        description: '<p>ops</p>',
        price: 9,
        // ... other product details
    },
    {
        _id: '656829318744b96f0cd0a107',
        title: 'loops',
        slug: 'loops',
        description: '<p>liips</p>',
        price: 88888888888888900,
        // ... other product details
    },
];

const combinedArray = [];

// Nested loop to combine information from both arrays
for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < productDetails.length; j++) {
        if (products[i].product === productDetails[j]._id) {
            // Combine information and push to the new array
            combinedArray.push({
                product: products[i].product,
                count: products[i].count,
                color: products[i].color,
                _id: products[i]._id,
                details: {
                    title: productDetails[j].title,
                    slug: productDetails[j].slug,
                    description: productDetails[j].description,
                    price: productDetails[j].price,
                    // ... other product details
                },
            });
            break; // Break out of the inner loop once a match is found
        }
    }
}

// Display the combined array
console.log(combinedArray);
