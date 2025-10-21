document.addEventListener('DOMContentLoaded', function() {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            const header = this.closest('.accordion-header');
            const collapseElement = header.nextElementSibling;
            const isCollapsed = this.classList.contains('collapsed');

            if (isCollapsed) {
                const allCollapseElements = document.querySelectorAll('.accordion-collapse');
                allCollapseElements.forEach(el => {
                    if (el !== collapseElement) {
                        el.classList.remove('show');
                        const btn = el.previousElementSibling.querySelector('.accordion-button');
                        btn.classList.add('collapsed');
                        btn.setAttribute('aria-expanded', 'false');
                    }
                });

                collapseElement.classList.add('show');
                this.classList.remove('collapsed');
                this.setAttribute('aria-expanded', 'true');
            } else {
                collapseElement.classList.remove('show');
                this.classList.add('collapsed');
                this.setAttribute('aria-expanded', 'false');
            }
        });
    });

    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        const collapse = item.querySelector('.accordion-collapse');
        
        button.setAttribute('aria-expanded', 'false');
        collapse.setAttribute('aria-labelledby', button.id || 'default');
    });
});