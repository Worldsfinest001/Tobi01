document.addEventListener('DOMContentLoaded', function() {
    console.log('Chatbot initialized'); // Debug log
    
    // DOM Elements
    const chatBox = document.getElementById('chat-box');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const typingIndicator = document.getElementById('typing-indicator');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatToggle = document.querySelector('.chat-toggle');
    const closeChat = document.querySelector('.close-chat');

    // Initialize with welcome message if empty
    if (chatBox.children.length === 0) {
        appendMessage('bot', "Hello! I'm Isreal. How can I help you?");
    }

    // Toggle chatbot visibility
    chatToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleChatbot();
    });

    closeChat.addEventListener('click', function(e) {
        e.stopPropagation();
        closeChatbot();
    });

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleUserInput();
    });

    // Auto-open after delay
    setTimeout(function() {
        if (!chatbotContainer.classList.contains('active')) {
            const firstInteraction = localStorage.getItem('chatbotFirstInteraction');
            if (!firstInteraction) {
                openChatbot();
                localStorage.setItem('chatbotFirstInteraction', 'true');
            }
        }
    }, 30000);

    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (!chatbotContainer.contains(e.target) && e.target !== chatToggle) {
            closeChatbot();
        }
    });

    // Helper functions
    function toggleChatbot() {
        chatbotContainer.classList.toggle('active');
        if (chatbotContainer.classList.contains('active')) {
            chatBox.scrollTop = chatBox.scrollHeight;
            userInput.focus();
        }
    }

    function openChatbot() {
        chatbotContainer.classList.add('active');
        chatBox.scrollTop = chatBox.scrollHeight;
        userInput.focus();
    }

    function closeChatbot() {
        chatbotContainer.classList.remove('active');
    }

    function handleUserInput() {
        const input = userInput.value.trim();
        if (!input) return;

        appendMessage('user', input);
        userInput.value = '';
        
        showTypingIndicator();
        
        setTimeout(function() {
            hideTypingIndicator();
            const botReply = generateBotResponse(input);
            appendMessage('bot', botReply);
        }, 1000 + Math.random() * 500);
    }

    function appendMessage(sender, text) {
        const messageEl = document.createElement('div');
        messageEl.classList.add('message', sender);

        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.textContent = text;

        messageEl.appendChild(bubble);
        chatBox.appendChild(messageEl);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function showTypingIndicator() {
        typingIndicator.style.display = 'flex';
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }

    function generateBotResponse(input) {
        const normalized = input.toLowerCase();
        
        const responses = {
            greetings: /hello|hi|hey|greetings/i,
            help: /help|support|assistance/i,
            pricing: /price|cost|rate|how much/i,
            monday: /monday\.com|monday/i,
            clickup: /clickup|click up/i,
            notion: /notion/i,
            airtable: /airtable/i,
            contact: /contact|email|phone|reach/i,
            process: /process|workflow|automation/i,
            sop: /sop|standard operating procedure/i,
            thanks: /thank|thanks|appreciate/i
        };

        for (const [key, regex] of Object.entries(responses)) {
            if (regex.test(normalized)) {
                return getResponseByKey(key, input);
            }
        }
        
        return defaultResponse();
    }

    function getResponseByKey(key, input) {
        const responses = {
            greetings: "Hello! I'm Isreal, your workflow automation consultant. I specialize in helping businesses streamline their processes using platforms like Monday.com, ClickUp, Notion, and Airtable. How can I assist you today?",
            help: "I can help with:\n\n1. Workflow design and automation\n2. Process mapping and optimization\n3. SOP documentation\n4. Platform-specific questions\n5. Pricing and service details\n\nWhat specifically would you like to know?",
            pricing: "Pricing depends on several factors:\n\n- Complexity of your workflow\n- Number of platforms to integrate\n- Level of automation required\n- Customization needs\n\nFor a basic workflow setup, projects typically start at $500. Complex automations with multiple integrations can range from $1,500-$5,000.\n\nWould you like me to connect you for a free consultation?",
            monday: "Monday.com is one of my specialties! Here's what I can help with:\n\n• Custom board creation with automations\n• Lead generation forms with automated workflows\n• Integration with CRM tools\n• Dashboard customization for analytics\n• Time tracking and project management setups\n\nWould you like to see some sample Monday.com workflows?",
            clickup: "ClickUp optimizations I've implemented include:\n\n• Sales CRM setups with lead tracking\n• Web development workflow templates\n• Portfolio management systems\n• Custom views for different team members\n• Automated status updates\n\nI can share specific examples if you're interested!",
            notion: "Notion workspace solutions I offer:\n\n• Custom database setups for client management\n• Team wikis with knowledge bases\n• Project tracking dashboards\n• Content calendars with automated reminders\n• Personal productivity systems\n\nWould you like details about any specific Notion use case?",
            airtable: "Airtable solutions I've built:\n\n• Client onboarding systems with automated follow-ups\n• Contract management databases\n• Event planning workflows\n• Inventory tracking with alerts\n• Custom reporting views\n\nI can show you samples of these implementations.",
            contact: "You can reach me directly at:\n\nEmail: Israelagboola1234@gmail.com\nUpwork: [Click the Upwork link on this page]\n\nI typically respond within 24 hours. For urgent inquiries, please include 'URGENT' in your subject line.",
            process: "Workflow automation typically involves these steps:\n\n1. Process Discovery - We map your current workflow\n2. Bottleneck Identification - Find inefficiencies\n3. Solution Design - Create automation blueprint\n4. Implementation - Build the automated workflow\n5. Testing & Training - Ensure smooth adoption\n6. Ongoing Optimization - Continuous improvements\n\nWould you like to discuss a specific workflow challenge?",
            sop: "My SOP documentation includes:\n\n• Step-by-step process guides with screenshots\n• Video walkthroughs for complex procedures\n• Version control for updates\n• Access permissions management\n• Integration with training systems\n• Compliance tracking features\n\nI can provide samples of SOPs I've created.",
            thanks: "You're very welcome! I'm happy to help with any other questions you might have about workflow automation, platform setups, or process improvements. Is there anything else I can assist you with today?"
        };
        
        return responses[key] || defaultResponse();
    }

    function defaultResponse() {
        return "I specialize in helping businesses automate and optimize their workflows. Here are some common topics I can help with:\n\n• Setting up Monday.com for project management\n• Creating ClickUp dashboards for team visibility\n• Building Notion workspaces for documentation\n• Designing Airtable bases for data organization\n• Integrating multiple tools with Zapier/Make\n\nWhat would you like to know more about?";
    }
});