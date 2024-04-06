const express = require('express');
const bodyParser = require('body-parser');
const quizData = require('./quiz.json');
const cors=require('cors')
const app = express();
const PORT = 3000;
const corsOptions=()=>{
    origin:'http://172.16.193.232:5500/index.html'
}
app.use(cors());
app.use(bodyParser.json());


app.get('/quiz', (req, res) => {
    res.json(quizData);
});

app.post('/submit', (req, res) => {
    const userAnswers = req.body;
    let score = 0;
    const results = [];

    
    for (let i = 0; i < quizData.length; i++) {
        const correctAnswer = quizData[i].correctAnswer;
        const userAnswer = userAnswers[i];

        if (userAnswer === correctAnswer) {
            score++;
            results.push({ question: quizData[i].question, result: 'correct' });
        } else {
            results.push({ question: quizData[i].question, result: 'incorrect', correctAnswer });
        }
    }

    res.json({ score, results });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
