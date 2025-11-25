document.addEventListener('DOMContentLoaded', function() {
    // Quiz configuration
    const quizConfig = {
        timeLimit: 120, // 2 minutes in seconds
        questions: [
            {
                id: 1,
                text: "What's your skin type?",
                options: [
                    { text: "Dry", description: "Feels tight and may have flaky patches", image: "/images/quiz/dry-skin.jpg" },
                    { text: "Oily", description: "Shiny and prone to breakouts", image: "/images/quiz/oily-skin.jpg" },
                    { text: "Combination", description: "Oily T-zone, dry cheeks", image: "/images/quiz/combination-skin.jpg" },
                    { text: "Normal", description: "Well-balanced, few concerns", image: "/images/quiz/normal-skin.jpg" }
                ]
            },
            {
                id: 2,
                text: "What are your main skin concerns?",
                options: [
                    { text: "Acne & Blemishes", description: "Breakouts, blackheads, or whiteheads", image: "/images/quiz/acne.jpg" },
                    { text: "Aging Signs", description: "Fine lines, wrinkles, loss of firmness", image: "/images/quiz/aging.jpg" },
                    { text: "Hyperpigmentation", description: "Dark spots, uneven skin tone", image: "/images/quiz/pigmentation.jpg" },
                    { text: "Sensitivity", description: "Redness, irritation, reactive skin", image: "/images/quiz/sensitivity.jpg" }
                ]
            },
            {
                id: 3,
                text: "How would you describe your skin's sensitivity level?",
                options: [
                    { text: "Very Sensitive", description: "Reacts easily to new products", image: "/images/quiz/very-sensitive.jpg" },
                    { text: "Somewhat Sensitive", description: "Occasional reactions", image: "/images/quiz/somewhat-sensitive.jpg" },
                    { text: "Resilient", description: "Rarely reacts to products", image: "/images/quiz/resilient.jpg" },
                    { text: "Unsure", description: "Haven't noticed specific reactions", image: "/images/quiz/unsure.jpg" }
                ]
            },
            {
                id: 4,
                text: "What's your current skincare routine like?",
                options: [
                    { text: "Minimal", description: "Cleanser & moisturizer only", image: "/images/quiz/minimal-routine.jpg" },
                    { text: "Moderate", description: "3-5 products daily", image: "/images/quiz/moderate-routine.jpg" },
                    { text: "Extensive", description: "6+ products daily", image: "/images/quiz/extensive-routine.jpg" },
                    { text: "None", description: "Looking to start a routine", image: "/images/quiz/no-routine.jpg" }
                ]
            },
            {
                id: 5,
                text: "What's your skin's exposure to sun and pollution?",
                options: [
                    { text: "High Exposure", description: "Outdoors often, urban environment", image: "/images/quiz/high-exposure.jpg" },
                    { text: "Moderate Exposure", description: "Mix of indoor/outdoor time", image: "/images/quiz/moderate-exposure.jpg" },
                    { text: "Low Exposure", description: "Mostly indoors", image: "/images/quiz/low-exposure.jpg" },
                    { text: "Protected", description: "Always use sun protection", image: "/images/quiz/protected.jpg" }
                ]
            }
        ]
    };

    // Quiz state
    let currentState = {
        currentQuestion: 0,
        answers: {},
        timeRemaining: quizConfig.timeLimit,
        timerInterval: null
    };

    // DOM Elements
    const elements = {
        welcome: document.getElementById('quiz-welcome'),
        progress: document.getElementById('quiz-progress'),
        questionsContainer: document.getElementById('questions-container'),
        results: document.getElementById('quiz-results'),
        startButton: document.getElementById('start-quiz'),
        progressBar: document.querySelector('.progress-bar'),
        currentQuestionSpan: document.getElementById('current-question'),
        totalQuestionsSpan: document.getElementById('total-questions'),
        timeRemainingSpan: document.getElementById('time-remaining'),
        questionTemplate: document.getElementById('question-template'),
        optionTemplate: document.getElementById('option-template')
    };

    // Initialize quiz
    function initQuiz() {
        elements.totalQuestionsSpan.textContent = quizConfig.questions.length;
        elements.startButton.addEventListener('click', startQuiz);
        updateProgress();
    }

    // Start quiz
    function startQuiz() {
        elements.welcome.classList.add('d-none');
        elements.progress.classList.remove('d-none');
        elements.questionsContainer.classList.remove('d-none');
        showQuestion(0);
        startTimer();
    }

    // Show question
    function showQuestion(index) {
        const question = quizConfig.questions[index];
        const questionCard = elements.questionTemplate.content.cloneNode(true);
        
        questionCard.querySelector('.question-text').textContent = question.text;
        
        const optionsGrid = questionCard.querySelector('.options-grid');
        question.options.forEach((option, i) => {
            const optionElement = createOption(option, index, i);
            optionsGrid.appendChild(optionElement);
        });

        const prevButton = questionCard.querySelector('.prev-question');
        const nextButton = questionCard.querySelector('.next-question');
        
        prevButton.style.visibility = index === 0 ? 'hidden' : 'visible';
        nextButton.textContent = index === quizConfig.questions.length - 1 ? 'Get Results' : 'Next';
        
        prevButton.addEventListener('click', () => navigateQuestion('prev'));
        nextButton.addEventListener('click', () => navigateQuestion('next'));

        elements.questionsContainer.innerHTML = '';
        elements.questionsContainer.appendChild(questionCard);
        
        currentState.currentQuestion = index;
        updateProgress();
    }

    // Create option element
    function createOption(option, questionIndex, optionIndex) {
        const optionElement = elements.optionTemplate.content.cloneNode(true);
        const container = optionElement.querySelector('.option-card');
        const input = optionElement.querySelector('.option-input');
        
        optionElement.querySelector('.option-text').textContent = option.text;
        optionElement.querySelector('.option-description').textContent = option.description;
        optionElement.querySelector('.option-image').src = option.image;
        optionElement.querySelector('.option-image').alt = option.text;
        
        input.id = `q${questionIndex}-o${optionIndex}`;
        input.value = option.text;
        
        if (currentState.answers[questionIndex] === option.text) {
            input.checked = true;
            container.classList.add('selected');
        }
        
        container.addEventListener('click', () => {
            document.querySelectorAll('.option-card').forEach(card => 
                card.classList.remove('selected'));
            container.classList.add('selected');
            currentState.answers[questionIndex] = option.text;
            
            // Auto-advance after short delay
            setTimeout(() => {
                if (questionIndex < quizConfig.questions.length - 1) {
                    navigateQuestion('next');
                }
            }, 500);
        });
        
        return optionElement;
    }

    // Navigate between questions
    function navigateQuestion(direction) {
        const nextIndex = direction === 'next' 
            ? currentState.currentQuestion + 1 
            : currentState.currentQuestion - 1;
        
        if (nextIndex >= 0 && nextIndex < quizConfig.questions.length) {
            showQuestion(nextIndex);
        } else if (nextIndex === quizConfig.questions.length) {
            showResults();
        }
    }

    // Update progress bar and question number
    function updateProgress() {
        const progress = ((currentState.currentQuestion + 1) / quizConfig.questions.length) * 100;
        elements.progressBar.style.width = `${progress}%`;
        elements.currentQuestionSpan.textContent = currentState.currentQuestion + 1;
    }

    // Timer functions
    function startTimer() {
        currentState.timerInterval = setInterval(() => {
            currentState.timeRemaining--;
            updateTimer();
            
            if (currentState.timeRemaining <= 0) {
                clearInterval(currentState.timerInterval);
                showResults();
            }
        }, 1000);
    }

    function updateTimer() {
        const minutes = Math.floor(currentState.timeRemaining / 60);
        const seconds = currentState.timeRemaining % 60;
        elements.timeRemainingSpan.textContent = 
            `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (currentState.timeRemaining <= 30) {
            elements.timeRemainingSpan.classList.add('warning');
        }
    }

    // Show quiz results
    function showResults() {
        clearInterval(currentState.timerInterval);
        
        elements.progress.classList.add('d-none');
        elements.questionsContainer.classList.add('d-none');
        elements.results.classList.remove('d-none');
        
        const recommendations = generateRecommendations(currentState.answers);
        displayRecommendations(recommendations);
        
        // Animate results in
        setTimeout(() => elements.results.classList.add('show'), 100);
    }

    // Generate product recommendations based on answers
    function generateRecommendations(answers) {
        // This is a simplified recommendation logic
        const recommendations = [];
        
        // Basic routine products
        recommendations.push({
            name: 'Gentle Cleansing Gel',
            description: 'pH-balanced, sulfate-free cleanser suitable for your skin type',
            image: '/images/products/cleanser.jpg',
            price: 24.99
        });

        // Add targeted treatments based on concerns
        if (answers[1] === 'Acne & Blemishes') {
            recommendations.push({
                name: 'Clarifying Treatment Serum',
                description: 'With salicylic acid and niacinamide to combat breakouts',
                image: '/images/products/acne-serum.jpg',
                price: 34.99
            });
        }

        if (answers[2] === 'Very Sensitive') {
            recommendations.push({
                name: 'Calming Recovery Cream',
                description: 'Soothes and strengthens sensitive skin',
                image: '/images/products/sensitive-cream.jpg',
                price: 39.99
            });
        }

        // Add more logic based on other answers
        
        return recommendations;
    }

    // Display recommended products
    function displayRecommendations(recommendations) {
        const container = document.getElementById('recommended-products');
        container.innerHTML = '';
        
        recommendations.forEach((product, index) => {
            const productCard = createProductCard(product);
            productCard.style.animationDelay = `${index * 0.2}s`;
            container.appendChild(productCard);
        });
    }

    // Create product card element
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4 animate-fade-up';
        card.innerHTML = `
            <div class="card product-card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="h5 mb-0">$${product.price}</span>
                        <button class="btn btn-primary add-to-cart" data-product="${product.name}">
                            <i class="fas fa-shopping-cart me-2"></i>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add to cart functionality
        card.querySelector('.add-to-cart').addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-check me-2"></i>Added';
            this.classList.remove('btn-primary');
            this.classList.add('btn-success');
            this.disabled = true;

            // Add to cart logic here
            addToCart(product);
        });

        return card;
    }

    // Add to cart function
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        showAlert('success', 'Product added to cart!');
    }

    // Save quiz results
    document.getElementById('save-results').addEventListener('click', async function() {
        if (!localStorage.getItem('token')) {
            window.location.href = '/pages/login.html?redirect=quiz';
            return;
        }
        
        try {
            const response = await fetch('/api/quiz/results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    answers: currentState.answers,
                    recommendations: document.getElementById('recommended-products')
                        .querySelectorAll('.product-card')
                        .map(card => card.querySelector('.card-title').textContent),
                    timestamp: new Date().toISOString()
                })
            });
            
            if (response.ok) {
                showAlert('success', 'Your results have been saved!');
            } else {
                throw new Error('Failed to save results');
            }
        } catch (error) {
            showAlert('error', 'Failed to save your results. Please try again.');
        }
    });

    // Alert component
    function showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type === 'error' ? 'danger' : 'success'} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
        alertDiv.style.zIndex = '1050';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }

    // Initialize the quiz
    initQuiz();
});