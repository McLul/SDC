const models = require ('./../models');
const deepEqual = require('deep-equal');



describe('Database Querying', () => {

  // beforeAll(async ()=> {await axios.get('http://localhost:3000/products/1') })
  let product = {
    "product_id": 1,
    "name": "Camo Onesie",
    "slogan": "Blend in to your crowd",
    "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    "default_price": "140",
    "category": "Jackets",
    "features": [
        {
            "feature": "Fabric",
            "value": "Canvas"
        },
        {
            "feature": "Buttons",
            "value": "Brass"
        }
    ]
  };

  let productList = [
    {
        "product_id": 1,
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "default_price": "140",
        "category": "Jackets"
    },
    {
        "product_id": 2,
        "name": "Bright Future Sunglasses",
        "slogan": "You've got to wear shades",
        "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
        "default_price": "69",
        "category": "Accessories"
    },
    {
        "product_id": 3,
        "name": "Morning Joggers",
        "slogan": "Make yourself a morning person",
        "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
        "default_price": "40",
        "category": "Pants"
    },
    {
        "product_id": 4,
        "name": "Slacker's Slacks",
        "slogan": "Comfortable for everything, or nothing",
        "description": "I'll tell you how great they are after I nap for a bit.",
        "default_price": "65",
        "category": "Pants"
    },
    {
        "product_id": 5,
        "name": "Heir Force Ones",
        "slogan": "A sneaker dynasty",
        "description": "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl",
        "default_price": "99",
        "category": "Kicks"
    }
  ];

  let relatedProducts = [
    2,
    3,
    8,
    7
  ];

  let productStyles = {
    "product_id": 1,
    "results": [
        {
            "style_id": 3,
            "name": "Ocean Blue & Grey",
            "original_price": "140",
            "sale_price": "100",
            "default?": false,
            "photos": [
                {
                    "url": "https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2761&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1544131750-2985d621da30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=666&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1544131750-2985d621da30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1557760257-b02421ae77fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1557760257-b02421ae77fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1551506448-074afa034c05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=938&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1551506448-074afa034c05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1556268652-ad74ebb8f1e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1556268652-ad74ebb8f1e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1557394976-32cc983558ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1557394976-32cc983558ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                }
            ],
            "skus": {
                "13": {
                    "size": "XS",
                    "quantity": 8
                },
                "14": {
                    "size": "S",
                    "quantity": 16
                },
                "15": {
                    "size": "M",
                    "quantity": 17
                },
                "16": {
                    "size": "L",
                    "quantity": 10
                },
                "17": {
                    "size": "XL",
                    "quantity": 15
                },
                "18": {
                    "size": "XXL",
                    "quantity": 6
                }
            }
        },
        {
            "style_id": 5,
            "name": "Sky Blue & White",
            "original_price": "140",
            "sale_price": "100",
            "default?": false,
            "photos": [
                {
                    "url": "https://images.unsplash.com/photo-1448526478325-616f2b15b04e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1448526478325-616f2b15b04e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1519098635131-4c8f806d1e82?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1519098635131-4c8f806d1e82?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1483056293146-9eac9521932f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1483056293146-9eac9521932f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1515992854631-13de43baeba1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1515992854631-13de43baeba1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1525141741567-f89ef016dfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1525141741567-f89ef016dfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1418985991508-e47386d96a71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1418985991508-e47386d96a71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                }
            ],
            "skus": {
                "25": {
                    "size": "XS",
                    "quantity": 8
                },
                "26": {
                    "size": "S",
                    "quantity": 16
                },
                "27": {
                    "size": "M",
                    "quantity": 17
                },
                "28": {
                    "size": "L",
                    "quantity": 10
                },
                "29": {
                    "size": "XL",
                    "quantity": 15
                },
                "30": {
                    "size": "XXL",
                    "quantity": 6
                }
            }
        },
        {
            "style_id": 1,
            "name": "Forest Green & Black",
            "original_price": "140",
            "sale_price": "0",
            "default?": true,
            "photos": [
                {
                    "url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                }
            ],
            "skus": {
                "1": {
                    "size": "XS",
                    "quantity": 8
                },
                "2": {
                    "size": "S",
                    "quantity": 16
                },
                "3": {
                    "size": "M",
                    "quantity": 17
                },
                "4": {
                    "size": "L",
                    "quantity": 10
                },
                "5": {
                    "size": "XL",
                    "quantity": 15
                },
                "6": {
                    "size": "XL",
                    "quantity": 4
                }
            }
        },
        {
            "style_id": 2,
            "name": "Desert Brown & Tan",
            "original_price": "140",
            "sale_price": "0",
            "default?": false,
            "photos": [
                {
                    "url": "https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1560567546-4c6dbc16877b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1560567546-4c6dbc16877b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1458253329476-1ebb8593a652?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1458253329476-1ebb8593a652?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1422557379185-474fa15bf770?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1422557379185-474fa15bf770?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1490723286627-4b66e6b2882a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1490723286627-4b66e6b2882a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1447958272669-9c562446304f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2800&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1447958272669-9c562446304f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                }
            ],
            "skus": {
                "7": {
                    "size": "XS",
                    "quantity": 8
                },
                "8": {
                    "size": "S",
                    "quantity": 16
                },
                "9": {
                    "size": "M",
                    "quantity": 17
                },
                "10": {
                    "size": "L",
                    "quantity": 10
                },
                "11": {
                    "size": "XL",
                    "quantity": 15
                },
                "12": {
                    "size": "XXL",
                    "quantity": 6
                }
            }
        },
        {
            "style_id": 4,
            "name": "Digital Red & Black",
            "original_price": "140",
            "sale_price": "0",
            "default?": false,
            "photos": [
                {
                    "url": "https://images.unsplash.com/photo-1530092376999-2431865aa8df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1530092376999-2431865aa8df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1487174244970-cd18784bb4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1487174244970-cd18784bb4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1488554378835-f7acf46e6c98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1488554378835-f7acf46e6c98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1486025402772-bc179c8dfb0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1486025402772-bc179c8dfb0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1473691955023-da1c49c95c78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1473691955023-da1c49c95c78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1517456837005-d757b959ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "thumbnail_url": "https://images.unsplash.com/photo-1517456837005-d757b959ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60"
                }
            ],
            "skus": {
                "19": {
                    "size": "XS",
                    "quantity": 8
                },
                "20": {
                    "size": "S",
                    "quantity": 16
                },
                "21": {
                    "size": "M",
                    "quantity": 17
                },
                "22": {
                    "size": "L",
                    "quantity": 10
                },
                "23": {
                    "size": "XL",
                    "quantity": 15
                },
                "24": {
                    "size": "XXL",
                    "quantity": 6
                }
            }
        },
        {
            "style_id": 6,
            "name": "Dark Grey & Black",
            "original_price": "170",
            "sale_price": "0",
            "default?": false,
            "photos": [
                {
                    "url": "https://images.unsplash.com/photo-1514866726862-0f081731e63f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1514866726862-0f081731e63f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1519689373023-dd07c7988603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1519689373023-dd07c7988603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1506932248762-69d978912b80?ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1506932248762-69d978912b80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1498098662025-04e60a212db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1498098662025-04e60a212db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1421941027568-40ab08ee5592?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1421941027568-40ab08ee5592?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                }
            ],
            "skus": {
                "31": {
                    "size": "XS",
                    "quantity": 8
                },
                "32": {
                    "size": "S",
                    "quantity": 16
                },
                "33": {
                    "size": "M",
                    "quantity": 17
                },
                "34": {
                    "size": "L",
                    "quantity": 10
                },
                "35": {
                    "size": "XL",
                    "quantity": 15
                },
                "36": {
                    "size": "XXL",
                    "quantity": 6
                }
            }
        }
    ]
  };




  it('Should correctly query a list of products', done => {
    models.listProducts(1,5, (err, res)=>{
      console.log(res);
      expect(deepEqual(res, productList)).toBe(true);
      done();
    });

  });

  it('Should correctly query product information', done => {
    models.productInformation(1, (err, res)=>{
      expect(deepEqual(res, product)).toBe(true);
      done();
    });

  });

  it('Should correctly query product styles', done => {
    models.productStyles(1, (err, res)=>{
      expect(deepEqual(res, productStyles)).toBe(true);
      done();
    });

  });

  it('Should correctly query related products', done => {
    models.relatedProducts(1,(err, res)=>{
      expect(deepEqual(res, relatedProducts)).toBe(true);
      done();
    });

  });



});
