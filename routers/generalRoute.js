const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const username = req.query.name;
  await res.status(200).send(`Hello ${username ?? ""}! How are you? `);
});

//getUserData

router.get('/user/:id',async(req,res)=>{
  try {
    
       const userData = await User.findById(req.params.id)
       
       if(userData){
       const {_id,firstName,lastName,email,phoneNumber} = userData;
      
       return res.status(200).json({
          
           user: { _id, email, firstName, lastName,email,phoneNumber },
         });
       
       }
      return res.status(400).send({
        message: "User Not Exist...",
      });
  } catch (error) {
      return res.status(500).send({
         message: "Internal Server Error",
        });
  }
})
//update
router.put('/user/:id', async (req, res) => {
try{
    User.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true},
        (err, data) => {
            if(err){
                return res.status(400).json({
                    error: "Error while updating user"
                });
            }

            return res.status(201).send({
                message:"Updated Successfully..."
            });
        });
    }
    catch(err){
        res.status(500).send('Internal Server Error', err)
    }
})


router.delete("/users/:id", (req, res) => {
  res.send("Deleting an user");
});

 
module.exports=router;