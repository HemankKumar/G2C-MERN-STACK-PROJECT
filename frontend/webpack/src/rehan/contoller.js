async function AvailProduct(req,resp)
{

    console.log(req.body);
    
    const growerObj=await growerModel.find({email:req.body.email})

    console.log(growerObj[0]);

    req.body.city=growerObj[0].city;
    console.log(req.body);

    const doc=new AvailProductModel(req.body);
    doc.city=growerObj[0].city

    if(req.body.category==='0')
    {
        doc.category="Milk Product";
    }
    else if(req.body.category==='1')
    {
        doc.category="Fruits";
    }
    else doc.category="Vegetables"
    console.log(doc);

    
    await doc.save().then((retdoc)=>{
        resp.json({status:true,res:retdoc,city:growerObj[0].city})
    }).catch((err)=>{
        console.log(err);
        resp.json({status:false,err:err.message});
    })

    /*catch(err)
    {
        console.log('Error in AvailProduct:', err);
        resp.status(500).json({ status: false, error: 'Internal server error' });
    }*/
}