const express = require('express');
const router = express.Router();
const Student = require('../models/user_model');


//get student query's
router.get('/student/:studentId/allQuery',async(req,res)=>{

    try{

        const student_Id=req.params.studentId;
        

        const student = await Student.findById(student_Id);
       
        if(student){
            const all_query= await student.$getAllSubdocs();
            if(all_query){
                return res.status(200).send(all_query)
            }
            return res.status(400).send({
                error:"Error while Getting Query's."
            })
        }
        return res.status(400).send({

             error:"Error while Fetching Your Data. "
        })
    }catch(error){
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
});

//get selected query

router.get('/student/:studentId/:queryId/oneQuery',async(req,res)=>{

    try{

       const {studentId,queryId }=req.params;



       const student = await Student.findById(studentId);

        
          if(student){
         const single_query = await student.student_query.id(queryId);
        
        if (single_query){

                return res.send(single_query)
         }
         return res.send({

            error:"Error While Getting Your Query"
        });
    }
    
   
        return res.status(400).send({
       
             error:"Error while Fetching Your Data. "
        })
    
    }catch(error){
       
        return res.status(500).send("Internal Server Error")
    }
})

//Add new query
router.post('/student/:studentId/addQuery',  async (req, res) => {

    try{

        const studentId =req.params.studentId;
       
        const payload = req.body;

        const student = await Student.findById(studentId);

        if(student){
                student.student_query.push(payload);
                student.save((err,query)=>{
            if(err){
                    return res.status(400).json({
                        error: "Error while Posting Query"
                    });
                }
    
                return res.status(200).send({
                    message:"Query Created Successfully"
                });
            })
        }else{
            return res.status(400).json({
                error:"Error While Finding Your Data"
            })
        }
          
        

    }catch(err){
         return res.status(500).send("Internal Server Error")
        console.log(err);
    }
})

//Update Query
 router.put('/student/:studentId/updateQuery', async(req, res) => {

    try{

         const student_Id =req.params.studentId;

         const {id,category,title,description}=req.body;

         
         const student = await Student.findById(student_Id);
        

        const query = await student.student_query.id(id);

            if(query){

                     await query.set({category:category,title:title,description:description});
                     
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
       console.log(student)
            
    }catch(err){
        console.log(err)
        return res.status(500).send("Internal Server Error")
    }
})


router.delete('/student/:studentId/:queryId/deleteQuery',async(req, res) => {
    try{

        const {studentId, queryId } = req.params;

        console.log(req.params)

        const student = await Student.findById(studentId);

        student.student_query.id(queryId).remove();

        student.save((err,data)=>{
           if(err){
              res.status(400).send({
                error:"Error while deleting query"
              })
           }
           return res.status(200).send("Query Deleted Successfully...");
        })

    }catch(err){
        console.log(err)
        return res.status(500).send("Internal Server Error")
    }
})

module.exports = router;