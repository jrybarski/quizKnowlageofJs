export function renderTemplate(containerMain, filterQuestionsByCategory) {
    const categories = [
        "Asynchronic programming", 
        "Variables and data types", 
        "Conditions and loops", 
        "Javascript functions", 
        "Strings and Arrays", 
        "Classes and OOP"
    ];

    const questionName = document.createElement("h1");
    questionName.id = "questionName";
    questionName.classList.add("questionName");

    const questionList = document.createElement("ul");
    questionList.classList.add("questionList");

    const questionAnswearA = document.createElement("li");
    questionAnswearA.id = "questionAnswearA";
    questionAnswearA.classList.add("question");

    const questionAnswearB = document.createElement("li");
    questionAnswearB.id = "questionAnswearB";
    questionAnswearB.classList.add("question");

    const questionAnswearC = document.createElement("li");
    questionAnswearC.id = "questionAnswearC";
    questionAnswearC.classList.add("question");

    const questionAnswearD = document.createElement("li");
    questionAnswearD.id = "questionAnswearD";
    questionAnswearD.classList.add("question");

    questionList.appendChild(questionAnswearA);
    questionList.appendChild(questionAnswearB);
    questionList.appendChild(questionAnswearC);
    questionList.appendChild(questionAnswearD);

    containerMain.appendChild(questionName);
    containerMain.appendChild(questionList);

    questionName.innerHTML = "Name";
    questionAnswearA.innerHTML = "A";
    questionAnswearB.innerHTML = "B";
    questionAnswearC.innerHTML = "C";
    questionAnswearD.innerHTML = "D";

    
    let answerA = document.getElementById('questionAnswearA');
    let answerB = document.getElementById('questionAnswearB');
    let answerC = document.getElementById('questionAnswearC');
    let answerD = document.getElementById('questionAnswearD');
    let buttonCollection = document.querySelector('.buttonCollection');

    categories.forEach((category, index) => {
        const buttonCategory = document.createElement("button");
        buttonCategory.classList.add("buttonCategory");
        buttonCategory.id = `Category${index + 1}`;
        buttonCategory.innerHTML = category;
        buttonCollection.appendChild(buttonCategory);
        buttonCategory.addEventListener('click', () => filterQuestionsByCategory(category));
    });

    return {
        answerA,
        answerB,
        answerC,
        answerD
    };
}
