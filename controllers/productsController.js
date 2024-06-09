const Product = require("../models/ProductModel");
const asyncHandler = require("express-async-handler");

const getProducts = asyncHandler(async (req, res) => {
  const products = await (await Product.find({})).reverse();
  // throw new Error("Some Eror");
  res.json(products);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {

    res.json(product);
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
});




// search product
 const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
   console.log(keyword);
    const results = await Product
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
      let len=results.length;
      console.log(results);
      if(len==0)
       {
           const pro=await Product.find({});
       return     res.status(200).json(pro);
       }
       
   
    res.status(200).json(results);


  } catch (error) {
    console.log(error);
    const pro=await Product.find({});
          res.status(200).json(pro);
  }
};


module.exports = { getProducts, getProduct ,searchProductController};

