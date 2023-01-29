
const express = require('express');
const User = require('../models/user_model');
const router = express.Router();

router.get('/mentor/allQuery', async(req, res) => {
    try{
     
        const student_data = await User.find({ role: "student" });

        if (student_data) {
          const stu_quer = student_data.map((q) => {
            return Object.assign(
              {},
              {
                _id: q.id,
                name: q.firstName + " " + q.lastName,
                email: q.email,
                phoneNumber: q.phoneNumber,
                query: q.$getAllSubdocs().length,
                bendingQuery: q.$getAllSubdocs().filter((s) => {
                  return s.status == "bending";
                }).length,
                resolvedQuery: q.$getAllSubdocs().filter((s) => {
                  return s.status == "resolved";
                }).length,
              }
            );
          });
          return res.status(200).send(stu_quer);
        }
        return res.status(400).send({
          error: "Error While Getting Student data.",
        });
  
      

       
    }catch(err){
       
         return res.status(500).send("Internal Server Error")
    }
});



    


 router.get("/mentor/:studentId/allQuery", async (req, res) => {
  try {
    const student_Id = req.params.studentId;
    const student = await User.findById(student_Id);
    if (student) {
      const _query = await student.$getAllSubdocs();
      if (_query) {
        return res.send(_query);
      } else {
        return res.send({
          error: "Error While Getting Your Query",
        });
      }
    }
    return res.status(400).send({
      error: "Error while Fetching Your Data. ",
    });
  } catch (error) {
   
    return res.status(500).send("Internal Server Error");
  }
});
 

router.get('/mentor/:studentId/:queryId/getQuery',async(req, res) => {
   try{

       const student_Id =req.params.studentId;

         const id=req.params.queryId;

         const student = await User.findById(student_Id);
          if(student){
         const single_query = await student.student_query.id(id);
        
        if (single_query){
                return res.send(single_query)
        }else{ return res.send({
            error:"Error While Getting Your Query"
        })};
    }
    return res.status(400).send({
             error:"Error while Fetching Your Data. "
        })
    }catch(error){
        return res.status(500).send("Internal Server Error")
    }
})



 router.put('/mentor/:studentId/:queryId/updateQuery', async(req, res) => {

    try{

         const student_Id =req.params.studentId;

         const id = req.params.queryId;

         const {solution,status,assignedTo}=req.body;

         const student = await User.findById(student_Id);
        

        const query = await student.student_query.id(id);

        
            if(query){
                     await query.set({
                       solution: solution,
                       status: status,
                       assignedTo:assignedTo,
                     });
                     await student.save((err, query) => {
                        if(err){
                         
                                return res.status(400).send({
                                      error: "Error while updating query"
                                });
                        }
                        return res.status(201).send({
                            message:"Successfully Updated"
                        });

                        });

                    } else{  
                        return res.status(400).send({
                        error:"Unable To Find Query"
                    })
                };          
            
    }catch(err){
       
        return res.status(500).send("Internal Server Error")
    }
})









module.exports = router;