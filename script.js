let questions = [
    {
        'question': 'Was hat Wurzeln, die keiner sieht, ragt höher als Bäume und Wipfelsäume, wächst nie und treibt nicht und reicht doch ins Licht?',
        'answer1': 'Ein Turm',
        'answer2': 'Ein Berg',
        'answer3': 'Eine Wolke',
        'answer4': 'Ein Fluss',
        'rightAnswer': 2
    },
    {
        'question': 'Zweiunddreißig Schimmel auf einem roten Hang - erst mahlen sie, dann stampfen Sie und warten wieder lang.',
        'answer1': 'Ein Fliegenpilz',
        'answer2': 'Einhörner',
        'answer3': 'Eine Windmühle',
        'answer4': 'Zähne',
        'rightAnswer': 4
    },
    {
        'question': 'Schreit ohne Stimme, fliegt ohne Schwinge, beißt ohne Zahn, murmelt und pfeift - kein Mund hats getan.',
        'answer1': 'Ein Instrument',
        'answer2': 'Wind',
        'answer3': 'Der Tot',
        'answer4': 'Eine Schlucht',
        'rightAnswer': 2
    },
    {
        'question': "Man kann es nicht sehen, kann's auch nicht aufstören, kan nes nicht fressen und kann's auch nicht höhren, liegt hinter den Sternen und unterm Gestein, rieselt in alle Höhlen hinein, kommt zuerst und folgt zulezt, löscht alles Leben, bis keiner mehr schwäzt.",
        'answer1': 'Die Stille',
        'answer2': 'Staub',
        'answer3': 'Das Dunkel',
        'answer4': 'Die Leere',
        'rightAnswer': 1
    },
    {
        'question': 'Atemlos lebt es, kalt wie der Tod schwebt es, fühlt keinen Durst und doch trinkt es, trägt ein Kettenhemd und nie klingt es.',
        'answer1': 'Gier',
        'answer2': 'Ein Fluss',
        'answer3': 'Ein Spion',
        'answer4': 'Ein Fisch',
        'rightAnswer': 4
    },
    {
        'question': 'Etwas, das alles und jden verschlingt: Baum, der rauscht, Vogel, der singt, frisst Eisen, zermalmt den härtesten Stein, zerbeist jedes Schwert, zerbricht jeden Schrein, schlägt Könige nieder, schleift ihren Palast, trägt mächtigen Fels fort als leichte Last.',
        'answer1': 'Wasser',
        'answer2': 'Wind',
        'answer3': 'Zeit',
        'answer4': 'Nichts',
        'rightAnswer': 4
    }
];

let currentQuestion = 0;
let numberOfRightAnswers = [];
createAnswerArray();
let AUDIO_SUCCESS = new Audio('audio/rightanswer.mp3');
let AUDIO_Fail = new Audio('audio/wronganswer.mp3');
AUDIO_Fail.volume = 0.05;

function createAnswerArray(){
    for (let i = 0; i < questions.length; i++) {
        numberOfRightAnswers.push([]);
    }
}

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    if(currentQuestion >= questions.length) {
        document.getElementById('endscreen').style = '';
        document.getElementById('normal').style = 'display: none';
    } else {
        let question = questions[currentQuestion];
        document.getElementById('question-text').innerHTML = question['question'];
        document.getElementById('show-current-question').innerHTML = currentQuestion + 1;
        document.getElementById('answer1').innerHTML = question['answer1'];
        document.getElementById('answer2').innerHTML = question['answer2'];
        document.getElementById('answer3').innerHTML = question['answer3'];
        document.getElementById('answer4').innerHTML = question['answer4'];

        let percent = Math.round((currentQuestion + 1) / questions.length * 100);
        document.getElementById('progress-amount').innerHTML = percent + '%';
        document.getElementById('progress-amount').style.width = percent + '%';
    }   
}

function answer(choice) {
    let question = questions[currentQuestion];
    let chosenAnswer = choice.slice(-1);

    let idOfrightAnswer = `answer${question['rightAnswer']}`;

    if(chosenAnswer == question['rightAnswer']) {
        document.getElementById(choice).parentNode.classList.add('bg-success');
        numberOfRightAnswers[currentQuestion].push(1);
        AUDIO_SUCCESS.play();
        console.log('right');
    } else {
        document.getElementById(choice).parentNode.classList.add('bg-danger');
        document.getElementById(idOfrightAnswer).parentNode.classList.add('bg-success');
        numberOfRightAnswers[currentQuestion].push(0);
        AUDIO_Fail.play();
    }
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    resetAnswerColor();
    showQuestion();
    document.getElementById('next-button').disabled = true;
    if(currentQuestion == questions.length) {
        lastScreen();
    }
}

function resetAnswerColor() {
    for(let i = 1; i < 5; i++) {
        document.getElementById(`answer${i}`).parentNode.classList.remove('bg-success');
        document.getElementById(`answer${i}`).parentNode.classList.remove('bg-danger');
    }
}

function rightAnswersEnd() {
    let sum = 0;
    for (let i = 0; i < numberOfRightAnswers.length; i++) {
        sum += numberOfRightAnswers[i][0];
    }
    return sum;
}

function lastScreen() {
    let questionsAnswered = rightAnswersEnd();
    document.getElementById('whole-questions').innerHTML = questions.length;
    document.getElementById('number-right-answers').innerHTML = questionsAnswered;
    if(rightAnswersEnd() < 4) {
        document.getElementById('endscreen-image').src = './Quizapp Darkimg/Quizapp/bad-g6062d606c_1280.png';
        document.getElementById('endscreen-evaluation').innerHTML = 'Närrischer Took!';
    }
    else {
        document.getElementById('endscreen-image').src = './Quizapp Darkimg/Quizapp/good-g31886827e_1280.png';
        document.getElementById('endscreen-evaluation').innerHTML = 'Sehr gut!';
    }
    document.getElementById('progress-screen').style = 'display: none';
}

function restartGame() {
    currentQuestion = 0;
    numberOfRightAnswers = [];
    init();
    document.getElementById('normal').style = 'display: block';
    document.getElementById('endscreen').style = 'display: none';
    createAnswerArray();
}