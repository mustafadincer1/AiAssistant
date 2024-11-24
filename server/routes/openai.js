const router = require('express').Router();
const fetch = require('node-fetch'); 
const OpenAI = require('openai')
const verifyToken = require('./verifyToken');
const auth = require('../middlewares/auth');
const authStudent = require('../middlewares/authStudent');


router.post('/chat',auth, async (req, res) => {
    const { message } = req.body;

    if(message && message.length >0){
        
        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", 
                messages: [{ "role": "user", "content": `You are a asistant. Answer the question which you asked. Question: ${message}` }], // Kullanıcıdan gelen mesajı API'ye gönderiyoruz.
                max_tokens: 30
            })
        };
   
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", options);
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
    else{

        return res.json({Status:"Success",user :req.user});
        
    }
});


router.post('/quiz',authStudent,async(req,res)=>{
    const { topic } = req.body;

    if(topic && topic.length >0){
        console.log(2);
        const openai = new OpenAI({apiKey:process.env.API_KEY})
        const aiModel = 'gpt-4o-mini'
        const messages= [{
            "role": "user",
            "content": `You are quiz master. Generete 3 question about ${topic} with 4 multiple choice answers.Also provide the answer separately.The responde should be in the following json format {"questions":["id:"","question":"","options":[a:"",b:"",c:"",d:""],"answer":""}....]} `
        }]
        const completion = await openai.chat.completions.create({
            model:aiModel,
            response_format:{"type":"json_object"},
            messages
        })
        const aiResponse = completion.choices[0].message.content;
        const json = JSON.parse(aiResponse);
        res.json({Status:"Success",quiz:json}); 

    } else{
  
        return res.json({Status:"Success",user :req.user});
        
    }
    
})

module.exports = router;  