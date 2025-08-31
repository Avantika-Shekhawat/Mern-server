import cartModel from '../models/cart.js'; // database model for cart 

export const addToCart = async (req,res)=>{
    try {
        const { ProductId } = req.body;
        const UserId = req.user.id;

        const existingCartItem = await cartModel.findOne({UserId,ProductId});

        if(existingCartItem)
        {
            existingCartItem.Quantity +=1;
            await existingCartItem.save();
            return res.status(200).json({msg :'item added to cart sucessfully'});
        }

        const cartItem = await cartModel.create({
            UserId,
            ProductId
        });

        res.status(201).json({msg:'Item added to the cart sucessfully'});

    } catch (error) {
        res.status(500).json({msg:'error adding the item to the cart'});
        console.log(error);
    }
};

export const getCartItems = async (req,res) =>
{
    try {
        const UserId = req.user.id;

        const cartItems = await cartModel.find({UserId}).populate('ProductId');
        res.status(200).json(cartItems); 

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const decreaseItemQuantity = async (req, res) => {
    try {
        const UserId = req.user.id; // Authenticated user ID
        const { ProductId } = req.body; // Product ID from frontend

        if (!ProductId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        // Find the cart item for this user and product
        const cartItem = await cartModel.findOne({ UserId, ProductId: ProductId });

        if (!cartItem) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        if (cartItem.Quantity > 1) {
            cartItem.Quantity -= 1;
            await cartItem.save();
        } else {
            // If quantity is 1, remove the item entirely
            await cartModel.deleteOne({ _id: cartItem._id });
        }

        // Return updated cart
        const updatedCart = await cartModel.find({ UserId }).populate('ProductId');
        res.status(200).json(updatedCart);

    } catch (error) {
        console.error("Error decreasing item quantity:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

export const increaseItemQuantity = async (req, res) => {
    try {
        const { ProductId } = req.body;
        const UserId = req.user.id;

        const existingCartItem = await cartModel.findOne({ UserId, ProductId });

        if (existingCartItem) {
            existingCartItem.Quantity += 1;
            await existingCartItem.save();
        } else {
            await cartModel.create({ UserId, ProductId });
        }

        // Always return updated cart
        const updatedCart = await cartModel.find({ UserId }).populate('ProductId');
        res.status(200).json(updatedCart);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error adding item to the cart' });
    }
};
