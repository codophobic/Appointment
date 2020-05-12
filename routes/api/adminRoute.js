const express = require('express');
const { MongoClient } = require('mongodb');
const keys  = require('../../config/key');
const router= express.Router();
const doctorModel = require('../../models/doctor');


const docData=[
	{
		"name": "Nash Conley",
		"time": "2021-04-20 16:24:14",
		"id": 1,
        "phone": "16730602 0186",
	},
	{
		"name": "William Tucker",
		"time": "2019-11-05 13:07:38",
		"id": 2,
        "phone": "16800916 8983",
        
	},
	{
		"name": "Aidan Payne",
		"time": "2020-04-20 18:37:07",
		"id": 3,
        "phone": "16710229 2641",
        
	},
	{
		"name": "Joseph Wilkerson",
		"time": "2019-11-24 04:36:35",
		"id": 4,
        "phone": "16220607 0092",
        
	},
	{
		"name": "Yuli Caldwell",
		"time": "2020-05-06 17:14:18",
		"id": 5,
        "phone": "16521026 2985",
        
	},
	{
		"name": "Nicholas Cunningham",
		"time": "2021-02-08 13:03:05",
		"id": 6,
        "phone": "16630830 9167",
    
	},
	{
		"name": "Mark Reed",
		"time": "2020-06-12 14:12:47",
		"id": 7,
        "phone": "16930420 0257",
    
	},
	{
		"name": "Xavier Pena",
		"time": "2020-11-28 00:32:25",
		"id": 8,
        "phone": "16660216 8822",
        
	},
	{
		"name": "Marvin Everett",
		"time": "2020-08-23 20:23:47",
		"id": 9,
        "phone": "16970420 3786",
        
	},
	{
		"name": "Kadeem Burks",
		"time": "2019-11-01 14:26:03",
		"id": 10,
        "phone": "16920819 9712",
        
	},
	{
		"name": "Devin Mosley",
		"time": "2019-11-19 13:54:07",
		"id": 11,
        "phone": "16010820 2813",
        
	},
	{
		"name": "Edan Pratt",
		"time": "2019-06-03 12:18:09",
		"id": 12,
        "phone": "16420527 3024",
    
	},
	{
		"name": "Jakeem Kaufman",
		"time": "2019-09-02 10:33:58",
		"id": 13,
        "phone": "16820907 4585",
        
	},
	{
		"name": "Mohammad Bridges",
		"time": "2019-11-02 11:45:40",
		"id": 14,
        "phone": "16740411 6191",
        
	},
	{
		"name": "Quinn Harrell",
		"time": "2019-08-13 20:31:43",
		"id": 15,
        "phone": "16150320 9445",
        
	},
	{
		"name": "Craig Sanders",
		"time": "2020-10-15 01:52:19",
		"id": 16,
        "phone": "16870823 6214",
    
	},
	{
		"name": "Zahir Grimes",
		"time": "2019-05-29 14:05:23",
		"id": 17,
        "phone": "16520126 5682",
        
	},
	{
		"name": "Laith Hale",
		"time": "2020-03-07 22:07:28",
		"id": 18,
        "phone": "16840428 1506",
        
	},
	{
		"name": "Herrod Hunt",
		"time": "2019-08-17 18:32:25",
		"id": 19,
        "phone": "16731127 3937",
        
	},
	{
		"name": "Murphy Blair",
		"time": "2019-10-14 15:41:49",
		"id": 20,
        "phone": "16420923 4907",
        
	},
	
];


router.post('/',(req,res)=>{
    res.status(200).json({
        message:"Success Admin url hitted"
    })

    doctorModel.collection.insert(docData,(err,doc)=>{
        if(err)
        console.log(err);
        else
        console.log('mul inserted');
    })
    });




module.exports= router;