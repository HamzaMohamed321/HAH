document.addEventListener('DOMContentLoaded', function() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const contentLinks = document.querySelectorAll('.sidebar-subnav a');
    const contentArea = document.querySelector('.guide-content');

    // Toggle subnavs with animation
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            const subnav = this.nextElementSibling;

            if (subnav.classList.contains('active')) {
                subnav.classList.remove('active');
                subnav.style.maxHeight = null;
                subnav.style.opacity = 0;
            } else {
                subnav.classList.add('active');
                subnav.style.maxHeight = subnav.scrollHeight + 'px';
                subnav.style.opacity = 1;
            }
        });
    });

    // Load content without page refresh
    contentLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const contentId = this.getAttribute('data-content');
            loadContent(contentId);
        });
    });

    function loadContent(contentId) {
        // Fetch content based on contentId
        const content = getPlaceholderContent(contentId);
        contentArea.innerHTML = content;
    }

    function getPlaceholderContent(contentId) {
        const contents = {
            content1: "<h2>Welcome Message</h2><p>Welcome to your Productivity Notebook!</p><br/><p> This tool is designed to help you stay motivated, disciplined, and consistent in achieving your goals. Whether you're a student looking to improve their productivity, this notebook is for you.</p>",
            content2: "<h2>What is guide about?</h2><p>This Guide help you for some tips & tricks.</p><br/><p>And also how to use the notebook in the best possible way</p>",
            content3: `
                <h2>Setting Goals</h2>
                <br/>
                <ul>
                    <li><strong>Direction and Focus:</strong> Goals provide a sense of direction and focus. They help you prioritize tasks and allocate your time and resources efficiently.</li>
                    <br/>
                    <li><strong>Motivation:</strong> Clear goals can be a powerful motivator. They give you something to strive for and a reason to stay disciplined.</li>
                    <br/>
                    <li><strong>Measurement of Progress:</strong> Goals provide a benchmark for measuring progress. This allows you to see how far you've come and what you still need to achieve.</li>
                </ul>`,
            content4: `
                <div class="smart-goals-section">
                    <h2>SMART Goals Framework</h2>
                    <ul>
                        <li><strong>Specific:</strong> Be clear and specific about what you want to achieve. Avoid vague statements.
                            <br><em>Example:</em> Instead of "I want to get fit," say "I want to run a 5k marathon in three months."</li>
                        <li><strong>Measurable:</strong> Ensure that your goal can be measured so you can track your progress.
                            <br><em>Example:</em> "I want to increase my savings by $200 each month."</li>
                        <li><strong>Achievable:</strong> Set goals that are realistic and attainable given your resources and constraints.
                            <br><em>Example:</em> "I will read one book per month."</li>
                        <li><strong>Relevant:</strong> Your goal should matter to you and align with other relevant goals.
                            <br><em>Example:</em> "I want to learn Python to enhance my career prospects as a data analyst."</li>
                        <li><strong>Time-bound:</strong> Set a deadline to create a sense of urgency.
                            <br><em>Example:</em> "I will complete my online course within six weeks."</li>
                    </ul>
                </div>
            `
        };
        return contents[contentId] || "<p>Content not found</p>";
    }
});
